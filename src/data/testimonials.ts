export interface Testimonial {
  id: string;
  initial: string;
  name: string;
  role: string;
  /** Production or campaign they shot at Cine Classic */
  production?: string;
  /** Network / platform (Netflix, Amazon, etc.) */
  network?: string;
  text: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    initial: 'R',
    name: 'Rahul Deshmukh',
    role: 'Director of Photography',
    production: 'Scam 1992',
    network: 'SonyLIV',
    text: 'The office and courtroom sets are exceptionally detailed — period-accurate props, controlled lighting rigs, and a crew that genuinely understands what a production needs. Every day we shot here was smooth from call time to wrap.',
  },
  {
    id: 't2',
    initial: 'P',
    name: 'Priya Sharma',
    role: 'Executive Producer',
    production: 'Panchayat S3',
    network: 'Amazon Prime Video',
    text: 'We needed authentic village interiors built to spec in under two weeks. The Cine Classic team delivered flawlessly. The chawl and village sets look completely real on camera — our director was blown away on day one.',
  },
  {
    id: 't3',
    initial: 'A',
    name: 'Aarav Mehta',
    role: 'Production Designer',
    production: 'Tata Motors Campaign',
    network: 'National Campaign',
    text: 'The Empty Floor is the best automotive shoot space in Mumbai. Reflective floor, 200A 3-phase power for our LED volumes, and enough square footage for two cars plus a full lighting package. We will not go anywhere else.',
  },
  {
    id: 't4',
    initial: 'S',
    name: 'Sunita Kapoor',
    role: 'Line Producer',
    production: 'Mirzapur',
    network: 'Amazon Prime Video',
    text: 'We shot interior police station and courtroom scenes here across four episodes. The set dressing was already in place and incredibly authentic. Turnaround between set changes was faster than any studio we have worked with in the city.',
  },
  {
    id: 't5',
    initial: 'D',
    name: 'Dev Anand Rao',
    role: 'Music Video Director',
    production: 'Tera Yaar Hoon Main',
    text: 'Four different set environments in a single weekend — market, chawl, court, and open ground. The team helped us move between spaces without losing a single hour. The final video looks like it was shot across four different locations.',
  },
  {
    id: 't6',
    initial: 'N',
    name: 'Neha Joshi',
    role: 'Brand Film Producer',
    production: 'Honda City Launch Film',
    text: 'The studio team understood our brief instantly. Clean white cyc, perfectly even bounce lighting, and a production-ready grip truck on standby. Our client was thrilled with the result. Cine Classic is our first call for every automotive TVC.',
  },
];
