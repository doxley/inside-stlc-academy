import type { Metadata } from 'next';
import Link from 'next/link';
import {
  CheckCircle2, ClipboardList, ClipboardCheck, Award, GraduationCap, Users,
  Boxes, TestTubes, Workflow, ListChecks, Timer, BookOpen, Brain, FileCheck2,
} from 'lucide-react';
import { SiteNav } from '@/components/marketing/SiteNav';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import { EnrolButton } from '@/components/marketing/EnrolButton';

const PAGE_DESCRIPTION =
  'Master the ISTQB Foundation syllabus while learning how experienced QA professionals apply these principles in real software testing projects.';

export const metadata: Metadata = {
  title: 'ISTQB Foundation Masterclass | Inside STLC Academy',
  description: PAGE_DESCRIPTION,
  openGraph: { title: 'ISTQB Foundation Masterclass | Inside STLC Academy', description: PAGE_DESCRIPTION, type: 'website', siteName: 'Inside STLC Academy' },
  twitter: { card: 'summary_large_image', title: 'ISTQB Foundation Masterclass | Inside STLC Academy', description: PAGE_DESCRIPTION },
};

const courseJsonLd = {
  '@context': 'https://schema.org', '@type': 'Course', name: 'ISTQB Foundation Masterclass', description: PAGE_DESCRIPTION,
  provider: { '@type': 'Organization', name: 'Inside STLC Academy' },
  offers: { '@type': 'Offer', price: '79', priceCurrency: 'GBP', category: 'Certification Edition' },
};

const stats = [
  { value: '14', label: 'Modules' },
  { value: '70+', label: 'Lessons' },
  { value: '300+', label: 'Practice Questions' },
  { value: '2', label: 'Full Mock Exams' },
  { value: '25+', label: 'Downloadable Resources' },
  { value: 'Certificate', label: 'Of Completion' },
];

const audience = [
  { icon: GraduationCap, title: 'Beginner Testers', desc: 'Learn the syllabus properly from first principles.' },
  { icon: ClipboardList, title: 'Junior QA Engineers', desc: 'Turn on-the-job experience into certified knowledge.' },
  { icon: Users, title: 'Career Changers', desc: 'Build credible, recognised testing credentials.' },
  { icon: TestTubes, title: 'Manual Testers', desc: 'Formalise what you do and pass with confidence.' },
  { icon: Workflow, title: 'Graduates', desc: 'Stand out with a respected industry certification.' },
  { icon: FileCheck2, title: 'Exam Candidates', desc: 'Anyone preparing for the ISTQB Foundation (CTFL) exam.' },
];

const outcomes = [
  'Understand every ISTQB Foundation syllabus topic',
  'Pass the CTFL exam with confidence',
  'Apply testing principles in real projects',
  'Select appropriate test techniques',
  'Understand risk-based testing',
  'Plan testing activities',
  'Write professional test documentation',
  'Explain testing concepts during interviews',
  'Avoid common ISTQB misconceptions',
  'Become a more effective software tester',
];

const modules = [
  { n: 1, title: 'Fundamentals of Testing', desc: 'Why testing matters, objectives, the seven principles, the psychology of testing, and testing across the SDLC.' },
  { n: 2, title: 'Software Development Lifecycle', desc: 'Waterfall, V-Model, Agile and DevOps — and how testing shifts left and right in each.' },
  { n: 3, title: 'Static Testing', desc: 'Reviews, walkthroughs, technical reviews, inspections and static analysis — as they really work at work.' },
  { n: 4, title: 'Test Analysis & Design Techniques', desc: 'EP, BVA, decision tables, state transition, pairwise, use case and experience-based testing — and how to choose.' },
  { n: 5, title: 'Managing the Test Process', desc: 'Planning, monitoring, control, risk, entry/exit criteria and the metrics that matter.' },
  { n: 6, title: 'Test Management', desc: 'Roles, responsibilities, communication, reporting, estimation and prioritisation.' },
  { n: 7, title: 'Defect Management', desc: 'The defect lifecycle, severity vs priority, root cause analysis, reporting and triage.' },
  { n: 8, title: 'Risk-Based Testing', desc: 'Identifying risk, probability and impact, risk matrices, prioritisation and mitigation.' },
  { n: 9, title: 'Test Tools', desc: 'Static analysis, test management, automation, performance and AI tools — and how to select.' },
  { n: 10, title: 'Agile Testing', desc: 'Scrum, ceremonies, user stories, acceptance criteria, definition of done and exploratory testing.' },
  { n: 11, title: 'Real World QA', desc: 'How ISTQB concepts are applied in industry, where theory differs from reality, and David\'s guidance.' },
  { n: 12, title: 'Exam Preparation', desc: 'Study techniques, revision planning, time management, exam strategy, memory techniques and question analysis.' },
  { n: 13, title: 'Mock Exam One', desc: '40 timed questions, immediate feedback, full explanations and a weak-area report.' },
  { n: 14, title: 'Mock Exam Two', desc: 'A full timed exam simulation with a performance dashboard and recommended revision path.' },
];

