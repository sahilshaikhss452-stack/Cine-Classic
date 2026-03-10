import type { Metadata } from 'next';
import Navbar  from '@/components/Navbar';
import Footer  from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';
import RevealProvider  from '@/components/RevealProvider';
import { loadSiteSettings } from '@/lib/sanity';

export const metadata: Metadata = {
  title: 'Photoshoot Studio Mumbai – Book a Professional Photography Studio',
  description:
    'Premium photoshoot studio in Mumbai for fashion, editorial, e-commerce, catalogue, and brand shoots. Multiple backdrops, professional lighting rigs, makeup rooms. Near Film City, Goregaon East.',
  keywords: [
    'photoshoot studio mumbai',
    'photography studio mumbai',
    'photoshoot studio on rent mumbai',
    'fashion photoshoot studio mumbai',
    'editorial photoshoot studio mumbai',
    'ecommerce photoshoot studio mumbai',
    'studio photography goregaon',
    'photoshoot location mumbai',
    'professional photography studio mumbai',
  ],
  alternates: { canonical: '/photoshoot-studio-mumbai' },
  openGraph: {
    title: 'Photoshoot Studio Mumbai – Cine Classic Studios',
    description:
      'Book a professional photoshoot studio in Mumbai. Fashion, editorial, e-commerce, and brand shoots. Multiple unique sets available.',
    type: 'website',
    locale: 'en_IN',
  },
};

const SHOOT_TYPES = [
  { icon: '👗', title: 'Fashion Lookbooks', desc: 'Multiple distinct sets for seasonal collections, high-fashion editorials, and OOH campaigns.' },
  { icon: '📦', title: 'E-commerce & Catalogue', desc: 'Clean, controlled environments ideal for large-volume product and catalogue photography.' },
  { icon: '🏢', title: 'Corporate & Brand', desc: 'Executive portraits, brand imagery, and corporate headshots with professional backdrop options.' },
  { icon: '💍', title: 'Wedding & Pre-Wedding', desc: 'Cinematic sets — chawl, market, and period sets — for unique pre-wedding shoots.' },
  { icon: '🍕', title: 'Food & Beverage', desc: 'Kitchenette area and controlled lighting for commercial food and product photography.' },
  { icon: '✨', title: 'Beauty & Cosmetics', desc: 'Pristine white and dark environments for skincare, cosmetics, and personal care brands.' },
];

const PHOTO_FEATURES = [
  { icon: '💡', title: 'Pro Lighting Included', desc: 'LED grid, Bowens-mount strobes, beauty dishes, and reflector systems available on request.' },
  { icon: '📸', title: 'Multiple Backdrops', desc: '9 unique set environments plus customizable backdrop walls for seamless variation.' },
  { icon: '💄', title: 'Makeup Rooms', desc: 'Vanity stations with Hollywood lighting for talent prep between looks.' },
  { icon: '📦', title: 'Storage & Props', desc: 'On-site prop inventory and wardrobe racks for full-day multi-look shoots.' },
  { icon: '🌡️', title: 'Climate Controlled', desc: 'Air-conditioned studios maintain consistent temperature and humidity for long shoot days.' },
  { icon: '⚡', title: '200A Power Supply', desc: 'Dedicated power circuits for high-output flash and continuous lighting systems.' },
];

export default async function PhotoshootStudioMumbaiPage() {
  const settings = await loadSiteSettings();
  const primaryWhatsappUrl = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent("Hi, I'm looking for a photoshoot studio in Mumbai.")}`;
  const secondaryWhatsappUrl = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent('Hi, I need to book a photoshoot studio in Mumbai.')}`;
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
            background: 'radial-gradient(ellipse at 70% 30%, rgba(212,175,55,0.07) 0%, transparent 60%)',
            pointerEvents: 'none',
          }} />
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
            <div className="section-tag">Mumbai's Top Photo Studios</div>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 4.5vw, 3.8rem)',
              fontWeight: 800, color: 'var(--white)',
              margin: '1.2rem 0 1.2rem', lineHeight: 1.08,
              letterSpacing: '-0.025em',
            }}>
              Photoshoot Studio{' '}
              <span style={{ color: 'var(--gold)' }}>Mumbai</span>
            </h1>
            <p style={{
              color: 'var(--gray)', fontSize: '1.05rem',
              lineHeight: 1.85, marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem',
            }}>
              Professional photography studios with unique set environments, pro lighting, makeup rooms, and crew amenities. Fashion, editorial, e-commerce, brand, and personal shoots — all in fully equipped production spaces.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/#booking" className="btn-primary">Book a Studio →</a>
              <a
                href={primaryWhatsappUrl}
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
        </section>

        {/* Shoot Types */}
        <section style={{ padding: '100px 5%', background: 'var(--dark2)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <span className="section-tag">Shoot Categories</span>
              <h2 style={{
                fontSize: 'clamp(1.75rem, 3.3vw, 2.5rem)',
                fontWeight: 700, color: 'var(--white)',
                margin: '1.2rem 0 1rem',
                letterSpacing: '-0.015em', lineHeight: 1.15,
              }}>
                Perfect for Every <span style={{ color: 'var(--gold)' }}>Photography Style</span>
              </h2>
            </div>
            <div className="seo-features-grid">
              {SHOOT_TYPES.map((item, i) => (
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

        {/* Features */}
        <section style={{ padding: '100px 5%', background: 'var(--dark)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <span className="section-tag">Studio Features</span>
              <h2 style={{
                fontSize: 'clamp(1.75rem, 3.3vw, 2.5rem)',
                fontWeight: 700, color: 'var(--white)',
                margin: '1.2rem 0 1rem',
                letterSpacing: '-0.015em', lineHeight: 1.15,
              }}>
                Everything a Photographer <span style={{ color: 'var(--gold)' }}>Needs</span>
              </h2>
            </div>
            <div className="seo-features-grid">
              {PHOTO_FEATURES.map((item, i) => (
                <div
                  key={item.title}
                  className={`reveal reveal-delay-${(i % 3) + 1}`}
                  style={{
                    background: 'var(--dark3)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '12px',
                    padding: '2rem',
                    transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1)',
                  }}
                >
                  <div style={{ fontSize: '1.8rem', marginBottom: '0.8rem' }}>{item.icon}</div>
                  <h3 style={{
                    fontSize: '1.05rem', fontWeight: 700,
                    color: 'var(--white)', marginBottom: '0.6rem',
                    letterSpacing: '-0.01em',
                  }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.86rem', color: 'var(--gray)', lineHeight: 1.7 }}>{item.desc}</p>
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
              Book Your <span style={{ color: 'var(--gold)' }}>Photoshoot</span> Today
            </h2>
            <p style={{ color: 'var(--gray)', lineHeight: 1.8, marginBottom: '2rem' }}>
              Send us your shoot brief and preferred dates. We&apos;ll confirm availability within a few hours.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/#booking" className="btn-primary">Send a Booking Inquiry →</a>
              <a
                href={secondaryWhatsappUrl}
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
