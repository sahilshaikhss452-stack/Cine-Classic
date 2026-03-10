import Link from 'next/link';
import StudioCard from '@/components/studios/StudioCard';
import AutoScrollCarousel from '@/components/motion/AutoScrollCarousel';
import type { SanityStudioCard } from '@/lib/sanity';

interface Props {
  /** Studios to display - fetched from Sanity by the parent page. */
  studios: SanityStudioCard[];
  sanityError?: string | null;
}

export default function Sets({ studios, sanityError }: Props) {
  const hasStudios = studios.length > 0;
  const statusMessage = sanityError ?? 'Sanity returned no studio documents for this section.';

  return (
    <section id="sets" className="mob-section" style={{ padding: '120px 5%', background: 'var(--dark)' }}>
      <div className="reveal" style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
        <div className="section-tag">Our Studio Spaces</div>
        <h2
          style={{
            fontSize: 'clamp(1.75rem, 3.3vw, 2.5rem)',
            marginBottom: '1.1rem',
            letterSpacing: '-0.015em',
            lineHeight: 1.15,
          }}
        >
          {hasStudios ? `${studios.length} Sets.` : 'Studio data unavailable.'}{' '}
          <span style={{ color: 'var(--gold)' }}>Endless Possibilities.</span>
        </h2>
        <p
          style={{
            fontSize: '1.05rem',
            color: 'var(--gray)',
            maxWidth: '580px',
            margin: '0 auto',
            fontWeight: 300,
            lineHeight: 1.7,
          }}
        >
          {hasStudios
            ? 'From blank-canvas floors to fully dressed sets - every story finds its perfect stage here. Click any studio to explore specs, facilities, and booking options.'
            : 'This section is currently showing the raw Sanity state so we can verify whether studio documents are being returned.'}
        </p>
      </div>

      {!hasStudios && (
        <div
          style={{
            maxWidth: '760px',
            margin: '0 auto 2rem',
            padding: '1rem 1.25rem',
            border: '1px solid rgba(212,175,55,0.3)',
            borderRadius: '14px',
            background: 'rgba(212,175,55,0.08)',
            color: 'var(--white)',
            lineHeight: 1.7,
          }}
        >
          <strong style={{ display: 'block', marginBottom: '0.35rem', color: 'var(--gold)' }}>
            Sanity studio section returned no documents
          </strong>
          <span>{statusMessage}</span>
        </div>
      )}

      {hasStudios && (
        <>
          <p className="swipe-hint">swipe to browse {'>'}</p>
          <AutoScrollCarousel className="studio-sets-grid">
            {studios.map((studio, i) => (
              <StudioCard key={studio._id} studio={studio} index={i} />
            ))}
          </AutoScrollCarousel>

          <div style={{ textAlign: 'center' }}>
            <Link href="/studios" className="btn-outline">
              View All Studios {'->'}
            </Link>
          </div>
        </>
      )}
    </section>
  );
}
