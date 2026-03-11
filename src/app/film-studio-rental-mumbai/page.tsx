import type { Metadata } from 'next';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';
import Navbar from '@/components/Navbar';
import RevealProvider from '@/components/RevealProvider';
import { loadFaqsByPlacement, loadSiteSettings, loadStudioCards } from '@/lib/sanity';
import { fmtSize } from '@/lib/studio-utils';

export const revalidate = 30;

export const metadata: Metadata = {
  title: 'Film Studio Rental Mumbai | Cine Classic Studios',
  description:
    'Looking for film studio rental in Mumbai? Explore production-ready studio sets near Film City for films, OTT shoots, commercials, and long-form storytelling.',
  keywords: [
    'film studio rental mumbai',
    'film studio on rent mumbai',
    'film set rental mumbai',
    'production studio mumbai',
    'film studio near film city mumbai',
    'studio on rent goregaon',
    'commercial shoot studio mumbai',
    'ott shoot location mumbai',
  ],
  alternates: { canonical: '/film-studio-rental-mumbai' },
  openGraph: {
    title: 'Film Studio Rental Mumbai | Cine Classic Studios',
    description:
      'Production-ready studio sets in Mumbai for films, OTT shoots, commercials, and recce-driven production planning.',
    type: 'website',
    locale: 'en_IN',
  },
};

const WHY_CHOOSE = [
  {
    marker: '01',
    title: 'Production-ready studio sets',
    desc: 'Move faster with sets designed for working crews, controlled shooting conditions, and simpler production planning inside one studio environment.',
  },
  {
    marker: '02',
    title: 'Mumbai access for active production teams',
    desc: 'Useful for crews that need a practical studio option in the Goregaon and Film City production corridor.',
  },
  {
    marker: '03',
    title: 'Faster recce and shortlist decisions',
    desc: 'Each set page helps producers review look, layout, and specs before they reach out, which reduces wasted calls and back-and-forth.',
  },
  {
    marker: '04',
    title: 'Flexible across multiple formats',
    desc: 'Suitable for film scenes, OTT blocks, commercials, music videos, and photography-led productions that need controlled sets.',
  },
  {
    marker: '05',
    title: 'Crew-focused operational support',
    desc: 'The experience is built around real shoot needs: access, prep, recce coordination, and smoother communication around dates and set fit.',
  },
  {
    marker: '06',
    title: 'Fast inquiry handling',
    desc: 'Share the brief, preferred dates, and set interest once. The team can respond with availability and next-step guidance quickly.',
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
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4rem', alignItems: 'center' }}>
              <div>
                <div className="section-tag">Film Studio Rental Mumbai</div>
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
                  Production-ready studio sets for <span style={{ color: 'var(--gold)' }}>film shoots in Mumbai</span>
                </h1>
                <p
                  style={{
                    color: 'var(--gray)',
                    fontSize: '1.05rem',
                    lineHeight: 1.85,
                    marginBottom: '2.5rem',
                    maxWidth: '520px',
                  }}
                >
                  Cine Classic Studios helps producers, line teams, and directors move from recce to booking faster with controlled studio sets, practical logistics, and a smoother inquiry process near Film City.
                </p>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <a href="/#booking" className="btn-primary">
                    Check Studio Availability
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
                    WhatsApp Booking Desk
                  </a>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                {[
                  { v: String(studios.length), l: 'Published Studio Sets' },
                  { v: settings.city || 'Mumbai', l: 'Operating Location' },
                  { v: 'By Appointment', l: 'Recces & Visits' },
                  { v: 'Production-Ready', l: 'Booking Focus' },
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
                        fontSize: '1.5rem',
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
                A better fit for <span style={{ color: 'var(--gold)' }}>recce-led film planning</span>
              </h2>
            </div>
            <div className="seo-features-grid">
              {WHY_CHOOSE.map((item, index) => (
                <div
                  key={item.title}
                  className={`reveal reveal-delay-${(index % 3) + 1} fac-card`}
                  style={{ background: 'var(--dark3)' }}
                >
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.14em', color: 'var(--gold)', marginBottom: '1rem' }}>{item.marker}</div>
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
              <span className="section-tag">Studio Options</span>
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
                Browse studio sets for <span style={{ color: 'var(--gold)' }}>film production in Mumbai</span>
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
                      <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--gold)', marginBottom: '0.75rem' }}>{String(index + 1).padStart(2, '0')}</div>
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
                        {studio.tagline ?? 'Production-ready set details are being added.'}
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
                        View Set Details
                      </a>
                    </div>
                  ))}
                </div>
                <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                  <a href="/studios" className="btn-outline">
                    View All Studios
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
                Film studio rental <span style={{ color: 'var(--gold)' }}>FAQ</span>
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
              Ready to shortlist your <span style={{ color: 'var(--gold)' }}>film set?</span>
            </h2>
            <p style={{ color: 'var(--gray)', lineHeight: 1.8, marginBottom: '2rem' }}>
              Share your shoot brief, dates, and preferred set. The team will help you move to recce or booking with clearer next-step guidance.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/#booking" className="btn-primary">
                Send a Booking Inquiry
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
