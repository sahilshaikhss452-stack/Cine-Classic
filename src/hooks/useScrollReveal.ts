'use client';

import { useEffect } from 'react';

export function useScrollReveal() {
  useEffect(() => {
    const root = document.documentElement;
    const elements = Array.from(document.querySelectorAll('.reveal'));
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      elements.forEach((element) => element.classList.add('visible'));
      return;
    }

    elements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight - 40 && rect.bottom > 0) {
        element.classList.add('visible');
      }
    });
    root.classList.add('motion-ready');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      root.classList.remove('motion-ready');
    };
  }, []);
}
