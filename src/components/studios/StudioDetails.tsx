import type { StudioSet } from '@/data/sets';

interface Props {
  studio: StudioSet;
}

export default function StudioDetails({ studio }: Props) {
  // Build the specs grid dynamically so optional fields only appear when present
  const specs = [
    { label: 'Total Area',      value: studio.size },
    { label: 'Ceiling Height',  value: studio.ceilingHeight },
    { label: 'Max Capacity',    value: studio.capacity },
    { label: 'Rate From',       value: `${studio.rateFrom}${studio.rateUnit}`, highlight: true },
    ...(studio.parking    ? [{ label: 'Parking',      value: studio.parking }] : []),
    ...(studio.power      ? [{ label: 'Power Supply',  value: studio.power }] : []),
    ...(studio.minBooking ? [{ label: 'Min Booking',   value: studio.minBooking }] : []),
  ];

  return (
    <section
      id="details"
      style={{
        padding: '80px 5%',
        background: 'var(--dark2)',
        position: 'relative',
      }}
    >
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, var(--gold), transparent)',
        opacity: 0.15,
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <div className="reveal" style={{ marginBottom: '3.5rem' }}>
          <div className="section-tag">Studio Details</div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
            Everything You{' '}
            <span style={{ color: 'var(--gold)' }}>Need to Know</span>
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2.5rem',
          alignItems: 'start',
        }}>

          {/* Description + specs */}
          <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
              <h3 style={{
                fontSize: '1rem',
                fontFamily: 'var(--font-playfair), serif',
                color: 'var(--gold)',
                marginBottom: '1rem',
                fontWeight: 600,
              }}>
                About This Set
              </h3>
              <p style={{
                fontSize: '0.95rem',
                color: 'var(--gray-lt)',
                fontWeight: 300,
                lineHeight: 1.85,
              }}>
                {studio.description}
              </p>
            </div>

            {/* Key specs grid */}
            <div>
              <h3 style={{
                fontSize: '1rem',
                fontFamily: 'var(--font-playfair), serif',
                color: 'var(--gold)',
                marginBottom: '1rem',
                fontWeight: 600,
              }}>
                Specifications
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '0.75rem',
              }}>
                {specs.map((spec) => (
                  <div key={spec.label} style={{
                    padding: '12px 14px',
                    background: spec.highlight ? 'rgba(212,175,55,0.06)' : 'var(--dark3)',
                    borderRadius: '8px',
                    border: spec.highlight
                      ? '1px solid rgba(212,175,55,0.2)'
                      : '1px solid rgba(255,255,255,0.06)',
                  }}>
                    <div style={{
                      fontSize: '0.6rem', letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: spec.highlight ? 'var(--gold)' : 'var(--gold)',
                      fontWeight: 600, marginBottom: '3px',
                    }}>
                      {spec.label}
                    </div>
                    <div style={{
                      fontSize: '0.9rem',
                      color: spec.highlight ? 'var(--gold)' : 'var(--white)',
                      fontWeight: spec.highlight ? 600 : 500,
                    }}>
                      {spec.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notable productions — social proof block */}
            {studio.productions && studio.productions.length > 0 && (
              <div>
                <h3 style={{
                  fontSize: '1rem',
                  fontFamily: 'var(--font-playfair), serif',
                  color: 'var(--gold)',
                  marginBottom: '1rem',
                  fontWeight: 600,
                }}>
                  Filmed Here
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {studio.productions.map((prod) => (
                    <span key={prod} style={{
                      fontSize: '0.78rem',
                      color: 'var(--gray-lt)',
                      background: 'var(--dark3)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: '100px',
                      padding: '5px 14px',
                      fontWeight: 400,
                    }}>
                      {prod}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Facilities */}
          <div className="reveal reveal-delay-1">
            <h3 style={{
              fontSize: '1rem',
              fontFamily: 'var(--font-playfair), serif',
              color: 'var(--gold)',
              marginBottom: '1rem',
              fontWeight: 600,
            }}>
              Facilities Included
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {studio.facilities.map((f) => (
                <li key={f} style={{
                  display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
                  fontSize: '0.9rem', color: 'var(--gray-lt)',
                  padding: '10px 14px',
                  background: 'var(--dark3)',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.04)',
                }}>
                  <span style={{
                    width: '20px', height: '20px', minWidth: '20px',
                    borderRadius: '50%',
                    background: 'rgba(212,175,55,0.08)',
                    border: '1px solid rgba(212,175,55,0.25)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.6rem', color: 'var(--gold)', marginTop: '1px',
                  }}>✓</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Suitable for */}
          <div className="reveal reveal-delay-2">
            <h3 style={{
              fontSize: '1rem',
              fontFamily: 'var(--font-playfair), serif',
              color: 'var(--gold)',
              marginBottom: '1rem',
              fontWeight: 600,
            }}>
              Suitable For
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {studio.suitableFor.map((use, i) => (
                <div key={use} style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                  padding: '10px 14px',
                  background: 'var(--dark3)',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.04)',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-playfair), serif',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    color: 'var(--gold)',
                    opacity: 0.5,
                    minWidth: '20px',
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span style={{ fontSize: '0.9rem', color: 'var(--white)', fontWeight: 400 }}>
                    {use}
                  </span>
                </div>
              ))}
            </div>

            {/* Booking CTA inline */}
            <div style={{
              marginTop: '1.5rem',
              padding: '1.25rem',
              background: 'rgba(212,175,55,0.06)',
              border: '1px solid rgba(212,175,55,0.15)',
              borderRadius: '12px',
              textAlign: 'center',
            }}>
              <div style={{
                fontSize: '0.68rem', fontWeight: 600,
                letterSpacing: '0.14em', textTransform: 'uppercase',
                color: 'var(--gold)', marginBottom: '4px',
              }}>
                Ready to Book?
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--gray-lt)', fontWeight: 300, marginBottom: '1rem' }}>
                Min booking {studio.minBooking ?? '4 hours'} · Rates from {studio.rateFrom}{studio.rateUnit}
              </p>
              <a href="#booking" style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '10px 24px',
                background: 'var(--gold)', border: 'none',
                borderRadius: '100px', color: 'var(--dark)',
                fontSize: '0.8rem', fontWeight: 600,
                textDecoration: 'none', transition: 'all 0.3s',
              }}>
                Check Availability →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
