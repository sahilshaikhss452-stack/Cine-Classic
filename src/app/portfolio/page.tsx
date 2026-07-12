import type { Metadata } from 'next';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import RevealProvider from '@/components/RevealProvider';
import PortfolioBookingCTA from '@/components/portfolio/PortfolioBookingCTA';
import FeaturedProduction from '@/components/portfolio/FeaturedProduction';
import PortfolioHero from '@/components/portfolio/PortfolioHero';
import ProductionCompanies from '@/components/portfolio/ProductionCompanies';
import ProductionExplorer from '@/components/portfolio/ProductionExplorer';
import { loadFeaturedProduction, loadProductions, mapProductionToUi, mapProductionsToUi } from '@/lib/sanity';
import { buildPageMetadata } from '@/lib/page-metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Productions Shot at Our Mumbai Studios',
  description:
    'Explore films, web series, commercials, and digital productions shot at Cine Classic Studios in Mumbai.',
  path: '/portfolio',
});

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
        <ProductionCompanies />
        <PortfolioBookingCTA />
      </main>

      <Footer />
    </>
  );
}
