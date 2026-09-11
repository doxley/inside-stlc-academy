import type { Metadata } from 'next';
import Link from 'next/link';
import {
  CheckCircle2, Award, Bot, Workflow, Boxes, ClipboardList, Target,
  GitBranch, TerminalSquare, Braces, Network, Rocket, FlaskConical, Sparkles,
} from 'lucide-react';
import { SiteNav } from '@/components/marketing/SiteNav';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import { EnrolButton } from '@/components/marketing/EnrolButton';

const SLUG = 'modern-test-automation-bootcamp';

const PAGE_DESCRIPTION =
  'Build production-style test automation using Playwright • TypeScript • APIs • Git • GitHub Actions • AI. Then prove it with three practical projects and a portfolio-ready automation framework.';

export const metadata: Metadata = {
  title: 'Modern Test Automation Bootcamp | Inside STLC Academy',
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: 'Modern Test Automation Bootcamp | Inside STLC Academy',
    description: PAGE_DESCRIPTION,
    type: 'website',
    siteName: 'Inside STLC Academy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Modern Test Automation Bootcamp | Inside STLC Academy',
    description: PAGE_DESCRIPTION,
  },
};

const courseJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'Modern Test Automation Bootcamp',
  description: PAGE_DESCRIPTION,
  provider: { '@type': 'Organization', name: 'Inside STLC Academy' },
  offers: { '@type': 'Offer', price: '199', priceCurrency: 'GBP', category: 'Professional Edition' },
};

const stats = [
  { value: '16', label: 'Modules' },
  { value: '90+', label: 'Lessons' },
  { value: '12', label: 'Hands-On Labs' },
  { value: '3', label: 'Real Projects' },
  { value: 'Portfolio', label: 'Capstone' },
  { value: 'Certificate', label: 'Of Completion' },
];

const audience = [
  { icon: ClipboardList, title: 'Manual Testers', desc: 'Moving into automation and wanting to do it properly from the start.' },
  { icon: FlaskConical, title: 'QA & Test Engineers', desc: 'Levelling up to a modern, maintainable automation toolset.' },
  { icon: Workflow, title: 'Selenium & Cypress Testers', desc: 'Modernising onto Playwright, TypeScript and CI-first workflows.' },
  { icon: Target, title: 'QA Pros Wanting Evidence', desc: 'Building portfolio evidence that proves what you can actually do.' },
];

const outcomes = [
  'Design a production-style Playwright framework',
  'Build reliable, meaningful automated tests',
  'Debug flakiness and failures fast',
  'Maintain a suite so it stays trusted over time',
  'Write clean, typed tests in TypeScript',
  'Automate REST APIs and control the network',
  'Use Git and pull requests like a real team',
  'Integrate automation into CI/CD with GitHub Actions',
  'Use AI as an engineering tool — and review what it produces',
  'Ship a complete framework as portfolio evidence',
];

const modules = [
  { n: 1, title: 'Thinking Like an Automation Engineer', desc: 'What automation is actually for, what to automate and what to leave manual, the real cost of bad automation, and the engineering mindset that separates automators from tutorial-followers.' },
  { n: 2, title: 'TypeScript for Testers', desc: 'Just enough TypeScript to write clean, typed Playwright tests: types and interfaces, functions and modules, async/await, and the everyday patterns you will actually use.' },
  { n: 3, title: 'Git, GitHub & Professional Workflow', desc: 'Branching, commits, pull requests and code review — how real teams collaborate on a shared test codebase without stepping on each other.' },
  { n: 4, title: 'Playwright Foundations', desc: 'Installing and configuring Playwright, the test runner, locators, actions and web-first assertions, and the config that underpins everything else.' },
  { n: 5, title: 'Writing Tests That Actually Test Something', desc: 'Test design for automation: what a test should assert, meaningful versus weak assertions, and why a green test is not automatically a good test.' },
  { n: 6, title: 'Reliable Playwright Automation', desc: 'Auto-waiting, web-first assertions, the real causes of flakiness, and how to build tests that stay green for the right reasons.' },
  { n: 7, title: 'Framework Architecture', desc: 'Page objects, fixtures, components and project structure — designing a maintainable framework without over-engineering it.' },
  { n: 8, title: 'Authentication, State & Test Data', desc: 'Logging in once and reusing storage state, handling multiple roles, and creating and cleaning up test data so tests own their own state.' },
  { n: 9, title: 'API Automation with Playwright', desc: "Testing REST APIs with Playwright's request context, asserting status and payloads, and using API calls to set up and verify state for UI tests." },
  { n: 10, title: 'Network Control & Mocking', desc: 'Intercepting, stubbing and mocking network traffic to test edge cases, isolate the UI and control flaky third-party dependencies.' },
  { n: 11, title: 'Cross-Browser, Parallelisation & Scale', desc: 'Browser projects, parallel execution and sharding — keeping a large suite fast, trustworthy and cheap to run.' },
  { n: 12, title: 'CI/CD with GitHub Actions', desc: 'Running the suite automatically on every push: workflows, browsers in CI, artifacts and reports, and using automation as a real quality gate.' },
  { n: 13, title: 'Reporting, Observability & Maintenance', desc: 'Reporters, traces, screenshots and video; debugging failures fast, and keeping a suite healthy and trusted over time.' },
  { n: 14, title: 'AI-Assisted Test Automation', desc: 'Using AI coding assistants as an engineering tool — pair-programming, generation, debugging and refactoring — and rigorously reviewing what they produce for hallucinations, weak assertions and security risks.' },
  { n: 15, title: 'Working in a Real Automation Team', desc: 'How automation fits a delivery team: what to automate for a story, code review, shared ownership, and communicating quality and risk to the people who make release decisions.' },
  { n: 16, title: 'Production-Style Automation Capstone', desc: 'Independently build a complete, production-style automation repository — UI, API, fixtures, auth, data, CI/CD, reporting and a README — that brings the whole programme together as portfolio evidence.' },
];

