import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@sanity/client';

/**
 * Booking inquiry payload.
 *
 * The simplified 5-field form (StudioBooking.tsx) sends:
 *   { name, phone, date, package, project, set }
 *
 * Legacy form fields (kept for backward-compatibility):
 *   { firstName, lastName, email, company, shootType, dateFrom, crewSize }
 *
 * Validation: requires name (or firstName+lastName) AND phone (or email).
 * Phone is the primary contact method for this India-based studio.
 */
interface BookingPayload {
  // ── New simplified form fields ──────────────────────────────────────────────
  name?    : string;   // combined full name
  phone?   : string;   // WhatsApp / phone (primary contact in India)
  date?    : string;   // preferred shoot date
  project? : string;   // optional project brief / notes
  set?     : string;   // studio name (hidden field)
  package? : string;   // duration selection

  // ── Legacy form fields (kept for backward compat) ───────────────────────────
  firstName?  : string;
  lastName?   : string;
  email?      : string;
  company?    : string;
  shootType?  : string;
  studio?     : string;
  dateFrom?   : string;
  crewSize?   : string;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  let body: BookingPayload;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  // ── Resolve name ─────────────────────────────────────────────────────────────
  const fullName =
    body.name?.trim() ||
    [body.firstName, body.lastName].filter(Boolean).join(' ').trim();

  // ── Resolve contact ──────────────────────────────────────────────────────────
  const phone = body.phone?.trim() || '';
  const email = body.email?.trim() || '';

  // ── Resolve other fields ─────────────────────────────────────────────────────
  const studioName  = body.set     || body.studio   || '';
  const shootDate   = body.date    || body.dateFrom  || '';
  const notes       = body.project || '';

  // ── Validation ───────────────────────────────────────────────────────────────
  // Need: a name + at least one contact method (phone OR email)
  if (!fullName) {
    return NextResponse.json({ error: 'Name is required' }, { status: 422 });
  }
  if (!phone && !email) {
    return NextResponse.json(
      { error: 'At least one contact method (phone or email) is required' },
      { status: 422 },
    );
  }
  if (email && !isValidEmail(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 422 });
  }

  const now = new Date().toISOString();

  // ─── Log to console (always) ──────────────────────────────────────────────
  console.log('[Booking Inquiry]', {
    name        : fullName,
    phone,
    email       : email || '(not provided)',
    studio      : studioName,
    date        : shootDate,
    package     : body.package,
    project     : notes,
    company     : body.company,
    crewSize    : body.crewSize,
    receivedAt  : now,
  });

  // ─── Store in Sanity CMS ──────────────────────────────────────────────────
  // Requires SANITY_WRITE_TOKEN in Vercel environment variables.
  // Generate at: https://sanity.io/manage → project → API → Tokens (Editor permission)
  const projectId  = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const writeToken = process.env.SANITY_WRITE_TOKEN;

  if (projectId && writeToken) {
    try {
      const sanityWriteClient = createClient({
        projectId,
        dataset   : process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
        apiVersion: '2024-01-01',
        useCdn    : false,  // MUST be false for write operations
        token     : writeToken,
      });

      await sanityWriteClient.create({
        _type          : 'bookingInquiry',
        name           : fullName,
        productionName : body.company      ?? '',
        email          : email,
        phone          : phone,
        shootType      : body.shootType    ?? '',
        studioRequired : studioName,
        shootDates     : shootDate,
        crewSize       : body.crewSize     ?? '',
        package        : body.package      ?? '',
        notes          : notes,
        status         : 'new',
        createdAt      : now,
      });
      console.log('[Booking Inquiry] Saved to Sanity CMS ✓');
    } catch (err) {
      console.error('[Booking Inquiry] Sanity write failed:', err);
      // Still return success — don't block the UX if CMS write fails
    }
  } else {
    console.warn(
      '[Booking Inquiry] SANITY_WRITE_TOKEN not set — inquiry logged but NOT saved to CMS.',
    );
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
