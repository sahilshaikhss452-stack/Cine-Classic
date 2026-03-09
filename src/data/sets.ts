export interface StudioSet {
  id: string;
  slug: string;
  label: string;           // short nav label
  name: string;            // full display name
  shortDescription: string;
  description: string;
  size: string;
  ceilingHeight: string;
  capacity: string;
  rateFrom: string;
  rateUnit: string;
  facilities: string[];
  suitableFor: string[];
  icon: string;
  gradient: string;        // CSS gradient shown when no real photo exists
  accentColor: string;
  // ── Real photo paths ──────────────────────────────────────────────────────
  // Drop photos in public/images/studios/<slug>/ then fill these in.
  // Any slot left undefined falls back to the gradient placeholder.
  heroImage?: string;       // e.g. '/images/studios/empty-floor/hero.jpg'
  galleryImages?: string[]; // up to 6: ['/images/studios/empty-floor/1.jpg', ...]
  // ── Set Deck (Production Reference Document) ──────────────────────────────
  // Upload a pre-made PDF via Sanity CMS. When set, the Download Set Deck
  // button links directly to this URL. When unset, a PDF is auto-generated
  // from the set data at download time.
  setPdfUrl?: string;       // Sanity CDN URL for pre-made set deck PDF
  // ── Set Layout section ────────────────────────────────────────────────────
  // Upload a floor plan or annotated layout image + a short description.
  // Both are optional: the section renders a styled placeholder when omitted.
  setLayoutImage?: string;       // e.g. '/images/studios/empty-floor/layout.jpg'
  setLayoutDescription?: string; // 1-3 sentences describing zones / shooting angles
}

/**
 * Returns the conventional path for a studio's hero image.
 * Upload to: public/images/studios/<slug>/hero.jpg
 */
export function studioHeroPath(slug: string) {
  return `/images/studios/${slug}/hero.jpg`;
}

/**
 * Returns up to 6 conventional gallery image paths for a studio.
 * Upload to: public/images/studios/<slug>/1.jpg … 6.jpg
 */
export function studioGalleryPaths(slug: string, count = 6): string[] {
  return Array.from({ length: count }, (_, i) => `/images/studios/${slug}/${i + 1}.jpg`);
}

