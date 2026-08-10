import type { Metadata } from 'next';
import Link from 'next/link';
import {
  CheckCircle2, Award, Users, Compass, ShieldAlert, GaugeCircle, Bot, Workflow,
  Boxes, ClipboardList, Target, TrendingUp, MessageSquare, UserCog, Layers, Wrench,
} from 'lucide-react';
import { SiteNav } from '@/components/marketing/SiteNav';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import { EnrolButton } from '@/components/marketing/EnrolButton';

const PAGE_DESCRIPTION =
  'A practical QA leadership programme for Test Leads, QA Managers and experienced testers who want to build high-performing teams, create effective quality strategies and influence engineering organisations at leadership level.';

export const metadata: Metadata = {
  title: 'QA Leadership Academy | Inside STLC Academy',
  description: PAGE_DESCRIPTION,
  openGraph: { title: 'QA Leadership Academy | Inside STLC Academy', description: PAGE_DESCRIPTION, type: 'website', siteName: 'Inside STLC Academy' },
  twitter: { card: 'summary_large_image', title: 'QA Leadership Academy | Inside STLC Academy', description: PAGE_DESCRIPTION },
};

const courseJsonLd = {
  '@context': 'https://schema.org', '@type': 'Course', name: 'QA Leadership Academy', description: PAGE_DESCRIPTION,
  provider: { '@type': 'Organization', name: 'Inside STLC Academy' },
  offers: { '@type': 'Offer', price: '199', priceCurrency: 'GBP', category: 'Leadership Edition' },
};

const stats = [
  { value: '12', label: 'Modules' },
  { value: '60+', label: 'Deep-Dive Lessons' },
  { value: '12', label: 'Leadership Assignments' },
  { value: '30+', label: 'Templates & Tools' },
  { value: 'Portfolio', label: 'QA Transformation' },
  { value: 'Certificate', label: 'Of Completion' },
];

const audience = [
  { icon: UserCog, title: 'Test & QA Leads', desc: 'Making the step from running testing to leading quality across teams.' },
  { icon: Users, title: 'Test & QA Managers', desc: 'Modernising an existing QA function and proving its value to the business.' },
  { icon: Workflow, title: 'Automation Leads & SDETs', desc: 'Moving from building frameworks to setting technical quality direction.' },
  { icon: Target, title: 'Senior Testers', desc: 'Experienced testers preparing for their first leadership role.' },
  { icon: Layers, title: 'Engineering Managers', desc: 'Owning quality outcomes and wanting a defensible QA operating model.' },
  { icon: Compass, title: 'Aspiring Heads of QA', desc: 'Building the strategic toolkit to lead quality at organisational level.' },
];

const problems = [
  'Regression takes days and everyone blames QA for slow releases',
  'Automation is unreliable, expensive to maintain, and nobody quite trusts it',
  'Leadership asks for "more automation" without a clear problem to solve',
  'QA is pulled in late, then held accountable for defects it never had a chance to prevent',
  'Metrics count test cases and bugs, but say nothing about real risk or customer impact',
  'There is no agreed QA strategy — every squad does something different',
  'You are expected to hire, but have no structured, bias-aware process',
  'AI is creeping into the team informally, with no governance or accountability',
];

const outcomes = [
  'Assess the current state of quality in any organisation',
  'Identify the biggest quality risks and where to invest',
  'Decide what QA should own and what engineering should own',
  'Build a QA strategy tied to business and product risk',
  'Design QA capability around risk — not a wish-list of specialists',
  'Run a structured, bias-aware hiring process',
  'Decide what to automate, what not to, and who owns it',
  'Set an AI adoption strategy with real governance',
  'Choose metrics leadership actually needs to see',
  'Communicate residual risk so the business can make informed release calls',
  'Coach, develop and hold a QA team accountable',
  'Build a 30/60/90-day and 12-month QA transformation roadmap',
];

