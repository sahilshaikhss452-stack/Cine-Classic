'use client';

import { useEffect, useRef, useState } from 'react';

// ─── Constants ────────────────────────────────────────────────────────────────
const TOTAL_FRAMES = 240;
const SCROLL_MULTIPLIER = 5; // 500vh total scroll distance

function frameSrc(index: number): string {
  const n = String(index + 1).padStart(3, '0');
  return `/images/hero-frames/ezgif-frame-${n}.jpg`;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function CinematicHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const [loadProgress, setLoadProgress] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // ─── Preload all frames ──────────────────────────────────────────────────
  useEffect(() => {
    let loaded = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new window.Image();
      img.src = frameSrc(i);
      img.onload = () => {
        loaded++;
        setLoadProgress(Math.round((loaded / TOTAL_FRAMES) * 100));
        // Draw first frame as soon as it loads
        if (i === 0 && canvasRef.current) {
          drawFrame(canvasRef.current, img);
        }
      };
      images[i] = img;
    }

    imagesRef.current = images;

    return () => {
      images.forEach((img) => {
        img.onload = null;
      });
    };
  }, []);

  // ─── Scroll → frame mapping ──────────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight;
      const viewportHeight = window.innerHeight;

      // Progress from 0 to 1 across the sticky scroll zone
      const scrolled = -rect.top;
      const scrollable = containerHeight - viewportHeight;
      const progress = Math.max(0, Math.min(1, scrolled / scrollable));

      setScrollProgress(progress);

      const targetFrame = Math.min(
        Math.floor(progress * (TOTAL_FRAMES - 1)),
        TOTAL_FRAMES - 1,
      );

      if (targetFrame !== frameRef.current) {
        frameRef.current = targetFrame;
        scheduleRender(targetFrame);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initial
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ─── Canvas resize ───────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const setSize = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      // Re-draw current frame on resize
      const img = imagesRef.current[frameRef.current];
      if (img?.complete) drawFrame(canvas, img);
    };

    setSize();
    window.addEventListener('resize', setSize, { passive: true });
    return () => window.removeEventListener('resize', setSize);
  }, []);

  // ─── Render helpers ──────────────────────────────────────────────────────
  function scheduleRender(frameIndex: number) {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const canvas = canvasRef.current;
      const img = imagesRef.current[frameIndex];
      if (canvas && img?.complete) {
        drawFrame(canvas, img);
      }
    });
  }

  // ─── Typography opacity helpers ──────────────────────────────────────────
  // Sections: 0–25% dark reveal | 25–55% title | 55–80% subtitle | 80–100% CTA
  const titleOpacity = fadeIn(scrollProgress, 0.18, 0.42);
  const subtitleOpacity = fadeIn(scrollProgress, 0.48, 0.68);
  const ctaOpacity = fadeIn(scrollProgress, 0.72, 0.88);
  const scrollHintOpacity = 1 - fadeIn(scrollProgress, 0.05, 0.18);

  return (
    <section
      id="cinematic-hero"
      ref={containerRef}
      style={{
        position: 'relative',
        height: `${SCROLL_MULTIPLIER * 100}vh`,
        background: '#060606',
      }}
    >
      {/* ── Sticky viewport ─────────────────────────────────────── */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
          background: '#060606',
        }}
      >
        {/* Canvas — full-bleed frame sequence */}
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            display: 'block',
          }}
        />

        {/* Subtle vignette to blend edges */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: `
              radial-gradient(ellipse 100% 100% at 50% 50%,
                transparent 60%,
                rgba(6,6,6,0.55) 100%)
            `,
            pointerEvents: 'none',
          }}
        />

        {/* Bottom fade — seamlessly merges canvas into page background */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '28vh',
            background: 'linear-gradient(to bottom, transparent, #060606)',
            pointerEvents: 'none',
          }}
        />

        {/* ── Loading overlay ─────────────────────────────────────── */}
        {loadProgress < 100 && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#060606',
              zIndex: 10,
              gap: '1.2rem',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-playfair), serif',
                fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
                color: 'rgba(212,175,55,0.7)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}
            >
              Cine Classic Studios
            </div>
            <div
              style={{
                width: '200px',
                height: '1px',
                background: 'rgba(255,255,255,0.08)',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '1px',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: `${loadProgress}%`,
                  background: 'linear-gradient(90deg, rgba(212,175,55,0.4), rgba(212,175,55,0.9))',
                  transition: 'width 0.3s ease',
                  borderRadius: '1px',
                }}
              />
            </div>
            <div
              style={{
                fontSize: '0.72rem',
                color: 'rgba(255,255,255,0.3)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}
            >
              {loadProgress}%
            </div>
          </div>
        )}

        {/* ── Typography overlay ──────────────────────────────────── */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingBottom: 'clamp(4rem, 8vh, 7rem)',
            paddingLeft: '5%',
            paddingRight: '5%',
            textAlign: 'center',
            pointerEvents: 'none',
          }}
        >
          {/* Studio eyebrow */}
          <div
            style={{
              opacity: titleOpacity,
              transform: `translateY(${(1 - titleOpacity) * 12}px)`,
              transition: 'none',
              marginBottom: '0.75rem',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                fontSize: 'clamp(0.6rem, 1vw, 0.72rem)',
                fontWeight: 700,
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: 'rgba(212,175,55,0.85)',
              }}
            >
              Est. Mumbai · Premium Film Studio
            </span>
          </div>

          {/* Main headline */}
          <h1
            style={{
              opacity: titleOpacity,
              transform: `translateY(${(1 - titleOpacity) * 18}px)`,
              transition: 'none',
              fontFamily: 'var(--font-playfair), serif',
              fontSize: 'clamp(2.8rem, 6.5vw, 5.8rem)',
              fontWeight: 700,
              lineHeight: 1.0,
              letterSpacing: '-0.02em',
              color: '#ffffff',
              margin: '0 0 0.55rem',
              textWrap: 'balance',
            }}
          >
            Cine Classic{' '}
            <em
              style={{
                fontStyle: 'normal',
                background:
                  'linear-gradient(135deg, #D4AF37 0%, #F5E27A 50%, #D4AF37 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Studios
            </em>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              opacity: subtitleOpacity,
              transform: `translateY(${(1 - subtitleOpacity) * 14}px)`,
              transition: 'none',
              fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.68)',
              letterSpacing: '0.04em',
              lineHeight: 1.65,
              maxWidth: '520px',
              margin: '0 auto 1.8rem',
              textWrap: 'balance',
            }}
          >
            Where cinematic worlds come to life.
          </p>

          {/* CTA row */}
          <div
            style={{
              opacity: ctaOpacity,
              transform: `translateY(${(1 - ctaOpacity) * 10}px)`,
              transition: 'none',
              display: 'flex',
              gap: '0.9rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
              pointerEvents: ctaOpacity > 0.1 ? 'auto' : 'none',
            }}
          >
            <a
              href="#booking"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'linear-gradient(135deg, #D4AF37, #B8962B)',
                color: '#060606',
                padding: '13px 28px',
                borderRadius: '100px',
                fontSize: '0.82rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                boxShadow: '0 8px 32px rgba(212,175,55,0.3)',
              }}
            >
              Book a Recce
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <a
              href="#sets"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '13px 28px',
                borderRadius: '100px',
                fontSize: '0.82rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.85)',
                border: '1px solid rgba(255,255,255,0.18)',
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(8px)',
                textDecoration: 'none',
              }}
            >
              Explore Sets
            </a>
          </div>
        </div>

        {/* ── Scroll indicator ────────────────────────────────────── */}
        <div
          style={{
            position: 'absolute',
            bottom: 'clamp(1.5rem, 3vh, 2.5rem)',
            left: '50%',
            transform: 'translateX(-50%)',
            opacity: scrollHintOpacity,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.45rem',
            pointerEvents: 'none',
          }}
        >
          <span
            style={{
              fontSize: '0.62rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.38)',
            }}
          >
            Scroll
          </span>
          <div
            style={{
              width: '1px',
              height: '42px',
              background: 'rgba(212,175,55,0.3)',
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '1px',
            }}
          >
            <div
              style={{
                position: 'absolute',
                width: '100%',
                height: '40%',
                background: 'rgba(212,175,55,0.9)',
                borderRadius: '1px',
                animation: 'scroll-line 1.8s cubic-bezier(0.22,1,0.36,1) infinite',
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll-line {
          0%   { top: -40%; }
          100% { top: 140%; }
        }
      `}</style>
    </section>
  );
}

// ─── Utility: draw image cover-fit to canvas ──────────────────────────────────
function drawFrame(canvas: HTMLCanvasElement, img: HTMLImageElement) {
  const ctx = canvas.getContext('2d');
  if (!ctx || !img.naturalWidth) return;

  const cw = canvas.width;
  const ch = canvas.height;
  const iw = img.naturalWidth;
  const ih = img.naturalHeight;

  const scale = Math.max(cw / iw, ch / ih);
  const dw = iw * scale;
  const dh = ih * scale;
  const dx = (cw - dw) / 2;
  const dy = (ch - dh) / 2;

  ctx.clearRect(0, 0, cw, ch);
  ctx.drawImage(img, dx, dy, dw, dh);
}

// ─── Utility: smooth fade between two progress thresholds ────────────────────
function fadeIn(progress: number, start: number, end: number): number {
  if (progress <= start) return 0;
  if (progress >= end) return 1;
  const t = (progress - start) / (end - start);
  // Ease-out cubic
  return 1 - Math.pow(1 - t, 3);
}
