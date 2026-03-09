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

/** All studio slugs — used in generateStaticParams */
export const STUDIO_SLUGS_QUERY = `
  *[_type == "studio"] | order(order asc) {
    "slug": slug.current
  }
`;

/** Full studio list — used on /studios listing page + homepage Sets section */
export const STUDIOS_QUERY = `
  *[_type == "studio"] | order(order asc) {
    _id,
    name,
    "slug": slug.current,
    tagline,
    description,
    size,
    height,
    capacity,
    powerCapacity,
    ratePerDay,
    ratePerShift,
    rateHourly,
    rateUnit,
    minBookingHours,
    parking,
    icon,
    accentColor,
    gradient,
    suitable_for,
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

/** Single studio by slug — used on /studios/[slug] landing page */
export const STUDIO_BY_SLUG_QUERY = `
  *[_type == "studio" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    tagline,
    description,
    size,
    height,
    capacity,
    powerCapacity,
    ratePerDay,
    ratePerShift,
    rateHourly,
    rateUnit,
    minBookingHours,
    parking,
    icon,
    accentColor,
    gradient,
    suitable_for,
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
