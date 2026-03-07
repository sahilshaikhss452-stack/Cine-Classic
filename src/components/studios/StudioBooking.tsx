'use client';

import { useState, useRef } from 'react';
import type { StudioSet } from '@/data/sets';

// ── Replace with your actual WhatsApp number ─────────────────
const WHATSAPP_NUMBER = '919876543210'; // format: countrycode + number, no +

interface Props {
  studio: StudioSet;
}

export default function StudioBooking({ studio }: Props) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);
  const today = new Date().toISOString().split('T')[0];

  const whatsappText = encodeURIComponent(
    `Hi! I'm interested in booking the *${studio.name}* studio at Cine Classic Studios.\n\nPlease share availability and rates.`
  );
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappText}`;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    const data = {
      ...Object.fromEntries(new FormData(e.currentTarget)),
      set: studio.name,
    };
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      formRef.current?.reset();
    } catch {
      setStatus('error');
    }
  }

  return (
    <section
      id="booking"
      style={{
        padding: '80px 5%',
        background: 'var(--dark)',
        position: 'relative',
      }}
    >
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, var(--gold), transparent)',
        opacity: 0.15,
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <div className="reveal" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="section-tag">Get In Touch</div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
            Book <span style={{ color: 'var(--gold)' }}>{studio.name}</span>
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--gray)', fontWeight: 300, marginTop: '0.75rem', maxWidth: '500px', margin: '0.75rem auto 0' }}>
            Send an inquiry below or connect instantly via WhatsApp. We respond within 24 hours.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2.5rem',
          alignItems: 'start',
        }}>

          {/* WhatsApp + info panel */}
          <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* WhatsApp CTA */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', gap: '1rem',
                background: 'linear-gradient(135deg, #1a8c3c, #25d366)',
                color: '#fff',
                padding: '1.25rem 1.5rem',
                borderRadius: '12px',
                fontFamily: 'var(--font-inter), sans-serif',
                fontWeight: 600,
                fontSize: '0.95rem',
                transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
                boxShadow: '0 4px 20px rgba(37,211,102,0.2)',
                textDecoration: 'none',
              }}
            >
              <span style={{ fontSize: '1.75rem', lineHeight: 1 }}>💬</span>
              <div>
                <div style={{ fontSize: '0.7rem', fontWeight: 500, opacity: 0.8, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '2px' }}>Quick Booking</div>
                Book via WhatsApp
              </div>
              <span style={{ marginLeft: 'auto', fontSize: '1.2rem' }}>→</span>
            </a>

            {/* Contact details */}
            {[
              { icon: '📍', label: 'Address',  value: '123 Studio Lane, Mumbai, Maharashtra' },
              { icon: '📞', label: 'Phone',    value: '+91 98765 43210' },
              { icon: '✉️', label: 'Email',    value: 'bookings@cineclassicstudios.com' },
              { icon: '🕐', label: 'Hours',    value: 'Mon – Sun · 6:00 AM – Midnight' },
            ].map((item) => (
              <div key={item.label} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{
                  width: '40px', height: '40px', flexShrink: 0,
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.9rem', background: 'rgba(212,175,55,0.04)',
                }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600, marginBottom: '2px' }}>{item.label}</div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--white)' }}>{item.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div
            className="reveal reveal-delay-2"
            style={{
              background: 'var(--dark2)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '16px',
              padding: '2.5rem',
              position: 'relative', overflow: 'hidden',
            }}
          >
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
              background: 'linear-gradient(90deg, var(--gold), var(--gold-lt), var(--gold))',
            }} />

            <form ref={formRef} onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <Field label="First Name" htmlFor="b-fname">
                  <input className="form-input" type="text" id="b-fname" name="firstName" placeholder="Jane" required />
                </Field>
                <Field label="Last Name" htmlFor="b-lname">
                  <input className="form-input" type="text" id="b-lname" name="lastName" placeholder="Doe" required />
                </Field>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <Field label="Email" htmlFor="b-email">
                  <input className="form-input" type="email" id="b-email" name="email" placeholder="jane@example.com" required />
                </Field>
                <Field label="Phone" htmlFor="b-phone">
                  <input className="form-input" type="tel" id="b-phone" name="phone" placeholder="+91 98765 43210" />
                </Field>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <Field label="Preferred Date" htmlFor="b-date">
                  <input className="form-input" type="date" id="b-date" name="date" min={today} required />
                </Field>
                <Field label="Package" htmlFor="b-pkg">
                  <select className="form-input" id="b-pkg" name="package" defaultValue="" required>
                    <option value="" disabled>Select…</option>
                    <option>Hourly</option>
                    <option>Half Day (4 hrs)</option>
                    <option>Full Day (8 hrs)</option>
                    <option>Multi-Day</option>
                  </select>
                </Field>
              </div>
              <Field label="Project Details" htmlFor="b-project">
                <textarea
                  className="form-input"
                  id="b-project" name="project"
                  placeholder={`Tell us about your project for ${studio.name}…`}
                  style={{ resize: 'vertical', minHeight: '100px' }}
                />
              </Field>

              {/* Hidden field: studio name pre-filled */}
              <input type="hidden" name="set" value={studio.name} />

              <p style={{ fontSize: '0.75rem', color: 'var(--gray)', marginBottom: '1rem' }}>
                No payment required for inquiry. We'll confirm within 24 hours.
              </p>

              <button
                type="submit"
                disabled={status === 'loading'}
                style={{
                  width: '100%',
                  background: 'var(--gold)', color: 'var(--dark)',
                  padding: '15px',
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: '0.82rem', fontWeight: 600, letterSpacing: '0.1em',
                  textTransform: 'uppercase', border: 'none', borderRadius: '100px',
                  cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                  opacity: status === 'loading' ? 0.7 : 1,
                  transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
                  boxShadow: '0 4px 16px rgba(212,175,55,0.25)',
                }}
              >
                {status === 'loading' ? 'Sending…' : 'Send Booking Request →'}
              </button>

              {status === 'success' && (
                <div style={{
                  marginTop: '1rem', padding: '0.875rem',
                  background: 'rgba(212,175,55,0.08)',
                  border: '1px solid rgba(212,175,55,0.3)',
                  borderRadius: '8px', fontSize: '0.85rem', color: 'var(--gold)', textAlign: 'center',
                }}>
                  ✓ Request received! We'll be in touch within 24 hours.
                </div>
              )}
              {status === 'error' && (
                <div style={{
                  marginTop: '1rem', padding: '0.875rem',
                  background: 'rgba(255,60,60,0.08)',
                  border: '1px solid rgba(255,60,60,0.3)',
                  borderRadius: '8px', fontSize: '0.85rem', color: '#ff6b6b', textAlign: 'center',
                }}>
                  Something went wrong. Please try WhatsApp or email directly.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label htmlFor={htmlFor} style={{
        display: 'block', fontSize: '0.68rem', fontWeight: 600,
        letterSpacing: '0.12em', textTransform: 'uppercase',
        color: 'var(--gray-lt)', marginBottom: '0.4rem',
      }}>
        {label}
      </label>
      {children}
    </div>
  );
}
