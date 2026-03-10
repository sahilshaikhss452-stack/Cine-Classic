'use client';

import { useRef, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { useSiteSettings } from '@/components/site/SiteSettingsProvider';
import type { SanityStudio } from '@/lib/sanity';
import { fmtMinBooking, fmtRate, fmtRateUnit } from '@/lib/studio-utils';

interface Props {
  studio: SanityStudio;
}

export default function StudioBooking({ studio }: Props) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);
  const today = new Date().toISOString().split('T')[0];
  const settings = useSiteSettings();

  const rateFrom = fmtRate(studio.rateHourly, studio.ratePerDay);
  const rateUnit = fmtRateUnit(studio.rateUnit, studio.rateHourly);
  const minBooking = fmtMinBooking(studio.minBookingHours);

  const whatsappText = encodeURIComponent(
    `Hi! I'm interested in booking the *${studio.title}* studio at ${settings.businessName}. Please share availability and rates.`,
  );
  const whatsappUrl = `https://wa.me/${settings.whatsappNumber}?text=${whatsappText}`;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('loading');
    const data = {
      ...Object.fromEntries(new FormData(event.currentTarget)),
      requestedStudio: studio.title,
      sourcePage: `/studios/${studio.slug}`,
    };

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      setStatus('success');
      formRef.current?.reset();
    } catch {
      setStatus('error');
    }
  }

  return (
    <section id="booking" style={{ padding: '80px 5%', background: 'var(--dark)', position: 'relative' }}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, var(--gold), transparent)',
          opacity: 0.15,
        }}
      />

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="section-tag">Book This Set</div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
            Reserve <span style={{ color: 'var(--gold)' }}>{studio.title}</span>
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--gray)', fontWeight: 300, marginTop: '0.75rem', maxWidth: '500px', margin: '0.75rem auto 0' }}>
            Send an inquiry or connect instantly on WhatsApp. We confirm within <strong style={{ color: 'var(--white)' }}>2 hours</strong>.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2.5rem',
            alignItems: 'start',
          }}
        >
          <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
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
              <span style={{ fontSize: '1.75rem', lineHeight: 1 }}>??</span>
              <div>
                <div style={{ fontSize: '0.7rem', fontWeight: 500, opacity: 0.8, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '2px' }}>Fastest Response</div>
                Book via WhatsApp
              </div>
              <span style={{ marginLeft: 'auto', fontSize: '1.2rem' }}>?</span>
            </a>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '10px 14px',
                background: 'rgba(212,175,55,0.06)',
                border: '1px solid rgba(212,175,55,0.15)',
                borderRadius: '10px',
              }}
            >
              <span style={{ fontSize: '1.1rem' }}>?</span>
              <div>
                <div style={{ fontSize: '0.6rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600, marginBottom: '1px' }}>Response Time</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--white)', fontWeight: 500 }}>Confirmed within 2 hours</div>
              </div>
            </div>

            {[
              {
                icon: '??',
                label: 'Address',
                value: settings.addressLine1,
                sub: [settings.addressLine2, settings.city, settings.region, settings.postalCode].filter(Boolean).join(' · '),
              },
              { icon: '??', label: 'Phone', value: settings.phone },
              { icon: '??', label: 'Email', value: settings.email },
              { icon: '??', label: 'Hours', value: settings.hoursText ?? 'By appointment' },
            ].map((item) => (
              <div key={item.label} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    flexShrink: 0,
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.9rem',
                    background: 'rgba(212,175,55,0.04)',
                  }}
                >
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600, marginBottom: '2px' }}>{item.label}</div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--white)' }}>{item.value}</div>
                  {item.sub && <div style={{ fontSize: '0.78rem', color: 'var(--gray)', marginTop: '1px' }}>{item.sub}</div>}
                </div>
              </div>
            ))}

            <div
              style={{
                padding: '14px',
                background: 'var(--dark2)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '10px',
                fontSize: '0.82rem',
                color: 'var(--gray-lt)',
                lineHeight: 1.7,
              }}
            >
              <strong style={{ color: 'var(--gold)' }}>{studio.title}</strong> starts at <strong style={{ color: 'var(--white)' }}>{rateFrom}{rateUnit}</strong>.
              {minBooking && ` Minimum booking: ${minBooking}.`} No advance payment for inquiry.
            </div>
          </div>

          <div
            className="reveal reveal-delay-2"
            style={{
              background: 'var(--dark2)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '16px',
              padding: '2.5rem',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: 'linear-gradient(90deg, var(--gold), var(--gold-lt), var(--gold))',
              }}
            />

            <form ref={formRef} onSubmit={handleSubmit}>
              <Field label="Your Name" htmlFor="b-name">
                <input className="form-input" type="text" id="b-name" name="name" placeholder="e.g. Priya Sharma" required />
              </Field>

              <Field label="WhatsApp / Phone" htmlFor="b-phone">
                <input className="form-input" type="tel" id="b-phone" name="phone" placeholder={settings.phone} required />
              </Field>

              <Field label="Preferred Shoot Date" htmlFor="b-date">
                <input className="form-input" type="date" id="b-date" name="preferredDate" min={today} required />
              </Field>

              <Field label="Duration" htmlFor="b-pkg">
                <select className="form-input" id="b-pkg" name="package" defaultValue="" required>
                  <option value="" disabled>Select duration...</option>
                  <option>Half Day (4 hrs)</option>
                  <option>Full Day (8 hrs)</option>
                  <option>Multi-Day</option>
                  <option>Hourly</option>
                </select>
              </Field>

              <Field label="Project Brief (optional)" htmlFor="b-project">
                <textarea
                  className="form-input"
                  id="b-project"
                  name="projectBrief"
                  placeholder={`Brief description of your project for ${studio.title}...`}
                  style={{ resize: 'vertical', minHeight: '80px' }}
                />
              </Field>

              <input type="hidden" name="requestedStudio" value={studio.title} />

              <p style={{ fontSize: '0.72rem', color: 'var(--gray)', marginBottom: '1rem', lineHeight: 1.6 }}>
                No advance payment for inquiry. Our team confirms within 2 hours.
              </p>

              <button
                type="submit"
                disabled={status === 'loading'}
                style={{
                  width: '100%',
                  background: 'var(--gold)',
                  color: 'var(--dark)',
                  padding: '15px',
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  border: 'none',
                  borderRadius: '100px',
                  cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                  opacity: status === 'loading' ? 0.7 : 1,
                  transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
                  boxShadow: '0 4px 16px rgba(212,175,55,0.25)',
                }}
              >
                {status === 'loading' ? 'Sending...' : 'Send Booking Request ->'}
              </button>

              {status === 'success' && (
                <div
                  style={{
                    marginTop: '1rem',
                    padding: '0.875rem',
                    background: 'rgba(212,175,55,0.08)',
                    border: '1px solid rgba(212,175,55,0.3)',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    color: 'var(--gold)',
                    textAlign: 'center',
                  }}
                >
                  ? Request received! We'll confirm within 2 hours.
                </div>
              )}
              {status === 'error' && (
                <div
                  style={{
                    marginTop: '1rem',
                    padding: '0.875rem',
                    background: 'rgba(255,60,60,0.08)',
                    border: '1px solid rgba(255,60,60,0.3)',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    color: '#ff6b6b',
                    textAlign: 'center',
                  }}
                >
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

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: ReactNode }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label
        htmlFor={htmlFor}
        style={{
          display: 'block',
          fontSize: '0.68rem',
          fontWeight: 600,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--gray-lt)',
          marginBottom: '0.4rem',
        }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}
