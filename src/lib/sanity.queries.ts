/**
 * GROQ queries for all Sanity content types.
 * Import the query + run it with sanityFetch().
 *
 * Example:
 *   import { STUDIO_CARD_QUERY } from '@/lib/sanity.queries';
 *   import { sanityFetch }      from '@/lib/sanity';
 *   const studios = await sanityFetch<SanityStudioCard[]>(STUDIO_CARD_QUERY);
 */

// ─── Studio Sets ─────────────────────────────────────────────────────────────

/** All studio slugs — used in generateStaticParams */
export const STUDIO_SLUGS_QUERY = `
  *[_type == "studio"] | order(order asc) {
    "slug": slug.current
  }
`;

/**
 * Minimal studio fields for card / listing components.
 * Used on: homepage Sets section, /studios listing page, "More Studios" rail.
 * GROQ renames suitable_for → suitableFor at the query level.
 */
export const STUDIO_CARD_QUERY = `
  *[_type == "studio"] | order(order asc) {
    _id,
    "title": name,
    "slug": slug.current,
    tagline,
    size,
    capacity,
    icon,
    accentColor,
    gradient,
    "suitableFor": suitable_for,
    "heroImage": heroImage.asset->url,
    featured
  }
`;

/**
 * Full studio fields for detail page components.
 * Used on: /studios/[slug] landing page.
 * GROQ renames suitable_for → suitableFor at the query level.
 */
export const STUDIO_DETAIL_QUERY = `
  *[_type == "studio" && slug.current == $slug][0] {
    _id,
    "title": name,
    "slug": slug.current,
    tagline,
    description,
    size,
    height,
    capacity,
    rateHourly,
    rateUnit,
    ratePerDay,
    ratePerShift,
    minBookingHours,
    parking,
    powerCapacity,
    icon,
    accentColor,
    gradient,
    "suitableFor": suitable_for,
    facilities,
    productions,
    layoutZones,
    "heroImage": heroImage.asset->url,
    "galleryImages": galleryImages[].asset->url,
    "setPdfUrl": setPDF.asset->url,
    "setLayoutImage": setLayoutImage.asset->url,
    setLayoutDescription,
    featured,
    order
  }
`;

// ─── Productions / Portfolio ──────────────────────────────────────────────────

export const PRODUCTIONS_QUERY = `
  *[_type == "production"] | order(year desc, order asc) {
    _id,
    title,
    type,
    year,
    network,
    description,
    "posterImage": posterImage.asset->url,
    featured,
    order
  }
`;

export const FEATURED_PRODUCTION_QUERY = `
  *[_type == "production" && featured == true][0] {
    _id,
    title,
    type,
    year,
    network,
    description,
    "posterImage": posterImage.asset->url
  }
`;

// ─── Facilities ───────────────────────────────────────────────────────────────

export const FACILITIES_QUERY = `
  *[_type == "facility"] | order(order asc) {
    _id,
    name,
    icon,
    description,
    category,
    order
  }
`;

// ─── Testimonials ─────────────────────────────────────────────────────────────

export const TESTIMONIALS_QUERY = `
  *[_type == "testimonial" && featured == true] | order(order asc) {
    _id,
    clientName,
    role,
    productionHouse,
    production,
    network,
    quote,
    rating,
    "image": image.asset->url,
    featured,
    order
  }
`;
