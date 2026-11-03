import type { Metadata } from 'next';
import { SiteNav } from '@/components/marketing/SiteNav';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import { CvReviewBuy } from '@/components/cv/CvReviewBuy';
import { ShieldCheck, Clock, Sparkles, FileCheck2, RefreshCw, Trash2, Target, PenLine } from 'lucide-react';
import { CV_REVIEW } from '@/lib/services';

export const metadata: Metadata = {
  title: 'Professional CV Review for QA & Software Testers | Inside STLC Academy',
  description:
    'A professional CV review for software testers and QA professionals. Get a clear score, what is working, and prioritised improvements — reviewed by an experienced QA hiring manager. From £49.',
};

const steps = [
  { icon: FileCheck2, title: 'Buy & upload', body: 'Pay securely, then upload your CV (PDF or Word) straight away.' },
  { icon: Sparkles, title: 'We review it', body: `A detailed review — score, strengths and prioritised improvements — within ${CV_REVIEW.turnaroundHours} hours.` },
  { icon: RefreshCw, title: 'Amend & follow-up', body: 'Update your CV and resubmit for one included follow-up check — or let us amend it for you.' },
];

const included = [
  'A clear overall score out of 100',
  "What's genuinely working on your CV",
  'Prioritised, specific improvements — ordered by impact',
  'Guidance tailored to UK QA & software-testing roles',
  'One follow-up review after you amend',
];

const faqs = [
  { q: 'Who reviews my CV?', a: 'Your review is prepared with AI assistance and personally checked and approved by an experienced QA hiring manager before it reaches you — so you get both depth and a human judgement call.' },
  { q: 'What happens to my CV data?', a: 'Your CV is used only to produce your review. It is processed with AI assistance (it is not used to train AI models) and the file is deleted from our systems once your review is complete.' },
  { q: 'What formats can I upload?', a: 'PDF or Word (.docx). If you only have another format, convert it to PDF first.' },
  { q: 'Can you rewrite my CV for me?', a: `Yes — after your initial review you can add the "we amend it for you" option (${CV_REVIEW.amendLabel}) and we will return an improved version, or you can amend it yourself and use your included follow-up.` },
];

export default function CvReviewPage() {
  return (
    <div className="min-h-screen bg-navy-900 text-white">
      <SiteNav />

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-12 grid lg:grid-cols-[1.3fr_1fr] gap-10 items-start">
        <div>
          <div className="inline-flex items-center gap-2 bg-gold-500/15 border border-gold-500/30 rounded-full px-4 py-1.5 text-gold-400 text-sm font-semibold mb-6">
            CV Review Service
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-5">
            Get your QA CV <span className="text-gold-500">interview-ready</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-xl mb-8">
            A professional review of your software testing / QA CV — a clear score, honest feedback on what works, and the exact changes that will get you more interviews.
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: Clock, label: `${CV_REVIEW.turnaroundHours}h turnaround` },
              { icon: Target, label: 'QA-specific feedback' },
              { icon: ShieldCheck, label: 'CV deleted after review' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm text-gray-300">
                <Icon className="w-4 h-4 text-gold-400" /> {label}
              </div>
            ))}
          </div>
        </div>
        <CvReviewBuy />
      </section>

      {/* How it works */}
      <section className="bg-white/5 border-y border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">How it works</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {steps.map(({ icon: Icon, title, body }, i) => (
              <div key={title} className="bg-navy-900 border border-white/10 rounded-2xl p-6">
                <div className="w-11 h-11 bg-gold-500/20 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-gold-400" />
                </div>
                <div className="text-sm text-gold-400 font-semibold mb-1">Step {i + 1}</div>
                <h3 className="font-semibold text-lg mb-2">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 grid lg:grid-cols-2 gap-10">
        <div>
          <h2 className="text-3xl font-bold mb-6">What you get</h2>
          <ul className="space-y-3">
            {included.map((i) => (
              <li key={i} className="flex items-start gap-3 text-gray-300">
                <FileCheck2 className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" /> {i}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2"><PenLine className="w-5 h-5 text-gold-400" /> Prefer us to do the rewrite?</h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            After your initial review you&apos;ll have the option to add a full rewrite — we amend your CV for you and send back an improved, ATS-friendly version. Or amend it yourself and use your included follow-up review.
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <span className="px-2.5 py-1 rounded-lg bg-gold-500/15 text-gold-400 font-semibold">We amend it — {CV_REVIEW.amendLabel}</span>
            <span className="px-2.5 py-1 rounded-lg bg-white/10 text-gray-300 font-semibold">Follow-up — included</span>
          </div>
        </div>
      </section>

      {/* Privacy */}
      <section className="bg-white/5 border-y border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 text-center">
          <Trash2 className="w-8 h-8 text-gold-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-3">Your data, handled responsibly</h2>
          <p className="text-gray-400 leading-relaxed max-w-2xl mx-auto">
            We use your CV only to produce your review. It is processed with AI assistance to help us review it thoroughly — your CV is not used to train AI models — and the file is <strong className="text-gray-200">deleted from our systems once your review is complete</strong>.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-10">Questions</h2>
        <div className="space-y-4">
          {faqs.map((f) => (
            <div key={f.q} className="bg-white/5 border border-white/10 rounded-xl p-5">
              <h3 className="font-semibold mb-2">{f.q}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
