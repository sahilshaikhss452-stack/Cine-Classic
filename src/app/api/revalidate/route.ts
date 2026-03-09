/**
 * /api/revalidate
 *
 * On-demand ISR revalidation endpoint for Sanity webhooks.
 *
 * When you publish or unpublish content in Sanity Studio, Sanity fires a
 * webhook POST to this URL.  This handler validates the shared secret and
 * immediately purges the Next.js data cache so the website reflects your
 * changes within seconds — not after the 30-second ISR window.
 *
 * ─── SETUP IN SANITY ────────────────────────────────────────────────────────
 *  1. Go to https://sanity.io/manage → project ite8n25p → API → Webhooks
 *  2. Click "Create webhook"
 *  3. Fill in:
 *       Name:    Revalidate Next.js
 *       URL:     https://YOUR-VERCEL-DOMAIN.vercel.app/api/revalidate?secret=YOUR_SECRET
 *       Dataset: production
 *       Trigger: Create, Update, Delete  (check all three)
 *       Filter:  (leave empty — revalidate on any change)
 *       HTTP method: POST
 *  4. Save
 *
 * ─── ENVIRONMENT VARIABLES NEEDED ──────────────────────────────────────────
 *  SANITY_REVALIDATE_SECRET   — any random string, same value in Vercel + webhook URL
 *
 * ─── TESTING LOCALLY ────────────────────────────────────────────────────────
 *  curl -X POST "http://localhost:3000/api/revalidate?secret=YOUR_SECRET"
 * ────────────────────────────────────────────────────────────────────────────
 */

import { revalidateTag }  from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // ── 1. Verify secret ─────────────────────────────────────────────────────
  const secret = request.nextUrl.searchParams.get('secret');

  if (!process.env.SANITY_REVALIDATE_SECRET) {
    // If no secret is configured, allow revalidation (dev-friendly)
    // but log a warning so it's obvious in production logs
    console.warn('[revalidate] SANITY_REVALIDATE_SECRET is not set — revalidating without auth check');
  } else if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json(
      { message: 'Invalid secret' },
      { status: 401 }
    );
  }

  // ── 2. Purge the Sanity cache tag ─────────────────────────────────────────
  // This instantly invalidates ALL pages that were fetched using sanityFetch()
  // because they all share the 'sanity' cache tag.
  revalidateTag('sanity');

  console.log('[revalidate] ✅ Cache purged — sanity tag revalidated at', new Date().toISOString());

  return NextResponse.json({
    revalidated: true,
    now: Date.now(),
    message: 'Cache purged — pages will rebuild on next request',
  });
}

// Also support GET for easy browser testing
export async function GET(request: NextRequest) {
  return POST(request);
}
