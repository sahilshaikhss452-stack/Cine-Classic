import { createClient } from '@sanity/client';
import { NextRequest, NextResponse } from 'next/server';
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

export async function POST(request: NextRequest) {
  let body: BookingRequestBody;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const name = resolveName(body);
  const phone = optionalString(body.phone);
  const email = optionalString(body.email);

  if (!name) {
    return NextResponse.json({ error: 'Name is required.' }, { status: 422 });
  }

  if (!phone) {
    return NextResponse.json({ error: 'Phone or WhatsApp number is required.' }, { status: 422 });
  }

  if (email && !isValidEmail(email)) {
    return NextResponse.json({ error: 'Email address is invalid.' }, { status: 422 });
  }

  const document = {
    _type: 'bookingInquiry',
    name,
    phone,
    status: 'new',
    createdAt: new Date().toISOString(),
    ...(optionalString(body.company) ? { company: optionalString(body.company) } : {}),
    ...(email ? { email } : {}),
    ...(optionalString(body.shootType) ? { shootType: optionalString(body.shootType) } : {}),
    ...(resolveRequestedStudio(body) ? { requestedStudio: resolveRequestedStudio(body) } : {}),
    ...(resolvePreferredDate(body) ? { preferredDate: resolvePreferredDate(body) } : {}),
    ...(optionalString(body.crewSize) ? { crewSize: optionalString(body.crewSize) } : {}),
    ...(optionalString(body.package) ? { package: optionalString(body.package) } : {}),
    ...(resolveProjectBrief(body) ? { projectBrief: resolveProjectBrief(body) } : {}),
    ...(optionalString(body.sourcePage) ? { sourcePage: optionalString(body.sourcePage) } : {}),
  };

  try {
    const client = createClient({
      projectId: getSanityProjectId(),
      dataset: getSanityDataset(),
      apiVersion: getSanityApiVersion(),
      useCdn: false,
      token: requireSanityWriteToken(),
    });

    await client.create(document);
  } catch (error) {
    console.error('[booking] Failed to save inquiry', error);
    return NextResponse.json(
      { error: 'We could not save your inquiry right now. Please try again shortly.' },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
