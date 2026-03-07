import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
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

export const metadata: Metadata = {
  title: {
    default: 'Cine Classic Studios – Film & Photoshoot Studio Rental Mumbai',
    template: '%s | Cine Classic Studios Mumbai',
  },
  description:
    "Cine Classic Studios — Mumbai's premier film studio complex near Film City, Goregaon East. 9 fully-dressed sets: market, chawl, court, hospital, police station & open ground. Rent by the hour for Bollywood films, OTT series, TVCs, music videos & photoshoots.",
  keywords: [
    'film studio rental mumbai',
    'photoshoot studio mumbai',
    'music video shoot location mumbai',
    'ad film studio mumbai',
    'film set rental mumbai',
    'OTT production studio mumbai',
    'bollywood film studio',
    'studio rental goregaon',
    'production studio near film city',
    'chawl set mumbai',
    'court set studio',
    'hospital set studio',
    'market set studio',
    'studio on rent mumbai',
    'cine classic studios',
  ],
  authors: [{ name: 'Cine Classic Studios' }],
  creator: 'Cine Classic Studios',
  publisher: 'Cine Classic Studios',
  metadataBase: new URL('https://cine-classic-nextjs.vercel.app'),
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Cine Classic Studios – Film Studio Rental Mumbai',
    description:
      "Mumbai's premier film studio complex. 9 production-ready sets — market, chawl, court, hospital, police station & open ground. Book by the hour.",
    type: 'website',
    locale: 'en_IN',
    siteName: 'Cine Classic Studios',
    url: 'https://cine-classic-nextjs.vercel.app',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Cine Classic Studios – Mumbai's Premier Film Studio",
    description:
      'Nine production-ready sets in Mumbai. Film, OTT, TVC, music video & fashion shoots. Book by the hour.',
  },
  icons: { icon: '/images/logo.jpg', apple: '/images/logo.jpg' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        {/* JSON-LD Structured Data — Local Business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              '@id': 'https://cine-classic-nextjs.vercel.app/#organization',
              name: 'Cine Classic Studios',
              description:
                "Premium film and photoshoot studio complex in Mumbai with 9 fully-dressed production sets.",
              url: 'https://cine-classic-nextjs.vercel.app',
              telephone: '+91-98765-43210',
              email: 'bookings@cineclassicstudios.com',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Film City Road',
                addressLocality: 'Goregaon East',
                addressRegion: 'Mumbai',
                postalCode: '400065',
                addressCountry: 'IN',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 19.1498,
                longitude: 72.8479,
              },
              openingHoursSpecification: {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: [
                  'Monday','Tuesday','Wednesday','Thursday',
                  'Friday','Saturday','Sunday',
                ],
                opens: '00:00',
                closes: '23:59',
              },
              paymentAccepted: 'Cash, Bank Transfer, UPI',
              image: 'https://cine-classic-nextjs.vercel.app/images/logo.jpg',
              sameAs: [
                'https://www.instagram.com/cineclassicstudios',
                'https://wa.me/919876543210',
              ],
              amenityFeature: [
                { '@type': 'LocationFeatureSpecification', name: '9 Fully-Dressed Sets', value: true },
                { '@type': 'LocationFeatureSpecification', name: 'Professional Lighting Rigs', value: true },
                { '@type': 'LocationFeatureSpecification', name: 'Makeup & Green Rooms', value: true },
                { '@type': 'LocationFeatureSpecification', name: 'Production Truck Access', value: true },
                { '@type': 'LocationFeatureSpecification', name: '60+ Vehicle Parking', value: true },
                { '@type': 'LocationFeatureSpecification', name: '200A 3-Phase Power', value: true },
              ],
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
