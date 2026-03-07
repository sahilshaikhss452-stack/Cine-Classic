import Image from 'next/image';

const STUDIO_LINKS = [
  { label: 'Empty Floor (6,000 sq ft)',    href: '/studios/empty-floor' },
  { label: 'Market 1 — Period Bazaar',     href: '/studios/market-1' },
  { label: 'Market 2 — Urban Market',      href: '/studios/market-2' },
  { label: 'Market 7 — Large Scale Set',   href: '/studios/market-7' },
  { label: 'Chawl New — Mumbai Chawl',     href: '/studios/chawl-new' },
  { label: 'Court Set',                    href: '/studios/court-set' },
  { label: 'Hospital Set',                 href: '/studios/hospital-set' },
  { label: 'Police Station Set',           href: '/studios/police-station-set' },
  { label: 'Open Ground (2+ acres)',       href: '/studios/open-ground' },
];

const QUICK_LINKS = [
  { label: 'About Us',              href: '#about' },
  { label: 'Studio Facilities',     href: '/facilities' },
  { label: 'Portfolio',             href: '/portfolio' },
  { label: 'Client Reviews',        href: '#testimonials' },
  { label: 'Book a Studio',         href: '#booking' },
  { label: 'Film Studio Mumbai',    href: '/film-studio-rental-mumbai' },
  { label: 'Photoshoot Studio',     href: '/photoshoot-studio-mumbai' },
  { label: 'Music Video Location',  href: '/music-video-shoot-location' },
  { label: 'Ad Film Studio',        href: '/ad-film-studio' },
];