export const STUDIO_SETS: StudioSet[] = [
  {
    id: 'empty-floor',
    slug: 'empty-floor',
    label: 'Empty Floor',
    name: 'Empty Floor',
    shortDescription:
      'A vast, column-free blank canvas ready for any custom set build or large-scale production.',
    description:
      'The Empty Floor is our most versatile space — a massive, column-free expanse that gives production designers complete creative freedom. With polished concrete underfoot, soaring 20-ft ceilings, and a full LED lighting grid overhead, this space transforms into anything your script demands: a city street, a grand hall, a war room, or a minimalist modern interior. Preferred by top production houses for feature films and OTT series.',
    size: '6,000 sq ft',
    ceilingHeight: '20 ft',
    capacity: 'Up to 60 people',
    rateFrom: '₹8,000',
    rateUnit: '/hour',
    facilities: [
      'Full overhead LED lighting grid',
      'Polished concrete floor',
      'Climate-controlled environment',
      '200A, 3-phase power supply',
      'High-speed Wi-Fi',
      'Parking for 40+ vehicles',
      'Changing rooms × 4',
      'On-site art direction support',
    ],
    suitableFor: ['Feature Films', 'OTT Series', 'TV Commercials', 'Music Videos', 'Product Launches', 'Fashion Shows'],
    icon: '🏗️',
    gradient: 'radial-gradient(ellipse at 50% 30%, rgba(200,200,210,0.18) 0%, #111 70%)',
    accentColor: '#a0a0b4',
  },
  {
    id: 'market-1',
    slug: 'market-1',
    label: 'Market 1',
    name: 'Market 1',
    shortDescription:
      'A traditional Indian street market with authentic stalls, weathered textures, and rich period detail.',
    description:
      'Market 1 is a meticulously crafted traditional Indian bazaar, built to replicate the sights and textures of a 1970s–80s street market. Featuring individual vendor stalls, aged wooden counters, rusted iron signage, period-accurate props, and a cobblestone-look floor, this set immerses your audience completely. Every corner is dressed with authentic produce, cookware, and trinkets sourced from vintage markets.',
    size: '3,200 sq ft',
    ceilingHeight: '16 ft',
    capacity: 'Up to 35 people',
    rateFrom: '₹6,000',
    rateUnit: '/hour',
    facilities: [
      'Fully dressed stalls with period props',
      'Adjustable practicals & moody LED lighting',
      'Cobblestone-texture flooring',
      'Interchangeable vendor stall fronts',
      'On-site props department',
      'Climate control',
      'Generator hookup',
    ],
    suitableFor: ['Bollywood & Regional Films', 'Period Drama Series', 'TV Commercials', 'Music Videos', 'Documentary'],
    icon: '🏪',
    gradient: 'radial-gradient(ellipse at 40% 50%, rgba(210,130,40,0.25) 0%, #1a0f05 70%)',
    accentColor: '#d2821f',
  },
  {
    id: 'market-2',
    slug: 'market-2',
    label: 'Market 2',
    name: 'Market 2',
    shortDescription:
      'A contemporary urban market with modern stalls, neon signage, and a busy metro-market feel.',
    description:
      'Market 2 takes the market aesthetic into the modern era — think busy urban sabzi mandi meets metro shopping lane. Bright neon signage, contemporary shop fronts, and a clean tiled floor make it ideal for modern-day stories set in city markets. The modular stall units let the art department scale the scene up or down as required.',
    size: '2,800 sq ft',
    ceilingHeight: '15 ft',
    capacity: 'Up to 30 people',
    rateFrom: '₹5,500',
    rateUnit: '/hour',
    facilities: [
      'Modular stall units (reconfigurable)',
      'Neon & LED signage package',
      'Modern tiled flooring',
      'Overhead LED lighting grid',
      'Props & dressing included',
      'High-speed Wi-Fi',
      'Changing rooms × 2',
    ],
    suitableFor: ['Contemporary Films', 'Web Series', 'TV Commercials', 'Reality Shows', 'Music Videos'],
    icon: '🛒',
    gradient: 'radial-gradient(ellipse at 60% 40%, rgba(220,180,50,0.2) 0%, #120f00 70%)',
    accentColor: '#dcb432',
  },
  {
    id: 'market-7',
    slug: 'market-7',
    label: 'Market 7',
    name: 'Market 7',
    shortDescription:
      'A large multi-lane market set spanning multiple shop rows — ideal for crowd-scene productions.',
    description:
      'The largest of our market sets, Market 7 features multiple lanes of stalls running in parallel, creating genuine depth and scale. Designed for crowd scenes, chase sequences, and wide establishing shots, the set includes perspective-painted backdrops that extend the illusion of depth. Built with modular steel-frame shop facades, it can be rapidly redressed between scenes.',
    size: '4,500 sq ft',
    ceilingHeight: '18 ft',
    capacity: 'Up to 50 people',
    rateFrom: '₹7,000',
    rateUnit: '/hour',
    facilities: [
      'Multi-lane market layout',
      'Perspective-painted depth backdrops',
      'Modular steel-frame shop facades',
      'Full LED + practicals lighting',
      'Large crew green room',
      'Props & dressing included',
      '3-phase power, 200A',
    ],
    suitableFor: ['Feature Films (Crowd Scenes)', 'Action Sequences', 'Period Drama & OTT', 'Large-Scale Commercials', 'Music Videos'],
    icon: '🏬',
    gradient: 'radial-gradient(ellipse at 35% 55%, rgba(200,80,30,0.22) 0%, #1a0800 70%)',
    accentColor: '#c8501e',
  },
  {
    id: 'chawl-new',
    slug: 'chawl-new',
    label: 'Chawl New',
    name: 'Chawl New',
    shortDescription:
      'An authentic Mumbai chawl with narrow corridors, shared galleries, and vintage residential facades.',
    description:
      "Chawl New is a faithful recreation of a classic Mumbai chawl — the multi-storey shared residential buildings that define the city's soul. The set features a two-storey structure with a central courtyard, wood-railed open corridors, individual room facades with period-accurate doors and windows, and a communal hand-pump. Every inch is dressed: hanging clothes lines, religious idols, worn-out letterboxes, and colourful flower pots.",
    size: '3,500 sq ft',
    ceilingHeight: '18 ft (double storey)',
    capacity: 'Up to 40 people',
    rateFrom: '₹7,500',
    rateUnit: '/hour',
    facilities: [
      'Two-storey structural build',
      'Central courtyard with hand-pump prop',
      'Wood-railed open corridors',
      'Period-accurate door & window facades',
      'Dressed props included (laundry, pots, etc.)',
      'Moody practicals + LED lighting',
      'Changing rooms × 3',
    ],
    suitableFor: ['Bollywood Films', 'Mumbai-based OTT Series', 'Period Drama', 'Social Advertising', 'Music Videos'],
    icon: '🏚️',
    gradient: 'radial-gradient(ellipse at 45% 40%, rgba(160,100,50,0.25) 0%, #150d05 70%)',
    accentColor: '#a06432',
  },
  {
    id: 'court-set',
    slug: 'court-set',
    label: 'Court Set',
    name: 'Court Set',
    shortDescription:
      "A full-scale Indian courtroom with judge's bench, witness box, dock, and public gallery.",
    description:
      "Our Court Set is a production-ready replica of an Indian district courtroom built to authentic architectural detail. The set includes a raised judge's bench with the national emblem, a full witness box, defendant dock, prosecution and defence counsel tables, a public gallery with wooden benches, and characteristic arched windows. Used by leading legal dramas and crime thrillers, it eliminates costly real-location permissions.",
    size: '2,500 sq ft',
    ceilingHeight: '16 ft',
    capacity: 'Up to 40 people',
    rateFrom: '₹6,500',
    rateUnit: '/hour',
    facilities: [
      "Full judge's bench with national emblem",
      'Witness box & defendant dock',
      'Prosecution & defence tables',
      'Public gallery (30-seat capacity)',
      'Arched window facades with diffused light',
      'Overhead + practical lighting rig',
      'Props & dressing included',
    ],
    suitableFor: ['Legal Drama Films & Series', 'Crime Thrillers', 'TV Serials', 'Docudramas', 'Courtroom Commercials'],
    icon: '⚖️',
    gradient: 'radial-gradient(ellipse at 50% 35%, rgba(60,80,160,0.2) 0%, #05050f 70%)',
    accentColor: '#3c50a0',
  },
  {
    id: 'hospital-set',
    slug: 'hospital-set',
    label: 'Hospital Set',
    name: 'Hospital Set',
    shortDescription:
      "A clinical-grade hospital set with wards, an ICU bay, procedure room, and nurse's station.",
    description:
      "The Hospital Set is one of our most detailed and frequently booked spaces. It includes a general ward with four hospital beds, an ICU bay with medical monitors and prop equipment, a nurse's station with reception desk, a procedure room, and connecting corridor sections. All medical equipment is prop-grade and visually authentic. The neutral palette photographs convincingly under both warm and cool lighting.",
    size: '2,800 sq ft',
    ceilingHeight: '12 ft',
    capacity: 'Up to 30 people',
    rateFrom: '₹6,000',
    rateUnit: '/hour',
    facilities: [
      'General ward (4-bed configuration)',
      'ICU bay with prop monitors & equipment',
      "Nurse's station & reception desk",
      'Procedure room',
      'Corridor sections (connectable)',
      'Cool-white overhead LED lighting',
      'Full medical props & dressing',
    ],
    suitableFor: ['Medical Drama Films & Series', 'Pharma Commercials', 'Public Health PSAs', 'OTT Medical Dramas', 'Social Advertising'],
    icon: '🏥',
    gradient: 'radial-gradient(ellipse at 50% 30%, rgba(100,180,220,0.18) 0%, #050810 70%)',
    accentColor: '#64b4dc',
  },
  {
    id: 'police-station-set',
    slug: 'police-station-set',
    label: 'Police Station',
    name: 'Police Station Set',
    shortDescription:
      'A complete Indian police station — front desk, interrogation room, lock-up cells, and inspector\'s office.',
    description:
      "Our Police Station Set is a production-proven replica of a busy Indian thana. The build includes a front reception desk with period signage, a cramped inspector's office with maps and case files, an authentic interrogation room with a single overhead practical, and a two-cell lock-up with steel bars. The gritty, lived-in dressing and practical lighting design create the tension that crime productions demand.",
    size: '2,200 sq ft',
    ceilingHeight: '12 ft',
    capacity: 'Up to 25 people',
    rateFrom: '₹5,500',
    rateUnit: '/hour',
    facilities: [
      'Front reception desk & noticeboard',
      "Inspector's office with full prop dressing",
      'Interrogation room (single overhead practical)',
      'Two-cell lock-up with steel bars',
      'Connecting corridor section',
      'Gritty practical + moody LED lighting',
      'Police props & dressing included',
    ],
    suitableFor: ['Crime Thrillers', 'Bollywood Action Films', 'Police Drama Series', 'OTT Crime Content', 'TV Serials'],
    icon: '🚔',
    gradient: 'radial-gradient(ellipse at 40% 60%, rgba(40,60,100,0.25) 0%, #03050d 70%)',
    accentColor: '#283c64',
  },
  {
    id: 'open-ground',
    slug: 'open-ground',
    label: 'Open Ground',
    name: 'Open Ground',
    shortDescription:
      'A sprawling 2+ acre outdoor ground with paved and grass zones for large-scale productions.',
    description:
      'Our Open Ground is the go-to outdoor location for productions that need scale: car chases, action sequences, large crowd gatherings, outdoor concerts, or automotive campaigns. The 2+ acre space includes a paved central zone for vehicles and heavy equipment, surrounded by natural grass areas. Overnight shoots are available by arrangement, with generator hookups and portable facilities on-site.',
    size: '2+ acres',
    ceilingHeight: 'Open Sky',
    capacity: 'Unlimited',
    rateFrom: '₹4,500',
    rateUnit: '/hour',
    facilities: [
      'Paved central zone (vehicle-ready)',
      'Natural grass surrounding areas',
      '50+ vehicle parking',
      'Generator hookup points',
      'Portable changing facilities',
      '24/7 access by arrangement',
      'On-site security',
    ],
    suitableFor: ['Action & Stunt Sequences', 'Automotive Campaigns', 'Outdoor Concert Shoots', 'Large Crowd Scenes', 'Sports Commercials', 'Reality Shows'],
    icon: '🌿',
    gradient: 'radial-gradient(ellipse at 50% 20%, rgba(60,140,80,0.2) 0%, #030a05 70%)',
    accentColor: '#3c8c50',
  },
];

export function getSetBySlug(slug: string): StudioSet | undefined {
  return STUDIO_SETS.find((s) => s.slug === slug);
}
