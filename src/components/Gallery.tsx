import AutoScrollCarousel from '@/components/motion/AutoScrollCarousel';

const GALLERY_ITEMS = [
  { icon: '🎬', label: 'Cyclorama Fashion Shoot',        bg: 'radial-gradient(ellipse at 40% 40%, rgba(212,175,55,0.15) 0%, #111 60%), #0a0a0a', span: 2 },
  { icon: '🟩', label: 'VFX Green Screen Production',    bg: 'radial-gradient(ellipse at 60% 50%, rgba(34,197,94,0.15) 0%, #0d1209 60%), #090d09', span: 1 },
  { icon: '🛋️', label: 'TV Commercial – Living Room Set', bg: 'radial-gradient(ellipse at 30% 60%, rgba(180,80,40,0.15) 0%, #130d08 60%), #100a06', span: 1 },
  { icon: '🏭', label: 'Music Video – Industrial Set',    bg: 'radial-gradient(ellipse at 50% 40%, rgba(80,100,200,0.15) 0%, #0d0d18 60%), #08080f', span: 1 },
  { icon: '🌳', label: 'Outdoor Action Sequence',         bg: 'radial-gradient(ellipse at 40% 50%, rgba(180,180,180,0.1) 0%, #111 60%), #0a0a0a', span: 1 },
];

export default function Gallery() {
  return (
    <section
      id="gallery"
      className="mob-section"
      style={{ padding: '120px 5%', background: 'var(--dark2)', position: 'relative' }}
    >
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, var(--gold), transparent)',
        opacity: 0.2,
      }} />

      <div className="reveal" style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
        <div className="section-tag">Photo Gallery</div>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', marginBottom: '1rem' }}>
          The <span style={{ color: 'var(--gold)' }}>Studio</span> in Action
        </h2>
        <p style={{ fontSize: '1.05rem', color: 'var(--gray)', fontWeight: 300 }}>
          A glimpse of productions shot at Cine Classic Studios.
        </p>
      </div>

      {/* Masonry-style grid — auto-scroll carousel on mobile/tablet */}
      <p className="swipe-hint">swipe to explore ›</p>
      <AutoScrollCarousel className="gallery-grid">
        {GALLERY_ITEMS.map((item, i) => (
          <div
            key={item.label}
            className={`reveal${i > 0 ? ` reveal-delay-${Math.min(i, 4)}` : ''}${item.span === 2 ? ' gallery-span2' : ''}`}
            style={{
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '16px',
              overflow: 'hidden',
              position: 'relative',
              cursor: 'pointer',
            }}
          >
            <div style={{
              aspectRatio: '4/3',
              background: item.bg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2.5rem',
              transition: 'transform 0.6s cubic-bezier(0.22,1,0.36,1)',
            }}>
              {item.icon}
            </div>

            {/* Hover overlay — opacity controlled via globals.css .gallery-overlay */}
            <div
              className="gallery-overlay"
              style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 50%)',
                display: 'flex', alignItems: 'flex-end', padding: '1.5rem',
                transition: 'opacity 0.4s cubic-bezier(0.22,1,0.36,1)',
              }}
            >
              <span style={{
                fontSize: '0.82rem', letterSpacing: '0.08em',
                textTransform: 'uppercase', color: 'var(--white)', fontWeight: 500,
              }}>
                {item.label}
              </span>
            </div>
          </div>
        ))}
      </AutoScrollCarousel>
    </section>
  );
}
