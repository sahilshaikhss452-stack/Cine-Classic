'use client';

import { useState, useRef } from 'react';

const CONTACT_ITEMS = [
  { icon: '📍', label: 'Address',    value: 'Film City Road, Goregaon East, Mumbai – 400 065, Maharashtra, India' },
  { icon: '📞', label: 'Phone',      value: '+91 98765 43210' },
  { icon: '✉️', label: 'Email',      value: 'bookings@cineclassicstudios.com' },
  { icon: '💬', label: 'WhatsApp',   value: '+91 98765 43210 (Preferred for quick replies)' },
  { icon: '🕐', label: 'Hours',      value: 'Open 24 hours · 7 days · By appointment' },
];

const STUDIO_OPTIONS = [
  'Empty Floor (6,000 sq ft)',
  'Market 1 — Period Bazaar',
  'Market 2 — Urban Market',
  'Market 7 — Large Scale Set',
  'Chawl New — Mumbai Chawl',
  'Court Set',
  'Hospital Set',
  'Police Station Set',
  'Open Ground (2+ acres)',
  'Multiple Studios',
  'Not decided yet',
];

const SHOOT_TYPES = [
  'Feature Film',
  'OTT / Web Series',
  'TV Serial',
  'Television Commercial',
  'Music Video',
  'Fashion / Editorial',
  'Documentary',
  'Reality Show',
  'Photoshoot',
  'Product Launch / Corporate',
  'Other',
];

const PACKAGES = [
  'Hourly',
  'Half Day (4 hrs)',
  'Full Day (8 hrs)',
  'Multi-Day Block',
  'Weekly Package',
];

