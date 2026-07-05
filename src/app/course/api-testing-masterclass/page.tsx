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
  FileJson,
  KeyRound,
  TerminalSquare,
} from 'lucide-react';
import { SiteNav } from '@/components/marketing/SiteNav';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import { EnrolButton } from '@/components/marketing/EnrolButton';

const PAGE_DESCRIPTION =
  'Learn how to design, execute and automate API testing using Postman, REST principles, authentication, contract testing and AI-assisted workflows.';

export const metadata: Metadata = {
  title: 'API Testing Masterclass | Inside STLC Academy',
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: 'API Testing Masterclass | Inside STLC Academy',
    description: PAGE_DESCRIPTION,
    type: 'website',
    siteName: 'Inside STLC Academy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'API Testing Masterclass | Inside STLC Academy',
    description: PAGE_DESCRIPTION,
  },
};

const courseJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'API Testing Masterclass',
  description: PAGE_DESCRIPTION,
  provider: { '@type': 'Organization', name: 'Inside STLC Academy' },
  offers: { '@type': 'Offer', price: '99', priceCurrency: 'GBP', category: 'Professional Edition' },
};

const stats = [
  { value: '10', label: 'Modules' },
  { value: '55', label: 'Lessons' },
  { value: '80+', label: 'Practical Exercises' },
  { value: 'Portfolio', label: 'API Project' },
  { value: 'Certificate', label: 'Of Completion' },
];

const audience = [
  { icon: ClipboardList, title: 'Manual Testers', desc: 'Move beyond the UI and test the APIs behind the application.' },
  { icon: Bot, title: 'Automation Testers', desc: 'Build fast, reliable automated API checks and CI pipelines.' },
  { icon: ListChecks, title: 'QA Analysts', desc: 'Validate data, contracts and integrations with confidence.' },
  { icon: Users, title: 'Developers in Test', desc: 'Add professional API testing depth to your toolkit.' },
  { icon: GraduationCap, title: 'Career Changers', desc: 'Learn one of the most in-demand QA skills from scratch.' },
  { icon: Workflow, title: 'Agile Team Members', desc: 'Test integrations early and shift API quality left.' },
];

const learnings = [
  'What APIs are and how the web really communicates',
  'HTTP methods, status codes, headers and payloads',
  'Reading, validating and asserting on JSON & XML',
  'Postman collections, environments, variables and scripts',
  'API keys, Basic, Bearer tokens and OAuth 2.0',
  'Designing a full REST API test strategy',
  'Testing GraphQL and using contract testing',
  'Automating collections with Newman in CI/CD',
  'Using AI to accelerate API testing responsibly',
  'Building a complete API test suite portfolio project',
];

const modules = [
  { n: 1, title: 'API Fundamentals', desc: 'What an API is, the client–server model, REST principles, and where API testing fits in the delivery lifecycle.' },
  { n: 2, title: 'HTTP Methods & Status Codes', desc: 'GET, POST, PUT, PATCH, DELETE, idempotency, headers, and reading status codes like a tester.' },
  { n: 3, title: 'JSON & XML', desc: 'Read, validate and assert on JSON and XML payloads, schemas, and nested data structures.' },
  { n: 4, title: 'Postman Deep Dive', desc: 'Collections, environments, variables, scripts, tests, data-driven runs and the Collection Runner.' },
  { n: 5, title: 'Authentication & Security', desc: 'API keys, Basic auth, Bearer tokens, OAuth 2.0, and testing common API security risks.' },
  { n: 6, title: 'REST API Testing', desc: 'Designing a full REST test strategy: positive, negative, boundary, CRUD flows and end-to-end journeys.' },
  { n: 7, title: 'GraphQL & Contract Testing', desc: 'Testing GraphQL queries and mutations, and using contract testing to catch breaking changes early.' },
  { n: 8, title: 'Newman & Automation', desc: 'Run Postman collections from the CLI with Newman, integrate into CI/CD, and produce reports.' },
  { n: 9, title: 'AI-Assisted API Testing', desc: 'Use AI to accelerate endpoint analysis, test idea generation, assertions and documentation — responsibly.' },
  { n: 10, title: 'Final API Portfolio Project', desc: 'Build a complete API test suite for a sample application: collections, automated execution, reporting and documentation.' },
];

