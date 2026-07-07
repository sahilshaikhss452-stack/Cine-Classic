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
  videoUrl?: string;
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
  Film: 'FL',
  'TV Series': 'TV',
  'Web Series': 'WS',
  Advertisement: 'AD',
  'Music Video': 'MV',
};

export function getYoutubeId(videoUrl: string): string | null {
  try {
    const url = new URL(videoUrl);
    const hostname = url.hostname.replace(/^www\./, '');

    if (hostname === 'youtu.be') {
      return url.pathname.split('/').filter(Boolean)[0] ?? null;
    }

    if (hostname.endsWith('youtube.com')) {
      const watchId = url.searchParams.get('v');
      if (watchId) {
        return watchId;
      }

      const segments = url.pathname.split('/').filter(Boolean);
      if (segments[0] === 'embed' || segments[0] === 'shorts' || segments[0] === 'live') {
        return segments[1] ?? null;
      }
    }
  } catch {
    return null;
  }

  return null;
}
