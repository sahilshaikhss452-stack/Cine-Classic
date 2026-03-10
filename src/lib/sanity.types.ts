/**
 * TypeScript interfaces matching Sanity schema documents.
 * Use these as generic params with sanityFetch<T>().
 *
 * Studio types use a two-tier structure:
 *  - SanityStudioCard → minimal fields for card/listing components
 *  - SanityStudio     → full fields for detail page components (extends card)
 *
 * Number fields (size, height, rateHourly, ratePerDay, minBookingHours) are
 * intentionally kept as numbers so components can format them via studio-utils.ts.
 */

// ─── Layout zone (shared) ─────────────────────────────────────────────────────

export interface LayoutZone {
  label: string;
  x: string;
  y: string;
}

// ─── Studio card — minimal; used by listing pages + Sets section ──────────────

export interface SanityStudioCard {
  _id: string;
  title: string;
  slug: string;         // extracted from slug.current in GROQ
  tagline: string | null;
  size: number | null;  // sq ft — format with fmtSize()
  capacity: string | null;
  icon: string | null;  // emoji
  accentColor: string | null;  // hex color
  gradient: string | null;  // CSS gradient
  suitableFor: string[];       // renamed from suitable_for in GROQ projection
  heroImage: string | null;  // Sanity CDN URL
  featured: boolean;
}

// ─── Full studio — extends card; used by detail page components ───────────────

export interface SanityStudio extends SanityStudioCard {
  description: string | null;
  height: number | null;   // ft — format with fmtHeight()
  rateHourly: number | null;   // ₹/hour — format with fmtRate()
  rateUnit: string | null;   // "/hour" | "/day" | "/shift"
  ratePerDay: number | null;   // ₹/day
  ratePerShift: number | null;   // ₹/shift
  minBookingHours: number | null;   // format with fmtMinBooking()
  parking: string | null;
  powerCapacity: string | null;
  facilities: string[];
  productions: string[] | null;
  galleryImages: string[] | null; // Sanity CDN URLs
  setPdfUrl: string | null;   // Sanity CDN URL for pre-made set deck PDF
  setLayoutImage: string | null;   // Sanity CDN URL for floor plan
  setLayoutDescription: string | null;
  layoutZones: LayoutZone[] | null;
  order: number;
}

// ─── Productions ──────────────────────────────────────────────────────────────

export interface SanityProduction {
  _id: string;
  title: string;
  type: 'Film' | 'TV Series' | 'Web Series' | 'Advertisement' | 'Music Video';
  year: number;
  network: string | null;
  description: string | null;
  posterImage: string | null;
  featured: boolean;
  order: number;
}

// ─── Facility ─────────────────────────────────────────────────────────────────

export interface SanityFacility {
  _id: string;
  name: string;
  icon: string;
  description: string;
  category: 'production' | 'technical' | 'comfort' | 'infrastructure';
  order: number;
}

// ─── Testimonial ──────────────────────────────────────────────────────────────

export interface SanityTestimonial {
  _id: string;
  clientName: string;
  role: string;
  productionHouse: string | null;
  production: string | null;  // show / film / campaign name
  network: string | null;  // platform (Netflix, SonyLIV…)
  quote: string;
  rating: number;
  image: string | null;
  featured: boolean;
  order: number;
}
