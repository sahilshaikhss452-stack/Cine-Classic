import { ImageResponse } from 'next/og';

export const alt = 'Cine Classic Studios - production-ready studio sets in Mumbai';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 84px',
          color: '#f5f0e8',
          background:
            'radial-gradient(circle at 76% 18%, rgba(212,175,55,0.24), transparent 34%), linear-gradient(145deg, #050505 0%, #11100c 100%)',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <div
            style={{
              width: '58px',
              height: '58px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(212,175,55,0.55)',
              borderRadius: '14px',
              color: '#d4af37',
              fontSize: '20px',
              fontWeight: 800,
            }}
          >
            CC
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ color: '#d4af37', fontSize: '26px', fontWeight: 800 }}>Cine Classic</span>
            <span style={{ color: 'rgba(255,255,255,0.68)', fontSize: '15px', letterSpacing: '6px' }}>STUDIOS</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '900px' }}>
          <span style={{ color: '#d4af37', fontSize: '20px', letterSpacing: '5px', textTransform: 'uppercase' }}>
            Mumbai studio rental
          </span>
          <div style={{ fontSize: '66px', lineHeight: 1.05, fontWeight: 800, marginTop: '18px' }}>
            Production-ready sets for ambitious shoots.
          </div>
          <div style={{ color: 'rgba(255,255,255,0.72)', fontSize: '25px', marginTop: '24px' }}>
            Films · OTT · Commercials · Music videos · Photoshoots
          </div>
        </div>
      </div>
    ),
    size,
  );
}
