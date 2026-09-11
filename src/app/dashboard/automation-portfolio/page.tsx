import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Card } from '@/components/ui/Card';
import {
  Github, FolderTree, FileText, ShieldCheck, CheckCircle2, FileBadge,
  Linkedin, Briefcase, MessagesSquare, Lightbulb,
} from 'lucide-react';

export const metadata = { title: 'Your Automation Portfolio — Inside STLC Academy' };

const repoStructure = [
  { path: 'tests/', desc: 'UI specs organised by feature, not one giant file.' },
  { path: 'tests/api/', desc: 'API tests using Playwright’s request context.' },
  { path: 'pages/', desc: 'Page objects that keep locators and actions out of the specs.' },
  { path: 'fixtures/', desc: 'Custom fixtures for auth, test data and shared setup.' },
  { path: 'utils/', desc: 'Small, well-named helpers — no dumping ground.' },
  { path: 'test-data/', desc: 'Data and factories the tests own and clean up.' },
  { path: 'playwright.config.ts', desc: 'Projects, reporters, retries and CI settings.' },
  { path: '.github/workflows/', desc: 'The GitHub Actions workflow that runs the suite.' },
  { path: 'README.md', desc: 'The front door: what it is, how to run it, how it is built.' },
];

const readmeSections = [
  'A one-line summary of what the framework tests and the stack it uses',
  'A short "why" — the problem the suite solves and the decisions behind its design',
  'Prerequisites and a copy-paste "getting started" (install, install browsers, run)',
  'The commands to run UI tests, API tests, a single test and the full suite',
  'A quick tour of the folder structure and where the important pieces live',
  'How reports, traces and screenshots are produced and where to find them',
  'A note on how CI runs the suite on every push',
];

const strongRepo = [
  'Reads as production code, not a tutorial dump — consistent structure and naming',
  'Separates concerns: specs, page objects, fixtures, data and utilities',
  'Has meaningful assertions, not just "the page loaded"',
  'Is reliable — web-first assertions and auto-waiting instead of hard-coded sleeps',
  'Runs green in CI with a visible status badge on the README',
  'Produces useful artefacts: an HTML report, traces and screenshots on failure',
  'Uses clear, incremental commits and, ideally, a pull request or two you can point to',
  'Includes a README a stranger could follow to clone and run it in minutes',
];

const cvPoints = [
  'List it as a personal / portfolio project, with the tech stack and a link to the repo.',
  'Lead with what you built and the outcome: "Built a production-style Playwright + TypeScript automation framework covering UI and API tests, running in CI on every push."',
  'Name the tools explicitly — Playwright, TypeScript, REST API testing, Git, GitHub Actions — so it matches what employers search for.',
  'Keep it honest: describe it as your own project and portfolio work, never as commercial or client delivery you have not done.',
];

const linkedinPoints = [
  'Add it under Projects (or Featured) with the repo link, not as a job entry.',
  'Write a short post walking through one thing you learned — flaky tests, CI, or API setup — and link the repo.',
  'Use plain language about scope: "a personal project to practise modern automation," so nobody reads it as paid work.',
  'Put the key tools in your skills section so they surface in searches.',
];

const applicationPoints = [
  'In a cover note or application form, point to the repo as evidence you can do the work, not just describe it.',
  'Map the framework to the job advert: if they want API testing or CI experience, name the module or file that shows it.',
  'Be specific and modest: "I built this to learn X" is more credible — and more honest — than implied experience.',
  'Make sure the repo is public and the README is current before you send the link.',
];

const interviewPoints = [
  'Be ready to give a two-minute tour: the structure, why you split things the way you did, and one trade-off you made.',
  'Have a "what went wrong" story ready — a flaky test you diagnosed, or a CI failure you fixed — with what you changed.',
  'Know your framework well enough to open a file live and explain it; it is your project, so there is nowhere to hide.',
  'Frame it truthfully as learning: what you would do differently next, and what you have not yet tackled.',
];

const audienceBlocks = [
  { icon: FileBadge, title: 'On your CV', points: cvPoints },
  { icon: Linkedin, title: 'On LinkedIn', points: linkedinPoints },
  { icon: Briefcase, title: 'In job applications', points: applicationPoints },
  { icon: MessagesSquare, title: 'In technical interviews', points: interviewPoints },
];

