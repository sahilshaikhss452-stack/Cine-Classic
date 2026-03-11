import AutoScrollCarousel from '@/components/motion/AutoScrollCarousel';

const PRODUCTION_TYPES = [
  {
    icon: '01',
    title: 'Film Productions',
    desc: 'For feature films, indie projects, and narrative scenes that need dressed environments, controlled logistics, and faster setup than live locations.',
    gradient: 'linear-gradient(135deg, #1a0a00 0%, #2d1500 100%)',
    accent: '#d4af37',
    tags: ['Feature Films', 'Narrative Scenes', 'Indie Cinema'],
  },
  {
    icon: '02',
    title: 'Television Shows',
    desc: 'For daily shows, serial schedules, and recurring episodic shoots that benefit from reliable access, repeatable setups, and multiple set options.',
    gradient: 'linear-gradient(135deg, #00051a 0%, #000d2d 100%)',
    accent: '#4a80f0',
    tags: ['TV Serials', 'Recurring Schedules', 'Broadcast Workflows'],
  },
  {
    icon: '03',
    title: 'Music Videos',
    desc: 'For performance-driven videos, stylized lighting, crowd scenes, and art-directed looks that need visual variety inside one controlled facility.',
    gradient: 'linear-gradient(135deg, #1a001a 0%, #2d0030 100%)',
    accent: '#e040fb',
    tags: ['Performance Sets', 'Stylized Lighting', 'Artist Content'],
  },
  {
    icon: '04',
    title: 'Commercial Ads',
    desc: 'For TVCs, digital campaigns, product films, and branded content where time efficiency, lighting control, and clean execution matter.',
    gradient: 'linear-gradient(135deg, #001a10 0%, #002d1a 100%)',
    accent: '#00c97a',
    tags: ['Brand Films', 'Digital Ads', 'Product Content'],
  },
  {
    icon: '05',
    title: 'Fashion & Editorial',
    desc: 'For lookbooks, catalogue shoots, beauty campaigns, and editorial work that needs controlled backdrops and multiple looks in one day.',
    gradient: 'linear-gradient(135deg, #1a0010 0%, #2d0020 100%)',
    accent: '#ff6db0',
    tags: ['Lookbooks', 'Catalogue Days', 'Beauty Shoots'],
  },
  {
    icon: '06',
    title: 'OTT Web Series',
    desc: 'For OTT teams that need repeat access, practical production support, and set flexibility across multiple scenes or episode blocks.',
    gradient: 'linear-gradient(135deg, #0a0010 0%, #180020 100%)',
    accent: '#a855f7',
    tags: ['Web Series', 'Episode Blocks', 'OTT Teams'],
  },
];

export default function ProductionTypes() {
  return (
    <section className="mob-section" style={{ background: 'var(--dark2)', padding: '120px 5%' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <span className="section-tag">Production Formats</span>
          <h2
            style={{
              fontSize: 'clamp(1.75rem, 3.3vw, 2.5rem)',
              fontWeight: 700,
              color: 'var(--white)',
              margin: '1.2rem 0 1.1rem',
              letterSpacing: '-0.015em',
              lineHeight: 1.15,
            }}
          >
            Built for the shoots <span style={{ color: 'var(--gold)' }}>Mumbai books most</span>
          </h2>
          <p style={{ color: 'var(--gray)', maxWidth: '620px', margin: '0 auto', lineHeight: 1.7, fontSize: '1.05rem' }}>
            The studio is designed to support the formats producers, agencies, photographers, and OTT teams actually need to execute on deadline.
          </p>
        </div>

        <p className="swipe-hint">swipe to explore {'>'}</p>
        <AutoScrollCarousel className="productions-types-grid">
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
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: `linear-gradient(90deg, transparent, ${pt.accent}, transparent)`,
                  opacity: 0.7,
                }}
              />

              <div
                className="pt-card-icon"
                style={{
                  fontSize: '2.1rem',
                  marginBottom: '1.2rem',
                  display: 'inline-block',
                  transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1)',
                  fontFamily: 'var(--font-playfair), serif',
                  fontWeight: 700,
                  color: pt.accent,
                }}
              >
                {pt.icon}
              </div>

              <h3
                style={{
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  color: 'var(--white)',
                  marginBottom: '0.8rem',
                  letterSpacing: '-0.01em',
                }}
              >
                {pt.title}
              </h3>

              <p
                style={{
                  fontSize: '0.9rem',
                  color: 'var(--gray)',
                  lineHeight: 1.8,
                  marginBottom: '1.5rem',
                }}
              >
                {pt.desc}
              </p>

              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {pt.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: pt.accent,
                      background: `${pt.accent}18`,
                      border: `1px solid ${pt.accent}30`,
                      borderRadius: '4px',
                      padding: '3px 10px',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div
                className="pt-card-arrow"
                style={{
                  position: 'absolute',
                  bottom: '1.8rem',
                  right: '1.8rem',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  border: `1px solid ${pt.accent}40`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.9rem',
                  color: pt.accent,
                  opacity: 0,
                  transform: 'translateX(8px)',
                  transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
                }}
              >
                {'->'}
              </div>
            </div>
          ))}
        </AutoScrollCarousel>

        <div className="reveal" style={{ textAlign: 'center', marginTop: '4rem' }}>
          <a href="#booking" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}>
            Discuss Your Shoot Requirements
            <span>{'->'}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
