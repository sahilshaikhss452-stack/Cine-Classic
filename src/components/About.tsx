const FEATURES = [
  'Professional LED lighting rigs',
  'Climate-controlled spaces',
  'Private changing rooms',
  'High-speed Wi-Fi',
  'Ample parking for crew',
  'On-site technical support',
];

export default function About() {
  return (
    <section
      id="about"
      style={{
        padding: '120px 5%',
        background: 'var(--dark2)',
        position: 'relative',
      }}
    >
      {/* Gold top line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, var(--gold), transparent)',
        opacity: 0.2,
      }} />

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '5rem',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        {/* Visual placeholder */}
        <div
          className="reveal"
          style={{
            position: 'relative',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            overflow: 'hidden',
            aspectRatio: '4/3',
            background: 'var(--dark3)',
          }}
        >
          <div style={{
            width: '100%', height: '100%',
            background: `
              radial-gradient(circle at 30% 40%, rgba(212,175,55,0.12) 0%, transparent 60%),
              radial-gradient(circle at 70% 70%, rgba(212,175,55,0.06) 0%, transparent 50%),
              var(--dark3)
            `,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '4rem', opacity: 0.3,
          }}>
            🎬
          </div>
          <div style={{
            position: 'absolute', bottom: '1.25rem', right: '1.25rem',
            background: 'var(--gold)', color: 'var(--dark)',
            padding: '8px 16px',
            fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em',
            textTransform: 'uppercase', borderRadius: '100px',
          }}>
            Est. 2024
          </div>
        </div>

        {/* Text content */}
        <div className="reveal reveal-delay-2">
          <div className="section-tag">About Cine Classic Studios</div>

          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', marginBottom: '1.2rem' }}>
            A Studio Built for{' '}
            <span style={{ color: 'var(--gold)' }}>Creators</span>
          </h2>

          <p style={{ color: 'var(--gray)', fontWeight: 300, marginBottom: '1rem', lineHeight: 1.8 }}>
            Cine Classic Studios is a premium rental studio space designed for filmmakers,
            photographers, content creators, and production teams who demand the very best.
          </p>
          <p style={{ color: 'var(--gray)', fontWeight: 300, marginBottom: '1rem', lineHeight: 1.8 }}>
            With five distinct sets — from a seamless infinity wall to an authentic industrial
            brick backdrop — we give your creative vision the perfect stage.
          </p>

          <ul style={{
            listStyle: 'none', margin: '2rem 0',
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            gap: '0.7rem 1.5rem', padding: 0,
          }}>
            {FEATURES.map((f) => (
              <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', fontSize: '0.88rem', color: 'var(--white)' }}>
                <span style={{
                  width: '20px', height: '20px', borderRadius: '50%',
                  background: 'rgba(212,175,55,0.1)',
                  border: '1px solid rgba(212,175,55,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, color: 'var(--gold)', fontSize: '0.6rem',
                }}>✓</span>
                {f}
              </li>
            ))}
          </ul>

          <a href="#booking" className="btn-primary" style={{ marginTop: '0.5rem' }}>
            Schedule a Tour →
          </a>
        </div>
      </div>
    </section>
  );
}
