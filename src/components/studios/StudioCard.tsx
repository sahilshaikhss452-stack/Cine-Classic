import Link from 'next/link';
import { ArrowRightIcon, GridIcon, IconBadge } from '@/components/ui/icons';
import type { SanityStudioCard } from '@/lib/sanity';
import { fmtSize } from '@/lib/studio-utils';

interface Props {
  studio: SanityStudioCard;
  index?: number;
}

export default function StudioCard({ studio, index = 0 }: Props) {
  const delay = index % 4;
  const topUseCases = studio.suitableFor.slice(0, 3);

  return (
    <div
      className={`reveal${delay > 0 ? ` reveal-delay-${delay}` : ''} studio-card`}
      style={{
        background: 'var(--dark2)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '18px',
        overflow: 'hidden',
        transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 24px 60px rgba(0,0,0,0.14)',
      }}
    >
      <div
        className="studio-card-thumb"
        style={{
          aspectRatio: '16/9',
          background: studio.gradient ?? 'linear-gradient(135deg, #1a1a1a, #2a2a2a)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.7rem',
          overflow: 'hidden',
        }}
      >
        <IconBadge size={72} rounded={22} style={{ color: 'rgba(255,255,255,0.9)', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.16)' }}>
          <GridIcon size={28} />
        </IconBadge>
        <span
          style={{
            fontSize: '0.65rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.28)',
            fontFamily: 'var(--font-inter), sans-serif',
          }}
        >
          {studio.title}
        </span>

        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: `linear-gradient(90deg, transparent, ${studio.accentColor ?? '#d4af37'}, transparent)`,
            opacity: 0.7,
          }}
        />
      </div>

      <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
        <div
          style={{
            fontSize: '0.68rem',
            fontWeight: 700,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: studio.accentColor ?? '#d4af37',
            opacity: 0.9,
          }}
        >
          {fmtSize(studio.size)} | {studio.capacity ?? 'Crew size on request'}
        </div>

        <h3
          style={{
            fontFamily: 'var(--font-playfair), serif',
            fontSize: '1.32rem',
            fontWeight: 700,
            color: 'var(--white)',
            lineHeight: 1.15,
          }}
        >
          {studio.title}
        </h3>

        <p
          style={{
            fontSize: '0.9rem',
            color: 'var(--gray)',
            fontWeight: 300,
            lineHeight: 1.75,
            flex: 1,
          }}
        >
          {studio.tagline ?? 'Explore the set, layout, specs, and best-fit shoot types.'}
        </p>

        {topUseCases.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
            {topUseCases.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: '0.65rem',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  color: 'var(--gray-lt)',
                  background: 'var(--dark4)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '100px',
                  padding: '4px 10px',
                  whiteSpace: 'nowrap',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            paddingTop: '0.85rem',
            borderTop: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <span style={{ fontSize: '0.74rem', color: 'rgba(255,255,255,0.46)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Layout, gallery, specs
          </span>
          <Link
            href={`/studios/${studio.slug}`}
            className="studio-card-cta"
            style={{
              background: 'transparent',
              border: '1px solid rgba(212,175,55,0.35)',
              color: 'var(--gold)',
              padding: '8px 16px',
              borderRadius: '100px',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
              whiteSpace: 'nowrap',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            Explore Studio
            <ArrowRightIcon size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
