'use client';

/**
 * StudioGallery — Immersive photo gallery for studio set pages.
 *
 * Two modes:
 *  1. Real photos (studio.galleryImages set) → Editorial masonry layout
 *     Row 1: Large hero (col-span 2) + 2 stacked right
 *     Row 2: 3 equal images
 *
 *  2. No photos yet → Premium "See It In Person" CTA
 *     Positions the lack of photography as an invitation, not a gap.
 *     Includes stat chips + dual CTAs (WhatsApp walkthrough + Book).
 */

import Image from 'next/image';
import { useState } from 'react';
import type { SanityStudio } from '@/lib/sanity.types';
import { fmtSize, fmtHeight, fmtRate, fmtRateUnit } from '@/lib/studio-utils';

interface Props {
  studio: SanityStudio;
}

// ─── Individual gallery slot ──────────────────────────────────────────────────
interface SlotProps {
  src: string | undefined;
  alt: string;
  label: string;
  aspectRatio: string;
  gradient: string;
  icon: string;
  revealClass: string;
  gridArea?: string;
}

function GallerySlot({ src, alt, label, aspectRatio, gradient, icon, revealClass, gridArea }: SlotProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const showImage = !!src && !imgFailed;

  return (
    <div
      className={`gallery-slot ${revealClass}`}
      style={{
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.06)',
        position: 'relative',
        cursor: 'pointer',
        gridArea: gridArea,
      }}
    >
      <div style={{
        aspectRatio,
        background: gradient,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
      }}>
        {!showImage && (
          <>
            <span style={{ fontSize: '2.2rem', opacity: 0.5 }}>{icon}</span>
            <span style={{
              fontSize: '0.6rem', letterSpacing: '0.16em',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)',
            }}>
              {label}
            </span>
          </>
        )}

        {showImage && (
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
            style={{ objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.22,1,0.36,1)' }}
            onError={() => setImgFailed(true)}
          />
        )}
      </div>

      {/* Hover caption overlay */}
      <div className="gallery-slot__overlay" style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 55%)',
        display: 'flex', alignItems: 'flex-end',
        padding: '1rem 1.125rem',
        opacity: 0, transition: 'opacity 0.3s',
      }}>
        <span style={{
          fontSize: '0.72rem', letterSpacing: '0.1em',
          textTransform: 'uppercase', color: 'var(--white)', fontWeight: 500,
        }}>
          {label}
        </span>
      </div>
    </div>
  );
}

