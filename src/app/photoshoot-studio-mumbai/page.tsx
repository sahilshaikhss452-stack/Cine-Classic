import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';
import RevealProvider from '@/components/RevealProvider';
import { loadSiteSettings } from '@/lib/sanity';

export const metadata: Metadata = {
  title: 'Photoshoot Studio Mumbai | Cine Classic Studios',
  description:
    'Looking for a photoshoot studio in Mumbai? Explore production-ready spaces for fashion, editorial, commercial, catalogue, and branded content shoots.',
  keywords: [
    'photoshoot studio mumbai',
    'photography studio mumbai',
    'photoshoot studio on rent mumbai',
    'fashion photoshoot studio mumbai',
    'editorial photoshoot studio mumbai',
    'commercial photoshoot studio mumbai',
    'brand shoot studio mumbai',
    'professional photography studio mumbai',
  ],
  alternates: { canonical: '/photoshoot-studio-mumbai' },
  openGraph: {
    title: 'Photoshoot Studio Mumbai | Cine Classic Studios',
    description:
      'Production-ready photoshoot studio spaces in Mumbai for fashion, catalogue, brand, and commercial work.',
    type: 'website',
    locale: 'en_IN',
  },
};

const SHOOT_TYPES = [
  { marker: '01', title: 'Fashion & editorial shoots', desc: 'Useful for lookbooks, campaign imagery, stylised portraiture, and multi-look fashion days that need controlled studio conditions.' },
  { marker: '02', title: 'Catalogue & e-commerce work', desc: 'Helpful for organised product or apparel shoots where consistency, pace, and repeatable frames matter.' },
  { marker: '03', title: 'Brand campaigns', desc: 'A strong fit for commercial stills, branded content photography, and visual campaigns that need art direction and practical production flow.' },
  { marker: '04', title: 'Portrait and talent sessions', desc: 'Suitable for talent-led shoots, celebrity portraits, key art photography, and publicity imagery.' },
  { marker: '05', title: 'Product and tabletop briefs', desc: 'Useful when the brief needs a clean, controllable setup for product storytelling and campaign asset creation.' },
  { marker: '06', title: 'Creative concept shoots', desc: 'Ideal for photographers and creative teams who need multiple looks and a more flexible studio environment in one place.' },
];

const PHOTO_FEATURES = [
  { marker: '01', title: 'Lighting-friendly environments', desc: 'The spaces are easier to plan for photographers and lighting teams who need controlled conditions and predictable results.' },
  { marker: '02', title: 'Multiple looks in one venue', desc: 'Useful when the same shoot day needs visual variation without changing external locations.' },
  { marker: '03', title: 'Talent prep support', desc: 'Designed to work better for makeup, wardrobe changes, and smoother talent movement through the day.' },
  { marker: '04', title: 'Crew comfort and flow', desc: 'A stronger option for longer schedules that involve assistants, stylists, clients, and production coordinators.' },
  { marker: '05', title: 'Commercial planning support', desc: 'Helpful for production teams that need quicker shortlisting, recce coordination, and clearer next steps on dates.' },
  { marker: '06', title: 'Mumbai production convenience', desc: 'A practical studio base for photographers, agencies, and brand teams working on tighter schedules in Mumbai.' },
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
          <div style={{ maxWidth: '920px', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
            <div className="section-tag">Photoshoot Studio Mumbai</div>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 4.5vw, 3.8rem)',
              fontWeight: 800, color: 'var(--white)',
              margin: '1.2rem 0 1.2rem', lineHeight: 1.08,
              letterSpacing: '-0.025em',
            }}>
              A production-ready <span style={{ color: 'var(--gold)' }}>photoshoot studio in Mumbai</span>
            </h1>
            <p style={{
              color: 'var(--gray)', fontSize: '1.05rem',
              lineHeight: 1.85, maxWidth: '680px', margin: '0 auto 2.5rem',
            }}>
              Cine Classic Studios is built for photographers, agencies, brand teams, and production coordinators who need a practical studio environment for fashion, commercial, catalogue, and branded content shoots.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/#booking" className="btn-primary">Check Availability</a>
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
                WhatsApp Booking Desk
              </a>
            </div>
          </div>
        </section>

        <section style={{ padding: '100px 5%', background: 'var(--dark2)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <span className="section-tag">Use Cases</span>
              <h2 style={{
                fontSize: 'clamp(1.75rem, 3.3vw, 2.5rem)',
                fontWeight: 700, color: 'var(--white)',
                margin: '1.2rem 0 1rem',
                letterSpacing: '-0.015em', lineHeight: 1.15,
              }}>
                Built for a wide range of <span style={{ color: 'var(--gold)' }}>photo production briefs</span>
              </h2>
            </div>
            <div className="seo-features-grid">
              {SHOOT_TYPES.map((item, i) => (
                <div
                  key={item.title}
                  className={`reveal reveal-delay-${(i % 3) + 1} fac-card`}
                  style={{ background: 'var(--dark3)' }}
                >
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.14em', marginBottom: '0.8rem' }}>{item.marker}</div>
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

        <section style={{ padding: '100px 5%', background: 'var(--dark)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <span className="section-tag">Why It Works</span>
              <h2 style={{
                fontSize: 'clamp(1.75rem, 3.3vw, 2.5rem)',
                fontWeight: 700, color: 'var(--white)',
                margin: '1.2rem 0 1rem',
                letterSpacing: '-0.015em', lineHeight: 1.15,
              }}>
                A better fit for <span style={{ color: 'var(--gold)' }}>commercial photography planning</span>
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
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.14em', marginBottom: '0.8rem' }}>{item.marker}</div>
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

        <section style={{ padding: '80px 5%', background: 'var(--dark)', textAlign: 'center' }}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: 'clamp(1.75rem, 3.3vw, 2.5rem)',
              fontWeight: 700, color: 'var(--white)', marginBottom: '1rem',
              letterSpacing: '-0.015em', lineHeight: 1.15,
            }}>
              Need a <span style={{ color: 'var(--gold)' }}>photoshoot studio in Mumbai?</span>
            </h2>
            <p style={{ color: 'var(--gray)', lineHeight: 1.8, marginBottom: '2rem' }}>
              Send your shoot brief and preferred dates. We will confirm the next best step for shortlisting, recce planning, and availability.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/#booking" className="btn-primary">Send a Booking Inquiry</a>
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