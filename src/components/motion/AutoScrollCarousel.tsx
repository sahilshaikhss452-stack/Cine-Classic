import type { CSSProperties, ReactNode } from 'react';

interface ManualCarouselProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/**
 * Keeps the existing responsive horizontal rails while leaving movement under
 * the visitor's control. Production poster rails have their own accessible
 * autoplay and pause controls; general content rails should not move by
 * themselves.
 */
export default function AutoScrollCarousel({ children, className, style }: ManualCarouselProps) {
  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
}
