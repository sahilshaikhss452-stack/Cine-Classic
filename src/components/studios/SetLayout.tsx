import Image from 'next/image';
import { loadSiteSettings } from '@/lib/sanity';
import type { SanityStudio } from '@/lib/sanity';

interface Props {
  studio: SanityStudio;
}

export default async function SetLayout({ studio }: Props) {
  if (!studio.setLayoutImage) {
    return null;
  }

  const settings = await loadSiteSettings();

  return (
    <section id="set-layout" style={{ padding: '80px 5%', background: 'var(--dark)', position: 'relative' }}>
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, var(--gold), transparent)',
          opacity: 0.15,
        }}
      />

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="reveal" style={{ marginBottom: '2.5rem' }}>
          <div className="section-tag">Floor Plan &amp; Zones</div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', lineHeight: 1.15 }}>
            Set <span style={{ color: 'var(--gold)' }}>layout</span>
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--gray)', marginTop: '0.65rem', maxWidth: '620px', lineHeight: 1.75 }}>
            A genuine spatial reference for production teams, art directors, and location scouts planning the shoot.
          </p>
        </div>

        <div className="set-layout-grid reveal reveal-delay-1">
          <figure
            style={{
              position: 'relative',
              aspectRatio: '16 / 9',
              borderRadius: '18px',
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'var(--dark2)',
              margin: 0,
            }}
          >
            <Image
              src={studio.setLayoutImage}
              alt={`${studio.title} set layout floor plan`}
              fill
              sizes="(max-width: 900px) 100vw, 72vw"
              style={{ objectFit: 'contain', padding: '10px' }}
            />
          </figure>

          <aside
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              padding: '1.4rem',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.07)',
              background: 'var(--dark2)',
            }}
          >
            <div>
              <div style={{ fontSize: '0.66rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.65rem' }}>
                Scout note
              </div>
              <p style={{ color: 'var(--gray-lt)', lineHeight: 1.75, fontSize: '0.9rem' }}>
                {studio.setLayoutDescription ??
                  'Use this plan as an initial reference, then confirm measurements, access, and shooting zones during your recce.'}
              </p>
            </div>

            <div style={{ display: 'grid', gap: '0.7rem', marginTop: 'auto' }}>
              <a
                href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
                  `Hi, I'd like to schedule a walkthrough of the ${studio.title} at Cine Classic Studios.`,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
                style={{ justifyContent: 'center' }}
              >
                WhatsApp for a recce
              </a>
              <a href="#booking" className="btn-primary" style={{ justifyContent: 'center' }}>
                Check availability
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
