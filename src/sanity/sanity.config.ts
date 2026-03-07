/**
 * Sanity project configuration used by the data-fetching client.
 * The Sanity Studio itself lives in: sanity-studio/
 *
 * To launch the CMS dashboard locally:
 *   cd sanity-studio && npm install && npm run dev
 *   → opens http://localhost:3333
 */
export const sanityConfig = {
  projectId : process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '',
  dataset   : process.env.NEXT_PUBLIC_SANITY_DATASET   ?? 'production',
  apiVersion: '2024-01-01',
};
