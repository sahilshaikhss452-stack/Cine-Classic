import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';
import RevealProvider from '@/components/RevealProvider';
import { loadSiteSettings } from '@/lib/sanity';

export const metadata: Metadata = {
  title: 'Music Video Shoot Location Mumbai | Cine Classic Studios',
  description:
    'Looking for a music video shoot location in Mumbai? Explore production-ready studio sets for performance, narrative, and stylised music video shoots.',
  keywords: [
    'music video shoot location mumbai',
    'music video studio mumbai',
    'music video shoot mumbai',
    'music video set rental mumbai',
    'music video production studio mumbai',
    'bollywood music video location mumbai',
    'indie music video studio mumbai',
    'performance shoot studio mumbai',
  ],
  alternates: { canonical: '/music-video-shoot-location' },
  openGraph: {
    title: 'Music Video Shoot Location Mumbai | Cine Classic Studios',
    description:
      'Production-ready music video locations in Mumbai for performance shoots, narrative looks, and stylised visual treatments.',
    type: 'website',
    locale: 'en_IN',
  },
};

const MV_SETS = [
  { marker: '01', title: 'Marketplace looks', desc: 'Useful for songs that need layered backgrounds, crowd energy, and the visual texture of an active public-facing set.' },
  { marker: '02', title: 'Mumbai chawl aesthetics', desc: 'A strong fit for nostalgic storytelling, dramatic performance setups, and scenes that need a recognisable urban mood.' },
  { marker: '03', title: 'Stylised institutional sets', desc: 'Helpful for concept-driven music videos that need interrogation, courtroom, or cinematic procedural references.' },
  { marker: '04', title: 'Open ground potential', desc: 'Suitable for performance-led visuals, group choreography, larger blocking, and wider camera movement.' },
  { marker: '05', title: 'Narrative crossover', desc: 'Useful when a music video also needs short narrative moments, dramatic inserts, or scene-based transitions.' },
  { marker: '06', title: 'Multiple looks in one venue', desc: 'A practical choice when the treatment needs visual variation without the cost or time pressure of multiple external locations.' },
];

const MV_REASONS = [
  { marker: '01', title: 'Better control over the shoot day', desc: 'A studio environment gives directors and production teams more control over pacing, access, and the visual plan.' },
  { marker: '02', title: 'Useful for stylised lighting', desc: 'Ideal for treatments that need performance lighting, dramatic mood shifts, or a more controlled visual setup.' },
  { marker: '03', title: 'Supports quick turnarounds', desc: 'Helpful for music video schedules that need faster setup decisions and fewer location-change delays.' },
  { marker: '04', title: 'Easier talent and crew movement', desc: 'A practical fit for artist teams, stylists, choreographers, and production units working on tight timelines.' },
  { marker: '05', title: 'Recce-friendly planning', desc: 'The team can help you shortlist the most suitable set for the treatment before the shoot day gets locked.' },
  { marker: '06', title: 'Built for video production teams', desc: 'Suitable for Bollywood, regional, branded, and independent music video work that needs controlled shooting space in Mumbai.' },
];

export default async function MusicVideoShootLocationPage() {
  const settings = await loadSiteSettings();
  const primaryWhatsappUrl = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent('Hi, I need a music video shoot location in Mumbai.')}`;
  const secondaryWhatsappUrl = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent('Hi, I need to book a music video shoot location in Mumbai.')}`;

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
            background: 'radial-gradient(ellipse at 40% 60%, rgba(168,85,247,0.06) 0%, transparent 60%)',
            pointerEvents: 'none',
          }} />
          <div style={{ maxWidth: '920px', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
            <div className="section-tag">Music Video Shoot Location Mumbai</div>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 4.5vw, 3.8rem)',
              fontWeight: 800, color: 'var(--white)',
              margin: '1.2rem 0 1.2rem', lineHeight: 1.08,
              letterSpacing: '-0.025em',
            }}>
              Studio sets for <span style={{ color: 'var(--gold)' }}>music video shoots in Mumbai</span>
            </h1>
            <p style={{
              color: 'var(--gray)', fontSize: '1.05rem',
              lineHeight: 1.85, maxWidth: '700px', margin: '0 auto 2.5rem',
            }}>
              Cine Classic Studios helps music video teams explore performance-friendly, narrative-ready, and stylised set options without the friction of multiple external locations.
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
              <span className="section-tag">Set Exploration</span>
              <h2 style={{
                fontSize: 'clamp(1.75rem, 3.3vw, 2.5rem)',
                fontWeight: 700, color: 'var(--white)',
                margin: '1.2rem 0 1rem',
                letterSpacing: '-0.015em', lineHeight: 1.15,
              }}>
                Studio looks that help <span style={{ color: 'var(--gold)' }}>sell the treatment</span>
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {MV_SETS.map((set, i) => (
                <div
                  key={set.title}
                  className={`reveal reveal-delay-${(i % 3) + 1}`}
                  style={{
                    background: 'var(--dark3)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '12px',
                    padding: '2rem',
                    transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s',
                  }}
                >
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.14em', marginBottom: '0.8rem' }}>{set.marker}</div>
                  <h3 style={{
                    fontSize: '1.1rem', fontWeight: 700,
                    color: 'var(--white)', marginBottom: '0.7rem',
                    letterSpacing: '-0.01em',
                  }}>
                    {set.title}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--gray)', lineHeight: 1.7 }}>
                    {set.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: '100px 5%', background: 'var(--dark)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <span className="section-tag">Why It Helps</span>
              <h2 style={{
                fontSize: 'clamp(1.75rem, 3.3vw, 2.5rem)',
                fontWeight: 700, color: 'var(--white)',
                margin: '1.2rem 0',
                letterSpacing: '-0.015em', lineHeight: 1.15,
              }}>
                Built for <span style={{ color: 'var(--gold)' }}>music video production realities</span>
              </h2>
            </div>
            <div className="seo-features-grid">
              {MV_REASONS.map((item, i) => (
                <div
                  key={item.title}
                  className={`reveal reveal-delay-${(i % 3) + 1} fac-card`}
                  style={{ background: 'var(--dark3)' }}
                >
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.14em', marginBottom: '0.8rem' }}>{item.marker}</div>
                  <h3 style={{
                    fontSize: '1.05rem', fontWeight: 700,
                    color: 'var(--white)', marginBottom: '0.6rem',
                    letterSpacing: '-0.01em',
                  }}>{item.title}</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--gray)', lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: '80px 5%', background: 'var(--dark2)', textAlign: 'center' }}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: 'clamp(1.75rem, 3.3vw, 2.5rem)',
              fontWeight: 700, color: 'var(--white)', marginBottom: '1rem',
              letterSpacing: '-0.015em', lineHeight: 1.15,
            }}>
              Need a <span style={{ color: 'var(--gold)' }}>music video location in Mumbai?</span>
            </h2>
            <p style={{ color: 'var(--gray)', lineHeight: 1.8, marginBottom: '2rem' }}>
              Share the treatment, dates, and the kind of visual look you are after. We will help you shortlist the most suitable set quickly.
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