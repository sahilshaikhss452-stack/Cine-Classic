import { TESTIMONIALS } from '@/data/testimonials';
import AutoScrollCarousel from '@/components/motion/AutoScrollCarousel';

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

      <p className="swipe-hint">swipe to browse ›</p>

      <AutoScrollCarousel className="testimonials-grid">
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
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--white)' }}>{t.name}</div>
                <div style={{
                  fontSize: '0.73rem', color: 'var(--gray)',
                  letterSpacing: '0.04em', marginTop: '2px',
                }}>{t.role}</div>
                {(t.production || t.network) && (
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '5px',
                    marginTop: '5px', flexWrap: 'wrap',
                  }}>
                    {t.production && (
                      <span style={{
                        fontSize: '0.65rem', fontWeight: 600,
                        letterSpacing: '0.06em',
                        color: 'var(--gold)',
                        background: 'rgba(212,175,55,0.08)',
                        border: '1px solid rgba(212,175,55,0.2)',
                        borderRadius: '100px',
                        padding: '2px 8px',
                        whiteSpace: 'nowrap',
                      }}>
                        {t.production}
                      </span>
                    )}
                    {t.network && (
                      <span style={{
                        fontSize: '0.65rem', fontWeight: 500,
                        letterSpacing: '0.04em',
                        color: 'rgba(255,255,255,0.4)',
                        whiteSpace: 'nowrap',
                      }}>
                        {t.network}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </AutoScrollCarousel>
    </section>
  );
}
