import type { Metadata } from 'next';
import FloatingButtons from '@/components/FloatingButtons';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import RevealProvider from '@/components/RevealProvider';
import { ArrowRightIcon, CheckIcon, GridIcon, IconBadge, MessageCircleIcon, SparkIcon } from '@/components/ui/icons';
import { loadSiteSettings } from '@/lib/sanity';

export const metadata: Metadata = {
  title: 'About Cine Classic Studios | Mumbai Film & Photoshoot Studio Rental',
  description:
    'Learn how Cine Classic Studios helps film, commercial, OTT, music video, and photography teams shortlist studio sets faster, plan recces smoothly, and book with confidence in Mumbai.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Cine Classic Studios | Mumbai Film & Photoshoot Studio Rental',
    description:
      'A Mumbai studio rental business built for production teams that need clear set options, practical shoot planning, and faster booking decisions.',
    url: '/about',
    type: 'website',
  },
  twitter: {
    title: 'About Cine Classic Studios | Mumbai Film & Photoshoot Studio Rental',
    description:
      'A Mumbai studio rental business built for production teams that need clear set options, practical shoot planning, and faster booking decisions.',
  },
};

export const revalidate = 30;

const CLIENT_GROUPS = [
  {
    title: 'Films & OTT productions',
    description:
      'For producers, directors, line producers, and assistant directors who need studio sets that can be evaluated quickly for scene fit, scheduling, and crew movement.',
    icon: GridIcon,
  },
  {
    title: 'Commercial shoots & branded content',
    description:
      'For agencies and production partners looking for a Mumbai studio that feels polished, practical to shortlist, and easier to coordinate under deadline pressure.',
    icon: SparkIcon,
  },
  {
    title: 'Photography, music videos & digital campaigns',
    description:
      'For photographers, stylists, music video teams, and content crews who need visually distinctive sets and a straightforward route from recce to booking.',
    icon: MessageCircleIcon,
  },
] as const;

const POSITIONING_POINTS = [
  'A premium studio rental business in Mumbai focused on production usability, not just presentation.',
  'A location-scouting experience designed to help teams judge set fit, planning effort, and next steps faster.',
  'A shoot partner that values clear communication, recce coordination, and practical booking conversations.',
] as const;

const REASONS = [
  'The studio pages are designed to help production teams compare set looks, layouts, and suitability without unnecessary guesswork.',
  'The business is positioned around faster decision-making, so clients can move from shortlist to recce without feeling stuck in vague back-and-forth.',
  'The conversation stays focused on real production concerns such as set fit, shoot type, crew planning, and availability.',
  'The overall experience is built to feel credible for agencies, filmmakers, photographers, and commercial production teams working on deadlines.',
] as const;

const WORKFLOW = [
  {
    step: 'Review the right sets',
    description:
      'Start by exploring the studio pages to understand the look, layout, and type of scenes each set can support.',
  },
  {
    step: 'Shortlist for your brief',
    description:
      'Once a set looks relevant, narrow the options based on your shoot format, planning needs, and production timeline.',
  },
  {
    step: 'Check availability or arrange a recce',
    description:
      'Use the inquiry flow to confirm dates or begin the recce conversation before your team commits to the location.',
  },
  {
    step: 'Move toward booking with clarity',
    description:
      'From there, the goal is a clear production conversation, not more confusion, so your team can lock the next step faster.',
  },
] as const;

