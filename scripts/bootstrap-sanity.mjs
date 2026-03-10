import { createClient } from '@sanity/client';

const SANITY_PROJECT_ID_PATTERN = /^[a-z0-9-]+$/;
const SANITY_DATASET_PATTERN = /^~?[a-z0-9_-]{1,64}$/;
const API_VERSION = '2024-01-01';

function requireEnv(name) {
  const value = (process.env[name] ?? '').trim();
  if (!value) {
    throw new Error(`[Sanity bootstrap] Missing required env var "${name}".`);
  }

  return value;
}

function getProjectId() {
  const value = requireEnv('SANITY_PROJECT_ID');
  if (!SANITY_PROJECT_ID_PATTERN.test(value)) {
    throw new Error(`[Sanity bootstrap] Invalid SANITY_PROJECT_ID "${value}".`);
  }

  return value;
}

function getDataset() {
  const value = requireEnv('SANITY_DATASET');
  if (!SANITY_DATASET_PATTERN.test(value)) {
    throw new Error(`[Sanity bootstrap] Invalid SANITY_DATASET "${value}".`);
  }

  return value;
}

function slug(value) {
  return { _type: 'slug', current: value };
}

const SITE_SETTINGS = {
  _id: 'siteSettings',
  _type: 'siteSettings',
  businessName: 'Cine Classic Studios',
  tagline: 'Production-ready studio sets near Film City, Mumbai.',
  phone: '+91 98765 43210',
  whatsappNumber: '919876543210',
  email: 'bookings@cineclassicstudios.com',
  hoursText: 'Response within a few hours',
  addressLine1: 'Film City Road',
  addressLine2: 'Goregaon East',
  city: 'Mumbai',
  region: 'Maharashtra',
  postalCode: '400065',
  country: 'IN',
  mapsUrl: 'https://maps.google.com/?q=Cine+Classic+Studios+Goregaon+East+Mumbai',
  socialLinks: [
    { _key: 'instagram', _type: 'socialLink', platform: 'Instagram', label: 'Instagram', url: 'https://instagram.com/' },
    { _key: 'youtube', _type: 'socialLink', platform: 'YouTube', label: 'YouTube', url: 'https://youtube.com/' },
  ],
  featuredClients: ['Netflix', 'Amazon Prime Video', 'Sony LIV', 'Disney+ Hotstar'],
  defaultSeo: {
    _type: 'seo',
    title: 'Cine Classic Studios | Film & Photoshoot Studio Rental Mumbai',
    description:
      'Production-ready studio sets in Mumbai for film, OTT, TV, ads, and photoshoots. Explore studio spaces, facilities, and booking options from one reliable studio partner.',
  },
};

const HOME_PAGE = {
  _id: 'homePage',
  _type: 'homePage',
  heroBadge: 'Mumbai\'s Production-Ready Studio Complex',
  heroHeadline: 'Built for Film, OTT, TV, and Brand Shoots',
  heroHighlight: 'Nine sets. One reliable studio partner.',
  heroSubheadline:
    'Cine Classic Studios helps production teams move faster with practical studio sets, smoother logistics, and a team that understands working shoots.',
  heroPrimaryCta: { _type: 'ctaLink', label: 'Book a Studio', href: '#booking' },
  heroSecondaryCta: { _type: 'ctaLink', label: 'Explore Studios', href: '#sets' },
  heroStats: [
    { _key: 'sets', _type: 'heroStat', label: 'Active Sets', value: '9+' },
    { _key: 'power', _type: 'heroStat', label: 'Production Support', value: '200A' },
    { _key: 'location', _type: 'heroStat', label: 'Near Film City', value: 'Mumbai' },
    { _key: 'response', _type: 'heroStat', label: 'Fast Response', value: 'Hours' },
  ],
  aboutEyebrow: 'About Cine Classic Studios',
  aboutTitle: 'A practical studio system for real production teams.',
  aboutDescription:
    'This business is not just renting space. It is helping production teams reduce delays, avoid location chaos, and move from inquiry to shoot day with confidence.',
  aboutSecondaryDescription:
    'That is why the website keeps the editorial experience simple while the CMS manages the parts the studio team actually updates: contact details, studio inventory, supporting content, facilities, FAQs, testimonials, and operational proof points.',
  aboutFeatures: [
    'Production-ready indoor and outdoor set options',
    'Centralized booking and contact information',
    'Business-friendly content structure for non-technical staff',
    'Fast content refresh with predictable caching',
  ],
  aboutBadge: 'Trusted by working productions',
  seo: {
    _type: 'seo',
    title: 'Studio Rental in Mumbai | Cine Classic Studios',
    description:
      'Explore studio rentals, production-ready sets, and shoot support at Cine Classic Studios in Mumbai.',
  },
};

