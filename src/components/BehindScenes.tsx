import AutoScrollCarousel from '@/components/motion/AutoScrollCarousel';

const BTS_ITEMS = [
  {
    step: '01',
    title: 'Pre-light and rigging alignment',
    desc: 'Grid, practicals, and lighting direction are locked early so camera tests and first shots move faster on call day.',
    note: 'Useful for ad films, beauty shoots, and repeatable lighting plans.',
    gradient: 'linear-gradient(160deg, #161108 0%, #231909 60%, #0b0906 100%)',
    accent: '#d4af37',
    size: 'large',
  },
  {
    step: '02',
    title: 'Camera movement ready floors',
    desc: 'The floor is planned around dolly, slider, and tracking movement so teams can move quickly between frames.',
    note: 'Helpful when the shot list needs travel, parallax, or repeat takes.',
    gradient: 'linear-gradient(160deg, #0a0d18 0%, #101a2e 60%, #06070b 100%)',
    accent: '#8fb2ff',
    size: 'small',
  },
  {
    step: '03',
    title: 'Cast prep and holding support',
    desc: 'Dedicated makeup, wardrobe, and prep flow keeps talent movement cleaner and protects schedule continuity.',
    note: 'Designed for branded shoots, serial blocks, and multi-look days.',
    gradient: 'linear-gradient(160deg, #10140d 0%, #183018 60%, #080b07 100%)',
    accent: '#66d08b',
    size: 'small',
  },
  {
    step: '04',
    title: 'Director and client review zone',
    desc: 'Monitor viewing, approvals, and decision-making happen in one place so the floor stays focused and calm.',
    note: 'Best for agency approvals, branded content, and faster on-set signoff.',
    gradient: 'linear-gradient(160deg, #190b10 0%, #2e101d 60%, #090507 100%)',
    accent: '#ff8fbe',
    size: 'small',
  },
  {
    step: '05',
    title: 'Floor coordination through the day',
    desc: 'Studio managers help with access, movement, and schedule rhythm so crews spend less time solving logistics.',
    note: 'Especially valuable for medium to large crews with tight timelines.',
    gradient: 'linear-gradient(160deg, #0c1018 0%, #101a2d 60%, #05080c 100%)',
    accent: '#6ea5ff',
    size: 'small',
  },
  {
    step: '06',
    title: 'Ready-for-take production flow',
    desc: 'The set, crew, and support systems are built to keep the shoot moving from setup to final take with less friction.',
    note: 'The goal is simple: fewer delays, cleaner execution, and a better shooting day.',
    gradient: 'linear-gradient(160deg, #171007 0%, #2b1909 60%, #090704 100%)',
    accent: '#d4af37',
    size: 'large',
  },
];

export default function BehindScenes() {
  return (
    <section className="mob-section" style={{ background: 'var(--dark)', padding: '120px 5%' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="reveal" style={{ marginBottom: '4rem' }}>
          <span className="section-tag">Production Workflow</span>
          <h2
            style={{
              fontSize: 'clamp(1.75rem, 3.3vw, 2.5rem)',
              fontWeight: 700,
              color: 'var(--white)',
              margin: '1.2rem 0 1.1rem',
              maxWidth: '660px',
              letterSpacing: '-0.015em',
              lineHeight: 1.15,
            }}
          >
            What your crew experience looks like <span style={{ color: 'var(--gold)' }}>behind the camera</span>
          </h2>
          <p style={{ color: 'var(--gray)', maxWidth: '580px', lineHeight: 1.7, fontSize: '1.05rem' }}>
            Production teams do not just book a set. They also need a floor that supports lighting, movement, prep, approvals, and a smoother shooting day.
          </p>
        </div>

        <p className="swipe-hint">swipe to explore {'>'}</p>
        <AutoScrollCarousel className="bts-grid">
          {BTS_ITEMS.map((item, i) => (
            <div
              key={item.title}
              className={`reveal reveal-delay-${(i % 3) + 1} bts-card ${item.size === 'large' ? 'bts-card-large' : ''}`}
              style={{ background: item.gradient }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.45rem 0.7rem',
                  borderRadius: '999px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'var(--gold)',
                  fontSize: '0.68rem',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  marginBottom: '1.35rem',
                }}
              >
                Step {item.step}
              </div>

              <div
                style={{
                  height: '2px',
                  background: `linear-gradient(90deg, ${item.accent}, transparent)`,
                  marginBottom: '1.35rem',
                  opacity: 0.75,
                }}
              />

              <h3
                style={{
                  fontSize: '1.12rem',
                  fontWeight: 700,
                  color: 'var(--white)',
                  marginBottom: '0.8rem',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.35,
                }}
              >
                {item.title}
              </h3>

              <p
                style={{
                  fontSize: '0.9rem',
                  color: 'rgba(255,255,255,0.72)',
                  lineHeight: 1.8,
                  marginBottom: '1rem',
                }}
              >
                {item.desc}
              </p>

              <p
                style={{
                  fontSize: '0.78rem',
                  color: 'rgba(255,255,255,0.48)',
                  lineHeight: 1.7,
                  letterSpacing: '0.03em',
                }}
              >
                {item.note}
              </p>

              <div
                className="bts-card-corner"
                style={{
                  position: 'absolute',
                  bottom: '1.5rem',
                  right: '1.5rem',
                  width: '24px',
                  height: '24px',
                  borderRight: `2px solid ${item.accent}`,
                  borderBottom: `2px solid ${item.accent}`,
                  opacity: 0,
                  transform: 'translate(4px, 4px)',
                  transition: 'all 0.35s ease',
                }}
              />
            </div>
          ))}
        </AutoScrollCarousel>
      </div>
    </section>
  );
}

