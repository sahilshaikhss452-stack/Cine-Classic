/**
 * GROQ queries for all Sanity content types.
 * Import the query + run it with sanityFetch().
 *
 * Example:
 *   import { STUDIOS_QUERY } from '@/lib/sanity.queries';
 *   import { sanityFetch }   from '@/lib/sanity';
 *   const studios = await sanityFetch<SanityStudio[]>(STUDIOS_QUERY);
 */

// ─── Studio Sets ─────────────────────────────────────────────────────────────

export const STUDIOS_QUERY = `
  *[_type == "studio"] | order(order asc) {
    _id,
    name,
    "slug": slug.current,
    tagline,
    description,
    size,
    height,
    powerCapacity,
    ratePerDay,
    ratePerShift,
    parking,
    suitable_for,
    facilities,
    "heroImage": heroImage.asset->url,
    "galleryImages": galleryImages[].asset->url,
    featured,
    order
  }
`;

export const STUDIO_BY_SLUG_QUERY = `
  *[_type == "studio" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    tagline,
    description,
    size,
    height,
    powerCapacity,
    ratePerDay,
    ratePerShift,
    parking,
    suitable_for,
    facilities,
    "heroImage": heroImage.asset->url,
    "galleryImages": galleryImages[].asset->url,
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
    quote,
    rating,
    "image": image.asset->url,
    featured,
    order
  }
`;
