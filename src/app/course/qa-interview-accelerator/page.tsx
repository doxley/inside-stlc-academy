import type { Metadata } from 'next';
import Link from 'next/link';
import {
  CheckCircle2,
  Sprout,
  RefreshCw,
  ClipboardList,
  UserPlus,
  Bot,
  RotateCcw,
  ClipboardCheck,
  MessageSquare,
  FileText,
  Boxes,
  Award,
  Star,
  Linkedin,
  Bug,
  HelpCircle,
  ListChecks,
} from 'lucide-react';
import { SiteNav } from '@/components/marketing/SiteNav';
import { SiteFooter } from '@/components/marketing/SiteFooter';

const PAGE_DESCRIPTION =
  'Prepare for software testing interviews with real QA questions, model answers, CV guidance, test task preparation, and practical interview confidence.';

export const metadata: Metadata = {
  title: 'QA Interview Accelerator | Inside STLC Academy',
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: 'QA Interview Accelerator | Inside STLC Academy',
    description: PAGE_DESCRIPTION,
    type: 'website',
    siteName: 'Inside STLC Academy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QA Interview Accelerator | Inside STLC Academy',
    description: PAGE_DESCRIPTION,
  },
};

const courseJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'QA Interview Accelerator',
  description: PAGE_DESCRIPTION,
  provider: {
    '@type': 'Organization',
    name: 'Inside STLC Academy',
  },
  offers: {
    '@type': 'Offer',
    price: '49',
    priceCurrency: 'GBP',
    category: 'Career Edition',
  },
};

const stats = [
  { value: '8', label: 'Modules' },
  { value: '50+', label: 'Interview Questions' },
  { value: 'CV & LinkedIn', label: 'Guidance' },
  { value: 'Certificate', label: 'Of Completion' },
];

const audience = [
  { icon: Sprout, title: 'Beginner Testers', desc: 'Walk into your first QA interview prepared and confident.' },
  { icon: RefreshCw, title: 'Career Changers', desc: 'Position your transferable experience for a testing role.' },
  { icon: ClipboardList, title: 'Manual Testers', desc: 'Sharpen how you explain core testing concepts under pressure.' },
  { icon: UserPlus, title: 'Junior QA Applicants', desc: 'Stand out for junior and entry-level QA positions.' },
  { icon: Bot, title: 'Automation Testers', desc: 'Prepare for technical and scenario-based automation questions.' },
  { icon: RotateCcw, title: 'Testers Returning to Work', desc: 'Refresh your confidence and modernise your answers.' },
];

const learnings = [
  'How to explain your QA experience confidently',
  'How to answer common software testing interview questions',
  'How to structure STAR-based answers',
  'How to explain test cases, defects, regression, agile and risk',
  'How to handle scenario-based interview questions',
  'How to prepare for QA test tasks',
  'How to improve your CV and LinkedIn profile',
  'How to stand out in a competitive QA job market',
];

const modules = [
  { n: 1, title: 'Understanding the QA Interview Process', desc: 'Learn what employers are really assessing, how QA interviews are structured, and how to prepare properly.' },
  { n: 2, title: 'Your QA Career Story', desc: 'Build a clear, confident answer to “Tell me about yourself” and learn how to position your experience.' },
  { n: 3, title: 'Core Software Testing Questions', desc: 'Prepare for questions on test cases, test scenarios, defects, regression testing, retesting, smoke testing, exploratory testing, and UAT.' },
  { n: 4, title: 'Agile, Scrum and Team-Based Questions', desc: 'Learn how to answer questions about working in agile teams, ceremonies, user stories, acceptance criteria, and collaboration.' },
  { n: 5, title: 'Scenario-Based QA Questions', desc: 'Practise real-world questions involving unclear requirements, production defects, missed bugs, tight deadlines, and conflicting priorities.' },
  { n: 6, title: 'Test Task Preparation', desc: 'Learn how to approach practical test tasks, write test cases, raise defects, explain assumptions, and present your thinking.' },
  { n: 7, title: 'CV, LinkedIn and Job Applications', desc: 'Improve your CV, LinkedIn profile, personal summary, project descriptions, and application approach.' },
  { n: 8, title: 'Final Interview Readiness Pack', desc: 'Create your own interview preparation pack including answers, examples, STAR stories, questions to ask employers, and final checklist.' },
];

