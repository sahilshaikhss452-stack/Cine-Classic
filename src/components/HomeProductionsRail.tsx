'use client';

import { startTransition, useEffect, useRef, useState } from 'react';
import type { CSSProperties, KeyboardEvent } from 'react';
import Image from 'next/image';
import type { Production } from '@/lib/ui/production';
import { TYPE_ICONS } from '@/lib/ui/production';
import styles from './HomeProductionsRail.module.css';

interface HomeProductionsRailProps {
  productions: Production[];
  ariaLabel: string;
  onPlayProduction?: (production: Production) => void;
}

function getCenteredIndex(viewport: HTMLDivElement, cards: Array<HTMLElement | null>) {
  const viewportCenter = viewport.scrollLeft + viewport.clientWidth / 2;
  let closestIndex = 0;
  let smallestDistance = Number.POSITIVE_INFINITY;

  cards.forEach((card, index) => {
    if (!card) {
      return;
    }

    const cardCenter = card.offsetLeft + card.offsetWidth / 2;
    const distance = Math.abs(cardCenter - viewportCenter);

    if (distance < smallestDistance) {
      smallestDistance = distance;
      closestIndex = index;
    }
  });

  return closestIndex;
}

function scrollCardIntoView(viewport: HTMLDivElement, card: HTMLElement) {
  const targetLeft = card.offsetLeft - (viewport.clientWidth - card.offsetWidth) / 2;
  viewport.scrollTo({
    left: Math.max(0, targetLeft),
    behavior: 'smooth',
  });
}

