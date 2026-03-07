import type { Metadata } from 'next';
import Navbar  from '@/components/Navbar';
import Footer  from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';
import RevealProvider  from '@/components/RevealProvider';

export const metadata: Metadata = {
  title: 'Ad Film Studio Mumbai – TVC & Commercial Shoot Location',
  description:
    'Professional ad film studio in Mumbai for TVCs, digital ads, brand films, and commercial shoots. Cine Classic Studios offers 9 dressed sets with 200A power, LED lighting rigs, and production support. Book from ₹4,500/hr.',
  keywords: [
    'ad film studio mumbai',
    'TVC shoot location mumbai',
    'commercial shoot studio mumbai',
    'ad film production mumbai',
    'brand film studio mumbai',
    'TV commercial studio mumbai',
    'digital ad shoot mumbai',
    'corporate film studio mumbai',
    'product shoot studio mumbai',
  ],
  alternates: { canonical: '/ad-film-studio' },
  openGraph: {
    title: 'Ad Film Studio Mumbai – TVC & Commercial Shoots | Cine Classic Studios',
    description:
      'Book a TVC or commercial ad shoot studio in Mumbai. 9 dressed sets, pro lighting, 200A power. From ₹4,500/hr.',
    type: 'website',
    locale: 'en_IN',
  },
};

const AD_TYPES = [
  { icon: '📺', title: 'Television Commercials (TVC)', desc: 'Precision-controlled sets for 30-second and 60-second TVCs. Perfect colour accuracy, silent HVAC, and repeatable lighting setups.' },
  { icon: '📱', title: 'Digital & Social Media Ads', desc: 'Fast-paced, high-energy shoots for Instagram reels, YouTube pre-rolls, and Facebook campaign content.' },
  { icon: '🏷️', title: 'Brand Films', desc: 'Long-form brand storytelling with cinematic production values. Our sets add depth and authenticity to brand narratives.' },
  { icon: '📦', title: 'Product Demonstrations', desc: 'Controlled environment shoots for electronics, FMCG, and household products. Sweep backdrops and hero product lighting available.' },
  { icon: '💊', title: 'Pharma Commercials', desc: 'Our hospital set is a go-to for pharma, healthcare, and insurance brand films. Clinically accurate and visually credible.' },
  { icon: '🏠', title: 'Real Estate & Home', desc: 'Living room and lifestyle sets for real estate, home appliances, and interior decor brand films.' },
];

const AD_ADVANTAGES = [
  { title: 'No Location Permits', value: 'All 9 sets are on private studio property. No BMC permits, police permissions, or public location headaches.' },
  { title: 'Repeatable Lighting', value: 'DMX-controlled lighting rigs can be saved and recalled identically — essential for consistency across shoot days.' },
  { title: 'Silent Environment', value: 'Acoustically treated studios with silent HVAC. No traffic noise, ambient interruptions, or external sound bleeds.' },
  { title: 'Quick Set Changes', value: 'Modular set elements allow rapid redressing between takes. Save time between product variations or brand segments.' },
  { title: 'Full Power Backup', value: '200A 3-phase power with UPS backup. Critical for high-output lighting systems used in product and beauty shoots.' },
  { title: 'Production Support', value: 'On-site studio manager coordinates floor operations. Art department, prop sourcing, and lighting technicians on request.' },
];

