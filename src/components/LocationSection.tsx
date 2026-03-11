import { loadSiteSettings } from '@/lib/sanity';
import {
  CarIcon,
  ClockIcon,
  IconBadge,
  MailIcon,
  MapPinIcon,
  MessageCircleIcon,
  NavigationIcon,
  PhoneIcon,
  PlaneIcon,
  TrainIcon,
} from '@/components/ui/icons';

const ACCESS_POINTS = [
  {
    icon: CarIcon,
    title: 'By Road',
    lines: [
      'Easy approach from the Western Express Highway corridor',
      'Dedicated entry for production vehicles and gear movement',
      'Parking support for crew cars, vans, and trucks',
    ],
  },
  {
    icon: TrainIcon,
    title: 'By Metro',
    lines: [
      'Metro connectivity through the Goregaon East side of the production belt',
      'Last-mile auto and cab access available',
    ],
  },
  {
    icon: PlaneIcon,
    title: 'From Airport',
    lines: [
      'Practical transfer route for out-of-town talent and crew',
      'Cab and crew transport can be coordinated on request',
    ],
  },
];

export default async function LocationSection() {
  const settings = await loadSiteSettings();
  const infoBlocks = [
    {
      icon: MapPinIcon,
      label: 'Address',
      value: [settings.addressLine1, settings.addressLine2, settings.city, settings.region, settings.postalCode]
        .filter(Boolean)
        .join(', '),
    },
    { icon: PhoneIcon, label: 'Phone', value: settings.phone },
    { icon: MailIcon, label: 'Email', value: settings.email },
    { icon: ClockIcon, label: 'Open', value: settings.hoursText ?? 'By appointment' },
  ];

  return (
    <section className="mob-section" style={{ background: 'var(--dark)', padding: '120px 5%' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
          <span className="section-tag">Location & Access</span>
          <h2
            style={{
              fontFamily: 'var(--font-playfair), serif',
              fontSize: 'clamp(2rem, 3.5vw, 3rem)',
              fontWeight: 700,
              color: 'var(--white)',
              margin: '1.2rem 0 1rem',
            }}
          >
            Positioned for <span style={{ color: 'var(--gold)' }}>Mumbai production movement</span>
          </h2>
          <p style={{ color: 'var(--gray)', maxWidth: '580px', margin: '0 auto', lineHeight: 1.8 }}>
            Close to Film City and the wider production corridor, with access that works for crew call times, equipment movement, and last-minute location logistics.
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
                  Add a Google Maps embed URL in Site Settings to show the studio location here.
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
              {['Near Film City', settings.city, 'Truck-friendly access'].filter(Boolean).map((tag) => (
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
            <div style={{ marginBottom: '2.5rem' }}>
              {infoBlocks.map((item) => {
                const Icon = item.icon;
                return (
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
                    <IconBadge>
                      <Icon size={18} />
                    </IconBadge>
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
                );
              })}
            </div>

            <div
              style={{
                fontSize: '0.7rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
                marginBottom: '1rem',
                fontWeight: 600,
              }}
            >
              Access Overview
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
              {ACCESS_POINTS.map((point) => {
                const Icon = point.icon;
                return (
                  <div
                    key={point.title}
                    style={{
                      background: 'var(--dark3)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: '12px',
                      padding: '1.2rem',
                    }}
                  >
                    <IconBadge size={40} rounded={10} style={{ marginBottom: '0.7rem' }}>
                      <Icon size={18} />
                    </IconBadge>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--white)', marginBottom: '0.6rem' }}>{point.title}</div>
                    {point.lines.map((line) => (
                      <div key={line} style={{ fontSize: '0.78rem', color: 'var(--gray)', lineHeight: 1.6, marginBottom: '3px' }}>
                        {line}
                      </div>
                    ))}
                  </div>
                );
              })}
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
                  <NavigationIcon size={15} />
                  Open Directions
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
                <MessageCircleIcon size={15} />
                WhatsApp for Route Help
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
