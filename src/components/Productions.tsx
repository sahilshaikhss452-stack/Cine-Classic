import Image from 'next/image';
import Link from 'next/link';
import AutoScrollCarousel from '@/components/motion/AutoScrollCarousel';
import ProductionsDesktopCarousel from '@/components/motion/ProductionsDesktopCarousel';
import type { Production } from '@/lib/ui/production';
import { TYPE_ICONS } from '@/lib/ui/production';

function ProductionCard({ prod, index }: { prod: Production; index: number }) {
  const delayClass = index > 0 ? ` reveal-delay-${Math.min((index % 4) + 1, 4)}` : '';

  return (
    <div className={`prod-card reveal${delayClass}`}>
      <div className="prod-img-wrap">
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
            <div style={{ width: '100%', height: '100%', background: prod.gradient }} />
          )}
        </div>

        <div className="prod-vignette" />
        <div className="prod-overlay" />

        {!prod.posterImage && <div className="prod-icon">{TYPE_ICONS[prod.type]}</div>}

        {prod.network && (
          <div
            style={{
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
            }}
          >
            {prod.network}
          </div>
        )}
      </div>

      <div className="prod-info">
        <div className="prod-title">{prod.title}</div>
        <div className="prod-meta">
          <span className="prod-badge" style={{ color: prod.typeColor, borderColor: prod.typeColor }}>
            {prod.type}
          </span>
          <span className="prod-dot" />
          <span className="prod-year">{prod.year}</span>
        </div>
      </div>
    </div>
  );
}

interface Props {
  productions: Production[];
}

export default function Productions({ productions }: Props) {
  if (productions.length === 0) {
    return (
      <section id="productions" className="mob-section" style={{ padding: '120px 5%', background: 'var(--dark)' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
          <div className="section-tag">Production Credits</div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', marginBottom: '1.1rem' }}>
            Work shot at <span style={{ color: 'var(--gold)' }}>Cine Classic Studios</span>
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--gray)', lineHeight: 1.8 }}>
            Published production references are being refreshed in Sanity. Ask us for relevant examples when you inquire or schedule a recce.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="productions" className="mob-section" style={{ padding: '120px 5%', background: 'var(--dark)', position: 'relative', overflow: 'hidden' }}>
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '70%',
          height: '50%',
          background: 'radial-gradient(ellipse, rgba(212,175,55,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
          <div className="section-tag">Production Credits</div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', marginBottom: '1.1rem' }}>
            Campaigns, shows, and films shot at <span style={{ color: 'var(--gold)' }}>Cine Classic Studios</span>
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--gray)', maxWidth: '660px', margin: '0 auto', fontWeight: 300, lineHeight: 1.8 }}>
            A quick view of the kind of productions that trust the studio for commercial work, long-form storytelling, branded content, and fast-moving shoot schedules.
          </p>
        </div>

        <div className="lg:hidden">
          <p className="swipe-hint">swipe to browse {'>'}</p>
          <AutoScrollCarousel className="productions-grid" style={{ marginBottom: '3.5rem' }}>
            {productions.map((prod, index) => (
              <ProductionCard key={prod.id} prod={prod} index={index} />
            ))}
          </AutoScrollCarousel>
        </div>

        <div className="hidden lg:block" style={{ marginBottom: '3rem' }}>
          <ProductionsDesktopCarousel productions={productions} />
        </div>

        <div className="reveal" style={{ textAlign: 'center' }}>
          <Link href="/portfolio" className="btn-outline">
            Explore Full Portfolio
          </Link>
        </div>
      </div>
    </section>
  );
}