const examFeatures = [
  { icon: Timer, title: 'Timed Practice', desc: 'Practise under real exam conditions with a countdown timer.' },
  { icon: ListChecks, title: 'Topic Quizzes', desc: 'Drill any syllabus topic and retake until it sticks.' },
  { icon: Brain, title: 'Weak-Area Tracking', desc: 'See your progress by syllabus topic and target revision.' },
  { icon: BookOpen, title: 'Full Explanations', desc: 'Every answer explains why it\'s right — and why the others are wrong.' },
];

const finalProjectItems = [
  'Test Strategy', 'Test Plan', 'Risk Assessment', 'Test Cases',
  'Decision Tables', 'Boundary Analysis', 'Defect Reports', 'Review Notes',
  'Test Summary', 'Reflection',
];

const pricingIncludes = [
  '14 modules · 70+ lessons',
  '300+ practice questions',
  '2 full mock exams',
  'Exam practice mode',
  '25+ downloadable resources',
  'AI prompt pack',
  'QA portfolio project',
  'Certificate of completion',
];

const faqs = [
  { q: 'Does this prepare me for the actual ISTQB exam?', a: 'Yes. It covers every Foundation (CTFL) syllabus topic, with 300+ practice questions and two full mock exams — while also teaching how each concept is applied in real testing work.' },
  { q: 'Do I need testing experience?', a: 'No. It starts from first principles and is suitable for complete beginners, though working testers will formalise and deepen what they already know.' },
  { q: 'Is the exam included in the price?', a: 'No — the official ISTQB exam is booked and paid separately through an accredited provider. This programme prepares you to pass it.' },
  { q: 'How is this different from generic exam crammers?', a: 'It avoids rote cramming. Every topic includes worked examples, industry stories and practical exercises so you understand the material, not just memorise it.' },
  { q: 'Will I get a certificate?', a: 'Yes — the Inside STLC Academy ISTQB Foundation Masterclass Certificate of Completion, awarded when you finish the course activities.' },
];

