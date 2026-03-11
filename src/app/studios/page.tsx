import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import RevealProvider from '@/components/RevealProvider';
import StudioCard from '@/components/studios/StudioCard';
import { loadStudioCards } from '@/lib/sanity';

export const revalidate = 30;

export const metadata: Metadata = {
  title: 'Studios | Cine Classic Studios Mumbai',
  description:
    'Explore production-ready studio sets in Mumbai for films, commercials, OTT shoots, music videos, and photoshoots.',
};

export default async function StudiosPage() {
  const studios = await loadStudioCards();
  const hasStudios = studios.length > 0;

  return (
    <>
      <RevealProvider />
      <Navbar />

      <main>
        <section style={{ padding: '140px 5% 80px', background: 'var(--dark)', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `
                radial-gradient(ellipse 60% 50% at 50% 20%, rgba(212,175,55,0.06) 0%, transparent 60%),
                var(--dark)
              `,
              pointerEvents: 'none',
            }}
          />

          <div style={{ position: 'relative', maxWidth: '760px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--gray)', marginBottom: '1.5rem', fontFamily: 'var(--font-inter), sans-serif' }}>
              <Link href="/" style={{ color: 'var(--gray)' }}>Home</Link>
              <span style={{ opacity: 0.4 }}>/</span>
              <span style={{ color: 'var(--gold)' }}>Studios</span>
            </div>

            <div className="section-tag" style={{ justifyContent: 'center' }}>Studio Sets</div>

            <h1 style={{ fontFamily: 'var(--font-playfair), serif', fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 700, lineHeight: 1.1, color: 'var(--white)', marginBottom: '1.25rem' }}>
              {hasStudios ? `${studios.length} production-ready studio sets` : 'Production-ready studio sets in Mumbai'}{' '}
              <em style={{ fontStyle: 'normal', background: 'linear-gradient(135deg, var(--gold), var(--gold-lt))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                for fast-moving shoots.
              </em>
            </h1>

            <p style={{ fontSize: '1.05rem', color: 'var(--gray)', fontWeight: 300, lineHeight: 1.8 }}>
              Explore each set for look, layout, logistics, gallery coverage, and booking details so your team can shortlist the right space with more confidence.
            </p>
          </div>
        </section>

        <section style={{ padding: '20px 5% 100px', background: 'var(--dark)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            {!hasStudios && (
              <div style={{ marginBottom: '1.5rem', padding: '1rem 1.25rem', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '14px', background: 'rgba(212,175,55,0.08)', color: 'var(--white)', lineHeight: 1.7 }}>
                <strong style={{ display: 'block', marginBottom: '0.35rem', color: 'var(--gold)' }}>Studio documents are not published yet</strong>
                <span>Publish active studio documents in Sanity to populate this catalogue.</span>
              </div>
            )}

            {hasStudios && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
                {studios.map((studio, index) => (
                  <StudioCard key={studio._id} studio={studio} index={index} />
                ))}
              </div>
            )}
          </div>
        </section>

        <section style={{ padding: '60px 5%', background: 'var(--dark2)', textAlign: 'center', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, var(--gold), transparent)', opacity: 0.15 }} />
          <div style={{ maxWidth: '620px', margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', marginBottom: '0.75rem' }}>Need help choosing the right set?</h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--gray)', fontWeight: 300, marginBottom: '1.75rem', lineHeight: 1.8 }}>
              Share the kind of scene, crew size, and date range you are planning. We can help you shortlist the best studio or combine multiple sets for the shoot.
            </p>
            <Link href="/#booking" className="btn-primary">
              Get Studio Guidance
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}