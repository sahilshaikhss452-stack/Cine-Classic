import type { Metadata } from 'next';

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
}

export function buildPageMetadata({
  title,
  description,
  path,
  keywords,
  image = '/opengraph-image',
}: PageMetadataOptions): Metadata {
  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'en_IN',
      url: path,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}
