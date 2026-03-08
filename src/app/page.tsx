import Navbar            from '@/components/Navbar';
import Hero              from '@/components/Hero';
import NetworkLogoStrip  from '@/components/NetworkLogoStrip';
import Sets              from '@/components/Sets';
import Productions       from '@/components/Productions';
import BehindScenes      from '@/components/BehindScenes';
import Gallery           from '@/components/Gallery';
import Testimonials      from '@/components/Testimonials';
import ProductionTypes   from '@/components/ProductionTypes';
import ShootTimeline     from '@/components/ShootTimeline';
import AvailabilityCalendar from '@/components/AvailabilityCalendar';
import About             from '@/components/About';
import LocationSection   from '@/components/LocationSection';
import Booking           from '@/components/Booking';
import Footer            from '@/components/Footer';
import FloatingButtons   from '@/components/FloatingButtons';
import RevealProvider    from '@/components/RevealProvider';
import MotionSection     from '@/components/motion/MotionSection';

export default function HomePage() {
  return (
    <>
      {/* Mounts the IntersectionObserver for card-level scroll-reveal animations */}
      <RevealProvider />

      {/* Floating CTA Buttons (WhatsApp + Book Studio) — appear after 400px scroll */}
      <FloatingButtons />

      <Navbar />

      <main>
        {/* 1 ─── HERO — cinematic first impression + primary CTA
            Hero handles its own parallax internally; no MotionSection wrapper. */}
        <Hero />

        {/* 2 ─── NETWORK STRIP — instant credibility: Netflix, Amazon, SonyLIV…
            No motion wrapper — renders immediately below hero fold. */}
        <NetworkLogoStrip />

        {/* 3 ─── STUDIO SETS — browse all 9 production-ready spaces */}
        <MotionSection>
          <Sets />
        </MotionSection>

        {/* 4 ─── PRODUCTIONS — powerful social proof before asking for commitment.
            Sacred Games, Scam 1992, Gully Boy — shown early to build desire. */}
        <MotionSection>
          <Productions />
        </MotionSection>

        {/* 5 ─── BEHIND THE SCENES — show the real facility, build trust */}
        <MotionSection>
          <BehindScenes />
        </MotionSection>

        {/* 6 ─── GALLERY — visual proof of production quality */}
        <MotionSection>
          <Gallery />
        </MotionSection>

        {/* 7 ─── TESTIMONIALS — peer validation before the process & booking ask */}
        <MotionSection>
          <Testimonials />
        </MotionSection>

        {/* 8 ─── PRODUCTION TYPES — supporting context (film, web, ad, music video) */}
        <MotionSection>
          <ProductionTypes />
        </MotionSection>

        {/* 9 ─── HOW IT WORKS — transparent booking process */}
        <MotionSection>
          <ShootTimeline />
        </MotionSection>

        {/* 10 ─── AVAILABILITY CALENDAR — check dates, create urgency */}
        <MotionSection>
          <AvailabilityCalendar />
        </MotionSection>

        {/* 11 ─── ABOUT — brand story for those who want deeper context */}
        <MotionSection>
          <About />
        </MotionSection>

        {/* 12 ─── LOCATION — practical logistics */}
        <MotionSection>
          <LocationSection />
        </MotionSection>

        {/* 13 ─── BOOKING — final conversion point */}
        <MotionSection>
          <Booking />
        </MotionSection>
      </main>

      <Footer />
    </>
  );
}
