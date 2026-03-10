/**
 * StudioDetails — Production-spec information section.
 *
 * Design philosophy (Apple spec-page tier):
 *  - "At a Glance" horizontal icon-spec strip — answers key questions at a scan
 *  - Two-column layout: About + Suitable-For left | Facilities right
 *  - Inline booking prompt below facilities — closes the loop without scrolling
 *  - Rate highlighted in gold throughout — never hidden, always visible
 *  - Horizontal scrollable use-case cards — scannable on mobile
 *  - SVG icons (not emoji) for premium feel
 */

import { loadSiteSettings } from '@/lib/sanity';
import type { SanityStudio } from '@/lib/sanity';
import { fmtSize, fmtHeight, fmtRate, fmtRateUnit, fmtMinBooking } from '@/lib/studio-utils';

interface Props {
  studio: SanityStudio;
}

/* ── SVG spec icons ─────────────────────────────────────────────────────────── */
function IconArea() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3h6M3 3v6M21 3h-6M21 3v6M3 21h6M3 21v-6M21 21h-6M21 21v-6" />
    </svg>
  );
}
function IconHeight() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="2" x2="12" y2="22" />
      <polyline points="5 8 12 2 19 8" />
      <polyline points="5 16 12 22 19 16" />
    </svg>
  );
}
function IconCrew() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
function IconRate() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}
function IconParking() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
    </svg>
  );
}
function IconPower() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}
function IconClock() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

/* ── Use-case card colours (cycles) ──────────────────────────────────────────── */
const USE_CASE_ACCENTS = [
  'rgba(212,175,55,0.09)',
  'rgba(100,160,220,0.08)',
  'rgba(160,100,220,0.08)',
  'rgba(60,180,100,0.08)',
  'rgba(220,100,60,0.08)',
  'rgba(220,60,130,0.08)',
];
const USE_CASE_BORDERS = [
  'rgba(212,175,55,0.18)',
  'rgba(100,160,220,0.16)',
  'rgba(160,100,220,0.16)',
  'rgba(60,180,100,0.16)',
  'rgba(220,100,60,0.16)',
  'rgba(220,60,130,0.16)',
];