const toolkit = [
  { icon: TerminalSquare, title: 'Playwright', desc: 'The modern test runner: locators, web-first assertions, fixtures, tracing and cross-browser projects.' },
  { icon: Braces, title: 'TypeScript', desc: 'Clean, typed test code — types, interfaces, modules and async/await used the way real frameworks use them.' },
  { icon: Network, title: 'API Automation', desc: "Playwright's request context for REST APIs: asserting payloads and setting up state without the UI." },
  { icon: GitBranch, title: 'Git & GitHub Actions', desc: 'Branches, pull requests and code review, then running the suite as a real CI quality gate on every push.' },
  { icon: Bot, title: 'AI', desc: 'AI coding assistants as an engineering tool — generate, debug and refactor, then rigorously review the output.' },
];

const projects = [
  {
    icon: FlaskConical,
    tag: 'Project 1',
    title: 'UI Automation',
    desc: 'Build a reliable UI automation suite with Playwright and TypeScript: solid locators, meaningful assertions and page objects that stay maintainable.',
  },
  {
    icon: Network,
    tag: 'Project 2',
    title: 'Full-Stack Automation + CI',
    desc: 'Combine UI and API automation with authentication, test data and network control, then wire it into GitHub Actions so it runs on every push.',
  },
  {
    icon: Rocket,
    tag: 'Project 3',
    title: 'Final Capstone',
    desc: 'Independently build a complete, production-style automation repository — UI, API, fixtures, auth, data, CI/CD, reporting and a README — as portfolio evidence.',
  },
];

const portfolioOutputs = [
  'A production-style Playwright framework',
  'UI and API automation in one repository',
  'Fixtures, page objects and shared helpers',
  'Authentication and test-data handling',
  'A GitHub Actions CI pipeline with a status badge',
  'HTML reports, traces and screenshots on failure',
  'A professional README explaining the framework',
  'A public GitHub repository you can link on your CV',
];

const pricingIncludes = [
  '16 modules · 90+ lessons',
  '12 hands-on labs',
  '3 real automation projects',
  'Playwright, TypeScript, API, Git & CI/CD',
  'AI-assisted automation, done responsibly',
  'Portfolio-ready framework capstone',
  'Lifetime access',
  'Certificate of completion',
];

const faqs = [
  { q: 'Do I need coding experience?', a: 'No prior automation experience is assumed. The bootcamp starts from the fundamentals and includes a dedicated TypeScript module, so you build the coding foundations as you go. Some familiarity with testing helps, but you do not need to be a developer.' },
  { q: 'Do I need Playwright experience?', a: 'No. Playwright is taught from installation and configuration upward, then built on across the whole programme.' },
  { q: 'Is this just watching tutorials?', a: 'No — that is the point. You build real automation through 12 hands-on labs and three practical projects, then prove it with a production-style framework you own.' },
  { q: 'Will I finish with something to show?', a: 'Yes. You finish with a portfolio-ready automation framework in a public GitHub repository — UI, API, CI/CD, reporting and a README — that you can genuinely link on your CV and talk through in an interview.' },
  { q: 'How is AI used on the course?', a: 'As an engineering tool, not a shortcut. You learn to use AI assistants to generate, debug and refactor, and — just as importantly — to review what they produce for hallucinations, weak assertions and security risks.' },
  { q: 'How long do I have access?', a: 'Lifetime access. Enrol once and revisit the modules, labs and resources whenever you need them.' },
  { q: 'Will I get a certificate?', a: 'Yes — the Inside STLC Academy Modern Test Automation Bootcamp Certificate of Completion, awarded when you finish the course activities. It is not an externally accredited qualification.' },
];

