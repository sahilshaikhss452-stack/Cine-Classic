import type { Metadata } from 'next';
import Navbar  from '@/components/Navbar';
import Footer  from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';
import RevealProvider  from '@/components/RevealProvider';

export const metadata: Metadata = {
  title: 'Studio Facilities – Professional Infrastructure',
  description:
    'Cine Classic Studios offers professional-grade infrastructure: overhead LED lighting rigs, 200A 3-phase power, makeup rooms, soundproofed walls, production truck parking, green rooms, and on-site technical crew. Mumbai film studio.',
  alternates: { canonical: '/facilities' },
  openGraph: {
    title: 'Studio Facilities – Cine Classic Studios Mumbai',
    description:
      'Professional-grade studio infrastructure for film and commercial productions in Mumbai.',
  },
};

const FACILITIES = [
  {
    icon: '💡',
    title: 'Professional Lighting Rigs',
    accent: '#d4af37',
    gradient: 'linear-gradient(135deg, #1a1200 0%, #2d2000 100%)',
    features: [
      'Full overhead LED grid (dimmable 0–100%)',
      'Fresnels, HMIs, and LED panels on standby',
      'Practical fixtures included with sets',
      'Rigging team available for custom configurations',
      'Colour temperature range: 2700K – 6500K',
      'DMX control board for instant recall',
    ],
    note: 'All lighting is calibrated to cinema-grade colour accuracy (CRI 95+).',
  },
  {
    icon: '⚡',
    title: 'Power Infrastructure',
    accent: '#4a80f0',
    gradient: 'linear-gradient(135deg, #00051a 0%, #000d2d 100%)',
    features: [
      '200A, 3-phase power supply per main floor',
      'Generator hookup points for backup power',
      'Dedicated circuits for camera & lighting',
      'Electrician on-site for all shoots',
      'Industrial UPS for critical equipment',
      'EV charging points for electric vehicles',
    ],
    note: 'Zero voltage drops guaranteed. Ideal for high-power cinema camera rigs.',
  },
  {
    icon: '💄',
    title: 'Makeup & Vanity Rooms',
    accent: '#ff6db0',
    gradient: 'linear-gradient(135deg, #1a0010 0%, #2d0020 100%)',
    features: [
      '4 dedicated vanity stations per studio',
      'Hollywood-style mirror lighting',
      'Full-length mirrors for costume checks',
      'Adjacent wardrobe & costume racks',
      'Air-conditioned comfort environment',
      'Private cast holding area adjacent',
    ],
    note: 'Prep rooms are accessible 2 hours before call time at no extra charge.',
  },
  {
    icon: '🔇',
    title: 'Sound & Acoustic Control',
    accent: '#a855f7',
    gradient: 'linear-gradient(135deg, #0a0010 0%, #180020 100%)',
    features: [
      'Acoustic panels on all major sound stages',
      'STC-rated walls for location dialogue recording',
      'Rubber-mounted flooring for vibration damping',
      'External noise barrier construction',
      'Silent HVAC systems during shoot hours',
      'On-site sound engineer available on request',
    ],
    note: 'Suitable for production dialogue recording. No ADR surprises in post.',
  },
  {
    icon: '🚛',
    title: 'Vehicle & Truck Access',
    accent: '#00c97a',
    gradient: 'linear-gradient(135deg, #001a10 0%, #002d1c 100%)',
    features: [
      '5.2m clearance gate for production trucks',
      '40-tonne load-rated service road',
      'Direct drive-in to studio floor',
      '60+ vehicle parking for crew & cast',
      'Separate cast & crew parking zones',
      '24-hour security and entry management',
    ],
    note: 'Production trucks can be parked overnight adjacent to the studio floor.',
  },
  {
    icon: '🏗️',
    title: 'Set Construction Support',
    accent: '#c8501e',
    gradient: 'linear-gradient(135deg, #1a0800 0%, #2d1200 100%)',
    features: [
      'In-house art department on request',
      'Custom set construction available',
      'Pre-built modular set elements in inventory',
      'Prop sourcing and dressing assistance',
      '24-hour pre-rig access before shoot day',
      'Set teardown and restoration service',
    ],
    note: 'Bring your own art department or use ours — fully flexible.',
  },
  {
    icon: '🖥️',
    title: 'Production & Tech Support',
    accent: '#64b4dc',
    gradient: 'linear-gradient(135deg, #00050a 0%, #000d18 100%)',
    features: [
      'On-site studio manager throughout shoot',
      '1 Gbps dedicated fibre internet',
      'Monitor village setup on request',
      'Video village with craft services area',
      'Walkie-talkie floor communication system',
      'Daily technical handover briefing',
    ],
    note: 'Our studio managers are experienced with film, OTT, and TVC workflows.',
  },
  {
    icon: '🍱',
    title: 'Crew Welfare & Amenities',
    accent: '#d4af37',
    gradient: 'linear-gradient(135deg, #100a00 0%, #2a1800 100%)',
    features: [
      'Large air-conditioned green rooms',
      'Dedicated craft services & catering area',
      'Male & female restroom blocks',
      'Dedicated prayer room',
      'First aid station with trained staff',
      'Security lockers for personal belongings',
    ],
    note: 'We take crew welfare seriously. Happy crews make better films.',
  },
  {
    icon: '📦',
    title: 'Equipment Storage',
    accent: '#3c8c50',
    gradient: 'linear-gradient(135deg, #030a05 0%, #081405 100%)',
    features: [
      'Bonded equipment storage room',
      'Camera department lockable cages',
      'Cold storage for time-sensitive props',
      'Equipment sign-in / sign-out log',
      'CCTV-monitored storage overnight',
      'Daily equipment condition reports',
    ],
    note: 'Leave your equipment overnight between shoot days — secured and insured.',
  },
];

