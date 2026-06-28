import type { Metadata } from 'next';
import Link from 'next/link';
import {
  CheckCircle2,
  ClipboardList,
  Wrench,
  Boxes,
  Bot,
  Users,
  Award,
  Download,
  Sparkles,
  FlaskConical,
  FileCode2,
} from 'lucide-react';
import { SiteNav } from '@/components/marketing/SiteNav';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import { EnrolButton } from '@/components/marketing/EnrolButton';

const SLUG = 'practical-test-automation-playwright';

const PAGE_DESCRIPTION =
  'Master modern test automation from the ground up using Playwright, industry best practices, Page Object Models, BDD, Git, CI/CD and AI-assisted development.';

export const metadata: Metadata = {
  title: 'Practical Test Automation with Playwright | Inside STLC Academy',
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: 'Practical Test Automation with Playwright | Inside STLC Academy',
    description: PAGE_DESCRIPTION,
    type: 'website',
    siteName: 'Inside STLC Academy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Practical Test Automation with Playwright | Inside STLC Academy',
    description: PAGE_DESCRIPTION,
  },
};

const courseJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'Practical Test Automation with Playwright',
  description: PAGE_DESCRIPTION,
  provider: { '@type': 'Organization', name: 'Inside STLC Academy' },
  offers: { '@type': 'Offer', price: '149', priceCurrency: 'GBP', category: 'Professional Edition' },
};

const stats = [
  { value: '12', label: 'Modules' },
  { value: '60+', label: 'Lessons' },
  { value: '100+', label: 'Practical Exercises' },
  { value: 'Portfolio', label: 'Project' },
  { value: 'Certificate', label: 'Of Completion' },
];

const audience = [
  { icon: ClipboardList, title: 'Manual Testers', desc: 'Ready to move into automation.' },
  { icon: Wrench, title: 'Automation Engineers', desc: 'Wanting to improve framework design and maintainability.' },
  { icon: FlaskConical, title: 'QA Engineers', desc: 'Building automation alongside manual testing.' },
  { icon: FileCode2, title: 'Software Developers in Test (SDETs)', desc: 'Looking for modern Playwright practices.' },
  { icon: Users, title: 'QA Leads', desc: 'Building sustainable automation capability.' },
  { icon: Sparkles, title: 'Consultants', desc: 'Designing automation strategies for organisations.' },
];

const outcomes = [
  'Understand automation strategy',
  'Choose the correct tests to automate',
  'Write maintainable Playwright tests',
  'Create Page Object Models',
  'Write BDD feature files',
  'Build Step Definitions',
  'Design reusable automation frameworks',
  'Use Git professionally',
  'Integrate automation into CI/CD',
  'Build API automation',
  'Use AI to improve automation development',
  'Deliver production-ready automation projects',
];

interface ModuleData {
  n: number;
  title: string;
  lessons?: string[];
  practical?: string;
  downloads?: string[];
  aiPrompt?: string;
  knowledgeCheck?: string;
  projectIncludes?: string[];
}

