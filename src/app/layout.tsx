import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Inter, Playfair_Display } from 'next/font/google';
import { SiteSettingsProvider } from '@/components/site/SiteSettingsProvider';
import { loadSiteSettings } from '@/lib/sanity';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await loadSiteSettings();
  const title = settings.defaultSeo?.title ?? `${settings.businessName} – Film & Photoshoot Studio Rental Mumbai`;
  const description =
    settings.defaultSeo?.description ?? settings.tagline ?? `${settings.businessName} is a production-ready studio complex in Mumbai.`;

  return {
    title: {
      default: title,
      template: `%s | ${settings.businessName}`,
    },
    description,
    authors: [{ name: settings.businessName }],
    creator: settings.businessName,
    publisher: settings.businessName,
    metadataBase: new URL('https://cine-classic-nextjs.vercel.app'),
    alternates: { canonical: '/' },
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'en_IN',
      siteName: settings.businessName,
      url: 'https://cine-classic-nextjs.vercel.app',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    icons: { icon: '/images/logo.jpg', apple: '/images/logo.jpg' },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
    },
  };
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const settings = await loadSiteSettings();
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://cine-classic-nextjs.vercel.app/#organization',
    name: settings.businessName,
    description: settings.defaultSeo?.description ?? settings.tagline ?? `${settings.businessName} studio complex`,
    url: 'https://cine-classic-nextjs.vercel.app',
    telephone: settings.phone,
    email: settings.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: [settings.addressLine1, settings.addressLine2].filter(Boolean).join(', '),
      addressLocality: settings.city,
      addressRegion: settings.region,
      postalCode: settings.postalCode,
      addressCountry: settings.country,
    },
    openingHoursSpecification: settings.hoursText
      ? {
          '@type': 'OpeningHoursSpecification',
          description: settings.hoursText,
        }
      : undefined,
    image: settings.logoUrl ?? 'https://cine-classic-nextjs.vercel.app/images/logo.jpg',
    sameAs: settings.socialLinks.map((link) => link.url),
  };

  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <SiteSettingsProvider settings={settings}>{children}</SiteSettingsProvider>
      </body>
    </html>
  );
}
