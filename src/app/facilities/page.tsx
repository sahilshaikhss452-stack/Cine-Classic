import type { Metadata } from 'next';
import FloatingButtons from '@/components/FloatingButtons';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import RevealProvider from '@/components/RevealProvider';
import { loadFacilities } from '@/lib/sanity';

export const metadata: Metadata = {
  title: 'Studio Facilities – Professional Infrastructure',
  description:
    'Cine Classic Studios offers professional-grade infrastructure: power, lighting, support spaces, and operational amenities for film and commercial productions.',
  alternates: { canonical: '/facilities' },
  openGraph: {
    title: 'Studio Facilities – Cine Classic Studios Mumbai',
    description: 'Professional-grade studio infrastructure for film and commercial productions in Mumbai.',
  },
};

export const revalidate = 30;

const STATS = [
  { value: '200A', label: 'Power Ready' },
  { value: '24/7', label: 'Operational Support' },
  { value: 'Large', label: 'Truck Access' },
  { value: 'Fast', label: 'Crew Turnaround' },
];

export default async function FacilitiesPage() {
  const facilities = await loadFacilities();

  return (
    <>
      <RevealProvider />
      <FloatingButtons />
      <Navbar />

      <main>
        <section style={{ padding: '160px 5% 100px', background: 'var(--dark)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
            <div className="section-tag">Infrastructure</div>
            <h1 style={{ fontFamily: 'var(--font-playfair), serif', fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontWeight: 800, color: 'var(--white)', margin: '1.5rem 0 1.2rem', lineHeight: 1.1 }}>
              World-Class Studio <span style={{ color: 'var(--gold)' }}>Facilities</span>
            </h1>
            <p style={{ color: 'var(--gray)', fontSize: 'clamp(1rem, 1.5vw, 1.15rem)', lineHeight: 1.8, maxWidth: '660px', margin: '0 auto 2.5rem' }}>
              Built to the expectations of working film professionals. Every facility at Cine Classic Studios is designed to reduce production friction and support faster shoot days.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/#booking" className="btn-primary">Book a Studio Tour ?</a>
              <a href="/studios" className="btn-outline">View All Studios</a>
            </div>
          </div>
        </section>

        <section style={{ background: 'var(--dark3)', borderTop: '1px solid rgba(212,175,55,0.1)', borderBottom: '1px solid rgba(212,175,55,0.1)', padding: '3rem 5%' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '2rem', textAlign: 'center' }}>
            {STATS.map((stat) => (
              <div key={stat.label}>
                <div style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '1.8rem', fontWeight: 800, color: 'var(--gold)', lineHeight: 1, marginBottom: '0.4rem' }}>{stat.value}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--gray)', letterSpacing: '0.05em' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ padding: '100px 5%', background: 'var(--dark2)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="reveal" style={{ textAlign: 'center', marginBottom: '5rem' }}>
              <span className="section-tag">What We Offer</span>
              <h2 style={{ fontFamily: 'var(--font-playfair), serif', fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 700, color: 'var(--white)', margin: '1.2rem 0 1rem' }}>
                Everything Your Production <span style={{ color: 'var(--gold)' }}>Needs</span>
              </h2>
              <p style={{ color: 'var(--gray)', maxWidth: '540px', margin: '0 auto', lineHeight: 1.8 }}>
                From lighting and power to crew support and logistics, these facilities are managed from the CMS so the team can keep the website aligned with real operations.
              </p>
            </div>

            {facilities.length === 0 ? (
              <div style={{ maxWidth: '760px', margin: '0 auto', padding: '1rem 1.25rem', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '14px', background: 'rgba(212,175,55,0.08)', color: 'var(--white)', lineHeight: 1.7, textAlign: 'center' }}>
                Publish facility documents in Sanity to populate this page.
              </div>
            ) : (
              <div className="fac-grid">
                {facilities.map((facility, index) => (
                  <div key={facility._id} className={`reveal reveal-delay-${(index % 3) + 1} fac-card`} style={{ background: facility.gradient ?? 'var(--dark3)' }}>
                    <div style={{ height: '2px', background: `linear-gradient(90deg, ${facility.accentColor ?? '#d4af37'}, transparent)`, marginBottom: '1.8rem', opacity: 0.7 }} />
                    <div style={{ fontSize: '2rem', marginBottom: '0.8rem' }}>{facility.icon ?? '??'}</div>
                    <h3 style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '1.15rem', fontWeight: 700, color: 'var(--white)', marginBottom: '1rem' }}>{facility.name}</h3>
                    {facility.shortDescription && <p style={{ fontSize: '0.88rem', color: 'var(--gray)', lineHeight: 1.7, marginBottom: '1rem' }}>{facility.shortDescription}</p>}
                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.2rem' }}>
                      {facility.features.map((feature) => (
                        <li key={feature} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', fontSize: '0.84rem', color: 'var(--gray)', lineHeight: 1.6, marginBottom: '0.5rem' }}>
                          <span style={{ color: facility.accentColor ?? '#d4af37', flexShrink: 0, marginTop: '2px' }}>?</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    {facility.note && (
                      <div style={{ padding: '0.75rem 1rem', background: `${facility.accentColor ?? '#d4af37'}10`, border: `1px solid ${(facility.accentColor ?? '#d4af37')}25`, borderRadius: '6px', fontSize: '0.78rem', color: facility.accentColor ?? '#d4af37', lineHeight: 1.6, fontStyle: 'italic' }}>
                        {facility.note}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <section style={{ padding: '100px 5%', background: 'var(--dark)', textAlign: 'center' }}>
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <div className="section-tag">Book Your Shoot</div>
            <h2 style={{ fontFamily: 'var(--font-playfair), serif', fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 700, color: 'var(--white)', margin: '1.5rem 0 1.2rem' }}>
              Tour the Facility <span style={{ color: 'var(--gold)' }}>Before You Book</span>
            </h2>
            <p style={{ color: 'var(--gray)', lineHeight: 1.8, marginBottom: '2.5rem' }}>
              We invite production teams to visit the studio before confirming their booking. Our team will walk you through the spaces, answer technical questions, and help you choose the right setup.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/#booking" className="btn-primary">Request a Studio Tour ?</a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
