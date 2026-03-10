import Image from 'next/image';
import { ArrowRightIcon, CheckIcon, GridIcon, IconBadge } from '@/components/ui/icons';
import type { HomePageContent } from '@/lib/sanity';

interface Props {
  content: HomePageContent;
}

export default function About({ content }: Props) {
  return (
    <section
      id="about"
      className="mob-section"
      style={{
        padding: '120px 5%',
        background: 'var(--dark2)',
        position: 'relative',
      }}
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

      <div className="about-grid">
        <div
          className="reveal"
          style={{
            position: 'relative',
            border: '1px solid var(--border)',
            borderRadius: '18px',
            overflow: 'hidden',
            aspectRatio: '4/3',
            background: 'var(--dark3)',
            boxShadow: '0 30px 80px rgba(0,0,0,0.24)',
          }}
        >
          {content.aboutImageUrl ? (
            <Image
              src={content.aboutImageUrl}
              alt={content.aboutTitle}
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              style={{ objectFit: 'cover' }}
            />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                background: `
                  radial-gradient(circle at 30% 40%, rgba(212,175,55,0.12) 0%, transparent 60%),
                  radial-gradient(circle at 70% 70%, rgba(212,175,55,0.06) 0%, transparent 50%),
                  var(--dark3)
                `,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0.8,
              }}
            >
              <IconBadge size={88} rounded={28} style={{ color: 'var(--gold-lt)' }}>
                <GridIcon size={36} />
              </IconBadge>
            </div>
          )}
          {content.aboutBadge && (
            <div
              style={{
                position: 'absolute',
                bottom: '1.25rem',
                right: '1.25rem',
                background: 'var(--gold)',
                color: 'var(--dark)',
                padding: '8px 16px',
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                borderRadius: '100px',
              }}
            >
              {content.aboutBadge}
            </div>
          )}
        </div>

        <div className="reveal reveal-delay-2">
          <div className="section-tag">{content.aboutEyebrow ?? 'About Cine Classic Studios'}</div>

          <h2
            style={{
              fontSize: 'clamp(1.75rem, 3.3vw, 2.5rem)',
              marginBottom: '1.2rem',
              letterSpacing: '-0.015em',
              lineHeight: 1.15,
            }}
          >
            {content.aboutTitle}
          </h2>

          <p
            style={{
              color: 'var(--gray)',
              fontWeight: 300,
              marginBottom: '1rem',
              lineHeight: 1.78,
              fontSize: '1.02rem',
            }}
          >
            {content.aboutDescription}
          </p>

          {content.aboutSecondaryDescription && (
            <p
              style={{
                color: 'var(--gray)',
                fontWeight: 300,
                marginBottom: '1.35rem',
                lineHeight: 1.78,
                fontSize: '1.02rem',
              }}
            >
              {content.aboutSecondaryDescription}
            </p>
          )}

          <ul className="about-features-list">
            {content.aboutFeatures.map((feature) => (
              <li
                key={feature}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.8rem',
                  fontSize: '0.9rem',
                  color: 'var(--white)',
                }}
              >
                <IconBadge size={22} rounded={999} style={{ background: 'rgba(212,175,55,0.12)' }}>
                  <CheckIcon size={12} />
                </IconBadge>
                {feature}
              </li>
            ))}
          </ul>

          <a href="#booking" className="btn-primary" style={{ marginTop: '0.75rem' }}>
            Schedule a Recce
            <ArrowRightIcon size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}
