import type { MetadataRoute } from 'next';
import { COURSES } from '@/lib/courses';

const SITE = 'https://www.insidestlcacademy.com';

// Public, indexable pages only. Learner/admin/API areas are auth-gated and
// excluded here (and disallowed in robots.ts).
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: {
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  }[] = [
    { path: '/', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/services/cv-review', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/terms', priority: 0.3, changeFrequency: 'yearly' },
  ];

  const courseRoutes = COURSES.map((c) => ({
    path: c.route,
    priority: 0.9,
    changeFrequency: 'weekly' as const,
  }));

  return [...staticRoutes, ...courseRoutes].map((r) => ({
    url: `${SITE}${r.path}`,
    lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