const modules: ModuleData[] = [
  {
    n: 1,
    title: 'Automation Fundamentals',
    lessons: ['Why We Automate', 'What Should Be Automated', 'Test Automation Pyramid', 'ROI of Automation', 'Common Automation Failures', 'Building an Automation Mindset'],
    practical: 'Review twenty sample test cases and decide which should be automated.',
    downloads: ['Automation Decision Matrix', 'Automation Strategy Checklist'],
    knowledgeCheck: 'Reflection questions',
  },
  {
    n: 2,
    title: 'Behaviour Driven Development (BDD)',
    lessons: ['Introduction to BDD', 'Writing Good User Stories', 'Gherkin Syntax', 'Feature Files', 'Scenarios', 'Scenario Outlines', 'Examples Tables', 'Writing Readable Tests'],
    practical: 'Create feature files for Login, Checkout and Registration.',
    downloads: ['BDD Cheat Sheet', 'Feature File Template', 'Example Project'],
    aiPrompt: 'Review my Gherkin feature file for readability, ambiguity and missing scenarios.',
  },
  {
    n: 3,
    title: 'Step Definitions',
    lessons: ['Mapping Features', 'Given', 'When', 'Then', 'Parameterisation', 'Reusable Steps', 'Avoiding Duplicate Steps', 'Best Practices'],
    practical: 'Convert feature files into working step definitions.',
    downloads: ['Step Definition Template', 'Naming Standards', 'Coding Guidelines'],
  },
  {
    n: 4,
    title: 'Playwright Essentials',
    lessons: ['Installing Playwright', 'Project Structure', 'Running Tests', 'Locators', 'Assertions', 'Waiting Strategies', 'Fixtures', 'Configuration', 'Debugging', 'Trace Viewer'],
    practical: 'Build your first Playwright automation suite.',
    downloads: ['Starter Project', 'Completed Example', 'Locator Cheat Sheet'],
  },
  {
    n: 5,
    title: 'Page Object Model',
    lessons: ['Why POM Matters', 'Design Principles', 'Creating Page Classes', 'Methods vs Assertions', 'Reusable Components', 'Page Factory Concepts', 'Maintaining Page Objects'],
    practical: 'Create Page Objects for: Login, Dashboard, Shopping Basket, Checkout.',
    downloads: ['Blank POM Template', 'Completed Framework', 'Folder Structure Guide'],
    aiPrompt: 'Review this Page Object and improve maintainability.',
  },
  {
    n: 6,
    title: 'Test Data Management',
    lessons: ['Static Data', 'Dynamic Data', 'Random Data', 'Factories', 'JSON', 'CSV', 'Secrets', 'Environment Variables'],
    practical: 'Create reusable test data.',
    downloads: ['JSON Samples', 'CSV Samples', 'Random Data Helper'],
  },
  {
    n: 7,
    title: 'Framework Architecture',
    lessons: ['Folder Structure', 'Utilities', 'Helpers', 'Base Classes', 'Configuration', 'Logging', 'Reporting', 'Scalability'],
    practical: 'Refactor the framework into a reusable structure.',
    downloads: ['Framework Blueprint', 'Architecture Guide'],
  },
  {
    n: 8,
    title: 'API Automation',
    lessons: ['REST Basics', 'Authentication', 'Playwright API', 'Validation', 'Test Data Setup', 'Environment APIs'],
    practical: 'Automate a public REST API.',
    downloads: ['Postman Collection', 'Swagger Example', 'API Testing Guide'],
  },
  {
    n: 9,
    title: 'Git & CI/CD',
    lessons: ['Git Basics', 'Branches', 'Pull Requests', 'GitHub', 'GitHub Actions', 'Azure DevOps Concepts', 'Running Tests Automatically', 'Parallel Execution'],
    practical: 'Connect your framework to GitHub and execute automated tests using GitHub Actions.',
    downloads: ['Workflow Example', 'Git Cheat Sheet'],
  },
  {
    n: 10,
    title: 'AI Assisted Automation',
    lessons: ['Using Claude', 'Using ChatGPT', 'Prompt Engineering', 'Generating Tests', 'Generating Page Objects', 'Debugging', 'Code Reviews', 'Refactoring', 'Risks', 'Best Practice'],
    practical: 'Improve an automation framework using AI.',
    downloads: ['Prompt Library', 'Automation Prompt Pack'],
  },
  {
    n: 11,
    title: 'Framework Maintenance',
    lessons: ['Flaky Tests', 'Technical Debt', 'Code Reviews', 'Framework Refactoring', 'Reporting Improvements', 'Logging', 'Performance', 'Scalability'],
    practical: 'Refactor an intentionally poor framework.',
    downloads: ['Maintenance Checklist', 'Framework Review Guide'],
  },
  {
    n: 12,
    title: 'Portfolio Project',
    projectIncludes: ['BDD', 'Feature Files', 'Step Definitions', 'Playwright Tests', 'Page Objects', 'Utilities', 'Configuration', 'Reporting', 'GitHub Repository', 'CI Pipeline', 'README', 'Professional Documentation'],
    practical: 'Build an entire automation framework and submit a GitHub repository URL for self-review against the model solution.',
  },
];

