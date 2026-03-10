'use client';

import { useSiteSettings } from '@/components/site/SiteSettingsProvider';

function getAbbr(value: string) {
  return value
    .split(' ')
    .map((segment) => segment.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export default function NetworkLogoStrip() {
  const settings = useSiteSettings();
  const networks = settings.featuredClients;

  if (networks.length === 0) {
    return null;
  }

  return (
    <div
      style={{
        background: 'var(--dark2)',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
        padding: '1.5rem 5%',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            fontSize: '0.65rem',
            fontWeight: 600,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.28)',
            flexShrink: 0,
            whiteSpace: 'nowrap',
          }}
        >
          Featured on
        </span>

        <span
          style={{
            width: '1px',
            height: '20px',
            background: 'rgba(255,255,255,0.1)',
            flexShrink: 0,
          }}
        />

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {networks.map((network) => (
            <span
              key={network}
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
              <span
                style={{
                  width: '16px',
                  height: '16px',
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
                }}
              >
                {getAbbr(network)}
              </span>
              {network}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
