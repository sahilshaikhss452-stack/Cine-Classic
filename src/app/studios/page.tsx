import type { Metadata } from 'next';
import Link              from 'next/link';
import Navbar            from '@/components/Navbar';
import Footer            from '@/components/Footer';
import RevealProvider    from '@/components/RevealProvider';
import StudioCard        from '@/components/studios/StudioCard';

// Data sources
import { STUDIO_SETS }           from '@/data/sets';
import type { StudioSet }        from '@/data/sets';
import { sanityFetch }           from '@/lib/sanity';
import { STUDIOS_QUERY }         from '@/lib/sanity.queries';
import type { SanityStudio }     from '@/lib/sanity.types';
import { mergeStudiosWithFallback } from '@/lib/sanity.adapter';

export const metadata: Metadata = {
  title: 'Our Studios – Cine Classic Studios',
  description:
    'Explore all studio spaces at Cine Classic Studios — from empty floors to fully dressed market sets, chawl, court, hospital, and police station sets.',
};

/**
 * Fetch all studios — Sanity-first, hardcoded fallback.
 * Uses mergeStudiosWithFallback so partial CMS migrations are safe:
 * CMS docs override matching hardcoded sets; unpublished sets stay hardcoded.
 */
async function getStudios(): Promise<StudioSet[]> {
  try {
    const docs = await sanityFetch<SanityStudio[]>(STUDIOS_QUERY);
    return mergeStudiosWithFallback(docs);
  } catch {
    // Sanity unavailable — fall through
  }
  return STUDIO_SETS;
}

export default async function StudiosPage() {
  const studios = await getStudios();

  return (
    <>
      <RevealProvider />
      <Navbar />

      <main>
        {/* Page hero */}
        <section style={{
          padding   : '140px 5% 80px',
          background: 'var(--dark)',
          position  : 'relative',
          overflow  : 'hidden',
          textAlign : 'center',
        }}>
          <div style={{
            position    : 'absolute',
            inset       : 0,
            background  : `
              radial-gradient(ellipse 60% 50% at 50% 20%, rgba(212,175,55,0.06) 0%, transparent 60%),
              var(--dark)
            `,
            pointerEvents: 'none',
          }} />

          <div style={{ position: 'relative', maxWidth: '700px', margin: '0 auto' }}>
            {/* Breadcrumb */}
            <div style={{
              display       : 'flex',
              justifyContent: 'center',
              gap           : '0.5rem',
              fontSize      : '0.75rem',
              color         : 'var(--gray)',
              marginBottom  : '1.5rem',
              fontFamily    : 'var(--font-inter), sans-serif',
            }}>
              <Link href="/" style={{ color: 'var(--gray)' }}>Home</Link>
              <span style={{ opacity: 0.4 }}>›</span>
              <span style={{ color: 'var(--gold)' }}>Studios</span>
            </div>

            <div className="section-tag" style={{ justifyContent: 'center' }}>Studio Spaces</div>

            <h1 style={{
              fontFamily  : 'var(--font-playfair), serif',
              fontSize    : 'clamp(2.5rem, 6vw, 4rem)',
              fontWeight  : 700,
              lineHeight  : 1.1,
              color       : 'var(--white)',
              marginBottom: '1.25rem',
            }}>
              {studios.length} Sets.{' '}
              <em style={{
                fontStyle              : 'normal',
                background             : 'linear-gradient(135deg, var(--gold), var(--gold-lt))',
                WebkitBackgroundClip   : 'text',
                WebkitTextFillColor    : 'transparent',
                backgroundClip         : 'text',
              }}>
                Infinite Stories.
              </em>
            </h1>

            <p style={{
              fontSize  : '1.05rem',
              color     : 'var(--gray)',
              fontWeight: 300,
              lineHeight: 1.8,
            }}>
              From blank-canvas floors to fully dressed market bazaars, chawls, courtrooms,
              hospitals, and police stations — every story finds its perfect stage here.
            </p>
          </div>
        </section>

        {/* Studios grid */}
        <section style={{
          padding   : '20px 5% 100px',
          background: 'var(--dark)',
        }}>
          <div style={{
            maxWidth           : '1200px',
            margin             : '0 auto',
            display            : 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap                : '1.5rem',
          }}>
            {studios.map((studio, i) => (
              <StudioCard key={studio.id} studio={studio} index={i} />
            ))}
          </div>
        </section>

        {/* Bottom CTA strip */}
        <section style={{
          padding   : '60px 5%',
          background: 'var(--dark2)',
          textAlign : 'center',
          position  : 'relative',
        }}>
          <div style={{
            position  : 'absolute',
            top       : 0,
            left      : 0,
            right     : 0,
            height    : '1px',
            background: 'linear-gradient(90deg, transparent, var(--gold), transparent)',
            opacity   : 0.15,
          }} />
          <div style={{ maxWidth: '560px', margin: '0 auto' }}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', marginBottom: '0.75rem' }}>
              Not sure which set?
            </h2>
            <p style={{
              fontSize    : '0.95rem',
              color       : 'var(--gray)',
              fontWeight  : 300,
              marginBottom: '1.75rem',
              lineHeight  : 1.8,
            }}>
              Tell us your project and we&apos;ll recommend the perfect space — or help you
              combine multiple sets for maximum impact.
            </p>
            <Link href="/#booking" className="btn-primary">
              Get a Custom Quote →
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
