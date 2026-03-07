const BTS_ITEMS = [
  {
    title: 'Lighting the Scene',
    desc: 'Our rigging team installs a full LED overhead grid and practicals tailored to your director of photography\'s spec sheet.',
    gradient: 'linear-gradient(160deg, #1a1200 0%, #2d2000 60%, #0a0800 100%)',
    icon: '💡',
    accent: '#d4af37',
    size: 'large',
  },
  {
    title: 'Camera Rig Setup',
    desc: 'Tracking rails, crane mounts, and dolly tracks — our floor is designed for precision camera movement.',
    gradient: 'linear-gradient(160deg, #0a0012 0%, #180020 60%, #04000a 100%)',
    icon: '🎥',
    accent: '#a855f7',
    size: 'small',
  },
  {
    title: 'Makeup & Prep Room',
    desc: 'Dedicated vanity stations, full-length mirrors, and professional lighting for cast preparation.',
    gradient: 'linear-gradient(160deg, #001a10 0%, #002d1c 60%, #000a06 100%)',
    icon: '💄',
    accent: '#00c97a',
    size: 'small',
  },
  {
    title: 'Director on Set',
    desc: 'Monitor villages with craft services, storyboard reference boards, and a dedicated director\'s station.',
    gradient: 'linear-gradient(160deg, #1a0005 0%, #2d000c 60%, #0a0002 100%)',
    icon: '🎭',
    accent: '#ff6db0',
    size: 'small',
  },
  {
    title: 'Production Coordination',
    desc: 'Our studio managers handle floor logistics — scheduling, crew access, and technical support throughout your shoot.',
    gradient: 'linear-gradient(160deg, #00051a 0%, #000d2d 60%, #000208 100%)',
    icon: '📋',
    accent: '#4a80f0',
    size: 'small',
  },
  {
    title: 'The Perfect Take',
    desc: 'Every element aligned — lighting, set, cast — to capture the exact frame your vision demands.',
    gradient: 'linear-gradient(160deg, #100a00 0%, #2a1800 60%, #080400 100%)',
    icon: '🏆',
    accent: '#d4af37',
    size: 'large',
  },
];

export default function BehindScenes() {
  return (
    <section className="mob-section" style={{ background: 'var(--dark)', padding: '120px 5%' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <div className="reveal" style={{ marginBottom: '4rem' }}>
          <span className="section-tag">Studio Life</span>
          <h2 style={{
            fontSize: 'clamp(1.75rem, 3.3vw, 2.5rem)',
            fontWeight: 700,
            color: 'var(--white)',
            margin: '1.2rem 0 1.1rem',
            maxWidth: '600px',
            letterSpacing: '-0.015em',
            lineHeight: 1.15,
          }}>
            Behind the Scenes at{' '}
            <span style={{ color: 'var(--gold)' }}>Cine Classic Studios</span>
          </h2>
          <p style={{ color: 'var(--gray)', maxWidth: '560px', lineHeight: 1.7, fontSize: '1.05rem' }}>
            A look inside what happens before the camera rolls — the meticulous preparation that makes every production a success.
          </p>
        </div>

        {/* Masonry-style Grid — horizontal scroll on mobile */}
        <p className="swipe-hint">swipe to explore ›</p>
        <div className="bts-grid">
          {BTS_ITEMS.map((item, i) => (
            <div
              key={item.title}
              className={`reveal reveal-delay-${(i % 3) + 1} bts-card ${item.size === 'large' ? 'bts-card-large' : ''}`}
              style={{ background: item.gradient }}
            >
              {/* Top accent */}
              <div style={{
                height: '2px',
                background: `linear-gradient(90deg, ${item.accent}, transparent)`,
                marginBottom: '1.8rem',
                opacity: 0.6,
              }} />

              {/* Icon with zoom */}
              <div className="bts-card-icon" style={{ fontSize: '2.2rem', marginBottom: '1.2rem', display: 'inline-block' }}>
                {item.icon}
              </div>

              {/* Text */}
              <h3 style={{
                fontSize: '1.15rem',
                fontWeight: 700,
                color: 'var(--white)',
                marginBottom: '0.8rem',
                letterSpacing: '-0.01em',
              }}>{item.title}</h3>

              <p style={{
                fontSize: '0.88rem',
                color: 'var(--gray)',
                lineHeight: 1.8,
              }}>{item.desc}</p>

              {/* Corner accent on hover */}
              <div className="bts-card-corner" style={{
                position: 'absolute',
                bottom: '1.5rem', right: '1.5rem',
                width: '24px', height: '24px',
                borderRight: `2px solid ${item.accent}`,
                borderBottom: `2px solid ${item.accent}`,
                opacity: 0,
                transform: 'translate(4px, 4px)',
                transition: 'all 0.35s ease',
              }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
