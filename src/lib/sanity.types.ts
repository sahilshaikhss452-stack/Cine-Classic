/**
 * TypeScript interfaces matching Sanity schema documents.
 * Use these as generic params with sanityFetch<T>().
 */

export interface SanityStudio {
  _id            : string;
  name           : string;
  slug           : string;
  tagline        : string;
  description    : string;
  size           : number;
  height         : number;
  powerCapacity  : string;
  ratePerDay     : number;
  ratePerShift   : number;
  parking        : string;
  suitable_for   : string[];
  facilities     : string[];
  heroImage      : string | null;
  galleryImages  : string[];
  featured       : boolean;
  order          : number;
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
  productionHouse: string;
  quote          : string;
  rating         : number;
  image          : string | null;
  featured       : boolean;
  order          : number;
}
