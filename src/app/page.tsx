import About from '@/components/About';
import AvailabilityCalendar from '@/components/AvailabilityCalendar';
import Booking from '@/components/Booking';
import FloatingButtons from '@/components/FloatingButtons';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import LocationSection from '@/components/LocationSection';
import Navbar from '@/components/Navbar';
import NetworkLogoStrip from '@/components/NetworkLogoStrip';
import ProductionTypes from '@/components/ProductionTypes';
import Productions from '@/components/Productions';
import RevealProvider from '@/components/RevealProvider';
import Sets from '@/components/Sets';
import ShootTimeline from '@/components/ShootTimeline';
import Testimonials from '@/components/Testimonials';
import MotionSection from '@/components/motion/MotionSection';
import {
  loadHomeMoviesTvProductions,
  loadHomeMusicAdsProductions,
  loadHomePage,
  loadStudioCards,
  loadStudioNavItems,
  loadTestimonials,
  mapProductionsToUi,
  mapTestimonialsToUi,
} from '@/lib/sanity';

export const revalidate = 30;

export default async function HomePage() {
  const [homePage, studios, studioNavItems, moviesTvDocs, musicAdsDocs, testimonialDocs] = await Promise.all([
    loadHomePage(),
    loadStudioCards(),
    loadStudioNavItems(),
    loadHomeMoviesTvProductions(),
    loadHomeMusicAdsProductions(),
    loadTestimonials(),
  ]);

  const moviesTvProductions = mapProductionsToUi(moviesTvDocs);
  const musicAdsProductions = mapProductionsToUi(musicAdsDocs);
  const testimonials = mapTestimonialsToUi(testimonialDocs);

  return (
    <>
      <RevealProvider />
      <FloatingButtons />
      <Navbar />

      <main>
        <Hero content={homePage} />
        <NetworkLogoStrip />

        <MotionSection>
          <Sets studios={studios} />
        </MotionSection>

        <MotionSection>
          <Productions
            productions={moviesTvProductions}
            heading="Movies, TV shows, and web series shot at Cine Classic Studios"
            headingHighlight="Cine Classic Studios"
            description="A quick view of long-form storytelling and episodic productions that trust the studio for controlled builds, recurring schedules, and production-ready set support."
          />
        </MotionSection>

        <MotionSection>
          <Productions
            productions={musicAdsProductions}
            sectionId="productions-music-ads"
            heading="Music videos and ad campaigns shot at Cine Classic Studios"
            headingHighlight="Cine Classic Studios"
            description="A focused reel of commercial campaigns and music-led shoots that rely on the studio for art direction, polished frames, and fast-moving production days."
            emptyDescription="Publish Music Video or Advertisement productions with a video URL in Sanity to populate this playable homepage rail."
            enableVideoPlayback
          />
        </MotionSection>

        <MotionSection>
          <Testimonials testimonials={testimonials} />
        </MotionSection>

        <MotionSection>
          <ProductionTypes />
        </MotionSection>

        <MotionSection>
          <ShootTimeline />
        </MotionSection>

        <MotionSection>
          <AvailabilityCalendar studios={studios} />
        </MotionSection>

        <MotionSection>
          <About content={homePage} />
        </MotionSection>

        <MotionSection>
          <LocationSection />
        </MotionSection>

        <MotionSection>
          <Booking studios={studioNavItems} />
        </MotionSection>
      </main>

      <Footer />
    </>
  );
}
