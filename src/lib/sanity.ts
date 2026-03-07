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
  useCdn    : process.env.NODE_ENV === 'production',
  token     : process.env.SANITY_API_TOKEN,  // Only needed for write operations
});

// ─── Image URL Builder ────────────────────────────────────────────────────────

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// ─── Type-safe fetch helper ───────────────────────────────────────────────────

export async function sanityFetch<T>(
  query : string,
  params: Record<string, unknown> = {},
): Promise<T> {
  return client.fetch<T>(query, params, {
    next: { revalidate: 60 },  // Revalidate every 60 seconds (ISR)
  });
}
