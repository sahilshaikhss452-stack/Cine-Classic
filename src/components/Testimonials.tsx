import AutoScrollCarousel from '@/components/motion/AutoScrollCarousel';
import { StarIcon } from '@/components/ui/icons';
import type { Testimonial } from '@/lib/ui/testimonial';

interface Props {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: Props) {
  if (testimonials.length === 0) {
    return (
      <section id="testimonials" className="mob-section" style={{ padding: '120px 5%', background: 'var(--dark2)', position: 'relative' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
          <div className="section-tag">Client Reviews</div>
          <h2 style={{ fontSize: 'clamp(1.75rem, 3.3vw, 2.5rem)', letterSpacing: '-0.015em', lineHeight: 1.15, marginTop: '0.5rem' }}>
            What Creators <span style={{ color: 'var(--gold)' }}>Say</span>
          </h2>
          <p style={{ color: 'var(--gray)', maxWidth: '560px', margin: '1rem auto 0', lineHeight: 1.8 }}>
            No testimonial documents are published in Sanity yet.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="mob-section" style={{ padding: '120px 5%', background: 'var(--dark2)', position: 'relative' }}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, var(--gold), transparent)',
          opacity: 0.2,
        }}
      />

      <div className="reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <div className="section-tag">Client Reviews</div>
        <h2
          style={{
            fontSize: 'clamp(1.75rem, 3.3vw, 2.5rem)',
            letterSpacing: '-0.015em',
            lineHeight: 1.15,
            marginTop: '0.5rem',
            marginBottom: '0.9rem',
          }}
        >
          Trusted by <span style={{ color: 'var(--gold)' }}>production teams</span>
        </h2>
        <p style={{ maxWidth: '580px', margin: '0 auto', color: 'var(--gray)', lineHeight: 1.8 }}>
          Social proof matters in production planning. These reviews help new clients understand the responsiveness, practicality, and professionalism behind the sets.
        </p>
      </div>

      <p className="swipe-hint">swipe to browse {'>'}</p>

      <AutoScrollCarousel className="testimonials-grid">
        {testimonials.map((testimonial, index) => (
          <div
            key={testimonial.id}
            className={`reveal${index % 3 !== 0 ? ` reveal-delay-${index % 3}` : ''}`}
            style={{
              background: 'var(--dark3)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '18px',
              padding: '2rem',
              transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
              boxShadow: '0 20px 54px rgba(0,0,0,0.14)',
            }}
          >
            <div style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '4rem', color: 'var(--gold)', opacity: 0.15, lineHeight: 1, marginBottom: '-1rem' }}>
              &quot;
            </div>

            <div style={{ display: 'flex', gap: '0.35rem', color: 'var(--gold)', marginBottom: '1rem' }}>
              {Array.from({ length: 5 }).map((_, starIndex) => (
                <StarIcon key={`${testimonial.id}-${starIndex}`} size={14} />
              ))}
            </div>

            <p style={{ fontSize: '0.94rem', color: 'var(--gray-lt)', fontWeight: 300, lineHeight: 1.8, marginBottom: '1.5rem' }}>
              {testimonial.text}
            </p>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                paddingTop: '1rem',
                borderTop: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--gold), var(--gold-dk))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-playfair), serif',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  color: 'var(--dark)',
                  flexShrink: 0,
                }}
              >
                {testimonial.initial}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--white)' }}>{testimonial.name}</div>
                <div style={{ fontSize: '0.74rem', color: 'var(--gray)', letterSpacing: '0.04em', marginTop: '2px' }}>{testimonial.role}</div>
                {(testimonial.production || testimonial.network) && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '5px', flexWrap: 'wrap' }}>
                    {testimonial.production && (
                      <span
                        style={{
                          fontSize: '0.65rem',
                          fontWeight: 600,
                          letterSpacing: '0.06em',
                          color: 'var(--gold)',
                          background: 'rgba(212,175,55,0.08)',
                          border: '1px solid rgba(212,175,55,0.2)',
                          borderRadius: '100px',
                          padding: '2px 8px',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {testimonial.production}
                      </span>
                    )}
                    {testimonial.network && (
                      <span
                        style={{
                          fontSize: '0.65rem',
                          fontWeight: 500,
                          letterSpacing: '0.04em',
                          color: 'rgba(255,255,255,0.45)',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {testimonial.network}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </AutoScrollCarousel>
    </section>
  );
}
