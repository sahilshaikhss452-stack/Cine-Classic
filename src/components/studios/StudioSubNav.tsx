'use client';

import { useEffect, useMemo, useState } from 'react';

type NavItem = {
  label: string;
  href: '#gallery' | '#details' | '#booking';
  cta?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  { label: 'Gallery', href: '#gallery' },
  { label: 'Specs', href: '#details' },
  { label: 'Book', href: '#booking', cta: true },
] as const;

export default function StudioSubNav() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState('');

  const sectionIds = useMemo(
    () => NAV_ITEMS.map((item) => item.href.replace('#', '')).filter((id) => id !== 'booking'),
    [],
  );

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 300);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const targets = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: '-28% 0px -60% 0px' },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [sectionIds]);

  function handleClick(event: React.MouseEvent<HTMLAnchorElement>, href: string) {
    event.preventDefault();
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (!element) {
      return;
    }

    const offset = 84;
    const top = element.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  return (
    <nav
      aria-label="Studio page sections"
      style={{
        position: 'fixed',
        top: visible ? '60px' : '-84px',
        left: 0,
        right: 0,
        zIndex: 90,
        width: '100%',
        maxWidth: '100vw',
        background: 'rgba(10,10,10,0.9)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        transition: 'top 0.35s cubic-bezier(0.22,1,0.36,1)',
      }}
    >
      <div className="studio-subnav__track">
        {NAV_ITEMS.map((item) => {
          const id = item.href.replace('#', '');
          const isActive = active === id;

          if (item.cta) {
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(event) => handleClick(event, item.href)}
                className="studio-subnav__cta"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '6px 16px',
                  background: 'var(--gold)',
                  borderRadius: '999px',
                  color: 'var(--dark)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  marginLeft: 'auto',
                }}
              >
                {item.label}
              </a>
            );
          }

          return (
            <a
              key={item.href}
              href={item.href}
              onClick={(event) => handleClick(event, item.href)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '0.72rem',
                fontWeight: isActive ? 600 : 500,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: isActive ? 'var(--gold)' : 'var(--gray)',
                background: isActive ? 'rgba(212,175,55,0.08)' : 'transparent',
                textDecoration: 'none',
                transition: 'all 0.25s ease',
                whiteSpace: 'nowrap',
                border: isActive ? '1px solid rgba(212,175,55,0.3)' : '1px solid transparent',
                flexShrink: 0,
              }}
            >
              {item.label}
            </a>
          );
        })}
      </div>

      <style>{`
        .studio-subnav__track {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 5%;
          height: 46px;
          display: flex;
          align-items: center;
          gap: 0.35rem;
          min-width: 0;
        }

        @media (max-width: 900px) {
          .studio-subnav__track {
            overflow-x: auto;
            overflow-y: hidden;
            scrollbar-width: none;
            -webkit-overflow-scrolling: touch;
            justify-content: flex-start;
            padding-right: calc(5% + 0.75rem);
          }

          .studio-subnav__track::-webkit-scrollbar {
            display: none;
          }

          .studio-subnav__cta {
            margin-left: 0 !important;
          }
        }
      `}</style>
    </nav>
  );
}