const resources = [
  { icon: Boxes, title: 'Postman Collections', desc: 'Ready-to-import collections you build on throughout the course.' },
  { icon: FileJson, title: 'Swagger / OpenAPI Examples', desc: 'Real API specifications to explore and test against.' },
  { icon: ClipboardCheck, title: 'API Cheat Sheets', desc: 'Status codes, methods, headers and assertions at a glance.' },
  { icon: FileJson, title: 'JSON Samples', desc: 'Sample payloads for practising parsing and validation.' },
  { icon: KeyRound, title: 'Authentication Guide', desc: 'API keys, Basic, Bearer and OAuth 2.0 explained for testers.' },
  { icon: ClipboardList, title: 'API Test Strategy Template', desc: 'A reusable strategy to plan coverage for any API.' },
  { icon: TerminalSquare, title: 'Newman Templates', desc: 'CLI and CI/CD templates for automated collection runs.' },
  { icon: Bot, title: 'AI Prompt Library', desc: 'Curated prompts for endpoint analysis, tests and docs.' },
];

const assessment = [
  { icon: ClipboardCheck, title: 'Knowledge Checks', desc: 'Short checks in every lesson to lock in the concepts.' },
  { icon: TestTubes, title: '80+ Practical Exercises', desc: 'Hands-on tasks and mini challenges in every lesson.' },
  { icon: Boxes, title: 'Final Portfolio Project', desc: 'Build a complete, automated API test suite for a sample app.' },
  { icon: Award, title: 'Certificate of Completion', desc: 'Awarded when you complete the course activities.' },
];

const finalProjectItems = [
  'API test strategy',
  'Postman collection & environments',
  'Positive, negative & boundary tests',
  'Authentication handling',
  'Automated Newman run',
  'HTML test report',
  'API documentation',
  'README & portfolio write-up',
];

const pricingIncludes = [
  '10 modules · 55 lessons',
  '80+ practical exercises',
  'Postman collections & templates',
  'Authentication & strategy guides',
  'Newman automation templates',
  'AI prompt library',
  'Final API portfolio project',
  'Certificate of completion',
];

const faqs = [
  { q: 'Do I need coding experience?', a: 'No. The course starts from API fundamentals. Postman is largely no-code, and the small amount of JavaScript used in scripts and Newman is fully explained.' },
  { q: 'Do I need paid tools?', a: 'No. Everything is taught with the free Postman app and free public APIs, so you can complete the whole course at no extra cost.' },
  { q: 'Is this suitable for beginners?', a: 'Yes. It is beginner-friendly but goes deep enough to make experienced manual testers confident with professional API testing.' },
  { q: 'Will I get a certificate?', a: 'Yes. You earn the Inside STLC Academy – API Testing Masterclass certificate after completing the course activities and final project.' },
  { q: 'Is there a final exam?', a: 'No. You are assessed through practical exercises, knowledge checks, and a final portfolio project rather than a traditional exam.' },
];

