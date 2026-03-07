'use client';
/**
 * template.tsx — Next.js App Router re-mounts this on every navigation,
 * giving us a true page transition wrapper.
 */
import { motion } from 'framer-motion';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.99 }}
      animate={{ opacity: 1, y: 0,  scale: 1    }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
