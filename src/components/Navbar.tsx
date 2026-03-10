'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRightIcon } from '@/components/ui/icons';

const HOME_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#sets', label: 'Studios' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#testimonials', label: 'Reviews' },
];

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
    const sections = document.querySelectorAll<HTMLElement>('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { threshold: 0.3 },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const closeMenu = () => setMobileOpen(false);
  const isStudiosActive = pathname.startsWith('/studios');

  const linkStyle = (active: boolean): React.CSSProperties => ({
    fontSize: '0.88rem',
    fontWeight: 500,
    letterSpacing: '0.01em',
    color: active ? 'var(--white)' : 'var(--gray)',
    transition: 'color 0.4s cubic-bezier(0.22,1,0.36,1)',
    position: 'relative',
    paddingBottom: '4px',
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
          background: scrolled ? 'rgba(6,6,6,0.95)' : 'rgba(6,6,6,0.8)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          boxShadow: scrolled ? '0 1px 40px rgba(0,0,0,0.5)' : 'none',
          transition: 'height 0.4s cubic-bezier(0.22,1,0.36,1), background 0.4s cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', whiteSpace: 'nowrap', textDecoration: 'none' }}>
          <Image
            src="/images/logo.jpg"
            alt="Cine Classic Studios Logo"
            width={44}
            height={44}
            style={{ borderRadius: '6px', objectFit: 'contain' }}
            priority
          />
          <div>
            <div style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '1.2rem', fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.02em', lineHeight: 1.1 }}>
              Cine Classic
            </div>
            <div style={{ color: 'var(--white2)', fontSize: '0.74rem', letterSpacing: '0.16em', textTransform: 'uppercase' }}>
              Mumbai Film Sets
            </div>
          </div>
        </Link>

        <ul className="nav-desktop" style={{ alignItems: 'center', gap: '2rem', listStyle: 'none', margin: 0, padding: 0 }}>
          <li>
            <Link href="/" style={linkStyle(isHome && activeId === 'home')}>
              Home
              {isHome && activeId === 'home' && <ActiveBar />}
            </Link>
          </li>

          {HOME_LINKS.map(({ href, label }) => (
            <li key={href}>
              <a href={isHome ? href : `/${href}`} style={linkStyle(isHome && activeId === href.slice(1))}>
                {label}
                {isHome && activeId === href.slice(1) && <ActiveBar />}
              </a>
            </li>
          ))}

          <li>
            <Link href="/studios" style={linkStyle(isStudiosActive)}>
              All Studios
              {isStudiosActive && <ActiveBar />}
            </Link>
          </li>

          <li>
            <a
              href={isHome ? '#booking' : '/#booking'}
              style={{
                background: 'var(--gold)',
                color: 'var(--dark)',
                padding: '10px 18px',
                borderRadius: '100px',
                fontSize: '0.88rem',
                fontWeight: 700,
                letterSpacing: '0.01em',
                boxShadow: '0 2px 12px rgba(212,175,55,0.25)',
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
            top: '76px',
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
          <div style={{ marginBottom: '1.4rem', padding: '0.95rem 1rem', borderRadius: '16px', background: 'rgba(212,175,55,0.06)', border: '1px solid rgba(212,175,55,0.14)', color: 'var(--gray-lt)', lineHeight: 1.7 }}>
            Browse the sets, review the details, and send one inquiry when you are ready to confirm dates.
          </div>
          <Link href="/" onClick={closeMenu} style={mobileLinkStyle}>Home</Link>
          <a href={isHome ? '#about' : '/#about'} onClick={closeMenu} style={mobileLinkStyle}>About</a>
          <a href={isHome ? '#sets' : '/#sets'} onClick={closeMenu} style={mobileLinkStyle}>Studios</a>
          <a href={isHome ? '#gallery' : '/#gallery'} onClick={closeMenu} style={mobileLinkStyle}>Gallery</a>
          <a href={isHome ? '#testimonials' : '/#testimonials'} onClick={closeMenu} style={mobileLinkStyle}>Reviews</a>
          <Link href="/studios" onClick={closeMenu} style={{ ...mobileLinkStyle, color: 'var(--gold)' }}>All Studios</Link>
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

const mobileLinkStyle: React.CSSProperties = {
  fontSize: '0.98rem',
  fontWeight: 500,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: 'var(--gray)',
  padding: '1rem 0',
  borderBottom: '1px solid rgba(255,255,255,0.06)',
  transition: 'color 0.4s',
  textDecoration: 'none',
  display: 'block',
};