export default function IstqbFoundationMasterclassPage() {
  return (
    <div className="min-h-screen bg-navy-900 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }} />
      <SiteNav />

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-gold-500/15 border border-gold-500/30 rounded-full px-4 py-1.5 text-gold-400 text-sm font-semibold mb-8">
          Certification Edition
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
          Pass the ISTQB Foundation Exam with <span className="text-gold-500">Confidence</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-4">{PAGE_DESCRIPTION}</p>
        <p className="text-base text-brand-300 max-w-3xl mx-auto mb-10">
          Structured lessons, worked examples, 300+ practice questions, two full mock exams, and a
          premium resource vault — built to the Inside STLC Gold Standard.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <EnrolButton slug="istqb-foundation-masterclass" label="Enrol Now" />
          <Link href="#curriculum" className="border border-white/20 hover:border-white/40 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors">
            View Curriculum
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-white/10 bg-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
          {stats.map(({ value, label }) => (
            <div key={label}>
              <div className="text-3xl font-bold text-gold-500 mb-1">{value}</div>
              <div className="text-gray-400 text-sm">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Who this is for */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-4">Who This Programme Is For</h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          A premium, practical route to the ISTQB Foundation certification — and to becoming a better tester.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {audience.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white/5 border border-white/10 rounded-xl p-6">
              <div className="w-11 h-11 bg-brand-500/20 rounded-xl flex items-center justify-center mb-4"><Icon className="w-5 h-5 text-brand-400" /></div>
              <h3 className="font-semibold text-lg mb-1">{title}</h3>
              <p className="text-gray-400 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Learning outcomes */}
      <section className="bg-white/5 border-y border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <h2 className="text-3xl font-bold text-center mb-12">What You Will Achieve</h2>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4 max-w-4xl mx-auto">
            {outcomes.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-200">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section id="curriculum" className="max-w-6xl mx-auto px-4 sm:px-6 py-20 scroll-mt-20">
        <h2 className="text-3xl font-bold text-center mb-4">Course Curriculum</h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          14 modules — 70+ lessons — covering the full syllabus, plus two timed mock exams.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          {modules.map(({ n, title, desc }) => (
            <div key={n} className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-xl p-5">
              <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-brand-500/20 text-brand-300 font-bold flex items-center justify-center">{n}</span>
              <div>
                <h3 className="font-semibold mb-1">Module {n}: <span className="text-gold-400">{title}</span></h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Exam practice */}
      <section className="bg-white/5 border-y border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <h2 className="text-3xl font-bold text-center mb-4">Exam Practice Mode</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Practise the way you'll be examined — topic drills, timed quizzes and full mock exams, with weak-area tracking by syllabus topic.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {examFeatures.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-navy-900 border border-white/10 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-brand-500/20 rounded-xl flex items-center justify-center mx-auto mb-4"><Icon className="w-6 h-6 text-brand-400" /></div>
                <h3 className="font-semibold mb-2">{title}</h3>
                <p className="text-gray-400 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio project */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="bg-gradient-to-br from-brand-500/10 to-gold-500/10 border border-brand-400/30 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-4"><Boxes className="w-6 h-6 text-gold-500" /><h3 className="text-2xl font-bold">Build a QA Portfolio</h3></div>
          <p className="text-gray-300 mb-6">Don't just pass a quiz — build a complete QA portfolio you can show employers:</p>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
            {finalProjectItems.map((item) => (
              <div key={item} className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-brand-400 flex-shrink-0 mt-0.5" /><span className="text-gray-200">{item}</span></div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificate */}
      <section className="bg-white/5 border-y border-white/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20 text-center">
          <div className="w-16 h-16 bg-gold-500/15 border border-gold-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6"><Award className="w-8 h-8 text-gold-500" /></div>
          <h2 className="text-3xl font-bold mb-4">Earn Your Inside STLC Certificate</h2>
          <p className="text-gray-300 text-lg">Complete the course activities to earn your Inside STLC Academy – ISTQB Foundation Masterclass Certificate of Completion.</p>
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Pricing</h2>
        <div className="max-w-md mx-auto bg-white/5 border border-brand-400/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-center mb-2">ISTQB Foundation Masterclass</h3>
          <div className="text-center mb-6"><span className="text-5xl font-bold text-gold-500">£79</span></div>
          <ul className="space-y-3 mb-8">
            {pricingIncludes.map((item) => (
              <li key={item} className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-brand-400 flex-shrink-0 mt-0.5" /><span className="text-gray-200">{item}</span></li>
            ))}
          </ul>
          <EnrolButton slug="istqb-foundation-masterclass" label="Enrol Now"
            containerClassName="flex w-full"
            className="block w-full text-center bg-brand-500 hover:bg-brand-600 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed" />
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white/5 border-y border-white/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map(({ q, a }) => (
              <details key={q} className="group bg-navy-900 border border-white/10 rounded-xl p-5 [&_summary]:cursor-pointer">
                <summary className="flex items-center justify-between gap-4 font-semibold list-none">{q}
                  <span className="text-brand-400 transition-transform group-open:rotate-45 text-2xl leading-none">+</span>
                </summary>
                <p className="text-gray-400 text-sm mt-3 leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to become ISTQB certified?</h2>
        <p className="text-gray-400 mb-8">Join Inside STLC Academy and pass the Foundation exam while becoming a genuinely better tester.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <EnrolButton slug="istqb-foundation-masterclass" label="Enrol Now" />
          <Link href="#curriculum" className="border border-white/20 hover:border-white/40 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors">View Curriculum</Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
