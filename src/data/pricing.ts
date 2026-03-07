export interface PricingPlan {
  id: string;
  icon: string;
  name: string;
  tagline: string;
  price: string;
  priceSuffix: string;
  features: string[];
  featured?: boolean;
  badge?: string;
  ctaLabel: string;
}

export interface AddOn {
  name: string;
  price: string;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'hourly',
    icon: '⏱️',
    name: 'Hourly',
    tagline: 'Perfect for short sessions',
    price: '$80–120',
    priceSuffix: '/hr',
    features: [
      'Access to your chosen set',
      'Standard LED lighting package',
      'Wi-Fi & amenities',
      '1 changing room',
      'Minimum 2-hour booking',
    ],
    ctaLabel: 'Get a Quote',
  },
  {
    id: 'halfday',
    icon: '🎬',
    name: 'Half Day',
    tagline: '4 hours – best value',
    price: '$380',
    priceSuffix: '/4hrs',
    features: [
      'Any single set of your choice',
      'Full lighting & grip package',
      'Wi-Fi & all amenities',
      '2 changing rooms',
      'On-site assistant',
      'Save up to 20% vs hourly',
    ],
    featured: true,
    badge: 'Most Popular',
    ctaLabel: 'Book Half Day',
  },
  {
    id: 'fullday',
    icon: '🌟',
    name: 'Full Day',
    tagline: '8 hours – maximum flexibility',
    price: '$680',
    priceSuffix: '/8hrs',
    features: [
      'Any single set or split two sets',
      'Premium lighting & grip package',
      'Wi-Fi & all amenities',
      'Full green room access',
      'Dedicated assistant all day',
      '1-hour free overtime buffer',
    ],
    ctaLabel: 'Book Full Day',
  },
  {
    id: 'multiday',
    icon: '🏢',
    name: 'Multi-Day',
    tagline: '2+ days – custom projects',
    price: 'Custom',
    priceSuffix: '',
    features: [
      'Full studio exclusive access',
      'All five sets available',
      'Full crew support on request',
      'Equipment sourcing assistance',
      'Catering coordination',
      'Significant volume discounts',
    ],
    ctaLabel: 'Contact Us',
  },
];

export const ADD_ONS: AddOn[] = [
  { name: 'Photography Assistant', price: '$40/hr' },
  { name: 'Teleprompter',          price: '$60/day' },
  { name: 'Backdrop Change',       price: '$50/switch' },
  { name: 'Makeup Room',           price: '$30/hr' },
  { name: 'Fog Machine',           price: '$80/day' },
  { name: 'Grip Package',          price: '$120/day' },
];
