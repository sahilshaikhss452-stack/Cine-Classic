'use client';

import type { CSSProperties } from 'react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRightIcon } from '@/components/ui/icons';

const NAV_ITEMS = [
  {
    label: 'Studios',
    homeHref: '#sets',
    awayHref: '/studios',
    sectionId: 'sets',
    matchesPath: (pathname: string) => pathname.startsWith('/studios'),
  },
  {
    label: 'Productions',
    homeHref: '#productions',
    awayHref: '/portfolio',
    sectionId: 'productions',
    matchesPath: (pathname: string) => pathname.startsWith('/portfolio'),
  },
  {
    label: 'Map',
    homeHref: '#map',
    awayHref: '/#map',
    sectionId: 'map',
    matchesPath: () => false,
  },
  {
    label: 'About',
    homeHref: '/about',
    awayHref: '/about',
    sectionId: 'about',
    matchesPath: (pathname: string) => pathname.startsWith('/about'),
  },
] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeId, setActiveId] = useState('home');
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;

    const sections = ['home', ...NAV_ITEMS.map((item) => item.sectionId)]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section instanceof HTMLElement);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { threshold: 0.35 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = mobileOpen ? 'hidden' : previousOverflow;

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  const closeMenu = () => setMobileOpen(false);

  const linkStyle = (active: boolean): CSSProperties => ({
    fontSize: '0.84rem',
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: active ? 'var(--white)' : 'var(--gray)',
    transition: 'color 0.4s cubic-bezier(0.22,1,0.36,1)',
    position: 'relative',
    paddingBottom: '6px',
    textDecoration: 'none',
  });

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 5%',
          height: scrolled ? '64px' : '76px',
          background: scrolled ? 'rgba(6,6,6,0.96)' : 'rgba(6,6,6,0.82)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          boxShadow: scrolled ? '0 10px 40px rgba(0,0,0,0.34)' : 'none',
          transition:
            'height 0.4s cubic-bezier(0.22,1,0.36,1), background 0.4s cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.85rem',
            whiteSpace: 'nowrap',
            textDecoration: 'none',
          }}
        >
          <Image
            src="/images/logo.jpg"
            alt="Cine Classic Studios Logo"
            width={44}
            height={44}
            style={{ borderRadius: '8px', objectFit: 'contain', boxShadow: '0 10px 28px rgba(0,0,0,0.22)' }}
            priority
          />
          <div>
            <div
              style={{
                fontFamily: 'var(--font-playfair), serif',
                fontSize: '1.2rem',
                fontWeight: 700,
                color: 'var(--gold)',
                letterSpacing: '0.01em',
                lineHeight: 1.1,
              }}
            >
              Cine Classic
            </div>
            <div
              style={{
                color: 'rgba(255,255,255,0.68)',
                fontSize: '0.72rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
              }}
            >
              Mumbai Film Sets
            </div>
          </div>
        </Link>

        <ul
          className="nav-desktop"
          style={{ alignItems: 'center', gap: '1.55rem', listStyle: 'none', margin: 0, padding: 0 }}
        >
          {NAV_ITEMS.map((item) => {
            const isActive = isHome ? activeId === item.sectionId : item.matchesPath(pathname);

            return (
              <li key={item.label}>
                <a href={isHome ? item.homeHref : item.awayHref} style={linkStyle(isActive)}>
                  {item.label}
                  {isActive && <ActiveBar />}
                </a>
              </li>
            );
          })}

          <li>
            <a
              href={isHome ? '#booking' : '/#booking'}
              style={{
                background: 'var(--gold)',
                color: 'var(--dark)',
                padding: '11px 18px',
                borderRadius: '100px',
                fontSize: '0.83rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                boxShadow: '0 8px 24px rgba(212,175,55,0.24)',
                transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                textDecoration: 'none',
              }}
            >
              Check Availability
              <ArrowRightIcon size={15} />
            </a>
          </li>
        </ul>

        <button
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((value) => !value)}
          className="nav-hamburger"
          style={{ flexDirection: 'column', gap: '5px', cursor: 'pointer', padding: '4px', background: 'none', border: 'none' }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: 'block',
                width: '22px',
                height: '2px',
                background: 'var(--white)',
                borderRadius: '2px',
                transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
                transform: mobileOpen
                  ? i === 0
                    ? 'rotate(45deg) translate(5px,5px)'
                    : i === 2
                      ? 'rotate(-45deg) translate(5px,-5px)'
                      : 'scaleX(0)'
                  : 'none',
              }}
            />
          ))}
        </button>
      </nav>

      {mobileOpen && (
        <div
          style={{
            position: 'fixed',
            top: scrolled ? '64px' : '76px',
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(6,6,6,0.98)',
            backdropFilter: 'blur(24px)',
            zIndex: 999,
            padding: '2rem 5%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              marginBottom: '1.5rem',
              padding: '1rem 1.05rem',
              borderRadius: '18px',
              background: 'rgba(212,175,55,0.06)',
              border: '1px solid rgba(212,175,55,0.14)',
              color: 'var(--gray-lt)',
              lineHeight: 1.7,
            }}
          >
            Browse the sets, understand how the studio supports production teams, and send one inquiry when you are ready to hold dates.
          </div>

          {NAV_ITEMS.map((item) => {
            const isActive = isHome ? activeId === item.sectionId : item.matchesPath(pathname);

            return (
              <a
                key={item.label}
                href={isHome ? item.homeHref : item.awayHref}
                onClick={closeMenu}
                style={{
                  ...mobileLinkStyle,
                  color: isActive ? 'var(--white)' : mobileLinkStyle.color,
                }}
              >
                {item.label}
              </a>
            );
          })}

          <a
            href={isHome ? '#booking' : '/#booking'}
            onClick={closeMenu}
            style={{
              ...mobileLinkStyle,
              color: 'var(--dark)',
              background: 'var(--gold)',
              borderRadius: '999px',
              padding: '1rem 1.2rem',
              marginTop: '1rem',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              borderBottom: 'none',
            }}
          >
            Check Availability
            <ArrowRightIcon size={16} />
          </a>
        </div>
      )}
    </>
  );
}

function ActiveBar() {
  return (
    <span
      style={{
        position: 'absolute',
        bottom: '-2px',
        left: 0,
        width: '100%',
        height: '2px',
        background: 'var(--gold)',
        borderRadius: '1px',
      }}
    />
  );
}

const mobileLinkStyle: CSSProperties = {
  fontSize: '0.92rem',
  fontWeight: 600,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'var(--gray)',
  padding: '1rem 0',
  borderBottom: '1px solid rgba(255,255,255,0.06)',
  transition: 'color 0.4s',
  textDecoration: 'none',
  display: 'block',
};

