import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import NetworkLogoStrip from '@/components/NetworkLogoStrip';
import Sets from '@/components/Sets';
import Productions from '@/components/Productions';
import BehindScenes from '@/components/BehindScenes';
import Gallery from '@/components/Gallery';
import Testimonials from '@/components/Testimonials';
import ProductionTypes from '@/components/ProductionTypes';
import ShootTimeline from '@/components/ShootTimeline';
import AvailabilityCalendar from '@/components/AvailabilityCalendar';
import About from '@/components/About';
import LocationSection from '@/components/LocationSection';
import Booking from '@/components/Booking';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';
import RevealProvider from '@/components/RevealProvider';
import MotionSection from '@/components/motion/MotionSection';

// Data sources
import { PRODUCTIONS } from '@/data/productions';
import type { Production } from '@/data/productions';
import { TESTIMONIALS } from '@/data/testimonials';
import type { Testimonial } from '@/data/testimonials';
import { sanityFetch } from '@/lib/sanity';
import { STUDIO_CARD_QUERY, PRODUCTIONS_QUERY, TESTIMONIALS_QUERY } from '@/lib/sanity.queries';
import type { SanityStudioCard, SanityProduction, SanityTestimonial } from '@/lib/sanity.types';
import {
  sanityProductionsToProductions,
  sanityTestimonialsToTestimonials,
} from '@/lib/sanity.adapter';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  // â”€â”€ Fetch all CMS content in parallel â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // All three fetches run concurrently. Each has its own try/catch so a single
  // Sanity failure doesn't take down the entire page.

  // Studios: direct SanityStudioCard[] â€” no adapter or merge needed
  let studios: SanityStudioCard[] = [];

  // Productions: Sanity-first, full hardcoded array as emergency fallback
  let productions: Production[] = PRODUCTIONS;

  // Testimonials: Sanity-first, full hardcoded array as emergency fallback
  let testimonials: Testimonial[] = TESTIMONIALS;

  const [studioDocs, productionDocs, testimonialDocs] = await Promise.allSettled([
    sanityFetch<SanityStudioCard[]>(STUDIO_CARD_QUERY),
    sanityFetch<SanityProduction[]>(PRODUCTIONS_QUERY),
    sanityFetch<SanityTestimonial[]>(TESTIMONIALS_QUERY),
  ]);

  if (studioDocs.status === 'fulfilled') studios = studioDocs.value;
  if (productionDocs.status === 'fulfilled')
    productions = sanityProductionsToProductions(productionDocs.value);
  if (testimonialDocs.status === 'fulfilled')
    testimonials = sanityTestimonialsToTestimonials(testimonialDocs.value);

  return (
    <>
      {/* Mounts the IntersectionObserver for card-level scroll-reveal animations */}
      <RevealProvider />

      {/* Floating CTA Buttons (WhatsApp + Book Studio) â€” appear after 400px scroll */}
      <FloatingButtons />

      <Navbar />

      <main>
        {/* 1 â”€â”€â”€ HERO â€” cinematic first impression + primary CTA
            Hero handles its own parallax internally; no MotionSection wrapper. */}
        <Hero />

        {/* 2 â”€â”€â”€ NETWORK STRIP â€” instant credibility: Netflix, Amazon, SonyLIVâ€¦
            No motion wrapper â€” renders immediately below hero fold. */}
        <NetworkLogoStrip />

        {/* 3 â”€â”€â”€ STUDIO SETS â€” browse all production-ready spaces (Sanity-powered) */}
        <MotionSection>
          <Sets studios={studios} />
        </MotionSection>

        {/* 4 â”€â”€â”€ PRODUCTIONS â€” powerful social proof before asking for commitment.
            Sacred Games, Scam 1992, Gully Boy â€” shown early to build desire. */}
        <MotionSection>
          <Productions productions={productions} />
        </MotionSection>

        {/* 5 â”€â”€â”€ BEHIND THE SCENES â€” show the real facility, build trust */}
        <MotionSection>
          <BehindScenes />
        </MotionSection>

        {/* 6 â”€â”€â”€ GALLERY â€” visual proof of production quality */}
        <MotionSection>
          <Gallery />
        </MotionSection>

        {/* 7 â”€â”€â”€ TESTIMONIALS â€” peer validation before the process & booking ask */}
        <MotionSection>
          <Testimonials testimonials={testimonials} />
        </MotionSection>

        {/* 8 â”€â”€â”€ PRODUCTION TYPES â€” supporting context (film, web, ad, music video) */}
        <MotionSection>
          <ProductionTypes />
        </MotionSection>

        {/* 9 â”€â”€â”€ HOW IT WORKS â€” transparent booking process */}
        <MotionSection>
          <ShootTimeline />
        </MotionSection>

        {/* 10 â”€â”€â”€ AVAILABILITY CALENDAR â€” check dates, create urgency */}
        <MotionSection>
          <AvailabilityCalendar studios={studios} />
        </MotionSection>

        {/* 11 â”€â”€â”€ ABOUT â€” brand story for those who want deeper context */}
        <MotionSection>
          <About />
        </MotionSection>

        {/* 12 â”€â”€â”€ LOCATION â€” practical logistics */}
        <MotionSection>
          <LocationSection />
        </MotionSection>

        {/* 13 â”€â”€â”€ BOOKING â€” final conversion point */}
        <MotionSection>
          <Booking />
        </MotionSection>
      </main>

      <Footer />
    </>
  );
}