export default async function AboutPage() {
  const settings = await loadSiteSettings();
  const businessName = settings.businessName || 'Cine Classic Studios';
  const whatsappUrl = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
    `Hi ${businessName}, I would like to discuss a recce for an upcoming shoot.`,
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
              background: 'radial-gradient(ellipse at 50% 0%, rgba(212,175,55,0.08) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
            <div className="section-tag">About Cine Classic Studios</div>
            <h1
              style={{
                fontFamily: 'var(--font-playfair), serif',
                fontSize: 'clamp(2.4rem, 5vw, 4.1rem)',
                fontWeight: 800,
                color: 'var(--white)',
                margin: '1.35rem 0 1rem',
                lineHeight: 1.06,
                letterSpacing: '-0.03em',
              }}
            >
              A Mumbai studio partner for <span style={{ color: 'var(--gold)' }}>production teams that need clarity fast</span>
            </h1>
            <p
              style={{
                color: 'var(--gray)',
                fontSize: 'clamp(1rem, 1.5vw, 1.1rem)',
                lineHeight: 1.8,
                maxWidth: '700px',
                margin: '0 auto 2.4rem',
              }}
            >
              {businessName} is built for film, commercial, OTT, music video, and photoshoot teams that need production-ready studio sets in Mumbai, practical recce coordination, and a smoother path to booking.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/studios" className="btn-primary">
                Explore Studio Sets
                <ArrowRightIcon size={15} />
              </a>
              <a href="/#booking" className="btn-outline">
                Check Availability
              </a>
            </div>
          </div>
        </section>

        <section style={{ padding: '100px 5%', background: 'var(--dark2)' }}>
          <div className="about-grid" style={{ maxWidth: '1180px', margin: '0 auto' }}>
            <div className="reveal">
              <div className="section-tag">What This Business Is Built For</div>
              <h2
                style={{
                  fontFamily: 'var(--font-playfair), serif',
                  fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                  lineHeight: 1.12,
                  margin: '1.15rem 0 1rem',
                }}
              >
                A premium studio rental business designed to help teams <span style={{ color: 'var(--gold)' }}>assess fit and move faster</span>
              </h2>
              <p style={{ color: 'var(--gray)', lineHeight: 1.82, marginBottom: '1rem', fontSize: '1rem' }}>
                This is not a generic portfolio-style studio website. The purpose of Cine Classic Studios is to make it easier for serious production teams to understand what each set offers, whether it suits the brief, and how quickly the booking conversation can move forward.
              </p>
              <p style={{ color: 'var(--gray)', lineHeight: 1.82, fontSize: '1rem' }}>
                From recce planning to shoot coordination, the business is positioned around the questions real producers and location teams ask when time, logistics, and visual fit all matter at once.
              </p>
            </div>

            <div
              className="reveal reveal-delay-2"
              style={{
                borderRadius: '24px',
                border: '1px solid rgba(255,255,255,0.08)',
                background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                padding: '1.5rem',
                boxShadow: '0 30px 70px rgba(0,0,0,0.18)',
              }}
            >
              <div style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '1rem' }}>
                Positioning Snapshot
              </div>
              <div style={{ display: 'grid', gap: '0.9rem' }}>
                {POSITIONING_POINTS.map((point, index) => (
                  <div
                    key={point}
                    className={`reveal reveal-delay-${(index % 3) + 1}`}
                    style={{
                      display: 'flex',
                      gap: '0.8rem',
                      alignItems: 'flex-start',
                      padding: '0.95rem 1rem',
                      borderRadius: '18px',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    <IconBadge size={24} rounded={999} style={{ background: 'rgba(212,175,55,0.12)', marginTop: '0.1rem' }}>
                      <CheckIcon size={12} />
                    </IconBadge>
                    <p style={{ color: 'var(--gray-lt)', lineHeight: 1.7, fontSize: '0.92rem' }}>{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

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
                Built for the people who need to answer one question quickly: <span style={{ color: 'var(--gold)' }}>can we shoot here?</span>
              </h2>
              <p style={{ color: 'var(--gray)', lineHeight: 1.8, maxWidth: '700px', margin: '0 auto' }}>
                The website and studio experience are meant to support production decision-makers, not distract them. That means clearer set evaluation, better planning cues, and more direct next steps when a location looks right.
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
                The advantage is not just the sets. It is the <span style={{ color: 'var(--gold)' }}>decision-making clarity around them</span>
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
              <div className="section-tag">How The Process Works</div>
              <h2
                style={{
                  fontFamily: 'var(--font-playfair), serif',
                  fontSize: 'clamp(2rem, 3.2vw, 2.8rem)',
                  lineHeight: 1.12,
                  margin: '1.1rem 0 0.9rem',
                }}
              >
                A smoother path from <span style={{ color: 'var(--gold)' }}>shortlist to booking</span>
              </h2>
              <p style={{ color: 'var(--gray)', lineHeight: 1.8, maxWidth: '680px', margin: '0 auto' }}>
                The experience is structured to reduce uncertainty for producers, photographers, agencies, and location teams. The goal is to help you move toward the right next step with less friction.
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
              If the studio feels right for your brief, <span style={{ color: 'var(--gold)' }}>start the conversation now</span>
            </h2>
            <p style={{ color: 'var(--gray)', lineHeight: 1.8, marginBottom: '2rem' }}>
              Review the studio pages, shortlist the best-fit set, and send one inquiry for availability or recce planning. That is the fastest route toward a confident booking decision.
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
