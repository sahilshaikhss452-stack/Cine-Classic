import type { ProductionKind, ProductionDocument, TestimonialDocument } from './types';
import type { Production } from '@/lib/ui/production';
import { TYPE_COLORS } from '@/lib/ui/production';
import type { Testimonial } from '@/lib/ui/testimonial';

const PRODUCTION_GRADIENTS: Record<ProductionKind, string> = {
  Film: 'linear-gradient(160deg, #040a14 0%, #0a1a35 40%, #001020 100%)',
  'TV Series': 'linear-gradient(160deg, #1a0505 0%, #3d0a0a 40%, #0a0008 100%)',
  'Web Series': 'linear-gradient(160deg, #100003 0%, #2a0008 40%, #080010 100%)',
  Advertisement: 'linear-gradient(160deg, #030810 0%, #061428 40%, #0a1a20 100%)',
  'Music Video': 'linear-gradient(160deg, #100005 0%, #200010 40%, #050000 100%)',
};

export function mapProductionToUi(doc: ProductionDocument): Production {
  return {
    id: doc._id,
    title: doc.title,
    type: doc.type,
    year: doc.year,
    network: doc.network ?? undefined,
    description: doc.description ?? undefined,
    posterImage: doc.posterImage ?? undefined,
    videoUrl: doc.videoUrl ?? undefined,
    gradient: PRODUCTION_GRADIENTS[doc.type],
    typeColor: TYPE_COLORS[doc.type],
  };
}

export function mapProductionsToUi(docs: ProductionDocument[]): Production[] {
  return docs.map(mapProductionToUi);
}

export function mapTestimonialToUi(doc: TestimonialDocument): Testimonial {
  return {
    id: doc._id,
    initial: doc.clientName.charAt(0).toUpperCase(),
    name: doc.clientName,
    role: doc.role,
    production: doc.production ?? doc.productionHouse ?? undefined,
    network: doc.network ?? undefined,
    text: doc.quote,
  };
}

export function mapTestimonialsToUi(docs: TestimonialDocument[]): Testimonial[] {
  return docs.map(mapTestimonialToUi);
}
