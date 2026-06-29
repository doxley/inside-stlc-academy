// Build resource pack files (DOCX + PDF) into public/resources/<course>/.
// Usage: node scripts/resources/build.mjs
import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { generateAll } from './lib.mjs';
import ninetyDayBatch1 from './content/90day-batch1.mjs';
import ninetyDayBatch2 from './content/90day-batch2.mjs';
import ninetyDayBatch3 from './content/90day-batch3.mjs';
import ninetyDayBatch4 from './content/90day-batch4.mjs';
import aiBatch1 from './content/ai-batch1.mjs';
import aiBatch2 from './content/ai-batch2.mjs';
import aiBatch3 from './content/ai-batch3.mjs';
import aiBatch4 from './content/ai-batch4.mjs';
import careerBatch1 from './content/career-batch1.mjs';
import careerBatch2 from './content/career-batch2.mjs';
import careerBatch3 from './content/career-batch3.mjs';
import automationBatch1 from './content/automation-batch1.mjs';
import automationBatch2 from './content/automation-batch2.mjs';
import automationBatch3 from './content/automation-batch3.mjs';
import automationBatch4 from './content/automation-batch4.mjs';
import briefs90day from './content/briefs-90day.mjs';
import briefsAi from './content/briefs-ai.mjs';
import briefsQa from './content/briefs-qa.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..');

// All batches per course. The manifest merges by slug, so to regenerate
// just one course, set ONLY_COURSE to its slug (skips re-rendering others).
const ALL_JOBS = [
  {
    courseSlug: '90-day-software-testing-career-roadmap',
    courseTitle: '90-Day Software Testing Career Roadmap',
    resources: [...ninetyDayBatch1, ...ninetyDayBatch2, ...ninetyDayBatch3, ...ninetyDayBatch4, ...briefs90day],
  },
  {
    courseSlug: 'ai-for-qa-testers',
    courseTitle: 'AI for QA Testers',
    resources: [...aiBatch1, ...aiBatch2, ...aiBatch3, ...aiBatch4, ...briefsAi],
  },
  {
    courseSlug: 'qa-interview-accelerator',
    courseTitle: 'QA Interview Accelerator',
    resources: [...careerBatch1, ...careerBatch2, ...careerBatch3, ...briefsQa],
  },
  {
    courseSlug: 'practical-test-automation-playwright',
    courseTitle: 'Practical Test Automation with Playwright',
    resources: [...automationBatch1, ...automationBatch2, ...automationBatch3, ...automationBatch4],
  },
];

const ONLY_COURSE = process.env.ONLY_COURSE || '';
const JOBS = ONLY_COURSE ? ALL_JOBS.filter((j) => j.courseSlug === ONLY_COURSE) : ALL_JOBS;

const manifestPath = join(ROOT, 'public', 'resources', 'manifest.json');
const manifest = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, 'utf8')) : {};

for (const job of JOBS) {
  console.log(`\n${job.courseTitle}`);
  const items = await generateAll(job.resources, `public/resources/${job.courseSlug}`);
  const existing = manifest[job.courseSlug]?.items ?? [];
  const bySlug = new Map(existing.map((i) => [i.slug, i]));
  for (const it of items) bySlug.set(it.slug, it);
  manifest[job.courseSlug] = { courseTitle: job.courseTitle, items: [...bySlug.values()] };
}

mkdirSync(dirname(manifestPath), { recursive: true });
writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log('\nmanifest.json updated');