const CONTACT_INFO = [
  { icon: '📍', text: 'Film City Road, Goregaon East, Mumbai – 400 065' },
  { icon: '📞', text: '+91 98765 43210' },
  { icon: '✉️', text: 'bookings@cineclassicstudios.com' },
  { icon: '🕐', text: 'Open 24/7 · By Appointment' },
];

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--dark2)',
      position: 'relative',
      padding: '90px 5% 0',
    }}>
      {/* Gold top gradient line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, var(--gold), transparent)',
        opacity: 0.25,
      }} />

      {/* Main grid — responsive via .footer-grid-mob in globals.css */}
      <div className="footer-grid-mob">

        {/* Column 1 — Brand */}
        <div>
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.4rem', textDecoration: 'none' }}>
            <Image
              src="/images/logo.jpg"
              alt="Cine Classic Studios Logo"
              width={52}
              height={52}
              style={{ borderRadius: '6px', objectFit: 'contain' }}
            />
            <div>
              <div style={{
                fontFamily: 'var(--font-playfair), serif',
                fontSize: '1.05rem', fontWeight: 700,
                color: 'var(--gold)', letterSpacing: '0.02em', lineHeight: 1.2,
              }}>
                Cine Classic
              </div>
              <div style={{
                fontFamily: 'var(--font-playfair), serif',
                fontSize: '0.9rem', fontWeight: 500,
                color: 'var(--white2)', letterSpacing: '0.04em',
              }}>
                Studios
              </div>
            </div>
          </a>

          <p style={{
            fontSize: '0.86rem', color: 'var(--gray)',
            fontWeight: 300, lineHeight: 1.85,
            maxWidth: '290px', marginBottom: '2rem',
          }}>
            Mumbai&apos;s premier film and photoshoot studio complex. Nine fully-dressed sets, professional-grade infrastructure, and end-to-end production support.
          </p>

          {/* Social Links */}
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
            {/* Instagram */}
            <a
              href="https://www.instagram.com/cineclassicstudios"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              style={{
                width: '40px', height: '40px',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--gray)',
                transition: 'all 0.35s ease',
                fontSize: '1.1rem',
              }}
            >📸</a>
            {/* YouTube */}
            <a
              href="https://www.youtube.com/@cineclassicstudios"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              style={{
                width: '40px', height: '40px',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--gray)',
                transition: 'all 0.35s ease',
                fontSize: '1.1rem',
              }}
            >▶️</a>
            {/* WhatsApp */}
            <a
              href="https://wa.me/919876543210?text=Hi%2C%20I%27m%20interested%20in%20booking%20a%20studio%20at%20Cine%20Classic%20Studios."
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              style={{
                width: '40px', height: '40px',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--gray)',
                transition: 'all 0.35s ease',
                fontSize: '1.1rem',
              }}
            >💬</a>
          </div>

          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/919876543210?text=Hi%2C%20I%27d%20like%20to%20inquire%20about%20studio%20availability."
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center', gap: '0.5rem',
              padding: '10px 18px',
              background: '#25D366',
              color: '#fff',
              borderRadius: '100px',
              fontSize: '0.78rem',
              fontWeight: 600,
              textDecoration: 'none',
              letterSpacing: '0.04em',
              transition: 'all 0.35s ease',
            }}
          >
            💬 Chat on WhatsApp
          </a>
        </div>

        {/* Column 2 — Studio Spaces */}
        <div>
          <h4 style={{
            fontSize: '0.7rem', letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'var(--gold)',
            marginBottom: '1.4rem', fontWeight: 600,
          }}>
            Studio Spaces
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {STUDIO_LINKS.map(({ label, href }) => (
              <li key={label} style={{ marginBottom: '0.6rem' }}>
                <a href={href} style={{
                  fontSize: '0.85rem', color: 'var(--gray)',
                  transition: 'color 0.3s ease',
                  lineHeight: 1.5,
                  display: 'block',
                }}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 — Quick Links */}
        <div>
          <h4 style={{
            fontSize: '0.7rem', letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'var(--gold)',
            marginBottom: '1.4rem', fontWeight: 600,
          }}>
            Quick Links
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {QUICK_LINKS.map(({ label, href }) => (
              <li key={label} style={{ marginBottom: '0.6rem' }}>
                <a href={href} style={{
                  fontSize: '0.85rem', color: 'var(--gray)',
                  transition: 'color 0.3s ease',
                }}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4 — Contact */}
        <div>
          <h4 style={{
            fontSize: '0.7rem', letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'var(--gold)',
            marginBottom: '1.4rem', fontWeight: 600,
          }}>
            Contact Us
          </h4>

          {CONTACT_INFO.map(item => (
            <div key={item.icon} style={{
              display: 'flex', gap: '0.85rem',
              alignItems: 'flex-start',
              marginBottom: '1.1rem',
            }}>
              <span style={{ fontSize: '0.95rem', flexShrink: 0, marginTop: '1px' }}>{item.icon}</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--gray)', lineHeight: 1.6 }}>
                {item.text}
              </span>
            </div>
          ))}

          {/* Emergency booking note */}
          <div style={{
            marginTop: '1.8rem',
            padding: '1rem',
            background: 'rgba(212,175,55,0.05)',
            border: '1px solid rgba(212,175,55,0.12)',
            borderRadius: '8px',
          }}>
            <div style={{
              fontSize: '0.68rem', fontWeight: 700,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: 'var(--gold)', marginBottom: '0.4rem',
            }}>
              Short-Notice Bookings
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--gray)', lineHeight: 1.6 }}>
              Need a studio at short notice? Call or WhatsApp us directly — we often have same-day slots available.
            </div>
          </div>

          {/* Book now button */}
          <a
            href="#booking"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              marginTop: '1.5rem',
              padding: '12px 22px',
              background: 'var(--gold)', color: 'var(--dark)',
              borderRadius: '100px',
              fontSize: '0.9rem', fontWeight: 500,
              letterSpacing: '0.01em',
              textDecoration: 'none',
              transition: 'all 0.35s ease',
            }}
          >
            Book a Studio →
          </a>
        </div>
      </div>

      {/* Bottom Bar — responsive via .footer-bottom-mob in globals.css */}
      <div className="footer-bottom-mob">
        <span>© 2025 Cine Classic Studios. All rights reserved. Mumbai, India.</span>
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          <a href="/film-studio-rental-mumbai" style={{ color: 'var(--gray)', transition: 'color 0.3s' }}>Film Studio Mumbai</a>
          <a href="/photoshoot-studio-mumbai" style={{ color: 'var(--gray)', transition: 'color 0.3s' }}>Photoshoot Studio</a>
          <a href="/music-video-shoot-location" style={{ color: 'var(--gray)', transition: 'color 0.3s' }}>Music Video Location</a>
        </div>
        <span className="footer-tagline" style={{ color: 'rgba(212,175,55,0.6)' }}>Built for the Mumbai film industry.</span>
      </div>
    </footer>
  );
}
