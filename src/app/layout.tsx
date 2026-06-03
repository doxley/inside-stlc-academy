import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Inside STLC Academy',
  description: '90-Day Software Testing Career Roadmap – Professional Edition',
  icons: { icon: '/favicon.ico' },
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
