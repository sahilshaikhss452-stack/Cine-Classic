import Navbar            from '@/components/Navbar';
import Hero              from '@/components/Hero';
import About             from '@/components/About';
import Sets              from '@/components/Sets';
import ProductionTypes   from '@/components/ProductionTypes';
import BehindScenes      from '@/components/BehindScenes';
import Gallery           from '@/components/Gallery';
import StudioComparison  from '@/components/StudioComparison';
import ShootTimeline     from '@/components/ShootTimeline';
import AvailabilityCalendar from '@/components/AvailabilityCalendar';
import Productions       from '@/components/Productions';
import Testimonials      from '@/components/Testimonials';
import LocationSection   from '@/components/LocationSection';
import Booking           from '@/components/Booking';
import Footer            from '@/components/Footer';
import FloatingButtons   from '@/components/FloatingButtons';
import RevealProvider    from '@/components/RevealProvider';

export default function HomePage() {
  return (
    <>
      {/* Mounts the IntersectionObserver for scroll-reveal animations */}
      <RevealProvider />

      {/* Floating CTA Buttons */}
      <FloatingButtons />

      <Navbar />

      <main>
        {/* 1 ─── HERO — cinematic first impression + immediate CTA */}
        <Hero />

        {/* 2 ─── ABOUT — who we are, credibility */}
        <About />

        {/* 3 ─── STUDIO SETS — browse all 9 studio spaces */}
        <Sets />

        {/* 4 ─── PRODUCTION TYPES — what we support */}
        <ProductionTypes />

        {/* 5 ─── BEHIND THE SCENES — build trust, show the facility */}
        <BehindScenes />

        {/* 6 ─── GALLERY — visual proof */}
        <Gallery />

        {/* 7 ─── STUDIO COMPARISON — decision-making tool */}
        <StudioComparison />

        {/* 8 ─── HOW IT WORKS — transparent booking process */}
        <ShootTimeline />

        {/* 9 ─── AVAILABILITY CALENDAR — check dates */}
        <AvailabilityCalendar />

        {/* 10 ─── PRODUCTIONS — social proof, track record */}
        <Productions />

        {/* 11 ─── TESTIMONIALS — reviews */}
        <Testimonials />

        {/* 12 ─── LOCATION — where to find us */}
        <LocationSection />

        {/* 13 ─── BOOKING — final conversion */}
        <Booking />
      </main>

      <Footer />
    </>
  );
}
