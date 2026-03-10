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
  posterImage?: string;
  gradient: string;
  typeColor: string;
}

export const TYPE_COLORS: Record<ProductionType, string> = {
  Film: '#d4af37',
  'TV Series': '#4a9eff',
  'Web Series': '#c77dff',
  Advertisement: '#06d6a0',
  'Music Video': '#ff6b6b',
};

export const TYPE_ICONS: Record<ProductionType, string> = {
  Film: '??',
  'TV Series': '??',
  'Web Series': '??',
  Advertisement: '???',
  'Music Video': '??',
};
