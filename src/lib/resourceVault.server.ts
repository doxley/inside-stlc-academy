import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import type { VaultItem } from './resourceVault';

interface ManifestItem {
  slug: string;
  title: string;
  subtitle?: string;
  category: string;
  docx: string;
  pdf: string;
}

type Manifest = Record<string, { courseTitle: string; items: ManifestItem[] }>;

/** Read the generated resource manifest and flatten it into a single list of vault items. */
export async function loadVaultItems(): Promise<VaultItem[]> {
  let manifest: Manifest;
  try {
    const raw = await readFile(join(process.cwd(), 'public', 'resources', 'manifest.json'), 'utf8');
    manifest = JSON.parse(raw) as Manifest;
  } catch {
    return [];
  }

  const items: VaultItem[] = [];
  for (const [courseSlug, course] of Object.entries(manifest)) {
    for (const it of course.items) {
      items.push({
        slug: it.slug,
        title: it.title,
        subtitle: it.subtitle,
        category: it.category,
        courseSlug,
        courseTitle: course.courseTitle,
        docxUrl: `/resources/${courseSlug}/${it.docx}`,
        pdfUrl: `/resources/${courseSlug}/${it.pdf}`,
      });
    }
  }
  return items;
}
