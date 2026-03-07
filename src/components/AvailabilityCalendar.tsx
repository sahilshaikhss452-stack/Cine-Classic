'use client';

import { useState, useMemo } from 'react';
import { STUDIO_SETS } from '@/data/sets';

const DAY_HEADERS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/* Demo booked dates — in real production, fetch from your CMS or booking API */
const BOOKED_PATTERNS = [3, 7, 12, 15, 18, 22, 25, 28];

function generateCalendar(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  return cells;
}

const MONTH_NAMES = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];

export default function AvailabilityCalendar() {
  const today = new Date();
  const [viewMonth, setViewMonth] = useState({ year: today.getFullYear(), month: today.getMonth() });
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [selectedStudio, setSelectedStudio] = useState<string>('');

  const cells = useMemo(
    () => generateCalendar(viewMonth.year, viewMonth.month),
    [viewMonth],
  );

  const todayKey = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;

  function dayKey(day: number) {
    return `${viewMonth.year}-${viewMonth.month}-${day}`;
  }

  function isBooked(day: number) {
    return BOOKED_PATTERNS.includes(day);
  }

  function isPast(day: number) {
    const cellDate = new Date(viewMonth.year, viewMonth.month, day);
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return cellDate < todayStart;
  }

  function toggleDate(day: number) {
    if (isBooked(day) || isPast(day)) return;
    const key = dayKey(day);
    setSelectedDates(prev =>
      prev.includes(key) ? prev.filter(d => d !== key) : [...prev, key],
    );
  }

  function prevMonth() {
    setViewMonth(({ year, month }) => {
      if (month === 0) return { year: year - 1, month: 11 };
      return { year, month: month - 1 };
    });
  }

  function nextMonth() {
    setViewMonth(({ year, month }) => {
      if (month === 11) return { year: year + 1, month: 0 };
      return { year, month: month + 1 };
    });
  }

  const canGoPrev = !(viewMonth.year === today.getFullYear() && viewMonth.month === today.getMonth());

  return (
    <section style={{ background: 'var(--dark2)', padding: '120px 5%' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="section-tag">Availability</span>
          <h2 style={{
            fontFamily: 'var(--font-playfair), serif',
            fontSize: 'clamp(2rem, 3.5vw, 3rem)',
            fontWeight: 700,
            color: 'var(--white)',
            margin: '1.2rem 0 1rem',
          }}>
            Check <span style={{ color: 'var(--gold)' }}>Studio Dates</span>
          </h2>
          <p style={{ color: 'var(--gray)', maxWidth: '500px', margin: '0 auto', lineHeight: 1.8 }}>
            Browse available dates and select your preferred shoot days. We'll confirm your booking within a few hours.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 340px',
          gap: '3rem',
          alignItems: 'start',
        }}>

          {/* Calendar */}
          <div className="reveal" style={{
            background: 'var(--dark3)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '16px',
            padding: '2rem',
          }}>
            {/* Month Nav */}
            <div style={{
              display: 'flex', alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.5rem',
            }}>
              <button
                onClick={prevMonth}
                disabled={!canGoPrev}
                style={{
                  background: 'none', border: '1px solid rgba(255,255,255,0.08)',
                  color: canGoPrev ? 'var(--white)' : 'rgba(255,255,255,0.2)',
                  borderRadius: '8px', cursor: canGoPrev ? 'pointer' : 'not-allowed',
                  width: '36px', height: '36px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1rem', transition: 'all 0.25s',
                }}
              >‹</button>

              <span style={{
                fontFamily: 'var(--font-playfair), serif',
                fontSize: '1.15rem', fontWeight: 700,
                color: 'var(--white)',
              }}>
                {MONTH_NAMES[viewMonth.month]} {viewMonth.year}
              </span>

              <button
                onClick={nextMonth}
                style={{
                  background: 'none', border: '1px solid rgba(255,255,255,0.08)',
                  color: 'var(--white)',
                  borderRadius: '8px', cursor: 'pointer',
                  width: '36px', height: '36px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1rem', transition: 'all 0.25s',
                }}
              >›</button>
            </div>

            {/* Day Headers */}
            <div className="cal-grid" style={{ marginBottom: '0.5rem' }}>
              {DAY_HEADERS.map(d => (
                <div key={d} className="cal-day-header">{d}</div>
              ))}
            </div>

            {/* Day Grid */}
            <div className="cal-grid">
              {cells.map((day, idx) => {
                if (day === null) {
                  return <div key={`empty-${idx}`} className="cal-day empty" />;
                }
                const key = dayKey(day);
                const booked = isBooked(day);
                const past = isPast(day);
                const sel = selectedDates.includes(key);
                const isToday = key === todayKey;

                let cls = 'cal-day';
                if (booked || past) cls += ' booked';
                else if (sel) cls += ' selected';
                else cls += ' available';
                if (isToday && !booked && !past) cls += ' today';

                return (
                  <div
                    key={key}
                    className={cls}
                    onClick={() => toggleDate(day)}
                  >
                    {day}
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div style={{
              display: 'flex', gap: '1.5rem',
              marginTop: '1.5rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              flexWrap: 'wrap',
            }}>
              {[
                { color: 'rgba(255,255,255,0.04)', border: 'rgba(255,255,255,0.08)', label: 'Available' },
                { color: 'var(--gold)',            border: 'var(--gold)',             label: 'Selected' },
                { color: 'rgba(255,255,255,0.02)', border: 'rgba(255,255,255,0.04)', label: 'Booked' },
              ].map(l => (
                <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{
                    width: '14px', height: '14px', borderRadius: '3px',
                    background: l.color, border: `1px solid ${l.border}`,
                  }} />
                  <span style={{ fontSize: '0.75rem', color: 'var(--gray)' }}>{l.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="reveal reveal-delay-2">

            {/* Studio selector */}
            <div style={{
              background: 'var(--dark3)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '12px',
              padding: '1.5rem',
              marginBottom: '1.5rem',
            }}>
              <label style={{
                display: 'block',
                fontSize: '0.68rem', fontWeight: 600,
                letterSpacing: '0.15em', textTransform: 'uppercase',
                color: 'var(--gold)', marginBottom: '0.8rem',
              }}>
                Select Studio
              </label>
              <select
                className="form-input"
                value={selectedStudio}
                onChange={e => setSelectedStudio(e.target.value)}
              >
                <option value="">All Studios</option>
                {STUDIO_SETS.map(s => (
                  <option key={s.slug} value={s.slug}>
                    {s.icon} {s.name} — {s.rateFrom}{s.rateUnit}
                  </option>
                ))}
              </select>
            </div>

            {/* Selected dates summary */}
            <div style={{
              background: 'var(--dark3)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '12px',
              padding: '1.5rem',
              marginBottom: '1.5rem',
            }}>
              <div style={{
                fontSize: '0.68rem', fontWeight: 600,
                letterSpacing: '0.15em', textTransform: 'uppercase',
                color: 'var(--gold)', marginBottom: '1rem',
              }}>
                Selected Dates
              </div>

              {selectedDates.length === 0 ? (
                <p style={{ color: 'var(--gray)', fontSize: '0.85rem', lineHeight: 1.7 }}>
                  Click on available dates in the calendar to select your shoot days.
                </p>
              ) : (
                <div>
                  {selectedDates.map(dk => {
                    const [yr, mo, dy] = dk.split('-').map(Number);
                    const d = new Date(yr, mo, dy);
                    return (
                      <div key={dk} style={{
                        display: 'flex', justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0.5rem 0',
                        borderBottom: '1px solid rgba(255,255,255,0.04)',
                        fontSize: '0.85rem', color: 'var(--white)',
                      }}>
                        <span>
                          {d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}
                        </span>
                        <button
                          onClick={() => setSelectedDates(p => p.filter(x => x !== dk))}
                          style={{
                            background: 'none', border: 'none',
                            color: 'var(--gray)', cursor: 'pointer',
                            fontSize: '1rem', padding: '0 4px',
                          }}
                        >×</button>
                      </div>
                    );
                  })}
                  <p style={{
                    color: 'var(--gray)', fontSize: '0.78rem',
                    marginTop: '1rem', lineHeight: 1.6,
                  }}>
                    {selectedDates.length} day{selectedDates.length > 1 ? 's' : ''} selected. Proceed to booking to confirm.
                  </p>
                </div>
              )}
            </div>

            {/* CTA */}
            <a
              href="#booking"
              className="btn-primary"
              style={{
                width: '100%',
                justifyContent: 'center',
                display: 'flex',
                textDecoration: 'none',
              }}
            >
              Proceed to Booking →
            </a>
            <p style={{
              color: 'var(--gray)', fontSize: '0.75rem',
              textAlign: 'center', marginTop: '0.75rem',
            }}>
              No payment required to make an inquiry
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
