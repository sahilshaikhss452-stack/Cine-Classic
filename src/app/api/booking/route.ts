import { NextRequest, NextResponse } from 'next/server';

interface BookingPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  set: string;
  package: string;
  date: string;
  time?: string;
  project?: string;
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

  const { firstName, lastName, email, set, package: pkg, date } = body;

  // Basic validation
  if (!firstName || !lastName || !email || !set || !pkg || !date) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 422 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: 'Invalid email address' }, { status: 422 });
  }

  // ─── Production hook ──────────────────────────────────────────────────────
  // Replace this section with your email provider (Resend, SendGrid, Nodemailer, etc.)
  // or write the booking to your database (Prisma, Supabase, etc.)
  //
  // Example with Resend:
  //   const resend = new Resend(process.env.RESEND_API_KEY);
  //   await resend.emails.send({
  //     from: 'noreply@cineclassicstudios.com',
  //     to: 'bookings@cineclassicstudios.com',
  //     subject: `New Booking Request – ${firstName} ${lastName}`,
  //     html: `<p>Set: ${set}, Package: ${pkg}, Date: ${date}</p>`,
  //   });
  // ─────────────────────────────────────────────────────────────────────────

  console.log('[Booking Request]', {
    name: `${firstName} ${lastName}`,
    email,
    set,
    package: pkg,
    date,
    time: body.time,
    project: body.project,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ success: true }, { status: 200 });
}
