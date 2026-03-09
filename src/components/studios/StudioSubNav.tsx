'use client';

/**
 * StudioSubNav — sticky in-page section navigation for studio landing pages.
 *
 * Appears after the user scrolls past the hero (300px), then sticks below
 * the main Navbar. Active section is highlighted via IntersectionObserver.
 *
 * Sections: Gallery · Layout · Specs · Book
 */

import { useState, useEffect } from 'react';

const NAV_ITEMS = [
  { label: 'Gallery',  href: '#gallery'  },
  { label: 'Layout',   href: '#set-layout' },
  { label: 'Specs',    href: '#details'  },
  { label: 'Book',     href: '#booking',  cta: true },
];

const SECTION_IDS = NAV_ITEMS.map((n) => n.href.replace('#', ''));

export default function StudioSubNav() {
  const [visible, setVisible]   = useState(false);
  const [active,  setActive]    = useState('');

  /* Show subnav after scrolling 300px past page top */
  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 300);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Track which section is in view */
  useEffect(() => {
    const targets = SECTION_IDS
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault();
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      const offset = 80; // account for sticky navbar height
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }

  return (
    <nav
      aria-label="Page sections"
      style={{
        position: 'fixed',
        top: visible ? '60px' : '-80px', // slides down from under Navbar
        left: 0, right: 0,
        zIndex: 90,
        background: 'rgba(10,10,10,0.9)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        transition: 'top 0.35s cubic-bezier(0.22,1,0.36,1)',
      }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 5%',
        display: 'flex',
        alignItems: 'center',
        gap: '0.25rem',
        height: '44px',
      }}>
        {NAV_ITEMS.map((item) => {
          const isActive = active === item.href.replace('#', '');
          if (item.cta) {
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                style={{
                  marginLeft: 'auto',
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '6px 18px',
                  background: 'var(--gold)',
                  borderRadius: '100px',
                  color: 'var(--dark)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  transition: 'all 0.3s',
                  whiteSpace: 'nowrap',
                }}
              >
                {item.label} →
              </a>
            );
          }
          return (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleClick(e, item.href)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '0.72rem',
                fontWeight: isActive ? 600 : 400,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: isActive ? 'var(--gold)' : 'var(--gray)',
                background: isActive ? 'rgba(212,175,55,0.08)' : 'transparent',
                textDecoration: 'none',
                transition: 'all 0.25s',
                whiteSpace: 'nowrap',
                borderBottom: isActive
                  ? '1px solid rgba(212,175,55,0.35)'
                  : '1px solid transparent',
              }}
            >
              {item.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
