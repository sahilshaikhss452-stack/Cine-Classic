import Image from 'next/image';
import Link from 'next/link';
import { loadSiteSettings, loadStudioNavItems } from '@/lib/sanity';

const QUICK_LINKS = [
  { label: 'About Us', href: '#about' },
  { label: 'Studio Facilities', href: '/facilities' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Client Reviews', href: '#testimonials' },
  { label: 'Book a Studio', href: '#booking' },
  { label: 'Film Studio Mumbai', href: '/film-studio-rental-mumbai' },
  { label: 'Photoshoot Studio', href: '/photoshoot-studio-mumbai' },
  { label: 'Music Video Location', href: '/music-video-shoot-location' },
  { label: 'Ad Film Studio', href: '/ad-film-studio' },
];

function getSocialBadge(platform: string) {
  const upper = platform.toUpperCase();
  if (upper === 'WHATSAPP') return 'WA';
  if (upper === 'YOUTUBE') return 'YT';
  if (upper === 'INSTAGRAM') return 'IG';
  if (upper === 'LINKEDIN') return 'IN';
  if (upper === 'FACEBOOK') return 'FB';
  if (upper === 'X') return 'X';
  return upper.slice(0, 2);
}

export default async function Footer() {
  const [settings, studios] = await Promise.all([loadSiteSettings(), loadStudioNavItems()]);
  const year = new Date().getFullYear();
  const addressText = [settings.addressLine1, settings.addressLine2, settings.city, settings.region, settings.postalCode]
    .filter(Boolean)
    .join(', ');

  const quickContactUrl = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
    `Hi, I'd like to inquire about studio availability at ${settings.businessName}.`,
  )}`;

  return (
    <footer style={{ background: 'var(--dark2)', position: 'relative', padding: '90px 5% 0' }}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, var(--gold), transparent)',
          opacity: 0.25,
        }}
      />

      <div className="footer-grid-mob">
        <div>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.4rem', textDecoration: 'none' }}>
            <Image
              src={settings.logoUrl ?? '/images/logo.jpg'}
              alt={`${settings.businessName} logo`}
              width={52}
              height={52}
              style={{ borderRadius: '6px', objectFit: 'cover' }}
            />
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-playfair), serif',
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  color: 'var(--gold)',
                  letterSpacing: '0.02em',
                  lineHeight: 1.2,
                }}
              >
                {settings.businessName}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-playfair), serif',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  color: 'var(--white2)',
                  letterSpacing: '0.04em',
                }}
              >
                {settings.tagline ?? 'Production-Ready Spaces'}
              </div>
            </div>
          </Link>

          <p
            style={{
              fontSize: '0.86rem',
              color: 'var(--gray)',
              fontWeight: 300,
              lineHeight: 1.85,
              maxWidth: '290px',
              marginBottom: '2rem',
            }}
          >
            {settings.tagline ?? `${settings.businessName} is built for working productions, with studio sets, practical logistics, and a responsive team.`}
          </p>

          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
            {settings.socialLinks.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--gray)',
                  transition: 'all 0.35s ease',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                }}
              >
                {getSocialBadge(link.platform)}
              </a>
            ))}
          </div>

          <a
            href={quickContactUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
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
            ?? Chat on WhatsApp
          </a>
        </div>

        <div>
          <h4
            style={{
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              marginBottom: '1.4rem',
              fontWeight: 600,
            }}
          >
            Studio Spaces
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {studios.map((studio) => (
              <li key={studio._id} style={{ marginBottom: '0.6rem' }}>
                <Link href={`/studios/${studio.slug}`} style={{ fontSize: '0.85rem', color: 'var(--gray)', lineHeight: 1.5, display: 'block', textDecoration: 'none' }}>
                  {studio.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4
            style={{
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              marginBottom: '1.4rem',
              fontWeight: 600,
            }}
          >
            Quick Links
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {QUICK_LINKS.map(({ label, href }) => (
              <li key={label} style={{ marginBottom: '0.6rem' }}>
                <a href={href} style={{ fontSize: '0.85rem', color: 'var(--gray)', transition: 'color 0.3s ease', textDecoration: 'none' }}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4
            style={{
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              marginBottom: '1.4rem',
              fontWeight: 600,
            }}
          >
            Contact Us
          </h4>

          {[
            { icon: '??', text: addressText },
            { icon: '??', text: settings.phone },
            { icon: '??', text: settings.email },
            { icon: '??', text: settings.hoursText ?? 'By appointment' },
          ].map((item) => (
            <div key={item.text} style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start', marginBottom: '1.1rem' }}>
              <span style={{ fontSize: '0.95rem', flexShrink: 0, marginTop: '1px' }}>{item.icon}</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--gray)', lineHeight: 1.6 }}>{item.text}</span>
            </div>
          ))}

          <div
            style={{
              marginTop: '1.8rem',
              padding: '1rem',
              background: 'rgba(212,175,55,0.05)',
              border: '1px solid rgba(212,175,55,0.12)',
              borderRadius: '8px',
            }}
          >
            <div
              style={{
                fontSize: '0.68rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
                marginBottom: '0.4rem',
              }}
            >
              Short-Notice Bookings
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--gray)', lineHeight: 1.6 }}>
              Need a studio at short notice? Call or WhatsApp us directly — we often have same-day slots available.
            </div>
          </div>

          <a
            href="#booking"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginTop: '1.5rem',
              padding: '12px 22px',
              background: 'var(--gold)',
              color: 'var(--dark)',
              borderRadius: '100px',
              fontSize: '0.9rem',
              fontWeight: 500,
              letterSpacing: '0.01em',
              textDecoration: 'none',
              transition: 'all 0.35s ease',
            }}
          >
            Book a Studio ?
          </a>
        </div>
      </div>

      <div className="footer-bottom-mob">
        <span>© {year} {settings.businessName}. All rights reserved. {settings.city}, {settings.country}.</span>
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          <Link href="/film-studio-rental-mumbai" style={{ color: 'var(--gray)', textDecoration: 'none' }}>
            Film Studio Mumbai
          </Link>
          <Link href="/photoshoot-studio-mumbai" style={{ color: 'var(--gray)', textDecoration: 'none' }}>
            Photoshoot Studio
          </Link>
          <Link href="/music-video-shoot-location" style={{ color: 'var(--gray)', textDecoration: 'none' }}>
            Music Video Location
          </Link>
        </div>
        <span className="footer-tagline" style={{ color: 'rgba(212,175,55,0.6)' }}>
          Built for the Mumbai film industry.
        </span>
      </div>
    </footer>
  );
}