const modules = [
  { n: 1, title: 'From Tester to QA Leader', desc: 'The shift from executing testing to leading quality: leadership mindset, delegation, technical credibility, managing quality risk, and your first 30 days.' },
  { n: 2, title: 'Assessing QA Maturity & Capability', desc: 'Diagnose the current state across people, process, technology and culture; map the SDLC, find bottlenecks and produce a QA maturity assessment.' },
  { n: 3, title: 'Building High-Performing QA Teams', desc: 'Design QA capability around organisational risk: roles vs skills, skills matrices, capability gaps, developing testers and career progression.' },
  { n: 4, title: 'Hiring Great Testers', desc: 'Define the role you actually need, write better job descriptions, design structured interviews and scorecards, avoid bias, decide and onboard.' },
  { n: 5, title: 'QA Strategy', desc: 'What a QA strategy really is: business and product risk, quality objectives, test levels, environments, test data, quality gates and communication.' },
  { n: 6, title: 'Risk-Based Quality Leadership', desc: 'Product risk, probability vs impact, risk workshops, risk-based release decisions, and communicating residual risk to accountable stakeholders.' },
  { n: 7, title: 'Metrics That Actually Matter', desc: 'Why QA metrics go wrong, leading vs lagging indicators, meaningful signals, executive dashboards and telling the quality story to leadership.' },
  { n: 8, title: 'Automation Strategy for QA Leaders', desc: 'Not a coding module: why automation programmes fail, what to automate and what not to, ownership, ROI and building an automation roadmap.' },
  { n: 9, title: 'AI Strategy for QA Leaders', desc: 'Where AI actually helps QA, governance, data privacy, human-in-the-loop accountability, measuring value and a pragmatic adoption roadmap.' },
  { n: 10, title: 'Stakeholder Management & Influence', desc: 'Communicating with engineering, product, delivery and executives; challenging deadlines, handling conflict and influencing without authority.' },
  { n: 11, title: 'Coaching, Performance & Difficult Conversations', desc: 'Coaching vs managing, effective feedback, performance conversations, developing high performers and handling underperformance.' },
  { n: 12, title: 'Building the QA Transformation Roadmap', desc: 'The capstone: bring the strategy together, prioritise quick wins vs structural change, build the business case and create 30/60/90-day and 12-month roadmaps.' },
];

const toolkit = [
  { icon: ClipboardList, title: 'Assessment Tools', desc: 'QA maturity assessment, capability heatmap and current-state templates you can run on a real function.' },
  { icon: Target, title: 'Strategy Tools', desc: 'QA strategy template, quality objectives worksheet and quality-gate decision matrix.' },
  { icon: ShieldAlert, title: 'Risk Tools', desc: 'Product risk matrix, release risk assessment and go/no-go decision template.' },
  { icon: GaugeCircle, title: 'Metrics Tools', desc: 'Metrics catalogue, executive dashboard, metric-definition template and quality health scorecard.' },
  { icon: Wrench, title: 'Automation & AI Tools', desc: 'Automation candidate matrix, ROI worksheet, AI use-case matrix, AI governance checklist and adoption roadmap.' },
  { icon: UserCog, title: 'People Tools', desc: 'Skills matrix, hiring pack, interview scorecards, 1:1 and coaching templates and development plans.' },
];

const portfolioOutputs = [
  'QA Current-State Assessment', 'QA Maturity Assessment', 'Quality Risk Profile',
  'QA Strategy v1', 'Team Capability Development Plan', 'QA Hiring Pack',
  'Automation Strategy', 'QA AI Strategy', 'Quality Metrics Framework',
  'People Development Framework', 'Stakeholder Communication Plan', '30/60/90-Day & 12-Month Roadmap',
];

const capstoneItems = [
  'Executive Summary', 'Current-State QA Assessment', 'QA Maturity Assessment',
  'Quality Risk Profile', 'QA Strategy', 'Team Capability Assessment', 'Skills Matrix',
  'Hiring / Capability Recommendations', 'Automation Strategy', 'AI Adoption Strategy',
  'Metrics Framework', 'Stakeholder Communication Plan', '30/60/90-Day Plan',
  '12-Month Transformation Roadmap', 'Executive Presentation',
];

const assessmentLevels = [
  { icon: CheckCircle2, title: 'Knowledge Checks', desc: 'Short checks that test judgement, not recall — the kind of decision a QA leader makes under real constraints.' },
  { icon: Compass, title: 'Decision Scenarios', desc: 'Ambiguous leadership situations with strong, acceptable and weak responses — and the trade-offs that separate them.' },
  { icon: Boxes, title: 'Professional Assignments', desc: 'Every module produces a real artefact, assessed against a rubric covering business alignment, risk, clarity and communication.' },
];

