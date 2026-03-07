export type ProductionType =
  | 'Film'
  | 'TV Series'
  | 'Web Series'
  | 'Advertisement'
  | 'Music Video';

export interface Production {
  id: string;
  title: string;
  type: ProductionType;
  year: number;
  network?: string;
  description?: string;
  posterImage?: string;   // set once real poster uploaded, e.g. '/images/productions/sacred-games.jpg'
  gradient: string;       // cinematic gradient shown while no posterImage
  typeColor: string;
}

export const TYPE_COLORS: Record<ProductionType, string> = {
  'Film':          '#d4af37',
  'TV Series':     '#4a9eff',
  'Web Series':    '#c77dff',
  'Advertisement': '#06d6a0',
  'Music Video':   '#ff6b6b',
};

export const TYPE_ICONS: Record<ProductionType, string> = {
  'Film':          '🎬',
  'TV Series':     '📺',
  'Web Series':    '🎭',
  'Advertisement': '📽️',
  'Music Video':   '🎵',
};

export const PRODUCTIONS: Production[] = [
  {
    id: 'sacred-games',
    title: 'Sacred Games',
    type: 'Web Series',
    year: 2018,
    network: 'Netflix',
    description: 'A crime thriller following a Mumbai police officer drawn into the deadly world of a criminal mastermind. Multiple interior sets built and shot at Cine Classic Studios.',
    gradient: 'linear-gradient(160deg, #1a0505 0%, #3d0a0a 40%, #0a0008 100%)',
    typeColor: TYPE_COLORS['Web Series'],
  },
  {
    id: 'scam-1992',
    title: 'Scam 1992',
    type: 'TV Series',
    year: 2020,
    network: 'SonyLIV',
    description: 'The gripping true story of Harshad Mehta — the stockbroker who took the Bombay Stock Exchange by storm. Office and courtroom scenes filmed here.',
    gradient: 'linear-gradient(160deg, #1a1000 0%, #4a2e00 40%, #120800 100%)',
    typeColor: TYPE_COLORS['TV Series'],
  },
  {
    id: 'gully-boy',
    title: 'Gully Boy',
    type: 'Film',
    year: 2019,
    description: 'A coming-of-age story about underground rap culture set in the streets of Dharavi, Mumbai. Chawl and street-market sets used extensively.',
    gradient: 'linear-gradient(160deg, #040a14 0%, #0a1a35 40%, #001020 100%)',
    typeColor: TYPE_COLORS['Film'],
  },
  {
    id: 'mirzapur',
    title: 'Mirzapur',
    type: 'Web Series',
    year: 2021,
    network: 'Amazon Prime Video',
    description: 'A gritty crime drama set in the lawless heartlands of Uttar Pradesh. Interior police station and courtroom sets shot at our studio.',
    gradient: 'linear-gradient(160deg, #100003 0%, #2a0008 40%, #080010 100%)',
    typeColor: TYPE_COLORS['Web Series'],
  },
  {
    id: 'tata-motors',
    title: 'Tata Motors Campaign',
    type: 'Advertisement',
    year: 2022,
    description: 'A flagship brand campaign for Tata Motors showcasing the future of Indian automotive design. Shot on our Empty Floor set.',
    gradient: 'linear-gradient(160deg, #030810 0%, #061428 40%, #0a1a20 100%)',
    typeColor: TYPE_COLORS['Advertisement'],
  },
  {
    id: 'ipl-promo',
    title: 'IPL Promo Shoot',
    type: 'Advertisement',
    year: 2023,
    network: 'Star Sports',
    description: 'High-energy promotional spots for the Indian Premier League. Fast-paced production across three sets over a single weekend.',
    gradient: 'linear-gradient(160deg, #100800 0%, #2a1400 40%, #001020 100%)',
    typeColor: TYPE_COLORS['Advertisement'],
  },
  {
    id: 'panchayat',
    title: 'Panchayat',
    type: 'Web Series',
    year: 2020,
    network: 'Amazon Prime Video',
    description: 'An award-winning comedy drama about a city-educated engineer posted as a Panchayat secretary in a remote village. Village exterior and interior sets built here.',
    gradient: 'linear-gradient(160deg, #051000 0%, #0f2800 40%, #020800 100%)',
    typeColor: TYPE_COLORS['Web Series'],
  },
  {
    id: 'gehraiyaan',
    title: 'Gehraiyaan',
    type: 'Film',
    year: 2022,
    network: 'Amazon Prime Video',
    description: 'A contemporary drama navigating complex modern relationships and the choices that quietly define us. Apartment and yacht interiors shot on-set.',
    gradient: 'linear-gradient(160deg, #050510 0%, #100018 40%, #020010 100%)',
    typeColor: TYPE_COLORS['Film'],
  },
  {
    id: 'koffee-with-karan',
    title: 'Koffee With Karan S7',
    type: 'TV Series',
    year: 2022,
    network: 'Disney+ Hotstar',
    description: "India's most iconic celebrity chat show. The signature sofa set and backdrop were designed and built at Cine Classic Studios.",
    gradient: 'linear-gradient(160deg, #100800 0%, #201000 40%, #080500 100%)',
    typeColor: TYPE_COLORS['TV Series'],
  },
  {
    id: 'honda-city',
    title: 'Honda City Launch Film',
    type: 'Advertisement',
    year: 2023,
    description: 'A cinematic vehicle launch film produced for the Indian market. Controlled interior lighting and reflective floor built on Empty Floor.',
    gradient: 'linear-gradient(160deg, #050a10 0%, #0a1520 40%, #030810 100%)',
    typeColor: TYPE_COLORS['Advertisement'],
  },
  {
    id: 'tera-yaar',
    title: 'Tera Yaar Hoon Main',
    type: 'Music Video',
    year: 2023,
    description: 'A music video weaving through four different set environments — market, chawl, court, and open ground — to tell a friendship story across decades.',
    gradient: 'linear-gradient(160deg, #100005 0%, #200010 40%, #050000 100%)',
    typeColor: TYPE_COLORS['Music Video'],
  },
  {
    id: 'pehle-pyaar',
    title: 'Pehle Pyaar Ka Pehla Gham',
    type: 'Music Video',
    year: 2022,
    description: 'A romantic music video set against the nostalgic backdrops of our chawl and vintage market sets, bringing a 90s Bollywood feel to life.',
    gradient: 'linear-gradient(160deg, #0a0500 0%, #1a0800 40%, #050200 100%)',
    typeColor: TYPE_COLORS['Music Video'],
  },
];

/** The production used in the FeaturedProduction section */
export const FEATURED_PRODUCTION_ID = 'sacred-games';
