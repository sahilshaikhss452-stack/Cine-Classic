import { PRODUCTIONS } from '@/data/productions';

// Group productions by year (newest first)
function getTimeline() {
  const byYear: Record<number, typeof PRODUCTIONS> = {};
  for (const p of PRODUCTIONS) {
    if (!byYear[p.year]) byYear[p.year] = [];
    byYear[p.year].push(p);
  }
  return Object.entries(byYear)
    .sort(([a], [b]) => Number(b) - Number(a))
    .map(([year, prods]) => ({ year: Number(year), prods }));
}

export default function ProductionTimeline() {
  const timeline = getTimeline();

  return (
    <section style={{ padding: '100px 5%', background: 'var(--dark)' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        <div className="reveal" style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
          <div className="section-tag">History</div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
            Production <span style={{ color: 'var(--gold)' }}>Timeline</span>
          </h2>
          <p style={{
            fontSize: '1rem', color: 'var(--gray)',
            maxWidth: '500px', margin: '1rem auto 0',
            fontWeight: 300, lineHeight: 1.8,
          }}>
            A year-by-year look at the productions that have called Cine Classic Studios home.
          </p>
        </div>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>

          {/* Vertical line */}
          <div style={{
            position: 'absolute',
            left: '89px',
            top: 0, bottom: 0,
            width: '1px',
            background: 'linear-gradient(to bottom, transparent, rgba(212,175,55,0.3) 10%, rgba(212,175,55,0.3) 90%, transparent)',
          }} />

          {timeline.map(({ year, prods }, yi) => (
            <div
              key={year}
              className={`pf-timeline-row reveal${yi > 0 ? ` reveal-delay-${Math.min(yi, 4)}` : ''}`}
              style={{ marginBottom: '2.5rem' }}
            >
              {/* Year column */}
              <div style={{
                paddingTop: '0.15rem',
                display: 'flex', flexDirection: 'column', alignItems: 'flex-end',
                paddingRight: '1.5rem',
                position: 'relative',
              }}>
                <span style={{
                  fontFamily: 'var(--font-playfair), serif',
                  fontSize: '1.05rem', fontWeight: 700,
                  color: 'var(--gold)',
                }}>
                  {year}
                </span>

                {/* Dot on the line */}
                <div style={{
                  position: 'absolute',
                  right: '-6px',
                  top: '7px',
                  width: '11px', height: '11px',
                  borderRadius: '50%',
                  background: 'var(--gold)',
                  boxShadow: '0 0 10px rgba(212,175,55,0.4)',
                  border: '2px solid var(--dark)',
                }} />
              </div>

              {/* Productions column */}
              <div style={{ paddingLeft: '1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {prods.map((prod) => (
                    <div
                      key={prod.id}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '0.75rem',
                        padding: '0.6rem 1rem',
                        background: 'var(--dark3)',
                        border: '1px solid rgba(255,255,255,0.05)',
                        borderRadius: '8px',
                        transition: 'border-color 0.3s',
                      }}
                    >
                      <span style={{ fontSize: '0.9rem' }}>
                        {prod.type === 'Film' ? '🎬' :
                         prod.type === 'TV Series' ? '📺' :
                         prod.type === 'Web Series' ? '🎭' :
                         prod.type === 'Music Video' ? '🎵' : '📽️'}
                      </span>
                      <span style={{
                        fontFamily: 'var(--font-playfair), serif',
                        fontSize: '0.95rem', fontWeight: 600,
                        color: 'var(--white)',
                      }}>
                        {prod.title}
                      </span>
                      <span style={{
                        marginLeft: 'auto',
                        fontSize: '0.65rem', fontWeight: 600,
                        letterSpacing: '0.1em', textTransform: 'uppercase',
                        color: prod.typeColor,
                        background: `${prod.typeColor}12`,
                        border: `1px solid ${prod.typeColor}25`,
                        padding: '2px 8px', borderRadius: '100px',
                        whiteSpace: 'nowrap',
                      }}>
                        {prod.type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
