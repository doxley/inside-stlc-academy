import type { Metadata } from 'next';
import Link from 'next/link';
import { XCircle } from 'lucide-react';
import { SiteNav } from '@/components/marketing/SiteNav';
import { SiteFooter } from '@/components/marketing/SiteFooter';

export const metadata: Metadata = {
  title: 'Payment Cancelled | Inside STLC Academy',
  robots: { index: false },
};

export default function PaymentCancelledPage() {
  return (
    <div className="min-h-screen bg-navy-900 text-white flex flex-col">
      <SiteNav />
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-20">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 bg-white/5 border border-white/15 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-8 h-8 text-gray-400" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Payment cancelled</h1>
          <p className="text-gray-300 text-lg mb-8">
            Your payment was cancelled. No payment has been taken.
          </p>
          <Link
            href="/#courses"
            className="inline-flex bg-brand-500 hover:bg-brand-600 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors"
          >
            Return to Courses
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
