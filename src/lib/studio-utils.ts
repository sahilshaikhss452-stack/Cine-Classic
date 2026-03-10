/**
 * studio-utils.ts
 *
 * Tiny, pure formatters for SanityStudio number fields → human-readable strings.
 * These are NOT an adapter layer — they only format values, never reshape data.
 *
 * Usage:
 *   import { fmtSize, fmtHeight, fmtRate, fmtRateUnit, fmtMinBooking } from '@/lib/studio-utils';
 *
 *   fmtSize(6000)          // "6,000 sq ft"
 *   fmtHeight(20)          // "20 ft"
 *   fmtRate(8000, null)    // "₹8,000"
 *   fmtRateUnit('/hour', 8000) // "/hour"
 *   fmtMinBooking(4)       // "4 hours"
 */

/** Format a sq-ft number: 6000 → "6,000 sq ft" | null/0 → "—" */
export function fmtSize(size: number | null | undefined): string {
  if (!size) return '—';
  return `${size.toLocaleString('en-IN')} sq ft`;
}

/** Format a ceiling height in feet: 20 → "20 ft" | null/0 → "—" */
export function fmtHeight(height: number | null | undefined): string {
  if (!height) return '—';
  return `${height} ft`;
}

/**
 * Format the "from" rate:
 *  - Prefers rateHourly if set  → "₹8,000"
 *  - Falls back to ratePerDay   → "₹40,000"
 *  - Both null                  → "₹—"
 */
export function fmtRate(
  rateHourly: number | null | undefined,
  ratePerDay: number | null | undefined,
): string {
  if (rateHourly) return `₹${rateHourly.toLocaleString('en-IN')}`;
  if (ratePerDay) return `₹${ratePerDay.toLocaleString('en-IN')}`;
  return '₹—';
}

/**
 * Derive the rate unit string.
 * Uses the CMS rateUnit when set; falls back based on which rate field is present.
 */
export function fmtRateUnit(
  rateUnit  : string | null | undefined,
  rateHourly: number | null | undefined,
): string {
  return rateUnit ?? (rateHourly ? '/hour' : '/day');
}

/**
 * Format a minimum booking duration:
 *  4  → "4 hours"
 *  1  → "1 hour"
 *  null → undefined  (so callers can use a short-circuit: value && ...)
 */
export function fmtMinBooking(hours: number | null | undefined): string | undefined {
  if (!hours) return undefined;
  return `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
}