export default function ApiTestingMasterclassPage() {
  return (
    <div className="min-h-screen bg-navy-900 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }} />
      <SiteNav />

      {/* 1. Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-gold-500/15 border border-gold-500/30 rounded-full px-4 py-1.5 text-gold-400 text-sm font-semibold mb-8">
          Professional Edition
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
          Master Modern <span className="text-gold-500">API Testing</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-4">{PAGE_DESCRIPTION}</p>
        <p className="text-base text-brand-300 max-w-3xl mx-auto mb-10">
          Learn through structured written lessons, worked examples, practical exercises, templates,
          collections, and a portfolio-building final project.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <EnrolButton slug="api-testing-masterclass" />
          <Link href="#curriculum" className="border border-white/20 hover:border-white/40 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors">
            View Curriculum
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-white/10 bg-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 text-center">
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
          A practical course for testers, QA analysts, automation engineers and career changers who
          want to test APIs properly — the layer where most real integration bugs live.
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

      {/* 4. Curriculum */}
      <section id="curriculum" className="max-w-6xl mx-auto px-4 sm:px-6 py-20 scroll-mt-20">
        <h2 className="text-3xl font-bold text-center mb-4">Course Curriculum</h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          10 professionally designed modules — 55 lessons — taking you from API fundamentals to a
          complete, automated API test suite.
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

      {/* 5. Resources */}
      <section className="bg-white/5 border-y border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <h2 className="text-3xl font-bold text-center mb-4">Resources & Downloads</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Everything you need to practise and to reuse on the job.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {resources.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-navy-900 border border-white/10 rounded-xl p-6">
                <div className="w-11 h-11 bg-brand-500/20 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-brand-400" />
                </div>
                <h3 className="font-semibold mb-1">{title}</h3>
                <p className="text-gray-400 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Assessment */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-4">How You Will Be Assessed</h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Assessed through hands-on practice and a portfolio project, not a traditional exam.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {assessment.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-brand-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Icon className="w-6 h-6 text-brand-400" />
              </div>
              <h3 className="font-semibold mb-2">{title}</h3>
              <p className="text-gray-400 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Final Project */}
      <section className="bg-white/5 border-y border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <div className="bg-gradient-to-br from-brand-500/10 to-gold-500/10 border border-brand-400/30 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <Boxes className="w-6 h-6 text-gold-500" />
              <h3 className="text-2xl font-bold">Final API Portfolio Project</h3>
            </div>
            <p className="text-gray-300 mb-6">
              Build a complete API test suite for a sample application — including documentation,
              collections, automated execution and reporting:
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
        </div>
      </section>

      {/* 8. Certificate */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-20 text-center">
        <div className="w-16 h-16 bg-gold-500/15 border border-gold-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Award className="w-8 h-8 text-gold-500" />
        </div>
        <h2 className="text-3xl font-bold mb-4">Earn Your Inside STLC Certificate</h2>
        <p className="text-gray-300 text-lg">
          Complete the course activities and final portfolio project to earn your
          Inside STLC Academy – API Testing Masterclass Certificate of Completion.
        </p>
      </section>

      {/* 9. Pricing */}
      <section className="bg-white/5 border-y border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <h2 className="text-3xl font-bold text-center mb-12">Pricing</h2>
          <div className="max-w-md mx-auto bg-navy-900 border border-brand-400/30 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-center mb-2">API Testing Masterclass</h3>
            <div className="text-center mb-6"><span className="text-5xl font-bold text-gold-500">£99</span></div>
            <ul className="space-y-3 mb-8">
              {pricingIncludes.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-200">{item}</span>
                </li>
              ))}
            </ul>
            <EnrolButton
              slug="api-testing-masterclass"
              containerClassName="flex w-full"
              className="block w-full text-center bg-brand-500 hover:bg-brand-600 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            />
          </div>
        </div>
      </section>

      {/* 10. FAQ */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map(({ q, a }) => (
            <details key={q} className="group bg-white/5 border border-white/10 rounded-xl p-5 [&_summary]:cursor-pointer">
              <summary className="flex items-center justify-between gap-4 font-semibold list-none">
                {q}
                <span className="text-brand-400 transition-transform group-open:rotate-45 text-2xl leading-none">+</span>
              </summary>
              <p className="text-gray-400 text-sm mt-3 leading-relaxed">{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to master API testing?</h2>
        <p className="text-gray-400 mb-8">Join Inside STLC Academy and build a professional, automated API testing skillset.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <EnrolButton slug="api-testing-masterclass" />
          <Link href="#curriculum" className="border border-white/20 hover:border-white/40 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors">
            View Curriculum
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
