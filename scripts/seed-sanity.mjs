/**
 * scripts/seed-sanity.mjs
 *
 * Populates your Sanity dataset with all studio sets, productions, and
 * testimonials that are currently hardcoded in src/data/*.ts.
 *
 * After running this script Sanity becomes the single source of truth
 * and the website will render all content from the CMS.
 *
 * ─── SETUP ──────────────────────────────────────────────────────────────────
 *  1. Go to https://sanity.io/manage → project ite8n25p → API → Tokens
 *  2. Click "Add API token"
 *  3. Label: "Seed Script", Permission: "Editor"
 *  4. Copy the token and add it to .env.local:
 *       SANITY_API_TOKEN=sk...your-token-here...
 *
 * ─── RUN ────────────────────────────────────────────────────────────────────
 *  npm run sanity:seed
 *
 * The script is IDEMPOTENT — safe to run multiple times. Each document uses
 * a deterministic _id (e.g. "studio-market-1") so re-running updates rather
 * than duplicating data.
 * ────────────────────────────────────────────────────────────────────────────
 */

import { createClient } from '@sanity/client';

// ── Read env ──────────────────────────────────────────────────────────────────
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';
const token     = process.env.SANITY_API_TOKEN;

if (!projectId) {
  console.error('\n❌  NEXT_PUBLIC_SANITY_PROJECT_ID is not set in .env.local\n');
  process.exit(1);
}
if (!token) {
  console.error('\n❌  SANITY_API_TOKEN is not set in .env.local');
  console.error('    1. Go to https://sanity.io/manage → project → API → Tokens');
  console.error('    2. Create an "Editor" token');
  console.error('    3. Add  SANITY_API_TOKEN=sk...  to your .env.local\n');
  process.exit(1);
}

const client = createClient({ projectId, dataset, token, apiVersion: '2024-01-01', useCdn: false });

// ── Helpers ───────────────────────────────────────────────────────────────────
function slug(value) { return { _type: 'slug', current: value }; }

async function upsertMany(docs, label) {
  const tx = client.transaction();
  for (const doc of docs) tx.createOrReplace(doc);
  await tx.commit();
  console.log(`  ✅  ${docs.length} ${label} created / updated`);
}