const assessment = [
  { icon: ClipboardCheck, title: 'Interview Checkpoints', desc: 'Short preparation tasks at the end of each module.' },
  { icon: MessageSquare, title: 'Answer Building Exercises', desc: 'Learners create their own model answers to common QA interview questions.' },
  { icon: FileText, title: 'CV & LinkedIn Review Checklist', desc: 'Learners improve their professional profile using guided templates.' },
  { icon: Boxes, title: 'Final Interview Readiness Pack', desc: 'Learners complete a portfolio-style pack they can use before real interviews.' },
  { icon: Award, title: 'Certificate of Completion', desc: 'Awarded when learners complete the course activities.' },
];

const activities = [
  { n: 1, title: 'Activity 1', desc: 'Write your QA career introduction.' },
  { n: 2, title: 'Activity 2', desc: 'Create STAR answers for five common QA interview questions.' },
  { n: 3, title: 'Activity 3', desc: 'Build model answers for core testing concepts.' },
  { n: 4, title: 'Activity 4', desc: 'Complete three scenario-based interview responses.' },
  { n: 5, title: 'Activity 5', desc: 'Complete a sample QA test task.' },
  { n: 6, title: 'Activity 6', desc: 'Update your CV and LinkedIn profile using the course checklist.' },
];

const finalProjectItems = [
  'Personal introduction',
  'QA career story',
  'STAR examples',
  'Core testing answers',
  'Scenario answers',
  'Test task example',
  'Questions to ask employers',
  'CV checklist',
  'LinkedIn checklist',
  'Final interview preparation checklist',
];

const resources = [
  { icon: HelpCircle, title: 'QA Interview Question Bank' },
  { icon: Star, title: 'STAR Answer Template' },
  { icon: FileText, title: 'CV Improvement Checklist' },
  { icon: Linkedin, title: 'LinkedIn Profile Checklist' },
  { icon: ClipboardList, title: 'Test Task Template' },
  { icon: Bug, title: 'Defect Report Template' },
  { icon: MessageSquare, title: 'Questions to Ask Employers' },
  { icon: ListChecks, title: 'Final Interview Checklist' },
];

const pricingIncludes = [
  '8 modules',
  '50+ interview questions',
  'Practical answer templates',
  'CV and LinkedIn guidance',
  'Test task preparation',
  'Final readiness pack',
  'Certificate of completion',
];

const faqs = [
  {
    q: 'Do I need previous QA experience?',
    a: 'No. The course is suitable for beginners, career changers and junior testers.',
  },
  {
    q: 'Is this course only for manual testing roles?',
    a: 'No. It is useful for manual testing, QA analyst and junior automation roles.',
  },
  {
    q: 'Will this help me with real interview questions?',
    a: 'Yes. The course focuses on common, practical QA interview questions and scenario-based examples.',
  },
  {
    q: 'Is there a final exam?',
    a: 'No. You complete practical preparation tasks and a final interview readiness pack.',
  },
  {
    q: 'Will I get a certificate?',
    a: 'Yes. You receive a certificate of completion after finishing the course activities.',
  },
  {
    q: 'Does this include CV help?',
    a: 'Yes. The course includes CV and LinkedIn improvement guidance.',
  },
];

