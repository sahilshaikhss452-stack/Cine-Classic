/**
 * Sanity client — shared across all server components & API routes.
 *
 * Usage:
 *   import { client, urlFor } from '@/lib/sanity';
 *   const studios = await client.fetch(STUDIOS_QUERY);
 *   const imageUrl = urlFor(studio.heroImage).width(1920).url();
 */

import { createClient } from '@sanity/client';
import imageUrlBuilder  from '@sanity/image-url';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any;

// ─── Client ──────────────────────────────────────────────────────────────────

export const client = createClient({
  projectId : process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '',
  dataset   : process.env.NEXT_PUBLIC_SANITY_DATASET   ?? 'production',
  apiVersion: '2024-01-01',   // Stable API version – bump once a year
  useCdn    : false,          // Always bypass Sanity CDN — ISR handles caching in Next.js
  token     : process.env.SANITY_API_TOKEN,
});

// ─── Image URL Builder ────────────────────────────────────────────────────────

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// ─── Type-safe fetch helper ───────────────────────────────────────────────────

/**
 * Fetches data from Sanity with Next.js ISR caching.
 *
 * Caching strategy:
 *  - revalidate: 30   → background refresh every 30 seconds (ISR)
 *  - tags: ['sanity'] → on-demand revalidation via POST /api/revalidate
 *
 * When the Sanity webhook fires (on publish / unpublish), it calls
 * /api/revalidate which invalidates the 'sanity' tag instantly — no waiting
 * for the 30-second window.
 */
export async function sanityFetch<T>(
  query : string,
  params: Record<string, unknown> = {},
): Promise<T> {
  return client.fetch<T>(query, params, {
    next: {
      revalidate: 30,          // Fallback: refresh every 30 s even without webhook
      tags       : ['sanity'], // On-demand: POST /api/revalidate invalidates this tag
    },
  });
}