export default function ModernTestAutomationBootcampPage() {
  return (
    <div className="min-h-screen bg-navy-900 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }} />
      <SiteNav />

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-gold-500/15 border border-gold-500/30 rounded-full px-4 py-1.5 text-gold-400 text-sm font-semibold mb-8">
          Professional Edition
        </div>
        <p className="text-gold-500 font-semibold tracking-wide mb-4">MODERN TEST AUTOMATION BOOTCAMP</p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
          Stop following tutorials.<br />
          <span className="text-gold-500">Start building automation like an engineer.</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">{PAGE_DESCRIPTION}</p>
        <p className="text-base text-brand-300 max-w-3xl mx-auto mb-8">£199 · Lifetime access</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <EnrolButton slug={SLUG} label="START THE BOOTCAMP" />
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
        <h2 className="text-3xl font-bold text-center mb-4">Who This Bootcamp Is For</h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Built for testers ready to move into automation and engineers ready to modernise — and to walk away
          with evidence, not just a certificate.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
          <h2 className="text-3xl font-bold text-center mb-4">What You&rsquo;ll Be Able To Do</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Design, build, debug, maintain and integrate a production-style Playwright framework — with
            TypeScript, APIs, Git, CI/CD and AI.
          </p>
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
        <h2 className="text-3xl font-bold text-center mb-4">The 16-Module Curriculum</h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Sixteen modules that build from an engineering mindset to a complete, production-style automation
          framework.
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

      {/* Toolkit */}
      <section className="bg-white/5 border-y border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <h2 className="text-3xl font-bold text-center mb-4">The Modern Automation Toolkit</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            The exact stack real automation teams use today — learned together, the way they fit together in
            production.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {toolkit.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-navy-900 border border-white/10 rounded-xl p-6">
                <div className="w-11 h-11 bg-gold-500/15 rounded-xl flex items-center justify-center mb-4"><Icon className="w-5 h-5 text-gold-500" /></div>
                <h3 className="font-semibold text-lg mb-1">{title}</h3>
                <p className="text-gray-400 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The three projects */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-4">Three Real Projects</h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          You do not just read about automation — you build it three times, each one closer to the real thing.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          {projects.map(({ icon: Icon, tag, title, desc }) => (
            <div key={title} className="bg-white/5 border border-white/10 rounded-xl p-6">
              <div className="w-12 h-12 bg-brand-500/20 rounded-xl flex items-center justify-center mb-4"><Icon className="w-6 h-6 text-brand-400" /></div>
              <p className="text-xs uppercase tracking-wide text-gold-400 font-semibold mb-1">{tag}</p>
              <h3 className="font-semibold text-lg mb-2">{title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Portfolio & certificate */}
      <section className="bg-white/5 border-y border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Boxes className="w-6 h-6 text-gold-500" />
            <h2 className="text-3xl font-bold text-center">Portfolio &amp; Certificate</h2>
          </div>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            You finish with a public, portfolio-ready automation framework and a certificate — real evidence you
            can point an employer to.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-x-8 gap-y-3 max-w-4xl mx-auto mb-12">
            {portfolioOutputs.map((item) => (
              <div key={item} className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-brand-400 flex-shrink-0 mt-0.5" /><span className="text-gray-200">{item}</span></div>
            ))}
          </div>
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 bg-gold-500/15 border border-gold-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6"><Award className="w-8 h-8 text-gold-500" /></div>
            <h3 className="text-2xl font-bold mb-4">Earn Your Inside STLC Certificate</h3>
            <p className="text-gray-300 text-lg">
              Complete the modules, labs and projects to earn your Inside STLC Academy Modern Test Automation
              Bootcamp Certificate of Completion — with your name, completion date, and a unique certificate ID.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Pricing</h2>
        <div className="max-w-md mx-auto bg-white/5 border border-brand-400/30 rounded-2xl p-8">
          <div className="inline-flex items-center gap-2 bg-gold-500/15 border border-gold-500/30 rounded-full px-3 py-1 text-gold-400 text-xs font-semibold mb-4">
            Professional Level
          </div>
          <h3 className="text-xl font-bold mb-2">Modern Test Automation Bootcamp</h3>
          <div className="mb-1"><span className="text-5xl font-bold text-gold-500">£199</span></div>
          <p className="text-gray-400 text-sm mb-6">Lifetime access</p>
          <ul className="space-y-3 mb-8">
            {pricingIncludes.map((item) => (
              <li key={item} className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-brand-400 flex-shrink-0 mt-0.5" /><span className="text-gray-200">{item}</span></li>
            ))}
          </ul>
          <EnrolButton slug={SLUG} label="START THE BOOTCAMP"
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
        <div className="flex items-center justify-center gap-2 text-gold-500 mb-4"><Sparkles className="w-5 h-5" /><Bot className="w-5 h-5" /></div>
        <h2 className="text-3xl font-bold mb-4">Ready to build automation like an engineer?</h2>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          Join Inside STLC Academy and finish with a production-style Playwright framework you own — and can prove.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <EnrolButton slug={SLUG} label="START THE BOOTCAMP" />
          <Link href="#curriculum" className="border border-white/20 hover:border-white/40 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors">View Curriculum</Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