export default function AdFilmStudioPage() {
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
            background: 'radial-gradient(ellipse at 60% 40%, rgba(0,201,122,0.06) 0%, transparent 60%)',
            pointerEvents: 'none',
          }} />
          <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
              <div>
                <div className="section-tag">Mumbai's TVC Studio</div>
                <h1 style={{
                  fontSize: 'clamp(2.5rem, 4.5vw, 3.8rem)',
                  fontWeight: 800, color: 'var(--white)',
                  margin: '1.2rem 0 1.2rem', lineHeight: 1.08,
                  letterSpacing: '-0.025em',
                }}>
                  Ad Film Studio{' '}
                  <span style={{ color: 'var(--gold)' }}>Mumbai</span>
                </h1>
                <p style={{
                  color: 'var(--gray)', fontSize: '1.02rem',
                  lineHeight: 1.85, marginBottom: '2.5rem', maxWidth: '460px',
                }}>
                  Professional commercial shoot studios for TVCs, digital campaigns, brand films, and product ads. Controlled environment, pro lighting, silent sets, and complete production support — from ₹4,500/hour.
                </p>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <a href="/#booking" className="btn-primary">Book a Studio →</a>
                  <a
                    href="https://wa.me/919876543210?text=Hi%2C%20I%20need%20an%20ad%20film%20studio%20in%20Mumbai."
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

              {/* Right side — key advantages */}
              <div>
                {AD_ADVANTAGES.slice(0, 4).map(adv => (
                  <div key={adv.title} style={{
                    display: 'flex', gap: '1rem',
                    marginBottom: '1.2rem',
                    padding: '1.2rem',
                    background: 'var(--dark3)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '10px',
                  }}>
                    <div style={{
                      width: '8px', height: '8px', borderRadius: '50%',
                      background: 'var(--gold)', flexShrink: 0, marginTop: '6px',
                    }} />
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--white)', marginBottom: '4px' }}>
                        {adv.title}
                      </div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--gray)', lineHeight: 1.65 }}>
                        {adv.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Ad Types */}
        <section style={{ padding: '100px 5%', background: 'var(--dark2)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <span className="section-tag">Commercial Production Types</span>
              <h2 style={{
                fontSize: 'clamp(1.75rem, 3.3vw, 2.5rem)',
                fontWeight: 700, color: 'var(--white)',
                margin: '1.2rem 0 1rem',
                letterSpacing: '-0.015em', lineHeight: 1.15,
              }}>
                Every Format of <span style={{ color: 'var(--gold)' }}>Commercial Production</span>
              </h2>
            </div>
            <div className="seo-features-grid">
              {AD_TYPES.map((item, i) => (
                <div
                  key={item.title}
                  className={`reveal reveal-delay-${(i % 3) + 1} fac-card`}
                  style={{ background: 'var(--dark3)' }}
                >
                  <div style={{ fontSize: '2rem', marginBottom: '0.8rem' }}>{item.icon}</div>
                  <h3 style={{
                    fontSize: '1.1rem', fontWeight: 700,
                    color: 'var(--white)', marginBottom: '0.7rem',
                    letterSpacing: '-0.01em',
                  }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--gray)', lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Brands section */}
        <section style={{ padding: '80px 5%', background: 'var(--dark)' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <div className="reveal" style={{ marginBottom: '3rem' }}>
              <span className="section-tag">Client Trust</span>
              <h2 style={{
                fontSize: 'clamp(1.75rem, 3.3vw, 2.5rem)',
                fontWeight: 700, color: 'var(--white)',
                margin: '1.2rem 0 1rem',
                letterSpacing: '-0.015em', lineHeight: 1.15,
              }}>
                Trusted by Leading <span style={{ color: 'var(--gold)' }}>Ad Agencies & Brands</span>
              </h2>
              <p style={{ color: 'var(--gray)', lineHeight: 1.8, maxWidth: '600px', margin: '0 auto' }}>
                Top advertising agencies and production houses choose Cine Classic Studios for their commercial shoots — because controlled environments and reliable infrastructure save time and reduce costs.
              </p>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '1rem',
              marginTop: '3rem',
            }}>
              {[
                { cat: 'FMCG', example: 'HUL, Nestlé, Marico' },
                { cat: 'Pharma', example: 'Sun Pharma, Cipla, Alembic' },
                { cat: 'Telecom', example: 'Jio, Airtel, Vi' },
                { cat: 'Real Estate', example: 'Lodha, Godrej Properties' },
                { cat: 'Auto', example: 'Maruti, Hyundai, TVS' },
                { cat: 'Fashion', example: 'Manyavar, Westside, Fabindia' },
              ].map(b => (
                <div
                  key={b.cat}
                  className="reveal"
                  style={{
                    background: 'var(--dark3)',
                    border: '1px solid rgba(212,175,55,0.1)',
                    borderRadius: '10px',
                    padding: '1.3rem',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '0.68rem', color: 'var(--gold)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.4rem', fontWeight: 600 }}>
                    {b.cat}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--gray)', lineHeight: 1.5 }}>{b.example}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* All advantages */}
        <section style={{ padding: '80px 5%', background: 'var(--dark2)' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="reveal" style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{
                fontSize: 'clamp(1.6rem, 2.5vw, 2.4rem)',
                fontWeight: 700, color: 'var(--white)',
                letterSpacing: '-0.015em', lineHeight: 1.15,
              }}>
                Why Ad Agencies Choose <span style={{ color: 'var(--gold)' }}>Cine Classic Studios</span>
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              {AD_ADVANTAGES.map((adv, i) => (
                <div
                  key={adv.title}
                  className={`reveal reveal-delay-${(i % 3) + 1}`}
                  style={{
                    background: 'var(--dark3)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '10px',
                    padding: '1.5rem',
                    display: 'flex', gap: '1rem', alignItems: 'flex-start',
                  }}
                >
                  <div style={{
                    width: '10px', height: '10px', borderRadius: '50%',
                    background: 'var(--gold)', flexShrink: 0, marginTop: '5px',
                  }} />
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--white)', marginBottom: '0.4rem' }}>
                      {adv.title}
                    </div>
                    <div style={{ fontSize: '0.83rem', color: 'var(--gray)', lineHeight: 1.65 }}>
                      {adv.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: '80px 5%', background: 'var(--dark)', textAlign: 'center' }}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: 'clamp(1.75rem, 3.3vw, 2.5rem)',
              fontWeight: 700, color: 'var(--white)', marginBottom: '1rem',
              letterSpacing: '-0.015em', lineHeight: 1.15,
            }}>
              Book Your <span style={{ color: 'var(--gold)' }}>Ad Film Shoot</span>
            </h2>
            <p style={{ color: 'var(--gray)', lineHeight: 1.8, marginBottom: '2rem' }}>
              Share your brand brief, shoot dates, and preferred set. We&apos;ll confirm availability and send a detailed studio package within hours.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/#booking" className="btn-primary">Send a Booking Inquiry →</a>
              <a
                href="https://wa.me/919876543210?text=Hi%2C%20I%20need%20an%20ad%20film%20studio%20in%20Mumbai%20for%20a%20TVC%20shoot."
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
