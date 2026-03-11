import type { Metadata } from 'next';
import About from '@/components/About';
import FloatingButtons from '@/components/FloatingButtons';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import RevealProvider from '@/components/RevealProvider';
import { ArrowRightIcon, CheckIcon, GridIcon, IconBadge, MessageCircleIcon, SparkIcon } from '@/components/ui/icons';
import { loadHomePage, loadSiteSettings } from '@/lib/sanity';

export const metadata: Metadata = {
  title: 'About Cine Classic Studios | Mumbai Film & Photoshoot Studio Rental',
  description:
    'Learn how Cine Classic Studios supports film, OTT, commercial, music video, and photography teams with production-ready studio sets in Mumbai.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Cine Classic Studios | Mumbai Film & Photoshoot Studio Rental',
    description:
      'A production-focused studio rental business in Mumbai built for faster recces, clearer planning, and confident shoot bookings.',
    url: '/about',
    type: 'website',
  },
  twitter: {
    title: 'About Cine Classic Studios | Mumbai Film & Photoshoot Studio Rental',
    description:
      'A production-focused studio rental business in Mumbai built for faster recces, clearer planning, and confident shoot bookings.',
  },
};

export const revalidate = 30;

const CLIENT_GROUPS = [
  {
    title: 'Films & OTT',
    description:
      'For production houses, directors, and line producers who need controlled set looks, smoother recce decisions, and practical shoot-day planning.',
    icon: GridIcon,
  },
  {
    title: 'Commercial & branded content',
    description:
      'For agencies and commercial teams looking for polished environments, efficient scheduling, and a studio that works well for fast-moving shoot briefs.',
    icon: SparkIcon,
  },
  {
    title: 'Photography & music videos',
    description:
      'For photographers, stylists, and music video crews who need visually distinct sets in Mumbai and a faster path from shortlist to booking.',
    icon: MessageCircleIcon,
  },
] as const;

const REASONS = [
  'Production-ready sets that help teams compare looks faster during planning.',
  'A Mumbai location that supports recces, access planning, and repeat visits more easily.',
  'A studio workflow that values response speed, clarity, and practical coordination.',
  'A business model built around helping crews decide quickly whether a set suits the brief.',
] as const;

const WORKFLOW = [
  {
    step: 'Shortlist the right set',
    description:
      'Start with the studio pages to compare looks, layouts, and suitability for your shoot format.',
  },
  {
    step: 'Arrange a recce',
    description:
      'If the set is a fit, the team helps coordinate a site visit so producers and creatives can assess it properly.',
  },
  {
    step: 'Confirm production details',
    description:
      'Availability, shoot scope, access, and practical questions can be clarified before you lock dates.',
  },
  {
    step: 'Move into booking',
    description:
      'Once the team is aligned, the next step is a straightforward booking conversation instead of more guesswork.',
  },
] as const;

