import { Resend } from 'resend';

export interface BookingInquiryNotificationPayload {
  id: string;
  name: string;
  phone: string;
  email?: string;
  company?: string;
  shootType?: string;
  requestedStudio?: string;
  preferredDate?: string;
  crewSize?: string;
  package?: string;
  projectBrief?: string;
  sourcePage?: string;
  createdAt: string;
}

interface BookingEmailConfig {
  apiKey: string;
  to: string[];
  fromEmail: string;
  fromName: string;
  replyToEmail?: string;
}

function getOptionalEnvVar(name: string): string | null {
  const value = process.env[name]?.trim();
  return value ? value : null;
}

function getEmailConfig(): BookingEmailConfig | null {
  const apiKey = getOptionalEnvVar('RESEND_API_KEY');
  const to = getOptionalEnvVar('BOOKING_NOTIFICATION_TO_EMAIL');
  const fromEmail = getOptionalEnvVar('BOOKING_NOTIFICATION_FROM_EMAIL');

  if (!apiKey || !to || !fromEmail) {
    return null;
  }

  return {
    apiKey,
    to: to.split(',').map((entry) => entry.trim()).filter(Boolean),
    fromEmail,
    fromName: getOptionalEnvVar('BOOKING_NOTIFICATION_FROM_NAME') ?? 'Cine Classic Studios',
    replyToEmail: getOptionalEnvVar('BOOKING_NOTIFICATION_REPLY_TO_EMAIL') ?? undefined,
  };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function displayValue(value?: string): string {
  const trimmed = value?.trim();
  return trimmed ? trimmed : 'Not provided';
}

function formatSubmittedAt(createdAt: string): string {
  const date = new Date(createdAt);
  if (Number.isNaN(date.getTime())) {
    return createdAt;
  }

  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata',
  }).format(date);
}

function renderRow(label: string, value?: string): string {
  return `
    <tr>
      <td style="padding: 10px 0; width: 180px; vertical-align: top; color: #8f98ad; font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase;">
        ${escapeHtml(label)}
      </td>
      <td style="padding: 10px 0; color: #101828; font-size: 15px; line-height: 1.6; font-weight: 600;">
        ${escapeHtml(displayValue(value))}
      </td>
    </tr>`;
}

function buildSubject(payload: BookingInquiryNotificationPayload): string {
  const studio = payload.requestedStudio?.trim();
  return studio ? `New Booking Inquiry - ${studio}` : 'New Booking Inquiry';
}

function buildTextBody(payload: BookingInquiryNotificationPayload): string {
  const submittedAt = formatSubmittedAt(payload.createdAt);

  return [
    'New Booking Inquiry',
    '',
    'Lead Summary',
    `Name: ${displayValue(payload.name)}`,
    `Phone: ${displayValue(payload.phone)}`,
    `Email: ${displayValue(payload.email)}`,
    `Company: ${displayValue(payload.company)}`,
    `Shoot Type: ${displayValue(payload.shootType)}`,
    `Requested Studio: ${displayValue(payload.requestedStudio)}`,
    `Preferred Date: ${displayValue(payload.preferredDate)}`,
    '',
    'Project Details',
    `Crew Size: ${displayValue(payload.crewSize)}`,
    `Package: ${displayValue(payload.package)}`,
    `Project Brief: ${displayValue(payload.projectBrief)}`,
    '',
    'Source and Timing',
    `Source Page: ${displayValue(payload.sourcePage)}`,
    `Submitted At: ${submittedAt}`,
    `Inquiry ID: ${payload.id}`,
    '',
    'Respond quickly to improve conversion on time-sensitive studio inquiries.',
  ].join('\n');
}