// ─── Premium "See It In Person" CTA ──────────────────────────────────────────
function PhotoTourCTA({ studio }: { studio: SanityStudio }) {
  const whatsappText = encodeURIComponent(
    `Hi, I'd like to schedule a walkthrough of the ${studio.title} at Cine Classic Studios.`
  );

  const rateDisplay = `${fmtRate(studio.rateHourly, studio.ratePerDay)}${fmtRateUnit(studio.rateUnit, studio.rateHourly)}`;

  return (
    <div
      className="reveal"
      style={{
        borderRadius: '20px',
        border: '1px solid rgba(255,255,255,0.07)',
        background: studio.gradient ?? 'linear-gradient(135deg, #1a1a1a, #2a2a2a)',
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(48px, 8vw, 80px) clamp(24px, 6%, 60px)',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '3rem',
        alignItems: 'center',
        minHeight: '360px',
      }}
    >
      {/* Grid background */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(rgba(212,175,55,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(212,175,55,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '52px 52px',
      }} />

      {/* Corner accent */}
      <div style={{
        position: 'absolute', top: 0, right: 0,
        width: '220px', height: '220px',
        background: 'radial-gradient(circle at 100% 0%, rgba(212,175,55,0.08) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      {/* Left: heading + description */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '7px',
          fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.18em',
          textTransform: 'uppercase', color: 'var(--gold)',
          background: 'rgba(212,175,55,0.1)',
          border: '1px solid rgba(212,175,55,0.2)',
          padding: '5px 14px', borderRadius: '100px',
          marginBottom: '1.25rem',
        }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
          </svg>
          Photography Coming Soon
        </div>

        <h3 style={{
          fontFamily: 'var(--font-playfair), serif',
          fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
          fontWeight: 700, color: 'var(--white)',
          lineHeight: 1.15, marginBottom: '1rem',
          letterSpacing: '-0.01em',
        }}>
          Experience {studio.title}<br />
          <span style={{ color: 'var(--gold)' }}>In Person</span>
        </h3>

        <p style={{
          fontSize: '0.9rem', color: 'rgba(255,255,255,0.55)',
          fontWeight: 300, lineHeight: 1.8, marginBottom: '1.75rem',
          maxWidth: '380px',
        }}>
          Our team will walk you through every zone, camera angle, and lighting position.
          Complimentary site visits available 7 days a week.
        </p>

        <div style={{ display: 'flex', gap: '0.625rem', flexWrap: 'wrap' }}>
          <a
            href={`https://wa.me/919876543210?text=${whatsappText}`}
            target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '7px',
              padding: '11px 22px',
              background: 'rgba(37,211,102,0.12)',
              border: '1px solid rgba(37,211,102,0.3)',
              borderRadius: '100px', color: '#4ade80',
              fontSize: '0.82rem', fontWeight: 600,
              textDecoration: 'none', transition: 'all 0.3s', whiteSpace: 'nowrap',
            }}
          >
            💬 Schedule Walkthrough
          </a>
          <a
            href="#booking"
            style={{
              display: 'inline-flex', alignItems: 'center',
              padding: '11px 22px',
              background: 'var(--gold)', border: 'none', borderRadius: '100px',
              color: 'var(--dark)', fontSize: '0.82rem', fontWeight: 700,
              textDecoration: 'none', transition: 'all 0.3s', whiteSpace: 'nowrap',
            }}
          >
            Book This Studio →
          </a>
        </div>
      </div>

      {/* Right: stat cards */}
      <div style={{
        position: 'relative', zIndex: 1,
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem',
      }}>
        {[
          { label: 'Floor Area', value: fmtSize(studio.size), icon: '📐' },
          { label: 'Ceiling Height', value: fmtHeight(studio.height), icon: '↕️' },
          { label: 'Max Crew', value: studio.capacity ?? '—', icon: '👥' },
          { label: 'Rate From', value: rateDisplay, icon: '💰', gold: true },
        ].map((chip) => (
          <div key={chip.label} style={{
            padding: '16px',
            background: 'rgba(255,255,255,0.05)',
            border: chip.gold ? '1px solid rgba(212,175,55,0.2)' : '1px solid rgba(255,255,255,0.08)',
            borderRadius: '12px',
            backdropFilter: 'blur(8px)',
          }}>
            <div style={{ fontSize: '1.1rem', marginBottom: '6px' }}>{chip.icon}</div>
            <div style={{
              fontFamily: 'var(--font-playfair), serif',
              fontSize: '0.95rem', fontWeight: 700,
              color: chip.gold ? 'var(--gold)' : 'var(--white)',
              marginBottom: '2px',
            }}>
              {chip.value}
            </div>
            <div style={{
              fontSize: '0.56rem', fontWeight: 600, letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: chip.gold ? 'rgba(212,175,55,0.55)' : 'rgba(255,255,255,0.35)',
            }}>
              {chip.label}
            </div>
          </div>
        ))}
      </div>

      {/* Responsive: stack columns on mobile */}
      <style>{`
        @media (max-width: 680px) {
          .photo-tour-cta { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

// ─── Gallery section ──────────────────────────────────────────────────────────
export default function StudioGallery({ studio }: Props) {
  const hasRealImages = !!(studio.galleryImages && studio.galleryImages.length > 0);

  // ── No photos uploaded yet ────────────────────────────────────────────────
  if (!hasRealImages) {
    return (
      <section id="gallery" style={{ padding: '80px 5%', background: 'var(--dark)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="reveal" style={{ marginBottom: '3rem' }}>
            <div className="section-tag">The Space</div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
              See It{' '}
              <span style={{ color: 'var(--gold)' }}>for Yourself</span>
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--gray)', fontWeight: 300, marginTop: '0.5rem', maxWidth: '480px' }}>
              Photography coming soon. Book a complimentary on-site walkthrough with our production team.
            </p>
          </div>
          <PhotoTourCTA studio={studio} />
        </div>
      </section>
    );
  }

  // ── Real photos: editorial masonry layout ─────────────────────────────────
  // Row 1: Large image (spans 2) + 2 stacked right (spans 1)
  // Row 2: 3 equal images
  const SLOT_LABELS = ['Wide Shot', 'Detail', 'Lighting Setup', 'Full Floor', 'Dressed Set', 'Production Ready'];
  const imagePaths: (string | undefined)[] = Array.from({ length: 6 }, (_, i) => studio.galleryImages![i]);

  return (
    <section id="gallery" style={{ padding: '80px 5%', background: 'var(--dark)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <div className="reveal" style={{ marginBottom: '3rem' }}>
          <div className="section-tag">Photo Gallery</div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
            The Studio{' '}
            <span style={{ color: 'var(--gold)' }}>in Action</span>
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--gray)', fontWeight: 300, marginTop: '0.5rem' }}>
            A look inside {studio.title}.
          </p>
        </div>

        {/* Editorial layout: 3 cols × 2 rows */}
        <div
          className="gallery-editorial"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: 'auto auto',
            gap: '10px',
          }}
        >
          {/* Slot 0: hero — spans 2 cols */}
          <GallerySlot
            src={imagePaths[0]}
            alt={`${studio.title} · ${SLOT_LABELS[0]}`}
            label={SLOT_LABELS[0]}
            aspectRatio="16/9"
            gradient={studio.gradient ?? 'linear-gradient(135deg, #1a1a1a, #2a2a2a)'}
            icon={studio.icon ?? '🎬'}
            revealClass="reveal"
            gridArea="1 / 1 / 2 / 3"
          />
          {/* Slot 1: top right */}
          <GallerySlot
            src={imagePaths[1]}
            alt={`${studio.title} · ${SLOT_LABELS[1]}`}
            label={SLOT_LABELS[1]}
            aspectRatio="4/3"
            gradient={studio.gradient ?? 'linear-gradient(135deg, #1a1a1a, #2a2a2a)'}
            icon={studio.icon ?? '🎬'}
            revealClass="reveal reveal-delay-1"
          />
          {/* Slot 2: stacked right — fills next row right col naturally */}
          <GallerySlot
            src={imagePaths[2]}
            alt={`${studio.title} · ${SLOT_LABELS[2]}`}
            label={SLOT_LABELS[2]}
            aspectRatio="4/3"
            gradient={studio.gradient ?? 'linear-gradient(135deg, #1a1a1a, #2a2a2a)'}
            icon={studio.icon ?? '🎬'}
            revealClass="reveal reveal-delay-2"
          />
          {/* Slots 3–5: bottom row of 3 equal */}
          {[3, 4, 5].map((idx) => (
            <GallerySlot
              key={idx}
              src={imagePaths[idx]}
              alt={`${studio.title} · ${SLOT_LABELS[idx]}`}
              label={SLOT_LABELS[idx]}
              aspectRatio="4/3"
              gradient={studio.gradient ?? 'linear-gradient(135deg, #1a1a1a, #2a2a2a)'}
              icon={studio.icon ?? '🎬'}
              revealClass={`reveal reveal-delay-${idx - 2}`}
            />
          ))}
        </div>
      </div>

      {/* Hover + responsive styles */}
      <style>{`
        .gallery-slot { transition: transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s; }
        .gallery-slot:hover { transform: scale(1.012); box-shadow: 0 8px 32px rgba(0,0,0,0.4); }
        .gallery-slot:hover .gallery-slot__overlay { opacity: 1 !important; }
        .gallery-slot:hover img { transform: scale(1.04); }

        @media (max-width: 768px) {
          .gallery-editorial { grid-template-columns: 1fr 1fr !important; }
          .gallery-editorial > div:first-child { grid-area: auto !important; }
        }
        @media (max-width: 480px) {
          .gallery-editorial { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
