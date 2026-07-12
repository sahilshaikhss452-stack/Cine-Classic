import type { MetadataRoute } from 'next';
import { loadStudioSlugs } from '@/lib/sanity';
import { absoluteUrl } from '@/lib/site-url';

const STATIC_ROUTES = [
  '/',
  '/studios',
  '/portfolio',
  '/facilities',
  '/about',
  '/film-studio-rental-mumbai',
  '/photoshoot-studio-mumbai',
  '/music-video-shoot-location',
  '/ad-film-studio',
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const studioSlugs = await loadStudioSlugs();
  const lastModified = new Date();

  return [
    ...STATIC_ROUTES.map((path) => ({
      url: absoluteUrl(path),
      lastModified,
      changeFrequency: path === '/' ? ('weekly' as const) : ('monthly' as const),
      priority: path === '/' ? 1 : path === '/studios' ? 0.9 : 0.7,
    })),
    ...studioSlugs.map(({ slug }) => ({
      url: absoluteUrl(`/studios/${slug}`),
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  ];
}
