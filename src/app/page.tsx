import Navbar            from '@/components/Navbar';
import Hero              from '@/components/Hero';
import About             from '@/components/About';
import Sets              from '@/components/Sets';
import ProductionTypes   from '@/components/ProductionTypes';
import BehindScenes      from '@/components/BehindScenes';
import Gallery           from '@/components/Gallery';
import ShootTimeline     from '@/components/ShootTimeline';
import AvailabilityCalendar from '@/components/AvailabilityCalendar';
import Productions       from '@/components/Productions';
import Testimonials      from '@/components/Testimonials';
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

      {/* Floating CTA Buttons */}
      <FloatingButtons />

      <Navbar />

      <main>
        {/* 1 ─── HERO — cinematic first impression + immediate CTA
            Hero handles its own parallax internally; no MotionSection wrapper. */}
        <Hero />

        {/* 2 ─── ABOUT — who we are, credibility */}
        <MotionSection>
          <About />
        </MotionSection>

        {/* 3 ─── STUDIO SETS — browse all 9 studio spaces */}
        <MotionSection>
          <Sets />
        </MotionSection>

        {/* 4 ─── PRODUCTION TYPES — what we support */}
        <MotionSection>
          <ProductionTypes />
        </MotionSection>

        {/* 5 ─── BEHIND THE SCENES — build trust, show the facility */}
        <MotionSection>
          <BehindScenes />
        </MotionSection>

        {/* 6 ─── GALLERY — visual proof */}
        <MotionSection>
          <Gallery />
        </MotionSection>

        {/* 7 ─── HOW IT WORKS — transparent booking process */}
        <MotionSection>
          <ShootTimeline />
        </MotionSection>

        {/* 8 ─── AVAILABILITY CALENDAR — check dates */}
        <MotionSection>
          <AvailabilityCalendar />
        </MotionSection>

        {/* 9 ─── PRODUCTIONS — social proof, track record */}
        <MotionSection>
          <Productions />
        </MotionSection>

        {/* 10 ─── TESTIMONIALS — reviews */}
        <MotionSection>
          <Testimonials />
        </MotionSection>

        {/* 11 ─── LOCATION — where to find us */}
        <MotionSection>
          <LocationSection />
        </MotionSection>

        {/* 12 ─── BOOKING — final conversion */}
        <MotionSection>
          <Booking />
        </MotionSection>
      </main>

      <Footer />
    </>
  );
}