const FACILITIES = [
  {
    _id: 'facility-power-lighting',
    _type: 'facility',
    name: 'Power & Lighting Infrastructure',
    icon: '?',
    shortDescription: 'Built to support production lighting plans without improvising basic electrical needs on shoot day.',
    features: ['Three-phase power support', 'Lighting-friendly floors and set layouts', 'Generator-compatible infrastructure'],
    note: 'Confirm technical requirements with the studio team during booking.',
    accentColor: '#d4af37',
    gradient: 'linear-gradient(135deg, rgba(212,175,55,0.12), rgba(20,20,20,1))',
    isActive: true,
    order: 1,
  },
  {
    _id: 'facility-crew-logistics',
    _type: 'facility',
    name: 'Crew & Vehicle Logistics',
    icon: '??',
    shortDescription: 'Operational support for crew movement, equipment handling, and smoother floor management.',
    features: ['Vehicle and equipment access support', 'Production-friendly crew movement', 'On-site coordination for faster setup'],
    accentColor: '#8ab4f8',
    gradient: 'linear-gradient(135deg, rgba(138,180,248,0.12), rgba(20,20,20,1))',
    isActive: true,
    order: 2,
  },
  {
    _id: 'facility-talent-comfort',
    _type: 'facility',
    name: 'Talent & Crew Comfort',
    icon: '??',
    shortDescription: 'The studio experience is easier to manage when talent prep and crew comfort are already planned for.',
    features: ['Changing room support', 'Basic waiting and prep areas', 'Crew-friendly operational environment'],
    accentColor: '#c084fc',
    gradient: 'linear-gradient(135deg, rgba(192,132,252,0.12), rgba(20,20,20,1))',
    isActive: true,
    order: 3,
  },
  {
    _id: 'facility-production-support',
    _type: 'facility',
    name: 'Production Support',
    icon: '??',
    shortDescription: 'A responsive studio partner matters as much as the set itself.',
    features: ['Booking coordination', 'Shoot-day support', 'Faster communication around availability and requirements'],
    accentColor: '#34d399',
    gradient: 'linear-gradient(135deg, rgba(52,211,153,0.12), rgba(20,20,20,1))',
    isActive: true,
    order: 4,
  },
];

const FAQS = [
  {
    _id: 'faq-film-location',
    _type: 'faq',
    question: 'Where is Cine Classic Studios located?',
    answer: 'The studio is located near Film City Road in Goregaon East, Mumbai, making it easier for crews, equipment, and talent to reach the complex.',
    placements: ['filmStudioRental'],
    isActive: true,
    order: 1,
  },
  {
    _id: 'faq-film-booking-duration',
    _type: 'faq',
    question: 'What is the minimum booking duration?',
    answer: 'Minimum booking duration depends on the set and production requirement. Use the inquiry form or WhatsApp for the fastest confirmation.',
    placements: ['filmStudioRental'],
    isActive: true,
    order: 2,
  },
  {
    _id: 'faq-film-equipment',
    _type: 'faq',
    question: 'Can we bring our own lighting and production equipment?',
    answer: 'Yes. Most productions bring their own camera, grip, and lighting packages. The team can confirm practical site requirements during booking.',
    placements: ['filmStudioRental'],
    isActive: true,
    order: 3,
  },
  {
    _id: 'faq-film-set-dressing',
    _type: 'faq',
    question: 'Do you support set dressing or production adjustments?',
    answer: 'The studio can discuss production needs, set suitability, and practical setup considerations before booking so the right floor is selected.',
    placements: ['filmStudioRental'],
    isActive: true,
    order: 4,
  },
  {
    _id: 'faq-film-availability',
    _type: 'faq',
    question: 'How quickly can availability be confirmed?',
    answer: 'Availability is usually confirmed within a few hours once the team has your preferred date, set requirement, and basic shoot details.',
    placements: ['filmStudioRental', 'homePage'],
    isActive: true,
    order: 5,
  },
];

const client = createClient({
  projectId: getProjectId(),
  dataset: getDataset(),
  apiVersion: API_VERSION,
  useCdn: false,
  token: requireEnv('SANITY_WRITE_TOKEN'),
});

async function createIfMissing(document) {
  await client.createIfNotExists(document);
}

async function createManyIfMissing(documents, type) {
  const existingIds = new Set(await client.fetch(`*[_type == $type]._id`, { type }));
  const tx = client.transaction();
  let created = 0;

  for (const document of documents) {
    if (!existingIds.has(document._id)) {
      tx.create(document);
      created += 1;
    }
  }

  if (created > 0) {
    await tx.commit();
  }

  return created;
}

async function main() {
  console.log('Bootstrapping foundational Sanity documents...');
  console.log(`Project: ${getProjectId()} | Dataset: ${getDataset()}`);

  await createIfMissing(SITE_SETTINGS);
  console.log('Ensured siteSettings singleton exists.');

  await createIfMissing(HOME_PAGE);
  console.log('Ensured homePage singleton exists.');

  const facilitiesCreated = await createManyIfMissing(FACILITIES, 'facility');
  console.log(`Facilities created: ${facilitiesCreated}`);

  const faqsCreated = await createManyIfMissing(FAQS, 'faq');
  console.log(`FAQs created: ${faqsCreated}`);

  console.log('Sanity bootstrap complete. Review and refine content in Studio before publishing to production.');
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
