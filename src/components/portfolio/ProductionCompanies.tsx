const COMPANY_TYPES = [
  { name: 'OTT & Streaming Teams', marker: '01', desc: 'Series blocks, promos, and platform-first campaigns' },
  { name: 'Feature Film Productions', marker: '02', desc: 'Narrative shoots that need controlled studio logistics' },
  { name: 'Advertising Agencies', marker: '03', desc: 'Commercial films, branded content, and digital ad campaigns' },
  { name: 'Television Producers', marker: '04', desc: 'Promo shoots, episodic work, and high-volume schedules' },
  { name: 'Music Video Teams', marker: '05', desc: 'Performance-led shoots, stylised sets, and quick changeovers' },
  { name: 'Independent Creators', marker: '06', desc: 'Photography, branded content, and agile production crews' },
];

export default function ProductionCompanies() {
  return (
    <section style={{ padding: '100px 5%', background: 'var(--dark)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="section-tag">Who We Serve</div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
            Built for <span style={{ color: 'var(--gold)' }}>production teams across formats</span>
          </h2>
          <p style={{
            fontSize: '1rem', color: 'var(--gray)',
            maxWidth: '620px', margin: '1rem auto 0',
            fontWeight: 300, lineHeight: 1.8,
          }}>
            The studio is used by teams who care about timing, practical set logistics, and faster decision-making once the brief is ready.
          </p>
        </div>

        <div className="pf-companies-grid reveal">
          {COMPANY_TYPES.map((co) => (
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
                fontSize: '0.82rem', fontWeight: 700, color: 'var(--gold)', flexShrink: 0,
              }}>
                {co.marker}
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
                  fontSize: '0.74rem', color: 'var(--gray)',
                  marginTop: '4px', letterSpacing: '0.02em', lineHeight: 1.5,
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
          If your team needs a fast shortlist, the booking desk can recommend the most suitable studio options for your format.
        </div>
      </div>
    </section>
  );
}