'use client';

import { useMemo, useState } from 'react';
import { Search, FileText, FileType, Library } from 'lucide-react';
import { VAULT_CATEGORIES, type VaultItem } from '@/lib/resourceVault';
import { cn } from '@/lib/utils';

interface Props {
  items: VaultItem[];
  courses: { slug: string; title: string }[];
}

export function ResourceVault({ items, courses }: Props) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>('all');
  const [course, setCourse] = useState<string>('all');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((it) => {
      if (category !== 'all' && it.category !== category) return false;
      if (course !== 'all' && it.courseSlug !== course) return false;
      if (!q) return true;
      return (
        it.title.toLowerCase().includes(q) ||
        (it.subtitle?.toLowerCase().includes(q) ?? false) ||
        it.category.toLowerCase().includes(q) ||
        it.courseTitle.toLowerCase().includes(q)
      );
    });
  }, [items, query, category, course]);

  // Group filtered items by category, preserving the defined display order.
  const grouped = useMemo(() => {
    const map = new Map<string, VaultItem[]>();
    for (const c of VAULT_CATEGORIES) map.set(c.key, []);
    for (const it of filtered) {
      if (!map.has(it.category)) map.set(it.category, []);
      map.get(it.category)!.push(it);
    }
    return [...map.entries()].filter(([, list]) => list.length > 0);
  }, [filtered]);

  const categoryMeta = (key: string) =>
    VAULT_CATEGORIES.find((c) => c.key === key) ?? { key, label: key, emoji: '📁' };

  return (
    <div>
      {/* Search */}
      <div className="relative mb-4">
        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search templates, checklists, prompts, cheat sheets…"
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500"
        />
      </div>

      {/* Category chips */}
      <div className="flex flex-wrap gap-2 mb-3">
        <Chip active={category === 'all'} onClick={() => setCategory('all')}>All</Chip>
        {VAULT_CATEGORIES.map((c) => (
          <Chip key={c.key} active={category === c.key} onClick={() => setCategory(c.key)}>
            <span className="mr-1">{c.emoji}</span>{c.label}
          </Chip>
        ))}
      </div>

      {/* Course filter */}
      {courses.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-6">
          <Chip subtle active={course === 'all'} onClick={() => setCourse('all')}>All courses</Chip>
          {courses.map((c) => (
            <Chip key={c.slug} subtle active={course === c.slug} onClick={() => setCourse(c.slug)}>
              {c.title}
            </Chip>
          ))}
        </div>
      )}

      <p className="text-xs text-gray-500 mb-6">
        {filtered.length} {filtered.length === 1 ? 'resource' : 'resources'}
      </p>

      {grouped.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
          <Library className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No resources match your search.</p>
        </div>
      ) : (
        <div className="space-y-10">
          {grouped.map(([cat, list]) => {
            const meta = categoryMeta(cat);
            return (
              <section key={cat}>
                <h2 className="text-lg font-bold text-navy-900 mb-4 flex items-center gap-2">
                  <span>{meta.emoji}</span>
                  {meta.label}
                  <span className="text-xs font-normal text-gray-400">({list.length})</span>
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {list.map((it) => (
                    <ResourceCard key={`${it.courseSlug}/${it.slug}`} item={it} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Chip({
  children,
  active,
  subtle,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  subtle?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'px-3 py-1.5 rounded-full text-xs font-medium border transition-colors',
        active
          ? subtle
            ? 'bg-navy-900 text-white border-navy-900'
            : 'bg-brand-600 text-white border-brand-600'
          : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:text-gray-900'
      )}
    >
      {children}
    </button>
  );
}

function ResourceCard({ item }: { item: VaultItem }) {
  return (
    <div className="flex flex-col bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md hover:border-gray-200 transition-all">
      <h3 className="font-semibold text-navy-900 text-sm leading-snug">{item.title}</h3>
      {item.subtitle && (
        <p className="text-xs text-gray-500 mt-1.5 leading-relaxed flex-1">{item.subtitle}</p>
      )}
      <p className="text-[11px] text-gray-400 mt-2 mb-3">{item.courseTitle}</p>
      <div className="flex gap-2 mt-auto">
        <a
          href={item.pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg bg-navy-900 text-white hover:bg-navy-800 transition-colors"
        >
          <FileText className="w-3.5 h-3.5" />PDF
        </a>
        <a
          href={item.docxUrl}
          download
          className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-medium px-3 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <FileType className="w-3.5 h-3.5" />DOCX
        </a>
      </div>
    </div>
  );
}
