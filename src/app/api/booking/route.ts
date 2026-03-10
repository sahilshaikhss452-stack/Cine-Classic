import { createClient } from '@sanity/client';
import { NextRequest, NextResponse } from 'next/server';
import { checkBookingRateLimit } from '@/lib/booking-anti-spam';
import { sendBookingInquiryNotification } from '@/lib/booking-notifications';
import {
  getSanityApiVersion,
  getSanityDataset,
  getSanityProjectId,
  requireSanityWriteToken,
} from '@/lib/sanity';

interface BookingRequestBody {
  name?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  company?: string;
  shootType?: string;
  studio?: string;
  set?: string;
  requestedStudio?: string;
  preferredDate?: string;
  date?: string;
  dateFrom?: string;
  crewSize?: string;
  package?: string;
  project?: string;
  projectBrief?: string;
  sourcePage?: string;
  websiteUrl?: string;
  middleName?: string;
}

interface BookingInquiryDocument {
  _type: 'bookingInquiry';
  name: string;
  phone: string;
  status: 'new';
  createdAt: string;
  company?: string;
  email?: string;
  shootType?: string;
  requestedStudio?: string;
  preferredDate?: string;
  crewSize?: string;
  package?: string;
  projectBrief?: string;
  sourcePage?: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function optionalString(value: string | undefined): string | undefined {
  const trimmed = (value ?? '').trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function resolveName(body: BookingRequestBody): string | undefined {
  const fullName = optionalString(body.name);
  if (fullName) {
    return fullName;
  }

  return optionalString([body.firstName, body.lastName].filter(Boolean).join(' '));
}

function resolveRequestedStudio(body: BookingRequestBody): string | undefined {
  return optionalString(body.requestedStudio)
    ?? optionalString(body.studio)
    ?? optionalString(body.set);
}

function resolvePreferredDate(body: BookingRequestBody): string | undefined {
  return optionalString(body.preferredDate)
    ?? optionalString(body.date)
    ?? optionalString(body.dateFrom);
}

function resolveProjectBrief(body: BookingRequestBody): string | undefined {
  return optionalString(body.projectBrief) ?? optionalString(body.project);
}

function isHomepageSubmission(body: BookingRequestBody, sourcePage: string | undefined): boolean {
  return sourcePage === 'home'
    || optionalString(body.firstName) !== undefined
    || optionalString(body.lastName) !== undefined
    || optionalString(body.shootType) !== undefined
    || optionalString(body.studio) !== undefined
    || optionalString(body.dateFrom) !== undefined;
}

function isStudioPageSubmission(body: BookingRequestBody, sourcePage: string | undefined): boolean {
  return sourcePage?.startsWith('/studios/') === true
    || optionalString(body.requestedStudio) !== undefined
    || optionalString(body.preferredDate) !== undefined
    || optionalString(body.projectBrief) !== undefined;
}

function hasTriggeredHoneypot(body: BookingRequestBody): boolean {
  return optionalString(body.websiteUrl) !== undefined || optionalString(body.middleName) !== undefined;
}

export async function POST(request: NextRequest) {
  let body: BookingRequestBody;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  if (hasTriggeredHoneypot(body)) {
    return NextResponse.json({ success: true }, { status: 200 });
  }

  const rateLimitResult = await checkBookingRateLimit(request);
  if (!rateLimitResult.allowed) {
    return NextResponse.json(
      { error: 'Too many booking requests right now. Please wait a few minutes and try again.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(rateLimitResult.retryAfterSeconds),
        },
      },
    );
  }

  const name = resolveName(body);
  const phone = optionalString(body.phone);
  const email = optionalString(body.email);
  const sourcePage = optionalString(body.sourcePage);
  const company = optionalString(body.company);
  const shootType = optionalString(body.shootType);
  const requestedStudio = resolveRequestedStudio(body);
  const preferredDate = resolvePreferredDate(body);
  const crewSize = optionalString(body.crewSize);
  const packageSelection = optionalString(body.package);
  const projectBrief = resolveProjectBrief(body);

  if (!name) {
    return NextResponse.json({ error: 'Name is required.' }, { status: 422 });
  }

  if (!phone) {
    return NextResponse.json({ error: 'Phone or WhatsApp number is required.' }, { status: 422 });
  }

  if (email && !isValidEmail(email)) {
    return NextResponse.json({ error: 'Email address is invalid.' }, { status: 422 });
  }

  if (isHomepageSubmission(body, sourcePage)) {
    if (!shootType) {
      return NextResponse.json({ error: 'Shoot type is required.' }, { status: 422 });
    }

    if (!requestedStudio) {
      return NextResponse.json({ error: 'Please select a studio.' }, { status: 422 });
    }

    if (!preferredDate) {
      return NextResponse.json({ error: 'Preferred shoot date is required.' }, { status: 422 });
    }
  }

  if (isStudioPageSubmission(body, sourcePage)) {
    if (!requestedStudio) {
      return NextResponse.json({ error: 'Requested studio is required.' }, { status: 422 });
    }

    if (!preferredDate) {
      return NextResponse.json({ error: 'Preferred shoot date is required.' }, { status: 422 });
    }

    if (!packageSelection) {
      return NextResponse.json({ error: 'Please select a booking duration.' }, { status: 422 });
    }
  }

  const createdAt = new Date().toISOString();
  const document: BookingInquiryDocument = {
    _type: 'bookingInquiry',
    name,
    phone,
    status: 'new',
    createdAt,
    ...(company ? { company } : {}),
    ...(email ? { email } : {}),
    ...(shootType ? { shootType } : {}),
    ...(requestedStudio ? { requestedStudio } : {}),
    ...(preferredDate ? { preferredDate } : {}),
    ...(crewSize ? { crewSize } : {}),
    ...(packageSelection ? { package: packageSelection } : {}),
    ...(projectBrief ? { projectBrief } : {}),
    ...(sourcePage ? { sourcePage } : {}),
  };

  try {
    const client = createClient({
      projectId: getSanityProjectId(),
      dataset: getSanityDataset(),
      apiVersion: getSanityApiVersion(),
      useCdn: false,
      token: requireSanityWriteToken(),
    });

    const createdDocument = await client.create(document);

    try {
      await sendBookingInquiryNotification({
        id: createdDocument._id,
        ...document,
      });
    } catch (error) {
      console.error('[booking] Inquiry saved but notification email failed', error);
    }
  } catch (error) {
    console.error('[booking] Failed to save inquiry', error);
    return NextResponse.json(
      { error: 'We could not save your inquiry right now. Please try again shortly.' },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
