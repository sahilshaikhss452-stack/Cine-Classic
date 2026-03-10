import Image from 'next/image';
import Link from 'next/link';
import { loadSiteSettings, loadStudioNavItems } from '@/lib/sanity';
import {
  ArrowRightIcon,
  ClockIcon,
  IconBadge,
  MailIcon,
  MapPinIcon,
  MessageCircleIcon,
  PhoneIcon,
} from '@/components/ui/icons';

const QUICK_LINKS = [
  { label: 'About Us', href: '#about' },
  { label: 'Studio Facilities', href: '/facilities' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Client Reviews', href: '#testimonials' },
  { label: 'Check Availability', href: '#booking' },
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

  const contactItems = [
    { icon: MapPinIcon, text: addressText },
    { icon: PhoneIcon, text: settings.phone },
    { icon: MailIcon, text: settings.email },
    { icon: ClockIcon, text: settings.hoursText ?? 'By appointment' },
  ];

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
              style={{ borderRadius: '8px', objectFit: 'cover' }}
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
              fontSize: '0.88rem',
              color: 'var(--gray)',
              fontWeight: 300,
              lineHeight: 1.85,
              maxWidth: '320px',
              marginBottom: '1.5rem',
            }}
          >
            {settings.tagline ?? `${settings.businessName} is built for working productions, with studio sets, practical logistics, and a responsive team.`}
          </p>

          <div
            style={{
              padding: '1rem 1.1rem',
              borderRadius: '16px',
              background: 'rgba(212,175,55,0.05)',
              border: '1px solid rgba(212,175,55,0.14)',
              marginBottom: '1.5rem',
              maxWidth: '340px',
            }}
          >
            <div style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.45rem' }}>
              Short-notice bookings
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--gray-lt)', lineHeight: 1.65 }}>
              Need a studio at short notice? Call or WhatsApp us directly. Same-day options are often available depending on the set and schedule.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
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
                  borderRadius: '10px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--gray)',
                  transition: 'all 0.35s ease',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  background: 'rgba(255,255,255,0.02)',
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
              gap: '0.55rem',
              padding: '10px 18px',
              background: '#25D366',
              color: '#fff',
              borderRadius: '100px',
              fontSize: '0.78rem',
              fontWeight: 700,
              textDecoration: 'none',
              letterSpacing: '0.04em',
              transition: 'all 0.35s ease',
            }}
          >
            <MessageCircleIcon size={15} />
            Chat on WhatsApp
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
              <li key={studio._id} style={{ marginBottom: '0.65rem' }}>
                <Link href={`/studios/${studio.slug}`} style={{ fontSize: '0.86rem', color: 'var(--gray)', lineHeight: 1.5, display: 'block', textDecoration: 'none' }}>
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
              <li key={label} style={{ marginBottom: '0.65rem' }}>
                <a href={href} style={{ fontSize: '0.86rem', color: 'var(--gray)', transition: 'color 0.3s ease', textDecoration: 'none' }}>
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

          {contactItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.text} style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start', marginBottom: '1.1rem' }}>
                <IconBadge size={36} rounded={10}>
                  <Icon size={16} />
                </IconBadge>
                <span style={{ fontSize: '0.85rem', color: 'var(--gray)', lineHeight: 1.6 }}>{item.text}</span>
              </div>
            );
          })}

          <a
            href="#booking"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.55rem',
              marginTop: '1.2rem',
              padding: '12px 22px',
              background: 'var(--gold)',
              color: 'var(--dark)',
              borderRadius: '100px',
              fontSize: '0.88rem',
              fontWeight: 700,
              letterSpacing: '0.02em',
              textDecoration: 'none',
              transition: 'all 0.35s ease',
            }}
          >
            Check Availability
            <ArrowRightIcon size={15} />
          </a>
        </div>
      </div>

      <div className="footer-bottom-mob">
        <span>&copy; {year} {settings.businessName}. All rights reserved. {settings.city}, {settings.country}.</span>
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
