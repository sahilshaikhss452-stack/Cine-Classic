import type { Metadata } from 'next';
import Navbar  from '@/components/Navbar';
import Footer  from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';
import RevealProvider  from '@/components/RevealProvider';
import { STUDIO_SETS } from '@/data/sets';

export const metadata: Metadata = {
  title: 'Film Studio Rental Mumbai – Book a Film Set Today',
  description:
    'Looking for a film studio on rent in Mumbai? Cine Classic Studios offers 9 fully-dressed film sets near Film City, Goregaon East. Bollywood, OTT, TV serials. Book by the hour. ₹4,500/hr onwards.',
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
    title: 'Film Studio Rental Mumbai – Cine Classic Studios',
    description:
      '9 professional film sets in Mumbai. Market, chawl, court, hospital, police station & open ground. From ₹4,500/hr.',
    type: 'website',
    locale: 'en_IN',
  },
};

const WHY_CHOOSE = [
  {
    icon: '🏛️',
    title: '9 Production-Ready Sets',
    desc: 'From a traditional Indian bazaar to a Mumbai chawl, a full courtroom, hospital ward, and open ground — no location permits needed.',
  },
  {
    icon: '📍',
    title: 'Near Film City, Mumbai',
    desc: 'Located minutes from Goregaon Film City — in the heart of Mumbai\'s production corridor. Easy access for crews and equipment.',
  },
  {
    icon: '⚡',
    title: '200A Professional Power',
    desc: 'Three-phase, 200A power supply per studio floor. Generator hookups, dedicated circuits for cinema cameras and lighting rigs.',
  },
  {
    icon: '💡',
    title: 'LED Lighting Grid Included',
    desc: 'Overhead LED grid, Fresnels, and practicals included. Our rigging team configures lighting to your DP\'s spec sheet.',
  },
  {
    icon: '🚛',
    title: 'Large Vehicle Access',
    desc: '5.2m clearance gate and 40-tonne service road. Production trucks drive directly onto the studio floor.',
  },
  {
    icon: '📞',
    title: 'Booking Within Hours',
    desc: 'Contact us via WhatsApp or the booking form. We confirm availability and send a quote within a few hours.',
  },
];

const STUDIOS_HIGHLIGHT = STUDIO_SETS.slice(0, 6);

