import Link from 'next/link';
import type { StudioSet } from '@/data/sets';

interface Props {
  studio: StudioSet;
  index?: number;
}

export default function StudioCard({ studio, index = 0 }: Props) {
  const delay = index % 4; // max 4 stagger delays

  return (
    <div
      className={`reveal${delay > 0 ? ` reveal-delay-${delay}` : ''} studio-card`}
      style={{
        background: 'var(--dark2)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '16px',
        overflow: 'hidden',
        transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Thumbnail */}
      <div className="studio-card-thumb" style={{
        aspectRatio: '16/9',
        background: studio.gradient,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        overflow: 'hidden',
      }}>
        <span style={{ fontSize: '3rem', opacity: 0.6 }}>{studio.icon}</span>
        <span style={{
          fontSize: '0.65rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.25)',
          fontFamily: 'var(--font-inter), sans-serif',
        }}>
          {studio.name}
        </span>

        {/* Accent top bar */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '3px',
          background: `linear-gradient(90deg, transparent, ${studio.accentColor}, transparent)`,
          opacity: 0.6,
        }} />
      </div>

      {/* Content */}
      <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div style={{
          fontSize: '0.65rem',
          fontWeight: 600,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: studio.accentColor,
          opacity: 0.85,
        }}>
          {studio.size} · {studio.capacity}
        </div>

        <h3 style={{
          fontFamily: 'var(--font-playfair), serif',
          fontSize: '1.25rem',
          fontWeight: 700,
          color: 'var(--white)',
          lineHeight: 1.2,
        }}>
          {studio.name}
        </h3>

        <p style={{
          fontSize: '0.875rem',
          color: 'var(--gray)',
          fontWeight: 300,
          lineHeight: 1.7,
          flex: 1,
        }}>
          {studio.shortDescription}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          {studio.suitableFor.slice(0, 3).map((tag) => (
            <span key={tag} style={{
              fontSize: '0.65rem',
              fontWeight: 500,
              letterSpacing: '0.06em',
              color: 'var(--gray)',
              background: 'var(--dark4)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '100px',
              padding: '3px 10px',
              whiteSpace: 'nowrap',
            }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Footer: CTA */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingTop: '0.75rem',
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}>
          <Link
            href={`/studios/${studio.slug}`}
            className="studio-card-cta"
            style={{
              background: 'transparent',
              border: '1px solid rgba(212,175,55,0.35)',
              color: 'var(--gold)',
              padding: '8px 18px',
              borderRadius: '100px',
              fontSize: '0.72rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
              whiteSpace: 'nowrap',
              display: 'inline-block',
            }}
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
}
