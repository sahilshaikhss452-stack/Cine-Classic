import Image from 'next/image';

const SETS_LINKS = [
  { label: 'Cyclorama Wall',  id: 'cyclorama' },
  { label: 'Green Screen',    id: 'greenscreen' },
  { label: 'Living Room Set', id: 'livingroom' },
  { label: 'Industrial Set',  id: 'industrial' },
  { label: 'Open Ground',     id: 'outdoor' },
];

const QUICK_LINKS = [
  { label: 'About Us',    href: '#about' },
  { label: 'Pricing',     href: '#pricing' },
  { label: 'Gallery',     href: '#gallery' },
  { label: 'Reviews',     href: '#testimonials' },
  { label: 'Book Now',    href: '#booking' },
];

export default function Footer() {
  return (
    <footer style={{ background: 'var(--dark2)', position: 'relative', padding: '80px 5% 30px' }}>
      {/* Gold top line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, var(--gold), transparent)',
        opacity: 0.2,
      }} />

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '3rem',
        marginBottom: '3rem',
        maxWidth: '1200px',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}>
        {/* Brand */}
        <div>
          <a href="#home" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.2rem' }}>
            <Image src="/images/logo.jpg" alt="Cine Classic Studios Logo" width={56} height={56} style={{ borderRadius: '4px', objectFit: 'contain' }} />
            <div style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '1.1rem', fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.02em', lineHeight: 1.2 }}>
              Cine Classic<br />
              <span style={{ color: 'var(--white2)', fontWeight: 500 }}>Studios</span>
            </div>
          </a>
          <p style={{ fontSize: '0.88rem', color: 'var(--gray)', fontWeight: 300, lineHeight: 1.8, maxWidth: '280px' }}>
            Premium film and photography studio spaces for creators, directors,
            photographers, and production teams. Five unique sets. One remarkable venue.
          </p>
        </div>

        {/* Our Sets */}
        <div>
          <h4 style={{ fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1.5rem', fontWeight: 600 }}>
            Our Sets
          </h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {SETS_LINKS.map(({ label }) => (
              <li key={label} style={{ marginBottom: '0.7rem' }}>
                <a href="#sets" style={{ fontSize: '0.88rem', color: 'var(--gray)', transition: 'color 0.4s' }}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1.5rem', fontWeight: 600 }}>
            Quick Links
          </h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {QUICK_LINKS.map(({ label, href }) => (
              <li key={label} style={{ marginBottom: '0.7rem' }}>
                <a href={href} style={{ fontSize: '0.88rem', color: 'var(--gray)', transition: 'color 0.4s' }}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        paddingTop: '2rem',
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px', margin: '0 auto',
        fontSize: '0.78rem', color: 'var(--gray)',
        flexWrap: 'wrap', gap: '0.5rem',
      }}>
        <span>&copy; 2024 Cine Classic Studios. All rights reserved.</span>
        <span style={{ color: 'var(--gold)' }}>Built for creators, by creators.</span>
      </div>
    </footer>
  );
}
