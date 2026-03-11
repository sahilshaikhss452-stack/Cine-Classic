import Link from 'next/link';
import StudioCard from '@/components/studios/StudioCard';
import AutoScrollCarousel from '@/components/motion/AutoScrollCarousel';
import { ArrowRightIcon } from '@/components/ui/icons';
import type { SanityStudioCard } from '@/lib/sanity';

interface Props {
  studios: SanityStudioCard[];
  sanityError?: string | null;
}

export default function Sets({ studios, sanityError }: Props) {
  const hasStudios = studios.length > 0;

  return (
    <section id="sets" className="mob-section" style={{ padding: '120px 5%', background: 'var(--dark)' }}>
      <div className="reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <div className="section-tag">Studio Sets</div>
        <h2
          style={{
            fontSize: 'clamp(1.85rem, 3.5vw, 2.7rem)',
            marginBottom: '1rem',
            letterSpacing: '-0.02em',
            lineHeight: 1.14,
          }}
        >
          {hasStudios ? 'Browse our production-ready studio sets' : 'Studio set catalogue is being refreshed.'}{' '}
          <span style={{ color: 'var(--gold)' }}>Built for faster shoot decisions.</span>
        </h2>
        <p
          style={{
            fontSize: '1.02rem',
            color: 'var(--gray)',
            maxWidth: '660px',
            margin: '0 auto',
            fontWeight: 300,
            lineHeight: 1.78,
          }}
        >
          {hasStudios
            ? 'Review each set for look, layout, gallery coverage, production specs, and booking details so your team can shortlist the right studio with less back-and-forth.'
            : 'Our studio pages are temporarily unavailable while content refreshes. Share your brief below and we will recommend the right set directly.'}
        </p>
      </div>

      {!hasStudios && (
        <div
          style={{
            maxWidth: '760px',
            margin: '0 auto 2rem',
            padding: '1.2rem 1.35rem',
            border: '1px solid rgba(212,175,55,0.24)',
            borderRadius: '16px',
            background: 'rgba(212,175,55,0.08)',
            color: 'var(--white)',
            lineHeight: 1.7,
            textAlign: 'center',
          }}
        >
          <strong style={{ display: 'block', marginBottom: '0.4rem', color: 'var(--gold)' }}>
            Studio details will be back shortly
          </strong>
          <span>
            {sanityError ??
              'If you need availability right away, send one inquiry with your shoot brief and our team will guide you to the best-fit studio.'}
          </span>
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
              Explore All Studios
              <ArrowRightIcon size={15} />
            </Link>
          </div>
        </>
      )}
    </section>
  );
}