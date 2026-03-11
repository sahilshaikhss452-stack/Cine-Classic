import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';
import RevealProvider from '@/components/RevealProvider';
import { loadSiteSettings } from '@/lib/sanity';

export const metadata: Metadata = {
  title: 'Ad Film Studio Mumbai | Cine Classic Studios',
  description:
    'Looking for an ad film studio in Mumbai? Explore production-ready studio sets for TV commercials, digital campaigns, brand films, and product shoots.',
  keywords: [
    'ad film studio mumbai',
    'commercial shoot studio mumbai',
    'TVC shoot location mumbai',
    'brand film studio mumbai',
    'digital ad shoot mumbai',
    'product shoot studio mumbai',
    'corporate film studio mumbai',
    'commercial production studio mumbai',
  ],
  alternates: { canonical: '/ad-film-studio' },
  openGraph: {
    title: 'Ad Film Studio Mumbai | Cine Classic Studios',
    description:
      'Production-ready studio spaces in Mumbai for TVCs, digital campaigns, brand films, and commercial shoots.',
    type: 'website',
    locale: 'en_IN',
  },
};

const AD_TYPES = [
  { marker: '01', title: 'Television commercials', desc: 'A practical fit for controlled campaign shoots where timing, consistency, and studio logistics matter.' },
  { marker: '02', title: 'Digital ad campaigns', desc: 'Useful for short-form content, social campaigns, and multi-format commercial production days.' },
  { marker: '03', title: 'Brand films', desc: 'Strong for longer-form brand storytelling that needs a more controlled and production-friendly studio environment.' },
  { marker: '04', title: 'Product-led shoots', desc: 'Helpful for campaign work that depends on art direction, repeatable setup, and a controlled shooting plan.' },
  { marker: '05', title: 'Corporate and branded content', desc: 'Suitable for agency teams and internal brand units looking for reliable studio support in Mumbai.' },
  { marker: '06', title: 'Campaign stills plus motion', desc: 'Useful when one brief needs both film and photography output within the same production schedule.' },
];

const AD_ADVANTAGES = [
  { title: 'Controlled studio environment', value: 'A stronger option for commercials that need more predictability, fewer location variables, and smoother day planning.' },
  { title: 'Faster recce-to-booking flow', value: 'The team can guide agencies and production houses through set fit, dates, and practical next steps quickly.' },
  { title: 'Useful for multi-team approvals', value: 'Commercial shoots often involve agency, client, and production stakeholders. Clearer planning helps keep decisions moving.' },
  { title: 'Better for visual consistency', value: 'A studio setting supports repeat takes, art direction, and campaign work that needs tighter control over the frame.' },
  { title: 'Crew-friendly production support', value: 'A practical choice for teams managing talent, wardrobe, product, props, and time-sensitive commercial schedules.' },
  { title: 'Mumbai convenience for agencies', value: 'Useful for advertising teams looking for a reliable commercial shoot base in the cityâ€™s active production circuit.' },
];

export default async function AdFilmStudioPage() {
  const settings = await loadSiteSettings();
  const primaryWhatsappUrl = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent('Hi, I need an ad film studio in Mumbai.')}`;
  const secondaryWhatsappUrl = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent('Hi, I need an ad film studio in Mumbai for a TVC shoot.')}`;

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
            background: 'radial-gradient(ellipse at 60% 40%, rgba(0,201,122,0.06) 0%, transparent 60%)',
            pointerEvents: 'none',
          }} />
          <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4rem', alignItems: 'center' }}>
              <div>
                <div className="section-tag">Ad Film Studio Mumbai</div>
                <h1 style={{
                  fontSize: 'clamp(2.5rem, 4.5vw, 3.8rem)',
                  fontWeight: 800, color: 'var(--white)',
                  margin: '1.2rem 0 1.2rem', lineHeight: 1.08,
                  letterSpacing: '-0.025em',
                }}>
                  Studio spaces for <span style={{ color: 'var(--gold)' }}>commercial shoots in Mumbai</span>
                </h1>
                <p style={{
                  color: 'var(--gray)', fontSize: '1.02rem',
                  lineHeight: 1.85, marginBottom: '2.5rem', maxWidth: '500px',
                }}>
                  Cine Classic Studios helps agencies, production houses, and brand teams plan TVCs, digital campaigns, and branded content shoots with more control and faster booking support.
                </p>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
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

              <div>
                {AD_ADVANTAGES.slice(0, 4).map((adv) => (
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

        <section style={{ padding: '100px 5%', background: 'var(--dark2)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <span className="section-tag">Commercial Formats</span>
              <h2 style={{
                fontSize: 'clamp(1.75rem, 3.3vw, 2.5rem)',
                fontWeight: 700, color: 'var(--white)',
                margin: '1.2rem 0 1rem',
                letterSpacing: '-0.015em', lineHeight: 1.15,
              }}>
                Built for a wide range of <span style={{ color: 'var(--gold)' }}>commercial briefs</span>
              </h2>
            </div>
            <div className="seo-features-grid">
              {AD_TYPES.map((item, i) => (
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

        <section style={{ padding: '80px 5%', background: 'var(--dark2)' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="reveal" style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{
                fontSize: 'clamp(1.6rem, 2.5vw, 2.4rem)',
                fontWeight: 700, color: 'var(--white)',
                letterSpacing: '-0.015em', lineHeight: 1.15,
              }}>
                Why commercial teams choose <span style={{ color: 'var(--gold)' }}>Cine Classic Studios</span>
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

        <section style={{ padding: '80px 5%', background: 'var(--dark)', textAlign: 'center' }}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: 'clamp(1.75rem, 3.3vw, 2.5rem)',
              fontWeight: 700, color: 'var(--white)', marginBottom: '1rem',
              letterSpacing: '-0.015em', lineHeight: 1.15,
            }}>
              Need an <span style={{ color: 'var(--gold)' }}>ad film studio in Mumbai?</span>
            </h2>
            <p style={{ color: 'var(--gray)', lineHeight: 1.8, marginBottom: '2rem' }}>
              Share your campaign brief, dates, and preferred set. We will help you move from shortlist to recce or booking with clearer next steps.
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
