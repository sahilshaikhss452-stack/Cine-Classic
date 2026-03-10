import { createClient } from '@sanity/client';
import { getSanityConfig } from './env';

const { projectId, dataset, apiVersion } = getSanityConfig();

function getSanityRequestTagPrefix() {
  const scope =
    process.env.VERCEL_GIT_COMMIT_SHA ??
    process.env.VERCEL_DEPLOYMENT_ID ??
    process.env.VERCEL_URL ??
    `local-${process.pid}`;

  const sanitizedScope = scope.toLowerCase().replace(/[^a-z0-9._-]/g, '-').replace(/^-+|-+$/g, '');
  const suffix = sanitizedScope.slice(0, 66) || 'local';

  return `site.${suffix}`;
}

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: 'published',
  requestTagPrefix: getSanityRequestTagPrefix(),
});
