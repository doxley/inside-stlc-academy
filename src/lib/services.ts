// ─────────────────────────────────────────────────────────────
// Paid services catalogue (non-course products, e.g. CV Review).
// Amounts are in the smallest currency unit (pence).
// ─────────────────────────────────────────────────────────────

import type { CourseCategory } from './courses';

export interface ServiceConfig {
  slug: string;
  title: string;
  /** Catalogue category (shared taxonomy with courses). */
  category: CourseCategory;
  priceLabel: string;
  amount: number;
  currency: string;
  route: string;
  /** Express add-on (faster turnaround). */
  expressAmount: number;
  expressLabel: string;
  /** "We amend it for you" add-on, offered after the initial review. */
  amendAmount: number;
  amendLabel: string;
  /** Standard / express turnaround in hours. */
  turnaroundHours: number;
  expressHours: number;
}

export const CV_REVIEW: ServiceConfig = {
  slug: 'cv-review',
  title: 'CV Review',
  category: 'Career & Job Search',
  priceLabel: '£49',
  amount: 4900,
  currency: 'gbp',
  route: '/services/cv-review',
  expressAmount: 2900,
  expressLabel: '£29',
  amendAmount: 3900,
  amendLabel: '£39',
  turnaroundHours: 48,
  expressHours: 24,
};

export const SERVICES: ServiceConfig[] = [CV_REVIEW];

export function getServiceConfig(slug: string): ServiceConfig | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

/** Current published Terms version — recorded against each purchase. */
export const TERMS_VERSION = '2026-11-03';
