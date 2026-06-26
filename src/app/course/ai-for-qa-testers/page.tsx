import type { Metadata } from 'next';
import Link from 'next/link';
import {
  CheckCircle2,
  ClipboardList,
  ClipboardCheck,
  Award,
  GraduationCap,
  Users,
  Bot,
  Boxes,
  TestTubes,
  Workflow,
  ListChecks,
} from 'lucide-react';
import { SiteNav } from '@/components/marketing/SiteNav';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import { EnrolButton } from '@/components/marketing/EnrolButton';

const PAGE_DESCRIPTION =
  'Learn how to use ChatGPT, Claude, and modern AI tools to improve test design, test documentation, automation support, defect analysis, risk assessment, and QA productivity.';

export const metadata: Metadata = {
  title: 'AI for QA Testers | Inside STLC Academy',
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: 'AI for QA Testers | Inside STLC Academy',
    description: PAGE_DESCRIPTION,
    type: 'website',
    siteName: 'Inside STLC Academy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI for QA Testers | Inside STLC Academy',
    description: PAGE_DESCRIPTION,
  },
};

const courseJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'AI for QA Testers',
  description: PAGE_DESCRIPTION,
  provider: {
    '@type': 'Organization',
    name: 'Inside STLC Academy',
  },
  offers: {
    '@type': 'Offer',
    price: '99',
    priceCurrency: 'GBP',
    category: 'Professional Edition',
  },
};

const stats = [
  { value: '12', label: 'Modules' },
  { value: '6', label: 'Practical Assignments' },
  { value: '1', label: 'Final Portfolio Project' },
  { value: 'Certificate', label: 'Of Completion' },
];

const audience = [
  { icon: ClipboardList, title: 'Manual Testers', desc: 'Add AI to your everyday testing without losing your judgement.' },
  { icon: Bot, title: 'Automation Testers', desc: 'Use AI to speed up scripting, debugging, and test data.' },
  { icon: ListChecks, title: 'QA Analysts', desc: 'Analyse requirements, risks, and coverage faster.' },
  { icon: Users, title: 'Test Leads', desc: 'Bring AI into planning, refinement, and release testing.' },
  { icon: GraduationCap, title: 'Career Changers', desc: 'Build modern, in-demand QA skills from the ground up.' },
  { icon: Workflow, title: 'Agile Team Members', desc: 'Support refinement, sprint planning, and retrospectives.' },
];

const learnings = [
  'How AI is changing software testing',
  'How to write better QA prompts',
  'How to generate and improve test cases',
  'How to analyse requirements with AI',
  'How to use AI for exploratory testing',
  'How to use AI for API testing support',
  'How to use AI for automation support',
  'How to review bugs and defect reports',
  'How to use AI safely and professionally',
  'How to build your own AI QA workflow',
];

const modules = [
  { n: 1, title: 'The AI Shift in QA', desc: 'Overview of how AI is changing testing, what it can do, what it cannot do, and why human judgement still matters.' },
  { n: 2, title: 'AI Fundamentals for Testers', desc: 'Understand LLMs, prompts, context, hallucinations, limitations, and responsible AI usage.' },
  { n: 3, title: 'Prompt Engineering for QA', desc: 'Learn how to write clear, structured prompts for test analysis, planning, scenarios, risks, and documentation.' },
  { n: 4, title: 'Requirements Analysis with AI', desc: 'Use AI to review user stories, acceptance criteria, gaps, ambiguities, edge cases, and risks.' },
  { n: 5, title: 'AI-Assisted Test Case Design', desc: 'Generate, improve, prioritise, and review manual test cases using AI.' },
  { n: 6, title: 'Exploratory Testing with AI', desc: 'Create charters, personas, scenarios, mind maps, and risk-based exploratory testing ideas.' },
  { n: 7, title: 'Defect Reporting and Root Cause Support', desc: 'Use AI to improve bug reports, reproduce issues, analyse patterns, and support defect triage.' },
  { n: 8, title: 'API Testing with AI', desc: 'Use AI to understand endpoints, create test ideas, generate Postman examples, and review API risks.' },
  { n: 9, title: 'Automation Support with AI', desc: 'Use AI to support Playwright, Cypress, Selenium-style thinking, test data, selectors, and debugging.' },
  { n: 10, title: 'AI in Agile QA Workflows', desc: 'Use AI during refinement, sprint planning, regression planning, release testing, and retrospectives.' },
  { n: 11, title: 'AI Risks, Ethics and Governance', desc: 'Understand data privacy, confidential information, bias, hallucinations, review controls, and professional responsibility.' },
  { n: 12, title: 'Building Your AI QA Workflow', desc: 'Create a repeatable personal AI testing workflow and toolkit.' },
];

