const STEPS = [
  {
    number: '01',
    title: 'Share the brief',
    description: 'Send the shoot type, preferred dates, crew size, and the sets you are considering.',
  },
  {
    number: '02',
    title: 'Shortlist and recce',
    description: 'The team helps narrow the options and arrange a walkthrough when your crew needs one.',
  },
  {
    number: '03',
    title: 'Confirm the shoot',
    description: 'Align the set, duration, access, and schedule before the production window is held.',
  },
] as const;

export default function ShootTimeline() {
  return (
    <section className="mob-section" style={{ background: 'var(--dark3)', padding: '96px 5%' }}>
      <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="section-tag">How Booking Works</span>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.3vw, 2.6rem)', margin: '1.2rem 0 1rem', lineHeight: 1.15 }}>
            Three steps from <span style={{ color: 'var(--gold)' }}>brief to confirmed plan</span>
          </h2>
          <p style={{ color: 'var(--gray)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.75 }}>
            Start with the information your production team already has. The studio team will help clarify the rest.
          </p>
        </div>

        <ol className="booking-steps-list">
          {STEPS.map((step, index) => (
            <li key={step.number} className={`reveal reveal-delay-${index + 1} booking-step-card`}>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>

        <div className="reveal" style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <a href="#booking" className="btn-primary">
            Start your inquiry <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
