'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import type { StudioSet } from '@/data/sets';
import { studioHeroPath } from '@/data/sets';
import DownloadSetDeckButton from '@/components/studios/DownloadSetDeckButton';

interface Props {
  studio: StudioSet;
}

export default function StudioHero({ studio }: Props) {
  // Use explicit heroImage from data, or fall back to the conventional path.
  // If no file exists at that path the onError handler hides the <Image>.
  const heroSrc = studio.heroImage ?? studioHeroPath(studio.slug);
  const [heroBgFailed, setHeroBgFailed] = useState(false);

  return (
    <section style={{
      minHeight: '78vh',
      display: 'flex',
      alignItems: 'flex-end',
      position: 'relative',
      overflow: 'hidden',
      padding: '120px 5% 64px',
    }}>
      {/* Gradient layer — always present, acts as fallback when no photo is uploaded */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: studio.gradient,
      }} />

      {/* Real hero photo — renders on top of gradient, hidden on error */}
      {!heroBgFailed && (
        <Image
          src={heroSrc}
          alt={`${studio.name} studio hero`}
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', opacity: 0.55 }}
          onError={() => setHeroBgFailed(true)}
        />
      )}

      {/* Dark overlay for text legibility */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to top, rgba(6,6,6,0.95) 0%, rgba(6,6,6,0.45) 55%, rgba(6,6,6,0.15) 100%)',
      }} />

      {/* Subtle grid */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(212,175,55,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(212,175,55,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        maskImage: 'radial-gradient(ellipse 80% 60% at 50% 80%, black 20%, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 80%, black 20%, transparent 80%)',
      }} />

      {/* Large icon watermark — subtle background decoration */}
      <div style={{
        position: 'absolute',
        top: '50%',
        right: '8%',
        transform: 'translateY(-60%)',
        fontSize: 'clamp(6rem, 16vw, 14rem)',
        opacity: 0.05,
        userSelect: 'none',
        pointerEvents: 'none',
        filter: 'grayscale(1)',
      }}>
        {studio.icon}
      </div>

      {/* Content */}
      <div style={{ position: 'relative', maxWidth: '1200px', width: '100%', margin: '0 auto' }}>
        {/* Breadcrumb */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.75rem',
          color: 'var(--gray)',
          marginBottom: '1.5rem',
          fontFamily: 'var(--font-inter), sans-serif',
        }}>
          <Link href="/" style={{ color: 'var(--gray)', transition: 'color 0.3s' }}>Home</Link>
          <span style={{ opacity: 0.4 }}>›</span>
          <Link href="/studios" style={{ color: 'var(--gray)', transition: 'color 0.3s' }}>Studios</Link>
          <span style={{ opacity: 0.4 }}>›</span>
          <span style={{ color: studio.accentColor }}>{studio.name}</span>
        </div>

        {/* Tag */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '0.72rem',
          fontWeight: 600,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: studio.accentColor,
          background: `rgba(${hexToRgb(studio.accentColor)}, 0.1)`,
          border: `1px solid rgba(${hexToRgb(studio.accentColor)}, 0.25)`,
          padding: '6px 16px',
          borderRadius: '100px',
          marginBottom: '1.25rem',
        }}>
          <span style={{
            width: '5px', height: '5px',
            background: studio.accentColor,
            borderRadius: '50%',
            animation: 'pulse-dot 2s ease-in-out infinite',
          }} />
          Studio Space
        </div>

        <h1 style={{
          fontFamily: 'var(--font-playfair), serif',
          fontSize: 'clamp(2.5rem, 6vw, 5rem)',
          fontWeight: 700,
          lineHeight: 1.08,
          color: 'var(--white)',
          marginBottom: '1.25rem',
          letterSpacing: '-0.01em',
        }}>
          {studio.name}
        </h1>

        <p style={{
          fontSize: '1.05rem',
          color: 'var(--gray-lt)',
          maxWidth: '560px',
          fontWeight: 300,
          lineHeight: 1.8,
          marginBottom: '2rem',
        }}>
          {studio.shortDescription}
        </p>

        {/* Quick stats strip — now includes rate */}
        <div style={{
          display: 'flex',
          gap: '2.5rem',
          flexWrap: 'wrap',
          marginBottom: '2rem',
        }}>
          {[
            { label: 'Size',     value: studio.size },
            { label: 'Height',   value: studio.ceilingHeight },
            { label: 'Capacity', value: studio.capacity },
            { label: 'Rate From', value: `${studio.rateFrom}${studio.rateUnit}` },
          ].map((stat, i) => (
            <div key={stat.label} style={{ position: 'relative' }}>
              {i > 0 && (
                <span style={{
                  position: 'absolute',
                  left: '-1.25rem', top: '50%',
                  transform: 'translateY(-50%)',
                  width: '1px', height: '28px',
                  background: 'rgba(255,255,255,0.1)',
                }} />
              )}
              <div style={{
                fontSize: '0.6rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: studio.accentColor,
                fontWeight: 600,
                marginBottom: '2px',
              }}>{stat.label}</div>
              <div style={{
                fontFamily: 'var(--font-playfair), serif',
                fontSize: '1.1rem',
                fontWeight: 700,
                color: stat.label === 'Rate From' ? 'var(--gold)' : 'var(--white)',
              }}>{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Productions shot here — social proof trust line */}
        {studio.productions && studio.productions.length > 0 && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.625rem',
            flexWrap: 'wrap',
            marginBottom: '2rem',
          }}>
            <span style={{
              fontSize: '0.62rem',
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--gray)',
              whiteSpace: 'nowrap',
            }}>
              Shot here:
            </span>
            {studio.productions.map((prod) => (
              <span key={prod} style={{
                fontSize: '0.72rem',
                fontWeight: 500,
                color: 'var(--gray-lt)',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.09)',
                borderRadius: '100px',
                padding: '3px 10px',
                whiteSpace: 'nowrap',
              }}>
                {prod}
              </span>
            ))}
          </div>
        )}

        {/* CTAs — clear 3-tier hierarchy */}
        <div style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Primary */}
          <a href="#booking" className="btn-primary">Book This Studio →</a>
          {/* Secondary */}
          <a href="#details" className="btn-outline">View Specs</a>
          {/* Tertiary ghost — Download Set Deck */}
          <DownloadSetDeckButton studio={studio} variant="ghost" size="md" />
        </div>
      </div>
    </section>
  );
}

/** Convert hex to RGB triplet string for use in rgba() */
function hexToRgb(hex: string): string {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return `${r},${g},${b}`;
}