const assessment = [
  { icon: ClipboardCheck, title: 'Module Checkpoints', desc: 'Short knowledge checks at the end of key modules.' },
  { icon: TestTubes, title: 'Practical Assignments', desc: 'Learners complete realistic QA activities using AI.' },
  { icon: Boxes, title: 'Final Portfolio Project', desc: 'Learners build an AI-assisted QA pack for a sample product.' },
  { icon: Award, title: 'Certificate of Completion', desc: 'Awarded when the learner completes the course activities.' },
];

const assignments = [
  { n: 1, title: 'Assignment 1', desc: 'Review a user story and identify missing acceptance criteria, risks, and questions.' },
  { n: 2, title: 'Assignment 2', desc: 'Create an AI-assisted test case pack.' },
  { n: 3, title: 'Assignment 3', desc: 'Build exploratory testing charters using AI.' },
  { n: 4, title: 'Assignment 4', desc: 'Improve a poor defect report using AI.' },
  { n: 5, title: 'Assignment 5', desc: 'Create API testing ideas from an example endpoint.' },
  { n: 6, title: 'Assignment 6', desc: 'Create an AI-assisted regression testing plan.' },
];

const finalProjectItems = [
  'Requirement review',
  'Risk analysis',
  'Test scenarios',
  'Test cases',
  'Exploratory charter',
  'Defect report example',
  'Regression plan',
  'Personal AI QA workflow',
];

const pricingIncludes = [
  '12 modules',
  'Practical assignments',
  'Templates',
  'Prompt library',
  'Final portfolio project',
  'Certificate of completion',
];

const faqs = [
  {
    q: 'Do I need coding experience?',
    a: 'No, the course is suitable for manual testers and beginners, although some automation examples are included.',
  },
  {
    q: 'Do I need paid AI tools?',
    a: 'No, learners can complete the course using free or commonly available AI tools.',
  },
  {
    q: 'Is this course suitable for beginners?',
    a: 'Yes, but it is especially powerful for testers who already understand basic QA concepts.',
  },
  {
    q: 'Will I get a certificate?',
    a: 'Yes, learners receive a certificate of completion after completing the course activities.',
  },
  {
    q: 'Is there a final exam?',
    a: 'No, the course uses practical assignments and a final portfolio project instead of a traditional exam.',
  },
];

export default function AiForQaTestersPage() {
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
          Professional Edition
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
          AI for <span className="text-gold-500">QA Testers</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-4">
          Learn how to use ChatGPT, Claude, and modern AI tools to improve test design, test
          documentation, automation support, defect analysis, risk assessment, and QA productivity.
        </p>
        <p className="text-base text-brand-300 max-w-3xl mx-auto mb-10">
          Learn through structured written lessons, practical exercises, templates, checklists, and
          portfolio-building tasks.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <EnrolButton slug="ai-for-qa-testers" />
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
          A practical course for software testers, QA analysts, automation testers, test leads, and
          career changers who want to use AI tools properly in real QA work.
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
          12 professionally designed modules taking you from AI fundamentals to a complete personal
          QA workflow.
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
            This course is assessed through practical QA tasks, not a traditional exam.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
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

      {/* 6. Practical Assignments */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-4">Practical Assignments</h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Six hands-on assignments that build real, portfolio-ready QA artefacts.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {assignments.map(({ n, title, desc }) => (
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
            Create a complete AI QA Portfolio Pack including:
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

      {/* 7. Certificate */}
      <section className="bg-white/5 border-y border-white/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20 text-center">
          <div className="w-16 h-16 bg-gold-500/15 border border-gold-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Award className="w-8 h-8 text-gold-500" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Earn Your Inside STLC Certificate</h2>
          <p className="text-gray-300 text-lg">
            Complete the course activities and final portfolio project to earn your Inside STLC
            Academy Certificate of Completion.
          </p>
        </div>
      </section>

      {/* 8. Pricing */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Pricing</h2>
        <div className="max-w-md mx-auto bg-white/5 border border-brand-400/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-center mb-2">AI for QA Testers</h3>
          <div className="text-center mb-6">
            <span className="text-5xl font-bold text-gold-500">£99</span>
          </div>
          <ul className="space-y-3 mb-8">
            {pricingIncludes.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-200">{item}</span>
              </li>
            ))}
          </ul>
          <EnrolButton
            slug="ai-for-qa-testers"
            containerClassName="flex w-full"
            className="block w-full text-center bg-brand-500 hover:bg-brand-600 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          />
        </div>
      </section>

      {/* 9. FAQ */}
      <section className="bg-white/5 border-y border-white/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map(({ q, a }) => (
              <details
                key={q}
                className="group bg-navy-900 border border-white/10 rounded-xl p-5 [&_summary]:cursor-pointer"
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
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to bring AI into your QA work?</h2>
        <p className="text-gray-400 mb-8">
          Join Inside STLC Academy and build a professional, AI-assisted testing workflow.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <EnrolButton slug="ai-for-qa-testers" />
          <Link
            href="#curriculum"
            className="border border-white/20 hover:border-white/40 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors"
          >
            View Curriculum
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
