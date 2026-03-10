import About from '@/components/About';
import AvailabilityCalendar from '@/components/AvailabilityCalendar';
import BehindScenes from '@/components/BehindScenes';
import Booking from '@/components/Booking';
import FloatingButtons from '@/components/FloatingButtons';
import Footer from '@/components/Footer';
import Gallery from '@/components/Gallery';
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
  loadHomePage,
  loadHomeProductions,
  loadStudioCards,
  loadStudioNavItems,
  loadTestimonials,
  mapProductionsToUi,
  mapTestimonialsToUi,
} from '@/lib/sanity';

export const revalidate = 30;

export default async function HomePage() {
  const [homePage, studios, studioNavItems, productionDocs, testimonialDocs] = await Promise.all([
    loadHomePage(),
    loadStudioCards(),
    loadStudioNavItems(),
    loadHomeProductions(),
    loadTestimonials(),
  ]);

  const productions = mapProductionsToUi(productionDocs);
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
          <Productions productions={productions} />
        </MotionSection>

        <MotionSection>
          <BehindScenes />
        </MotionSection>

        <MotionSection>
          <Gallery />
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