export default function FilmStudioRentalMumbaiPage() {
  return (
    <>
      <RevealProvider />
      <FloatingButtons />
      <Navbar />

      <main>
        {/* Hero */}
        <section style={{
          padding: '160px 5% 100px',
          background: 'var(--dark)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse at 30% 50%, rgba(212,175,55,0.07) 0%, transparent 60%)',
            pointerEvents: 'none',
          }} />
          <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
              <div>
                <div className="section-tag">Mumbai's Best Film Sets</div>
                <h1 style={{
                  fontSize: 'clamp(2.5rem, 4.5vw, 3.8rem)',
                  fontWeight: 800, color: 'var(--white)',
                  margin: '1.2rem 0 1.2rem', lineHeight: 1.08,
                  letterSpacing: '-0.025em',
                }}>
                  Film Studio Rental{' '}
                  <span style={{ color: 'var(--gold)' }}>Mumbai</span>
                </h1>
                <p style={{
                  color: 'var(--gray)', fontSize: '1.05rem',
                  lineHeight: 1.85, marginBottom: '2.5rem', maxWidth: '480px',
                }}>
                  Nine fully-dressed production sets near Film City, Goregaon East. Bollywood features, OTT series, TV serials, and commercial shoots — all at professional rates starting from ₹4,500/hour.
                </p>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <a href="/#booking" className="btn-primary">Book a Studio →</a>
                  <a
                    href="https://wa.me/919876543210?text=Hi%2C%20I%27m%20looking%20for%20a%20film%20studio%20rental%20in%20Mumbai."
                    target="_blank" rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                      padding: '15px 28px',
                      background: '#25D366', color: '#fff',
                      borderRadius: '100px', fontSize: '0.82rem', fontWeight: 600,
                      textDecoration: 'none', letterSpacing: '0.06em',
                    }}
                  >
                    💬 WhatsApp Now
                  </a>
                </div>
              </div>

              {/* Stats column */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {[
                  { v: '9', l: 'Production Sets' },
                  { v: '₹4,500', l: 'Starting Per Hour' },
                  { v: '6,000', l: 'Sq Ft Largest Set' },
                  { v: '200A', l: 'Power Per Stage' },
                ].map(s => (
                  <div key={s.l} style={{
                    background: 'var(--dark3)',
                    border: '1px solid rgba(212,175,55,0.12)',
                    borderRadius: '12px',
                    padding: '1.8rem 1.5rem',
                    textAlign: 'center',
                  }}>
                    <div style={{
                      fontFamily: 'var(--font-playfair), serif',
                      fontSize: '2rem', fontWeight: 800,
                      color: 'var(--gold)', marginBottom: '0.4rem',
                    }}>{s.v}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--gray)' }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section style={{ padding: '100px 5%', background: 'var(--dark2)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <span className="section-tag">Why Cine Classic</span>
              <h2 style={{
                fontSize: 'clamp(1.75rem, 3.3vw, 2.5rem)',
                fontWeight: 700, color: 'var(--white)',
                margin: '1.2rem 0 1rem',
                letterSpacing: '-0.015em', lineHeight: 1.15,
              }}>
                Mumbai&apos;s Most Complete{' '}
                <span style={{ color: 'var(--gold)' }}>Film Studio Complex</span>
              </h2>
            </div>
            <div className="seo-features-grid">
              {WHY_CHOOSE.map((item, i) => (
                <div
                  key={item.title}
                  className={`reveal reveal-delay-${(i % 3) + 1} fac-card`}
                  style={{ background: 'var(--dark3)' }}
                >
                  <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{item.icon}</div>
                  <h3 style={{
                    fontSize: '1.1rem', fontWeight: 700,
                    color: 'var(--white)', marginBottom: '0.75rem',
                    letterSpacing: '-0.01em',
                  }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--gray)', lineHeight: 1.7 }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Studio Listing */}
        <section style={{ padding: '100px 5%', background: 'var(--dark)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="reveal" style={{ marginBottom: '3.5rem' }}>
              <span className="section-tag">Our Film Sets</span>
              <h2 style={{
                fontSize: 'clamp(1.75rem, 3.3vw, 2.5rem)',
                fontWeight: 700, color: 'var(--white)',
                margin: '1.2rem 0 1rem',
                letterSpacing: '-0.015em', lineHeight: 1.15,
              }}>
                Sets Available for{' '}
                <span style={{ color: 'var(--gold)' }}>Film Production</span>
              </h2>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem',
            }}>
              {STUDIOS_HIGHLIGHT.map((studio, i) => (
                <div
                  key={studio.id}
                  className={`reveal reveal-delay-${(i % 3) + 1}`}
                  style={{
                    background: studio.gradient,
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '12px',
                    padding: '2rem',
                    transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s',
                  }}
                >
                  <div style={{
                    height: '2px',
                    background: `linear-gradient(90deg, ${studio.accentColor}, transparent)`,
                    marginBottom: '1.5rem',
                    opacity: 0.6,
                  }} />
                  <div style={{ fontSize: '1.8rem', marginBottom: '0.6rem' }}>{studio.icon}</div>
                  <h3 style={{
                    fontSize: '1.2rem', fontWeight: 700,
                    color: 'var(--white)', marginBottom: '0.5rem',
                    letterSpacing: '-0.01em',
                  }}>
                    {studio.name}
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--gray)', lineHeight: 1.7, marginBottom: '1.2rem' }}>
                    {studio.shortDescription}
                  </p>
                  <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.2rem', flexWrap: 'wrap' }}>
                    {[
                      { l: 'Size', v: studio.size },
                      { l: 'Rate', v: `${studio.rateFrom}${studio.rateUnit}` },
                      { l: 'Capacity', v: studio.capacity },
                    ].map(m => (
                      <div key={m.l}>
                        <div style={{ fontSize: '0.62rem', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2px' }}>{m.l}</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--white)', fontWeight: 600 }}>{m.v}</div>
                      </div>
                    ))}
                  </div>
                  <a
                    href={`/studios/${studio.slug}`}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '5px',
                      fontSize: '0.78rem', fontWeight: 600,
                      color: studio.accentColor, textDecoration: 'none',
                      letterSpacing: '0.06em', textTransform: 'uppercase',
                    }}
                  >
                    View Set Details →
                  </a>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
              <a href="/" className="btn-outline">View All 9 Studios →</a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ padding: '80px 5%', background: 'var(--dark2)' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div className="reveal" style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{
                fontSize: 'clamp(1.6rem, 2.5vw, 2.4rem)',
                fontWeight: 700, color: 'var(--white)',
                letterSpacing: '-0.015em', lineHeight: 1.15,
              }}>
                Film Studio Rental FAQ
              </h2>
            </div>
            {[
              { q: 'Where is Cine Classic Studios located?', a: 'We are located on Film City Road, Goregaon East, Mumbai – 400 065. Just minutes from Goregaon Film City on the Western Express Highway.' },
              { q: 'What is the minimum booking duration?', a: 'The minimum booking is 4 hours (half-day). Hourly rates apply for add-on hours. Full-day (8-hour) and multi-day packages are available at discounted rates.' },
              { q: 'Can I bring my own lighting and equipment?', a: 'Yes. Our studios are designed for you to bring your own equipment. Drive-in access and dedicated power circuits are available. Our rigging team can also supplement with our in-house lighting inventory.' },
              { q: 'Do you offer set dressing and art department support?', a: 'Yes. Most of our sets come fully dressed with authentic props. We also offer art department assistance, additional prop sourcing, and custom set modifications.' },
              { q: 'Is there parking for large production vehicles?', a: 'Yes. We have a 5.2m clearance vehicle gate, 40-tonne service road, and 60+ parking spaces for crew vehicles, production vans, and equipment trucks.' },
            ].map((faq, i) => (
              <div
                key={i}
                className="reveal"
                style={{
                  marginBottom: '1.2rem',
                  padding: '1.5rem',
                  background: 'var(--dark3)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '10px',
                }}
              >
                <h3 style={{
                  fontSize: '1rem', fontWeight: 700,
                  color: 'var(--white)', marginBottom: '0.6rem',
                  letterSpacing: '-0.01em',
                }}>
                  {faq.q}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--gray)', lineHeight: 1.7 }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section style={{ padding: '80px 5%', background: 'var(--dark)', textAlign: 'center' }}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: 'clamp(1.75rem, 3.3vw, 2.5rem)',
              fontWeight: 700, color: 'var(--white)',
              marginBottom: '1rem',
              letterSpacing: '-0.015em', lineHeight: 1.15,
            }}>
              Ready to Book Your <span style={{ color: 'var(--gold)' }}>Film Set?</span>
            </h2>
            <p style={{ color: 'var(--gray)', lineHeight: 1.8, marginBottom: '2rem' }}>
              Contact our team today. We respond within a few hours with availability and pricing.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/#booking" className="btn-primary">Send a Booking Inquiry →</a>
              <a
                href="https://wa.me/919876543210?text=Hi%2C%20I%20need%20a%20film%20studio%20in%20Mumbai."
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  padding: '15px 28px',
                  background: '#25D366', color: '#fff',
                  borderRadius: '100px', fontSize: '0.82rem', fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                💬 WhatsApp Us
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