const pricingIncludes = [
  '12 modules · 60+ deep-dive lessons',
  '12 leadership assignments with rubrics',
  'Decision scenarios throughout',
  '30+ professional templates & tools',
  'The Northstar Digital running case study',
  'QA Transformation Portfolio',
  'Final capstone project',
  'Certificate of completion',
];

const faqs = [
  { q: 'Is this a beginners’ course?', a: 'No. It assumes you already understand software testing, test cases and Agile. It is built for people responsible — or preparing to be responsible — for quality at team or organisational level, and focuses on leadership judgement, strategy, tools and real-world application.' },
  { q: 'Do I need to be a manager already?', a: 'No. It suits senior testers, test leads, automation leads and SDETs preparing for a first leadership role, as well as existing managers who want to modernise their QA function.' },
  { q: 'Is this a management-skills course?', a: 'It is a QA leadership programme, not generic management training. You will cover people leadership where it matters — hiring, coaching, difficult conversations — but always applied to leading a quality function.' },
  { q: 'Will I finish with something tangible?', a: 'Yes. Every module produces a professional artefact, and the capstone assembles them into a complete QA Transformation Portfolio you could genuinely discuss in a QA Lead or Test Manager interview.' },
  { q: 'Is it tied to one methodology or tool?', a: 'No. It is deliberately tool- and vendor-neutral. Named technologies appear only to illustrate a concept, and the programme is explicit that no single QA operating model fits every organisation.' },
  { q: 'Will I get a certificate?', a: 'Yes — the Inside STLC Academy QA Leadership Academy Certificate of Completion, awarded when you finish the course activities. It is not an externally accredited qualification.' },
];

