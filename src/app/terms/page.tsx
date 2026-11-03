import type { Metadata } from 'next';
import { SiteNav } from '@/components/marketing/SiteNav';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import { TERMS_VERSION } from '@/lib/services';

export const metadata: Metadata = {
  title: 'Terms & Refund Policy | Inside STLC Academy',
  description: 'Terms and conditions, refund and cancellation policy for courses and services purchased from Inside STLC Academy.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-navy-900 text-white">
      <SiteNav />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Terms &amp; Refund Policy</h1>
        <p className="text-gray-400 mb-10">Last updated: {TERMS_VERSION}</p>

        <div className="space-y-8 text-gray-300 leading-relaxed [&_h2]:text-white [&_h2]:font-bold [&_h2]:text-xl [&_h2]:mb-3 [&_h2]:mt-2 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_li]:text-gray-300 [&_strong]:text-white">
          <section>
            <h2>1. About these terms</h2>
            <p>These terms apply to purchases of courses and services from Inside STLC Academy (&ldquo;we&rdquo;, &ldquo;us&rdquo;). By purchasing, you agree to these terms. They are provided alongside our Privacy Policy.</p>
          </section>

          <section>
            <h2>2. Courses &amp; digital content</h2>
            <p>When you buy a course, you receive access to its online learning content for your personal use. Access is granted to your account once payment is confirmed. You may not share, resell, or redistribute course content.</p>
          </section>

          <section>
            <h2>3. Payment</h2>
            <p>Payments are processed securely by Stripe. Prices are shown in GBP and include any applicable taxes. We do not store your card details.</p>
          </section>

          <section>
            <h2>4. Refunds &amp; cancellation (courses)</h2>
            <p>Under the UK Consumer Contracts Regulations 2013 you normally have a <strong>14-day cooling-off period</strong> from the date of purchase to cancel and receive a refund.</p>
            <p>Because our courses are digital content made available immediately, by purchasing you agree that we may begin providing access straight away. <strong>Once you have completed 25% or more of a course within the 14-day period, the right to a refund for that course no longer applies</strong>, as the content has been substantially consumed. Before you reach 25% completion within the cooling-off period, you may request a refund.</p>
            <p>To request a refund, email <a href="mailto:info@insidestlc.com" className="text-gold-400 underline">info@insidestlc.com</a> with your order details. Approved refunds are returned to your original payment method.</p>
            <p>Nothing in these terms affects your legal rights where content is faulty or not as described.</p>
          </section>

          <section>
            <h2>5. CV Review Service</h2>
            <p>The CV Review Service includes a written initial review (an overall score, strengths, and prioritised improvements) and one follow-up review after you amend your CV. Turnaround is within 48 hours of upload (or 24 hours if you purchase the Express option). You may optionally purchase a &ldquo;we amend it for you&rdquo; add-on, for which we return an improved version of your CV.</p>
            <p>Because the CV Review Service is a bespoke service performed for you, by purchasing you request that we begin work promptly and you acknowledge that <strong>once we have started your review the service is non-refundable</strong>. If you have not yet uploaded your CV, you may request a refund within the 14-day cooling-off period.</p>
            <p>Our review is professional guidance to help improve your CV. It is not a guarantee of interviews, employment, or any specific outcome.</p>
          </section>

          <section>
            <h2>6. Your CV data &amp; AI assistance</h2>
            <p>We use your uploaded CV solely to produce your review. To review it thoroughly we use AI tools to assist our analysis; your CV is processed by our AI provider only to generate your review and is <strong>not used to train AI models</strong>. Every review is checked and approved by a human before it is delivered to you.</p>
            <p>We do not retain your CV after your review is complete: your uploaded file is <strong>deleted from our systems</strong> once your order is finished (and the original upload is removed as soon as your initial review is delivered). Your written review remains available in your account.</p>
          </section>

          <section>
            <h2>7. Acceptable use</h2>
            <p>You agree to provide accurate information and to use our courses and services lawfully and for your own personal benefit. We may suspend access in cases of misuse, fraud, or chargeback abuse.</p>
          </section>

          <section>
            <h2>8. Changes &amp; contact</h2>
            <p>We may update these terms from time to time; the version in force at the time of your purchase applies to that purchase. Questions? Contact <a href="mailto:info@insidestlc.com" className="text-gold-400 underline">info@insidestlc.com</a>.</p>
          </section>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
