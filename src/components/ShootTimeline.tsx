const STEPS = [
  {
    number: '01',
    icon: '01',
    title: 'Share the brief',
    desc: 'Send your project type, preferred dates, and set requirements through WhatsApp or the booking form so the team can advise quickly.',
  },
  {
    number: '02',
    icon: '02',
    title: 'Shortlist or recce',
    desc: 'We help you narrow the options or arrange a walkthrough so your team can review the right set, layout, and logistics.',
  },
  {
    number: '03',
    icon: '03',
    title: 'Lock dates',
    desc: 'Once the set and schedule are approved, the booking is confirmed and the production window is held for your team.',
  },
  {
    number: '04',
    icon: '04',
    title: 'Prep the floor',
    desc: 'The set, access, and on-floor requirements are aligned in advance so your crew arrives to a more organized shooting day.',
  },
  {
    number: '05',
    icon: '05',
    title: 'Shoot with support',
    desc: 'Your crew takes over the floor while the studio team supports movement, timing, and practical coordination as needed.',
  },
  {
    number: '06',
    icon: '06',
    title: 'Wrap smoothly',
    desc: 'The day closes with cleaner wrap support, restored spaces, and less friction for the next stage of your production schedule.',
  },
];

export default function ShootTimeline() {
  return (
    <section className="mob-section" style={{ background: 'var(--dark3)', padding: '120px 5%', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <span className="section-tag">How Booking Works</span>
          <h2
            style={{
              fontSize: 'clamp(1.75rem, 3.3vw, 2.5rem)',
              fontWeight: 700,
              color: 'var(--white)',
              margin: '1.2rem 0 1.1rem',
              letterSpacing: '-0.015em',
              lineHeight: 1.15,
            }}
          >
            A clearer path from <span style={{ color: 'var(--gold)' }}>brief to shoot day</span>
          </h2>
          <p style={{ color: 'var(--gray)', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7, fontSize: '1.05rem' }}>
            The process is designed to help production teams move quickly, evaluate the right set confidently, and lock schedules without unnecessary back-and-forth.
          </p>
        </div>

        <div className="tl-wrap">
          <div className="tl-line" />

          <div className="tl-steps">
            {STEPS.map((step, i) => (
              <div key={step.number} className={`reveal reveal-delay-${(i % 4) + 1} tl-step`}>
                <div className="tl-dot">
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.08em' }}>{step.icon}</span>
                </div>

                <div className="tl-content">
                  <span
                    style={{
                      fontFamily: 'var(--font-inter), sans-serif',
                      fontSize: '2rem',
                      fontWeight: 800,
                      color: 'var(--dark4)',
                      display: 'block',
                      lineHeight: 1,
                      marginBottom: '0.5rem',
                      letterSpacing: '-0.04em',
                      WebkitTextStroke: '1px rgba(212,175,55,0.2)',
                    }}
                  >
                    {step.number}
                  </span>

                  <h3
                    style={{
                      fontSize: '1.05rem',
                      fontWeight: 700,
                      color: 'var(--white)',
                      marginBottom: '0.6rem',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {step.title}
                  </h3>

                  <p
                    style={{
                      fontSize: '0.85rem',
                      color: 'var(--gray)',
                      lineHeight: 1.8,
                    }}
                  >
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="reveal" style={{ textAlign: 'center', marginTop: '5rem' }}>
          <p style={{ color: 'var(--gray)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            Ready to move from brief to booking?
          </p>
          <a href="#booking" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}>
            Start Your Inquiry <span>{'->'}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
