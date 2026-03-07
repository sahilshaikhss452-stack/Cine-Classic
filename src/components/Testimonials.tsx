import { TESTIMONIALS } from '@/data/testimonials';

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="mob-section"
      style={{ padding: '120px 5%', background: 'var(--dark2)', position: 'relative' }}
    >
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, var(--gold), transparent)',
        opacity: 0.2,
      }} />

      <div className="reveal" style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
        <div className="section-tag">Client Reviews</div>
        <h2 style={{
          fontSize: 'clamp(1.75rem, 3.3vw, 2.5rem)',
          letterSpacing: '-0.015em',
          lineHeight: 1.15,
          marginTop: '0.5rem',
        }}>
          What Creators <span style={{ color: 'var(--gold)' }}>Say</span>
        </h2>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.25rem',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        {TESTIMONIALS.map((t, i) => (
          <div
            key={t.id}
            className={`reveal${i % 3 !== 0 ? ` reveal-delay-${(i % 3)}` : ''}`}
            style={{
              background: 'var(--dark3)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '16px',
              padding: '2rem',
              transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            {/* Large quote mark */}
            <div style={{
              fontFamily: 'var(--font-playfair), serif',
              fontSize: '4rem', color: 'var(--gold)',
              opacity: 0.15, lineHeight: 1, marginBottom: '-1rem',
            }}>"</div>

            <div style={{ color: 'var(--gold)', fontSize: '0.8rem', letterSpacing: '3px', marginBottom: '1rem' }}>
              ★★★★★
            </div>

            <p style={{ fontSize: '0.92rem', color: 'var(--gray-lt)', fontWeight: 300, lineHeight: 1.8, marginBottom: '1.5rem' }}>
              {t.text}
            </p>

            <div style={{
              display: 'flex', alignItems: 'center', gap: '1rem',
              paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.06)',
            }}>
              <div style={{
                width: '44px', height: '44px', borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--gold), var(--gold-dk))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-playfair), serif',
                fontSize: '1.1rem', fontWeight: 700, color: 'var(--dark)', flexShrink: 0,
              }}>
                {t.initial}
              </div>
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--white)' }}>{t.name}</div>
                <div style={{
                  fontSize: '0.73rem', color: 'var(--gold)',
                  letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: '2px',
                }}>{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
