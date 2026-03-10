const SANITY_PROJECT_ID_PATTERN = /^[a-z0-9-]+$/;
const SANITY_DATASET_PATTERN = /^~?[a-z0-9_-]{1,64}$/;
const SANITY_API_VERSION = '2024-01-01';

function requireEnvVar(name: string, value: string | undefined): string {
  const trimmed = (value ?? '').trim();
  if (!trimmed) {
    throw new Error('[Sanity config] Missing required env var "' + name + '".');
  }

  return trimmed;
}

function validateProjectId(name: string, value: string | undefined): string {
  const projectId = requireEnvVar(name, value);
  if (!SANITY_PROJECT_ID_PATTERN.test(projectId)) {
    throw new Error(
      '[Sanity config] Invalid ' + name + ' "' + projectId + '". Expected lowercase letters, numbers, and dashes only.',
    );
  }

  return projectId;
}

function validateDataset(name: string, value: string | undefined): string {
  const dataset = requireEnvVar(name, value);
  if (!SANITY_DATASET_PATTERN.test(dataset)) {
    throw new Error(
      '[Sanity config] Invalid ' + name + ' "' + dataset + '". Expected 1-64 chars: lowercase letters, numbers, underscores, dashes; optional leading "~".',
    );
  }

  return dataset;
}

function getOptionalEnvVar(name: string, value: string | undefined): string | null {
  const trimmed = (value ?? '').trim();
  return trimmed ? trimmed : null;
}

function ensureMatchingEnvVars(primaryName: string, secondaryName: string, primaryValue: string | null, secondaryValue: string | null) {
  if (primaryValue && secondaryValue && primaryValue !== secondaryValue) {
    throw new Error(
      '[Sanity config] ' + primaryName + ' and ' + secondaryName + ' must match when both are provided.',
    );
  }
}

export function getSanityProjectId(value = process.env.SANITY_PROJECT_ID): string {
  return validateProjectId('SANITY_PROJECT_ID', value);
}

export function getSanityDataset(value = process.env.SANITY_DATASET): string {
  return validateDataset('SANITY_DATASET', value);
}

export function getStudioSanityProjectId(): string {
  const canonicalValue = getOptionalEnvVar('SANITY_PROJECT_ID', process.env.SANITY_PROJECT_ID);
  const studioValue = getOptionalEnvVar('SANITY_STUDIO_PROJECT_ID', process.env.SANITY_STUDIO_PROJECT_ID);

  ensureMatchingEnvVars('SANITY_PROJECT_ID', 'SANITY_STUDIO_PROJECT_ID', canonicalValue, studioValue);

  return validateProjectId(canonicalValue ? 'SANITY_PROJECT_ID' : 'SANITY_STUDIO_PROJECT_ID', canonicalValue ?? studioValue ?? undefined);
}

export function getStudioSanityDataset(): string {
  const canonicalValue = getOptionalEnvVar('SANITY_DATASET', process.env.SANITY_DATASET);
  const studioValue = getOptionalEnvVar('SANITY_STUDIO_DATASET', process.env.SANITY_STUDIO_DATASET);

  ensureMatchingEnvVars('SANITY_DATASET', 'SANITY_STUDIO_DATASET', canonicalValue, studioValue);

  return validateDataset(canonicalValue ? 'SANITY_DATASET' : 'SANITY_STUDIO_DATASET', canonicalValue ?? studioValue ?? undefined);
}

export function getSanityApiVersion(): string {
  return SANITY_API_VERSION;
}

export function getSanityConfig() {
  return {
    projectId: getSanityProjectId(),
    dataset: getSanityDataset(),
    apiVersion: getSanityApiVersion(),
  };
}

export function requireSanityWriteToken(value = process.env.SANITY_WRITE_TOKEN): string {
  return requireEnvVar('SANITY_WRITE_TOKEN', value);
}

export function requireSanityRevalidateSecret(
  value = process.env.SANITY_REVALIDATE_SECRET,
): string {
  return requireEnvVar('SANITY_REVALIDATE_SECRET', value);
}
