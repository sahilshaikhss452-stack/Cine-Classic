'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import HomeProductionsRail from '@/components/HomeProductionsRail';
import type { Production } from '@/lib/ui/production';

function renderHeading(heading: string, highlight?: string) {
  if (!highlight || !heading.includes(highlight)) {
    return heading;
  }

  const [before, ...afterParts] = heading.split(highlight);
  const after = afterParts.join(highlight);

  return (
    <>
      {before}
      <span style={{ color: 'var(--gold)' }}>{highlight}</span>
      {after}
    </>
  );
}

type VideoSource =
  | { kind: 'youtube'; src: string }
  | { kind: 'direct'; src: string }
  | { kind: 'external'; src: string };

function getYoutubeEmbedUrl(videoUrl: string) {
  try {
    const url = new URL(videoUrl);
    const hostname = url.hostname.replace(/^www\./, '');

    if (hostname === 'youtu.be') {
      const id = url.pathname.split('/').filter(Boolean)[0];
      return id ? `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1` : null;
    }

    if (hostname.endsWith('youtube.com')) {
      const watchId = url.searchParams.get('v');
      if (watchId) {
        return `https://www.youtube-nocookie.com/embed/${watchId}?autoplay=1&rel=0&modestbranding=1`;
      }

      const segments = url.pathname.split('/').filter(Boolean);
      const candidate = segments[0] === 'embed' || segments[0] === 'shorts' || segments[0] === 'live' ? segments[1] : null;
      return candidate ? `https://www.youtube-nocookie.com/embed/${candidate}?autoplay=1&rel=0&modestbranding=1` : null;
    }
  } catch {
    return null;
  }

  return null;
}

function resolveVideoSource(videoUrl: string): VideoSource {
  const youtubeEmbedUrl = getYoutubeEmbedUrl(videoUrl);
  if (youtubeEmbedUrl) {
    return { kind: 'youtube', src: youtubeEmbedUrl };
  }

  try {
    const parsed = new URL(videoUrl);
    if (/\.(mp4|webm|ogg)$/i.test(parsed.pathname)) {
      return { kind: 'direct', src: videoUrl };
    }
  } catch {
    return { kind: 'external', src: videoUrl };
  }

  return { kind: 'external', src: videoUrl };
}

