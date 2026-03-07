export interface Testimonial {
  id: string;
  initial: string;
  name: string;
  role: string;
  text: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    initial: 'S',
    name: 'Sofia Ramirez',
    role: 'Fashion Photographer',
    text: 'The cyclorama wall is absolutely flawless. We shot a full fashion lookbook here and every frame came out perfectly clean. The lighting setup was already dialed in — we barely had to adjust anything. Will be back every season.',
  },
  {
    id: 't2',
    initial: 'M',
    name: 'Marcus Chen',
    role: 'VFX Director',
    text: 'We used the green screen room for a full week of VFX shoots. The team was incredibly accommodating. The space is immaculately maintained and the lighting was perfectly even — chroma keying was a breeze in post.',
  },
  {
    id: 't3',
    initial: 'J',
    name: 'Jordan Blake',
    role: 'Music Video Director',
    text: 'Shot a music video on the industrial set — the space has so much character. Raw brick, great ceiling height, and the moody practicals they have set up gave us exactly the gritty aesthetic we were going for. Highly recommend.',
  },
  {
    id: 't4',
    initial: 'A',
    name: 'Anika Patel',
    role: 'Commercial Producer',
    text: 'The outdoor grounds are massive. We brought two cars for an automotive campaign and had plenty of room for the whole crew plus equipment trucks. Easy access, clean facilities inside — a genuinely professional operation.',
  },
  {
    id: 't5',
    initial: 'T',
    name: 'Tyler Owens',
    role: 'Content Creator',
    text: 'Booked the living room set for a tech product launch video. The furniture was stylish, the space felt authentic on camera, and the whole booking process was smooth. This is now our go-to studio for all client videos.',
  },
  {
    id: 't6',
    initial: 'L',
    name: 'Leila Nguyen',
    role: 'Film Production Manager',
    text: 'Pricing is fair, staff is helpful, and the facility is spotless. We\'ve used multiple studios in the city and Cine Classic is hands-down the most professional setup at this price point. Couldn\'t recommend it more.',
  },
];
