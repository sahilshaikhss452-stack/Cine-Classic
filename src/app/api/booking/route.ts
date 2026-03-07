import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@sanity/client';

interface BookingPayload {
  firstName:  string;
  lastName:   string;
  company?:   string;
  email:      string;
  phone?:     string;
  shootType?: string;
  studio?:    string;
  dateFrom?:  string;
  crewSize?:  string;
  package?:   string;
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

  const { firstName, lastName, email } = body;

  // Basic validation
  if (!firstName || !lastName || !email) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 422 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 422 });
  }

  const fullName = `${firstName} ${lastName}`.trim();
  const now      = new Date().toISOString();

  // ─── Log to console (always) ──────────────────────────────────────────────
  console.log('[Booking Inquiry]', {
    name:       fullName,
    company:    body.company,
    email,
    phone:      body.phone,
    shootType:  body.shootType,
    studio:     body.studio,
    dateFrom:   body.dateFrom,
    crewSize:   body.crewSize,
    package:    body.package,
    receivedAt: now,
  });

  // ─── Store in Sanity CMS ──────────────────────────────────────────────────
  // Requires SANITY_WRITE_TOKEN in Vercel environment variables.
  // Generate at: https://sanity.io/manage → project → API → Tokens (Editor permission)
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const writeToken = process.env.SANITY_WRITE_TOKEN;

  if (projectId && writeToken) {
    try {
      // Lazy-create the Sanity write client inside the handler so it never
      // throws at module-init time when env vars aren't available.
      const sanityWriteClient = createClient({
        projectId,
        dataset   : process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
        apiVersion: '2024-01-01',
        useCdn    : false,   // MUST be false for write operations
        token     : writeToken,
      });

      await sanityWriteClient.create({
        _type:          'bookingInquiry',
        name:           fullName,
        productionName: body.company    ?? '',
        email,
        phone:          body.phone      ?? '',
        shootType:      body.shootType  ?? '',
        studioRequired: body.studio     ?? '',
        shootDates:     body.dateFrom   ?? '',
        crewSize:       body.crewSize   ?? '',
        package:        body.package    ?? '',
        notes:          '',
        status:         'new',
        createdAt:      now,
      });
      console.log('[Booking Inquiry] Saved to Sanity CMS ✓');
    } catch (err) {
      console.error('[Booking Inquiry] Sanity write failed:', err);
      // Still return success — don't block the UX if CMS write fails
    }
  } else {
    console.warn('[Booking Inquiry] SANITY_WRITE_TOKEN not set — inquiry logged but NOT saved to CMS.');
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
