/**
 * sanity.adapter.ts
 *
 * Converts Sanity CMS documents → frontend data models.
 * This decoupling layer means components only ever see the plain data
 * model types — they don't know (or care) whether the data came from
 * Sanity or the hardcoded fallbacks in src/data/*.ts.
 */

import type { SanityStudio, SanityProduction, SanityTestimonial } from './sanity.types';
import type { StudioSet }    from '@/data/sets';
import { STUDIO_SETS }       from '@/data/sets';
import type { Production, ProductionType } from '@/data/productions';
import { TYPE_COLORS }       from '@/data/productions';
import type { Testimonial }  from '@/data/testimonials';

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Format an integer with Indian-locale commas: 8000 → "8,000" */
function commaNum(n: number): string {
  return n.toLocaleString('en-IN');
}

// ─── Studio adapter ──────────────────────────────────────────────────────────

/**
 * Convert a single SanityStudio document to a StudioSet.
 *
 * Conversion rules:
 *  - size (number, sq ft)     → "6,000 sq ft"
 *  - height (number, ft)      → "20 ft"
 *  - rateHourly (number, ₹)   → "₹8,000"   (preferred over ratePerDay)
 *  - ratePerDay (number, ₹)   → "₹40,000"  (fallback when no hourly rate)
 *  - minBookingHours (number) → "4 hours"
 *  - powerCapacity            → power
 *  - tagline                  → shortDescription (first 120 chars of description as fallback)
 *  - suitable_for             → suitableFor
 *  - _id                      → id
 *  - null/undefined fields    → sensible defaults or undefined
 */
export function sanityStudioToSet(s: SanityStudio): StudioSet {
  // Derive the "from" rate and unit
  const rateFrom = s.rateHourly
    ? `₹${commaNum(s.rateHourly)}`
    : s.ratePerDay
    ? `₹${commaNum(s.ratePerDay)}`
    : '₹—';

  const rateUnit = s.rateUnit ?? (s.rateHourly ? '/hour' : '/day');

  // Minimum booking as human-readable string
  const minBooking = s.minBookingHours
    ? `${s.minBookingHours} ${s.minBookingHours === 1 ? 'hour' : 'hours'}`
    : undefined;

  return {
    id              : s._id,
    slug            : s.slug,
    label           : s.name,
    name            : s.name,
    shortDescription: s.tagline ?? (s.description ? s.description.slice(0, 120) : ''),
    description     : s.description ?? '',
    size            : s.size    ? `${commaNum(s.size)} sq ft` : '—',
    ceilingHeight   : s.height  ? `${s.height} ft`            : '—',
    capacity        : s.capacity ?? '—',
    rateFrom,
    rateUnit,
    parking         : s.parking       ?? undefined,
    power           : s.powerCapacity ?? undefined,
    minBooking,
    facilities      : s.facilities   ?? [],
    suitableFor     : s.suitable_for ?? [],
    icon            : s.icon        ?? '🎬',
    gradient        : s.gradient    ?? 'linear-gradient(135deg, #1a1a1a, #2a2a2a)',
    accentColor     : s.accentColor ?? '#d4af37',
    heroImage       : s.heroImage        ?? undefined,
    galleryImages   : s.galleryImages?.length ? s.galleryImages : undefined,
    setPdfUrl       : s.setPdfUrl        ?? undefined,
    setLayoutImage  : s.setLayoutImage   ?? undefined,
    setLayoutDescription: s.setLayoutDescription ?? undefined,
    productions     : s.productions  ?? undefined,
    layoutZones     : s.layoutZones  ?? undefined,
  };
}

/** Convert an array of SanityStudio documents to StudioSets */
export function sanityStudiosToSets(studios: SanityStudio[]): StudioSet[] {
  return studios.map(sanityStudioToSet);
}

