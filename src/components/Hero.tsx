'use client';

import { useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useSiteSettings } from '@/components/site/SiteSettingsProvider';
import { ArrowRightIcon, SparkIcon } from '@/components/ui/icons';
import type { HomePageContent } from '@/lib/sanity';

interface Props {
  content: HomePageContent;
}

const TRUST_POINTS = ['Fast recce coordination', 'Crew-friendly support', 'Availability guidance within hours'];

export default function Hero({ content }: Props) {
  const [videoFailed, setVideoFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const settings = useSiteSettings();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const trustLine = settings.featuredClients.slice(0, 4);

  return (
    <section
      ref={sectionRef}
      id="home"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <motion.div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: '-8%',
          height: '116%',
          y: shouldReduceMotion ? 0 : bgY,
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `
              radial-gradient(ellipse 70% 60% at 50% 30%, rgba(212,175,55,0.12) 0%, transparent 55%),
              radial-gradient(ellipse 40% 40% at 20% 80%, rgba(212,175,55,0.06) 0%, transparent 50%),
              radial-gradient(ellipse 30% 30% at 80% 70%, rgba(212,175,55,0.04) 0%, transparent 50%),
              linear-gradient(160deg, #080808 0%, #060606 100%)
            `,
          }}
        />

        {!videoFailed && (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            onError={() => setVideoFailed(true)}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.34,
            }}
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
            <source src="/videos/hero.webm" type="video/webm" />
          </video>
        )}
      </motion.div>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to top, rgba(6,6,6,0.95) 0%, rgba(6,6,6,0.7) 45%, rgba(6,6,6,0.34) 100%)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(212,175,55,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,175,55,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 20%, transparent 70%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 60% at 50% 40%, black 20%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        className="hero-content-wrap"
        style={{
          position: 'relative',
          textAlign: 'center',
          maxWidth: '920px',
          padding: '148px 5% 104px',
          width: '100%',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            background: 'rgba(212,175,55,0.08)',
            border: '1px solid rgba(212,175,55,0.22)',
            padding: '9px 22px',
            borderRadius: '100px',
            marginBottom: '1.8rem',
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              background: 'var(--gold)',
              borderRadius: '50%',
              animation: 'pulse-dot 2s ease-in-out infinite',
              flexShrink: 0,
            }}
          />
          {content.heroBadge ?? settings.tagline ?? settings.businessName}
        </div>

        <h1
          style={{
            fontSize: 'clamp(2.8rem, 6.5vw, 5.2rem)',
            lineHeight: 1.01,
            fontWeight: 800,
            letterSpacing: '-0.04em',
            color: 'var(--white)',
            margin: '0 auto 1.25rem',
            maxWidth: '820px',
            textWrap: 'balance',
          }}
        >
          {content.heroHeadline}
          <br />
          <em
            style={{
              fontStyle: 'normal',
              background:
                'linear-gradient(135deg, var(--gold) 0%, var(--gold-lt) 50%, var(--gold) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {content.heroHighlight}
          </em>
        </h1>

        <p
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.16rem)',
            color: 'rgba(255,255,255,0.76)',
            maxWidth: '640px',
            margin: '0 auto 2rem',
            fontWeight: 300,
            lineHeight: 1.78,
            letterSpacing: '0.01em',
            textWrap: 'balance',
          }}
        >
          {content.heroSubheadline}
        </p>

        <div
          className="hero-cta-group"
          style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <a
            href={content.heroPrimaryCta.href}
            className="btn-primary"
            style={{ fontSize: '0.98rem', padding: '14px 32px' }}
          >
            {content.heroPrimaryCta.label}
            <ArrowRightIcon size={16} />
          </a>
          <a
            href={content.heroSecondaryCta.href}
            className="btn-outline"
            style={{ fontSize: '0.98rem', padding: '14px 32px' }}
          >
            {content.heroSecondaryCta.label}
          </a>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0.7rem',
            marginTop: '1.3rem',
          }}
        >
          {TRUST_POINTS.map((point) => (
            <span
              key={point}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '8px 14px',
                borderRadius: '999px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: 'rgba(255,255,255,0.74)',
                fontSize: '0.74rem',
                letterSpacing: '0.05em',
              }}
            >
              <SparkIcon size={13} />
              {point}
            </span>
          ))}
        </div>

        {trustLine.length > 0 && (
          <p
            style={{
              margin: '1.35rem auto 0',
              maxWidth: '640px',
              color: 'rgba(255,255,255,0.5)',
              fontSize: '0.8rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              lineHeight: 1.7,
            }}
          >
            Featured client work includes teams creating for{' '}
            <span style={{ color: 'rgba(212,175,55,0.9)' }}>{trustLine.join(' · ')}</span>
          </p>
        )}

        <div
          className="hero-stats-strip"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(165px, 1fr))',
            gap: '1rem',
            margin: '3rem auto 0',
            maxWidth: '760px',
          }}
        >
          {content.heroStats.map((stat) => (
            <div
              key={stat.label}
              style={{
                padding: '1.1rem 1.2rem',
                textAlign: 'center',
                borderRadius: '18px',
                background: 'rgba(10,10,10,0.58)',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 22px 48px rgba(0,0,0,0.16)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: '2rem',
                  fontWeight: 800,
                  color: 'var(--gold)',
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: '0.68rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.5)',
                  marginTop: '0.65rem',
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
      `}</style>
    </section>
  );
}

