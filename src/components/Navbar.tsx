'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Hash links for the homepage
const HOME_LINKS = [
  { href: '#about',        label: 'About' },
  { href: '#sets',         label: 'Our Sets' },
  { href: '#gallery',      label: 'Gallery' },
  { href: '#pricing',      label: 'Pricing' },
  { href: '#testimonials', label: 'Reviews' },
];

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeId,   setActiveId]   = useState('home');
  const pathname = usePathname();
  const isHome = pathname === '/';

  /* ── Scroll effect ─────────────────────────────── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Active section tracking (homepage only) ──── */
  useEffect(() => {
    if (!isHome) return;
    const sections = document.querySelectorAll<HTMLElement>('section[id]');
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActiveId(e.target.id); }); },
      { threshold: 0.3 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [isHome]);

  const closeMenu = () => setMobileOpen(false);

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

  const isStudiosActive = pathname.startsWith('/studios');

  return (
    <>
      <nav
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
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
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', whiteSpace: 'nowrap', textDecoration: 'none' }}>
          <Image
            src="/images/logo.jpg"
            alt="Cine Classic Studios Logo"
            width={44} height={44}
            style={{ borderRadius: '4px', objectFit: 'contain' }}
            priority
          />
          <div style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '1.2rem', fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.02em', lineHeight: 1.2 }}>
            Cine Classic<br />
            <span style={{ color: 'var(--white2)', fontWeight: 500 }}>Studios</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <ul className="nav-desktop" style={{ alignItems: 'center', gap: '2rem', listStyle: 'none', margin: 0, padding: 0 }}>

          {/* Home */}
          <li>
            <Link href="/" style={linkStyle(isHome && activeId === 'home')}>
              Home
              {isHome && activeId === 'home' && <ActiveBar />}
            </Link>
          </li>

          {/* Hash links (home page sections) */}
          {HOME_LINKS.map(({ href, label }) => (
            <li key={href}>
              <a href={isHome ? href : `/${href}`} style={linkStyle(isHome && activeId === href.slice(1))}>
                {label}
                {isHome && activeId === href.slice(1) && <ActiveBar />}
              </a>
            </li>
          ))}

          {/* Studios page link */}
          <li>
            <Link href="/studios" style={linkStyle(isStudiosActive)}>
              Studios
              {isStudiosActive && <ActiveBar />}
            </Link>
          </li>

          {/* Book Now CTA */}
          <li>
            <a
              href={isHome ? '#booking' : '/#booking'}
              style={{
                background: 'var(--gold)', color: 'var(--dark)',
                padding: '10px 22px', borderRadius: '100px',
                fontSize: '0.9rem', fontWeight: 500, letterSpacing: '0.01em',
                boxShadow: '0 2px 12px rgba(212,175,55,0.25)',
                transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
                display: 'inline-block',
                textDecoration: 'none',
              }}
            >
              Book Now
            </a>
          </li>
        </ul>

        {/* Hamburger */}
        <button
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((v) => !v)}
          className="nav-hamburger"
          style={{ flexDirection: 'column', gap: '5px', cursor: 'pointer', padding: '4px', background: 'none', border: 'none' }}
        >
          {[0, 1, 2].map((i) => (
            <span key={i} style={{
              display: 'block', width: '22px', height: '2px',
              background: 'var(--white)', borderRadius: '2px',
              transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
              transform: mobileOpen
                ? i === 0 ? 'rotate(45deg) translate(5px,5px)'
                : i === 2 ? 'rotate(-45deg) translate(5px,-5px)'
                : 'scaleX(0)'
                : 'none',
            }} />
          ))}
        </button>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div style={{
          position: 'fixed', top: '76px', left: 0, right: 0, bottom: 0,
          background: 'rgba(6,6,6,0.98)', backdropFilter: 'blur(24px)',
          zIndex: 999, padding: '2rem 5%',
          display: 'flex', flexDirection: 'column',
        }}>
          <Link href="/"         onClick={closeMenu} style={mobileLinkStyle}>Home</Link>
          <a href={isHome ? '#about'        : '/#about'}        onClick={closeMenu} style={mobileLinkStyle}>About</a>
          <a href={isHome ? '#sets'         : '/#sets'}         onClick={closeMenu} style={mobileLinkStyle}>Our Sets</a>
          <a href={isHome ? '#gallery'      : '/#gallery'}      onClick={closeMenu} style={mobileLinkStyle}>Gallery</a>
          <a href={isHome ? '#pricing'      : '/#pricing'}      onClick={closeMenu} style={mobileLinkStyle}>Pricing</a>
          <a href={isHome ? '#testimonials' : '/#testimonials'} onClick={closeMenu} style={mobileLinkStyle}>Reviews</a>
          <Link href="/studios"  onClick={closeMenu} style={{ ...mobileLinkStyle, color: 'var(--gold)' }}>Studios</Link>
          <a href={isHome ? '#booking' : '/#booking'} onClick={closeMenu} style={{ ...mobileLinkStyle, color: 'var(--gold)' }}>Book Now</a>
        </div>
      )}
    </>
  );
}

function ActiveBar() {
  return (
    <span style={{
      position: 'absolute', bottom: '-2px', left: 0,
      width: '100%', height: '2px',
      background: 'var(--gold)', borderRadius: '1px',
    }} />
  );
}

const mobileLinkStyle: React.CSSProperties = {
  fontSize: '1rem', fontWeight: 500,
  letterSpacing: '0.06em', textTransform: 'uppercase',
  color: 'var(--gray)',
  padding: '1rem 0',
  borderBottom: '1px solid rgba(255,255,255,0.06)',
  transition: 'color 0.4s',
  textDecoration: 'none',
  display: 'block',
};
