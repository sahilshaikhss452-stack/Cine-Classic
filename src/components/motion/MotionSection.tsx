'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ReactNode, CSSProperties } from 'react';

interface MotionSectionProps {
  children: ReactNode;
  /** Optional entrance delay in seconds — use for visual hierarchy (default 0) */
  delay?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * Wraps a page section with a cinematic fade-in + slide-up animation as it
 * enters the viewport (Apple-style scroll reveal). Renders without any wrapper
 * div when prefers-reduced-motion is active.
 */
export default function MotionSection({
  children,
  delay = 0,
  className,
  style,
}: MotionSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  /* Respect the user's accessibility preference — no animation wrapper */
  if (shouldReduceMotion) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      style={{ width: '100%', ...style }}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.75,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
