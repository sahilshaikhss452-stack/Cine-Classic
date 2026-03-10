/**
 * Sanity client â€” shared across all server components & API routes.
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

// â”€â”€â”€ Client â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export const client = createClient({
  projectId : process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '',
  dataset   : process.env.NEXT_PUBLIC_SANITY_DATASET   ?? 'production',
  apiVersion: '2024-01-01',   // Stable API version â€“ bump once a year
  useCdn    : false,          // Always bypass Sanity CDN â€” ISR handles caching in Next.js
  token     : process.env.SANITY_API_TOKEN,
});

// â”€â”€â”€ Image URL Builder â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// â”€â”€â”€ Type-safe fetch helper â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

/**
 * Fetches data from Sanity with Next.js ISR caching.
 *
 * Caching strategy:
 *  - revalidate: 30   â†’ background refresh every 30 seconds (ISR)
 *  - tags: ['sanity'] â†’ on-demand revalidation via POST /api/revalidate
 *
 * When the Sanity webhook fires (on publish / unpublish), it calls
 * /api/revalidate which invalidates the 'sanity' tag instantly â€” no waiting
 * for the 30-second window.
 */
export async function sanityFetch<T>(
  query : string,
  params: Record<string, unknown> = {},
): Promise<T> {
  const revalidate = process.env.NODE_ENV === 'development' ? 0 : 30;

  return client.fetch<T>(query, params, {
    next: {
      revalidate,              // Dev: always fresh (0). Prod: ISR every 30s.
      tags       : ['sanity'], // On-demand: POST /api/revalidate invalidates this tag
    },
  });
}

