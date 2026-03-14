'use client';

import { useEffect, useRef, useState } from 'react';

// ─── Constants ────────────────────────────────────────────────────────────────
const TOTAL_FRAMES = 192;
const SCROLL_MULTIPLIER = 5; // 500vh total scroll distance

function frameSrc(index: number): string {
  const n = String(index + 1).padStart(4, '0');
  return `/images/hero-frames/frame_${n}.jpg`;
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

  // ─── Scroll hint opacity ─────────────────────────────────────────────────
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
