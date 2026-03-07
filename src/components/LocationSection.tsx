const ACCESS_POINTS = [
  {
    icon: '🚗',
    title: 'By Road',
    lines: [
      'Western Express Highway – 2 km',
      'Eastern Freeway access point – 4 km',
      'Dedicated production truck entry gate',
      'Large vehicle parking with security',
    ],
  },
  {
    icon: '🚇',
    title: 'By Metro',
    lines: [
      'Metro Line 2 – 1.2 km walk',
      'Andheri Station (WR) – 3 km',
      'Auto-rickshaw available at exit',
    ],
  },
  {
    icon: '✈️',
    title: 'From Airport',
    lines: [
      'Chhatrapati Shivaji Maharaj Airport – 8 km',
      '15–20 min drive via Western Express Hwy',
      'Cab & crew transport arranged on request',
    ],
  },
];

const INFO_BLOCKS = [
  { icon: '📍', label: 'Address', value: 'Cine Classic Studios, Film City Road, Goregaon East, Mumbai – 400 065' },
  { icon: '📞', label: 'Phone', value: '+91 98765 43210' },
  { icon: '✉️', label: 'Email', value: 'bookings@cineclassicstudios.com' },
  { icon: '🕐', label: 'Open', value: '24 hours · 7 days a week · By appointment' },
  { icon: '🚛', label: 'Truck Access', value: 'Gate clearance 5.2m height · 40 tonne load capacity' },
  { icon: '🅿️', label: 'Parking', value: '60+ vehicles · Dedicated crew & cast areas' },
];

export default function LocationSection() {
  return (
    <section style={{ background: 'var(--dark)', padding: '120px 5%' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <span className="section-tag">Find Us</span>
          <h2 style={{
            fontFamily: 'var(--font-playfair), serif',
            fontSize: 'clamp(2rem, 3.5vw, 3rem)',
            fontWeight: 700,
            color: 'var(--white)',
            margin: '1.2rem 0 1rem',
          }}>
            Strategically Located in <span style={{ color: 'var(--gold)' }}>Mumbai&apos;s Film Belt</span>
          </h2>
          <p style={{ color: 'var(--gray)', maxWidth: '560px', margin: '0 auto', lineHeight: 1.8 }}>
            Minutes from Film City and Versova — in the heart of Mumbai&apos;s production corridor. Easy access for large crews and equipment.
          </p>
        </div>

        {/* Map + Info Grid */}
        <div className="loc-grid">

          {/* Map */}
          <div className="reveal">
            <div className="loc-map-wrap">
              {/* Google Maps embed — replace the src with your exact address embed URL */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15072.745753826677!2d72.84788!3d19.1498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b63aceef0c69%3A0xe0b9a3c4e53a78f6!2sFilm%20City%2C%20Goregaon%20East%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                title="Cine Classic Studios Location – Mumbai Film City"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ width: '100%', height: '100%', border: 'none' }}
              />
            </div>

            {/* Access tags below map */}
            <div style={{
              display: 'flex', gap: '0.75rem',
              flexWrap: 'wrap', marginTop: '1.5rem',
            }}>
              {['Near Film City', 'Goregaon East', 'Western Express Hwy', 'Easy Truck Access'].map(tag => (
                <span key={tag} style={{
                  padding: '6px 14px',
                  borderRadius: '100px',
                  background: 'rgba(212,175,55,0.08)',
                  border: '1px solid rgba(212,175,55,0.2)',
                  color: 'var(--gold)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Info Column */}
          <div className="reveal reveal-delay-2">

            {/* Contact / Info blocks */}
            <div style={{ marginBottom: '3rem' }}>
              {INFO_BLOCKS.map(item => (
                <div key={item.label} style={{
                  display: 'flex', gap: '1rem',
                  alignItems: 'flex-start',
                  marginBottom: '1.4rem',
                  paddingBottom: '1.4rem',
                  borderBottom: '1px solid rgba(255,255,255,0.04)',
                }}>
                  <div style={{
                    width: '40px', height: '40px', flexShrink: 0,
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1rem',
                    background: 'rgba(212,175,55,0.04)',
                  }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{
                      fontSize: '0.65rem', letterSpacing: '0.15em',
                      textTransform: 'uppercase', color: 'var(--gold)',
                      marginBottom: '3px', fontWeight: 600,
                    }}>
                      {item.label}
                    </div>
                    <div style={{ fontSize: '0.88rem', color: 'var(--white2)', lineHeight: 1.6 }}>
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* How to Reach */}
            <div style={{
              fontSize: '0.7rem', letterSpacing: '0.15em',
              textTransform: 'uppercase', color: 'var(--gold)',
              marginBottom: '1.2rem', fontWeight: 600,
            }}>
              How to Reach
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '1rem',
            }}>
              {ACCESS_POINTS.map(point => (
                <div key={point.title} style={{
                  background: 'var(--dark3)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '10px',
                  padding: '1.2rem',
                }}>
                  <div style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>{point.icon}</div>
                  <div style={{
                    fontSize: '0.82rem', fontWeight: 700,
                    color: 'var(--white)', marginBottom: '0.6rem',
                  }}>
                    {point.title}
                  </div>
                  {point.lines.map((line, i) => (
                    <div key={i} style={{
                      fontSize: '0.78rem', color: 'var(--gray)', lineHeight: 1.6,
                      marginBottom: '3px',
                    }}>
                      {line}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Directions CTA */}
            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a
                href="https://goo.gl/maps/FilmCity"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem' }}
              >
                📍 Get Directions
              </a>
              <a
                href="https://wa.me/919876543210?text=Hi%20Cine%20Classic%20Studios%2C%20I%20need%20directions%20to%20your%20studio."
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  padding: '14px 24px',
                  background: '#25D366', color: '#fff',
                  borderRadius: '100px', fontSize: '0.78rem', fontWeight: 600,
                  textDecoration: 'none', letterSpacing: '0.04em',
                  transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
                }}
              >
                💬 WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
