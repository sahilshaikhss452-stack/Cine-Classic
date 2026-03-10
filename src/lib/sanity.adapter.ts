/**
 * sanity.adapter.ts
 *
 * Converts Sanity CMS documents → frontend data models.
 * Studio sets are now consumed directly as SanityStudio / SanityStudioCard.
 * This file retains only the productions and testimonials adapters.
 */

import type { SanityProduction, SanityTestimonial } from './sanity.types';
import type { Production, ProductionType } from '@/data/productions';
import { TYPE_COLORS }       from '@/data/productions';
import type { Testimonial }  from '@/data/testimonials';

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
