import type { Metadata } from 'next';
import './globals.css';

const SITE = 'https://www.insidestlcacademy.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: 'Inside STLC Academy | Software Testing & QA Courses',
    template: '%s | Inside STLC Academy',
  },
  description:
    'Practical, hands-on software testing and QA training — career roadmaps, test automation with Playwright, API testing, AI for QA, ISTQB foundation and interview prep. Learn by doing, from 26+ years of real-world QA experience.',
  applicationName: 'Inside STLC Academy',
  icons: { icon: '/favicon.ico' },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: SITE,
    siteName: 'Inside STLC Academy',
    title: 'Inside STLC Academy | Software Testing & QA Courses',
    description:
      'Practical, hands-on QA and software testing courses — roadmaps, automation, API testing, AI for QA, ISTQB and interview prep.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'LQPRrrqyokFJH7Iaq2wsDeih9-K9P7yK0xx6HXANWGo',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
