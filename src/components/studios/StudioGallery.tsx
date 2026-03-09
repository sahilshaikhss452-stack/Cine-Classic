'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { StudioSet } from '@/data/sets';
import { studioGalleryPaths } from '@/data/sets';

interface Props {
  studio: StudioSet;
}

// Label for each of the 6 gallery slots
const SLOT_LABELS = [
  'Wide Shot',
  'Detail',
  'Lighting Setup',
  'Full Floor',
  'Dressed Set',
  'Production Ready',
];

// Each slot's aspect ratio (slot 0 spans 2 cols → wider ratio)
const SLOT_ASPECT = ['16/7', '4/3', '4/3', '4/3', '4/3', '4/3'];

// ─── Individual slot ─────────────────────────────────────────────────────────
interface SlotProps {
  src: string | undefined;
  alt: string;
  label: string;
  aspectRatio: string;
  span: number;
  gradient: string;
  icon: string;
  revealClass: string;
}

function GallerySlot({ src, alt, label, aspectRatio, span, gradient, icon, revealClass }: SlotProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const showImage = !!src && !imgFailed;

  return (
    <div
      className={revealClass}
      style={{
        gridColumn: `span ${span}`,
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.06)',
        position: 'relative',
        cursor: 'pointer',
        transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s',
      }}
    >
      {/* Gradient placeholder — always rendered, hidden by the photo when it loads */}
      <div
        style={{
          aspectRatio,
          background: gradient,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          position: 'relative',
        }}
      >
        {!showImage && (
          <>
            <span style={{ fontSize: '2.5rem', opacity: 0.6 }}>{icon}</span>
            <span style={{
              fontSize: '0.65rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.3)',
            }}>
              {label}
            </span>
          </>
        )}

        {/* Real photo — layered on top of gradient */}
        {showImage && (
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
            style={{ objectFit: 'cover' }}
            onError={() => setImgFailed(true)}
          />
        )}
      </div>

      {/* Hover caption overlay */}
      <div
        className="gallery-overlay"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)',
          display: 'flex',
          alignItems: 'flex-end',
          padding: '1rem',
          opacity: 0,
          transition: 'opacity 0.3s',
        }}
      >
        <span style={{
          fontSize: '0.78rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--white)',
          fontWeight: 500,
        }}>
          {alt.split(' · ')[0]} · {label}
        </span>
      </div>
    </div>
  );
}

// ─── No-photos placeholder ────────────────────────────────────────────────────
function PhotoTourCTA({ studio }: { studio: StudioSet }) {
  const whatsappText = encodeURIComponent(
    `Hi, I'd like to schedule a photo walkthrough of the ${studio.name} at Cine Classic Studios.`
  );

  return (
    <div
      className="reveal"
      style={{
        borderRadius: '16px',
        border: '1px solid rgba(255,255,255,0.06)',
        background: studio.gradient,
        position: 'relative',
        overflow: 'hidden',
        padding: '60px 40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        gap: '1.5rem',
        minHeight: '340px',
      }}
    >
      {/* Dashed grid overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(212,175,55,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(212,175,55,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '48px 48px',
        pointerEvents: 'none',
      }} />

      {/* Camera icon */}
      <div style={{ position: 'relative' }}>
        <div style={{
          width: '72px', height: '72px',
          borderRadius: '50%',
          background: 'rgba(212,175,55,0.08)',
          border: '1px solid rgba(212,175,55,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto',
        }}>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none"
            stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
          </svg>
        </div>
      </div>

      <div>
        <h3 style={{
          fontFamily: 'var(--font-playfair), serif',
          fontSize: '1.4rem',
          fontWeight: 700,
          color: 'var(--white)',
          marginBottom: '0.5rem',
        }}>
          See {studio.name} in Person
        </h3>
        <p style={{
          fontSize: '0.9rem',
          color: 'var(--gray-lt)',
          fontWeight: 300,
          lineHeight: 1.75,
          maxWidth: '460px',
          margin: '0 auto',
        }}>
          Photography coming soon. Schedule a complimentary walkthrough with our production team
          and see every corner, lighting position, and zone in person.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <a
          href={`https://wa.me/919876543210?text=${whatsappText}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '11px 24px',
            background: 'rgba(37,211,102,0.12)',
            border: '1px solid rgba(37,211,102,0.3)',
            borderRadius: '100px',
            color: '#4ade80',
            fontSize: '0.82rem', fontWeight: 600,
            textDecoration: 'none',
            transition: 'all 0.3s',
            whiteSpace: 'nowrap',
          }}
        >
          💬 Schedule Walkthrough
        </a>
        <a
          href="#booking"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '11px 24px',
            background: 'var(--gold)',
            border: 'none',
            borderRadius: '100px',
            color: 'var(--dark)',
            fontSize: '0.82rem', fontWeight: 600,
            textDecoration: 'none',
            transition: 'all 0.3s',
            whiteSpace: 'nowrap',
          }}
        >
          Book This Studio →
        </a>
      </div>

      {/* Stat chips */}
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        {[
          { icon: '📐', text: studio.size },
          { icon: '↕️', text: studio.ceilingHeight },
          { icon: '👥', text: studio.capacity },
        ].map((chip) => (
          <div key={chip.text} style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '5px 14px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '100px',
            fontSize: '0.75rem', color: 'var(--gray-lt)',
          }}>
            <span>{chip.icon}</span> {chip.text}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Gallery section ──────────────────────────────────────────────────────────
export default function StudioGallery({ studio }: Props) {
  // Use explicitly-set galleryImages if provided, otherwise fall back to
  // the conventional paths (public/images/studios/<slug>/1.jpg … 6.jpg).
  // If a path doesn't exist yet, the slot shows the gradient placeholder.
  const imagePaths: (string | undefined)[] = studio.galleryImages
    ? Array.from({ length: 6 }, (_, i) => studio.galleryImages![i])
    : studioGalleryPaths(studio.slug);

  // Check if there are any real images (galleryImages explicitly set and non-empty)
  const hasRealImages = !!(studio.galleryImages && studio.galleryImages.length > 0);

  // If no real photos are uploaded yet, show the photo tour CTA instead of empty placeholders
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
            <p style={{ fontSize: '0.95rem', color: 'var(--gray)', fontWeight: 300, marginTop: '0.5rem' }}>
              Studio photography is being updated. In the meantime, book a free on-site walkthrough.
            </p>
          </div>
          <PhotoTourCTA studio={studio} />
        </div>
      </section>
    );
  }

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
            A look inside {studio.name}.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '12px',
        }}>
          {SLOT_LABELS.map((label, i) => (
            <GallerySlot
              key={i}
              src={imagePaths[i]}
              alt={`${studio.name} · ${label}`}
              label={label}
              aspectRatio={SLOT_ASPECT[i]}
              span={i === 0 ? 2 : 1}
              gradient={studio.gradient}
              icon={studio.icon}
              revealClass={`reveal${i > 0 ? ` reveal-delay-${Math.min(i, 4)}` : ''}`}
            />
          ))}
        </div>

        {/* Responsive grid overrides */}
        <style>{`
          @media (max-width: 768px) {
            #gallery [style*="repeat(3, 1fr)"] { grid-template-columns: 1fr 1fr !important; }
          }
          @media (max-width: 480px) {
            #gallery [style*="repeat(3, 1fr)"] { grid-template-columns: 1fr !important; }
            #gallery [style*="span 2"] { grid-column: span 1 !important; }
          }
        `}</style>
      </div>
    </section>
  );
}
