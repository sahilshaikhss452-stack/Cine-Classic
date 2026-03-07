import Image from 'next/image';

const STATS = [
  { number: '5',    label: 'Unique Sets' },
  { number: '4K',   label: 'Camera Ready' },
  { number: '24/7', label: 'Availability' },
  { number: '100%', label: 'Satisfaction' },
];

export default function Hero() {
  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
        padding: '140px 5% 100px',
      }}
    >
      {/* Gradient background */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `
          radial-gradient(ellipse 60% 50% at 50% 30%, rgba(212,175,55,0.07) 0%, transparent 60%),
          radial-gradient(ellipse 40% 40% at 20% 80%, rgba(212,175,55,0.04) 0%, transparent 50%),
          radial-gradient(ellipse 30% 30% at 80% 70%, rgba(212,175,55,0.03) 0%, transparent 50%),
          var(--dark)
        `,
      }}>
        {/* Subtle grid overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `
            linear-gradient(rgba(212,175,55,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,175,55,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse 70% 50% at 50% 40%, black 20%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 50% at 50% 40%, black 20%, transparent 70%)',
        }} />
      </div>

      {/* Floating orbs */}
      <div style={{
        position: 'absolute', top: '10%', left: '-5%',
        width: '400px', height: '400px', borderRadius: '50%',
        background: 'rgba(212,175,55,0.06)',
        filter: 'blur(80px)', pointerEvents: 'none',
        animation: 'float 8s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', right: '-5%',
        width: '300px', height: '300px', borderRadius: '50%',
        background: 'rgba(212,175,55,0.04)',
        filter: 'blur(80px)', pointerEvents: 'none',
        animation: 'float 8s ease-in-out -3s infinite',
      }} />

      {/* Content */}
      <div style={{ position: 'relative', textAlign: 'center', maxWidth: '860px' }}>
        <Image
          src="/images/logo.jpg"
          alt="Cine Classic Studios"
          width={120}
          height={120}
          style={{
            margin: '0 auto 2.5rem',
            borderRadius: '8px',
            filter: 'drop-shadow(0 4px 32px rgba(212,175,55,0.2))',
          }}
          priority
        />

        {/* Badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'var(--gold)',
          background: 'rgba(212,175,55,0.08)',
          border: '1px solid rgba(212,175,55,0.2)',
          padding: '8px 20px', borderRadius: '100px', marginBottom: '2rem',
        }}>
          <span style={{
            width: '6px', height: '6px', background: 'var(--gold)', borderRadius: '50%',
            animation: 'pulse-dot 2s ease-in-out infinite',
          }} />
          Premium Studio Rental Space
        </div>

        <h1 style={{
          fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)',
          lineHeight: 1.08, marginBottom: '1.5rem',
          color: 'var(--white)',
          letterSpacing: '-0.025em',
          fontWeight: 800,
        }}>
          Where Stories<br />
          Come to{' '}
          <em style={{
            fontStyle: 'normal',
            background: 'linear-gradient(135deg, var(--gold), var(--gold-lt), var(--gold))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Life
          </em>
        </h1>

        <p style={{
          fontSize: '1.125rem', color: 'var(--gray)',
          maxWidth: '560px', margin: '0 auto 2.5rem',
          fontWeight: 300, lineHeight: 1.65,
        }}>
          Professional film &amp; photography studio spaces for rent.
          Five unique sets. Fully equipped. Ready for your vision.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#sets" className="btn-primary">Explore Our Sets →</a>
          <a href="#booking" className="btn-outline">Book a Session</a>
        </div>

        {/* Stats */}
        <div style={{
          display: 'flex', justifyContent: 'center',
          gap: '3rem', marginTop: '5rem', flexWrap: 'wrap',
        }}>
          {STATS.map((s, i) => (
            <div key={s.label} style={{ textAlign: 'center', position: 'relative' }}>
              {i > 0 && (
                <span style={{
                  position: 'absolute', left: '-1.5rem', top: '50%',
                  transform: 'translateY(-50%)',
                  width: '1px', height: '32px',
                  background: 'rgba(212,175,55,0.15)',
                }} />
              )}
              <div style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: '2.6rem', fontWeight: 800,
                color: 'var(--gold)', lineHeight: 1,
                letterSpacing: '-0.02em',
              }}>{s.number}</div>
              <div style={{
                fontSize: '0.75rem', letterSpacing: '0.12em',
                textTransform: 'uppercase', color: 'var(--gray)', marginTop: '8px',
              }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(20px, -20px); }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
      `}</style>
    </section>
  );
}
