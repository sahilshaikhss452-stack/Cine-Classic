'use client';

import { useMemo, useState } from 'react';
import type { SanityStudioCard } from '@/lib/sanity';

const DAY_HEADERS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function generateCalendar(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  return [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, index) => index + 1)];
}

interface Props {
  studios?: SanityStudioCard[];
}

export default function AvailabilityCalendar({ studios = [] }: Props) {
  const today = new Date();
  const [viewMonth, setViewMonth] = useState({ year: today.getFullYear(), month: today.getMonth() });
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [selectedStudio, setSelectedStudio] = useState<string>('');

  const cells = useMemo(() => generateCalendar(viewMonth.year, viewMonth.month), [viewMonth]);

  function dayKey(day: number) {
    return `${viewMonth.year}-${viewMonth.month}-${day}`;
  }

  function isPast(day: number) {
    const cellDate = new Date(viewMonth.year, viewMonth.month, day);
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return cellDate < todayStart;
  }

  function toggleDate(day: number) {
    if (isPast(day)) {
      return;
    }

    const key = dayKey(day);
    setSelectedDates((previous) =>
      previous.includes(key) ? previous.filter((value) => value !== key) : [...previous, key],
    );
  }

  function prevMonth() {
    setViewMonth(({ year, month }) => {
      if (month === 0) {
        return { year: year - 1, month: 11 };
      }

      return { year, month: month - 1 };
    });
  }

  function nextMonth() {
    setViewMonth(({ year, month }) => {
      if (month === 11) {
        return { year: year + 1, month: 0 };
      }

      return { year, month: month + 1 };
    });
  }

  const canGoPrev = !(viewMonth.year === today.getFullYear() && viewMonth.month === today.getMonth());

  return (
    <section className="mob-section" style={{ background: 'var(--dark2)', padding: '120px 5%' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="section-tag">Preferred Dates</span>
          <h2
            style={{
              fontFamily: 'var(--font-playfair), serif',
              fontSize: 'clamp(2rem, 3.5vw, 3rem)',
              fontWeight: 700,
              color: 'var(--white)',
              margin: '1.2rem 0 1rem',
            }}
          >
            Shortlist <span style={{ color: 'var(--gold)' }}>preferred shoot dates</span>
          </h2>
          <p style={{ color: 'var(--gray)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.8 }}>
            This is a planning tool for your inquiry, not a live calendar. Mark the dates that work best for your team and we will confirm actual availability or suggest the nearest options.
          </p>
        </div>

        <div className="cal-layout">
          <div
            className="reveal"
            style={{
              background: 'var(--dark3)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '16px',
              padding: '2rem',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1.5rem',
              }}
            >
              <button
                onClick={prevMonth}
                disabled={!canGoPrev}
                style={{
                  background: 'none',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: canGoPrev ? 'var(--white)' : 'rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                  cursor: canGoPrev ? 'pointer' : 'not-allowed',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1rem',
                  transition: 'all 0.25s',
                }}
              >
                {'<'}
              </button>

              <span
                style={{
                  fontFamily: 'var(--font-playfair), serif',
                  fontSize: '1.15rem',
                  fontWeight: 700,
                  color: 'var(--white)',
                }}
              >
                {MONTH_NAMES[viewMonth.month]} {viewMonth.year}
              </span>

              <button
                onClick={nextMonth}
                style={{
                  background: 'none',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'var(--white)',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1rem',
                  transition: 'all 0.25s',
                }}
              >
                {'>'}
              </button>
            </div>

            <div className="cal-grid" style={{ marginBottom: '0.5rem' }}>
              {DAY_HEADERS.map((day) => (
                <div key={day} className="cal-day-header">
                  {day}
                </div>
              ))}
            </div>

            <div className="cal-grid">
              {cells.map((day, index) => {
                if (day === null) {
                  return <div key={`empty-${index}`} className="cal-day empty" />;
                }

                const key = dayKey(day);
                const past = isPast(day);
                const selected = selectedDates.includes(key);
                const cellClass = `cal-day ${past ? 'booked' : selected ? 'selected' : 'available'}`;

                return (
                  <div key={key} className={cellClass} onClick={() => toggleDate(day)}>
                    {day}
                  </div>
                );
              })}
            </div>

            <div
              style={{
                display: 'flex',
                gap: '1.5rem',
                marginTop: '1.5rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid rgba(255,255,255,0.06)',
                flexWrap: 'wrap',
              }}
            >
              {[
                { color: 'rgba(255,255,255,0.04)', border: 'rgba(255,255,255,0.08)', label: 'Selectable' },
                { color: 'var(--gold)', border: 'var(--gold)', label: 'Selected' },
                { color: 'rgba(255,255,255,0.02)', border: 'rgba(255,255,255,0.04)', label: 'Past dates' },
              ].map((legend) => (
                <div key={legend.label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div
                    style={{
                      width: '14px',
                      height: '14px',
                      borderRadius: '3px',
                      background: legend.color,
                      border: `1px solid ${legend.border}`,
                    }}
                  />
                  <span style={{ fontSize: '0.75rem', color: 'var(--gray)' }}>{legend.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal reveal-delay-2">
            <div
              style={{
                background: 'var(--dark3)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '12px',
                padding: '1.5rem',
                marginBottom: '1.5rem',
              }}
            >
              <label
                style={{
                  display: 'block',
                  fontSize: '0.68rem',
                  fontWeight: 600,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--gold)',
                  marginBottom: '0.8rem',
                }}
              >
                Studio preference
              </label>
              <select className="form-input" value={selectedStudio} onChange={(event) => setSelectedStudio(event.target.value)}>
                <option value="">Any suitable studio</option>
                {studios.map((studio) => (
                  <option key={studio.slug} value={studio.slug}>
                    {studio.icon} {studio.title}
                  </option>
                ))}
              </select>
            </div>

            <div
              style={{
                background: 'var(--dark3)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '12px',
                padding: '1.5rem',
                marginBottom: '1.5rem',
              }}
            >
              <div
                style={{
                  fontSize: '0.68rem',
                  fontWeight: 600,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--gold)',
                  marginBottom: '1rem',
                }}
              >
                Selected dates
              </div>

              {selectedDates.length === 0 ? (
                <p style={{ color: 'var(--gray)', fontSize: '0.85rem', lineHeight: 1.7 }}>
                  Select one or more future dates so your inquiry reaches us with clearer scheduling intent.
                </p>
              ) : (
                <div>
                  {selectedDates.map((dateKey) => {
                    const [year, month, day] = dateKey.split('-').map(Number);
                    const date = new Date(year, month, day);

                    return (
                      <div
                        key={dateKey}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '0.5rem 0',
                          borderBottom: '1px solid rgba(255,255,255,0.04)',
                          fontSize: '0.85rem',
                          color: 'var(--white)',
                        }}
                      >
                        <span>{date.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}</span>
                        <button
                          onClick={() => setSelectedDates((previous) => previous.filter((value) => value !== dateKey))}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--gray)',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            padding: '0 4px',
                          }}
                        >
                          x
                        </button>
                      </div>
                    );
                  })}
                  <p style={{ color: 'var(--gray)', fontSize: '0.78rem', marginTop: '1rem', lineHeight: 1.6 }}>
                    {selectedDates.length} day{selectedDates.length > 1 ? 's' : ''} selected. Add these dates to your inquiry so we can confirm availability or suggest the nearest workable options.
                  </p>
                </div>
              )}
            </div>

            <a href="#booking" className="btn-primary" style={{ width: '100%', justifyContent: 'center', display: 'flex', textDecoration: 'none' }}>
              Continue to Inquiry {'->'}
            </a>
            <p style={{ color: 'var(--gray)', fontSize: '0.75rem', textAlign: 'center', marginTop: '0.75rem' }}>
              No payment is required to send an inquiry
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