function formatCounter(index: number, total: number) {
  return `${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
}

function getCardKicker(production: Production) {
  if (production.network) {
    return `${production.network} credit`;
  }

  if (production.type === 'Advertisement') {
    return 'Campaign credit';
  }

  if (production.type === 'Music Video') {
    return 'Performance credit';
  }

  if (production.type === 'TV Series') {
    return 'Series credit';
  }

  if (production.type === 'Web Series') {
    return 'Digital series credit';
  }

  return 'Feature credit';
}

function PlayButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button type="button" onClick={onClick} aria-label={label} className={styles.playButton}>
      <span className={styles.playIcon}>
        <svg width="10" height="10" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
          <path d="M3 2.3v7.4L9.2 6 3 2.3Z" />
        </svg>
      </span>
      Preview
    </button>
  );
}

export default function HomeProductionsRail({
  productions,
  ariaLabel,
  onPlayProduction,
}: HomeProductionsRailProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, productions.length);
    setActiveIndex(0);
  }, [productions.length]);

  useEffect(() => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.35 }
    );

    observer.observe(viewport);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    let frameId = 0;

    const updateActiveIndex = () => {
      cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(() => {
        const nextIndex = getCenteredIndex(viewport, cardRefs.current);

        startTransition(() => {
          setActiveIndex((currentIndex) => (currentIndex === nextIndex ? currentIndex : nextIndex));
        });
      });
    };

    updateActiveIndex();

    viewport.addEventListener('scroll', updateActiveIndex, { passive: true });

    const resizeObserver = new ResizeObserver(updateActiveIndex);
    resizeObserver.observe(viewport);
    cardRefs.current.forEach((card) => {
      if (card) {
        resizeObserver.observe(card);
      }
    });

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      viewport.removeEventListener('scroll', updateActiveIndex);
    };
  }, [productions.length]);

  useEffect(() => {
    if (productions.length < 2 || !isVisible || isHovered) {
      return;
    }

    const intervalId = window.setInterval(() => {
      if (window.innerWidth < 1024) {
        return;
      }

      const viewport = viewportRef.current;
      const nextIndex = (activeIndex + 1) % productions.length;
      const nextCard = cardRefs.current[nextIndex];

      if (!viewport || !nextCard) {
        return;
      }

      scrollCardIntoView(viewport, nextCard);

      startTransition(() => {
        setActiveIndex(nextIndex);
      });
    }, 5200);

    return () => window.clearInterval(intervalId);
  }, [activeIndex, isHovered, isVisible, productions.length]);

  if (productions.length === 0) {
    return null;
  }

  const activeProduction = productions[Math.min(activeIndex, productions.length - 1)] ?? productions[0];
  const progress = productions.length > 1 ? ((activeIndex + 1) / productions.length) * 100 : 100;

  const goToIndex = (nextIndex: number) => {
    const viewport = viewportRef.current;
    const total = productions.length;

    if (!viewport || total === 0) {
      return;
    }

    const normalizedIndex = (nextIndex + total) % total;
    const nextCard = cardRefs.current[normalizedIndex];

    if (!nextCard) {
      return;
    }

    scrollCardIntoView(viewport, nextCard);

    startTransition(() => {
      setActiveIndex(normalizedIndex);
    });
  };

  const handleViewportKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      goToIndex(activeIndex + 1);
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goToIndex(activeIndex - 1);
    }
  };

  return (
    <div
      className={styles.shell}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.viewportWrap}>
        <div className={`${styles.edgeFade} ${styles.edgeFadeLeft}`} />
        <div className={`${styles.edgeFade} ${styles.edgeFadeRight}`} />

        <div
          ref={viewportRef}
          className={styles.viewport}
          tabIndex={0}
          onKeyDown={handleViewportKeyDown}
        >
          <div className={styles.track}>
            <div className={styles.edgePad} aria-hidden="true" />

            {productions.map((production, index) => {
              const isActive = index === activeIndex;
              const hasVideoPreview = !!onPlayProduction && !!production.videoUrl;

              return (
                <div key={production.id} className={styles.cardSlot}>
                  <article
                    ref={(node) => {
                      cardRefs.current[index] = node;
                    }}
                    className={styles.card}
                    data-active={isActive ? 'true' : 'false'}
                    style={
                      {
                        '--card-gradient': production.gradient,
                      } as CSSProperties
                    }
                    aria-current={isActive}
                  >
                    <div className={styles.media}>
                      <div className={styles.mediaBase} />

                      {production.posterImage ? (
                        <Image
                          src={production.posterImage}
                          alt={`${production.title} poster`}
                          fill
                          sizes="(max-width: 767px) 82vw, (max-width: 1023px) 62vw, 30vw"
                          className={styles.mediaImage}
                        />
                      ) : (
                        <div className={styles.mediaIcon}>{TYPE_ICONS[production.type]}</div>
                      )}

                      <div className={styles.mediaMesh} />
                      <div className={styles.mediaGlow} />
                    </div>

                    <div className={styles.topRow}>
                      <div className={styles.topLeft}>
                        <span
                          className={styles.typePill}
                          style={{
                            color: production.typeColor,
                            borderColor: `${production.typeColor}44`,
                          }}
                        >
                          {production.type}
                        </span>

                        {hasVideoPreview ? (
                          <PlayButton
                            label={`Play video preview for ${production.title}`}
                            onClick={() => onPlayProduction?.(production)}
                          />
                        ) : null}
                      </div>

                      <div className={styles.topRight}>
                        {production.network ? (
                          <span className={styles.networkBadge}>{production.network}</span>
                        ) : null}
                      </div>
                    </div>

                    <div className={styles.content}>
                      <div className={styles.contentInner}>
                        <div className={styles.kicker}>
                          <span>{getCardKicker(production)}</span>
                          <span className={styles.kickerDot} aria-hidden="true" />
                          <span>{production.year}</span>
                        </div>

                        <h3 className={styles.title}>{production.title}</h3>

                        {production.description ? (
                          <p className={styles.description}>{production.description}</p>
                        ) : null}

                        <div className={styles.footer}>
                          <span className={styles.credit}>
                            <span className={styles.creditLine} aria-hidden="true" />
                            Shot at Cine Classic Studios
                          </span>

                          {hasVideoPreview ? (
                            <span className={styles.footerHint}>Video preview available</span>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              );
            })}

            <div className={styles.edgePad} aria-hidden="true" />
          </div>
        </div>
      </div>

      <div className={styles.controls}>
        <div className={styles.progressGroup}>
          <span className={`${styles.browseCue} ${styles.cueDesktop}`}>Drag or scroll to browse</span>
          <span className={`${styles.browseCue} ${styles.cueMobile}`}>Swipe to browse</span>

          <div className={styles.progressBar} aria-hidden="true">
            <div className={styles.progressFill} style={{ width: `${progress}%` }} />
          </div>

          <span className={styles.counter} aria-live="polite">
            {formatCounter(activeIndex, productions.length)}
          </span>

          <span className={styles.activeTitle}>{activeProduction.title}</span>
        </div>

        {productions.length > 1 ? (
          <div className={styles.navGroup}>
            <button
              type="button"
              className={styles.navButton}
              onClick={() => goToIndex(activeIndex - 1)}
              aria-label="Show previous production"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M15 18 9 12l6-6" />
              </svg>
            </button>

            <button
              type="button"
              className={styles.navButton}
              onClick={() => goToIndex(activeIndex + 1)}
              aria-label="Show next production"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
