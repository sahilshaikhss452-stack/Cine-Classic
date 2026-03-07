import Navbar        from '@/components/Navbar';
import Hero          from '@/components/Hero';
import About         from '@/components/About';
import Sets          from '@/components/Sets';
import Gallery       from '@/components/Gallery';
import Productions   from '@/components/Productions';
import Testimonials  from '@/components/Testimonials';
import Booking       from '@/components/Booking';
import Footer        from '@/components/Footer';
import RevealProvider from '@/components/RevealProvider';

export default function HomePage() {
  return (
    <>
      {/* Mounts the IntersectionObserver for scroll-reveal animations */}
      <RevealProvider />

      <Navbar />

      <main>
        <Hero />
        <About />
        <Sets />
        <Gallery />
        <Productions />
        <Testimonials />
        <Booking />
      </main>

      <Footer />
    </>
  );
}
