import { describe, expect, it } from 'vitest';
import { buildPageMetadata } from './page-metadata';

describe('buildPageMetadata', () => {
  it('creates canonical and social metadata for a page', () => {
    const metadata = buildPageMetadata({
      title: 'Studio Sets in Mumbai',
      description: 'Explore production-ready sets.',
      path: '/studios',
    });

    expect(metadata.alternates).toEqual({ canonical: '/studios' });
    expect(metadata.openGraph).toMatchObject({
      title: 'Studio Sets in Mumbai',
      url: '/studios',
      images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Studio Sets in Mumbai' }],
    });
    expect(metadata.twitter).toMatchObject({
      card: 'summary_large_image',
      images: ['/opengraph-image'],
    });
  });
});
