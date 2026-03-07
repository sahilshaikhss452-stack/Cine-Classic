const STEPS = [
  {
    number: '01',
    icon: '📞',
    title: 'Inquiry',
    desc: 'Contact us via WhatsApp, email, or the booking form. Share your project brief, preferred dates, and set requirements.',
  },
  {
    number: '02',
    icon: '🏛️',
    title: 'Studio Tour',
    desc: 'Visit us for a walkthrough of available sets. Our team will brief you on technical specs, lighting options, and logistics.',
  },
  {
    number: '03',
    icon: '✅',
    title: 'Booking Confirmed',
    desc: 'Confirm your dates with a booking agreement and advance payment. Your slot is secured and prep begins.',
  },
  {
    number: '04',
    icon: '🔨',
    title: 'Set Preparation',
    desc: 'Our art department and lighting crew prepare the set per your production design brief before your crew arrives.',
  },
  {
    number: '05',
    icon: '🎬',
    title: 'Shoot Day',
    desc: 'Your crew takes over. Our studio manager is on-site throughout for technical support and floor coordination.',
  },
  {
    number: '06',
    icon: '📦',
    title: 'Wrap & Delivery',
    desc: 'Post-shoot wrap support, set restoration, and equipment sign-off. Your production leaves clean and on schedule.',
  },
];

export default function ShootTimeline() {
  return (
    <section className="mob-section" style={{ background: 'var(--dark3)', padding: '120px 5%', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <span className="section-tag">The Process</span>
          <h2 style={{
            fontSize: 'clamp(1.75rem, 3.3vw, 2.5rem)',
            fontWeight: 700,
            color: 'var(--white)',
            margin: '1.2rem 0 1.1rem',
            letterSpacing: '-0.015em',
            lineHeight: 1.15,
          }}>
            How Your Shoot <span style={{ color: 'var(--gold)' }}>Happens Here</span>
          </h2>
          <p style={{ color: 'var(--gray)', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7, fontSize: '1.05rem' }}>
            A transparent, professionally managed production journey from first inquiry to final wrap.
          </p>
        </div>

        {/* Timeline */}
        <div className="tl-wrap">
          {/* Connecting line */}
          <div className="tl-line" />

          {/* Steps */}
          <div className="tl-steps">
            {STEPS.map((step, i) => (
              <div key={step.number} className={`reveal reveal-delay-${(i % 4) + 1} tl-step`}>
                {/* Dot on line */}
                <div className="tl-dot">
                  <span style={{ fontSize: '1.2rem' }}>{step.icon}</span>
                </div>

                {/* Content */}
                <div className="tl-content">
                  <span style={{
                    fontFamily: 'var(--font-inter), sans-serif',
                    fontSize: '2rem',
                    fontWeight: 800,
                    color: 'var(--dark4)',
                    display: 'block',
                    lineHeight: 1,
                    marginBottom: '0.5rem',
                    letterSpacing: '-0.04em',
                    WebkitTextStroke: '1px rgba(212,175,55,0.2)',
                  }}>{step.number}</span>

                  <h3 style={{
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    color: 'var(--white)',
                    marginBottom: '0.6rem',
                    letterSpacing: '-0.01em',
                  }}>{step.title}</h3>

                  <p style={{
                    fontSize: '0.85rem',
                    color: 'var(--gray)',
                    lineHeight: 1.8,
                  }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="reveal" style={{ textAlign: 'center', marginTop: '5rem' }}>
          <p style={{ color: 'var(--gray)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            Ready to start your production journey?
          </p>
          <a href="#booking" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}>
            Start Your Inquiry <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
