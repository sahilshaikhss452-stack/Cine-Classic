'use client';

import { useRef, useEffect, ReactNode, CSSProperties } from 'react';

interface AutoScrollCarouselProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /**
   * Auto-scroll speed in pixels per requestAnimationFrame tick at 60 fps.
   * 0.5 px/frame ≈ 30 px/s — slow cinematic crawl (default).
   */
  speed?: number;
  /**
   * Milliseconds to wait after the user last interacts before resuming
   * auto-scroll (default 2500).
   */
  resumeDelay?: number;
}

/**
 * Wraps any horizontally-scrollable grid and adds a slow, looping
 * auto-scroll on mobile / tablet (< 1024 px). On desktop it is a
 * transparent pass-through — no layout change at all.
 *
 * Behaviour:
 *  • requestAnimationFrame loop — silky smooth, no jank.
 *  • IntersectionObserver — animation pauses when the section is
 *    off-screen, saving CPU on mobile.
 *  • Pauses instantly on touchstart / mousedown / wheel.
 *  • Resumes after `resumeDelay` ms of inactivity.
 *  • Loops: when scrollLeft reaches the end it resets to 0.
 */
export default function AutoScrollCarousel({
  children,
  className,
  style,
  speed = 0.5,
  resumeDelay = 2500,
}: AutoScrollCarouselProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    /* Capture as a non-nullable constant for inner function closures */
    const elem = el;

    let rafId: number;
    let paused  = false;
    let visible = false;
    let resumeTimer: ReturnType<typeof setTimeout>;

    /* Sub-pixel accumulator so fractional speeds don't stutter */
    let position = 0;

    /* Only auto-scroll below the Tailwind `lg` breakpoint (1024 px) */
    const isSmallScreen = () => window.innerWidth < 1024;

    /* ── IntersectionObserver — stop rAF work when off-screen ── */
    const observer = new IntersectionObserver(
      ([entry]) => { visible = entry.isIntersecting; },
      { threshold: 0.1 }
    );
    observer.observe(elem);

    /* ── Main animation loop ─────────────────────────────────── */
    function tick() {
      if (visible && !paused && isSmallScreen()) {
        const maxScroll = elem.scrollWidth - elem.clientWidth;
        if (maxScroll > 0) {
          position += speed;
          if (position >= maxScroll) position = 0; // seamless loop
          elem.scrollLeft = position;
        }
      }
      rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);

    /* ── Pause / resume on user interaction ─────────────────── */
    function pause() {
      paused   = true;
      position = elem.scrollLeft; // sync so resume continues from here
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => { paused = false; }, resumeDelay);
    }

    elem.addEventListener('touchstart',  pause, { passive: true });
    elem.addEventListener('touchmove',   pause, { passive: true });
    elem.addEventListener('touchend',    pause, { passive: true });
    elem.addEventListener('mousedown',   pause);
    elem.addEventListener('wheel',       pause, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(resumeTimer);
      observer.disconnect();
      elem.removeEventListener('touchstart',  pause);
      elem.removeEventListener('touchmove',   pause);
      elem.removeEventListener('touchend',    pause);
      elem.removeEventListener('mousedown',   pause);
      elem.removeEventListener('wheel',       pause);
    };
  }, [speed, resumeDelay]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
