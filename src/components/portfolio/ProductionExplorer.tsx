'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { PRODUCTIONS, TYPE_ICONS } from '@/data/productions';
import type { Production, ProductionType } from '@/data/productions';

type FilterValue = 'All' | ProductionType;

const FILTERS: { label: string; value: FilterValue }[] = [
  { label: 'All',         value: 'All' },
  { label: 'Films',       value: 'Film' },
  { label: 'TV Shows',    value: 'TV Series' },
  { label: 'Web Series',  value: 'Web Series' },
  { label: 'Commercials', value: 'Advertisement' },
  { label: 'Music Videos',value: 'Music Video' },
];

// ─── Network badge ─────────────────────────────────────────────────────────────
function NetworkBadge({ name }: { name: string }) {
  return (
    <div style={{
      position: 'absolute', top: '0.75rem', right: '0.75rem',
      background: 'rgba(0,0,0,0.65)',
      backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: '6px', padding: '3px 8px',
      fontSize: '0.6rem', fontWeight: 600,
      letterSpacing: '0.1em', textTransform: 'uppercase',
      color: 'rgba(255,255,255,0.7)',
    }}>
      {name}
    </div>
  );
}

// ─── Card ──────────────────────────────────────────────────────────────────────
function ProductionCard({
  prod, index, onClick,
}: { prod: Production; index: number; onClick: () => void }) {
  return (
    <div
      className="prod-card"
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => { if (e.key === 'Enter') onClick(); }}
      style={{ animationDelay: `${(index % 4) * 0.07}s` }}
    >
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
        {!prod.posterImage && (
          <div className="prod-icon">{TYPE_ICONS[prod.type] ?? '🎞️'}</div>
        )}
        {prod.network && <NetworkBadge name={prod.network} />}
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

// ─── Modal ─────────────────────────────────────────────────────────────────────
function ProductionModal({ prod, onClose }: { prod: Production; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.88)',
        backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1.5rem',
      }}
    >
      <div className="pf-modal-inner" onClick={(e) => e.stopPropagation()}>

        {/* Poster side */}
        <div
          className="pf-modal-poster"
          style={{ position: 'relative', aspectRatio: '4/5', minHeight: '320px' }}
        >
          {prod.posterImage ? (
            <Image
              src={prod.posterImage}
              alt={`${prod.title} poster`}
              fill
              style={{ objectFit: 'cover' }}
            />
          ) : (
            <div style={{
              position: 'absolute', inset: 0,
              background: prod.gradient,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: '0.75rem',
            }}>
              <span style={{ fontSize: '5rem', opacity: 0.2 }}>
                {TYPE_ICONS[prod.type]}
              </span>
              <span style={{
                fontSize: '0.65rem', letterSpacing: '0.2em',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)',
              }}>
                {prod.type}
              </span>
            </div>
          )}
          {/* Right-edge fade into details pane */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to right, transparent 55%, var(--dark2))',
            pointerEvents: 'none',
          }} />
        </div>

        {/* Details side */}
        <div style={{
          padding: '2.5rem 2rem 2.5rem 1.5rem',
          display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1rem',
        }}>
          {/* Type badge */}
          <span style={{
            fontSize: '0.68rem', fontWeight: 600,
            letterSpacing: '0.15em', textTransform: 'uppercase',
            color: prod.typeColor,
            background: `${prod.typeColor}18`,
            border: `1px solid ${prod.typeColor}30`,
            padding: '4px 12px', borderRadius: '100px',
            width: 'fit-content',
          }}>
            {prod.type}
          </span>

          <h2 style={{
            fontFamily: 'var(--font-playfair), serif',
            fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
            fontWeight: 700, color: 'var(--white)', lineHeight: 1.2,
          }}>
            {prod.title}
          </h2>

          <p style={{ fontSize: '0.85rem', color: 'var(--gray)', fontWeight: 500 }}>
            {prod.network ? `${prod.network} · ` : ''}{prod.year}
          </p>

          {prod.description && (
            <p style={{
              fontSize: '0.95rem', color: 'var(--gray-lt)',
              lineHeight: 1.8, fontWeight: 300,
            }}>
              {prod.description}
            </p>
          )}

          <div style={{
            marginTop: '0.5rem', padding: '0.9rem 1rem',
            background: 'rgba(212,175,55,0.05)',
            border: '1px solid rgba(212,175,55,0.18)',
            borderRadius: '8px',
            fontSize: '0.8rem', color: 'var(--gold)',
            letterSpacing: '0.04em', fontWeight: 500,
          }}>
            🎬&nbsp; Shot at Cine Classic Studios
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '1rem', right: '1rem',
            width: '34px', height: '34px', borderRadius: '50%',
            background: 'rgba(0,0,0,0.55)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'var(--white)', fontSize: '1.1rem',
            cursor: 'pointer', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            zIndex: 1, transition: 'background 0.2s',
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
}

// ─── Explorer (filter + grid + modal) ─────────────────────────────────────────
export default function ProductionExplorer() {
  const [filter, setFilter] = useState<FilterValue>('All');
  const [selected, setSelected] = useState<Production | null>(null);

  const filtered = filter === 'All'
    ? PRODUCTIONS
    : PRODUCTIONS.filter((p) => p.type === filter);

  return (
    <section style={{ padding: '0 5% 100px', background: 'var(--dark)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* ── Filter bar ──────────────────────────────── */}
        <div style={{
          display: 'flex', gap: '0.6rem', flexWrap: 'wrap',
          justifyContent: 'center', marginBottom: '3.5rem',
        }}>
          {FILTERS.map((f) => (
            <button
              key={f.value}
              className={`pf-filter-btn${filter === f.value ? ' active' : ''}`}
              onClick={() => setFilter(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* ── Grid (key triggers fade-in animation on filter change) ── */}
        <div
          key={filter}
          className="productions-grid pf-grid-animated"
          style={{ marginBottom: '1rem' }}
        >
          {filtered.map((prod, i) => (
            <ProductionCard
              key={prod.id}
              prod={prod}
              index={i}
              onClick={() => setSelected(prod)}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{
            textAlign: 'center', padding: '5rem',
            color: 'var(--gray)', fontSize: '1rem',
          }}>
            No productions in this category yet.
          </div>
        )}
      </div>

      {/* Modal */}
      {selected && (
        <ProductionModal prod={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
