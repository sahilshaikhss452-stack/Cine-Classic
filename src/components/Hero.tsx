'use client';

import { useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useSiteSettings } from '@/components/site/SiteSettingsProvider';
import { ArrowRightIcon, SparkIcon } from '@/components/ui/icons';
import type { HomePageContent } from '@/lib/sanity';

interface Props {
  content: HomePageContent;
}

const TRUST_POINTS = ['Fast inquiry replies', 'Production-ready sets', 'Crew-friendly logistics'];

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
  const trustLine = settings.featuredClients.slice(0, 5);

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
              opacity: 0.45,
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
            'linear-gradient(to top, rgba(6,6,6,0.94) 0%, rgba(6,6,6,0.56) 45%, rgba(6,6,6,0.34) 100%)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(212,175,55,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,175,55,0.025) 1px, transparent 1px)
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
          maxWidth: '960px',
          padding: '140px 5% 100px',
          width: '100%',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.72rem',
            fontWeight: 600,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            background: 'rgba(212,175,55,0.08)',
            border: '1px solid rgba(212,175,55,0.22)',
            padding: '8px 22px',
            borderRadius: '100px',
            marginBottom: '2rem',
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
            lineHeight: 1.03,
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: 'var(--white)',
            marginBottom: '1.25rem',
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
            fontSize: 'clamp(1rem, 2vw, 1.18rem)',
            color: 'rgba(255,255,255,0.74)',
            maxWidth: '620px',
            margin: '0 auto 2.25rem',
            fontWeight: 300,
            lineHeight: 1.72,
            letterSpacing: '0.01em',
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
            style={{ fontSize: '1rem', padding: '14px 32px' }}
          >
            {content.heroPrimaryCta.label}
            <ArrowRightIcon size={16} />
          </a>
          <a
            href={content.heroSecondaryCta.href}
            className="btn-outline"
            style={{ fontSize: '1rem', padding: '14px 32px' }}
          >
            {content.heroSecondaryCta.label}
          </a>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0.75rem',
            marginTop: '1.4rem',
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
                color: 'rgba(255,255,255,0.72)',
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
          <div
            style={{
              marginTop: '1.6rem',
              display: 'inline-flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '0.6rem',
              padding: '0.85rem 1rem',
              borderRadius: '18px',
              background: 'rgba(8,8,8,0.38)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.24)',
            }}
          >
            <span
              style={{
                fontSize: '0.68rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.38)',
                paddingTop: '0.15rem',
              }}
            >
              Featured with
            </span>
            {trustLine.map((client) => (
              <span
                key={client}
                style={{
                  color: 'rgba(212,175,55,0.86)',
                  fontSize: '0.78rem',
                  letterSpacing: '0.05em',
                  padding: '0.25rem 0.6rem',
                  borderRadius: '999px',
                  background: 'rgba(212,175,55,0.08)',
                  border: '1px solid rgba(212,175,55,0.14)',
                }}
              >
                {client}
              </span>
            ))}
          </div>
        )}

        <div
          className="hero-stats-strip"
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            marginTop: '3.25rem',
            flexWrap: 'wrap',
          }}
        >
          {content.heroStats.map((stat) => (
            <div
              key={stat.label}
              style={{
                minWidth: '165px',
                padding: '1.2rem 1.35rem',
                textAlign: 'center',
                borderRadius: '18px',
                background: 'rgba(10,10,10,0.5)',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 22px 48px rgba(0,0,0,0.18)',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: '2.2rem',
                  fontWeight: 800,
                  color: 'var(--gold)',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: '0.72rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--gray)',
                  marginTop: '0.6rem',
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
