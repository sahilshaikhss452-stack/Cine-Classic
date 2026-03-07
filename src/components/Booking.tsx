'use client';

import { useState, useRef } from 'react';

const CONTACT_ITEMS = [
  { icon: '📍', label: 'Address', value: '123 Studio Lane, Los Angeles, CA 90210' },
  { icon: '📞', label: 'Phone',   value: '+1 (555) 000-0000' },
  { icon: '✉️', label: 'Email',   value: 'bookings@cineclassicstudios.com' },
  { icon: '🕐', label: 'Hours',   value: 'Mon – Sun · 6:00 AM – Midnight' },
];

const SETS = [
  'Cyclorama / Infinity Wall',
  'Green Screen Room',
  'Living Room Interior Set',
  'Industrial / Brick Set',
  'Open Ground Location',
  'Multiple Sets',
];

const PACKAGES = ['Hourly', 'Half Day (4hrs)', 'Full Day (8hrs)', 'Multi-Day'];

export default function Booking() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  const today = new Date().toISOString().split('T')[0];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');

    const data = Object.fromEntries(new FormData(e.currentTarget));

    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Request failed');
      setStatus('success');
      formRef.current?.reset();
    } catch {
      setStatus('error');
    }
  }

  return (
    <section id="booking" style={{ padding: '120px 5%', background: 'var(--dark)' }}>

      <div className="reveal" style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
        <div className="section-tag">Get In Touch</div>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
          Book Your <span style={{ color: 'var(--gold)' }}>Session</span>
        </h2>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '4rem',
        maxWidth: '1200px',
        margin: '0 auto',
        alignItems: 'start',
      }}>
        {/* Contact info */}
        <div className="reveal">
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', marginBottom: '1rem' }}>
            Ready to <span style={{ color: 'var(--gold)' }}>Create</span>?
          </h2>
          <p style={{ color: 'var(--gray)', fontWeight: 300, marginBottom: '2.5rem', lineHeight: 1.8 }}>
            Fill out the form and we'll get back to you within 24 hours to confirm
            your booking, discuss your requirements, and answer any questions.
          </p>

          {CONTACT_ITEMS.map((item) => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{
                width: '44px', height: '44px', flexShrink: 0,
                border: '1px solid var(--border)', borderRadius: '8px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1rem', background: 'rgba(212,175,55,0.04)',
              }}>
                {item.icon}
              </div>
              <div>
                <div style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '2px', fontWeight: 600 }}>
                  {item.label}
                </div>
                <div style={{ fontSize: '0.92rem', color: 'var(--white)' }}>{item.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Booking form */}
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
          {/* Gold top bar */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
            background: 'linear-gradient(90deg, var(--gold), var(--gold-lt), var(--gold))',
          }} />

          <form ref={formRef} onSubmit={handleSubmit}>
            {/* Row: Name */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <FormGroup label="First Name" htmlFor="fname">
                <input className="form-input" type="text" id="fname" name="firstName" placeholder="Jane" required />
              </FormGroup>
              <FormGroup label="Last Name" htmlFor="lname">
                <input className="form-input" type="text" id="lname" name="lastName" placeholder="Doe" required />
              </FormGroup>
            </div>

            {/* Row: Contact */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <FormGroup label="Email Address" htmlFor="email">
                <input className="form-input" type="email" id="email" name="email" placeholder="jane@example.com" required />
              </FormGroup>
              <FormGroup label="Phone Number" htmlFor="phone">
                <input className="form-input" type="tel" id="phone" name="phone" placeholder="+1 (555) 000-0000" />
              </FormGroup>
            </div>

            {/* Row: Set + Package */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <FormGroup label="Preferred Set" htmlFor="set">
                <select className="form-input" id="set" name="set" required defaultValue="">
                  <option value="" disabled>Select a set…</option>
                  {SETS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </FormGroup>
              <FormGroup label="Package" htmlFor="package">
                <select className="form-input" id="package" name="package" required defaultValue="">
                  <option value="" disabled>Select a package…</option>
                  {PACKAGES.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </FormGroup>
            </div>

            {/* Row: Date + Time */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <FormGroup label="Preferred Date" htmlFor="date">
                <input className="form-input" type="date" id="date" name="date" min={today} required />
              </FormGroup>
              <FormGroup label="Preferred Start Time" htmlFor="time">
                <input className="form-input" type="time" id="time" name="time" />
              </FormGroup>
            </div>

            {/* Project description */}
            <FormGroup label="Tell Us About Your Project" htmlFor="project">
              <textarea
                className="form-input"
                id="project" name="project"
                placeholder="Briefly describe your project, cast/crew size, and any special requirements…"
                style={{ resize: 'vertical', minHeight: '110px' }}
              />
            </FormGroup>

            <p style={{ fontSize: '0.78rem', color: 'var(--gray)', marginBottom: '1.2rem' }}>
              We'll respond within 24 hours. No payment required to make an inquiry.
            </p>

            <button
              type="submit"
              disabled={status === 'loading'}
              style={{
                width: '100%', textAlign: 'center',
                background: 'var(--gold)', color: 'var(--dark)',
                padding: '16px 36px',
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: '0.82rem', fontWeight: 600,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                border: 'none', borderRadius: '100px',
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
                marginTop: '1rem', padding: '1rem',
                background: 'rgba(212,175,55,0.08)',
                border: '1px solid rgba(212,175,55,0.3)',
                borderRadius: '8px',
                fontSize: '0.88rem', color: 'var(--gold)', textAlign: 'center',
              }}>
                Thank you! Your request has been received. We'll be in touch within 24 hours.
              </div>
            )}

            {status === 'error' && (
              <div style={{
                marginTop: '1rem', padding: '1rem',
                background: 'rgba(255,60,60,0.08)',
                border: '1px solid rgba(255,60,60,0.3)',
                borderRadius: '8px',
                fontSize: '0.88rem', color: '#ff6b6b', textAlign: 'center',
              }}>
                Something went wrong. Please try again or email us directly.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

function FormGroup({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '1.2rem' }}>
      <label
        htmlFor={htmlFor}
        style={{
          display: 'block',
          fontSize: '0.72rem', fontWeight: 600,
          letterSpacing: '0.12em', textTransform: 'uppercase',
          color: 'var(--gray-lt)', marginBottom: '0.5rem',
        }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}
