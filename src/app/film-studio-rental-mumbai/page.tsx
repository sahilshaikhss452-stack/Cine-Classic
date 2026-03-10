import type { Metadata } from 'next';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';
import Navbar from '@/components/Navbar';
import RevealProvider from '@/components/RevealProvider';
import { loadFaqsByPlacement, loadSiteSettings, loadStudioCards } from '@/lib/sanity';
import { fmtSize } from '@/lib/studio-utils';

export const revalidate = 30;

export const metadata: Metadata = {
  title: 'Film Studio Rental Mumbai - Book a Film Set Today',
  description:
    'Looking for a film studio on rent in Mumbai? Cine Classic Studios offers production-ready film sets near Film City, Goregaon East for Bollywood, OTT, TV serials, and commercial shoots.',
  keywords: [
    'film studio rental mumbai',
    'film studio on rent mumbai',
    'film set rental mumbai',
    'bollywood film studio mumbai',
    'film studio near film city mumbai',
    'studio on rent goregaon',
    'film studio booking mumbai',
    'production studio mumbai',
  ],
  alternates: { canonical: '/film-studio-rental-mumbai' },
  openGraph: {
    title: 'Film Studio Rental Mumbai - Cine Classic Studios',
    description:
      'Professional film sets in Mumbai near Film City, Goregaon East. Market, chawl, court, hospital, police station, and open ground sets available.',
    type: 'website',
    locale: 'en_IN',
  },
};

const WHY_CHOOSE = [
  {
    icon: '???',
    title: 'Production-Ready Sets',
    desc: 'From traditional market lanes to a Mumbai chawl, courtroom, hospital ward, police station, and open ground, we reduce location friction and save setup time.',
  },
  {
    icon: '??',
    title: 'Near Film City, Mumbai',
    desc: 'Located in Goregaon East, close to Film City and the wider production corridor for easier crew, equipment, and talent movement.',
  },
  {
    icon: '?',
    title: 'Professional Power',
    desc: 'Three-phase power, production support, and controlled indoor conditions designed for demanding film, OTT, and commercial shoots.',
  },
  {
    icon: '??',
    title: 'Lighting-Friendly Spaces',
    desc: 'Built to work well for cinematographers and gaffers, with practical production considerations already baked into the floors and set layouts.',
  },
  {
    icon: '??',
    title: 'Crew and Vehicle Access',
    desc: 'Large equipment movement, crew flow, and on-site logistics are easier when the shoot happens inside a purpose-built studio complex.',
  },
  {
    icon: '??',
    title: 'Fast Booking Response',
    desc: 'Share your brief, preferred dates, and set requirements. The team can confirm availability and send a quote quickly.',
  },
];