function buildHtmlBody(payload: BookingInquiryNotificationPayload): string {
  const submittedAt = formatSubmittedAt(payload.createdAt);

  return `
  <!DOCTYPE html>
  <html lang="en">
    <body style="margin: 0; padding: 0; background: #f3f4f8; font-family: Arial, sans-serif; color: #101828;">
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="padding: 24px 12px; background: #f3f4f8;">
        <tr>
          <td align="center">
            <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width: 720px; background: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 16px 48px rgba(15, 23, 42, 0.12);">
              <tr>
                <td style="padding: 32px; background: linear-gradient(135deg, #0b0b0d 0%, #17151b 100%); color: #ffffff;">
                  <div style="font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; color: #d4af37; margin-bottom: 14px; font-weight: 700;">
                    Cine Classic Studios
                  </div>
                  <div style="font-size: 30px; line-height: 1.15; font-weight: 700; margin-bottom: 10px;">
                    New Booking Inquiry
                  </div>
                  <div style="font-size: 15px; line-height: 1.7; color: rgba(255,255,255,0.74); max-width: 520px;">
                    A new studio lead has been saved in Sanity. Review the details below and respond quickly while the shoot window is still hot.
                  </div>
                </td>
              </tr>

              <tr>
                <td style="padding: 28px 32px 12px;">
                  <div style="font-size: 13px; letter-spacing: 0.16em; text-transform: uppercase; color: #b58816; font-weight: 700; margin-bottom: 16px;">
                    Lead Summary
                  </div>
                  <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                    ${renderRow('Name', payload.name)}
                    ${renderRow('Phone', payload.phone)}
                    ${renderRow('Email', payload.email)}
                    ${renderRow('Company', payload.company)}
                    ${renderRow('Shoot Type', payload.shootType)}
                    ${renderRow('Requested Studio', payload.requestedStudio)}
                    ${renderRow('Preferred Date', payload.preferredDate)}
                  </table>
                </td>
              </tr>

              <tr>
                <td style="padding: 12px 32px;">
                  <div style="font-size: 13px; letter-spacing: 0.16em; text-transform: uppercase; color: #b58816; font-weight: 700; margin-bottom: 16px;">
                    Project Details
                  </div>
                  <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                    ${renderRow('Crew Size', payload.crewSize)}
                    ${renderRow('Package', payload.package)}
                    ${renderRow('Project Brief', payload.projectBrief)}
                  </table>
                </td>
              </tr>

              <tr>
                <td style="padding: 12px 32px 20px;">
                  <div style="font-size: 13px; letter-spacing: 0.16em; text-transform: uppercase; color: #b58816; font-weight: 700; margin-bottom: 16px;">
                    Source and Timing
                  </div>
                  <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                    ${renderRow('Source Page', payload.sourcePage)}
                    ${renderRow('Submitted At', submittedAt)}
                    ${renderRow('Inquiry ID', payload.id)}
                  </table>
                </td>
              </tr>

              <tr>
                <td style="padding: 0 32px 32px;">
                  <div style="border-radius: 18px; background: #111111; color: #f8fafc; padding: 20px 22px;">
                    <div style="font-size: 13px; letter-spacing: 0.16em; text-transform: uppercase; color: #d4af37; font-weight: 700; margin-bottom: 10px;">
                      Quick Action Note
                    </div>
                    <div style="font-size: 15px; line-height: 1.7; color: rgba(248,250,252,0.84);">
                      Respond quickly to improve conversion on time-sensitive studio inquiries.
                    </div>
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>`;
}

export async function sendBookingInquiryNotification(payload: BookingInquiryNotificationPayload): Promise<void> {
  const config = getEmailConfig();

  if (!config || config.to.length === 0) {
    console.warn('[booking] Email notification skipped: missing email configuration.');
    return;
  }

  const resend = new Resend(config.apiKey);
  const replyTo = payload.email?.trim() || config.replyToEmail;

  await resend.emails.send({
    from: `${config.fromName} <${config.fromEmail}>`,
    to: config.to,
    subject: buildSubject(payload),
    html: buildHtmlBody(payload),
    text: buildTextBody(payload),
    ...(replyTo ? { replyTo } : {}),
  });
}
