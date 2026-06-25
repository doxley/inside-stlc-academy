import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { SiteNav } from '@/components/marketing/SiteNav';
import { SiteFooter } from '@/components/marketing/SiteFooter';

export const metadata: Metadata = {
  title: 'Payment Successful | Inside STLC Academy',
  robots: { index: false },
};

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-navy-900 text-white flex flex-col">
      <SiteNav />
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-20">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 bg-brand-500/15 border border-brand-400/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-brand-400" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Payment successful</h1>
          <p className="text-gray-300 text-lg mb-8">
            Your course access has been unlocked.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex bg-brand-500 hover:bg-brand-600 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors"
          >
            Go to Dashboard
          </Link>
          <p className="text-gray-500 text-sm mt-6">
            If you checked out as a new customer, check your email to set your password and log in.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
