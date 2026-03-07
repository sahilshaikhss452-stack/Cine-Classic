'use client';

import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

export default function Hero() {
  const [videoFailed, setVideoFailed] = useState(false);
  const videoRef       = useRef<HTMLVideoElement>(null);
  const sectionRef     = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  /* Track hero section scroll progress (0 = top of section at top of
     viewport, 1 = bottom of section at top of viewport). */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  /* Background slides down 20 % of its own height as the section scrolls
     out — body bg (#060606) is the same dark colour so any edge gap is
     invisible, keeping the effect seamless. */
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <section
      ref={sectionRef}
      id="home"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* ── Parallax background container ────────────────────── */}
      {/* Slightly taller than the section so parallax never exposes a gap */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: 0, right: 0,
          top: '-8%', height: '116%',
          y: shouldReduceMotion ? 0 : bgY,
        }}
      >
        {/* Fallback gradient — always present underneath the video */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `
            radial-gradient(ellipse 70% 60% at 50% 30%, rgba(212,175,55,0.12) 0%, transparent 55%),
            radial-gradient(ellipse 40% 40% at 20% 80%, rgba(212,175,55,0.06) 0%, transparent 50%),
            radial-gradient(ellipse 30% 30% at 80% 70%, rgba(212,175,55,0.04) 0%, transparent 50%),
            linear-gradient(160deg, #080808 0%, #060606 100%)
          `,
        }} />

        {/* Video background — place hero.mp4 in /public/videos/ */}
        {!videoFailed && (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            onError={() => setVideoFailed(true)}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.45,
            }}
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
            <source src="/videos/hero.webm" type="video/webm" />
          </video>
        )}
      </motion.div>

      {/* Dark gradient overlay — no parallax, always ensures text legibility */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(6,6,6,0.92) 0%, rgba(6,6,6,0.55) 45%, rgba(6,6,6,0.35) 100%)',
      }} />

      {/* Subtle gold grid overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          linear-gradient(rgba(212,175,55,0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(212,175,55,0.025) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px',
        maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 20%, transparent 70%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 20%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* ── Hero content ──────────────────────────────────────── */}
      <div
        className="hero-content-wrap"
        style={{
          position: 'relative',
          textAlign: 'center',
          maxWidth: '900px',
          padding: '140px 5% 100px',
          width: '100%',
          margin: '0 auto',
        }}>

        {/* Live badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.22em',
          textTransform: 'uppercase', color: 'var(--gold)',
          background: 'rgba(212,175,55,0.08)',
          border: '1px solid rgba(212,175,55,0.22)',
          padding: '8px 22px', borderRadius: '100px', marginBottom: '2.2rem',
        }}>
          <span style={{
            width: '6px', height: '6px',
            background: 'var(--gold)', borderRadius: '50%',
            animation: 'pulse-dot 2s ease-in-out infinite',
            flexShrink: 0,
          }} />
          Mumbai's Premier Film Studio
        </div>

        {/* Main headline */}
        <h1 style={{
          fontSize: 'clamp(2.8rem, 6.5vw, 5.2rem)',
          lineHeight: 1.05,
          fontWeight: 800,
          letterSpacing: '-0.025em',
          color: 'var(--white)',
          marginBottom: '1.4rem',
        }}>
          Cine Classic<br />
          <em style={{
            fontStyle: 'normal',
            background: 'linear-gradient(135deg, var(--gold) 0%, var(--gold-lt) 50%, var(--gold) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Studios
          </em>
        </h1>

        {/* Subheadline */}
        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.2rem)',
          color: 'rgba(255,255,255,0.72)',
          maxWidth: '560px',
          margin: '0 auto 2.8rem',
          fontWeight: 300,
          lineHeight: 1.65,
          letterSpacing: '0.01em',
        }}>
          Premium Film &amp; Television Production Studios
        </p>

        {/* CTAs */}
        <div
          className="hero-cta-group"
          style={{
            display: 'flex', gap: '1rem',
            justifyContent: 'center', flexWrap: 'wrap',
          }}>
          <a href="#sets" className="btn-primary" style={{ fontSize: '1rem', padding: '14px 32px' }}>
            Explore Studios →
          </a>
          <a href="#booking" className="btn-outline" style={{ fontSize: '1rem', padding: '14px 32px' }}>
            Reserve Studio
          </a>
        </div>

        {/* Stats strip */}
        <div
          className="hero-stats-strip"
          style={{
            display: 'flex', justifyContent: 'center',
            gap: '3rem', marginTop: '5.5rem', flexWrap: 'wrap',
          }}>
          {[
            { number: '9',    label: 'Unique Sets' },
            { number: '4K',   label: 'Camera Ready' },
            { number: '24/7', label: 'Availability' },
            { number: '100%', label: 'Satisfaction' },
          ].map((s, i) => (
            <div key={s.label} style={{ textAlign: 'center', position: 'relative' }}>
              {i > 0 && (
                <span style={{
                  position: 'absolute', left: '-1.5rem', top: '50%',
                  transform: 'translateY(-50%)',
                  width: '1px', height: '32px',
                  background: 'rgba(212,175,55,0.15)',
                }} />
              )}
              <div style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: '2.4rem', fontWeight: 800,
                color: 'var(--gold)', lineHeight: 1,
                letterSpacing: '-0.02em',
              }}>{s.number}</div>
              <div style={{
                fontSize: '0.72rem', letterSpacing: '0.12em',
                textTransform: 'uppercase', color: 'var(--gray)', marginTop: '8px',
              }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
      `}</style>
    </section>
  );
}
