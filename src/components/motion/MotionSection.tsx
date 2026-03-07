'use client';

import { useRef, ReactNode, CSSProperties } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

interface MotionSectionProps {
  children: ReactNode;
  /** Optional entrance delay in seconds (default 0) */
  delay?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * Wraps a page section with a cinematic fade-in + slide-up animation as it
 * enters the viewport. Uses useInView (explicit hook) instead of whileInView
 * so the IntersectionObserver is wired directly to the ref — reliable in
 * Next.js App Router SSR environments. Respects prefers-reduced-motion.
 */
export default function MotionSection({
  children,
  delay = 0,
  className,
  style,
}: MotionSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  /* Trigger when element is 60px inside the viewport from the bottom.
     once:true means the animation only plays the first time. */
  const isInView = useInView(ref, {
    once: true,
    margin: '0px 0px -60px 0px',
  });

  /* Respect user's accessibility preference — plain div, no animation */
  if (shouldReduceMotion) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ width: '100%', ...style }}
      initial={{ opacity: 0, y: 44 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 44 }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