export default async function AutomationPortfolioPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <Github className="w-6 h-6 text-brand-600" />
        <h1 className="text-2xl font-bold text-navy-900">Your Automation Portfolio</h1>
      </div>
      <p className="text-gray-500 text-sm mb-8 max-w-2xl">
        Finishing the bootcamp is only half the value — the other half is the evidence you can show. This guide
        covers exactly what to publish on GitHub and how to talk about it honestly as a portfolio project.
      </p>

      {/* Honesty note */}
      <Card className="mb-8 border-amber-200 bg-amber-50">
        <div className="flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-gold-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-navy-900 mb-1">One rule: keep it honest</h3>
            <p className="text-sm text-gray-600">
              This is your work — a personal, portfolio project you can be proud of. Present it as exactly that.
              Never claim commercial or client experience you have not had. Genuine portfolio evidence, described
              truthfully, is far more convincing in an interview than an exaggeration you cannot back up.
            </p>
          </div>
        </div>
      </Card>

      {/* What to publish on GitHub */}
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-1">
          <FolderTree className="w-5 h-5 text-brand-600" />
          <h2 className="text-lg font-bold text-navy-900">What to publish on GitHub</h2>
        </div>
        <p className="text-sm text-gray-500 mb-5">
          Publish your capstone framework as a public repository. Aim for a structure a stranger could open and
          understand.
        </p>
        <Card>
          <h3 className="font-semibold text-gray-900 mb-3">A clear repository structure</h3>
          <ul className="space-y-2.5">
            {repoStructure.map(({ path, desc }) => (
              <li key={path} className="flex items-start gap-3 text-sm">
                <code className="flex-shrink-0 font-mono text-xs bg-gray-100 text-brand-700 rounded px-1.5 py-0.5">{path}</code>
                <span className="text-gray-600">{desc}</span>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      {/* README */}
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-1">
          <FileText className="w-5 h-5 text-brand-600" />
          <h2 className="text-lg font-bold text-navy-900">Write a README that does the selling</h2>
        </div>
        <p className="text-sm text-gray-500 mb-5">
          The README is the first — and sometimes only — thing a reviewer reads. Make it easy to understand and
          easy to run.
        </p>
        <Card>
          <ul className="space-y-2.5">
            {readmeSections.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm">
                <CheckCircle2 className="w-4 h-4 text-brand-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600">{item}</span>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      {/* CI badge */}
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-1">
          <ShieldCheck className="w-5 h-5 text-brand-600" />
          <h2 className="text-lg font-bold text-navy-900">Add a CI status badge</h2>
        </div>
        <p className="text-sm text-gray-500 mb-5">
          A green CI badge at the top of your README is instant, credible proof the suite really runs on every
          push.
        </p>
        <Card>
          <p className="text-sm text-gray-600 mb-3">
            Once your GitHub Actions workflow is running, add its badge to the very top of the README. GitHub
            generates the markdown for you: open the Actions tab, choose your workflow, and use the &ldquo;Create
            status badge&rdquo; option. It looks like this:
          </p>
          <pre className="overflow-x-auto rounded-lg bg-gray-900 text-gray-100 text-xs p-4">
            <code>{'![CI](https://github.com/<your-username>/<your-repo>/actions/workflows/<workflow-file>.yml/badge.svg)'}</code>
          </pre>
          <p className="text-sm text-gray-500 mt-3">
            Keep the badge honest too — only leave it visible while the suite genuinely passes.
          </p>
        </Card>
      </section>

      {/* What a strong repo contains */}
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-1">
          <CheckCircle2 className="w-5 h-5 text-brand-600" />
          <h2 className="text-lg font-bold text-navy-900">What a strong automation repo contains</h2>
        </div>
        <p className="text-sm text-gray-500 mb-5">
          Reviewers can tell the difference between a tutorial copy and real engineering in about thirty seconds.
          Aim for a repository that:
        </p>
        <Card>
          <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2.5">
            {strongRepo.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm">
                <CheckCircle2 className="w-4 h-4 text-brand-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600">{item}</span>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      {/* How to describe the work */}
      <section>
        <h2 className="text-lg font-bold text-navy-900 mb-1">How to describe the work</h2>
        <p className="text-sm text-gray-500 mb-5">
          The same project, framed appropriately for each place someone might see it — and always as your own
          portfolio work.
        </p>
        <div className="grid sm:grid-cols-2 gap-6">
          {audienceBlocks.map(({ icon: Icon, title, points }) => (
            <Card key={title} className="flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-9 h-9 flex-shrink-0 bg-brand-50 rounded-lg flex items-center justify-center">
                  <Icon className="w-4 h-4 text-brand-600" />
                </div>
                <h3 className="font-semibold text-gray-900">{title}</h3>
              </div>
              <ul className="space-y-2.5">
                {points.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-brand-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{p}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
