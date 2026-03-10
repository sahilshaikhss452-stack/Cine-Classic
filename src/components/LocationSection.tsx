import { loadSiteSettings } from '@/lib/sanity';

const ACCESS_POINTS = [
  {
    icon: '??',
    title: 'By Road',
    lines: [
      'Western Express Highway access nearby',
      'Dedicated production truck entry gate',
      'Large vehicle parking with security',
    ],
  },
  {
    icon: '??',
    title: 'By Metro',
    lines: ['Nearest metro access in Goregaon East', 'Auto-rickshaw available at exit'],
  },
  {
    icon: '??',
    title: 'From Airport',
    lines: ['Easy airport transfer route', 'Cab and crew transport arranged on request'],
  },
];

export default async function LocationSection() {
  const settings = await loadSiteSettings();
  const infoBlocks = [
    { icon: '??', label: 'Address', value: [settings.addressLine1, settings.addressLine2, settings.city, settings.region, settings.postalCode].filter(Boolean).join(', ') },
    { icon: '??', label: 'Phone', value: settings.phone },
    { icon: '??', label: 'Email', value: settings.email },
    { icon: '??', label: 'Open', value: settings.hoursText ?? 'By appointment' },
  ];

  return (
    <section className="mob-section" style={{ background: 'var(--dark)', padding: '120px 5%' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <span className="section-tag">Find Us</span>
          <h2
            style={{
              fontFamily: 'var(--font-playfair), serif',
              fontSize: 'clamp(2rem, 3.5vw, 3rem)',
              fontWeight: 700,
              color: 'var(--white)',
              margin: '1.2rem 0 1rem',
            }}
          >
            Strategically Located in <span style={{ color: 'var(--gold)' }}>Mumbai&apos;s Film Belt</span>
          </h2>
          <p style={{ color: 'var(--gray)', maxWidth: '560px', margin: '0 auto', lineHeight: 1.8 }}>
            Minutes from Film City and the wider production corridor. Easy access for large crews, equipment, and production vehicles.
          </p>
        </div>

        <div className="loc-grid">
          <div className="reveal">
            <div className="loc-map-wrap">
              {settings.mapsEmbedUrl ? (
                <iframe
                  src={settings.mapsEmbedUrl}
                  title={`${settings.businessName} location`}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  style={{ width: '100%', height: '100%', border: 'none' }}
                />
              ) : (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2rem',
                    color: 'var(--gray)',
                    background: 'var(--dark3)',
                    textAlign: 'center',
                    lineHeight: 1.8,
                  }}
                >
                  Add a Google Maps embed URL in Site Settings to show the map here.
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
              {['Near Film City', settings.city, 'Easy Truck Access'].filter(Boolean).map((tag) => (
                <span
                  key={tag}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '100px',
                    background: 'rgba(212,175,55,0.08)',
                    border: '1px solid rgba(212,175,55,0.2)',
                    color: 'var(--gold)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="reveal reveal-delay-2">
            <div style={{ marginBottom: '3rem' }}>
              {infoBlocks.map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'flex-start',
                    marginBottom: '1.4rem',
                    paddingBottom: '1.4rem',
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                  }}
                >
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      flexShrink: 0,
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1rem',
                      background: 'rgba(212,175,55,0.04)',
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: '0.65rem',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: 'var(--gold)',
                        marginBottom: '3px',
                        fontWeight: 600,
                      }}
                    >
                      {item.label}
                    </div>
                    <div style={{ fontSize: '0.88rem', color: 'var(--white2)', lineHeight: 1.6 }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                fontSize: '0.7rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
                marginBottom: '1.2rem',
                fontWeight: 600,
              }}
            >
              How to Reach
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
              {ACCESS_POINTS.map((point) => (
                <div
                  key={point.title}
                  style={{
                    background: 'var(--dark3)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '10px',
                    padding: '1.2rem',
                  }}
                >
                  <div style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>{point.icon}</div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--white)', marginBottom: '0.6rem' }}>{point.title}</div>
                  {point.lines.map((line) => (
                    <div key={line} style={{ fontSize: '0.78rem', color: 'var(--gray)', lineHeight: 1.6, marginBottom: '3px' }}>
                      {line}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {settings.mapsUrl && (
                <a
                  href={settings.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem' }}
                >
                  ?? Get Directions
                </a>
              )}
              <a
                href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
                  `Hi ${settings.businessName}, I need directions to the studio.`,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '14px 24px',
                  background: '#25D366',
                  color: '#fff',
                  borderRadius: '100px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  letterSpacing: '0.04em',
                  transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
                }}
              >
                ?? WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
