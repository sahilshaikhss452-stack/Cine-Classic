'use client';

import { useState } from 'react';
import type { SanityStudioCard } from '@/lib/sanity';
import { fmtSize } from '@/lib/studio-utils';

const MAX_COMPARE = 3;

interface Props {
  studios?: SanityStudioCard[];
}

export default function StudioComparison({ studios = [] }: Props) {
  const [selected, setSelected] = useState<string[]>([]);

  function toggle(slug: string) {
    setSelected(prev => {
      if (prev.includes(slug)) return prev.filter(s => s !== slug);
      if (prev.length >= MAX_COMPARE) return prev;
      return [...prev, slug];
    });
  }

  const compareStudios = studios.filter(s => selected.includes(s.slug));

  return (
    <section style={{ background: 'var(--dark3)', padding: '120px 5%' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="section-tag">Compare Studios</span>
          <h2 style={{
            fontFamily: 'var(--font-playfair), serif',
            fontSize: 'clamp(2rem, 3.5vw, 3rem)',
            fontWeight: 700,
            color: 'var(--white)',
            margin: '1.2rem 0 1rem',
          }}>
            Find Your <span style={{ color: 'var(--gold)' }}>Perfect Set</span>
          </h2>
          <p style={{ color: 'var(--gray)', maxWidth: '520px', margin: '0 auto', lineHeight: 1.8 }}>
            Select up to 3 studios to compare specifications side-by-side. Choose the space that fits your production.
          </p>
        </div>

        {/* Studio Selector Pills */}
        <div className="sc-studio-pills reveal">
          {studios.map(studio => {
            const isSelected = selected.includes(studio.slug);
            const isDisabled = !isSelected && selected.length >= MAX_COMPARE;
            return (
              <button
                key={studio.slug}
                onClick={() => toggle(studio.slug)}
                className={`sc-pill ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`}
              >
                <span style={{ marginRight: '6px' }}>{studio.icon ?? '🎬'}</span>
                {studio.title}
              </button>
            );
          })}
        </div>

        {/* Helper text */}
        <p style={{
          color: 'var(--gray)',
          fontSize: '0.82rem',
          marginBottom: '2.5rem',
          textAlign: 'center',
        }}>
          {selected.length === 0
            ? 'Select studios above to begin comparing'
            : `${selected.length} of ${MAX_COMPARE} studios selected`}
        </p>

        {/* Comparison Table */}
        {compareStudios.length > 0 && (
          <div className="sc-table-wrap reveal">
            <table className="sc-table">
              <thead>
                <tr>
                  <th className="sc-th" style={{ width: '160px' }}>Specification</th>
                  {compareStudios.map(studio => (
                    <th key={studio.slug} className="sc-th-studio">
                      <span style={{ fontSize: '1.4rem', display: 'block', marginBottom: '0.3rem' }}>
                        {studio.icon ?? '🎬'}
                      </span>
                      {studio.title}
                      <div style={{
                        fontSize: '0.68rem',
                        fontWeight: 400,
                        color: 'var(--gold)',
                        letterSpacing: '0.06em',
                        marginTop: '0.2rem',
                      }}>
                        {studio.tagline ?? ''}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Floor Size */}
                <tr>
                  <td className="sc-td">Floor Size</td>
                  {compareStudios.map(studio => (
                    <td key={studio.slug} className="sc-td-val">
                      {fmtSize(studio.size)}
                    </td>
                  ))}
                </tr>

                {/* Crew Capacity */}
                <tr>
                  <td className="sc-td">Crew Capacity</td>
                  {compareStudios.map(studio => (
                    <td key={studio.slug} className="sc-td-val">
                      {studio.capacity ?? '—'}
                    </td>
                  ))}
                </tr>

                {/* Suitable For row */}
                <tr>
                  <td className="sc-td">Best For</td>
                  {compareStudios.map(studio => (
                    <td key={studio.slug} className="sc-td-val" style={{ verticalAlign: 'top', fontSize: '0.8rem' }}>
                      {studio.suitableFor.slice(0, 3).map((tag, i) => (
                        <span key={i} style={{
                          display: 'inline-block',
                          margin: '2px 3px',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          background: `${studio.accentColor ?? '#d4af37'}18`,
                          border: `1px solid ${studio.accentColor ?? '#d4af37'}30`,
                          color: studio.accentColor ?? 'var(--gold)',
                          fontSize: '0.7rem',
                          fontWeight: 600,
                          letterSpacing: '0.04em',
                        }}>
                          {tag}
                        </span>
                      ))}
                    </td>
                  ))}
                </tr>

                {/* CTA row */}
                <tr>
                  <td className="sc-td">Book This Set</td>
                  {compareStudios.map(studio => (
                    <td key={studio.slug} className="sc-td-val">
                      <a
                        href={`/studios/${studio.slug}`}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          padding: '9px 18px',
                          background: 'var(--gold)',
                          color: 'var(--dark)',
                          borderRadius: '100px',
                          fontSize: '0.76rem',
                          fontWeight: 700,
                          letterSpacing: '0.06em',
                          textDecoration: 'none',
                          textTransform: 'uppercase',
                          transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
                        }}
                      >
                        View Set →
                      </a>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* CTA when nothing selected */}
        {compareStudios.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            background: 'var(--dark4)',
            borderRadius: '12px',
            border: '1px dashed rgba(212,175,55,0.15)',
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem', opacity: 0.4 }}>🎬</div>
            <p style={{ color: 'var(--gray)', fontSize: '0.92rem' }}>
              Select studios from the pills above to see a side-by-side comparison
            </p>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="reveal" style={{ textAlign: 'center', marginTop: '4rem' }}>
          <a href="#booking" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}>
            Request a Guided Studio Tour <span>→</span>
          </a>
          <p style={{ color: 'var(--gray)', fontSize: '0.82rem', marginTop: '1rem' }}>
            Can't decide? Our team will help you choose the right space for your production.
          </p>
        </div>
      </div>
    </section>
  );
}

