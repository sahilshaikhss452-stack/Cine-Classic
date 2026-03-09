import { notFound }     from 'next/navigation';
import type { Metadata } from 'next';
import Navbar           from '@/components/Navbar';
import Footer           from '@/components/Footer';
import RevealProvider   from '@/components/RevealProvider';
import StudioHero       from '@/components/studios/StudioHero';
import StudioGallery    from '@/components/studios/StudioGallery';
import SetLayout        from '@/components/studios/SetLayout';
import StudioDetails    from '@/components/studios/StudioDetails';
import StudioBooking    from '@/components/studios/StudioBooking';
import StudioCard       from '@/components/studios/StudioCard';
import StudioSubNav     from '@/components/studios/StudioSubNav';
import Link             from 'next/link';

// Data sources
import { STUDIO_SETS, getSetBySlug }  from '@/data/sets';
import type { StudioSet }             from '@/data/sets';
import { sanityFetch }                from '@/lib/sanity';
import { STUDIO_BY_SLUG_QUERY, STUDIO_SLUGS_QUERY, STUDIOS_QUERY } from '@/lib/sanity.queries';
import type { SanityStudio }          from '@/lib/sanity.types';
import { sanityStudioToSet, mergeStudiosWithFallback } from '@/lib/sanity.adapter';

interface Props {
  params: Promise<{ slug: string }>;
}

// ─── Data helpers ─────────────────────────────────────────────────────────────

/**
 * Fetch a single studio by slug.
 * Strategy: Sanity-first → hardcoded fallback.
 */
async function getStudio(slug: string): Promise<StudioSet | null> {
  try {
    const doc = await sanityFetch<SanityStudio | null>(STUDIO_BY_SLUG_QUERY, { slug });
    if (doc) return sanityStudioToSet(doc);
  } catch {
    // Sanity unavailable — fall through
  }
  return getSetBySlug(slug) ?? null;
}

/**
 * Fetch all studios (for "More Spaces" section).
 * Uses mergeStudiosWithFallback so partial CMS migrations are safe:
 * CMS docs override matching hardcoded sets; unpublished sets stay hardcoded.
 */
async function getAllStudios(): Promise<StudioSet[]> {
  try {
    const docs = await sanityFetch<SanityStudio[]>(STUDIOS_QUERY);
    return mergeStudiosWithFallback(docs);
  } catch {
    // Sanity unavailable — use hardcoded fallback
  }
  return STUDIO_SETS;
}

// ─── Static params — pre-render every studio page at build time ───────────────

/**
 * generateStaticParams merges Sanity slugs with hardcoded slugs so every
 * studio page is pre-rendered regardless of which data source is active.
 * When Sanity is populated its slugs take precedence; hardcoded slugs fill
 * any gaps (e.g. sets not yet entered in the CMS).
 */
export async function generateStaticParams() {
  // Start with hardcoded slugs as the guaranteed baseline
  const hardcodedSlugs = new Set(STUDIO_SETS.map((s) => s.slug));
  const params = STUDIO_SETS.map((s) => ({ slug: s.slug }));

  try {
    const sanitySlugs = await sanityFetch<{ slug: string }[]>(STUDIO_SLUGS_QUERY);
    if (sanitySlugs.length > 0) {
      // Add any Sanity slugs not already in the hardcoded list
      for (const { slug } of sanitySlugs) {
        if (!hardcodedSlugs.has(slug)) {
          params.push({ slug });
        }
      }
    }
  } catch {
    // Sanity unavailable — hardcoded slugs are sufficient
  }

  return params;
}

// ─── Per-page SEO metadata ────────────────────────────────────────────────────

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const studio = await getStudio(slug);
  if (!studio) return { title: 'Studio Not Found' };

  return {
    title       : `${studio.name} – Cine Classic Studios`,
    description : studio.shortDescription,
    openGraph   : {
      title      : `${studio.name} – Cine Classic Studios`,
      description: studio.shortDescription,
      type       : 'website',
    },
  };
}

// ─── Page component ───────────────────────────────────────────────────────────

export default async function StudioPage({ params }: Props) {
  const { slug } = await params;

  // Fetch studio data + all studios in parallel
  const [studio, allStudios] = await Promise.all([
    getStudio(slug),
    getAllStudios(),
  ]);

  if (!studio) notFound();

  // Other studios for "More Spaces" section (exclude current, show max 3)
  const otherStudios = allStudios.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      <RevealProvider />
      <Navbar />

      <StudioSubNav />

      <main>
        {/*
          Section order (conversion-optimised for film directors / OTT / agencies):
          1. Hero     — Cinematic first impression + glass stats bar
          2. Gallery  — Visual proof, or premium walkthrough CTA if no photos yet
          3. Details  — Specs + about + facilities + use-cases (answers every question)
          4. Layout   — Floor plan reference for pre-production planning
          5. Booking  — Streamlined enquiry (close the loop)
        */}
        <StudioHero    studio={studio} />
        <StudioGallery studio={studio} />
        <StudioDetails studio={studio} />
        <SetLayout     studio={studio} />
        <StudioBooking studio={studio} />

        {/* More Studios section */}
        <section style={{
          padding   : '80px 5%',
          background: 'var(--dark2)',
          position  : 'relative',
        }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
            background: 'linear-gradient(90deg, transparent, var(--gold), transparent)',
            opacity: 0.15,
          }} />
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{
              display       : 'flex',
              justifyContent: 'space-between',
              alignItems    : 'flex-end',
              flexWrap      : 'wrap',
              gap           : '1rem',
              marginBottom  : '2.5rem',
            }}>
              <div>
                <div className="section-tag">Explore More</div>
                <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}>
                  Other <span style={{ color: 'var(--gold)' }}>Studio Spaces</span>
                </h2>
              </div>
              <Link
                href="/studios"
                style={{
                  fontSize      : '0.8rem',
                  fontWeight    : 600,
                  letterSpacing : '0.08em',
                  textTransform : 'uppercase',
                  color         : 'var(--gold)',
                  border        : '1px solid rgba(212,175,55,0.3)',
                  padding       : '10px 22px',
                  borderRadius  : '100px',
                  transition    : 'all 0.4s',
                }}
              >
                View All Studios →
              </Link>
            </div>

            <div style={{
              display              : 'grid',
              gridTemplateColumns  : 'repeat(auto-fill, minmax(300px, 1fr))',
              gap                  : '1.5rem',
            }}>
              {otherStudios.map((s, i) => (
                <StudioCard key={s.id} studio={s} index={i} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
