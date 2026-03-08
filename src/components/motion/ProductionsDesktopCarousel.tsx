'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { PRODUCTIONS, TYPE_ICONS } from '@/data/productions';

/* ── Layout constants ─────────────────────────────────────────────── */
const CARD_W       = 355;   // center card width px
const SIDE_SCALE   = 0.83;  // side card scale factor
const SIDE_OPACITY = 0.55;  // side card opacity
const SIDE_OFFSET  = 455;   // px from center to each side card center
const VIEWPORT_H   = 535;   // px – card track height

export default function ProductionsDesktopCarousel() {
  const [active, setActive]     = useState(0);
  const [hovered, setHovered]   = useState(false);
  const [lHover, setLHover]     = useState(false);
  const [rHover, setRHover]     = useState(false);
  const total = PRODUCTIONS.length;

  const goPrev = useCallback(() => setActive(i => (i - 1 + total) % total), [total]);
  const goNext = useCallback(() => setActive(i => (i + 1) % total), [total]);

  /* ── Autoplay: advance every 2 s, pause while hovered ─────────── */
  useEffect(() => {
    if (hovered) return;
    const id = setInterval(goNext, 2000);
    return () => clearInterval(id);
  }, [hovered, goNext]);

  return (
    <div
      style={{ position: 'relative', width: '100%', userSelect: 'none' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Card viewport ───────────────────────────────────────────── */}
      <div style={{
        position: 'relative',
        height: `${VIEWPORT_H}px`,
        overflow: 'visible',          /* cards allowed to bleed into section padding  */
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {/* Left edge fade — matches section bg */}
        <div style={{
          position: 'absolute', top: 0, bottom: 0,
          left: '-5vw', width: 'calc(5vw + 13%)',
          background: 'linear-gradient(to right, var(--dark) 25%, transparent 100%)',
          zIndex: 10, pointerEvents: 'none',
        }} />
        {/* Right edge fade */}
        <div style={{
          position: 'absolute', top: 0, bottom: 0,
          right: '-5vw', width: 'calc(5vw + 13%)',
          background: 'linear-gradient(to left, var(--dark) 25%, transparent 100%)',
          zIndex: 10, pointerEvents: 'none',
        }} />

        {/* ── Cards ──────────────────────────────────────────────── */}
        {PRODUCTIONS.map((prod, i) => {
          let offset = i - active;
          if (offset >  total / 2) offset -= total;
          if (offset < -total / 2) offset += total;

          const isCenter  = offset === 0;
          const isSide    = Math.abs(offset) === 1;
          const isVisible = Math.abs(offset) <= 1;
          const scale     = isCenter ? 1 : SIDE_SCALE;
          const opacity   = isCenter ? 1 : isSide ? SIDE_OPACITY : 0;

          return (
            <div
              key={prod.id}
              onClick={() => { if (offset === -1) goPrev(); else if (offset === 1) goNext(); }}
              style={{
                position: 'absolute',
                width: `${CARD_W}px`,
                transform: `translateX(${offset * SIDE_OFFSET}px) scale(${scale})`,
                opacity,
                zIndex: isCenter ? 5 : isSide ? 3 : 0,
                transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.45s ease',
                transformOrigin: 'center center',
                cursor: isSide ? 'pointer' : 'default',
                pointerEvents: isVisible ? 'auto' : 'none',
              }}
            >
              {/* ── Poster card ──────────────────────────────────── */}
              <div style={{
                aspectRatio: '2/3',
                borderRadius: '16px',
                overflow: 'hidden',
                position: 'relative',
                border: isCenter
                  ? '1px solid rgba(212,175,55,0.14)'
                  : '1px solid rgba(255,255,255,0.06)',
                boxShadow: isCenter
                  ? '0 40px 100px rgba(0,0,0,0.75), 0 0 0 1px rgba(212,175,55,0.06)'
                  : '0 8px 32px rgba(0,0,0,0.4)',
                transition: 'box-shadow 0.5s ease',
              }}>
                {/* Gradient background (always present behind image) */}
                <div style={{ position: 'absolute', inset: 0, background: prod.gradient }} />

                {/* Real poster image when available */}
                {prod.posterImage && (
                  <Image
                    src={prod.posterImage}
                    alt={`${prod.title} poster`}
                    fill
                    sizes="360px"
                    style={{ objectFit: 'cover' }}
                  />
                )}

                {/* Type icon — placeholder only */}
                {!prod.posterImage && (
                  <div style={{
                    position: 'absolute', inset: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '4.5rem', opacity: 0.18, pointerEvents: 'none',
                  }}>
                    {TYPE_ICONS[prod.type] ?? '🎞️'}
                  </div>
                )}

                {/* Bottom vignette */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.25) 45%, transparent 70%)',
                  pointerEvents: 'none',
                }} />

                {/* Network badge */}
                {prod.network && (
                  <div style={{
                    position: 'absolute', top: '0.75rem', right: '0.75rem',
                    background: 'rgba(0,0,0,0.65)',
                    backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '6px', padding: '3px 8px',
                    fontSize: '0.6rem', fontWeight: 600,
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.7)',
                  }}>
                    {prod.network}
                  </div>
                )}

                {/* Title + meta — fades in/up on center card only */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  padding: '1.5rem 1.25rem 1.25rem',
                  opacity: isCenter ? 1 : 0,
                  transform: isCenter ? 'translateY(0)' : 'translateY(10px)',
                  transition: 'opacity 0.4s ease 0.05s, transform 0.4s ease 0.05s',
                  pointerEvents: 'none',
                }}>
                  <div style={{
                    fontFamily: 'var(--font-playfair), serif',
                    fontSize: '1.1rem', fontWeight: 700,
                    color: 'var(--white)', marginBottom: '0.45rem',
                    lineHeight: 1.25,
                  }}>
                    {prod.title}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                    <span style={{
                      fontSize: '0.6rem', fontWeight: 600,
                      letterSpacing: '0.12em', textTransform: 'uppercase',
                      color: prod.typeColor, border: `1px solid ${prod.typeColor}`,
                      padding: '2px 8px', borderRadius: '100px',
                    }}>
                      {prod.type}
                    </span>
                    <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--gray)', opacity: 0.4, flexShrink: 0 }} />
                    <span style={{ fontSize: '0.7rem', color: 'var(--gray)' }}>{prod.year}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Left arrow ──────────────────────────────────────────────── */}
      <button
        onClick={goPrev}
        onMouseEnter={() => setLHover(true)}
        onMouseLeave={() => setLHover(false)}
        aria-label="Previous production"
        style={{
          position: 'absolute',
          top: `${VIEWPORT_H / 2}px`,
          left: 'calc(50% - 248px)',
          transform: `translate(-50%, -50%) scale(${lHover ? 1.1 : 1})`,
          zIndex: 20,
          width: '46px', height: '46px',
          borderRadius: '50%',
          background: lHover ? 'rgba(28,28,28,0.95)' : 'rgba(14,14,14,0.78)',
          border: `1px solid ${lHover ? 'rgba(212,175,55,0.4)' : 'rgba(255,255,255,0.12)'}`,
          backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
          color: lHover ? 'var(--gold)' : 'var(--white)',
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.25s ease, background 0.2s ease, border-color 0.2s ease, color 0.2s ease, transform 0.2s ease',
          outline: 'none',
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15,18 9,12 15,6" />
        </svg>
      </button>

      {/* ── Right arrow ─────────────────────────────────────────────── */}
      <button
        onClick={goNext}
        onMouseEnter={() => setRHover(true)}
        onMouseLeave={() => setRHover(false)}
        aria-label="Next production"
        style={{
          position: 'absolute',
          top: `${VIEWPORT_H / 2}px`,
          left: 'calc(50% + 248px)',
          transform: `translate(-50%, -50%) scale(${rHover ? 1.1 : 1})`,
          zIndex: 20,
          width: '46px', height: '46px',
          borderRadius: '50%',
          background: rHover ? 'rgba(28,28,28,0.95)' : 'rgba(14,14,14,0.78)',
          border: `1px solid ${rHover ? 'rgba(212,175,55,0.4)' : 'rgba(255,255,255,0.12)'}`,
          backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
          color: rHover ? 'var(--gold)' : 'var(--white)',
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.25s ease, background 0.2s ease, border-color 0.2s ease, color 0.2s ease, transform 0.2s ease',
          outline: 'none',
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9,18 15,12 9,6" />
        </svg>
      </button>

      {/* ── Pagination dots ─────────────────────────────────────────── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: '7px', marginTop: '1.8rem',
      }}>
        {PRODUCTIONS.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Go to production ${i + 1}`}
            style={{
              width: i === active ? '22px' : '7px',
              height: '7px',
              borderRadius: '100px',
              background: i === active ? 'var(--gold)' : 'rgba(255,255,255,0.22)',
              border: 'none', padding: 0,
              cursor: 'pointer', flexShrink: 0,
              transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
              outline: 'none',
            }}
          />
        ))}
      </div>
    </div>
  );
}