const assessment = [
  'Module completion',
  'Practical exercises',
  'Knowledge checks',
  'Automation portfolio',
  'Final framework project',
  'Certificate',
];

const resourceVault = [
  'Automation Templates',
  'Framework Blueprint',
  'Page Object Template',
  'BDD Templates',
  'Feature File Templates',
  'Git Cheat Sheet',
  'Playwright Cheat Sheet',
  'Locator Cheat Sheet',
  'Assertion Cheat Sheet',
  'Reporting Guide',
  'Automation Strategy Template',
  'AI Prompt Library',
  'Framework Review Checklist',
  'CI/CD Checklist',
];

const pricingIncludes = [
  '12 Modules',
  '60+ Lessons',
  '100+ Practical Exercises',
  'Downloadable Templates',
  'AI Prompt Library',
  'Complete Framework Project',
  'Certificate',
];

const faqs = [
  { q: 'Do I need coding experience?', a: 'Basic programming knowledge is helpful, but the course starts from the fundamentals.' },
  { q: 'Do I need Playwright experience?', a: 'No.' },
  { q: 'Will I build a real framework?', a: 'Yes.' },
  { q: 'Will I create Page Object Models?', a: 'Yes.' },
  { q: 'Do we learn BDD?', a: 'Yes.' },
  { q: 'Will we use Git?', a: 'Yes.' },
  { q: 'Do we cover CI/CD?', a: 'Yes.' },
  { q: 'Will AI be included?', a: 'Yes, every module contains AI Prompt Packs.' },
];

