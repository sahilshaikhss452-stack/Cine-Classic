import Link from 'next/link';

interface Props {
  totalProductions: number;
}

export default function PortfolioHero({ totalProductions }: Props) {
  return (
    <section style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', padding: '140px 5% 90px' }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse at 15% 60%, rgba(212,175,55,0.06) 0%, transparent 55%),
            radial-gradient(ellipse at 85% 20%, rgba(120,60,180,0.07) 0%, transparent 50%),
            linear-gradient(160deg, #0e0a04 0%, #060606 60%, #04060c 100%)
          `,
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            repeating-linear-gradient(90deg, transparent 0, transparent 80px, rgba(255,255,255,0.013) 80px, rgba(255,255,255,0.013) 81px),
            repeating-linear-gradient(0deg, transparent 0, transparent 60px, rgba(255,255,255,0.009) 60px, rgba(255,255,255,0.009) 61px)
          `,
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: '48px',
          background: 'rgba(0,0,0,0.35)',
          borderLeft: '1px solid rgba(255,255,255,0.04)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-around',
          padding: '3rem 0',
          pointerEvents: 'none',
        }}
      >
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} style={{ width: '18px', height: '14px', borderRadius: '3px', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.5)' }} />
        ))}
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%', background: 'linear-gradient(to bottom, transparent, var(--dark))', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', maxWidth: '1200px', width: '100%', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--gray)', marginBottom: '2rem', fontFamily: 'var(--font-inter), sans-serif', letterSpacing: '0.05em' }}>
          <Link href="/" style={{ color: 'var(--gray)', transition: 'color 0.3s' }}>
            Home
          </Link>
          <span style={{ opacity: 0.35 }}>›</span>
          <span style={{ color: 'var(--gold)' }}>Portfolio</span>
        </div>

        <div className="section-tag">Our Work</div>

        <h1 style={{ fontFamily: 'var(--font-playfair), serif', fontSize: 'clamp(2.2rem, 5.5vw, 4.6rem)', fontWeight: 700, lineHeight: 1.06, color: 'var(--white)', maxWidth: '820px', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
          Productions Shot at <span style={{ color: 'var(--gold)' }}>Cine Classic Studios</span>
        </h1>

        <p style={{ fontSize: '1.1rem', color: 'var(--gray-lt)', maxWidth: '580px', fontWeight: 300, lineHeight: 1.85, marginBottom: '2.8rem' }}>
          Discover the films, television shows, commercials, and digital productions that brought their stories to life at our studio.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          <Link href="/#booking" className="btn-primary">
            Book a Studio {'->'}
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '11px 20px', background: 'rgba(212,175,55,0.07)', border: '1px solid rgba(212,175,55,0.22)', borderRadius: '100px' }}>
            <span style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '1.5rem', fontWeight: 700, color: 'var(--gold)' }}>{totalProductions}+</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--gray-lt)', fontWeight: 500, letterSpacing: '0.04em' }}>Productions Filmed Here</span>
          </div>
        </div>
      </div>
    </section>
  );
}
