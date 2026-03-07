import Link from 'next/link';
import StudioCard from '@/components/studios/StudioCard';
import { STUDIO_SETS } from '@/data/sets';

export default function Sets() {
  return (
    <section id="sets" style={{ padding: '120px 5%', background: 'var(--dark)' }}>

      <div className="reveal" style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
        <div className="section-tag">Our Studio Spaces</div>
        <h2 style={{
          fontSize: 'clamp(1.75rem, 3.3vw, 2.5rem)',
          marginBottom: '1.1rem',
          letterSpacing: '-0.015em',
          lineHeight: 1.15,
        }}>
          Nine Sets.{' '}
          <span style={{ color: 'var(--gold)' }}>Endless Possibilities.</span>
        </h2>
        <p style={{
          fontSize: '1.05rem', color: 'var(--gray)',
          maxWidth: '580px', margin: '0 auto', fontWeight: 300, lineHeight: 1.7,
        }}>
          From blank-canvas floors to fully dressed sets — every story finds its perfect stage here.
          Click any studio to explore specs, facilities, and booking options.
        </p>
      </div>

      {/* Studios grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '1.5rem',
        maxWidth: '1200px',
        margin: '0 auto 3.5rem',
      }}>
        {STUDIO_SETS.map((studio, i) => (
          <StudioCard key={studio.id} studio={studio} index={i} />
        ))}
      </div>

      {/* View all CTA */}
      <div style={{ textAlign: 'center' }}>
        <Link href="/studios" className="btn-outline">
          View All Studios →
        </Link>
      </div>

    </section>
  );
}
