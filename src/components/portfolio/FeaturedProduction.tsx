import { IconBadge, SparkIcon } from '@/components/ui/icons';
import type { Production } from '@/lib/ui/production';
import { TYPE_ICONS } from '@/lib/ui/production';

interface Props {
  production: Production | null;
}

export default function FeaturedProduction({ production }: Props) {
  if (!production) {
    return null;
  }

  return (
    <section style={{ padding: '100px 5%', background: 'var(--dark2)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="section-tag">Spotlight</div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
            Featured <span style={{ color: 'var(--gold)' }}>Production</span>
          </h2>
        </div>

        <div className="pf-featured-grid reveal">
          <div style={{ position: 'relative', aspectRatio: '4/5', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)', boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(212,175,55,0.1)' }}>
            <div style={{ position: 'absolute', inset: 0, background: production.gradient, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '3.6rem', fontWeight: 700, opacity: 0.18, letterSpacing: '0.12em' }}>{TYPE_ICONS[production.type]}</span>
              <span style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '1.8rem', fontWeight: 700, color: 'rgba(255,255,255,0.15)', textAlign: 'center', padding: '0 2rem' }}>{production.title}</span>
            </div>

            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(212,175,55,0.12) 0%, transparent 50%)', pointerEvents: 'none' }} />

            {production.network && (
              <div style={{ position: 'absolute', bottom: '1.25rem', left: '1.25rem', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', padding: '5px 12px', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)' }}>
                {production.network}
              </div>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1.5rem' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: production.typeColor, background: `${production.typeColor}15`, border: `1px solid ${production.typeColor}30`, padding: '5px 14px', borderRadius: '100px', width: 'fit-content' }}>
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: production.typeColor }} />
              {production.type}
            </span>

            <h3 style={{ fontFamily: 'var(--font-playfair), serif', fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 700, lineHeight: 1.1, color: 'var(--white)' }}>{production.title}</h3>

            <p style={{ fontSize: '0.9rem', color: production.typeColor, fontWeight: 500, letterSpacing: '0.06em' }}>{production.year}{production.network ? ` | ${production.network}` : ''}</p>

            {production.description && <p style={{ fontSize: '1.05rem', color: 'var(--gray-lt)', lineHeight: 1.85, fontWeight: 300, borderLeft: `3px solid ${production.typeColor}`, paddingLeft: '1.25rem' }}>{production.description}</p>}

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.7rem', fontSize: '0.82rem', color: 'var(--gold)', background: 'rgba(212,175,55,0.06)', border: '1px solid rgba(212,175,55,0.18)', padding: '10px 18px', borderRadius: '10px', width: 'fit-content' }}>
              <IconBadge size={28} rounded={8} style={{ background: 'rgba(212,175,55,0.1)' }}>
                <SparkIcon size={14} />
              </IconBadge>
              <span>Shot at Cine Classic Studios</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
