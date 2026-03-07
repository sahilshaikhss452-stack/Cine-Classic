import Link from 'next/link';

export default function PortfolioBookingCTA() {
  return (
    <section style={{
      padding: '120px 5%',
      background: 'var(--dark2)',
      position: 'relative',
      overflow: 'hidden',
      textAlign: 'center',
    }}>

      {/* Ambient glow */}
      <div style={{
        position: 'absolute', top: '-20%', left: '50%',
        transform: 'translateX(-50%)',
        width: '80%', height: '100%',
        background: 'radial-gradient(ellipse, rgba(212,175,55,0.06) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      {/* Gold top border */}
      <div style={{
        position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px',
        background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.4), transparent)',
      }} />

      <div style={{ position: 'relative', maxWidth: '700px', margin: '0 auto' }}>

        <div className="reveal">
          <div className="section-tag">Book Now</div>

          <h2 style={{
            fontFamily: 'var(--font-playfair), serif',
            fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
            fontWeight: 700, lineHeight: 1.1,
            color: 'var(--white)', marginBottom: '1.25rem',
          }}>
            Bring Your Production{' '}
            <span style={{ color: 'var(--gold)' }}>to Life</span>
          </h2>

          <p style={{
            fontSize: '1.05rem', color: 'var(--gray-lt)',
            lineHeight: 1.85, fontWeight: 300,
            marginBottom: '2.5rem',
          }}>
            Join filmmakers, brands, and creators who have chosen Cine Classic Studios
            for their productions. Nine versatile sets, professional facilities,
            and a crew that cares about your vision.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/#booking" className="btn-primary">
              Book Your Studio →
            </Link>
            <Link href="/studios" className="btn-outline">
              Explore Studio Sets
            </Link>
          </div>

          {/* Trust line */}
          <p style={{
            marginTop: '2rem',
            fontSize: '0.8rem', color: 'var(--gray)',
            letterSpacing: '0.05em',
          }}>
            Available 24/7 · Quick response · Professional support
          </p>
        </div>
      </div>
    </section>
  );
}
