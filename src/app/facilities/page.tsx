import type { Metadata } from 'next';
import FloatingButtons from '@/components/FloatingButtons';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import RevealProvider from '@/components/RevealProvider';
import { ArrowRightIcon, CheckIcon, SparkIcon } from '@/components/ui/icons';
import { loadFacilities } from '@/lib/sanity';

export const metadata: Metadata = {
  title: 'Studio Facilities | Cine Classic Studios Mumbai',
  description:
    'Explore the production facilities, operational support, and crew-ready infrastructure available at Cine Classic Studios in Mumbai.',
  alternates: { canonical: '/facilities' },
  openGraph: {
    title: 'Studio Facilities | Cine Classic Studios Mumbai',
    description: 'Production support and infrastructure designed for film, commercial, OTT, and photoshoot teams in Mumbai.',
  },
};

export const revalidate = 30;

const STATS = [
  { value: 'Shoot-Ready', label: 'Operational Setup' },
  { value: 'By Appointment', label: 'Visits & Recces' },
  { value: 'On-Site', label: 'Team Support' },
  { value: 'Mumbai', label: 'Production Access' },
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

          <div style={{ maxWidth: '920px', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
            <div className="section-tag">Facilities & Support</div>
            <h1 style={{ fontFamily: 'var(--font-playfair), serif', fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontWeight: 800, color: 'var(--white)', margin: '1.5rem 0 1.2rem', lineHeight: 1.1 }}>
              Production facilities built to <span style={{ color: 'var(--gold)' }}>keep shoot days moving</span>
            </h1>
            <p style={{ color: 'var(--gray)', fontSize: 'clamp(1rem, 1.5vw, 1.15rem)', lineHeight: 1.8, maxWidth: '700px', margin: '0 auto 2.5rem' }}>
              Beyond the sets themselves, Cine Classic Studios is designed to support planning, access, prep, crew flow, and the practical demands that shape a smoother production day.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/#booking" className="btn-primary">
                Request a Recce
                <ArrowRightIcon size={15} />
              </a>
              <a href="/studios" className="btn-outline">View Studio Sets</a>
            </div>
          </div>
        </section>

        <section style={{ background: 'var(--dark3)', borderTop: '1px solid rgba(212,175,55,0.1)', borderBottom: '1px solid rgba(212,175,55,0.1)', padding: '3rem 5%' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '2rem', textAlign: 'center' }}>
            {STATS.map((stat) => (
              <div key={stat.label}>
                <div style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '1.5rem', fontWeight: 800, color: 'var(--gold)', lineHeight: 1, marginBottom: '0.4rem' }}>{stat.value}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--gray)', letterSpacing: '0.05em' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ padding: '100px 5%', background: 'var(--dark2)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="reveal" style={{ textAlign: 'center', marginBottom: '5rem' }}>
              <span className="section-tag">What We Support</span>
              <h2 style={{ fontFamily: 'var(--font-playfair), serif', fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 700, color: 'var(--white)', margin: '1.2rem 0 1rem' }}>
                The practical support around <span style={{ color: 'var(--gold)' }}>every studio booking</span>
              </h2>
              <p style={{ color: 'var(--gray)', maxWidth: '620px', margin: '0 auto', lineHeight: 1.8 }}>
                This page covers the production support systems around the sets, so clients can understand how the studio works operationally before they lock dates.
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
                    <div style={{ width: '48px', height: '48px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.9rem', background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.16)', color: facility.accentColor ?? '#d4af37' }}>
                      {facility.icon ? <span style={{ fontSize: '1.2rem' }}>{facility.icon}</span> : <SparkIcon size={18} />}
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '1.15rem', fontWeight: 700, color: 'var(--white)', marginBottom: '1rem' }}>{facility.name}</h3>
                    {facility.shortDescription && <p style={{ fontSize: '0.88rem', color: 'var(--gray)', lineHeight: 1.7, marginBottom: '1rem' }}>{facility.shortDescription}</p>}
                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.2rem' }}>
                      {facility.features.map((feature) => (
                        <li key={feature} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', fontSize: '0.84rem', color: 'var(--gray)', lineHeight: 1.6, marginBottom: '0.5rem' }}>
                          <span style={{ color: facility.accentColor ?? '#d4af37', flexShrink: 0, marginTop: '2px' }}>
                            <CheckIcon size={13} />
                          </span>
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
            <div className="section-tag">Recce & Booking</div>
            <h2 style={{ fontFamily: 'var(--font-playfair), serif', fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 700, color: 'var(--white)', margin: '1.5rem 0 1.2rem' }}>
              Review the facility <span style={{ color: 'var(--gold)' }}>before you lock dates</span>
            </h2>
            <p style={{ color: 'var(--gray)', lineHeight: 1.8, marginBottom: '2.5rem' }}>
              Production teams are welcome to recce the studio, review operational details, and ask technical questions before confirming a booking.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/#booking" className="btn-primary">
                Request a Recce
                <ArrowRightIcon size={15} />
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}