const CREW_SIZES = [
  '1–10 (Small Crew)',
  '11–25 (Mid Crew)',
  '26–50 (Standard Production)',
  '51–100 (Large Production)',
  '100+ (Crowd / Event)',
];

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
        <div className="section-tag">Start Your Production</div>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', marginBottom: '1rem' }}>
          Book Your <span style={{ color: 'var(--gold)' }}>Studio Session</span>
        </h2>
        <p style={{ color: 'var(--gray)', maxWidth: '500px', margin: '0 auto', lineHeight: 1.8 }}>
          Fill out the form and our team will contact you within a few hours to confirm availability and discuss your requirements.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '4rem',
        maxWidth: '1200px',
        margin: '0 auto',
        alignItems: 'start',
      }}>

        {/* Contact Info */}
        <div className="reveal">
          <h3 style={{
            fontFamily: 'var(--font-playfair), serif',
            fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)',
            fontWeight: 700,
            marginBottom: '0.8rem',
          }}>
            Ready to <span style={{ color: 'var(--gold)' }}>Create?</span>
          </h3>
          <p style={{ color: 'var(--gray)', lineHeight: 1.8, marginBottom: '2.5rem', maxWidth: '340px' }}>
            No payment required for an inquiry. Our team will reply within a few hours with availability and full details.
          </p>

          {CONTACT_ITEMS.map(item => (
            <div key={item.label} style={{
              display: 'flex', alignItems: 'flex-start', gap: '1rem',
              marginBottom: '1.4rem',
              paddingBottom: '1.4rem',
              borderBottom: '1px solid rgba(255,255,255,0.04)',
            }}>
              <div style={{
                width: '42px', height: '42px', flexShrink: 0,
                border: '1px solid var(--border)', borderRadius: '8px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1rem', background: 'rgba(212,175,55,0.04)',
              }}>
                {item.icon}
              </div>
              <div>
                <div style={{
                  fontSize: '0.63rem', letterSpacing: '0.15em',
                  textTransform: 'uppercase', color: 'var(--gold)',
                  marginBottom: '2px', fontWeight: 600,
                }}>
                  {item.label}
                </div>
                <div style={{ fontSize: '0.88rem', color: 'var(--white)', lineHeight: 1.5 }}>
                  {item.value}
                </div>
              </div>
            </div>
          ))}

          {/* WhatsApp quick contact */}
          <a
            href="https://wa.me/919876543210?text=Hi%20Cine%20Classic%20Studios%2C%20I%27d%20like%20to%20inquire%20about%20studio%20booking."
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
              padding: '13px 24px',
              background: '#25D366', color: '#fff',
              borderRadius: '100px',
              fontSize: '0.82rem', fontWeight: 600,
              textDecoration: 'none', letterSpacing: '0.04em',
              marginTop: '0.5rem',
              transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
              boxShadow: '0 4px 16px rgba(37,211,102,0.25)',
            }}
          >
            💬 WhatsApp Quick Inquiry
          </a>
        </div>

        {/* Booking Form */}
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

            {/* Name Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <FormGroup label="First Name" htmlFor="fname">
                <input className="form-input" type="text" id="fname" name="firstName" placeholder="Rahul" required />
              </FormGroup>
              <FormGroup label="Last Name" htmlFor="lname">
                <input className="form-input" type="text" id="lname" name="lastName" placeholder="Sharma" required />
              </FormGroup>
            </div>

            {/* Production Company */}
            <FormGroup label="Production Company / Brand" htmlFor="company">
              <input className="form-input" type="text" id="company" name="company" placeholder="Excel Entertainment / Your Production House" />
            </FormGroup>

            {/* Contact Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <FormGroup label="Email Address" htmlFor="email">
                <input className="form-input" type="email" id="email" name="email" placeholder="rahul@production.com" required />
              </FormGroup>
              <FormGroup label="WhatsApp / Phone" htmlFor="phone">
                <input className="form-input" type="tel" id="phone" name="phone" placeholder="+91 98765 43210" required />
              </FormGroup>
            </div>

            {/* Shoot Type + Studio */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <FormGroup label="Shoot Type" htmlFor="shootType">
                <select className="form-input" id="shootType" name="shootType" required defaultValue="">
                  <option value="" disabled>Select type…</option>
                  {SHOOT_TYPES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </FormGroup>
              <FormGroup label="Studio Interest" htmlFor="studio">
                <select className="form-input" id="studio" name="studio" required defaultValue="">
                  <option value="" disabled>Select studio…</option>
                  {STUDIO_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </FormGroup>
            </div>

            {/* Date + Crew Size */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <FormGroup label="Shoot Date (From)" htmlFor="dateFrom">
                <input className="form-input" type="date" id="dateFrom" name="dateFrom" min={today} required />
              </FormGroup>
              <FormGroup label="Crew Size" htmlFor="crewSize">
                <select className="form-input" id="crewSize" name="crewSize" defaultValue="">
                  <option value="" disabled>Select crew size…</option>
                  {CREW_SIZES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </FormGroup>
            </div>

            {/* Package */}
            <FormGroup label="Duration / Package" htmlFor="package">
              <select className="form-input" id="package" name="package" defaultValue="">
                <option value="" disabled>Select duration…</option>
                {PACKAGES.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </FormGroup>

            <p style={{ fontSize: '0.78rem', color: 'var(--gray)', marginBottom: '1.2rem' }}>
              No payment required to inquire. We respond within a few hours.
            </p>

            <button
              type="submit"
              disabled={status === 'loading'}
              style={{
                width: '100%', textAlign: 'center',
                background: status === 'loading' ? 'rgba(212,175,55,0.7)' : 'var(--gold)',
                color: 'var(--dark)',
                padding: '16px 36px',
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: '0.82rem', fontWeight: 700,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                border: 'none', borderRadius: '100px',
                cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
                boxShadow: '0 4px 16px rgba(212,175,55,0.25)',
              }}
            >
              {status === 'loading' ? 'Sending Inquiry…' : 'Send Studio Inquiry →'}
            </button>

            {/* Success */}
            {status === 'success' && (
              <div style={{
                marginTop: '1.2rem',
                padding: '1.2rem',
                background: 'rgba(212,175,55,0.08)',
                border: '1px solid rgba(212,175,55,0.3)',
                borderRadius: '10px',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🎬</div>
                <div style={{ fontSize: '0.92rem', color: 'var(--gold)', fontWeight: 600, marginBottom: '0.4rem' }}>
                  Inquiry Received!
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--gray)', lineHeight: 1.6 }}>
                  Thank you! Our team will reach out within a few hours to confirm availability and share a detailed quote.
                </div>
              </div>
            )}

            {/* Error */}
            {status === 'error' && (
              <div style={{
                marginTop: '1.2rem', padding: '1rem',
                background: 'rgba(255,60,60,0.08)',
                border: '1px solid rgba(255,60,60,0.3)',
                borderRadius: '10px', fontSize: '0.88rem',
                color: '#ff6b6b', textAlign: 'center',
              }}>
                Something went wrong. Please WhatsApp us directly at +91 98765 43210 or email bookings@cineclassicstudios.com
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
    <div style={{ marginBottom: '1.1rem' }}>
      <label htmlFor={htmlFor} style={{
        display: 'block',
        fontSize: '0.7rem', fontWeight: 600,
        letterSpacing: '0.12em', textTransform: 'uppercase',
        color: 'var(--gray-lt)', marginBottom: '0.45rem',
      }}>
        {label}
      </label>
      {children}
    </div>
  );
}
