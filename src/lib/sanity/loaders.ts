import { cache } from 'react';
import { sanityClient } from './client';
import {
  FAQS_BY_PLACEMENT_QUERY,
  FACILITIES_QUERY,
  FEATURED_PRODUCTION_QUERY,
  HOME_PAGE_QUERY,
  HOME_PRODUCTIONS_QUERY,
  PRODUCTIONS_QUERY,
  SITE_SETTINGS_QUERY,
  STUDIO_CARD_QUERY,
  STUDIO_DETAIL_QUERY,
  STUDIO_NAV_QUERY,
  STUDIO_SLUGS_QUERY,
  TESTIMONIALS_QUERY,
} from './queries';
import type {
  FacilityDocument,
  FaqItem,
  HomePageContent,
  ProductionDocument,
  SiteSettings,
  Studio,
  StudioCard,
  StudioNavItem,
  TestimonialDocument,
} from './types';

const SANITY_TAG = 'sanity';
const SANITY_REVALIDATE_SECONDS = 30;
const SANITY_DEBUG_ENABLED =
  process.env.NODE_ENV !== 'production' || process.env.DEBUG_SANITY === '1';

function getFetchOptions() {
  return {
    next: {
      revalidate: process.env.NODE_ENV === 'development' ? 0 : SANITY_REVALIDATE_SECONDS,
      tags: [SANITY_TAG],
    },
  };
}

export async function sanityFetch<T>(query: string, params: Record<string, unknown> = {}): Promise<T> {
  return sanityClient.fetch<T>(query, params, getFetchOptions());
}

function requireDocument<T>(document: T | null, label: string): T {
  if (!document) {
    throw new Error('[Sanity content] Missing required document: ' + label + '.');
  }

  return document;
}

function logStudioCollection(source: string, studios: StudioCard[]) {
  if (!SANITY_DEBUG_ENABLED) {
    return;
  }

  console.info('[sanity:studios] ' + source, {
    count: studios.length,
    slugs: studios.map((studio) => studio.slug),
    validSlugs: studios.every((studio) => typeof studio.slug === 'string' && studio.slug.length > 0),
    sample: studios.slice(0, 3).map((studio) => ({
      title: studio.title,
      slug: studio.slug,
      tagline: studio.tagline,
    })),
  });
}

function logStudioDetail(source: string, studio: Studio | null, slug: string) {
  if (!SANITY_DEBUG_ENABLED) {
    return;
  }

  console.info('[sanity:studios] ' + source, {
    requestedSlug: slug,
    found: !!studio,
    title: studio?.title ?? null,
    fields: studio ? Object.keys(studio) : [],
  });
}

export const loadSiteSettings = cache(async (): Promise<SiteSettings> => {
  const settings = await sanityFetch<SiteSettings | null>(SITE_SETTINGS_QUERY);
  if (SANITY_DEBUG_ENABLED) {
    console.info('[sanity:siteSettings] loadSiteSettings', {
      hasDocument: !!settings,
      keys: settings ? Object.keys(settings) : [],
      businessName: settings?.businessName ?? null,
      projectId: process.env.SANITY_PROJECT_ID ?? null,
      dataset: process.env.SANITY_DATASET ?? null,
    });
  }
  return requireDocument(settings, 'siteSettings');
});

export const loadHomePage = cache(async (): Promise<HomePageContent> => {
  const homePage = await sanityFetch<HomePageContent | null>(HOME_PAGE_QUERY);
  return requireDocument(homePage, 'homePage');
});

export const loadStudioNavItems = cache(async (): Promise<StudioNavItem[]> => {
  return sanityFetch<StudioNavItem[]>(STUDIO_NAV_QUERY);
});

export const loadStudioCards = cache(async (): Promise<StudioCard[]> => {
  const studios = await sanityFetch<StudioCard[]>(STUDIO_CARD_QUERY);
  logStudioCollection('loadStudioCards', studios);
  return studios;
});

export const loadStudioSlugs = cache(async (): Promise<{ slug: string }[]> => {
  return sanityFetch<{ slug: string }[]>(STUDIO_SLUGS_QUERY);
});

export const loadStudioBySlug = cache(async (slug: string): Promise<Studio | null> => {
  const studio = await sanityFetch<Studio | null>(STUDIO_DETAIL_QUERY, { slug });
  logStudioDetail('loadStudioBySlug', studio, slug);
  return studio;
});

export const loadHomeProductions = cache(async (): Promise<ProductionDocument[]> => {
  return sanityFetch<ProductionDocument[]>(HOME_PRODUCTIONS_QUERY);
});

export const loadProductions = cache(async (): Promise<ProductionDocument[]> => {
  return sanityFetch<ProductionDocument[]>(PRODUCTIONS_QUERY);
});

export const loadFeaturedProduction = cache(async (): Promise<ProductionDocument | null> => {
  return sanityFetch<ProductionDocument | null>(FEATURED_PRODUCTION_QUERY);
});

export const loadTestimonials = cache(async (): Promise<TestimonialDocument[]> => {
  return sanityFetch<TestimonialDocument[]>(TESTIMONIALS_QUERY);
});

export const loadFacilities = cache(async (): Promise<FacilityDocument[]> => {
  return sanityFetch<FacilityDocument[]>(FACILITIES_QUERY);
});

export const loadFaqsByPlacement = cache(async (placement: string): Promise<FaqItem[]> => {
  return sanityFetch<FaqItem[]>(FAQS_BY_PLACEMENT_QUERY, { placement });
});

export { SANITY_REVALIDATE_SECONDS, SANITY_TAG };
