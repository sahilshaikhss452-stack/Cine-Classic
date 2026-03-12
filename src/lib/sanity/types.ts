export interface SeoFields {
  title: string | null;
  description: string | null;
}

export interface CtaLink {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  label: string;
  url: string;
}

export interface HeroStat {
  label: string;
  value: string;
}

export interface SiteSettings {
  businessName: string;
  tagline: string | null;
  logoUrl: string | null;
  phone: string;
  whatsappNumber: string;
  email: string;
  hoursText: string | null;
  addressLine1: string;
  addressLine2: string | null;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  mapsEmbedUrl: string | null;
  mapsUrl: string | null;
  socialLinks: SocialLink[];
  featuredClients: string[];
  defaultSeo: SeoFields | null;
}

export interface HomePageContent {
  heroBadge: string | null;
  heroHeadline: string;
  heroHighlight: string;
  heroSubheadline: string;
  heroPrimaryCta: CtaLink;
  heroSecondaryCta: CtaLink;
  heroStats: HeroStat[];
  aboutEyebrow: string | null;
  aboutTitle: string;
  aboutDescription: string;
  aboutSecondaryDescription: string | null;
  aboutFeatures: string[];
  aboutBadge: string | null;
  aboutImageUrl: string | null;
  seo: SeoFields | null;
}

export interface LayoutZone {
  label: string;
  x: string;
  y: string;
}

export interface StudioAreaImage {
  _key: string;
  imageUrl: string | null;
  alt: string | null;
  caption: string | null;
}

export interface StudioArea {
  _key: string;
  areaName: string;
  shortDescription: string | null;
  images: StudioAreaImage[];
}

export interface StudioNavItem {
  _id: string;
  title: string;
  slug: string;
}

export interface StudioCard {
  _id: string;
  title: string;
  slug: string;
  tagline: string | null;
  size: number | null;
  capacity: string | null;
  icon: string | null;
  accentColor: string | null;
  gradient: string | null;
  suitableFor: string[];
  heroImage: string | null;
  featured: boolean;
}

export interface Studio extends StudioCard {
  description: string | null;
  height: number | null;
  rateHourly: number | null;
  rateUnit: string | null;
  ratePerDay: number | null;
  ratePerShift: number | null;
  minBookingHours: number | null;
  parking: string | null;
  powerCapacity: string | null;
  facilities: string[];
  productions: string[];
  galleryImages: string[];
  studioAreas: StudioArea[];
  setPdfUrl: string | null;
  setLayoutImage: string | null;
  setLayoutDescription: string | null;
  layoutZones: LayoutZone[];
  order: number;
  seo: SeoFields | null;
}

export type ProductionKind =
  | 'Film'
  | 'TV Series'
  | 'Web Series'
  | 'Advertisement'
  | 'Music Video';

export interface ProductionDocument {
  _id: string;
  title: string;
  type: ProductionKind;
  year: number;
  network: string | null;
  description: string | null;
  posterImage: string | null;
  videoUrl: string | null;
  featured: boolean;
  showOnMoviesTvCarousel?: boolean;
  showOnMusicAdsCarousel?: boolean;
  showOnHome?: boolean;
  order: number;
}

export interface TestimonialDocument {
  _id: string;
  clientName: string;
  role: string;
  productionHouse: string | null;
  production: string | null;
  network: string | null;
  quote: string;
  image: string | null;
  featured: boolean;
  order: number;
}

export interface FacilityDocument {
  _id: string;
  name: string;
  icon: string | null;
  shortDescription: string | null;
  features: string[];
  note: string | null;
  accentColor: string | null;
  gradient: string | null;
  order: number;
}

export interface FaqItem {
  _id: string;
  question: string;
  answer: string;
  placements: string[];
  order: number;
}

export type SanityStudioCard = StudioCard;
export type SanityStudio = Studio;
export type SanityProduction = ProductionDocument;
export type SanityTestimonial = TestimonialDocument;
export type SanityFacility = FacilityDocument;
