import type { Metadata } from 'next';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import RevealProvider from '@/components/RevealProvider';
import PortfolioBookingCTA from '@/components/portfolio/PortfolioBookingCTA';
import FeaturedProduction from '@/components/portfolio/FeaturedProduction';
import PortfolioHero from '@/components/portfolio/PortfolioHero';
import ProductionCompanies from '@/components/portfolio/ProductionCompanies';
import ProductionExplorer from '@/components/portfolio/ProductionExplorer';
import ProductionTimeline from '@/components/portfolio/ProductionTimeline';
import TrustedProductions from '@/components/portfolio/TrustedProductions';
import { loadFeaturedProduction, loadProductions, mapProductionToUi, mapProductionsToUi } from '@/lib/sanity';

export const metadata: Metadata = {
  title: 'Portfolio | Productions Shot at Cine Classic Studios Mumbai',
  description:
    'Explore films, web series, commercials, and digital productions shot at Cine Classic Studios in Mumbai.',
};

export const revalidate = 30;

export default async function PortfolioPage() {
  const [productionDocs, featuredDoc] = await Promise.all([loadProductions(), loadFeaturedProduction()]);
  const productions = mapProductionsToUi(productionDocs);
  const featuredProduction = featuredDoc ? mapProductionToUi(featuredDoc) : productions[0] ?? null;

  return (
    <>
      <RevealProvider />
      <Navbar />

      <main>
        <PortfolioHero totalProductions={productions.length} />
        <ProductionExplorer productions={productions} />
        <FeaturedProduction production={featuredProduction} />
        <ProductionTimeline productions={productions} />
        <TrustedProductions productions={productions} />
        <ProductionCompanies />
        <PortfolioBookingCTA />
      </main>

      <Footer />
    </>
  );
}