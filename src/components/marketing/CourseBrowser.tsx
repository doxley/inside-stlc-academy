'use client';

import { useState } from 'react';
import { CourseCard, type CourseCardProps } from './CourseCard';

export interface BrowserItem extends CourseCardProps {
  category: string;
}

export function CourseBrowser({ items, categories }: { items: BrowserItem[]; categories: string[] }) {
  const [active, setActive] = useState('All');
  const tabs = ['All', ...categories];
  const shown = active === 'All' ? items : items.filter((i) => i.category === active);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {tabs.map((t) => {
          const count = t === 'All' ? items.length : items.filter((i) => i.category === t).length;
          if (count === 0) return null;
          const isActive = active === t;
          return (
            <button
              key={t}
              onClick={() => setActive(t)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                isActive
                  ? 'bg-gold-500 text-navy-900 border-gold-500'
                  : 'border-white/15 text-gray-300 hover:border-white/40 hover:text-white'
              }`}
            >
              {t}
              <span className={`ml-1.5 ${isActive ? 'text-navy-900/60' : 'text-gray-500'}`}>{count}</span>
            </button>
          );
        })}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {shown.map((c) => (
          <CourseCard key={c.href} {...c} />
        ))}
      </div>
    </>
  );
}
