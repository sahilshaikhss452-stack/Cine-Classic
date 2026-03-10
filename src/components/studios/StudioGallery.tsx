'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { useSiteSettings } from '@/components/site/SiteSettingsProvider';
import type { SanityStudio, StudioArea, StudioAreaImage } from '@/lib/sanity';
import { fmtHeight, fmtRate, fmtRateUnit, fmtSize } from '@/lib/studio-utils';

interface Props {
  studio: SanityStudio;
}

interface DisplayAreaImage {
  id: string;
  imageUrl: string;
  alt: string;
  caption: string | null;
}

interface DisplayArea {
  id: string;
  name: string;
  description: string | null;
  images: DisplayAreaImage[];
  isLegacy: boolean;
}

function mapStructuredAreaImages(studio: SanityStudio, area: StudioArea): DisplayAreaImage[] {
  return area.images
    .filter((image): image is StudioAreaImage & { imageUrl: string } => typeof image.imageUrl === 'string')
    .map((image, index) => ({
      id: image._key || `${area._key}-${index}`,
      imageUrl: image.imageUrl,
      alt: image.alt || `${studio.title} ${area.areaName} view ${index + 1}`,
      caption: image.caption,
    }));
}

function buildDisplayAreas(studio: SanityStudio): DisplayArea[] {
  const structuredAreas = studio.studioAreas
    .map((area) => ({
      id: area._key,
      name: area.areaName,
      description: area.shortDescription,
      images: mapStructuredAreaImages(studio, area),
      isLegacy: false,
    }))
    .filter((area) => area.name && area.images.length > 0);

  if (structuredAreas.length > 0) {
    return structuredAreas;
  }

  if (studio.galleryImages.length === 0) {
    return [];
  }

  return [
    {
      id: 'overview',
      name: 'Overview',
      description: studio.setLayoutDescription,
      isLegacy: true,
      images: studio.galleryImages.map((imageUrl, index) => ({
        id: `legacy-${index}`,
        imageUrl,
        alt: `${studio.title} overview image ${index + 1}`,
        caption: null,
      })),
    },
  ];
}

function getImageVariant(index: number): 'hero' | 'support' | 'tile' {
  if (index === 0) {
    return 'hero';
  }

  if (index === 1 || index === 2) {
    return 'support';
  }

  return 'tile';
}

function AreaImageCard({
  image,
  studioTitle,
  areaName,
  variant,
}: {
  image: DisplayAreaImage;
  studioTitle: string;
  areaName: string;
  variant: 'hero' | 'support' | 'tile';
}) {
  return (
    <figure className={`studio-area-card studio-area-card--${variant}`}>
      <Image
        src={image.imageUrl}
        alt={image.alt || `${studioTitle} ${areaName}`}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 33vw"
        style={{ objectFit: 'cover' }}
      />
      <figcaption className="studio-area-card__caption">
        <span className="studio-area-card__eyebrow">{areaName}</span>
        <span className="studio-area-card__text">
          {image.caption || `${studioTitle} - ${areaName}`}
        </span>
      </figcaption>
    </figure>
  );
}

