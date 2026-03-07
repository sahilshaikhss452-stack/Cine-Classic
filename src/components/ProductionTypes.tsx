const PRODUCTION_TYPES = [
  {
    icon: '🎬',
    title: 'Film Productions',
    desc: 'Full-scale feature films and short films. Our sets provide the authentic backdrops that bring Bollywood and regional cinema to life.',
    gradient: 'linear-gradient(135deg, #1a0a00 0%, #2d1500 100%)',
    accent: '#d4af37',
    tags: ['Feature Films', 'Short Films', 'Art House'],
  },
  {
    icon: '📺',
    title: 'Television Shows',
    desc: 'Primetime TV serials and reality formats. High-volume shoot schedules are fully supported with multi-set configurations.',
    gradient: 'linear-gradient(135deg, #00051a 0%, #000d2d 100%)',
    accent: '#4a80f0',
    tags: ['TV Serials', 'Reality Shows', 'Talk Shows'],
  },
  {
    icon: '🎵',
    title: 'Music Videos',
    desc: 'Visually explosive music video productions. Transform any of our 9 sets with creative lighting for your artist\'s vision.',
    gradient: 'linear-gradient(135deg, #1a001a 0%, #2d0030 100%)',
    accent: '#e040fb',
    tags: ['Bollywood', 'Indie Artists', 'Album Covers'],
  },
  {
    icon: '📢',
    title: 'Commercial Ads',
    desc: 'TVC, digital, and print campaigns for top brands. Controlled environments with lighting precision for product-perfect shots.',
    gradient: 'linear-gradient(135deg, #001a10 0%, #002d1a 100%)',
    accent: '#00c97a',
    tags: ['Brand TVCs', 'Digital Ads', 'Product Shoots'],
  },
  {
    icon: '📸',
    title: 'Fashion & Editorial',
    desc: 'High-fashion lookbooks, catalogue shoots, and magazine editorials. Multiple sets available for full-day multi-look shoots.',
    gradient: 'linear-gradient(135deg, #1a0010 0%, #2d0020 100%)',
    accent: '#ff6db0',
    tags: ['Lookbooks', 'Catalogues', 'Editorial'],
  },
  {
    icon: '🎭',
    title: 'OTT Web Series',
    desc: 'Premium OTT content for Netflix, Amazon Prime, and more. Series-length shoots with block-booking discounts available.',
    gradient: 'linear-gradient(135deg, #0a0010 0%, #180020 100%)',
    accent: '#a855f7',
    tags: ['Netflix', 'Amazon Prime', 'Disney+ Hotstar'],
  },
];

export default function ProductionTypes() {
  return (
    <section style={{ background: 'var(--dark2)', padding: '120px 5%' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <span className="section-tag">What We Do</span>
          <h2 style={{
            fontSize: 'clamp(1.75rem, 3.3vw, 2.5rem)',
            fontWeight: 700,
            color: 'var(--white)',
            margin: '1.2rem 0 1.1rem',
            letterSpacing: '-0.015em',
            lineHeight: 1.15,
          }}>
            Productions We <span style={{ color: 'var(--gold)' }}>Power</span>
          </h2>
          <p style={{ color: 'var(--gray)', maxWidth: '580px', margin: '0 auto', lineHeight: 1.7, fontSize: '1.05rem' }}>
            From intimate indie films to large-scale OTT productions — our studio infrastructure supports every format, budget, and vision.
          </p>
        </div>

        {/* Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
        }}>
          {PRODUCTION_TYPES.map((pt, i) => (
            <div
              key={pt.title}
              className={`reveal reveal-delay-${(i % 4) + 1} pt-card`}
              style={{
                background: pt.gradient,
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '12px',
                padding: '2.2rem',
                cursor: 'default',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Accent glow */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                background: `linear-gradient(90deg, transparent, ${pt.accent}, transparent)`,
                opacity: 0.7,
              }} />

              {/* Icon */}
              <div className="pt-card-icon" style={{
                fontSize: '2.4rem',
                marginBottom: '1.2rem',
                display: 'inline-block',
                transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1)',
              }}>
                {pt.icon}
              </div>

              {/* Title */}
              <h3 style={{
                fontSize: '1.2rem',
                fontWeight: 700,
                color: 'var(--white)',
                marginBottom: '0.8rem',
                letterSpacing: '-0.01em',
              }}>{pt.title}</h3>

              {/* Description */}
              <p style={{
                fontSize: '0.9rem',
                color: 'var(--gray)',
                lineHeight: 1.8,
                marginBottom: '1.5rem',
              }}>{pt.desc}</p>

              {/* Tags */}
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {pt.tags.map(tag => (
                  <span key={tag} style={{
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: pt.accent,
                    background: `${pt.accent}18`,
                    border: `1px solid ${pt.accent}30`,
                    borderRadius: '4px',
                    padding: '3px 10px',
                  }}>{tag}</span>
                ))}
              </div>

              {/* Arrow reveal on hover */}
              <div className="pt-card-arrow" style={{
                position: 'absolute', bottom: '1.8rem', right: '1.8rem',
                width: '36px', height: '36px',
                borderRadius: '50%',
                border: `1px solid ${pt.accent}40`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.9rem',
                color: pt.accent,
                opacity: 0,
                transform: 'translateX(8px)',
                transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
              }}>→</div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="reveal" style={{ textAlign: 'center', marginTop: '4rem' }}>
          <a href="#booking" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}>
            Discuss Your Production
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