export default function PlaywrightCoursePage() {
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
          Build Production-Ready<br />
          <span className="text-gold-500">Test Automation Frameworks</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-4">
          Master modern test automation from the ground up using Playwright, industry best practices,
          Page Object Models, BDD, Git, CI/CD and AI-assisted development.
        </p>
        <p className="text-base text-brand-300 max-w-3xl mx-auto mb-10">
          Learn through structured written lessons, practical coding exercises, downloadable
          templates, AI prompt packs, and a complete portfolio project.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <EnrolButton slug={SLUG} />
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
        <h2 className="text-3xl font-bold text-center mb-12">Who This Course Is For</h2>
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

      {/* 3. Learning Outcomes */}
      <section className="bg-white/5 border-y border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <h2 className="text-3xl font-bold text-center mb-4">Learning Outcomes</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">By the end of this course you will be able to:</p>
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

      {/* 4. Curriculum */}
      <section id="curriculum" className="max-w-6xl mx-auto px-4 sm:px-6 py-20 scroll-mt-20">
        <h2 className="text-3xl font-bold text-center mb-4">Course Curriculum</h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          12 modules of guided written lessons, practical coding exercises, downloads, AI prompt
          packs and knowledge checks — building to a complete portfolio framework.
        </p>
        <div className="space-y-4">
          {modules.map((m) => (
            <details key={m.n} className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden">
              <summary className="flex items-center gap-4 p-5 cursor-pointer list-none">
                <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-brand-500/20 text-brand-300 font-bold flex items-center justify-center">
                  {m.n}
                </span>
                <h3 className="font-semibold flex-1">
                  Module {m.n}: <span className="text-gold-400">{m.title}</span>
                </h3>
                <span className="text-brand-400 text-2xl leading-none transition-transform group-open:rotate-45">+</span>
              </summary>

              <div className="px-5 pb-5 pt-1 space-y-5 border-t border-white/10">
                {m.lessons && (
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-500 mb-2 mt-4">Lessons</p>
                    <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5">
                      {m.lessons.map((l) => (
                        <div key={l} className="flex items-start gap-2 text-sm text-gray-300">
                          <CheckCircle2 className="w-4 h-4 text-brand-400/70 flex-shrink-0 mt-0.5" />{l}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {m.projectIncludes && (
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-500 mb-2 mt-4">Project includes</p>
                    <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5">
                      {m.projectIncludes.map((l) => (
                        <div key={l} className="flex items-start gap-2 text-sm text-gray-300">
                          <CheckCircle2 className="w-4 h-4 text-brand-400/70 flex-shrink-0 mt-0.5" />{l}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {m.practical && (
                  <div className="flex items-start gap-3 bg-brand-500/10 border border-brand-400/20 rounded-lg p-4">
                    <ClipboardList className="w-5 h-5 text-brand-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-brand-300">Practical Activity</p>
                      <p className="text-sm text-gray-300 mt-0.5">{m.practical}</p>
                    </div>
                  </div>
                )}

                {m.downloads && (
                  <div className="flex flex-wrap gap-2">
                    {m.downloads.map((d) => (
                      <span key={d} className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 text-gray-300 text-xs px-3 py-1.5 rounded-full">
                        <Download className="w-3 h-3 text-brand-400" />{d}
                      </span>
                    ))}
                  </div>
                )}

                {m.aiPrompt && (
                  <div className="flex items-start gap-3 bg-gold-500/10 border border-gold-500/20 rounded-lg p-4">
                    <Bot className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-gold-300">AI Prompt Pack</p>
                      <p className="text-sm text-gray-300 mt-0.5 italic">&ldquo;{m.aiPrompt}&rdquo;</p>
                    </div>
                  </div>
                )}

                {m.knowledgeCheck && (
                  <p className="text-sm text-gray-400"><span className="font-semibold text-gray-300">Knowledge Check:</span> {m.knowledgeCheck}</p>
                )}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* 5. Assessment */}
      <section className="bg-white/5 border-y border-white/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20">
          <h2 className="text-3xl font-bold text-center mb-4">How You Will Be Assessed</h2>
          <p className="text-gray-400 text-center mb-12">This course is practical — there is no traditional exam.</p>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
            {assessment.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-200">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Resource Vault */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Boxes className="w-6 h-6 text-gold-500" />
          <h2 className="text-3xl font-bold text-center">Resource Vault</h2>
        </div>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Every template, cheat sheet and checklist you need to build automation frameworks like a
          professional.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {resourceVault.map((r) => (
            <div key={r} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="w-9 h-9 flex-shrink-0 bg-brand-500/20 rounded-lg flex items-center justify-center">
                <Download className="w-4 h-4 text-brand-400" />
              </div>
              <span className="text-sm font-medium text-gray-200">{r}</span>
            </div>
          ))}
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
            Complete the modules, practical exercises and final framework project to earn your Inside
            STLC Academy Certificate of Completion for Practical Test Automation with Playwright —
            with your name, completion date, and a unique certificate ID.
          </p>
        </div>
      </section>

      {/* 8. Pricing */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Pricing</h2>
        <div className="max-w-md mx-auto bg-white/5 border border-brand-400/30 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-center mb-2">Practical Test Automation with Playwright</h3>
          <div className="text-center mb-6"><span className="text-5xl font-bold text-gold-500">£149</span></div>
          <ul className="space-y-3 mb-8">
            {pricingIncludes.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-200">{item}</span>
              </li>
            ))}
          </ul>
          <EnrolButton slug={SLUG} containerClassName="flex w-full" className="block w-full text-center bg-brand-500 hover:bg-brand-600 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed" />
        </div>
      </section>

      {/* 9. FAQ */}
      <section className="bg-white/5 border-y border-white/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map(({ q, a }) => (
              <details key={q} className="group bg-navy-900 border border-white/10 rounded-xl p-5 [&_summary]:cursor-pointer">
                <summary className="flex items-center justify-between gap-4 font-semibold list-none">
                  {q}
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
        <h2 className="text-3xl font-bold mb-4">Build automation frameworks that last</h2>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          Join Inside STLC Academy and ship production-ready Playwright automation with confidence.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <EnrolButton slug={SLUG} />
          <Link href="#curriculum" className="border border-white/20 hover:border-white/40 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors">
            View Curriculum
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
