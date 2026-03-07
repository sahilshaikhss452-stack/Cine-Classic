import { PRODUCTIONS } from '@/data/productions';

export default function TrustedProductions() {
  return (
    <section style={{ padding: '100px 5%', background: 'var(--dark2)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <div className="reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="section-tag">Credibility</div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
            Trusted by <span style={{ color: 'var(--gold)' }}>Leading Productions</span>
          </h2>
          <p style={{
            fontSize: '1rem', color: 'var(--gray)',
            maxWidth: '500px', margin: '1rem auto 0',
            fontWeight: 300, lineHeight: 1.8,
          }}>
            From blockbuster films to viral web series — they all chose Cine Classic Studios.
          </p>
        </div>

        <div className="pf-trusted-grid reveal">
          {PRODUCTIONS.map((prod) => (
            <div
              key={prod.id}
              className="pf-trusted-item"
              style={{
                padding: '1.1rem 1.25rem',
                background: 'var(--dark3)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
              }}
            >
              <div style={{
                width: '8px', height: '8px',
                borderRadius: '50%',
                background: prod.typeColor,
                flexShrink: 0,
                boxShadow: `0 0 6px ${prod.typeColor}80`,
              }} />
              <span style={{
                fontFamily: 'var(--font-playfair), serif',
                fontSize: '0.95rem', fontWeight: 600,
                color: 'var(--white)', lineHeight: 1.3,
              }}>
                {prod.title}
              </span>
              <span style={{
                marginLeft: 'auto',
                fontSize: '0.62rem', color: 'var(--gray)',
                fontFamily: 'var(--font-inter), sans-serif',
                flexShrink: 0,
              }}>
                {prod.year}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
