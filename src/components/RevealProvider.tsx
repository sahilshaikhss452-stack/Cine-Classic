'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';

/** Mounted once at the page level – registers the IntersectionObserver
 *  that drives every `.reveal` element on the page. */
export default function RevealProvider() {
  useScrollReveal();
  return null;
}
