const BENEFITS = [
  {
    number: '01',
    title: 'Shortlist the right set faster',
    description:
      'Compare the look, layout, capacity, and practical production details before arranging a recce.',
  },
  {
    number: '02',
    title: 'Plan around real shoot logistics',
    description:
      'Discuss crew size, equipment movement, preparation needs, and access while dates are being considered.',
  },
  {
    number: '03',
    title: 'Move from recce to booking clearly',
    description:
      'Use one inquiry to align the set, preferred dates, duration, and the next practical step with the studio team.',
  },
] as const;

export default function ProductionTypes() {
  return (
    <section className="mob-section" style={{ background: 'var(--dark2)', padding: '96px 5%' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="section-tag">Why Cine Classic</span>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.3vw, 2.6rem)', margin: '1.2rem 0 1rem', lineHeight: 1.15 }}>
            Built around <span style={{ color: 'var(--gold)' }}>working production decisions</span>
          </h2>
          <p style={{ color: 'var(--gray)', maxWidth: '650px', margin: '0 auto', lineHeight: 1.75 }}>
            The experience is designed to help producers, agencies, photographers, and location teams assess fit and move forward with less back-and-forth.
          </p>
        </div>

        <div className="decision-benefits-grid">
          {BENEFITS.map((benefit, index) => (
            <article key={benefit.number} className={`reveal reveal-delay-${index + 1} decision-benefit-card`}>
              <span className="decision-benefit-number">{benefit.number}</span>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </article>
          ))}
        </div>

        <div className="reveal" style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <a href="#booking" className="btn-primary">
            Discuss your shoot requirements <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
