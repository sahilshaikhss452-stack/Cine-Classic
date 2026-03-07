import { PRODUCTIONS, FEATURED_PRODUCTION_ID, TYPE_ICONS } from '@/data/productions';

export default function FeaturedProduction() {
  const prod = PRODUCTIONS.find((p) => p.id === FEATURED_PRODUCTION_ID) ?? PRODUCTIONS[0];

  return (
    <section style={{ padding: '100px 5%', background: 'var(--dark2)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <div className="reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="section-tag">Spotlight</div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
            Featured <span style={{ color: 'var(--gold)' }}>Production</span>
          </h2>
        </div>

        <div className="pf-featured-grid reveal">

          {/* ── Poster ───────────────────────────────────── */}
          <div style={{
            position: 'relative',
            aspectRatio: '4/5',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.07)',
            boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(212,175,55,0.1)',
          }}>
            <div style={{
              position: 'absolute', inset: 0,
              background: prod.gradient,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: '1rem',
            }}>
              <span style={{ fontSize: '6rem', opacity: 0.15 }}>
                {TYPE_ICONS[prod.type]}
              </span>
              <span style={{
                fontFamily: 'var(--font-playfair), serif',
                fontSize: '1.8rem', fontWeight: 700,
                color: 'rgba(255,255,255,0.15)',
                textAlign: 'center', padding: '0 2rem',
              }}>
                {prod.title}
              </span>
            </div>

            {/* Gold frame accent */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(135deg, rgba(212,175,55,0.12) 0%, transparent 50%)',
              pointerEvents: 'none',
            }} />

            {/* Network badge */}
            {prod.network && (
              <div style={{
                position: 'absolute', bottom: '1.25rem', left: '1.25rem',
                background: 'rgba(0,0,0,0.7)',
                backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '8px', padding: '5px 12px',
                fontSize: '0.65rem', fontWeight: 600,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.75)',
              }}>
                {prod.network}
              </div>
            )}
          </div>

          {/* ── Details ──────────────────────────────────── */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1.5rem' }}>

            {/* Type badge */}
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              fontSize: '0.7rem', fontWeight: 600,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: prod.typeColor,
              background: `${prod.typeColor}15`,
              border: `1px solid ${prod.typeColor}30`,
              padding: '5px 14px', borderRadius: '100px',
              width: 'fit-content',
            }}>
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: prod.typeColor }} />
              {prod.type}
            </span>

            <h3 style={{
              fontFamily: 'var(--font-playfair), serif',
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              fontWeight: 700, lineHeight: 1.1,
              color: 'var(--white)',
            }}>
              {prod.title}
            </h3>

            <p style={{
              fontSize: '0.9rem', color: prod.typeColor,
              fontWeight: 500, letterSpacing: '0.06em',
            }}>
              {prod.year}{prod.network ? ` · ${prod.network}` : ''}
            </p>

            {prod.description && (
              <p style={{
                fontSize: '1.05rem', color: 'var(--gray-lt)',
                lineHeight: 1.85, fontWeight: 300,
                borderLeft: `3px solid ${prod.typeColor}`,
                paddingLeft: '1.25rem',
              }}>
                {prod.description}
              </p>
            )}

            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
              fontSize: '0.82rem', color: 'var(--gold)',
              background: 'rgba(212,175,55,0.06)',
              border: '1px solid rgba(212,175,55,0.18)',
              padding: '10px 18px', borderRadius: '8px',
              width: 'fit-content',
            }}>
              <span>🎬</span>
              <span>Shot at Cine Classic Studios</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