function WalkthroughCard({ studio }: { studio: SanityStudio }) {
  const settings = useSiteSettings();
  const whatsappText = encodeURIComponent(
    `Hi, I would like a walkthrough of the ${studio.title} at Cine Classic Studios.`,
  );
  const rateDisplay = `${fmtRate(studio.rateHourly, studio.ratePerDay)}${fmtRateUnit(
    studio.rateUnit,
    studio.rateHourly,
  )}`;

  return (
    <div
      style={{
        borderRadius: '18px',
        border: '1px solid rgba(255,255,255,0.08)',
        background: 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))',
        padding: '1.5rem',
        display: 'grid',
        gap: '1rem',
      }}
    >
      <div>
        <div className="section-tag" style={{ marginBottom: '0.85rem' }}>
          Guided Recce
        </div>
        <h3
          style={{
            fontFamily: 'var(--font-playfair), serif',
            fontSize: 'clamp(1.2rem, 2.5vw, 1.7rem)',
            lineHeight: 1.15,
            marginBottom: '0.75rem',
          }}
        >
          Need a closer look before booking?
        </h3>
        <p style={{ fontSize: '0.92rem', color: 'var(--gray-lt)', lineHeight: 1.8 }}>
          Schedule a walkthrough and our team will guide you through the set, angles, access,
          and production logistics in person.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '0.75rem',
        }}
      >
        {[
          { label: 'Floor area', value: fmtSize(studio.size) },
          { label: 'Ceiling height', value: fmtHeight(studio.height) },
          { label: 'Rate from', value: rateDisplay },
        ].map((item) => (
          <div
            key={item.label}
            style={{
              borderRadius: '14px',
              border: '1px solid rgba(255,255,255,0.07)',
              background: 'rgba(255,255,255,0.03)',
              padding: '0.9rem 1rem',
            }}
          >
            <div
              style={{
                fontSize: '0.65rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--gray)',
                marginBottom: '0.35rem',
              }}
            >
              {item.label}
            </div>
            <div style={{ fontSize: '0.95rem', color: 'var(--white)', fontWeight: 600 }}>
              {item.value}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
        <a
          href={`https://wa.me/${settings.whatsappNumber}?text=${whatsappText}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0.8rem 1.2rem',
            borderRadius: '999px',
            border: '1px solid rgba(37,211,102,0.3)',
            background: 'rgba(37,211,102,0.12)',
            color: '#4ade80',
            fontSize: '0.85rem',
            fontWeight: 600,
            textDecoration: 'none',
          }}
        >
          WhatsApp walkthrough
        </a>
        <a
          href="#booking"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0.8rem 1.2rem',
            borderRadius: '999px',
            background: 'var(--gold)',
            color: 'var(--dark)',
            fontSize: '0.85rem',
            fontWeight: 700,
            textDecoration: 'none',
          }}
        >
          Book this studio
        </a>
      </div>
    </div>
  );
}

export default function StudioGallery({ studio }: Props) {
  const displayAreas = useMemo(() => buildDisplayAreas(studio), [studio]);
  const [selectedAreaId, setSelectedAreaId] = useState(displayAreas[0]?.id ?? '');

  useEffect(() => {
    if (displayAreas.length === 0) {
      if (selectedAreaId) {
        setSelectedAreaId('');
      }
      return;
    }

    if (!displayAreas.some((area) => area.id === selectedAreaId)) {
      setSelectedAreaId(displayAreas[0].id);
    }
  }, [displayAreas, selectedAreaId]);

  const selectedArea =
    displayAreas.find((area) => area.id === selectedAreaId) ?? displayAreas[0] ?? null;
  const layoutImageUrl = studio.setLayoutImage;
  const hasLayoutImage = !!layoutImageUrl;
  const hasGalleryAreas = displayAreas.length > 0 && !!selectedArea;
  const mobileHeroImage = selectedArea?.images[0] ?? null;
  const mobileSecondaryImages = selectedArea?.images.slice(1) ?? [];
  const mobileCaption = mobileHeroImage?.caption ?? selectedArea?.description ?? null;

  if (!hasLayoutImage && !hasGalleryAreas) {
    return null;
  }

  return (
    <section id="gallery" className="studio-scout-section" style={{ padding: '80px 5%', background: 'var(--dark)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="reveal studio-scout-header" style={{ marginBottom: '2.75rem' }}>
          <div className="section-tag">Location Scout</div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', lineHeight: 1.1 }}>
            Walk the set <span style={{ color: 'var(--gold)' }}>by area</span>
          </h2>
          <p
            className="studio-scout-helper"
            style={{
              fontSize: '0.95rem',
              color: 'var(--gray)',
              fontWeight: 300,
              marginTop: '0.75rem',
              maxWidth: '640px',
            }}
          >
            Start with the layout reference, then switch between production zones to review the
            photos that matter to your shoot.
          </p>
        </div>

        <div
          className="studio-scout-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: hasLayoutImage ? 'minmax(0, 0.92fr) minmax(0, 1.08fr)' : '1fr',
            gap: '1.5rem',
            alignItems: 'start',
          }}
        >
          {hasLayoutImage && layoutImageUrl && (
            <div
              className="reveal studio-scout-layout"
              style={{
                display: 'grid',
                gap: '1rem',
                position: 'sticky',
                top: '108px',
              }}
            >
              <div
                className="studio-layout-card"
                style={{
                  borderRadius: '18px',
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.08)',
                  background: 'var(--dark2)',
                }}
              >
                <div
                  className="studio-layout-card__meta"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    padding: '1rem 1.1rem',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: '0.68rem',
                        letterSpacing: '0.16em',
                        textTransform: 'uppercase',
                        color: 'var(--gold)',
                        marginBottom: '0.3rem',
                      }}
                    >
                      Layout reference
                    </div>
                    <div style={{ fontSize: '0.95rem', color: 'var(--white)', fontWeight: 600 }}>
                      {studio.title}
                    </div>
                  </div>
                  {displayAreas.length > 0 && (
                    <div
                      className="studio-layout-card__stats"
                      style={{
                        fontSize: '0.72rem',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: 'var(--gray)',
                      }}
                    >
                      {displayAreas.length} area{displayAreas.length === 1 ? '' : 's'}
                    </div>
                  )}
                </div>

                <div style={{ position: 'relative', aspectRatio: '4 / 3' }}>
                  <Image
                    src={layoutImageUrl}
                    alt={`${studio.title} layout reference`}
                    fill
                    sizes="(max-width: 900px) 100vw, 45vw"
                    style={{ objectFit: 'contain', background: 'rgba(255,255,255,0.02)' }}
                  />
                </div>
              </div>

              {studio.setLayoutDescription && (
                <div
                  className="studio-layout-note"
                  style={{
                    borderRadius: '16px',
                    border: '1px solid rgba(255,255,255,0.06)',
                    background: 'rgba(255,255,255,0.03)',
                    padding: '1rem 1.15rem',
                  }}
                >
                  <div
                    style={{
                      fontSize: '0.68rem',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: 'var(--gold)',
                      marginBottom: '0.55rem',
                    }}
                  >
                    Scout note
                  </div>
                  <p style={{ fontSize: '0.92rem', color: 'var(--gray-lt)', lineHeight: 1.75 }}>
                    {studio.setLayoutDescription}
                  </p>
                </div>
              )}

              {!hasGalleryAreas && <WalkthroughCard studio={studio} />}
            </div>
          )}

          {hasGalleryAreas && selectedArea && (
            <div className="reveal reveal-delay-1 studio-scout-gallery" style={{ display: 'grid', gap: '1rem' }}>
              <div
                className="studio-area-controls"
                style={{
                  borderRadius: '18px',
                  border: '1px solid rgba(255,255,255,0.07)',
                  background: 'rgba(255,255,255,0.03)',
                  padding: '1.1rem',
                }}
              >
                <div
                  className="studio-area-controls__intro"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    flexWrap: 'wrap',
                    marginBottom: '0.9rem',
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: '0.68rem',
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: 'var(--gold)',
                        marginBottom: '0.35rem',
                      }}
                    >
                      Browse by area
                    </div>
                    <div style={{ fontSize: '0.95rem', color: 'var(--gray-lt)' }}>
                      Select a zone to review its scouting images.
                    </div>
                  </div>

                  {selectedArea.isLegacy && (
                    <div
                      className="studio-area-controls__badge"
                      style={{
                        fontSize: '0.68rem',
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: 'var(--gray)',
                      }}
                    >
                      Legacy gallery view
                    </div>
                  )}
                </div>

                <div className="studio-area-chip-strip">
                  {displayAreas.map((area) => {
                    const isActive = area.id === selectedArea.id;

                    return (
                      <button
                        key={area.id}
                        type="button"
                        aria-pressed={isActive}
                        onClick={() => setSelectedAreaId(area.id)}
                        style={{
                          borderRadius: '999px',
                          border: isActive
                            ? '1px solid rgba(212,175,55,0.45)'
                            : '1px solid rgba(255,255,255,0.08)',
                          background: isActive
                            ? 'rgba(212,175,55,0.14)'
                            : 'rgba(255,255,255,0.03)',
                          color: isActive ? 'var(--gold)' : 'var(--gray-lt)',
                          fontSize: '0.84rem',
                          fontWeight: 600,
                          padding: '0.82rem 1rem',
                          whiteSpace: 'nowrap',
                          transition: 'all 0.25s ease',
                        }}
                      >
                        {area.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div
                key={selectedArea.id}
                className="studio-area-panel"
                style={{
                  display: 'grid',
                  gap: '1rem',
                  animation: 'studioAreaFade 260ms ease',
                }}
              >
                <div className="studio-area-mobile-flow">
                  {mobileHeroImage && (
                    <AreaImageCard
                      image={mobileHeroImage}
                      studioTitle={studio.title}
                      areaName={selectedArea.name}
                      variant="hero"
                    />
                  )}

                  <div className="studio-area-mobile-copy">
                    <div className="studio-area-mobile-title">{selectedArea.name}</div>
                    {mobileCaption && <p>{mobileCaption}</p>}
                  </div>

                  {mobileSecondaryImages.length > 0 && (
                    <div className="studio-area-mobile-thumbs">
                      {mobileSecondaryImages.map((image) => (
                        <AreaImageCard
                          key={image.id}
                          image={image}
                          studioTitle={studio.title}
                          areaName={selectedArea.name}
                          variant="tile"
                        />
                      ))}
                    </div>
                  )}
                </div>

                <div
                  className="studio-area-panel-header"
                  style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    flexWrap: 'wrap',
                  }}
                >
                  <div className="studio-area-copy">
                    <h3
                      style={{
                        fontFamily: 'var(--font-playfair), serif',
                        fontSize: 'clamp(1.35rem, 2.4vw, 1.9rem)',
                        lineHeight: 1.15,
                        marginBottom: '0.45rem',
                      }}
                    >
                      {selectedArea.name}
                    </h3>
                    {selectedArea.description && (
                      <p
                        style={{
                          maxWidth: '640px',
                          fontSize: '0.92rem',
                          color: 'var(--gray-lt)',
                          lineHeight: 1.75,
                        }}
                      >
                        {selectedArea.description}
                      </p>
                    )}
                  </div>
                  <div
                    className="studio-area-count"
                    style={{
                      fontSize: '0.72rem',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: 'var(--gray)',
                    }}
                  >
                    {selectedArea.images.length} photo{selectedArea.images.length === 1 ? '' : 's'}
                  </div>
                </div>

                <div className="studio-area-grid studio-area-grid--desktop">
                  {selectedArea.images.map((image, index) => (
                    <AreaImageCard
                      key={image.id}
                      image={image}
                      studioTitle={studio.title}
                      areaName={selectedArea.name}
                      variant={getImageVariant(index)}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .studio-area-chip-strip {
          display: flex;
          gap: 0.75rem;
          overflow-x: auto;
          padding-bottom: 0.15rem;
          scrollbar-width: none;
        }

        .studio-area-chip-strip::-webkit-scrollbar {
          display: none;
        }

        .studio-area-mobile-flow {
          display: none;
        }

        .studio-area-mobile-thumbs {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
        }

        .studio-area-mobile-copy {
          display: grid;
          gap: 0.35rem;
        }

        .studio-area-mobile-title {
          font-family: var(--font-playfair), serif;
          font-size: 1.2rem;
          line-height: 1.15;
          color: var(--white);
        }

        .studio-area-mobile-copy p {
          font-size: 0.88rem;
          color: var(--gray-lt);
          line-height: 1.7;
        }

        .studio-area-grid {
          display: grid;
          grid-template-columns: repeat(12, minmax(0, 1fr));
          gap: 12px;
        }

        .studio-area-card {
          position: relative;
          overflow: hidden;
          border-radius: 18px;
          border: 1px solid rgba(255,255,255,0.08);
          background: var(--dark2);
          min-height: 0;
        }

        .studio-area-card--hero {
          grid-column: span 7;
          grid-row: span 2;
          aspect-ratio: 16 / 11;
        }

        .studio-area-card--support {
          grid-column: span 5;
          aspect-ratio: 5 / 4;
        }

        .studio-area-card--tile {
          grid-column: span 4;
          aspect-ratio: 4 / 3;
        }

        .studio-area-card__caption {
          position: absolute;
          inset: auto 0 0 0;
          display: grid;
          gap: 0.15rem;
          padding: 1rem 1rem 0.95rem;
          background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.78) 100%);
        }

        .studio-area-card__eyebrow {
          font-size: 0.68rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(212,175,55,0.9);
        }

        .studio-area-card__text {
          font-size: 0.86rem;
          color: var(--white);
          line-height: 1.5;
        }

        @keyframes studioAreaFade {
          from {
            opacity: 0;
            transform: translateY(8px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 900px) {
          .studio-scout-section {
            padding-top: 60px !important;
            padding-bottom: 60px !important;
          }

          .studio-scout-section .reveal,
          .studio-scout-section .reveal.visible {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }

          .studio-scout-grid {
            grid-template-columns: 1fr !important;
            gap: 1.2rem !important;
          }

          .studio-scout-layout {
            position: static !important;
            top: auto !important;
            z-index: auto !important;
            gap: 1rem !important;
          }

          .studio-layout-card {
            isolation: isolate;
          }

          .studio-scout-gallery,
          .studio-area-panel {
            gap: 1rem !important;
          }

          .studio-area-panel-header {
            align-items: flex-start !important;
          }

          .studio-area-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .studio-area-card--hero,
          .studio-area-card--support,
          .studio-area-card--tile {
            grid-column: span 1;
            grid-row: span 1;
            aspect-ratio: 4 / 3;
          }
        }

        @media (max-width: 640px) {
          .studio-scout-section {
            padding-top: 48px !important;
            padding-bottom: 48px !important;
          }

          .studio-scout-header {
            margin-bottom: 1.5rem !important;
          }

          .studio-scout-helper {
            font-size: 0.88rem !important;
            line-height: 1.7 !important;
            margin-top: 0.55rem !important;
          }

          .studio-layout-card {
            border-radius: 16px;
          }

          .studio-layout-card__meta {
            padding: 0.85rem 0.95rem !important;
            align-items: flex-start !important;
          }

          .studio-layout-card__stats {
            display: none;
          }

          .studio-layout-note {
            padding: 0.9rem 1rem !important;
          }

          .studio-layout-note p {
            font-size: 0.84rem !important;
            line-height: 1.65 !important;
          }

          .studio-area-controls {
            border: none !important;
            background: transparent !important;
            padding: 0 !important;
          }

          .studio-area-controls__intro,
          .studio-area-controls__badge {
            display: none !important;
          }

          .studio-area-chip-strip {
            gap: 0.65rem;
            padding-bottom: 0.25rem;
            scroll-snap-type: x proximity;
          }

          .studio-area-chip-strip button {
            padding: 0.8rem 1rem !important;
            scroll-snap-align: start;
          }

          .studio-area-chip-strip button[aria-pressed='true'] {
            background: var(--gold) !important;
            color: var(--dark) !important;
            border-color: var(--gold) !important;
            box-shadow: 0 10px 24px rgba(212,175,55,0.2);
          }

          .studio-area-chip-strip button[aria-pressed='false'] {
            background: rgba(255,255,255,0.04) !important;
            color: var(--white2) !important;
          }

          .studio-area-panel {
            gap: 0.85rem !important;
          }

          .studio-area-panel-header,
          .studio-area-grid--desktop {
            display: none !important;
          }

          .studio-area-mobile-flow {
            display: grid;
            gap: 0.85rem;
          }

          .studio-area-mobile-flow .studio-area-card--hero {
            aspect-ratio: 5 / 4;
            grid-column: auto;
            grid-row: auto;
          }

          .studio-area-mobile-thumbs .studio-area-card {
            border-radius: 14px;
          }

          .studio-area-mobile-thumbs .studio-area-card__caption {
            padding: 0.75rem 0.8rem 0.72rem;
          }

          .studio-area-mobile-thumbs .studio-area-card__eyebrow {
            font-size: 0.58rem;
          }

          .studio-area-mobile-thumbs .studio-area-card__text {
            font-size: 0.74rem;
            line-height: 1.4;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        }
      `}</style>
    </section>
  );
}
