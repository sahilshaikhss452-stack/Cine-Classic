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
      <div style={{
        position: 'absolute', top: '-20%', left: '50%',
        transform: 'translateX(-50%)',
        width: '80%', height: '100%',
        background: 'radial-gradient(ellipse, rgba(212,175,55,0.06) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px',
        background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.4), transparent)',
      }} />

      <div style={{ position: 'relative', maxWidth: '700px', margin: '0 auto' }}>
        <div className="reveal">
          <div className="section-tag">Next Step</div>

          <h2 style={{
            fontFamily: 'var(--font-playfair), serif',
            fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
            fontWeight: 700, lineHeight: 1.1,
            color: 'var(--white)', marginBottom: '1.25rem',
          }}>
            Plan your next shoot with a <span style={{ color: 'var(--gold)' }}>studio built for working schedules</span>
          </h2>

          <p style={{
            fontSize: '1.05rem', color: 'var(--gray-lt)',
            lineHeight: 1.85, fontWeight: 300,
            marginBottom: '2.5rem',
          }}>
            If the portfolio matches the kind of production you are planning, send your brief and preferred dates. We will guide you to the right set, recce flow, and booking next step.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/#booking" className="btn-primary">
              Check Dates & Rates
            </Link>
            <Link href="/studios" className="btn-outline">
              Explore Studio Sets
            </Link>
          </div>

          <p style={{
            marginTop: '2rem',
            fontSize: '0.8rem', color: 'var(--gray)',
            letterSpacing: '0.05em',
          }}>
            Fast response · Recce support · Crew-friendly workflow
          </p>
        </div>
      </div>
    </section>
  );
}