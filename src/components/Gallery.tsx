import AutoScrollCarousel from '@/components/motion/AutoScrollCarousel';

const GALLERY_ITEMS = [
  {
    eyebrow: 'Cyclorama Stage',
    title: 'High-key beauty, fashion, and product setups',
    detail: 'Best when the brief needs controlled lighting, clean backgrounds, and art-directed close coverage.',
    bg: 'radial-gradient(circle at 28% 28%, rgba(240,228,186,0.34) 0%, rgba(76,61,25,0.12) 26%, rgba(8,8,8,0) 44%), linear-gradient(150deg, #1f1b13 0%, #0d0d0d 68%, #070707 100%)',
    accent: 'Beauty / Product',
    span: 2,
  },
  {
    eyebrow: 'Green Screen',
    title: 'VFX plates, brand content, and controlled composites',
    detail: 'Useful for commercial inserts, product motion shots, and scenes that need precise post-production flexibility.',
    bg: 'radial-gradient(circle at 70% 28%, rgba(63,187,109,0.26) 0%, rgba(20,57,31,0.12) 24%, rgba(8,8,8,0) 44%), linear-gradient(160deg, #101a12 0%, #0b100c 65%, #060706 100%)',
    accent: 'VFX / Inserts',
    span: 1,
  },
  {
    eyebrow: 'Living Room Set',
    title: 'Narrative interiors for ad films and OTT scenes',
    detail: 'Designed for dialogue coverage, family blocking, and polished mid-shot compositions.',
    bg: 'radial-gradient(circle at 24% 34%, rgba(209,133,82,0.24) 0%, rgba(89,48,24,0.1) 24%, rgba(8,8,8,0) 44%), linear-gradient(160deg, #17100c 0%, #0d0b09 68%, #070706 100%)',
    accent: 'Narrative Interior',
    span: 1,
  },
  {
    eyebrow: 'Industrial Floor',
    title: 'Music videos, gritty commercials, and stylized night looks',
    detail: 'Works well for smoke, colored lighting, tracking movement, and stronger contrast-driven production design.',
    bg: 'radial-gradient(circle at 72% 28%, rgba(97,124,232,0.24) 0%, rgba(34,43,88,0.12) 24%, rgba(8,8,8,0) 44%), linear-gradient(160deg, #0f1019 0%, #0b0d11 68%, #060707 100%)',
    accent: 'Performance / Night',
    span: 1,
  },
  {
    eyebrow: 'Outdoor Edge',
    title: 'Action beats, walk-and-talks, and atmospheric exteriors',
    detail: 'Useful when the storyboard needs depth, movement, and a break from controlled indoor looks.',
    bg: 'radial-gradient(circle at 36% 36%, rgba(203,203,203,0.18) 0%, rgba(82,82,82,0.08) 26%, rgba(8,8,8,0) 44%), linear-gradient(150deg, #121212 0%, #0d0d0d 68%, #080808 100%)',
    accent: 'Exterior Mood',
    span: 1,
  },
];

export default function Gallery() {
  return (
    <section
      id="gallery"
      className="mob-section"
      style={{ padding: '120px 5%', background: 'var(--dark2)', position: 'relative' }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, var(--gold), transparent)',
          opacity: 0.2,
        }}
      />

      <div className="reveal" style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
        <div className="section-tag">Scouting Frames</div>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', marginBottom: '1rem' }}>
          Visual references for <span style={{ color: 'var(--gold)' }}>real production briefs</span>
        </h2>
        <p style={{ fontSize: '1.05rem', color: 'var(--gray)', fontWeight: 300, maxWidth: '620px', margin: '0 auto', lineHeight: 1.8 }}>
          Use these looks to judge whether the set fits your storyboard, lighting plan, and shot list before you send an inquiry.
        </p>
      </div>

      <p className="swipe-hint">swipe to explore {'>'}</p>
      <AutoScrollCarousel className="gallery-grid">
        {GALLERY_ITEMS.map((item, i) => (
          <div
            key={item.title}
            className={`reveal${i > 0 ? ` reveal-delay-${Math.min(i, 4)}` : ''}${item.span === 2 ? ' gallery-span2' : ''}`}
            style={{
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '18px',
              overflow: 'hidden',
              position: 'relative',
              background: 'var(--dark3)',
              boxShadow: '0 24px 56px rgba(0,0,0,0.18)',
            }}
          >
            <div
              style={{
                aspectRatio: '4/3',
                background: item.bg,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(7,7,7,0.08) 0%, rgba(7,7,7,0.18) 44%, rgba(7,7,7,0.82) 100%)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: '1rem 1rem auto 1rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '1rem',
                }}
              >
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '0.45rem 0.7rem',
                    borderRadius: '999px',
                    background: 'rgba(8,8,8,0.48)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'rgba(255,255,255,0.76)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                  }}
                >
                  {item.eyebrow}
                </span>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '0.42rem 0.68rem',
                    borderRadius: '999px',
                    background: 'rgba(212,175,55,0.12)',
                    border: '1px solid rgba(212,175,55,0.18)',
                    color: 'var(--gold)',
                    fontSize: '0.62rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                  }}
                >
                  {item.accent}
                </span>
              </div>

              <div
                style={{
                  position: 'absolute',
                  left: '1.2rem',
                  right: '1.2rem',
                  bottom: '1.2rem',
                }}
              >
                <div
                  style={{
                    fontSize: '1.05rem',
                    fontWeight: 600,
                    lineHeight: 1.35,
                    color: 'var(--white)',
                    marginBottom: '0.45rem',
                  }}
                >
                  {item.title}
                </div>
                <div
                  style={{
                    fontSize: '0.85rem',
                    lineHeight: 1.7,
                    color: 'rgba(255,255,255,0.68)',
                  }}
                >
                  {item.detail}
                </div>
              </div>
            </div>
          </div>
        ))}
      </AutoScrollCarousel>
    </section>
  );
}

