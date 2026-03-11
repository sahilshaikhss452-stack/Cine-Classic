'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { ArrowRightIcon } from '@/components/ui/icons';
import type { SanityStudio } from '@/lib/sanity';
import { fmtHeight, fmtRate, fmtRateUnit, fmtSize } from '@/lib/studio-utils';
import DownloadSetDeckButton from '@/components/studios/DownloadSetDeckButton';

interface Props {
  studio: SanityStudio;
}

export default function StudioHero({ studio }: Props) {
  const heroSrc = studio.heroImage;
  const [heroBgFailed, setHeroBgFailed] = useState(false);
  const topUseCases = studio.suitableFor.slice(0, 3);

  const statsBar = [
    { label: 'Floor Area', value: fmtSize(studio.size), gold: false },
    { label: 'Ceiling Height', value: fmtHeight(studio.height), gold: false },
    { label: 'Max Crew', value: studio.capacity ?? 'On request', gold: false },
    {
      label: 'Rate From',
      value: `${fmtRate(studio.rateHourly, studio.ratePerDay)}${fmtRateUnit(studio.rateUnit, studio.rateHourly)}`,
      gold: true,
    },
  ];

  return (
    <section
      className="studio-hero"
      style={{
        height: '100svh',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: studio.gradient ?? 'linear-gradient(135deg, #1a1a1a, #2a2a2a)',
        }}
      />

      {heroSrc && !heroBgFailed && (
        <Image
          src={heroSrc}
          alt={`${studio.title} studio`}
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', opacity: 0.52 }}
          onError={() => setHeroBgFailed(true)}
        />
      )}

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(
            to bottom,
            rgba(0,0,0,0.55) 0%,
            rgba(0,0,0,0.08) 22%,
            rgba(0,0,0,0.08) 48%,
            rgba(0,0,0,0.68) 75%,
            rgba(0,0,0,0.97) 100%
          )`,
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 90% 90% at 50% 40%, transparent 45%, rgba(0,0,0,0.42) 100%)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: `linear-gradient(90deg, transparent 0%, rgba(${hexToRgb(studio.accentColor ?? '#d4af37')}, 0.5) 50%, transparent 100%)`,
          opacity: 0.6,
        }}
      />

      <div
        className="studio-hero__inner"
        style={{
          position: 'relative',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '1200px',
          width: '100%',
          margin: '0 auto',
          padding: '0 5%',
          minWidth: 0,
        }}
      >
        <div
          className="studio-hero__topbar"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '88px',
            flexWrap: 'wrap',
            gap: '0.75rem',
            minWidth: 0,
          }}
        >
          <nav
            aria-label="Breadcrumb"
            className="studio-hero__breadcrumb"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              fontSize: '0.7rem',
              color: 'rgba(255,255,255,0.34)',
              minWidth: 0,
              maxWidth: '100%',
              whiteSpace: 'nowrap',
            }}
          >
            <Link href="/" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}>
              Home
            </Link>
            <span style={{ opacity: 0.5 }}>/</span>
            <Link href="/studios" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}>
              Studios
            </Link>
            <span style={{ opacity: 0.5 }}>/</span>
            <span style={{ color: 'rgba(255,255,255,0.7)' }}>{studio.title}</span>
          </nav>

          <div
            className="studio-hero__badge"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '7px',
              fontSize: '0.62rem',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: studio.accentColor ?? '#d4af37',
              background: `rgba(${hexToRgb(studio.accentColor ?? '#d4af37')}, 0.1)`,
              border: `1px solid rgba(${hexToRgb(studio.accentColor ?? '#d4af37')}, 0.28)`,
              padding: '5px 14px',
              borderRadius: '100px',
            }}
          >
            <span
              style={{
                width: '5px',
                height: '5px',
                background: studio.accentColor ?? '#d4af37',
                borderRadius: '50%',
                animation: 'pulse-dot 2s ease-in-out infinite',
              }}
            />
            Mumbai Production Set
          </div>
        </div>

        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            paddingBottom: '44px',
            minWidth: 0,
          }}
        >
          <h1
            className="studio-hero__title"
            style={{
              fontFamily: 'var(--font-playfair), serif',
              fontSize: 'clamp(3rem, 8.5vw, 7.5rem)',
              fontWeight: 700,
              lineHeight: 0.93,
              color: 'var(--white)',
              marginBottom: '1.35rem',
              letterSpacing: '-0.03em',
            }}
          >
            {studio.title}
          </h1>

          <p
            className="studio-hero__desc"
            style={{
              fontSize: 'clamp(0.92rem, 1.35vw, 1.08rem)',
              color: 'rgba(255,255,255,0.66)',
              maxWidth: '620px',
              fontWeight: 300,
              lineHeight: 1.82,
              marginBottom: '1.2rem',
            }}
          >
            {studio.tagline ?? 'Production-ready set with a practical layout, controlled shooting conditions, and faster booking support for Mumbai crews.'}
          </p>

          {topUseCases.length > 0 && (
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.75rem' }}>
              <span
                style={{
                  fontSize: '0.64rem',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.36)',
                  paddingTop: '0.2rem',
                }}
              >
                Best suited for
              </span>
              {topUseCases.map((useCase) => (
                <span
                  key={useCase}
                  style={{
                    fontSize: '0.7rem',
                    color: 'rgba(255,255,255,0.76)',
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '100px',
                    padding: '5px 12px',
                    whiteSpace: 'nowrap',
                    maxWidth: '100%',
                  }}
                >
                  {useCase}
                </span>
              ))}
            </div>
          )}

          {studio.productions && studio.productions.length > 0 && (
            <div
              className="studio-hero__productions"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                flexWrap: 'wrap',
                marginBottom: '2.2rem',
                minWidth: 0,
              }}
            >
              <span
                style={{
                  fontSize: '0.58rem',
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.24)',
                  flexShrink: 0,
                }}
              >
                Reference productions
              </span>
              {studio.productions.map((production) => (
                <span
                  key={production}
                  style={{
                    fontSize: '0.68rem',
                    fontWeight: 400,
                    color: 'rgba(255,255,255,0.5)',
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '100px',
                    padding: '3px 11px',
                    whiteSpace: 'nowrap',
                    backdropFilter: 'blur(4px)',
                    maxWidth: '100%',
                  }}
                >
                  {production}
                </span>
              ))}
            </div>
          )}

          <div
            className="studio-hero__ctas"
            style={{
              display: 'flex',
              gap: '0.75rem',
              flexWrap: 'wrap',
              alignItems: 'center',
              marginBottom: '2.5rem',
              minWidth: 0,
            }}
          >
            <a
              href="#booking"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 30px',
                background: 'var(--gold)',
                border: 'none',
                borderRadius: '100px',
                color: 'var(--dark)',
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: '0.85rem',
                fontWeight: 700,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
                boxShadow: '0 4px 24px rgba(212,175,55,0.3)',
                whiteSpace: 'nowrap',
                maxWidth: '100%',
              }}
            >
              Check Dates & Rates
              <ArrowRightIcon size={15} />
            </a>

            <a
              href="#details"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '13px 26px',
                background: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '100px',
                color: 'var(--white)',
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: '0.85rem',
                fontWeight: 500,
                textDecoration: 'none',
                transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
                whiteSpace: 'nowrap',
                maxWidth: '100%',
              }}
            >
              View Production Specs
            </a>

            <DownloadSetDeckButton studio={studio} variant="ghost" size="md" />
          </div>

          <div
            className="studio-hero__statsbar"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              background: 'rgba(8,8,8,0.65)',
              backdropFilter: 'blur(28px)',
              WebkitBackdropFilter: 'blur(28px)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '16px',
              overflow: 'hidden',
              minWidth: 0,
            }}
          >
            {statsBar.map((stat, index, items) => (
              <div
                key={stat.label}
                style={{
                  padding: '18px 20px',
                  borderRight: index < items.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                  transition: 'background 0.3s',
                  minWidth: 0,
                }}
              >
                <div
                  style={{
                    fontSize: '0.54rem',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    marginBottom: '5px',
                    color: stat.gold ? 'var(--gold)' : 'rgba(255,255,255,0.32)',
                  }}
                >
                  {stat.label}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-playfair), serif',
                    fontSize: 'clamp(0.88rem, 1.3vw, 1.1rem)',
                    fontWeight: 700,
                    letterSpacing: '-0.01em',
                    color: stat.gold ? 'var(--gold)' : 'var(--white)',
                  }}
                >
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className="studio-hero__scroll-indicator"
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '5px',
          color: 'rgba(255,255,255,0.18)',
          animation: 'hero-scroll-fade 3s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      >
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
          <rect x="0.75" y="0.75" width="14.5" height="22.5" rx="7.25" stroke="currentColor" strokeWidth="1.2" />
          <rect x="6.5" y="4" width="3" height="5" rx="1.5" fill="currentColor" style={{ animation: 'scroll-wheel 2s ease-in-out infinite' }} />
        </svg>
      </div>

      <style>{`
        @keyframes scroll-wheel {
          0%, 100% { transform: translateY(0); opacity: 0.6; }
          50% { transform: translateY(4px); opacity: 0.15; }
        }

        @keyframes hero-scroll-fade {
          0%, 60%, 100% { opacity: 1; }
          80% { opacity: 0.3; }
        }

        .studio-hero__statsbar > div:hover {
          background: rgba(255,255,255,0.04);
        }

        @media (max-width: 768px) {
          .studio-hero {
            height: 100svh !important;
            min-height: 100svh !important;
          }

          .studio-hero__topbar {
            padding-top: 74px !important;
            align-items: flex-start !important;
          }

          .studio-hero__breadcrumb {
            overflow-x: auto;
            scrollbar-width: none;
            -webkit-overflow-scrolling: touch;
            padding-bottom: 2px;
          }

          .studio-hero__breadcrumb::-webkit-scrollbar {
            display: none;
          }

          .studio-hero__badge {
            display: none !important;
          }

          .studio-hero__ctas {
            display: grid !important;
            grid-template-columns: 1fr;
            gap: 0.6rem !important;
            margin-bottom: 1.7rem !important;
          }

          .studio-hero__ctas > * {
            width: 100% !important;
            justify-content: center !important;
          }

          .studio-hero__statsbar > div {
            padding: 14px 12px !important;
          }

          .studio-hero__statsbar > div > div:last-child {
            overflow-wrap: anywhere;
          }
        }

        @media (max-width: 540px) {
          .studio-hero__statsbar {
            grid-template-columns: 1fr 1fr !important;
          }

          .studio-hero__statsbar > div:nth-child(2) {
            border-right: none !important;
          }

          .studio-hero__statsbar > div:nth-child(1),
          .studio-hero__statsbar > div:nth-child(2) {
            border-bottom: 1px solid rgba(255,255,255,0.06);
          }
        }

        @media (max-width: 430px) {
          .studio-hero__title {
            font-size: clamp(2.2rem, 12vw, 3.2rem) !important;
            line-height: 0.98 !important;
          }

          .studio-hero__productions {
            margin-bottom: 1.4rem !important;
          }

          .studio-hero__scroll-indicator {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}

function hexToRgb(hex: string): string {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return `${r},${g},${b}`;
}