/* ── Main component ──────────────────────────────────────────────────────────── */
export default async function StudioDetails({ studio }: Props) {
  const settings = await loadSiteSettings();
  const rateFrom = fmtRate(studio.rateHourly, studio.ratePerDay);
  const rateUnit = fmtRateUnit(studio.rateUnit, studio.rateHourly);
  const minBooking = fmtMinBooking(studio.minBookingHours);

  /* Build the spec strip — only include cards for fields that exist */
  const specItems = [
    { icon: <IconArea />, label: 'Floor Area', value: fmtSize(studio.size), gold: false },
    { icon: <IconHeight />, label: 'Ceiling Height', value: fmtHeight(studio.height), gold: false },
    { icon: <IconCrew />, label: 'Max Crew', value: studio.capacity ?? '—', gold: false },
    { icon: <IconRate />, label: 'Rate From', value: `${rateFrom}${rateUnit}`, gold: true },
    ...(studio.parking ? [{ icon: <IconParking />, label: 'Parking', value: studio.parking, gold: false }] : []),
    ...(studio.powerCapacity ? [{ icon: <IconPower />, label: 'Power', value: studio.powerCapacity, gold: false }] : []),
    ...(minBooking ? [{ icon: <IconClock />, label: 'Min Booking', value: minBooking, gold: false }] : []),
  ];

  return (
    <section
      id="details"
      style={{
        padding: '0',
        background: 'var(--dark2)',
        position: 'relative',
      }}
    >
      {/* Gold rule top */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, var(--gold), transparent)',
        opacity: 0.12,
      }} />

      {/* ── AT A GLANCE — spec icon strip ─────────────────────────────────────── */}
      <div
        className="spec-strip-outer"
        style={{
          background: 'var(--dark3)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          padding: '0 5%',
        }}
      >
        <div
          className="spec-strip"
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            gap: '0',
          }}
        >
          {specItems.map((spec, i, arr) => (
            <div
              key={spec.label}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', gap: '8px',
                padding: '24px 28px',
                flexShrink: 0,
                borderRight: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                transition: 'background 0.3s',
                cursor: 'default',
                minWidth: '110px',
                textAlign: 'center',
              }}
            >
              <div style={{ color: spec.gold ? 'var(--gold)' : 'var(--gray)', opacity: spec.gold ? 1 : 0.7 }}>
                {spec.icon}
              </div>
              <div style={{
                fontFamily: 'var(--font-playfair), serif',
                fontSize: '1rem', fontWeight: 700,
                color: spec.gold ? 'var(--gold)' : 'var(--white)',
                letterSpacing: '-0.01em', lineHeight: 1,
                whiteSpace: 'nowrap',
              }}>
                {spec.value}
              </div>
              <div style={{
                fontSize: '0.56rem', fontWeight: 600,
                letterSpacing: '0.14em', textTransform: 'uppercase',
                color: spec.gold ? 'rgba(212,175,55,0.6)' : 'var(--gray)',
                whiteSpace: 'nowrap',
              }}>
                {spec.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── MAIN CONTENT ──────────────────────────────────────────────────────── */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '72px 5%' }}>

        {/* Section label */}
        <div className="reveal" style={{ marginBottom: '3rem' }}>
          <div className="section-tag">Studio Details</div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
            Everything You{' '}
            <span style={{ color: 'var(--gold)' }}>Need to Know</span>
          </h2>
        </div>

        {/* Two-column grid */}
        <div
          className="details-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 380px',
            gap: '3.5rem',
            alignItems: 'start',
          }}
        >

          {/* ── LEFT: About + Suitable For + Filmed Here ──────────────────────── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>

            {/* About */}
            <div className="reveal">
              <div style={{
                display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem',
              }}>
                <div style={{
                  width: '3px', height: '18px',
                  background: 'var(--gold)', borderRadius: '2px', flexShrink: 0,
                }} />
                <h3 style={{
                  fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.14em',
                  textTransform: 'uppercase', color: 'var(--gold)', margin: 0,
                }}>
                  About This Set
                </h3>
              </div>
              <p style={{
                fontSize: '0.97rem', color: 'var(--gray-lt)',
                fontWeight: 300, lineHeight: 1.9,
              }}>
                {studio.description ?? ''}
              </p>
            </div>

            {/* Suitable For — horizontal scrollable use-case cards */}
            <div className="reveal reveal-delay-1">
              <div style={{
                display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem',
              }}>
                <div style={{ width: '3px', height: '18px', background: 'var(--gold)', borderRadius: '2px', flexShrink: 0 }} />
                <h3 style={{
                  fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.14em',
                  textTransform: 'uppercase', color: 'var(--gold)', margin: 0,
                }}>
                  Suitable For
                </h3>
              </div>
              <div
                className="use-case-scroll"
                style={{
                  display: 'flex', gap: '0.625rem',
                  overflowX: 'auto', scrollbarWidth: 'none',
                  paddingBottom: '4px',
                  flexWrap: 'wrap',
                }}
              >
                {studio.suitableFor.map((use, i) => (
                  <div
                    key={use}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '8px',
                      padding: '9px 16px',
                      background: USE_CASE_ACCENTS[i % USE_CASE_ACCENTS.length],
                      border: `1px solid ${USE_CASE_BORDERS[i % USE_CASE_BORDERS.length]}`,
                      borderRadius: '8px',
                      flexShrink: 0,
                    }}
                  >
                    <span style={{
                      fontFamily: 'var(--font-playfair), serif',
                      fontSize: '0.75rem', fontWeight: 700,
                      color: 'var(--gold)', opacity: 0.5, minWidth: '16px',
                    }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--white)', fontWeight: 400, whiteSpace: 'nowrap' }}>
                      {use}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Filmed Here — productions social proof */}
            {studio.productions && studio.productions.length > 0 && (
              <div className="reveal reveal-delay-2">
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem',
                }}>
                  <div style={{ width: '3px', height: '18px', background: 'var(--gold)', borderRadius: '2px', flexShrink: 0 }} />
                  <h3 style={{
                    fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.14em',
                    textTransform: 'uppercase', color: 'var(--gold)', margin: 0,
                  }}>
                    Filmed Here
                  </h3>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {studio.productions.map((prod) => (
                    <span key={prod} style={{
                      display: 'flex', alignItems: 'center', gap: '6px',
                      fontSize: '0.8rem', color: 'var(--gray-lt)',
                      background: 'var(--dark3)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      borderRadius: '100px', padding: '5px 14px',
                    }}>
                      <span style={{ width: '5px', height: '5px', background: 'var(--gold)', borderRadius: '50%', opacity: 0.5, flexShrink: 0 }} />
                      {prod}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── RIGHT: Facilities + Booking prompt ────────────────────────────── */}
          <div className="reveal reveal-delay-1" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {/* Facilities */}
            <div style={{
              background: 'var(--dark3)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '16px',
              overflow: 'hidden',
            }}>
              {/* Header */}
              <div style={{
                padding: '14px 20px',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                display: 'flex', alignItems: 'center', gap: '8px',
              }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                  stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span style={{
                  fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.16em',
                  textTransform: 'uppercase', color: 'var(--gold)',
                }}>
                  Facilities Included
                </span>
              </div>

              {/* Facilities list */}
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {studio.facilities.map((f, i, arr) => (
                  <li
                    key={f}
                    style={{
                      display: 'flex', alignItems: 'flex-start', gap: '12px',
                      padding: '11px 20px',
                      borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                      fontSize: '0.88rem', color: 'var(--gray-lt)',
                    }}
                  >
                    <span style={{
                      width: '18px', height: '18px', minWidth: '18px',
                      borderRadius: '50%',
                      background: 'rgba(212,175,55,0.08)',
                      border: '1px solid rgba(212,175,55,0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.55rem', color: 'var(--gold)', marginTop: '1px',
                    }}>
                      ✓
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Booking CTA card */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(212,175,55,0.07), rgba(212,175,55,0.03))',
              border: '1px solid rgba(212,175,55,0.18)',
              borderRadius: '14px',
              padding: '1.5rem',
              textAlign: 'center',
            }}>
              <div style={{
                fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.14em',
                textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '6px',
              }}>
                Ready to Book?
              </div>
              <p style={{
                fontSize: '0.82rem', color: 'var(--gray-lt)',
                fontWeight: 300, marginBottom: '1.125rem', lineHeight: 1.65,
              }}>
                From {rateFrom}{rateUnit}
                {minBooking ? ` · Min ${minBooking}` : ''}
                {' · '}Confirmed within 2 hours
              </p>
              <div style={{ display: 'flex', gap: '0.625rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a
                  href="#booking"
                  style={{
                    display: 'inline-flex', alignItems: 'center',
                    padding: '10px 22px',
                    background: 'var(--gold)', border: 'none', borderRadius: '100px',
                    color: 'var(--dark)', fontSize: '0.78rem', fontWeight: 700,
                    letterSpacing: '0.04em', textTransform: 'uppercase',
                    textDecoration: 'none', transition: 'all 0.3s',
                  }}
                >
                  Check Availability →
                </a>
                <a
                  href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(`Hi, I'd like to enquire about the ${studio.title} at Cine Classic Studios.`)}`}
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '5px',
                    padding: '10px 18px',
                    background: 'rgba(37,211,102,0.1)',
                    border: '1px solid rgba(37,211,102,0.25)',
                    borderRadius: '100px', color: '#4ade80',
                    fontSize: '0.78rem', fontWeight: 600,
                    textDecoration: 'none', transition: 'all 0.3s',
                    whiteSpace: 'nowrap',
                  }}
                >
                  💬 WhatsApp
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Responsive overrides */}
      <style>{`
        /* Spec strip: hide scrollbar */
        .spec-strip::-webkit-scrollbar { display: none; }
        .spec-strip > div:hover { background: rgba(255,255,255,0.03); }

        /* Two-column → single column below 900px */
        @media (max-width: 900px) {
          .details-grid {
            grid-template-columns: 1fr !important;
          }
        }

        /* Use-case scroll: show as wrap on desktop, scroll on mobile */
        @media (max-width: 640px) {
          .use-case-scroll { flex-wrap: nowrap !important; }
          .use-case-scroll::-webkit-scrollbar { display: none; }
        }
      `}</style>
    </section>
  );
}