// ─────────────────────────────────────────────────────────────────────────────
// STUDIO SETS  (9 documents)
// ─────────────────────────────────────────────────────────────────────────────
const STUDIOS = [
  {
    _type: 'studio',
    _id:   'studio-empty-floor',
    name:  'Empty Floor',
    slug:  slug('empty-floor'),
    tagline: 'A vast, column-free blank canvas ready for any custom set build or large-scale production.',
    description: 'The Empty Floor is our most versatile space — a massive, column-free expanse that gives production designers complete creative freedom. With polished concrete underfoot, soaring 20-ft ceilings, and a full LED lighting grid overhead, this space transforms into anything your script demands: a city street, a grand hall, a war room, or a minimalist modern interior. Preferred by top production houses for feature films and OTT series.',
    size: 6000, height: 20, capacity: 'Up to 60 people',
    rateHourly: 8000, rateUnit: '/hour', minBookingHours: 4,
    parking: '40+ vehicles', powerCapacity: '200A 3-phase',
    icon: '🏗️', accentColor: '#a0a0b4',
    gradient: 'radial-gradient(ellipse at 50% 30%, rgba(200,200,210,0.18) 0%, #111 70%)',
    suitable_for: ['Feature Films', 'OTT Series', 'TV Commercials', 'Music Videos', 'Product Launches', 'Fashion Shows'],
    facilities: [
      'Full overhead LED lighting grid', 'Polished concrete floor',
      'Climate-controlled environment', '200A, 3-phase power supply',
      'High-speed Wi-Fi', 'Parking for 40+ vehicles',
      'Changing rooms × 4', 'On-site art direction support',
    ],
    productions: ['Sacred Games (Netflix)', 'Scam 1992 (SonyLIV)', 'Mirzapur S3 (Amazon)', 'Honda City Campaign'],
    layoutZones: [
      { _key: 'lz1', label: 'Primary Shooting Zone',  x: '30%', y: '35%' },
      { _key: 'lz2', label: 'LED Grid / Lighting Rig', x: '68%', y: '20%' },
      { _key: 'lz3', label: 'Art Dept & Props Store',  x: '72%', y: '68%' },
      { _key: 'lz4', label: 'Crew Room / Catering',    x: '20%', y: '72%' },
    ],
    featured: true, order: 1,
  },
  {
    _type: 'studio',
    _id:   'studio-market-1',
    name:  'Market 1',
    slug:  slug('market-1'),
    tagline: 'A traditional Indian street market with authentic stalls, weathered textures, and rich period detail.',
    description: 'Market 1 is a meticulously crafted traditional Indian bazaar, built to replicate the sights and textures of a 1970s–80s street market. Featuring individual vendor stalls, aged wooden counters, rusted iron signage, period-accurate props, and a cobblestone-look floor, this set immerses your audience completely. Every corner is dressed with authentic produce, cookware, and trinkets sourced from vintage markets.',
    size: 3200, height: 16, capacity: 'Up to 35 people',
    rateHourly: 6000, rateUnit: '/hour', minBookingHours: 4,
    parking: '25+ vehicles', powerCapacity: '100A 3-phase',
    icon: '🏪', accentColor: '#d2821f',
    gradient: 'radial-gradient(ellipse at 40% 50%, rgba(210,130,40,0.25) 0%, #1a0f05 70%)',
    suitable_for: ['Bollywood & Regional Films', 'Period Drama Series', 'TV Commercials', 'Music Videos', 'Documentary'],
    facilities: [
      'Fully dressed stalls with period props', 'Adjustable practicals & moody LED lighting',
      'Cobblestone-texture flooring', 'Interchangeable vendor stall fronts',
      'On-site props department', 'Climate control', 'Generator hookup',
    ],
    productions: ['Panchayat S2 (Amazon)', 'Dahaad (Amazon)', 'Tata Salt TVC', 'Zee5 Original Series'],
    layoutZones: [
      { _key: 'lz1', label: 'Main Bazaar Lane',   x: '28%', y: '35%' },
      { _key: 'lz2', label: 'Vendor Stall Row A', x: '62%', y: '28%' },
      { _key: 'lz3', label: 'Vendor Stall Row B', x: '65%', y: '62%' },
      { _key: 'lz4', label: 'Hero Shooting Spot', x: '22%', y: '68%' },
    ],
    featured: false, order: 2,
  },
  {
    _type: 'studio',
    _id:   'studio-market-2',
    name:  'Market 2',
    slug:  slug('market-2'),
    tagline: 'A contemporary urban market with modern stalls, neon signage, and a busy metro-market feel.',
    description: 'Market 2 takes the market aesthetic into the modern era — think busy urban sabzi mandi meets metro shopping lane. Bright neon signage, contemporary shop fronts, and a clean tiled floor make it ideal for modern-day stories set in city markets. The modular stall units let the art department scale the scene up or down as required.',
    size: 2800, height: 15, capacity: 'Up to 30 people',
    rateHourly: 5500, rateUnit: '/hour', minBookingHours: 4,
    parking: '20+ vehicles', powerCapacity: '100A 3-phase',
    icon: '🛒', accentColor: '#dcb432',
    gradient: 'radial-gradient(ellipse at 60% 40%, rgba(220,180,50,0.2) 0%, #120f00 70%)',
    suitable_for: ['Contemporary Films', 'Web Series', 'TV Commercials', 'Reality Shows', 'Music Videos'],
    facilities: [
      'Modular stall units (reconfigurable)', 'Neon & LED signage package',
      'Modern tiled flooring', 'Overhead LED lighting grid',
      'Props & dressing included', 'High-speed Wi-Fi', 'Changing rooms × 2',
    ],
    productions: ['Kota Factory S3 (Netflix)', 'Shark Tank India S2 (Sony)', 'Haldirams Campaign', 'Swiggy TVC'],
    layoutZones: [
      { _key: 'lz1', label: 'Modern Stall Zone',     x: '30%', y: '30%' },
      { _key: 'lz2', label: 'Neon Signage Corridor', x: '66%', y: '22%' },
      { _key: 'lz3', label: 'Hero Position',         x: '24%', y: '68%' },
      { _key: 'lz4', label: 'Overflow / B-Roll Area',x: '68%', y: '66%' },
    ],
    featured: false, order: 3,
  },
  {
    _type: 'studio',
    _id:   'studio-market-7',
    name:  'Market 7',
    slug:  slug('market-7'),
    tagline: 'A large multi-lane market set spanning multiple shop rows — ideal for crowd-scene productions.',
    description: 'The largest of our market sets, Market 7 features multiple lanes of stalls running in parallel, creating genuine depth and scale. Designed for crowd scenes, chase sequences, and wide establishing shots, the set includes perspective-painted backdrops that extend the illusion of depth. Built with modular steel-frame shop facades, it can be rapidly redressed between scenes.',
    size: 4500, height: 18, capacity: 'Up to 50 people',
    rateHourly: 7000, rateUnit: '/hour', minBookingHours: 4,
    parking: '40+ vehicles', powerCapacity: '200A 3-phase',
    icon: '🏬', accentColor: '#c8501e',
    gradient: 'radial-gradient(ellipse at 35% 55%, rgba(200,80,30,0.22) 0%, #1a0800 70%)',
    suitable_for: ['Feature Films (Crowd Scenes)', 'Action Sequences', 'Period Drama & OTT', 'Large-Scale Commercials', 'Music Videos'],
    facilities: [
      'Multi-lane market layout', 'Perspective-painted depth backdrops',
      'Modular steel-frame shop facades', 'Full LED + practicals lighting',
      'Large crew green room', 'Props & dressing included', '3-phase power, 200A',
    ],
    productions: ['Mirzapur S2 (Amazon)', 'Article 370 (Film)', 'Star Sports Campaign', 'Kapil Sharma Show'],
    layoutZones: [
      { _key: 'lz1', label: 'Lane A — Lead Action', x: '20%', y: '30%' },
      { _key: 'lz2', label: 'Lane B — Supporting',  x: '50%', y: '30%' },
      { _key: 'lz3', label: 'Depth Backdrop Wall',  x: '75%', y: '20%' },
      { _key: 'lz4', label: 'Crowd Staging Area',   x: '35%', y: '70%' },
    ],
    featured: false, order: 4,
  },
  {
    _type: 'studio',
    _id:   'studio-chawl-new',
    name:  'Chawl New',
    slug:  slug('chawl-new'),
    tagline: 'An authentic Mumbai chawl with narrow corridors, shared galleries, and vintage residential facades.',
    description: "Chawl New is a faithful recreation of a classic Mumbai chawl — the multi-storey shared residential buildings that define the city's soul. The set features a two-storey structure with a central courtyard, wood-railed open corridors, individual room facades with period-accurate doors and windows, and a communal hand-pump. Every inch is dressed: hanging clothes lines, religious idols, worn-out letterboxes, and colourful flower pots.",
    size: 3500, height: 18, capacity: 'Up to 40 people',
    rateHourly: 7500, rateUnit: '/hour', minBookingHours: 4,
    parking: '30+ vehicles', powerCapacity: '100A 3-phase',
    icon: '🏚️', accentColor: '#a06432',
    gradient: 'radial-gradient(ellipse at 45% 40%, rgba(160,100,50,0.25) 0%, #150d05 70%)',
    suitable_for: ['Bollywood Films', 'Mumbai-based OTT Series', 'Period Drama', 'Social Advertising', 'Music Videos'],
    facilities: [
      'Two-storey structural build', 'Central courtyard with hand-pump prop',
      'Wood-railed open corridors', 'Period-accurate door & window facades',
      'Dressed props included (laundry, pots, etc.)', 'Moody practicals + LED lighting',
      'Changing rooms × 3',
    ],
    productions: ['Scam 1992 (SonyLIV)', 'Gullak S4 (SonyLIV)', 'Dhamaka (Netflix)', 'Fevicol Campaign'],
    layoutZones: [
      { _key: 'lz1', label: 'Central Courtyard',      x: '45%', y: '50%' },
      { _key: 'lz2', label: 'Upper Corridor Level 2', x: '72%', y: '22%' },
      { _key: 'lz3', label: 'Ground Floor Facade',    x: '20%', y: '35%' },
      { _key: 'lz4', label: 'Entry Gate / Lane',      x: '25%', y: '72%' },
    ],
    featured: false, order: 5,
  },
  {
    _type: 'studio',
    _id:   'studio-court-set',
    name:  'Court Set',
    slug:  slug('court-set'),
    tagline: "A full-scale Indian courtroom with judge's bench, witness box, dock, and public gallery.",
    description: "Our Court Set is a production-ready replica of an Indian district courtroom built to authentic architectural detail. The set includes a raised judge's bench with the national emblem, a full witness box, defendant dock, prosecution and defence counsel tables, a public gallery with wooden benches, and characteristic arched windows. Used by leading legal dramas and crime thrillers, it eliminates costly real-location permissions.",
    size: 2500, height: 16, capacity: 'Up to 40 people',
    rateHourly: 6500, rateUnit: '/hour', minBookingHours: 4,
    parking: '25+ vehicles', powerCapacity: '100A 3-phase',
    icon: '⚖️', accentColor: '#3c50a0',
    gradient: 'radial-gradient(ellipse at 50% 35%, rgba(60,80,160,0.2) 0%, #05050f 70%)',
    suitable_for: ["Legal Drama Films & Series", 'Crime Thrillers', 'TV Serials', 'Docudramas', 'Courtroom Commercials'],
    facilities: [
      "Full judge's bench with national emblem", 'Witness box & defendant dock',
      'Prosecution & defence tables', 'Public gallery (30-seat capacity)',
      'Arched window facades with diffused light', 'Overhead + practical lighting rig',
      'Props & dressing included',
    ],
    productions: ['Criminal Justice S3 (Disney+)', 'Jai Bhim (Amazon)', 'Rocket Boys S2 (SonyLIV)', 'LIC Campaign'],
    layoutZones: [
      { _key: 'lz1', label: "Judge's Bench", x: '50%', y: '20%' },
      { _key: 'lz2', label: 'Witness Box',   x: '72%', y: '38%' },
      { _key: 'lz3', label: 'Counsel Tables',x: '40%', y: '52%' },
      { _key: 'lz4', label: 'Public Gallery',x: '22%', y: '70%' },
    ],
    featured: false, order: 6,
  },
  {
    _type: 'studio',
    _id:   'studio-hospital-set',
    name:  'Hospital Set',
    slug:  slug('hospital-set'),
    tagline: "A clinical-grade hospital set with wards, an ICU bay, procedure room, and nurse's station.",
    description: "The Hospital Set is one of our most detailed and frequently booked spaces. It includes a general ward with four hospital beds, an ICU bay with medical monitors and prop equipment, a nurse's station with reception desk, a procedure room, and connecting corridor sections. All medical equipment is prop-grade and visually authentic. The neutral palette photographs convincingly under both warm and cool lighting.",
    size: 2800, height: 12, capacity: 'Up to 30 people',
    rateHourly: 6000, rateUnit: '/hour', minBookingHours: 4,
    parking: '20+ vehicles', powerCapacity: '100A 3-phase',
    icon: '🏥', accentColor: '#64b4dc',
    gradient: 'radial-gradient(ellipse at 50% 30%, rgba(100,180,220,0.18) 0%, #050810 70%)',
    suitable_for: ['Medical Drama Films & Series', 'Pharma Commercials', 'Public Health PSAs', 'OTT Medical Dramas', 'Social Advertising'],
    facilities: [
      'General ward (4-bed configuration)', 'ICU bay with prop monitors & equipment',
      "Nurse's station & reception desk", 'Procedure room',
      'Corridor sections (connectable)', 'Cool-white overhead LED lighting',
      'Full medical props & dressing',
    ],
    productions: ['Sanjivani (Star Plus)', 'Human (Disney+ Hotstar)', 'Apollo Hospitals TVC', 'Cipla Campaign'],
    layoutZones: [
      { _key: 'lz1', label: 'General Ward (4 beds)', x: '25%', y: '30%' },
      { _key: 'lz2', label: 'ICU Bay',               x: '68%', y: '28%' },
      { _key: 'lz3', label: "Nurse's Station",        x: '65%', y: '65%' },
      { _key: 'lz4', label: 'Corridor / Entry',       x: '22%', y: '68%' },
    ],
    featured: false, order: 7,
  },
  {
    _type: 'studio',
    _id:   'studio-police-station-set',
    name:  'Police Station Set',
    slug:  slug('police-station-set'),
    tagline: "A complete Indian police station — front desk, interrogation room, lock-up cells, and inspector's office.",
    description: "Our Police Station Set is a production-proven replica of a busy Indian thana. The build includes a front reception desk with period signage, a cramped inspector's office with maps and case files, an authentic interrogation room with a single overhead practical, and a two-cell lock-up with steel bars. The gritty, lived-in dressing and practical lighting design create the tension that crime productions demand.",
    size: 2200, height: 12, capacity: 'Up to 25 people',
    rateHourly: 5500, rateUnit: '/hour', minBookingHours: 4,
    parking: '15+ vehicles', powerCapacity: '100A 3-phase',
    icon: '🚔', accentColor: '#283c64',
    gradient: 'radial-gradient(ellipse at 40% 60%, rgba(40,60,100,0.25) 0%, #03050d 70%)',
    suitable_for: ['Crime Thrillers', 'Bollywood Action Films', 'Police Drama Series', 'OTT Crime Content', 'TV Serials'],
    facilities: [
      'Front reception desk & noticeboard', "Inspector's office with full prop dressing",
      'Interrogation room (single overhead practical)', 'Two-cell lock-up with steel bars',
      'Connecting corridor section', 'Gritty practical + moody LED lighting',
      'Police props & dressing included',
    ],
    productions: ['Delhi Crime S2 (Netflix)', 'Mirzapur S3 (Amazon)', 'Paatal Lok S2 (Amazon)', 'Arjun Reddy (remake)'],
    layoutZones: [
      { _key: 'lz1', label: 'Front Desk & Entry',  x: '22%', y: '30%' },
      { _key: 'lz2', label: "Inspector's Office",  x: '68%', y: '28%' },
      { _key: 'lz3', label: 'Interrogation Room',  x: '68%', y: '65%' },
      { _key: 'lz4', label: 'Lock-Up Cells',       x: '25%', y: '70%' },
    ],
    featured: false, order: 8,
  },
  {
    _type: 'studio',
    _id:   'studio-open-ground',
    name:  'Open Ground',
    slug:  slug('open-ground'),
    tagline: 'A sprawling 2+ acre outdoor ground with paved and grass zones for large-scale productions.',
    description: 'Our Open Ground is the go-to outdoor location for productions that need scale: car chases, action sequences, large crowd gatherings, outdoor concerts, or automotive campaigns. The 2+ acre space includes a paved central zone for vehicles and heavy equipment, surrounded by natural grass areas. Overnight shoots are available by arrangement, with generator hookups and portable facilities on-site.',
    size: null, height: null, capacity: 'Unlimited',
    rateHourly: 4500, rateUnit: '/hour', minBookingHours: 8,
    parking: '50+ vehicles', powerCapacity: 'Generator hookup (20–200A)',
    icon: '🌿', accentColor: '#3c8c50',
    gradient: 'radial-gradient(ellipse at 50% 20%, rgba(60,140,80,0.2) 0%, #030a05 70%)',
    suitable_for: ['Action & Stunt Sequences', 'Automotive Campaigns', 'Outdoor Concert Shoots', 'Large Crowd Scenes', 'Sports Commercials', 'Reality Shows'],
    facilities: [
      'Paved central zone (vehicle-ready)', 'Natural grass surrounding areas',
      '50+ vehicle parking', 'Generator hookup points',
      'Portable changing facilities', '24/7 access by arrangement', 'On-site security',
    ],
    productions: ['War (Bollywood film)', 'Tata Motors Campaign', 'MTV Roadies', 'IPL Promos (Star Sports)'],
    layoutZones: [
      { _key: 'lz1', label: 'Paved Action Zone',    x: '45%', y: '45%' },
      { _key: 'lz2', label: 'Vehicle Staging',      x: '72%', y: '28%' },
      { _key: 'lz3', label: 'Crowd Area (Grass)',   x: '22%', y: '65%' },
      { _key: 'lz4', label: 'Generator / Equipment',x: '72%', y: '68%' },
    ],
    featured: false, order: 9,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// PRODUCTIONS  (12 documents)
// ─────────────────────────────────────────────────────────────────────────────
const PRODUCTIONS = [
  {
    _type: 'production', _id: 'production-sacred-games',
    title: 'Sacred Games', type: 'Web Series', year: 2018, network: 'Netflix',
    description: 'A crime thriller following a Mumbai police officer drawn into the deadly world of a criminal mastermind. Multiple interior sets built and shot at Cine Classic Studios.',
    featured: true, order: 1,
  },
  {
    _type: 'production', _id: 'production-scam-1992',
    title: 'Scam 1992', type: 'TV Series', year: 2020, network: 'SonyLIV',
    description: 'The gripping true story of Harshad Mehta — the stockbroker who took the Bombay Stock Exchange by storm. Office and courtroom scenes filmed here.',
    featured: false, order: 2,
  },
  {
    _type: 'production', _id: 'production-gully-boy',
    title: 'Gully Boy', type: 'Film', year: 2019, network: null,
    description: 'A coming-of-age story about underground rap culture set in the streets of Dharavi, Mumbai. Chawl and street-market sets used extensively.',
    featured: false, order: 3,
  },
  {
    _type: 'production', _id: 'production-mirzapur',
    title: 'Mirzapur', type: 'Web Series', year: 2021, network: 'Amazon Prime Video',
    description: 'A gritty crime drama set in the lawless heartlands of Uttar Pradesh. Interior police station and courtroom sets shot at our studio.',
    featured: false, order: 4,
  },
  {
    _type: 'production', _id: 'production-tata-motors',
    title: 'Tata Motors Campaign', type: 'Advertisement', year: 2022, network: null,
    description: 'A flagship brand campaign for Tata Motors showcasing the future of Indian automotive design. Shot on our Empty Floor set.',
    featured: false, order: 5,
  },
  {
    _type: 'production', _id: 'production-ipl-promo',
    title: 'IPL Promo Shoot', type: 'Advertisement', year: 2023, network: 'Star Sports',
    description: 'High-energy promotional spots for the Indian Premier League. Fast-paced production across three sets over a single weekend.',
    featured: false, order: 6,
  },
  {
    _type: 'production', _id: 'production-panchayat',
    title: 'Panchayat', type: 'Web Series', year: 2020, network: 'Amazon Prime Video',
    description: 'An award-winning comedy drama about a city-educated engineer posted as a Panchayat secretary in a remote village. Village exterior and interior sets built here.',
    featured: false, order: 7,
  },
  {
    _type: 'production', _id: 'production-gehraiyaan',
    title: 'Gehraiyaan', type: 'Film', year: 2022, network: 'Amazon Prime Video',
    description: 'A contemporary drama navigating complex modern relationships and the choices that quietly define us. Apartment and yacht interiors shot on-set.',
    featured: false, order: 8,
  },
  {
    _type: 'production', _id: 'production-koffee-with-karan',
    title: 'Koffee With Karan S7', type: 'TV Series', year: 2022, network: 'Disney+ Hotstar',
    description: "India's most iconic celebrity chat show. The signature sofa set and backdrop were designed and built at Cine Classic Studios.",
    featured: false, order: 9,
  },
  {
    _type: 'production', _id: 'production-honda-city',
    title: 'Honda City Launch Film', type: 'Advertisement', year: 2023, network: null,
    description: 'A cinematic vehicle launch film produced for the Indian market. Controlled interior lighting and reflective floor built on Empty Floor.',
    featured: false, order: 10,
  },
  {
    _type: 'production', _id: 'production-tera-yaar',
    title: 'Tera Yaar Hoon Main', type: 'Music Video', year: 2023, network: null,
    description: 'A music video weaving through four different set environments — market, chawl, court, and open ground — to tell a friendship story across decades.',
    featured: false, order: 11,
  },
  {
    _type: 'production', _id: 'production-pehle-pyaar',
    title: 'Pehle Pyaar Ka Pehla Gham', type: 'Music Video', year: 2022, network: null,
    description: 'A romantic music video set against the nostalgic backdrops of our chawl and vintage market sets, bringing a 90s Bollywood feel to life.',
    featured: false, order: 12,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// TESTIMONIALS  (6 documents)
// ─────────────────────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    _type: 'testimonial', _id: 'testimonial-rahul-deshmukh',
    clientName: 'Rahul Deshmukh', role: 'Director of Photography',
    production: 'Scam 1992', network: 'SonyLIV', productionHouse: 'SonyLIV Originals',
    quote: 'The office and courtroom sets are exceptionally detailed — period-accurate props, controlled lighting rigs, and a crew that genuinely understands what a production needs. Every day we shot here was smooth from call time to wrap.',
    rating: 5, featured: true, order: 1,
  },
  {
    _type: 'testimonial', _id: 'testimonial-priya-sharma',
    clientName: 'Priya Sharma', role: 'Executive Producer',
    production: 'Panchayat S3', network: 'Amazon Prime Video', productionHouse: 'The Viral Fever',
    quote: 'We needed authentic village interiors built to spec in under two weeks. The Cine Classic team delivered flawlessly. The chawl and village sets look completely real on camera — our director was blown away on day one.',
    rating: 5, featured: true, order: 2,
  },
  {
    _type: 'testimonial', _id: 'testimonial-aarav-mehta',
    clientName: 'Aarav Mehta', role: 'Production Designer',
    production: 'Tata Motors Campaign', network: 'National Campaign', productionHouse: 'Tata Motors',
    quote: 'The Empty Floor is the best automotive shoot space in Mumbai. Reflective floor, 200A 3-phase power for our LED volumes, and enough square footage for two cars plus a full lighting package. We will not go anywhere else.',
    rating: 5, featured: true, order: 3,
  },
  {
    _type: 'testimonial', _id: 'testimonial-sunita-kapoor',
    clientName: 'Sunita Kapoor', role: 'Line Producer',
    production: 'Mirzapur', network: 'Amazon Prime Video', productionHouse: 'Excel Media & Entertainment',
    quote: 'We shot interior police station and courtroom scenes here across four episodes. The set dressing was already in place and incredibly authentic. Turnaround between set changes was faster than any studio we have worked with in the city.',
    rating: 5, featured: true, order: 4,
  },
  {
    _type: 'testimonial', _id: 'testimonial-dev-anand-rao',
    clientName: 'Dev Anand Rao', role: 'Music Video Director',
    production: 'Tera Yaar Hoon Main', network: null, productionHouse: null,
    quote: 'Four different set environments in a single weekend — market, chawl, court, and open ground. The team helped us move between spaces without losing a single hour. The final video looks like it was shot across four different locations.',
    rating: 5, featured: true, order: 5,
  },
  {
    _type: 'testimonial', _id: 'testimonial-neha-joshi',
    clientName: 'Neha Joshi', role: 'Brand Film Producer',
    production: 'Honda City Launch Film', network: null, productionHouse: 'Honda India',
    quote: 'The studio team understood our brief instantly. Clean white cyc, perfectly even bounce lighting, and a production-ready grip truck on standby. Our client was thrilled with the result. Cine Classic is our first call for every automotive TVC.',
    rating: 5, featured: true, order: 6,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────────────────────
async function main() {
  console.log('\n🎬  Cine Classic Studios — Sanity Seed Script');
  console.log(`    Project: ${projectId}  |  Dataset: ${dataset}\n`);

  try {
    console.log('📦  Seeding Studio Sets...');
    await upsertMany(STUDIOS, 'studio sets');

    console.log('🎞️   Seeding Productions...');
    await upsertMany(PRODUCTIONS, 'productions');

    console.log('⭐  Seeding Testimonials...');
    await upsertMany(TESTIMONIALS, 'testimonials');

    console.log('\n✅  All done! Open https://cine-classic-studios.sanity.studio/ to verify.');
    console.log('    The website will reflect these changes within 60 seconds (ISR).\n');
  } catch (err) {
    console.error('\n❌  Seeding failed:', err.message ?? err);
    process.exit(1);
  }
}

main();
