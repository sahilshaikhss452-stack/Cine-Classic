import Image from 'next/image';
import Link from 'next/link';
import { PRODUCTIONS, TYPE_ICONS } from '@/data/productions';
import type { Production } from '@/data/productions';

// ─── Individual card ───────────────────────────────────────────────────────────
function ProductionCard({ prod, index }: { prod: Production; index: number }) {
  const delayClass = index > 0 ? ` reveal-delay-${Math.min(index % 4 + 1, 4)}` : '';

  return (
    <div className={`prod-card reveal${delayClass}`}>
      {/* ── Poster area ──────────────────────────────── */}
      <div className="prod-img-wrap">

        {/* Gradient / real-image layer */}
        <div className="prod-img-inner">
          {prod.posterImage ? (
            <Image
              src={prod.posterImage}
              alt={`${prod.title} poster`}
              fill
              sizes="(max-width:600px) 100vw, (max-width:1024px) 50vw, 25vw"
              style={{ objectFit: 'cover' }}
            />
          ) : (
            /* Cinematic gradient placeholder */
            <div style={{ width: '100%', height: '100%', background: prod.gradient }} />
          )}
        </div>

        {/* Permanent bottom vignette */}
        <div className="prod-vignette" />

        {/* Extra hover overlay */}
        <div className="prod-overlay" />

        {/* Big icon watermark (shows only on placeholder) */}
        {!prod.posterImage && (
          <div className="prod-icon">
            {TYPE_ICONS[prod.type] ?? '🎞️'}
          </div>
        )}

        {/* Network badge – top-right corner */}
        {prod.network && (
          <div style={{
            position: 'absolute',
            top: '0.75rem',
            right: '0.75rem',
            background: 'rgba(0,0,0,0.65)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '6px',
            padding: '3px 8px',
            fontSize: '0.6rem',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.7)',
          }}>
            {prod.network}
          </div>
        )}
      </div>

      {/* ── Text info ─────────────────────────────────── */}
      <div className="prod-info">
        <div className="prod-title">{prod.title}</div>
        <div className="prod-meta">
          <span
            className="prod-badge"
            style={{ color: prod.typeColor, borderColor: prod.typeColor }}
          >
            {prod.type}
          </span>
          <span className="prod-dot" />
          <span className="prod-year">{prod.year}</span>
        </div>
      </div>
    </div>
  );
}

// ─── Section ───────────────────────────────────────────────────────────────────
export default function Productions() {
  return (
    <section
      id="productions"
      style={{
        padding: '120px 5%',
        background: 'var(--dark)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient glow */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '70%',
        height: '50%',
        background: 'radial-gradient(ellipse, rgba(212,175,55,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>

        {/* ── Header ──────────────────────────────────── */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
          <div className="section-tag">On Screen</div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', marginBottom: '1.1rem' }}>
            Productions Shot at{' '}
            <span style={{ color: 'var(--gold)' }}>Cine Classic Studios</span>
          </h2>
          <p style={{
            fontSize: '1.05rem',
            color: 'var(--gray)',
            maxWidth: '560px',
            margin: '0 auto',
            fontWeight: 300,
            lineHeight: 1.8,
          }}>
            Trusted by filmmakers, production houses, and television networks
            across India.
          </p>
        </div>

        {/* ── Productions grid ─────────────────────────── */}
        <div className="productions-grid" style={{ marginBottom: '3.5rem' }}>
          {PRODUCTIONS.map((prod, i) => (
            <ProductionCard key={prod.id} prod={prod} index={i} />
          ))}
        </div>

        {/* ── CTA ─────────────────────────────────────── */}
        <div className="reveal" style={{ textAlign: 'center' }}>
          <Link href="/portfolio" className="btn-outline">
            View Full Portfolio →
          </Link>
        </div>

      </div>
    </section>
  );
}
