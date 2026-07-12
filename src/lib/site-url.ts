const DEFAULT_SITE_URL = 'https://cine-classic-nextjs.vercel.app';

export function getSiteUrl(): string {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!configuredUrl) {
    return DEFAULT_SITE_URL;
  }

  return configuredUrl.replace(/\/$/, '');
}

export function absoluteUrl(path = '/'): string {
  return new URL(path, `${getSiteUrl()}/`).toString();
}
