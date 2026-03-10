'use client';

import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import type { SiteSettings } from '@/lib/sanity';

const SiteSettingsContext = createContext<SiteSettings | null>(null);

interface Props {
  settings: SiteSettings;
  children: ReactNode;
}

export function SiteSettingsProvider({ settings, children }: Props) {
  return (
    <SiteSettingsContext.Provider value={settings}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  const settings = useContext(SiteSettingsContext);

  if (!settings) {
    throw new Error('SiteSettingsProvider is missing.');
  }

  return settings;
}
