// Build resource pack files (DOCX + PDF) into public/resources/<course>/.
// Usage: node scripts/resources/build.mjs
import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { generateAll } from './lib.mjs';
import ninetyDayBatch1 from './content/90day-batch1.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..');

// Each entry: { course slug (output dir + manifest key), courseTitle, resources }
const JOBS = [
  {
    courseSlug: '90-day-software-testing-career-roadmap',
    courseTitle: '90-Day Software Testing Career Roadmap',
    resources: ninetyDayBatch1,
  },
];

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
