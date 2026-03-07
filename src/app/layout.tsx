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
  title: 'Cine Classic Studios – Premium Film & Photo Studio Rental',
  description:
    'Cine Classic Studios offers premium rental studio spaces for film, photography, and commercial productions. Five unique sets. Fully equipped. Book your set today.',
  keywords: [
    'film studio rental',
    'photography studio',
    'green screen studio',
    'cyclorama wall',
    'production studio Los Angeles',
    'studio rental',
  ],
  openGraph: {
    title: 'Cine Classic Studios – Premium Film & Photo Studio Rental',
    description:
      'Five unique studio sets for film, photography, and commercial productions in Los Angeles.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cine Classic Studios',
    description: 'Premium film & photo studio rental. Five sets. Fully equipped.',
  },
  icons: { icon: '/images/logo.jpg' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