export default function QaLeadershipAcademyPage() {
  return (
    <div className="min-h-screen bg-navy-900 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }} />
      <SiteNav />

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-gold-500/15 border border-gold-500/30 rounded-full px-4 py-1.5 text-gold-400 text-sm font-semibold mb-8">
          Leadership Edition
        </div>
        <p className="text-gold-500 font-semibold tracking-wide mb-4">STOP MANAGING TESTING. START LEADING QUALITY.</p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
          Lead Quality. Build Better Teams.<br />
          <span className="text-gold-500">Influence the Business.</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-4">{PAGE_DESCRIPTION}</p>
        <p className="text-base text-brand-300 max-w-3xl mx-auto mb-10">
          Learn how to build QA strategy, develop teams, manage risk, create meaningful metrics, lead
          automation and AI adoption, influence stakeholders, and build a quality function that supports
          faster, safer delivery.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <EnrolButton slug="qa-leadership-academy" label="Enrol Now" />
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
          A practical professional development programme for people responsible — or preparing to become
          responsible — for quality at organisational level. It assumes you already know how to test.
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

      {/* Problems this solves */}
      <section className="bg-white/5 border-y border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <h2 className="text-3xl font-bold text-center mb-4">Problems This Programme Solves</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            If any of these sound familiar, this programme gives you the frameworks and tools to fix them.
          </p>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4 max-w-4xl mx-auto">
            {problems.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-200">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning outcomes */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">What You Will Be Able To Do</h2>
        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4 max-w-4xl mx-auto">
          {outcomes.map((item) => (
            <div key={item} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-brand-400 flex-shrink-0 mt-0.5" />
              <span className="text-gray-200">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Curriculum */}
      <section id="curriculum" className="bg-white/5 border-y border-white/10 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <h2 className="text-3xl font-bold text-center mb-4">The 12-Module Curriculum</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Twelve modules that build from your first 30 days as a leader to a full QA transformation roadmap.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {modules.map(({ n, title, desc }) => (
              <div key={n} className="flex items-start gap-4 bg-navy-900 border border-white/10 rounded-xl p-5">
                <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-brand-500/20 text-brand-300 font-bold flex items-center justify-center">{n}</span>
                <div>
                  <h3 className="font-semibold mb-1">Module {n}: <span className="text-gold-400">{title}</span></h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional toolkit */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-4">A Professional QA Leadership Toolkit</h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          30+ real working tools you can adapt at work — not empty branded worksheets. Each includes purpose,
          instructions, a worked example and a reusable blank version.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {toolkit.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white/5 border border-white/10 rounded-xl p-6">
              <div className="w-11 h-11 bg-gold-500/15 rounded-xl flex items-center justify-center mb-4"><Icon className="w-5 h-5 text-gold-500" /></div>
              <h3 className="font-semibold text-lg mb-1">{title}</h3>
              <p className="text-gray-400 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Portfolio outputs */}
      <section className="bg-white/5 border-y border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <h2 className="text-3xl font-bold text-center mb-4">Portfolio Outputs</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            You finish with tangible professional outputs — not just a certificate. Every module contributes an
            artefact to your QA Transformation Portfolio.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3 max-w-4xl mx-auto">
            {portfolioOutputs.map((item) => (
              <div key={item} className="flex items-start gap-3"><Boxes className="w-5 h-5 text-brand-400 flex-shrink-0 mt-0.5" /><span className="text-gray-200">{item}</span></div>
            ))}
          </div>
        </div>
      </section>

      {/* Final transformation project */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="bg-gradient-to-br from-brand-500/10 to-gold-500/10 border border-brand-400/30 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-4"><TrendingUp className="w-6 h-6 text-gold-500" /><h3 className="text-2xl font-bold">The Final Transformation Project</h3></div>
          <p className="text-gray-300 mb-6">
            You are appointed Head of QA for Northstar Digital — a growing digital organisation with rising
            production defects, unreliable automation, no agreed strategy and a board demanding faster, safer
            releases. Across the programme you build a complete QA transformation:
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3">
            {capstoneItems.map((item) => (
              <div key={item} className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-brand-400 flex-shrink-0 mt-0.5" /><span className="text-gray-200">{item}</span></div>
            ))}
          </div>
        </div>
      </section>

      {/* How assessment works */}
      <section className="bg-white/5 border-y border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <h2 className="text-3xl font-bold text-center mb-4">How Assessment Works</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Leadership cannot be assessed by multiple-choice alone. This programme uses three layers — and treats
            leadership judgement as nuanced, not as one absolute right answer.
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {assessmentLevels.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-navy-900 border border-white/10 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-brand-500/20 rounded-xl flex items-center justify-center mx-auto mb-4"><Icon className="w-6 h-6 text-brand-400" /></div>
                <h3 className="font-semibold mb-2">{title}</h3>
                <p className="text-gray-400 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificate */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-20 text-center">
        <div className="w-16 h-16 bg-gold-500/15 border border-gold-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6"><Award className="w-8 h-8 text-gold-500" /></div>
        <h2 className="text-3xl font-bold mb-4">Earn Your Inside STLC Certificate</h2>
        <p className="text-gray-300 text-lg">Complete the course activities to earn your Inside STLC Academy – QA Leadership Academy Certificate of Completion.</p>
      </section>

      {/* Pricing */}
      <section className="bg-white/5 border-y border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <h2 className="text-3xl font-bold text-center mb-12">Pricing</h2>
          <div className="max-w-md mx-auto bg-navy-900 border border-brand-400/30 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-center mb-2">QA Leadership Academy</h3>
            <div className="text-center mb-6"><span className="text-5xl font-bold text-gold-500">£199</span></div>
            <ul className="space-y-3 mb-8">
              {pricingIncludes.map((item) => (
                <li key={item} className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-brand-400 flex-shrink-0 mt-0.5" /><span className="text-gray-200">{item}</span></li>
              ))}
            </ul>
            <EnrolButton slug="qa-leadership-academy" label="Enrol Now"
              containerClassName="flex w-full"
              className="block w-full text-center bg-brand-500 hover:bg-brand-600 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed" />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map(({ q, a }) => (
            <details key={q} className="group bg-white/5 border border-white/10 rounded-xl p-5 [&_summary]:cursor-pointer">
              <summary className="flex items-center justify-between gap-4 font-semibold list-none">{q}
                <span className="text-brand-400 transition-transform group-open:rotate-45 text-2xl leading-none">+</span>
              </summary>
              <p className="text-gray-400 text-sm mt-3 leading-relaxed">{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-white/5 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 text-center">
          <div className="flex items-center justify-center gap-2 text-gold-500 mb-4"><MessageSquare className="w-5 h-5" /><Bot className="w-5 h-5" /></div>
          <h2 className="text-3xl font-bold mb-4">Ready to lead quality, not just manage testing?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">Join Inside STLC Academy and finish with a QA leadership operating toolkit and a complete transformation portfolio.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <EnrolButton slug="qa-leadership-academy" label="Enrol Now" />
            <Link href="#curriculum" className="border border-white/20 hover:border-white/40 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors">View Curriculum</Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
