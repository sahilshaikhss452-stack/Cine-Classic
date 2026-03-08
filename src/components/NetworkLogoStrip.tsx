'use client';

/* ── NetworkLogoStrip ──────────────────────────────────────────────────────
   Horizontal trust strip showing streaming / broadcast networks that have
   shot productions at Cine Classic Studios.
   Appears immediately below the hero to establish instant credibility.
─────────────────────────────────────────────────────────────────────────── */

const NETWORKS = [
  { name: 'Netflix',          abbr: 'N' },
  { name: 'Amazon Prime',     abbr: 'P' },
  { name: 'SonyLIV',          abbr: 'S' },
  { name: 'Disney+ Hotstar',  abbr: 'D' },
  { name: 'Star Sports',      abbr: 'SS' },
  { name: 'Zee5',             abbr: 'Z' },
];

export default function NetworkLogoStrip() {
  return (
    <div style={{
      background: 'var(--dark2)',
      borderTop:    '1px solid rgba(255,255,255,0.04)',
      borderBottom: '1px solid rgba(255,255,255,0.04)',
      padding: '1.5rem 5%',
      overflow: 'hidden',
    }}>
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}>

        {/* Label */}
        <span style={{
          fontSize: '0.65rem',
          fontWeight: 600,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.28)',
          flexShrink: 0,
          whiteSpace: 'nowrap',
        }}>
          Featured on
        </span>

        {/* Divider */}
        <span style={{
          width: '1px', height: '20px',
          background: 'rgba(255,255,255,0.1)',
          flexShrink: 0,
        }} />

        {/* Network badges */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
          {NETWORKS.map((n, i) => (
            <span
              key={n.name}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '5px 14px',
                borderRadius: '100px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
                fontSize: '0.72rem',
                fontWeight: 600,
                letterSpacing: '0.05em',
                color: 'rgba(255,255,255,0.52)',
                whiteSpace: 'nowrap',
                transition: 'color 0.2s ease, border-color 0.2s ease',
              }}
            >
              {/* Monogram dot */}
              <span style={{
                width: '16px', height: '16px',
                borderRadius: '4px',
                background: 'linear-gradient(135deg, var(--gold-dk), var(--gold))',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.52rem',
                fontWeight: 800,
                color: 'var(--dark)',
                flexShrink: 0,
                letterSpacing: 0,
              }}>
                {n.abbr}
              </span>
              {n.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
