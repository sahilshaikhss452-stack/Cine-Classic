const COMPANIES = [
  { name: 'Netflix India',          emoji: '🎬', desc: 'Streaming Giant' },
  { name: 'Amazon Prime Video',     emoji: '📺', desc: 'Digital Platform' },
  { name: 'Excel Entertainment',    emoji: '🎞️', desc: 'Production House' },
  { name: 'Dharma Productions',     emoji: '🌟', desc: 'Bollywood Studio' },
  { name: 'T-Series Films',         emoji: '🎵', desc: 'Music & Films' },
  { name: 'Applause Entertainment', emoji: '🏆', desc: 'Content Studio' },
  { name: 'Reliance Entertainment', emoji: '💼', desc: 'Media Conglomerate' },
  { name: 'Balaji Telefilms',       emoji: '📡', desc: 'TV Productions' },
  { name: 'Star Network',           emoji: '⭐', desc: 'Media Network' },
];

export default function ProductionCompanies() {
  return (
    <section style={{ padding: '100px 5%', background: 'var(--dark)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <div className="reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="section-tag">Partners</div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
            Production Companies That Have{' '}
            <span style={{ color: 'var(--gold)' }}>Worked With Us</span>
          </h2>
          <p style={{
            fontSize: '1rem', color: 'var(--gray)',
            maxWidth: '520px', margin: '1rem auto 0',
            fontWeight: 300, lineHeight: 1.8,
          }}>
            India's most respected production houses and streaming platforms trust
            Cine Classic Studios for their most ambitious projects.
          </p>
        </div>

        <div className="pf-companies-grid reveal">
          {COMPANIES.map((co) => (
            <div
              key={co.name}
              className="pf-company-card"
              style={{
                padding: '1.4rem 1.5rem',
                background: 'var(--dark3)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
              }}
            >
              <div style={{
                width: '44px', height: '44px',
                borderRadius: '10px',
                background: 'rgba(212,175,55,0.08)',
                border: '1px solid rgba(212,175,55,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.3rem', flexShrink: 0,
              }}>
                {co.emoji}
              </div>
              <div>
                <div style={{
                  fontFamily: 'var(--font-playfair), serif',
                  fontSize: '0.95rem', fontWeight: 700,
                  color: 'var(--white)', lineHeight: 1.2,
                }}>
                  {co.name}
                </div>
                <div style={{
                  fontSize: '0.7rem', color: 'var(--gray)',
                  marginTop: '2px', letterSpacing: '0.05em',
                }}>
                  {co.desc}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="reveal" style={{
          textAlign: 'center', marginTop: '3rem',
          fontSize: '0.85rem', color: 'var(--gray)',
          fontStyle: 'italic',
        }}>
          + many more independent filmmakers, advertising agencies, and content creators
        </div>
      </div>
    </section>
  );
}
