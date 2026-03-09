/**
 * TypeScript interfaces matching Sanity schema documents.
 * Use these as generic params with sanityFetch<T>().
 */

export interface SanityStudio {
  _id                 : string;
  name                : string;
  slug                : string;
  tagline             : string | null;
  description         : string | null;
  // Physical specs
  size                : number | null;   // sq ft
  height              : number | null;   // ft
  capacity            : string | null;   // e.g. "Up to 60 people"
  // Pricing
  rateHourly          : number | null;   // ₹/hour (primary "from" rate)
  ratePerDay          : number | null;   // ₹/day
  ratePerShift        : number | null;   // ₹/shift
  rateUnit            : string | null;   // "/hour" | "/day" | "/shift"
  minBookingHours     : number | null;   // minimum booking in hours
  // Infrastructure
  parking             : string | null;
  powerCapacity       : string | null;
  // Brand / visual identity
  icon                : string | null;   // emoji
  accentColor         : string | null;   // hex color
  gradient            : string | null;   // CSS gradient string
  // Content
  suitable_for        : string[];
  facilities          : string[];
  productions         : string[] | null;
  layoutZones         : { label: string; x: string; y: string }[] | null;
  // Images & files
  heroImage           : string | null;   // Sanity CDN URL
  galleryImages       : string[] | null; // Sanity CDN URLs
  setPdfUrl           : string | null;   // Sanity CDN URL for set deck PDF
  setLayoutImage      : string | null;   // Sanity CDN URL for floor plan
  setLayoutDescription: string | null;
  // Listing
  featured            : boolean;
  order               : number;
}

export interface SanityProduction {
  _id         : string;
  title       : string;
  type        : 'Film' | 'TV Series' | 'Web Series' | 'Advertisement' | 'Music Video';
  year        : number;
  network     : string | null;
  description : string | null;
  posterImage : string | null;
  featured    : boolean;
  order       : number;
}

export interface SanityFacility {
  _id         : string;
  name        : string;
  icon        : string;
  description : string;
  category    : 'production' | 'technical' | 'comfort' | 'infrastructure';
  order       : number;
}

export interface SanityTestimonial {
  _id            : string;
  clientName     : string;
  role           : string;
  productionHouse: string | null;
  production     : string | null;  // show / film / campaign name
  network        : string | null;  // platform (Netflix, SonyLIV…)
  quote          : string;
  rating         : number;
  image          : string | null;
  featured       : boolean;
  order          : number;
}
