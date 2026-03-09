/**
 * SetLayout  —  "Set Layout" section on every studio landing page.
 *
 * Gives production teams, art directors, and location managers a quick
 * visual overview of the set's physical layout.
 *
 * Content (managed via Sanity CMS or src/data/sets.ts):
 *   studio.setLayoutImage        → floor plan / annotated layout photo
 *   studio.setLayoutDescription  → short description of zones / angles
 *
 * If neither field is set, a tasteful illustrated placeholder is shown so
 * the section always renders consistently on every set page.
 *
 * The component is a standard server component (no 'use client' needed).
 */

import Image from 'next/image';
import type { StudioSet } from '@/data/sets';

interface Props {
  studio: StudioSet;
}

/* ── Fallback zone labels when the set has no custom layoutZones ── */
const DEFAULT_ZONES = [
  { label: 'Main Shooting Zone', x: '18%', y: '30%' },
  { label: 'Lighting Rig Area',  x: '65%', y: '18%' },
  { label: 'Crew / Catering',    x: '72%', y: '68%' },
  { label: 'Equipment Bay',      x: '18%', y: '70%' },
];

export default function SetLayout({ studio }: Props) {
  const hasImage       = !!studio.setLayoutImage;
  const hasDescription = !!studio.setLayoutDescription;

  return (
    <section
      id="set-layout"
      style={{
        padding: '80px 5%',
        background: 'var(--dark)',
        position: 'relative',
      }}
    >
      {/* Gold rule top */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, var(--gold), transparent)',
        opacity: 0.15,
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Section header */}
        <div className="reveal" style={{ marginBottom: '3rem' }}>
          <div className="section-tag">Floor Plan &amp; Zones</div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', lineHeight: 1.15 }}>
            Set{' '}
            <span style={{ color: 'var(--gold)' }}>Layout</span>
          </h2>
          <p style={{
            fontSize: '0.95rem',
            color: 'var(--gray)',
            fontWeight: 300,
            marginTop: '0.5rem',
            maxWidth: '540px',
          }}>
            Spatial reference for production teams, art directors, and location scouts.
          </p>
        </div>

        {/* Main layout grid */}
        <div
          className="reveal reveal-delay-1"
          style={{
            display: 'grid',
            gridTemplateColumns: hasDescription ? '1fr 340px' : '1fr',
            gap: '2.5rem',
            alignItems: 'start',
          }}
        >

          {/* ── Layout image / floor plan ───────────────────────────────────── */}
          <div style={{
            position: 'relative',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.07)',
            background: 'var(--dark2)',
          }}>
            {hasImage ? (
              /* Real floor plan uploaded via CMS */
              <div style={{ position: 'relative', aspectRatio: '16/9' }}>
                <Image
                  src={studio.setLayoutImage!}
                  alt={`${studio.name} set layout floor plan`}
                  fill
                  sizes="(max-width: 768px) 100vw, 70vw"
                  style={{ objectFit: 'contain', padding: '8px' }}
                  priority={false}
                />
              </div>
            ) : (
              /* Illustrated placeholder */
              <PlaceholderDiagram studio={studio} />
            )}

            {/* "Floor Plan" chip — bottom-left of image card */}
            <div style={{
              position: 'absolute',
              bottom: '14px',
              left: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px 12px',
              background: 'rgba(0,0,0,0.6)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              borderRadius: '100px',
              border: '1px solid rgba(255,255,255,0.1)',
            }}>
              {/* Blueprint icon */}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 9h18M9 3v18" />
              </svg>
              <span style={{
                fontSize: '0.65rem',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--gray-lt)',
              }}>
                {hasImage ? 'Floor Plan' : 'Reference Diagram'}
              </span>
            </div>
          </div>

          {/* ── Description + zone list ─────────────────────────────────────── */}
          {hasDescription && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

              {/* Description */}
              <div style={{
                background: 'var(--dark2)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '12px',
                padding: '1.5rem',
              }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  marginBottom: '0.875rem',
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4M12 8h.01" />
                  </svg>
                  <span style={{
                    fontSize: '0.68rem', fontWeight: 600,
                    letterSpacing: '0.14em', textTransform: 'uppercase',
                    color: 'var(--gold)',
                  }}>
                    Layout Notes
                  </span>
                </div>
                <p style={{
                  fontSize: '0.9rem',
                  color: 'var(--gray-lt)',
                  fontWeight: 300,
                  lineHeight: 1.8,
                }}>
                  {studio.setLayoutDescription}
                </p>
              </div>

              {/* Key details quick-reference */}
              <div style={{
                background: 'var(--dark2)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '12px',
                overflow: 'hidden',
              }}>
                <div style={{
                  padding: '12px 18px',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  fontSize: '0.65rem', fontWeight: 600,
                  letterSpacing: '0.14em', textTransform: 'uppercase',
                  color: 'var(--gold)',
                }}>
                  Quick Reference
                </div>
                {[
                  { icon: '📐', label: 'Floor Area',     value: studio.size },
                  { icon: '↕️', label: 'Ceiling Height', value: studio.ceilingHeight },
                  { icon: '👥', label: 'Max Crew',       value: studio.capacity },
                  { icon: '💡', label: 'Rate From',      value: `${studio.rateFrom}${studio.rateUnit}` },
                ].map((row, i, arr) => (
                  <div
                    key={row.label}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.875rem',
                      padding: '12px 18px',
                      borderBottom: i < arr.length - 1
                        ? '1px solid rgba(255,255,255,0.04)'
                        : undefined,
                    }}
                  >
                    <span style={{ fontSize: '1rem', lineHeight: 1 }}>{row.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: '0.6rem', letterSpacing: '0.12em',
                        textTransform: 'uppercase', color: 'var(--gray)', fontWeight: 600,
                      }}>
                        {row.label}
                      </div>
                      <div style={{ fontSize: '0.88rem', color: 'var(--white)', fontWeight: 500 }}>
                        {row.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* ── Minimal CTA bar below ─────────────────────────────────────────── */}
        <div
          className="reveal reveal-delay-2"
          style={{
            marginTop: '2.5rem',
            padding: '1.25rem 1.75rem',
            background: 'var(--dark2)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div>
            <div style={{
              fontSize: '0.68rem', fontWeight: 600,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              color: 'var(--gold)', marginBottom: '3px',
            }}>
              Need a site visit?
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--gray-lt)', fontWeight: 300 }}>
              Schedule a walkthrough and we'll show you every zone in person.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a
              href={`https://wa.me/919876543210?text=${encodeURIComponent(
                `Hi, I'd like to schedule a walkthrough of the ${studio.name} at Cine Classic Studios.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '9px 20px',
                background: 'rgba(37,211,102,0.1)',
                border: '1px solid rgba(37,211,102,0.3)',
                borderRadius: '100px',
                color: '#4ade80',
                fontSize: '0.8rem', fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.3s',
                whiteSpace: 'nowrap',
              }}
            >
              💬 WhatsApp
            </a>
            <a
              href="#booking"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '9px 20px',
                background: 'var(--gold)',
                border: 'none',
                borderRadius: '100px',
                color: 'var(--dark)',
                fontSize: '0.8rem', fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.3s',
                whiteSpace: 'nowrap',
              }}
            >
              Book This Set →
            </a>
          </div>
        </div>

      </div>

      {/* Responsive grid fix */}
      <style>{`
        @media (max-width: 900px) {
          #set-layout [style*="340px"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ── Placeholder diagram (rendered when no layout image is uploaded) ────────── */
function PlaceholderDiagram({ studio }: { studio: StudioSet }) {
  const zones = studio.layoutZones ?? DEFAULT_ZONES;
  return (
    <div style={{
      aspectRatio: '16/9',
      background: `linear-gradient(135deg, var(--dark3) 0%, var(--dark2) 100%)`,
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    }}>
      {/* Dashed grid overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(212,175,55,0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(212,175,55,0.05) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
      }} />

      {/* Center "room" rectangle */}
      <div style={{
        position: 'relative',
        width: '72%',
        height: '72%',
        border: `2px dashed rgba(212,175,55,0.25)`,
        borderRadius: '6px',
      }}>
        {/* Camera position markers */}
        {[
          { x: '50%', y: '-18px', label: 'North Wall' },
          { x: '-18px', y: '50%', label: 'West Wall' },
        ].map((m) => (
          <div key={m.label} style={{
            position: 'absolute',
            left: m.x, top: m.y,
            transform: 'translate(-50%,-50%)',
            fontSize: '0.5rem',
            color: 'rgba(212,175,55,0.45)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
          }}>
            {m.label}
          </div>
        ))}

        {/* Zone dots */}
        {zones.map((zone) => (
          <div key={zone.label} style={{
            position: 'absolute',
            left: zone.x,
            top: zone.y,
            transform: 'translate(-50%,-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
          }}>
            <div style={{
              width: '8px', height: '8px',
              borderRadius: '50%',
              background: 'var(--gold)',
              opacity: 0.6,
              boxShadow: '0 0 8px rgba(212,175,55,0.5)',
            }} />
            <div style={{
              fontSize: '0.52rem',
              color: 'rgba(255,255,255,0.4)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              textAlign: 'center',
              whiteSpace: 'nowrap',
              fontWeight: 600,
            }}>
              {zone.label}
            </div>
          </div>
        ))}

        {/* Center icon + label */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: '6px',
        }}>
          <span style={{ fontSize: '2.5rem', opacity: 0.15 }}>{studio.icon}</span>
          <span style={{
            fontSize: '0.65rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.18)',
            fontWeight: 600,
          }}>
            {studio.name}
          </span>
        </div>
      </div>

      {/* Upload hint */}
      <div style={{
        position: 'absolute',
        bottom: '14px',
        right: '14px',
        fontSize: '0.6rem',
        color: 'rgba(255,255,255,0.2)',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        fontStyle: 'italic',
      }}>
        Upload floor plan via Sanity CMS
      </div>
    </div>
  );
}
