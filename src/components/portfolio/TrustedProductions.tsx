import type { Production } from '@/lib/ui/production';

interface Props {
  productions: Production[];
}

export default function TrustedProductions({ productions }: Props) {
  return (
    <section style={{ padding: '100px 5%', background: 'var(--dark2)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="section-tag">At A Glance</div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
            Production range <span style={{ color: 'var(--gold)' }}>at a glance</span>
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--gray)', maxWidth: '560px', margin: '1rem auto 0', fontWeight: 300, lineHeight: 1.8 }}>
            A quick scan of titles helps clients understand the breadth of formats and styles already produced at the studio.
          </p>
        </div>

        <div className="pf-trusted-grid reveal">
          {productions.map((production) => (
            <div key={production.id} className="pf-trusted-item" style={{ padding: '1.1rem 1.25rem', background: 'var(--dark3)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: production.typeColor, flexShrink: 0, boxShadow: `0 0 6px ${production.typeColor}80` }} />
              <span style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '0.95rem', fontWeight: 600, color: 'var(--white)', lineHeight: 1.3 }}>{production.title}</span>
              <span style={{ marginLeft: 'auto', fontSize: '0.62rem', color: 'var(--gray)', fontFamily: 'var(--font-inter), sans-serif', flexShrink: 0 }}>{production.year}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}