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
        background: 'linear-gradient(180deg, rgba(9,9,9,0.98) 0%, var(--dark2) 100%)',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
        padding: '1.25rem 5%',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            fontSize: '0.65rem',
            fontWeight: 700,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.35)',
            flexShrink: 0,
            whiteSpace: 'nowrap',
          }}
        >
          Featured Clients
        </span>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.7rem',
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
                gap: '7px',
                padding: '6px 13px',
                borderRadius: '100px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                fontSize: '0.72rem',
                fontWeight: 600,
                letterSpacing: '0.05em',
                color: 'rgba(255,255,255,0.62)',
                whiteSpace: 'nowrap',
              }}
            >
              <span
                style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '5px',
                  background: 'linear-gradient(135deg, var(--gold-dk), var(--gold))',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.54rem',
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

