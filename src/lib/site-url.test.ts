import { afterEach, describe, expect, it } from 'vitest';
import { absoluteUrl, getSiteUrl } from './site-url';

const originalSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

afterEach(() => {
  if (originalSiteUrl === undefined) {
    delete process.env.NEXT_PUBLIC_SITE_URL;
  } else {
    process.env.NEXT_PUBLIC_SITE_URL = originalSiteUrl;
  }
});

describe('site URL helpers', () => {
  it('uses the current production fallback when no public URL is configured', () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;

    expect(getSiteUrl()).toBe('https://cine-classic-nextjs.vercel.app');
    expect(absoluteUrl('/studios')).toBe('https://cine-classic-nextjs.vercel.app/studios');
  });

  it('normalizes a configured custom domain', () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://www.cineclassicstudios.com/';

    expect(getSiteUrl()).toBe('https://www.cineclassicstudios.com');
    expect(absoluteUrl('/portfolio')).toBe('https://www.cineclassicstudios.com/portfolio');
  });
});
