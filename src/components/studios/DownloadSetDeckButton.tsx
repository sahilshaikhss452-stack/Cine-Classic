'use client';

/**
 * DownloadSetDeckButton
 *
 * Smart CTA that gives production teams a professional reference PDF for
 * each studio set. Two modes:
 *
 *  1. studio.setPdfUrl is set (uploaded via Sanity CMS)
 *     → simple <a download> pointing to the CDN file — instant download.
 *
 *  2. No pre-made PDF uploaded
 *     → dynamically imports @react-pdf/renderer + SetDeckDocument at click time
 *       (code-split: adds 0 bytes to the initial page bundle), generates the
 *       PDF client-side, and triggers a Blob download. ~1–2 s on first click.
 *
 * Props:
 *  studio   — full StudioSet data object
 *  variant  — 'primary' (gold filled) | 'outline' (white border)
 *             default: 'outline'
 *  size     — 'sm' | 'md'  default: 'md'
 */

import { useState } from 'react';
import type { StudioSet } from '@/data/sets';

interface Props {
  studio: StudioSet;
  variant?: 'primary' | 'outline';
  size?: 'sm' | 'md';
}

export default function DownloadSetDeckButton({
  studio,
  variant = 'outline',
  size = 'md',
}: Props) {
  const [status, setStatus] = useState<'idle' | 'generating' | 'error'>('idle');

  /* ── If a CMS-uploaded PDF exists, render a plain <a download> ──────────── */
  if (studio.setPdfUrl) {
    return (
      <a
        href={studio.setPdfUrl}
        download={`${studio.slug}-set-deck.pdf`}
        style={buttonStyle(variant, size)}
      >
        <DownloadIcon size={size} />
        Download Set Deck
      </a>
    );
  }

  /* ── Otherwise generate on-the-fly ─────────────────────────────────────── */
  async function handleGenerate() {
    setStatus('generating');
    try {
      // Both imports are dynamically loaded — they never enter the initial bundle.
      const [{ pdf }, { SetDeckDocument }] = await Promise.all([
        import('@react-pdf/renderer'),
        import('@/lib/SetDeckPDF'),
      ]);

      // Render the PDF to a Blob
      const blob = await pdf(<SetDeckDocument studio={studio} />).toBlob();

      // Trigger browser download
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = `${studio.slug}-set-deck-cine-classic.pdf`;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      URL.revokeObjectURL(url);

      setStatus('idle');
    } catch (err) {
      console.error('[DownloadSetDeckButton] PDF generation failed:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3500);
    }
  }

  const isGenerating = status === 'generating';
  const isError      = status === 'error';

  return (
    <button
      onClick={handleGenerate}
      disabled={isGenerating}
      style={{
        ...buttonStyle(variant, size),
        cursor: isGenerating ? 'not-allowed' : 'pointer',
        opacity: isGenerating ? 0.75 : 1,
        background: isError
          ? 'rgba(255,60,60,0.08)'
          : variant === 'primary'
          ? 'var(--gold)'
          : 'transparent',
        borderColor: isError ? 'rgba(255,100,100,0.4)' : undefined,
        color: isError ? '#ff9090' : undefined,
      }}
    >
      {isGenerating ? (
        <>
          <SpinnerIcon size={size} />
          Generating…
        </>
      ) : isError ? (
        <>
          <DownloadIcon size={size} />
          Retry Download
        </>
      ) : (
        <>
          <DownloadIcon size={size} />
          Download Set Deck
        </>
      )}
    </button>
  );
}

/* ── Shared button base styles ─────────────────────────────────────────────── */
function buttonStyle(variant: 'primary' | 'outline', size: 'sm' | 'md'): React.CSSProperties {
  const pad = size === 'sm' ? '9px 18px' : '13px 26px';
  const fs  = size === 'sm' ? '0.78rem'  : '0.92rem';

  return {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: pad,
    borderRadius: '100px',
    border: variant === 'primary'
      ? 'none'
      : '1px solid rgba(255,255,255,0.18)',
    background: variant === 'primary' ? 'var(--gold)' : 'transparent',
    color: variant === 'primary' ? 'var(--dark)' : 'var(--white)',
    fontFamily: 'var(--font-inter), sans-serif',
    fontSize: fs,
    fontWeight: 500,
    letterSpacing: '0.01em',
    textDecoration: 'none',
    transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
    whiteSpace: 'nowrap' as const,
    cursor: 'pointer',
  };
}

/* ── Icons ──────────────────────────────────────────────────────────────────── */
function DownloadIcon({ size }: { size: 'sm' | 'md' }) {
  const w = size === 'sm' ? 14 : 16;
  return (
    <svg width={w} height={w} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function SpinnerIcon({ size }: { size: 'sm' | 'md' }) {
  const w = size === 'sm' ? 13 : 15;
  return (
    <svg width={w} height={w} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <circle cx="12" cy="12" r="10" strokeOpacity="0.2" />
      <path d="M12 2a10 10 0 0 1 10 10" style={{ animation: 'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); transform-origin: 12px 12px; } }`}</style>
    </svg>
  );
}