function ProductionVideoModal({ production, onClose }: { production: Production; onClose: () => void }) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const source = production.videoUrl ? resolveVideoSource(production.videoUrl) : null;

  if (!source) {
    return null;
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'rgba(0,0,0,0.9)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.25rem',
      }}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        style={{
          width: 'min(1100px, 100%)',
          background: 'rgba(12,12,12,0.96)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '20px',
          boxShadow: '0 40px 120px rgba(0,0,0,0.7)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close video"
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'rgba(0,0,0,0.65)',
            border: '1px solid rgba(255,255,255,0.12)',
            color: 'var(--white)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="M3 3l10 10M13 3 3 13" />
          </svg>
        </button>

        <div style={{ padding: '1.25rem 1.25rem 0.75rem' }}>
          <div className="section-tag" style={{ marginBottom: '0.75rem' }}>Production Reel</div>
          <h3 style={{ fontFamily: 'var(--font-playfair), serif', fontSize: 'clamp(1.5rem, 2.8vw, 2.2rem)', color: 'var(--white)', lineHeight: 1.15, marginBottom: '0.45rem', paddingRight: '3.5rem' }}>
            {production.title}
          </h3>
          <p style={{ color: 'var(--gray)', fontSize: '0.88rem', letterSpacing: '0.04em' }}>
            {production.type} • {production.year}
            {production.network ? ` • ${production.network}` : ''}
          </p>
        </div>

        <div style={{ padding: '0 1.25rem' }}>
          <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', borderRadius: '18px', overflow: 'hidden', background: '#050505', border: '1px solid rgba(255,255,255,0.06)' }}>
            {source.kind === 'youtube' ? (
              <iframe
                src={source.src}
                title={`${production.title} video`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                style={{ width: '100%', height: '100%', border: '0' }}
              />
            ) : null}

            {source.kind === 'direct' ? (
              <video controls autoPlay playsInline poster={production.posterImage} style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
                <source src={source.src} />
              </video>
            ) : null}

            {source.kind === 'external' ? (
              <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', padding: '2rem', textAlign: 'center', background: production.gradient }}>
                <div style={{ fontSize: '0.8rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)' }}>External video link</div>
                <p style={{ maxWidth: '460px', color: 'var(--gray-lt)', lineHeight: 1.8 }}>
                  This production has a video URL attached, but it cannot be embedded directly here. Use the button below to open it in a new tab.
                </p>
                <a href={source.src} target="_blank" rel="noreferrer" className="btn-outline">
                  Open Video
                </a>
              </div>
            ) : null}
          </div>
        </div>

        <div style={{ padding: '1rem 1.25rem 1.4rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
            <span
              style={{
                fontSize: '0.68rem',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: production.typeColor,
                border: `1px solid ${production.typeColor}`,
                padding: '4px 10px',
                borderRadius: '100px',
              }}
            >
              {production.type}
            </span>
            {production.description ? <span style={{ color: 'var(--gray)', fontSize: '0.92rem', lineHeight: 1.8 }}>{production.description}</span> : null}
          </div>

          {source.kind !== 'external' && production.videoUrl ? (
            <a href={production.videoUrl} target="_blank" rel="noreferrer" className="btn-outline">
              Open on source
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}

interface Props {
  productions: Production[];
  sectionId?: string;
  heading: string;
  headingHighlight?: string;
  description: string;
  eyebrow?: string;
  emptyDescription?: string;
  ctaHref?: string;
  ctaLabel?: string;
  enableVideoPlayback?: boolean;
}

export default function Productions({
  productions,
  sectionId = 'productions',
  heading,
  headingHighlight,
  description,
  eyebrow = 'Production Credits',
  emptyDescription,
  ctaHref = '/portfolio',
  ctaLabel = 'Explore Full Portfolio',
  enableVideoPlayback = false,
}: Props) {
  const [selectedProduction, setSelectedProduction] = useState<Production | null>(null);

  const openVideo = (production: Production) => {
    if (!production.videoUrl) {
      return;
    }

    setSelectedProduction(production);
  };

  if (productions.length === 0) {
    return (
      <section id={sectionId} className="mob-section" style={{ padding: '120px 5%', background: 'var(--dark)' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
          <div className="section-tag">{eyebrow}</div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', marginBottom: '1.1rem' }}>{renderHeading(heading, headingHighlight)}</h2>
          <p style={{ fontSize: '1rem', color: 'var(--gray)', lineHeight: 1.8 }}>
            {emptyDescription ?? 'Published production references for this homepage rail are being refreshed in Sanity. Ask us for relevant examples when you inquire or schedule a recce.'}
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id={sectionId} className="mob-section" style={{ padding: '120px 5%', background: 'var(--dark)', position: 'relative', overflow: 'hidden' }}>
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
            <div className="section-tag">{eyebrow}</div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', marginBottom: '1.1rem' }}>{renderHeading(heading, headingHighlight)}</h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--gray)', maxWidth: '660px', margin: '0 auto', fontWeight: 300, lineHeight: 1.8 }}>{description}</p>
          </div>

          <div className="reveal" style={{ marginBottom: '3rem' }}>
            <HomeProductionsRail
              productions={productions}
              ariaLabel={heading}
              onPlayProduction={enableVideoPlayback ? openVideo : undefined}
            />
          </div>

          <div className="reveal" style={{ textAlign: 'center' }}>
            <Link href={ctaHref} className="btn-outline">
              {ctaLabel}
            </Link>
          </div>
        </div>
      </section>

      {selectedProduction ? <ProductionVideoModal production={selectedProduction} onClose={() => setSelectedProduction(null)} /> : null}
    </>
  );
}
