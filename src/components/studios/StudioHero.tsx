'use client';

/**
 * StudioHero — Full-viewport cinematic hero for studio set landing pages.
 *
 * Design philosophy (Apple / Tesla / Netflix tier):
 *  - 100vh immersive — the set IS the product, show it at maximum scale
 *  - Content floats at the bottom edge, freeing the image to breathe
 *  - Glass stats bar anchors key specs without a separate section
 *  - Cinematic multi-layer overlay creates depth without hiding the set
 *  - Scroll mouse indicator guides discovery
 */

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import type { SanityStudio } from '@/lib/sanity';
import { fmtSize, fmtHeight, fmtRate, fmtRateUnit } from '@/lib/studio-utils';
import DownloadSetDeckButton from '@/components/studios/DownloadSetDeckButton';

interface Props {
  studio: SanityStudio;
}

export default function StudioHero({ studio }: Props) {
  const heroSrc = studio.heroImage;
  const [heroBgFailed, setHeroBgFailed] = useState(false);

  const statsBar = [
    { label: 'Floor Area', value: fmtSize(studio.size), gold: false },
    { label: 'Ceiling Height', value: fmtHeight(studio.height), gold: false },
    { label: 'Max Crew', value: studio.capacity ?? '—', gold: false },
    { label: 'Rate From', value: `${fmtRate(studio.rateHourly, studio.ratePerDay)}${fmtRateUnit(studio.rateUnit, studio.rateHourly)}`, gold: true },
  ];

  return (
    <section
      className="studio-hero"
      style={{
        height: '100vh',
        minHeight: '700px',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* ── Background: gradient fallback ── */}
      <div style={{ position: 'absolute', inset: 0, background: studio.gradient ?? 'linear-gradient(135deg, #1a1a1a, #2a2a2a)' }} />

      {/* ── Background: real photo (only if Sanity has one) ── */}
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

      {/* ── Cinematic overlay stack ── */}
      {/* Layer 1: directional gradient — darker at top and bottom for text legibility */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `linear-gradient(
          to bottom,
          rgba(0,0,0,0.55) 0%,
          rgba(0,0,0,0.08) 22%,
          rgba(0,0,0,0.08) 48%,
          rgba(0,0,0,0.68) 75%,
          rgba(0,0,0,0.97) 100%
        )`,
      }} />

      {/* Layer 2: radial vignette — deepens corners without flattening centre */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 90% 90% at 50% 40%, transparent 45%, rgba(0,0,0,0.42) 100%)',
      }} />

      {/* Layer 3: subtle gold scanline — cinematic brand touch */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: '2px',
        background: `linear-gradient(90deg, transparent 0%, rgba(${hexToRgb(studio.accentColor ?? '#d4af37')}, 0.5) 50%, transparent 100%)`,
        opacity: 0.6,
      }} />

      {/* ── Content column ── */}
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
        }}
      >
        {/* Top bar — breadcrumb + studio badge */}
        <div
          className="studio-hero__topbar"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '88px',
            flexWrap: 'wrap',
            gap: '0.75rem',
          }}
        >
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.7rem', color: 'rgba(255,255,255,0.32)' }}
          >
            <Link href="/" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}>Home</Link>
            <span style={{ opacity: 0.5 }}>›</span>
            <Link href="/studios" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}>Studios</Link>
            <span style={{ opacity: 0.5 }}>›</span>
            <span style={{ color: 'rgba(255,255,255,0.6)' }}>{studio.title}</span>
          </nav>

          {/* Studio tag */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '7px',
            fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.2em',
            textTransform: 'uppercase', color: studio.accentColor ?? '#d4af37',
            background: `rgba(${hexToRgb(studio.accentColor ?? '#d4af37')}, 0.1)`,
            border: `1px solid rgba(${hexToRgb(studio.accentColor ?? '#d4af37')}, 0.28)`,
            padding: '5px 14px', borderRadius: '100px',
          }}>
            <span style={{
              width: '5px', height: '5px',
              background: studio.accentColor ?? '#d4af37', borderRadius: '50%',
              animation: 'pulse-dot 2s ease-in-out infinite',
            }} />
            Cine Classic Studios
          </div>
        </div>

        {/* ── Main content — pinned to bottom of hero ── */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: '44px' }}>

          {/* Studio name — biggest possible typography */}
          <h1
            className="studio-hero__title"
            style={{
              fontFamily: 'var(--font-playfair), serif',
              fontSize: 'clamp(3rem, 8.5vw, 7.5rem)',
              fontWeight: 700,
              lineHeight: 0.93,
              color: 'var(--white)',
              marginBottom: '1.5rem',
              letterSpacing: '-0.025em',
            }}
          >
            {studio.title}
          </h1>

          {/* Short description */}
          <p
            className="studio-hero__desc"
            style={{
              fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)',
              color: 'rgba(255,255,255,0.58)',
              maxWidth: '500px',
              fontWeight: 300,
              lineHeight: 1.85,
              marginBottom: '1.75rem',
            }}
          >
            {studio.tagline ?? ''}
          </p>

          {/* "Filmed here" trust pills */}
          {studio.productions && studio.productions.length > 0 && (
            <div
              className="studio-hero__productions"
              style={{
                display: 'flex', alignItems: 'center',
                gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2.25rem',
              }}
            >
              <span style={{
                fontSize: '0.58rem', fontWeight: 600, letterSpacing: '0.14em',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)',
                flexShrink: 0,
              }}>
                Filmed here
              </span>
              {studio.productions.map((prod) => (
                <span key={prod} style={{
                  fontSize: '0.68rem', fontWeight: 400,
                  color: 'rgba(255,255,255,0.48)',
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '100px', padding: '3px 11px',
                  whiteSpace: 'nowrap', backdropFilter: 'blur(4px)',
                }}>
                  {prod}
                </span>
              ))}
            </div>
          )}

          {/* ── 3-tier CTA hierarchy ── */}
          <div
            className="studio-hero__ctas"
            style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '2.5rem' }}
          >
            {/* Primary — book now */}
            <a
              href="#booking"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '14px 30px',
                background: 'var(--gold)', border: 'none',
                borderRadius: '100px', color: 'var(--dark)',
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.04em',
                textTransform: 'uppercase', textDecoration: 'none',
                transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
                boxShadow: '0 4px 24px rgba(212,175,55,0.3)',
                whiteSpace: 'nowrap',
              }}
            >
              Book This Studio →
            </a>

            {/* Secondary — see specs */}
            <a
              href="#details"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '13px 26px',
                background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '100px', color: 'var(--white)',
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: '0.85rem', fontWeight: 500,
                textDecoration: 'none',
                transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
                whiteSpace: 'nowrap',
              }}
            >
              View Specs
            </a>

            {/* Tertiary — download set deck */}
            <DownloadSetDeckButton studio={studio} variant="ghost" size="md" />
          </div>

          {/* ── Glass stats bar ── */}
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
            }}
          >
            {statsBar.map((stat, i, arr) => (
              <div
                key={stat.label}
                style={{
                  padding: '18px 20px',
                  borderRight: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                  transition: 'background 0.3s',
                }}
              >
                <div style={{
                  fontSize: '0.54rem', letterSpacing: '0.14em',
                  textTransform: 'uppercase', fontWeight: 600, marginBottom: '5px',
                  color: stat.gold ? 'var(--gold)' : 'rgba(255,255,255,0.32)',
                }}>
                  {stat.label}
                </div>
                <div style={{
                  fontFamily: 'var(--font-playfair), serif',
                  fontSize: 'clamp(0.88rem, 1.3vw, 1.1rem)',
                  fontWeight: 700, letterSpacing: '-0.01em',
                  color: stat.gold ? 'var(--gold)' : 'var(--white)',
                }}>
                  {stat.value}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ── Scroll indicator — mouse icon ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', bottom: '24px', left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px',
          color: 'rgba(255,255,255,0.18)',
          animation: 'hero-scroll-fade 3s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      >
        {/* Mouse icon */}
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
          <rect x="0.75" y="0.75" width="14.5" height="22.5" rx="7.25" stroke="currentColor" strokeWidth="1.2" />
          <rect x="6.5" y="4" width="3" height="5" rx="1.5" fill="currentColor" style={{ animation: 'scroll-wheel 2s ease-in-out infinite' }} />
        </svg>
      </div>

      {/* ── Responsive overrides + animations ── */}
      <style>{`
        @keyframes scroll-wheel {
          0%, 100% { transform: translateY(0); opacity: 0.6; }
          50%       { transform: translateY(4px); opacity: 0.15; }
        }
        @keyframes hero-scroll-fade {
          0%, 60%, 100% { opacity: 1; }
          80%            { opacity: 0.3; }
        }

        /* Stats bar: 2×2 grid on small screens */
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

        /* CTAs stack on mobile */
        @media (max-width: 480px) {
          .studio-hero__ctas a:first-child { width: 100%; justify-content: center; }
        }

        /* Topbar wraps on mobile */
        @media (max-width: 480px) {
          .studio-hero__topbar { padding-top: 76px !important; }
        }

        /* Hover effects */
        .studio-hero__statsbar > div:hover {
          background: rgba(255,255,255,0.04);
        }
      `}</style>
    </section>
  );
}

/** Convert hex colour to RGB triplet string for rgba() usage */
function hexToRgb(hex: string): string {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return `${r},${g},${b}`;
}