/**
 * Merge Sanity documents with the hardcoded STUDIO_SETS fallback.
 *
 * Strategy (gradual migration — safe to call at any stage):
 *  1. Hardcoded sets are the baseline — always shown.
 *  2. Any Sanity doc whose slug matches a hardcoded set overrides it with CMS data.
 *  3. Any Sanity doc with a slug not in hardcoded is appended as a brand-new set.
 *
 * Result:
 *  - 0 Sanity docs  → all 9 hardcoded sets (unchanged behaviour)
 *  - 1 Sanity doc   → 8 hardcoded + 1 CMS-powered (gradual migration)
 *  - 9 Sanity docs  → all 9 CMS-powered (full migration)
 *  - 10+ Sanity docs → 9 overridden + extra new sets appended
 */
export function mergeStudiosWithFallback(sanityDocs: SanityStudio[]): StudioSet[] {
  if (!sanityDocs.length) return STUDIO_SETS;

  const sanityMap = new Map(sanityStudiosToSets(sanityDocs).map(s => [s.slug, s]));
  const hardcodedSlugs = new Set(STUDIO_SETS.map(s => s.slug));

  // Step 1 — hardcoded baseline, override with CMS where slug matches
  const merged: StudioSet[] = STUDIO_SETS.map(s => sanityMap.get(s.slug) ?? s);

  // Step 2 — append any brand-new CMS sets not present in hardcoded list
  for (const [slug, set] of sanityMap) {
    if (!hardcodedSlugs.has(slug)) merged.push(set);
  }

  return merged;
}

// ─── Production adapter ───────────────────────────────────────────────────────

/**
 * Cinematic gradient per production type — used when no posterImage is uploaded.
 * Keeping these consistent avoids random colours across page refreshes.
 */
const PRODUCTION_TYPE_GRADIENTS: Record<string, string> = {
  'Film':          'linear-gradient(160deg, #040a14 0%, #0a1a35 40%, #001020 100%)',
  'Web Series':    'linear-gradient(160deg, #100003 0%, #2a0008 40%, #080010 100%)',
  'TV Series':     'linear-gradient(160deg, #1a0505 0%, #3d0a0a 40%, #0a0008 100%)',
  'Advertisement': 'linear-gradient(160deg, #030810 0%, #061428 40%, #0a1a20 100%)',
  'Music Video':   'linear-gradient(160deg, #100005 0%, #200010 40%, #050000 100%)',
};

/**
 * Convert a single SanityProduction document to the frontend Production model.
 *
 * Conversion rules:
 *  - gradient   → derived from production type (no manual input needed)
 *  - typeColor  → derived from TYPE_COLORS map
 */
export function sanityProductionToProduction(s: SanityProduction): Production {
  const type = s.type as ProductionType;
  return {
    id          : s._id,
    title       : s.title,
    type,
    year        : s.year,
    network     : s.network     ?? undefined,
    description : s.description ?? undefined,
    posterImage : s.posterImage ?? undefined,
    gradient    : PRODUCTION_TYPE_GRADIENTS[type] ?? 'linear-gradient(160deg, #0a0a0a, #1a1a1a)',
    typeColor   : TYPE_COLORS[type] ?? '#d4af37',
  };
}

/** Convert an array of SanityProduction documents to Production[] */
export function sanityProductionsToProductions(docs: SanityProduction[]): Production[] {
  return docs.map(sanityProductionToProduction);
}

// ─── Testimonial adapter ──────────────────────────────────────────────────────

/**
 * Convert a single SanityTestimonial document to the frontend Testimonial model.
 *
 * Conversion rules:
 *  - initial  → first character of clientName (derived, not stored)
 *  - text     → quote field in Sanity
 */
export function sanityTestimonialToTestimonial(s: SanityTestimonial): Testimonial {
  return {
    id         : s._id,
    initial    : s.clientName.charAt(0).toUpperCase(),
    name       : s.clientName,
    role       : s.role,
    production : s.production      ?? s.productionHouse ?? undefined,
    network    : s.network         ?? undefined,
    text       : s.quote,
  };
}

/** Convert an array of SanityTestimonial documents to Testimonial[] */
export function sanityTestimonialsToTestimonials(docs: SanityTestimonial[]): Testimonial[] {
  return docs.map(sanityTestimonialToTestimonial);
}