export default async function FilmStudioRentalMumbaiPage() {
  const [settings, studios, faqs] = await Promise.all([
    loadSiteSettings(),
    loadStudioCards(),
    loadFaqsByPlacement('filmStudioRental'),
  ]);

  const studiosHighlight = studios.slice(0, 6);
  const whatsappBase = `https://wa.me/${settings.whatsappNumber}`;
  const whatsappInquiryUrl = `${whatsappBase}?text=${encodeURIComponent(
    'Hi, I am looking for a film studio rental in Mumbai.',
  )}`;
  const whatsappCtaUrl = `${whatsappBase}?text=${encodeURIComponent(
    'Hi, I need a film studio in Mumbai for an upcoming shoot.',
  )}`;

  return (
    <>
      <RevealProvider />
      <FloatingButtons />
      <Navbar />

      <main>
        <section
          style={{
            padding: '160px 5% 100px',
            background: 'var(--dark)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse at 30% 50%, rgba(212,175,55,0.07) 0%, transparent 60%)',
              pointerEvents: 'none',
            }}
          />
          <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
              <div>
                <div className="section-tag">Mumbai's Best Film Sets</div>
                <h1
                  style={{
                    fontSize: 'clamp(2.5rem, 4.5vw, 3.8rem)',
                    fontWeight: 800,
                    color: 'var(--white)',
                    margin: '1.2rem 0 1.2rem',
                    lineHeight: 1.08,
                    letterSpacing: '-0.025em',
                  }}
                >
                  Film Studio Rental <span style={{ color: 'var(--gold)' }}>Mumbai</span>
                </h1>
                <p
                  style={{
                    color: 'var(--gray)',
                    fontSize: '1.05rem',
                    lineHeight: 1.85,
                    marginBottom: '2.5rem',
                    maxWidth: '480px',
                  }}
                >
                  Production-ready studio spaces near Film City, Goregaon East. Bollywood features, OTT series, TV serials, and commercial shoots can move faster when the set, crew flow, and logistics are already handled inside one complex.
                </p>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <a href="/#booking" className="btn-primary">
                    Book a Studio -&gt;
                  </a>
                  <a
                    href={whatsappInquiryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      padding: '15px 28px',
                      background: '#25D366',
                      color: '#fff',
                      borderRadius: '100px',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      textDecoration: 'none',
                      letterSpacing: '0.06em',
                    }}
                  >
                    WhatsApp Now
                  </a>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {[
                  { v: String(studios.length), l: 'Active Sets' },
                  { v: settings.hoursText ?? 'By Appointment', l: 'Response Window' },
                  { v: 'Near Film City', l: 'Production Access' },
                  { v: settings.city, l: 'Location' },
                ].map((stat) => (
                  <div
                    key={stat.l}
                    style={{
                      background: 'var(--dark3)',
                      border: '1px solid rgba(212,175,55,0.12)',
                      borderRadius: '12px',
                      padding: '1.8rem 1.5rem',
                      textAlign: 'center',
                    }}
                  >
                    <div
                      style={{
                        fontFamily: 'var(--font-playfair), serif',
                        fontSize: '1.8rem',
                        fontWeight: 800,
                        color: 'var(--gold)',
                        marginBottom: '0.4rem',
                      }}
                    >
                      {stat.v}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--gray)' }}>{stat.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section style={{ padding: '100px 5%', background: 'var(--dark2)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <span className="section-tag">Why Cine Classic</span>
              <h2
                style={{
                  fontSize: 'clamp(1.75rem, 3.3vw, 2.5rem)',
                  fontWeight: 700,
                  color: 'var(--white)',
                  margin: '1.2rem 0 1rem',
                  letterSpacing: '-0.015em',
                  lineHeight: 1.15,
                }}
              >
                Mumbai's Most Complete <span style={{ color: 'var(--gold)' }}>Film Studio Complex</span>
              </h2>
            </div>
            <div className="seo-features-grid">
              {WHY_CHOOSE.map((item, index) => (
                <div
                  key={item.title}
                  className={`reveal reveal-delay-${(index % 3) + 1} fac-card`}
                  style={{ background: 'var(--dark3)' }}
                >
                  <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{item.icon}</div>
                  <h3
                    style={{
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      color: 'var(--white)',
                      marginBottom: '0.75rem',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--gray)', lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: '100px 5%', background: 'var(--dark)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="reveal" style={{ marginBottom: '3.5rem' }}>
              <span className="section-tag">Our Film Sets</span>
              <h2
                style={{
                  fontSize: 'clamp(1.75rem, 3.3vw, 2.5rem)',
                  fontWeight: 700,
                  color: 'var(--white)',
                  margin: '1.2rem 0 1rem',
                  letterSpacing: '-0.015em',
                  lineHeight: 1.15,
                }}
              >
                Sets Available for <span style={{ color: 'var(--gold)' }}>Film Production</span>
              </h2>
            </div>

            {studiosHighlight.length === 0 ? (
              <div
                style={{
                  maxWidth: '760px',
                  margin: '0 auto',
                  padding: '1rem 1.25rem',
                  border: '1px solid rgba(212,175,55,0.3)',
                  borderRadius: '14px',
                  background: 'rgba(212,175,55,0.08)',
                  color: 'var(--white)',
                  lineHeight: 1.7,
                  textAlign: 'center',
                }}
              >
                Publish active studio documents in Sanity to populate this section.
              </div>
            ) : (
              <>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '1.5rem',
                  }}
                >
                  {studiosHighlight.map((studio, index) => (
                    <div
                      key={studio._id}
                      className={`reveal reveal-delay-${(index % 3) + 1}`}
                      style={{
                        background: studio.gradient ?? 'linear-gradient(135deg, #1a1a1a, #2a2a2a)',
                        border: '1px solid rgba(255,255,255,0.06)',
                        borderRadius: '12px',
                        padding: '2rem',
                        transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s',
                      }}
                    >
                      <div
                        style={{
                          height: '2px',
                          background: `linear-gradient(90deg, ${studio.accentColor ?? '#d4af37'}, transparent)`,
                          marginBottom: '1.5rem',
                          opacity: 0.6,
                        }}
                      />
                      <div style={{ fontSize: '1.8rem', marginBottom: '0.6rem' }}>{studio.icon ?? 'Studio'}</div>
                      <h3
                        style={{
                          fontSize: '1.2rem',
                          fontWeight: 700,
                          color: 'var(--white)',
                          marginBottom: '0.5rem',
                          letterSpacing: '-0.01em',
                        }}
                      >
                        {studio.title}
                      </h3>
                      <p style={{ fontSize: '0.85rem', color: 'var(--gray)', lineHeight: 1.7, marginBottom: '1.2rem' }}>
                        {studio.tagline ?? ''}
                      </p>
                      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.2rem', flexWrap: 'wrap' }}>
                        {[
                          { label: 'Size', value: fmtSize(studio.size) },
                          { label: 'Capacity', value: studio.capacity ?? 'On request' },
                        ].map((metric) => (
                          <div key={metric.label}>
                            <div
                              style={{
                                fontSize: '0.62rem',
                                color: 'var(--gold)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                marginBottom: '2px',
                              }}
                            >
                              {metric.label}
                            </div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--white)', fontWeight: 600 }}>{metric.value}</div>
                          </div>
                        ))}
                      </div>
                      <a
                        href={`/studios/${studio.slug}`}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          color: studio.accentColor ?? 'var(--gold)',
                          textDecoration: 'none',
                          letterSpacing: '0.06em',
                          textTransform: 'uppercase',
                        }}
                      >
                        View Set Details -&gt;
                      </a>
                    </div>
                  ))}
                </div>
                <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                  <a href="/studios" className="btn-outline">
                    View All Studios -&gt;
                  </a>
                </div>
              </>
            )}
          </div>
        </section>

        <section style={{ padding: '80px 5%', background: 'var(--dark2)' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="reveal" style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2
                style={{
                  fontSize: 'clamp(1.6rem, 2.5vw, 2.4rem)',
                  fontWeight: 700,
                  color: 'var(--white)',
                  letterSpacing: '-0.015em',
                  lineHeight: 1.15,
                }}
              >
                Film Studio Rental FAQ
              </h2>
            </div>

            {faqs.length === 0 ? (
              <div
                style={{
                  padding: '1.5rem',
                  background: 'var(--dark3)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '10px',
                  color: 'var(--gray)',
                  lineHeight: 1.7,
                  textAlign: 'center',
                }}
              >
                Add FAQ documents in Sanity with the <strong style={{ color: 'var(--white)' }}>Film Studio Rental page</strong> placement to populate this section.
              </div>
            ) : (
              faqs.map((faq, index) => (
                <div
                  key={faq._id}
                  className={`reveal reveal-delay-${(index % 3) + 1}`}
                  style={{
                    marginBottom: '1.2rem',
                    padding: '1.5rem',
                    background: 'var(--dark3)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '10px',
                  }}
                >
                  <h3
                    style={{
                      fontSize: '1rem',
                      fontWeight: 700,
                      color: 'var(--white)',
                      marginBottom: '0.6rem',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {faq.question}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--gray)', lineHeight: 1.7 }}>{faq.answer}</p>
                </div>
              ))
            )}
          </div>
        </section>

        <section style={{ padding: '80px 5%', background: 'var(--dark)', textAlign: 'center' }}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2
              style={{
                fontSize: 'clamp(1.75rem, 3.3vw, 2.5rem)',
                fontWeight: 700,
                color: 'var(--white)',
                marginBottom: '1rem',
                letterSpacing: '-0.015em',
                lineHeight: 1.15,
              }}
            >
              Ready to Book Your <span style={{ color: 'var(--gold)' }}>Film Set?</span>
            </h2>
            <p style={{ color: 'var(--gray)', lineHeight: 1.8, marginBottom: '2rem' }}>
              Contact {settings.businessName} today. Share your shoot brief, dates, and preferred set, and the team will confirm availability as quickly as possible.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/#booking" className="btn-primary">
                Send a Booking Inquiry -&gt;
              </a>
              <a
                href={whatsappCtaUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '15px 28px',
                  background: '#25D366',
                  color: '#fff',
                  borderRadius: '100px',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