export default async function AboutPage() {
  const [homePage, settings] = await Promise.all([loadHomePage(), loadSiteSettings()]);
  const whatsappUrl = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
    `Hi ${settings.businessName}, I would like to discuss a recce for an upcoming shoot.`,
  )}`;

  return (
    <>
      <RevealProvider />
      <FloatingButtons />
      <Navbar />

      <main>
        <section
          style={{
            padding: '160px 5% 100px',
            background: 'var(--dark)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.06) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
            <div className="section-tag">About Cine Classic Studios</div>
            <h1
              style={{
                fontFamily: 'var(--font-playfair), serif',
                fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
                fontWeight: 800,
                color: 'var(--white)',
                margin: '1.35rem 0 1rem',
                lineHeight: 1.08,
              }}
            >
              A Mumbai studio built for <span style={{ color: 'var(--gold)' }}>production teams</span>
            </h1>
            <p
              style={{
                color: 'var(--gray)',
                fontSize: 'clamp(1rem, 1.5vw, 1.12rem)',
                lineHeight: 1.8,
                maxWidth: '680px',
                margin: '0 auto 2.4rem',
              }}
            >
              Cine Classic Studios is designed to help producers, directors, photographers, ad filmmakers, and OTT teams evaluate sets faster, plan recces with less friction, and move toward booking with clearer next steps.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/studios" className="btn-primary">
                View Studio Sets
                <ArrowRightIcon size={15} />
              </a>
              <a href="/#booking" className="btn-outline">
                Check Availability
              </a>
            </div>
          </div>
        </section>

        <About content={homePage} ctaHref="/#booking" ctaLabel="Check Availability" />

        <section style={{ padding: '100px 5%', background: 'var(--dark)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="reveal" style={{ textAlign: 'center', marginBottom: '3.8rem' }}>
              <div className="section-tag">Who We Serve</div>
              <h2
                style={{
                  fontFamily: 'var(--font-playfair), serif',
                  fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                  lineHeight: 1.12,
                  margin: '1.15rem 0 0.9rem',
                }}
              >
                Built for the teams who need to decide <span style={{ color: 'var(--gold)' }}>quickly and confidently</span>
              </h2>
              <p style={{ color: 'var(--gray)', lineHeight: 1.8, maxWidth: '660px', margin: '0 auto' }}>
                The studio is positioned for real production decision-makers: people comparing locations, coordinating recces, and trying to move from shortlist to confirmed dates without avoidable friction.
              </p>
            </div>

            <div className="fac-grid">
              {CLIENT_GROUPS.map((group, index) => {
                const Icon = group.icon;
                return (
                  <div
                    key={group.title}
                    className={`reveal reveal-delay-${(index % 3) + 1} fac-card`}
                    style={{ background: 'var(--dark3)' }}
                  >
                    <IconBadge size={46} rounded={14} style={{ marginBottom: '1rem' }}>
                      <Icon size={18} />
                    </IconBadge>
                    <h3
                      style={{
                        fontFamily: 'var(--font-playfair), serif',
                        fontSize: '1.2rem',
                        color: 'var(--white)',
                        marginBottom: '0.85rem',
                      }}
                    >
                      {group.title}
                    </h3>
                    <p style={{ color: 'var(--gray)', lineHeight: 1.75, fontSize: '0.92rem' }}>{group.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section style={{ padding: '100px 5%', background: 'var(--dark2)' }}>
          <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
            <div className="reveal" style={{ textAlign: 'center', marginBottom: '3.2rem' }}>
              <div className="section-tag">Why Clients Choose Us</div>
              <h2
                style={{
                  fontFamily: 'var(--font-playfair), serif',
                  fontSize: 'clamp(2rem, 3.2vw, 2.8rem)',
                  lineHeight: 1.12,
                  margin: '1.1rem 0 0.9rem',
                }}
              >
                The studio is useful because it helps production teams <span style={{ color: 'var(--gold)' }}>move forward faster</span>
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              {REASONS.map((reason, index) => (
                <div
                  key={reason}
                  className={`reveal reveal-delay-${(index % 3) + 1}`}
                  style={{
                    padding: '1.2rem 1.25rem',
                    borderRadius: '18px',
                    border: '1px solid rgba(255,255,255,0.08)',
                    background: 'rgba(255,255,255,0.03)',
                    display: 'flex',
                    gap: '0.75rem',
                    alignItems: 'flex-start',
                  }}
                >
                  <IconBadge size={26} rounded={999} style={{ background: 'rgba(212,175,55,0.12)', marginTop: '0.1rem' }}>
                    <CheckIcon size={13} />
                  </IconBadge>
                  <p style={{ color: 'var(--gray-lt)', lineHeight: 1.7, fontSize: '0.9rem' }}>{reason}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: '100px 5%', background: 'var(--dark)' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div className="reveal" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <div className="section-tag">How We Support Shoots</div>
              <h2
                style={{
                  fontFamily: 'var(--font-playfair), serif',
                  fontSize: 'clamp(2rem, 3.2vw, 2.8rem)',
                  lineHeight: 1.12,
                  margin: '1.1rem 0 0.9rem',
                }}
              >
                A clearer path from <span style={{ color: 'var(--gold)' }}>recce to booking</span>
              </h2>
              <p style={{ color: 'var(--gray)', lineHeight: 1.8, maxWidth: '640px', margin: '0 auto' }}>
                The goal is not just to show sets. It is to help clients understand fit, ask the right questions, and move into the booking conversation with more confidence.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              {WORKFLOW.map((item, index) => (
                <div
                  key={item.step}
                  className={`reveal reveal-delay-${(index % 3) + 1}`}
                  style={{
                    borderRadius: '18px',
                    border: '1px solid rgba(255,255,255,0.08)',
                    background: 'var(--dark3)',
                    padding: '1.35rem',
                  }}
                >
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '999px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1rem',
                      background: 'rgba(212,175,55,0.08)',
                      border: '1px solid rgba(212,175,55,0.2)',
                      color: 'var(--gold)',
                      fontWeight: 700,
                    }}
                  >
                    0{index + 1}
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-playfair), serif',
                      fontSize: '1.15rem',
                      color: 'var(--white)',
                      marginBottom: '0.75rem',
                    }}
                  >
                    {item.step}
                  </h3>
                  <p style={{ color: 'var(--gray)', lineHeight: 1.7, fontSize: '0.9rem' }}>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ padding: '100px 5%', background: 'var(--dark2)', textAlign: 'center' }}>
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            <div className="section-tag">Next Step</div>
            <h2
              style={{
                fontFamily: 'var(--font-playfair), serif',
                fontSize: 'clamp(2rem, 3.4vw, 3rem)',
                lineHeight: 1.12,
                margin: '1.15rem 0 0.9rem',
              }}
            >
              If the studio looks right for your shoot, <span style={{ color: 'var(--gold)' }}>start the conversation</span>
            </h2>
            <p style={{ color: 'var(--gray)', lineHeight: 1.8, marginBottom: '2rem' }}>
              The fastest next step is to review the studio pages, shortlist the right set, and send one inquiry for availability or recce coordination.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/#booking" className="btn-primary">
                Check Availability
                <ArrowRightIcon size={15} />
              </a>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-outline">
                WhatsApp the Team
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

