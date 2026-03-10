import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import RevealProvider from '@/components/RevealProvider';
import StudioBooking from '@/components/studios/StudioBooking';
import StudioCard from '@/components/studios/StudioCard';
import StudioDetails from '@/components/studios/StudioDetails';
import StudioGallery from '@/components/studios/StudioGallery';
import StudioHero from '@/components/studios/StudioHero';
import StudioSubNav from '@/components/studios/StudioSubNav';
import { loadStudioBySlug, loadStudioCards, loadStudioSlugs } from '@/lib/sanity';

export const revalidate = 30;
export const dynamicParams = true;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await loadStudioSlugs();
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const studio = await loadStudioBySlug(slug);

  if (!studio) {
    return { title: 'Studio Not Found' };
  }

  return {
    title: studio.seo?.title ?? `${studio.title} - Cine Classic Studios`,
    description: studio.seo?.description ?? studio.tagline ?? undefined,
    openGraph: {
      title: studio.seo?.title ?? `${studio.title} - Cine Classic Studios`,
      description: studio.seo?.description ?? studio.tagline ?? undefined,
      type: 'website',
    },
  };
}

export default async function StudioPage({ params }: Props) {
  const { slug } = await params;
  const [studio, allStudios] = await Promise.all([loadStudioBySlug(slug), loadStudioCards()]);

  if (!studio) {
    notFound();
  }

  const otherStudios = allStudios.filter((item) => item.slug !== slug).slice(0, 3);

  return (
    <>
      <RevealProvider />
      <Navbar />
      <StudioSubNav />

      <main>
        <StudioHero studio={studio} />
        <StudioGallery studio={studio} />
        <StudioDetails studio={studio} />
        <StudioBooking studio={studio} />

        {otherStudios.length > 0 && (
          <section style={{ padding: '80px 5%', background: 'var(--dark2)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, var(--gold), transparent)', opacity: 0.15 }} />
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
                <div>
                  <div className="section-tag">Explore More</div>
                  <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}>
                    Other <span style={{ color: 'var(--gold)' }}>Studio Spaces</span>
                  </h2>
                </div>
                <Link href="/studios" style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gold)', border: '1px solid rgba(212,175,55,0.3)', padding: '10px 22px', borderRadius: '100px', transition: 'all 0.4s', textDecoration: 'none' }}>
                  View All Studios
                </Link>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {otherStudios.map((item, index) => (
                  <StudioCard key={item._id} studio={item} index={index} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
