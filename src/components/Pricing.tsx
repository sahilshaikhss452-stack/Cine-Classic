import { PRICING_PLANS, ADD_ONS } from '@/data/pricing';

export default function Pricing() {
  return (
    <section id="pricing" style={{ padding: '120px 5%', background: 'var(--dark)' }}>

      <div className="reveal" style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
        <div className="section-tag">Rates &amp; Packages</div>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', marginBottom: '1rem' }}>
          Simple, <span style={{ color: 'var(--gold)' }}>Transparent</span> Pricing
        </h2>
        <p style={{ fontSize: '1.05rem', color: 'var(--gray)', maxWidth: '540px', margin: '0 auto', fontWeight: 300 }}>
          All packages include lighting rigs, Wi-Fi, and changing rooms. No hidden fees.
        </p>
      </div>

      {/* Pricing cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '1.25rem',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        {PRICING_PLANS.map((plan, i) => (
          <div
            key={plan.id}
            className={`reveal${i > 0 ? ` reveal-delay-${Math.min(i, 4)}` : ''}`}
            style={{
              background: plan.featured
                ? 'linear-gradient(160deg, rgba(212,175,55,0.08) 0%, var(--dark2) 50%)'
                : 'var(--dark2)',
              border: `1px solid ${plan.featured ? 'var(--gold)' : 'rgba(255,255,255,0.06)'}`,
              borderRadius: '16px',
              padding: '2.5rem 2rem',
              position: 'relative',
              transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
              boxShadow: plan.featured ? 'var(--shadow-gold)' : 'none',
            }}
          >
            {/* Badge */}
            {plan.badge && (
              <div style={{
                position: 'absolute', top: 0, left: '50%',
                transform: 'translate(-50%, -50%)',
                background: 'var(--gold)', color: 'var(--dark)',
                fontSize: '0.65rem', fontWeight: 700,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                padding: '5px 16px', borderRadius: '100px', whiteSpace: 'nowrap',
              }}>
                {plan.badge}
              </div>
            )}

            <div style={{
              width: '48px', height: '48px',
              background: 'rgba(212,175,55,0.08)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.4rem', marginBottom: '1.2rem',
            }}>
              {plan.icon}
            </div>

            <div style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.3rem' }}>
              {plan.name}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--gray)', marginBottom: '1.5rem' }}>
              {plan.tagline}
            </div>

            <div style={{
              fontFamily: 'var(--font-playfair), serif',
              fontSize: plan.price === 'Custom' ? '2rem' : '2.8rem',
              fontWeight: 700, color: 'var(--gold)',
              lineHeight: 1, marginBottom: '0.25rem',
            }}>
              {plan.price}
              {plan.priceSuffix && (
                <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.85rem', color: 'var(--gray)', fontWeight: 400 }}>
                  {plan.priceSuffix}
                </span>
              )}
            </div>

            <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.06)', margin: '1.5rem 0' }} />

            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.7rem', marginBottom: '2rem' }}>
              {plan.features.map((f) => (
                <li key={f} style={{ fontSize: '0.88rem', color: 'var(--gray)', display: 'flex', alignItems: 'flex-start', gap: '0.7rem' }}>
                  <span style={{
                    width: '16px', height: '16px', minWidth: '16px',
                    borderRadius: '50%',
                    background: 'rgba(212,175,55,0.1)',
                    border: '1px solid rgba(212,175,55,0.3)',
                    marginTop: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.55rem', color: 'var(--gold)', flexShrink: 0,
                  }}>✓</span>
                  {f}
                </li>
              ))}
            </ul>

            <a
              href="#booking"
              style={{
                display: 'block', textAlign: 'center',
                padding: '13px 24px',
                background: plan.featured ? 'var(--gold)' : 'transparent',
                border: plan.featured ? '1px solid var(--gold)' : '1px solid rgba(212,175,55,0.3)',
                color: plan.featured ? 'var(--dark)' : 'var(--gold)',
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: '0.78rem', fontWeight: 600,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                borderRadius: '100px',
                transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
              }}
            >
              {plan.ctaLabel}
            </a>
          </div>
        ))}
      </div>

      {/* Add-ons */}
      <div
        className="reveal"
        style={{
          maxWidth: '1200px', margin: '3rem auto 0',
          background: 'var(--dark2)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '16px', padding: '2.5rem',
        }}
      >
        <h3 style={{ fontSize: '1.3rem', marginBottom: '1.5rem', color: 'var(--white)' }}>
          Add-On <span style={{ color: 'var(--gold)' }}>Services</span>
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '0.75rem',
        }}>
          {ADD_ONS.map((addon) => (
            <div
              key={addon.name}
              style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '1rem 1.2rem',
                background: 'var(--dark3)', borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.06)',
                transition: 'border-color 0.4s',
              }}
            >
              <span style={{ fontSize: '0.85rem', color: 'var(--white)' }}>{addon.name}</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--gold)', fontWeight: 600 }}>{addon.price}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
