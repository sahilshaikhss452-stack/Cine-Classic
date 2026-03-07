import type { Metadata } from 'next';
import Navbar               from '@/components/Navbar';
import Footer               from '@/components/Footer';
import RevealProvider       from '@/components/RevealProvider';
import PortfolioHero        from '@/components/portfolio/PortfolioHero';
import ProductionExplorer   from '@/components/portfolio/ProductionExplorer';
import FeaturedProduction   from '@/components/portfolio/FeaturedProduction';
import ProductionTimeline   from '@/components/portfolio/ProductionTimeline';
import TrustedProductions   from '@/components/portfolio/TrustedProductions';
import ProductionCompanies  from '@/components/portfolio/ProductionCompanies';
import PortfolioBookingCTA  from '@/components/portfolio/PortfolioBookingCTA';

export const metadata: Metadata = {
  title: 'Portfolio – Productions Shot at Cine Classic Studios',
  description:
    'Explore films, TV shows, web series, and commercials shot at Cine Classic Studios. Trusted by Netflix India, Amazon Prime, Dharma Productions, and more.',
};

export default function PortfolioPage() {
  return (
    <>
      <RevealProvider />
      <Navbar />

      <main>
        {/* 1. Cinematic hero */}
        <PortfolioHero />

        {/* 2. Filter + Netflix-style grid + modal */}
        <ProductionExplorer />

        {/* 3. Featured production spotlight */}
        <FeaturedProduction />

        {/* 4. Year-by-year timeline */}
        <ProductionTimeline />

        {/* 5. Trusted productions name wall */}
        <TrustedProductions />

        {/* 6. Production companies */}
        <ProductionCompanies />

        {/* 7. Booking CTA */}
        <PortfolioBookingCTA />
      </main>

      <Footer />
    </>
  );
}