export default function QaInterviewAcceleratorPage() {
  return (
    <div className="min-h-screen bg-navy-900 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />
      <SiteNav />

      {/* 1. Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-gold-500/15 border border-gold-500/30 rounded-full px-4 py-1.5 text-gold-400 text-sm font-semibold mb-8">
          Career Edition
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
          QA Interview <span className="text-gold-500">Accelerator</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
          Prepare for software testing interviews with real QA questions, model answers, CV
          guidance, test task preparation, and practical interview confidence.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/register"
            className="bg-brand-500 hover:bg-brand-600 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors"
          >
            Enrol Now
          </Link>
          <Link
            href="#curriculum"
            className="border border-white/20 hover:border-white/40 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors"
          >
            View Curriculum
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-white/10 bg-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {stats.map(({ value, label }) => (
            <div key={label}>
              <div className="text-3xl font-bold text-gold-500 mb-1">{value}</div>
              <div className="text-gray-400 text-sm">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Who This Course Is For */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-4">Who This Course Is For</h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Built for testers at every stage who want to walk into QA interviews prepared, confident,
          and ready to stand out.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {audience.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white/5 border border-white/10 rounded-xl p-6">
              <div className="w-11 h-11 bg-brand-500/20 rounded-xl flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-brand-400" />
              </div>
              <h3 className="font-semibold text-lg mb-1">{title}</h3>
              <p className="text-gray-400 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. What You Will Learn */}
      <section className="bg-white/5 border-y border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <h2 className="text-3xl font-bold text-center mb-12">What You Will Learn</h2>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4 max-w-4xl mx-auto">
            {learnings.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-200">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Course Curriculum */}
      <section id="curriculum" className="max-w-6xl mx-auto px-4 sm:px-6 py-20 scroll-mt-20">
        <h2 className="text-3xl font-bold text-center mb-4">Course Curriculum</h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          8 focused modules taking you from understanding the interview process to a complete,
          personal readiness pack.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          {modules.map(({ n, title, desc }) => (
            <div key={n} className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-xl p-5">
              <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-brand-500/20 text-brand-300 font-bold flex items-center justify-center">
                {n}
              </span>
              <div>
                <h3 className="font-semibold mb-1">
                  Module {n}: <span className="text-gold-400">{title}</span>
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Assessment Model */}
      <section className="bg-white/5 border-y border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <h2 className="text-3xl font-bold text-center mb-4">How You Will Be Assessed</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            This course is assessed through practical preparation tasks, not a traditional exam.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {assessment.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-navy-900 border border-white/10 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-brand-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-brand-400" />
                </div>
                <h3 className="font-semibold mb-2">{title}</h3>
                <p className="text-gray-400 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Practical Activities */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-4">Practical Activities</h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Six hands-on activities that build the answers and materials you’ll use in real
          interviews.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {activities.map(({ n, title, desc }) => (
            <div key={n} className="bg-white/5 border border-white/10 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-8 h-8 rounded-lg bg-gold-500/15 text-gold-400 text-sm font-bold flex items-center justify-center">
                  {n}
                </span>
                <h3 className="font-semibold">{title}</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* Final Project */}
        <div className="bg-gradient-to-br from-brand-500/10 to-gold-500/10 border border-brand-400/30 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <Boxes className="w-6 h-6 text-gold-500" />
            <h3 className="text-2xl font-bold">Final Project</h3>
          </div>
          <p className="text-gray-300 mb-6">
            Create a complete QA Interview Readiness Pack including:
          </p>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
            {finalProjectItems.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-200">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Resources */}
      <section className="bg-white/5 border-y border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <h2 className="text-3xl font-bold text-center mb-12">Included Resources</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {resources.map(({ icon: Icon, title }) => (
              <div key={title} className="flex items-center gap-3 bg-navy-900 border border-white/10 rounded-xl p-5">
                <div className="w-10 h-10 flex-shrink-0 bg-brand-500/20 rounded-lg flex items-center justify-center">
                  <Icon className="w-5 h-5 text-brand-400" />
                </div>
                <span className="text-sm font-medium text-gray-200">{title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Certificate */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-20 text-center">
        <div className="w-16 h-16 bg-gold-500/15 border border-gold-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Award className="w-8 h-8 text-gold-500" />
        </div>
        <h2 className="text-3xl font-bold mb-4">Earn Your Inside STLC Certificate</h2>
        <p className="text-gray-300 text-lg">
          Complete the course activities and final interview readiness pack to earn your Inside STLC
          Academy Certificate of Completion.
        </p>
      </section>

      {/* 9. Pricing */}
      <section className="bg-white/5 border-y border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <h2 className="text-3xl font-bold text-center mb-12">Pricing</h2>
          <div className="max-w-md mx-auto bg-navy-900 border border-brand-400/30 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-center mb-2">QA Interview Accelerator</h3>
            <div className="text-center mb-6">
              <span className="text-5xl font-bold text-gold-500">£49</span>
            </div>
            <ul className="space-y-3 mb-8">
              {pricingIncludes.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-200">{item}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/register"
              className="block w-full text-center bg-brand-500 hover:bg-brand-600 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors"
            >
              Enrol Now
            </Link>
          </div>
        </div>
      </section>

      {/* 10. FAQ */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map(({ q, a }) => (
            <details
              key={q}
              className="group bg-white/5 border border-white/10 rounded-xl p-5 [&_summary]:cursor-pointer"
            >
              <summary className="flex items-center justify-between gap-4 font-semibold list-none">
                {q}
                <span className="text-brand-400 transition-transform group-open:rotate-45 text-2xl leading-none">
                  +
                </span>
              </summary>
              <p className="text-gray-400 text-sm mt-3 leading-relaxed">{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-white/5 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to ace your next QA interview?</h2>
          <p className="text-gray-400 mb-8">
            Join Inside STLC Academy and build the confidence and materials to stand out.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="bg-brand-500 hover:bg-brand-600 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors"
            >
              Enrol Now
            </Link>
            <Link
              href="#curriculum"
              className="border border-white/20 hover:border-white/40 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors"
            >
              View Curriculum
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
