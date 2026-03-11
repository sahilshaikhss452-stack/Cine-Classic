import { loadSiteSettings } from '@/lib/sanity';
import { ArrowRightIcon, CheckIcon, MessageCircleIcon } from '@/components/ui/icons';
import type { SanityStudio } from '@/lib/sanity';
import { fmtHeight, fmtMinBooking, fmtRate, fmtRateUnit, fmtSize } from '@/lib/studio-utils';

interface Props {
  studio: SanityStudio;
}

function IconArea() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3h6M3 3v6M21 3h-6M21 3v6M3 21h6M3 21v-6M21 21h-6M21 21v-6" />
    </svg>
  );
}
function IconHeight() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="2" x2="12" y2="22" />
      <polyline points="5 8 12 2 19 8" />
      <polyline points="5 16 12 22 19 16" />
    </svg>
  );
}
function IconCrew() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
function IconRate() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}
function IconParking() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
    </svg>
  );
}
function IconPower() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}
function IconClock() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

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

export default async function StudioDetails({ studio }: Props) {
  const settings = await loadSiteSettings();
  const rateFrom = fmtRate(studio.rateHourly, studio.ratePerDay);
  const rateUnit = fmtRateUnit(studio.rateUnit, studio.rateHourly);
  const minBooking = fmtMinBooking(studio.minBookingHours);

  const specItems = [
    { icon: <IconArea />, label: 'Floor Area', value: fmtSize(studio.size), gold: false },
    { icon: <IconHeight />, label: 'Ceiling Height', value: fmtHeight(studio.height), gold: false },
    { icon: <IconCrew />, label: 'Max Crew', value: studio.capacity ?? 'On request', gold: false },
    { icon: <IconRate />, label: 'Rate From', value: `${rateFrom}${rateUnit}`, gold: true },
    ...(studio.parking ? [{ icon: <IconParking />, label: 'Parking', value: studio.parking, gold: false }] : []),
    ...(studio.powerCapacity ? [{ icon: <IconPower />, label: 'Power', value: studio.powerCapacity, gold: false }] : []),
    ...(minBooking ? [{ icon: <IconClock />, label: 'Min Booking', value: minBooking, gold: false }] : []),
  ];

  return (
    <section id="details" style={{ padding: '0', background: 'var(--dark2)', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, var(--gold), transparent)', opacity: 0.12 }} />

      <div className="spec-strip-outer" style={{ background: 'var(--dark3)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '0 5%' }}>
        <div className="spec-strip" style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', overflowX: 'auto', scrollbarWidth: 'none', gap: '0' }}>
          {specItems.map((spec, index, items) => (
            <div
              key={spec.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '24px 28px',
                flexShrink: 0,
                borderRight: index < items.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                transition: 'background 0.3s',
                cursor: 'default',
                minWidth: '110px',
                textAlign: 'center',
              }}
            >
              <div style={{ color: spec.gold ? 'var(--gold)' : 'var(--gray)', opacity: spec.gold ? 1 : 0.7 }}>{spec.icon}</div>
              <div style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '1rem', fontWeight: 700, color: spec.gold ? 'var(--gold)' : 'var(--white)', letterSpacing: '-0.01em', lineHeight: 1, whiteSpace: 'nowrap' }}>
                {spec.value}
              </div>
              <div style={{ fontSize: '0.56rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: spec.gold ? 'rgba(212,175,55,0.6)' : 'var(--gray)', whiteSpace: 'nowrap' }}>
                {spec.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '72px 5%' }}>
        <div className="reveal" style={{ marginBottom: '3rem' }}>
          <div className="section-tag">Production Specifications</div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', marginBottom: '0.8rem' }}>
            Key planning details for your <span style={{ color: 'var(--gold)' }}>recce and shoot day</span>
          </h2>
          <p style={{ maxWidth: '660px', color: 'var(--gray)', lineHeight: 1.8 }}>
            Review the working specs, facilities, and operational notes producers usually need before locking dates, planning movement, and confirming crew requirements.
          </p>
        </div>

        <div className="details-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 380px)', gap: '3.5rem', alignItems: 'start', minWidth: 0 }}>
          <div className="details-main-column" style={{ display: 'flex', flexDirection: 'column', gap: '3rem', minWidth: 0 }}>
            <div className="reveal">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                <div style={{ width: '3px', height: '18px', background: 'var(--gold)', borderRadius: '2px', flexShrink: 0 }} />
                <h3 style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold)', margin: 0 }}>
                  Set Overview
                </h3>
              </div>
              <p className="studio-details-description" style={{ fontSize: '0.97rem', color: 'var(--gray-lt)', fontWeight: 300, lineHeight: 1.9 }}>
                {studio.description ?? `${studio.title} is suited for teams that need a controlled studio environment, practical logistics, and faster production planning in Mumbai.`}
              </p>
            </div>

            {studio.suitableFor.length > 0 && (
              <div className="reveal reveal-delay-1">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem' }}>
                  <div style={{ width: '3px', height: '18px', background: 'var(--gold)', borderRadius: '2px', flexShrink: 0 }} />
                  <h3 style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold)', margin: 0 }}>
                    Works Well For
                  </h3>
                </div>
                <div className="use-case-scroll" style={{ display: 'flex', gap: '0.625rem', overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: '4px', flexWrap: 'wrap', maxWidth: '100%' }}>
                  {studio.suitableFor.map((useCase, index) => (
                    <div
                      key={useCase}
                      className="use-case-pill"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '9px 16px',
                        background: USE_CASE_ACCENTS[index % USE_CASE_ACCENTS.length],
                        border: `1px solid ${USE_CASE_BORDERS[index % USE_CASE_BORDERS.length]}`,
                        borderRadius: '8px',
                        flexShrink: 0,
                      }}
                    >
                      <span style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '0.75rem', fontWeight: 700, color: 'var(--gold)', opacity: 0.5, minWidth: '16px' }}>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span style={{ fontSize: '0.85rem', color: 'var(--white)', fontWeight: 400, whiteSpace: 'nowrap' }}>
                        {useCase}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {studio.productions && studio.productions.length > 0 && (
              <div className="reveal reveal-delay-2">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem' }}>
                  <div style={{ width: '3px', height: '18px', background: 'var(--gold)', borderRadius: '2px', flexShrink: 0 }} />
                  <h3 style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold)', margin: 0 }}>
                    Reference Productions
                  </h3>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {studio.productions.map((production) => (
                    <span key={production} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--gray-lt)', background: 'var(--dark3)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '100px', padding: '5px 14px' }}>
                      <span style={{ width: '5px', height: '5px', background: 'var(--gold)', borderRadius: '50%', opacity: 0.5, flexShrink: 0 }} />
                      {production}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="reveal reveal-delay-1 details-side-column" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', minWidth: 0 }}>
            <div style={{ background: 'var(--dark3)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', overflow: 'hidden' }}>
              <div style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckIcon size={13} style={{ color: 'var(--gold)' }} />
                <span style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--gold)' }}>
                  Included Support
                </span>
              </div>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {studio.facilities.map((facility, index, items) => (
                  <li key={facility} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '11px 20px', borderBottom: index < items.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none', fontSize: '0.88rem', color: 'var(--gray-lt)' }}>
                    <span style={{ width: '18px', height: '18px', minWidth: '18px', borderRadius: '50%', background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)', marginTop: '1px' }}>
                      <CheckIcon size={10} />
                    </span>
                    {facility}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.07), rgba(212,175,55,0.03))', border: '1px solid rgba(212,175,55,0.18)', borderRadius: '14px', padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '6px' }}>
                Need a quote?
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--gray-lt)', fontWeight: 300, marginBottom: '1.125rem', lineHeight: 1.7 }}>
                Starting from {rateFrom}{rateUnit}
                {minBooking ? ` | Minimum ${minBooking}` : ''}
                {' | '}Fast availability guidance from the Cine Classic team
              </p>
              <div className="details-cta-row" style={{ display: 'flex', gap: '0.625rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a
                  className="details-cta-button"
                  href="#booking"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    padding: '10px 22px',
                    background: 'var(--gold)',
                    border: 'none',
                    borderRadius: '100px',
                    color: 'var(--dark)',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    transition: 'all 0.3s',
                  }}
                >
                  Request Availability
                  <ArrowRightIcon size={14} />
                </a>
                <a
                  className="details-cta-button"
                  href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(`Hi, I'd like to enquire about the ${studio.title} at Cine Classic Studios.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    padding: '10px 18px',
                    background: 'rgba(37,211,102,0.1)',
                    border: '1px solid rgba(37,211,102,0.25)',
                    borderRadius: '100px',
                    color: '#4ade80',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    transition: 'all 0.3s',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <MessageCircleIcon size={14} />
                  WhatsApp Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .spec-strip::-webkit-scrollbar { display: none; }
        .spec-strip > div:hover { background: rgba(255,255,255,0.03); }
        .details-grid > * { min-width: 0; }
        .details-main-column,
        .details-side-column,
        .studio-details-description { min-width: 0; }
        .studio-details-description { overflow-wrap: anywhere; }
        .use-case-scroll { max-width: 100%; }
        .use-case-pill { min-width: max-content; }

        @media (max-width: 900px) {
          .details-grid {
            grid-template-columns: minmax(0, 1fr) !important;
            gap: 2.25rem !important;
          }
        }

        @media (max-width: 640px) {
          .spec-strip-outer {
            padding-left: 0 !important;
            padding-right: 0 !important;
          }

          .spec-strip {
            padding: 0 5% !important;
            max-width: 100% !important;
          }

          .spec-strip > div {
            min-width: 104px !important;
            padding: 18px 16px !important;
          }

          .details-main-column {
            gap: 2rem !important;
          }

          .details-side-column {
            gap: 1rem !important;
          }

          .studio-details-description {
            font-size: 0.92rem !important;
            line-height: 1.8 !important;
          }

          .use-case-scroll { flex-wrap: nowrap !important; }
          .use-case-scroll::-webkit-scrollbar { display: none; }
          .use-case-scroll {
            padding-bottom: 0.35rem !important;
            scroll-snap-type: x proximity;
          }

          .use-case-pill {
            scroll-snap-align: start;
          }

          .details-cta-row {
            display: grid !important;
            grid-template-columns: 1fr;
          }

          .details-cta-button {
            width: 100%;
            justify-content: center !important;
          }
        }
      `}</style>
    </section>
  );
}