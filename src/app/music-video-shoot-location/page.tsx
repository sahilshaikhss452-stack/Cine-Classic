import type { Metadata } from 'next';
import Navbar  from '@/components/Navbar';
import Footer  from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';
import RevealProvider  from '@/components/RevealProvider';

export const metadata: Metadata = {
  title: 'Music Video Shoot Location Mumbai – Book a Studio Today',
  description:
    'Book a music video shoot location in Mumbai. Cine Classic Studios offers 9 unique sets for Bollywood and indie music videos: market, chawl, police station, court, open ground & more.',
  keywords: [
    'music video shoot location mumbai',
    'music video studio mumbai',
    'music video shoot mumbai',
    'bollywood music video location',
    'music video set rental mumbai',
    'music video production studio mumbai',
    'punjabi music video shoot mumbai',
    'indie music video studio mumbai',
  ],
  alternates: { canonical: '/music-video-shoot-location' },
  openGraph: {
    title: 'Music Video Shoot Location Mumbai – Cine Classic Studios',
    description:
      'Unique, visually rich sets for Bollywood, indie, and regional music videos in Mumbai.',
    type: 'website',
    locale: 'en_IN',
  },
};

const MV_SETS = [
  { icon: '🏪', title: 'Market 1 — Period Bazaar', desc: 'A classic Indian bazaar with aged vendor stalls, period props, and moody practical lighting — the perfect Bollywood street song set.' },
  { icon: '🛒', title: 'Market 2 — Urban Market', desc: 'Contemporary urban market with neon signage and modern stalls. Ideal for hip-hop, R&B, and modern Bollywood numbers.' },
  { icon: '🏬', title: 'Market 7 — Large Scale', desc: 'Multi-lane market set for large cast, crowd sequences, and elaborate choreography. Multiple camera angles possible.' },
  { icon: '🏚️', title: 'Chawl New — Mumbai Soul', desc: 'Two-storey Mumbai chawl — the classic storytelling set for emotional, nostalgic, and dramatic music videos.' },
  { icon: '🚔', title: 'Police Station', desc: 'Intense, gritty aesthetics for crime-themed music videos. Interrogation room, lock-up cells, and inspector\'s office.' },
  { icon: '🌿', title: 'Open Ground (2+ Acres)', desc: 'Expansive outdoor space for performance-style shoots, car sequences, crowd extravaganzas, and aerial shots.' },
];

const MV_REASONS = [
  { icon: '🎬', title: 'Distinct Visual Locations', desc: 'Each set is an immersive environment — not a plain wall. Give your music video a production design that stands out on YouTube.' },
  { icon: '⏱️', title: 'Flexible Shoot Hours', desc: 'Need to shoot overnight? We\'re available 24/7 by appointment. Night shoots, golden hour simulations — we accommodate it all.' },
  { icon: '💡', title: 'Creative Lighting', desc: 'Our lighting team works with your director and DOP to match the visual treatment of every song. Moody, dramatic, neon — anything goes.' },
  { icon: '🎵', title: 'Audio Playback Setup', desc: 'In-studio audio playback systems for artist performance. Synced playback for lip-sync accuracy on every take.' },
  { icon: '🤝', title: 'Artist & Crew Comfort', desc: 'Green rooms, makeup stations, and craft services for your artist and crew. Your talent arrives fresh and leaves happy.' },
  { icon: '🚛', title: 'Equipment & Access', desc: 'Drive-in access for production trucks. Lighting and camera rigs can be moved in directly to the studio floor.' },
];

export default function MusicVideoShootLocationPage() {
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
            background: 'radial-gradient(ellipse at 40% 60%, rgba(168,85,247,0.06) 0%, transparent 60%)',
            pointerEvents: 'none',
          }} />
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
            <div className="section-tag">Mumbai's Best Music Video Locations</div>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 4.5vw, 3.8rem)',
              fontWeight: 800, color: 'var(--white)',
              margin: '1.2rem 0 1.2rem', lineHeight: 1.08,
              letterSpacing: '-0.025em',
            }}>
              Music Video Shoot{' '}
              <span style={{ color: 'var(--gold)' }}>Mumbai</span>
            </h1>
            <p style={{
              color: 'var(--gray)', fontSize: '1.05rem',
              lineHeight: 1.85, marginBottom: '2.5rem', maxWidth: '640px', margin: '0 auto 2.5rem',
            }}>
              Give your music video an unforgettable production design. Nine unique, fully-dressed sets for Bollywood, indie, and regional artists. Crowd scenes, dramatic interiors, urban streets, outdoor grounds — all in fully equipped production spaces.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/#booking" className="btn-primary">Book a Location →</a>
              <a
                href="https://wa.me/919876543210?text=Hi%2C%20I%20need%20a%20music%20video%20shoot%20location%20in%20Mumbai."
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

        {/* Sets showcase */}
        <section style={{ padding: '100px 5%', background: 'var(--dark2)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <span className="section-tag">Locations for Music Videos</span>
              <h2 style={{
                fontSize: 'clamp(1.75rem, 3.3vw, 2.5rem)',
                fontWeight: 700, color: 'var(--white)',
                margin: '1.2rem 0 1rem',
                letterSpacing: '-0.015em', lineHeight: 1.15,
              }}>
                Sets That Tell Your <span style={{ color: 'var(--gold)' }}>Song&apos;s Story</span>
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
                  <div style={{ fontSize: '2rem', marginBottom: '0.8rem' }}>{set.icon}</div>
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

        {/* Why choose */}
        <section style={{ padding: '100px 5%', background: 'var(--dark)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <span className="section-tag">Why Book With Us</span>
              <h2 style={{
                fontSize: 'clamp(1.75rem, 3.3vw, 2.5rem)',
                fontWeight: 700, color: 'var(--white)',
                margin: '1.2rem 0',
                letterSpacing: '-0.015em', lineHeight: 1.15,
              }}>
                Built for <span style={{ color: 'var(--gold)' }}>Music Video Productions</span>
              </h2>
            </div>
            <div className="seo-features-grid">
              {MV_REASONS.map((item, i) => (
                <div
                  key={item.title}
                  className={`reveal reveal-delay-${(i % 3) + 1} fac-card`}
                  style={{ background: 'var(--dark3)' }}
                >
                  <div style={{ fontSize: '1.8rem', marginBottom: '0.8rem' }}>{item.icon}</div>
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

        {/* CTA */}
        <section style={{ padding: '80px 5%', background: 'var(--dark2)', textAlign: 'center' }}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: 'clamp(1.75rem, 3.3vw, 2.5rem)',
              fontWeight: 700, color: 'var(--white)', marginBottom: '1rem',
              letterSpacing: '-0.015em', lineHeight: 1.15,
            }}>
              Book Your <span style={{ color: 'var(--gold)' }}>Music Video</span> Location
            </h2>
            <p style={{ color: 'var(--gray)', lineHeight: 1.8, marginBottom: '2rem' }}>
              Share your track, treatment brief, and preferred shoot dates. Our team will suggest the best sets and confirm availability within hours.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/#booking" className="btn-primary">Get a Quote →</a>
              <a
                href="https://wa.me/919876543210?text=Hi%2C%20I%20need%20to%20book%20a%20music%20video%20shoot%20location%20in%20Mumbai."
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