const STATS = [
  { value: '200A', label: 'Power Per Stage', icon: '⚡' },
  { value: '60+', label: 'Parking Spaces', icon: '🅿️' },
  { value: '5.2m', label: 'Truck Clearance', icon: '🚛' },
  { value: '24/7', label: 'Security Coverage', icon: '🔒' },
  { value: 'CRI 95+', label: 'Lighting Quality', icon: '💡' },
  { value: '1 Gbps', label: 'Internet Speed', icon: '🌐' },
];

export default function FacilitiesPage() {
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
          {/* Background gradient */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
            <div className="section-tag">Infrastructure</div>
            <h1 style={{
              fontFamily: 'var(--font-playfair), serif',
              fontSize: 'clamp(2.4rem, 5vw, 4rem)',
              fontWeight: 800,
              color: 'var(--white)',
              margin: '1.5rem 0 1.2rem',
              lineHeight: 1.1,
            }}>
              World-Class Studio{' '}
              <span style={{ color: 'var(--gold)' }}>Facilities</span>
            </h1>
            <p style={{
              color: 'var(--gray)',
              fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
              lineHeight: 1.8,
              maxWidth: '660px',
              margin: '0 auto 2.5rem',
            }}>
              Built to the specifications of working film professionals. Every facility at Cine Classic Studios is designed to eliminate production downtime and maximise creative output.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="#booking" className="btn-primary">Book a Studio Tour →</a>
              <a href="/" className="btn-outline">View All Studios</a>
            </div>
          </div>
        </section>

        {/* Stats Strip */}
        <section style={{
          background: 'var(--dark3)',
          borderTop: '1px solid rgba(212,175,55,0.1)',
          borderBottom: '1px solid rgba(212,175,55,0.1)',
          padding: '3rem 5%',
        }}>
          <div style={{
            maxWidth: '1200px', margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '2rem',
            textAlign: 'center',
          }}>
            {STATS.map(stat => (
              <div key={stat.label}>
                <div style={{ fontSize: '1.6rem', marginBottom: '0.4rem' }}>{stat.icon}</div>
                <div style={{
                  fontFamily: 'var(--font-playfair), serif',
                  fontSize: '1.8rem', fontWeight: 800,
                  color: 'var(--gold)', lineHeight: 1,
                  marginBottom: '0.4rem',
                }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--gray)', letterSpacing: '0.05em' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Facilities Grid */}
        <section style={{ padding: '100px 5%', background: 'var(--dark2)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

            <div className="reveal" style={{ textAlign: 'center', marginBottom: '5rem' }}>
              <span className="section-tag">What We Offer</span>
              <h2 style={{
                fontFamily: 'var(--font-playfair), serif',
                fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                fontWeight: 700, color: 'var(--white)',
                margin: '1.2rem 0 1rem',
              }}>
                Everything Your Production <span style={{ color: 'var(--gold)' }}>Needs</span>
              </h2>
              <p style={{ color: 'var(--gray)', maxWidth: '540px', margin: '0 auto', lineHeight: 1.8 }}>
                From power supply to parking — every element of our facility is engineered to support professional film and commercial production.
              </p>
            </div>

            <div className="fac-grid">
              {FACILITIES.map((fac, i) => (
                <div
                  key={fac.title}
                  className={`reveal reveal-delay-${(i % 3) + 1} fac-card`}
                  style={{ background: fac.gradient }}
                >
                  {/* Top accent */}
                  <div style={{
                    height: '2px',
                    background: `linear-gradient(90deg, ${fac.accent}, transparent)`,
                    marginBottom: '1.8rem',
                    opacity: 0.7,
                  }} />

                  {/* Icon + Title */}
                  <div style={{ fontSize: '2rem', marginBottom: '0.8rem' }}>{fac.icon}</div>
                  <h3 style={{
                    fontFamily: 'var(--font-playfair), serif',
                    fontSize: '1.15rem', fontWeight: 700,
                    color: 'var(--white)', marginBottom: '1.2rem',
                  }}>
                    {fac.title}
                  </h3>

                  {/* Feature list */}
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.2rem' }}>
                    {fac.features.map((feat, fi) => (
                      <li key={fi} style={{
                        display: 'flex', gap: '0.6rem', alignItems: 'flex-start',
                        fontSize: '0.84rem', color: 'var(--gray)',
                        lineHeight: 1.6, marginBottom: '0.5rem',
                      }}>
                        <span style={{ color: fac.accent, flexShrink: 0, marginTop: '2px' }}>✦</span>
                        {feat}
                      </li>
                    ))}
                  </ul>

                  {/* Note */}
                  <div style={{
                    padding: '0.75rem 1rem',
                    background: `${fac.accent}10`,
                    border: `1px solid ${fac.accent}25`,
                    borderRadius: '6px',
                    fontSize: '0.78rem',
                    color: fac.accent,
                    lineHeight: 1.6,
                    fontStyle: 'italic',
                  }}>
                    {fac.note}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section style={{
          padding: '100px 5%',
          background: 'var(--dark)',
          textAlign: 'center',
        }}>
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <div className="section-tag">Book Your Shoot</div>
            <h2 style={{
              fontFamily: 'var(--font-playfair), serif',
              fontSize: 'clamp(2rem, 3.5vw, 3rem)',
              fontWeight: 700, color: 'var(--white)',
              margin: '1.5rem 0 1.2rem',
            }}>
              Tour the Facility <span style={{ color: 'var(--gold)' }}>Before You Book</span>
            </h2>
            <p style={{ color: 'var(--gray)', lineHeight: 1.8, marginBottom: '2.5rem' }}>
              We invite all production teams to visit the studio before confirming their booking. Our team will walk you through every facility, answer technical questions, and help you choose the right setup for your production.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/#booking" className="btn-primary">Request a Studio Tour →</a>
              <a
                href="https://wa.me/919876543210?text=Hi%2C%20I%27d%20like%20to%20schedule%20a%20facilities%20tour%20at%20Cine%20Classic%20Studios."
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                  padding: '15px 30px',
                  background: '#25D366', color: '#fff',
                  borderRadius: '100px', fontSize: '0.82rem', fontWeight: 600,
                  textDecoration: 'none', letterSpacing: '0.06em',
                  transition: 'all 0.35s ease',
                }}
              >
                💬 WhatsApp for Tour
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
