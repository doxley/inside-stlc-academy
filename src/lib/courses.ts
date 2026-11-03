// ─────────────────────────────────────────────────────────────
// Course catalogue — single source of truth for sellable courses.
// Slugs MUST match the public route (/course/<slug>) and the
// `slug` column in the Supabase `courses` table.
// ─────────────────────────────────────────────────────────────

// Catalogue categories — shared by courses and services; drives the homepage
// filter bar (order matters). Add a new category here, then tag items with it.
export type CourseCategory =
  | 'Get Started'
  | 'Automation & Technical'
  | 'AI for QA'
  | 'Certification'
  | 'Career & Job Search';

export const CATEGORY_ORDER: CourseCategory[] = [
  'Get Started',
  'Automation & Technical',
  'AI for QA',
  'Certification',
  'Career & Job Search',
];

export interface CourseConfig {
  slug: string;
  title: string;
  /** Catalogue category (for grouping/filtering in the UI). */
  category: CourseCategory;
  /** Display price, e.g. "£99". */
  priceLabel: string;
  /** Amount charged, in the smallest currency unit (pence). */
  amount: number;
  currency: string;
  /**
   * Optional pre-created Stripe Price ID (recommended for production).
   * When set, Checkout uses it directly; otherwise an inline price is
   * created from `amount`/`currency`/`title` so checkout works without
   * pre-creating products. Set via env so secrets stay out of source.
   */
  stripePriceId?: string;
  /** Optional launch/promotional price label, e.g. "£149" (full price shown struck through). */
  promoPriceLabel?: string;
  /** Launch/promotional amount in pence, charged when launchActive is true. */
  promoAmount?: number;
  /** When true, the launch price above is the active (charged & displayed) price. */
  launchActive?: boolean;
  route: string;
}

export const COURSES: CourseConfig[] = [
  {
    slug: '90-day-software-testing-career-roadmap',
    category: 'Get Started',
    title: '90-Day Software Testing Career Roadmap',
    priceLabel: '£99',
    amount: 9900,
    currency: 'gbp',
    stripePriceId: process.env.STRIPE_PRICE_90_DAY,
    route: '/course/90-day-software-testing-career-roadmap',
  },
  {
    slug: 'ai-for-qa-testers',
    category: 'AI for QA',
    title: 'AI for QA Testers',
    priceLabel: '£99',
    amount: 9900,
    currency: 'gbp',
    stripePriceId: process.env.STRIPE_PRICE_AI_QA,
    route: '/course/ai-for-qa-testers',
  },
  {
    slug: 'qa-interview-accelerator',
    category: 'Career & Job Search',
    title: 'QA Interview Accelerator',
    priceLabel: '£49',
    amount: 4900,
    currency: 'gbp',
    stripePriceId: process.env.STRIPE_PRICE_QA_INTERVIEW,
    route: '/course/qa-interview-accelerator',
  },
  {
    slug: 'practical-test-automation-playwright',
    category: 'Automation & Technical',
    title: 'Practical Test Automation with Playwright',
    priceLabel: '£149',
    amount: 14900,
    currency: 'gbp',
    stripePriceId: process.env.STRIPE_PRICE_PLAYWRIGHT,
    route: '/course/practical-test-automation-playwright',
  },
  {
    slug: 'api-testing-masterclass',
    category: 'Automation & Technical',
    title: 'API Testing Masterclass',
    priceLabel: '£99',
    amount: 9900,
    currency: 'gbp',
    stripePriceId: process.env.STRIPE_PRICE_API_TESTING,
    route: '/course/api-testing-masterclass',
  },
  {
    slug: 'istqb-foundation-masterclass',
    category: 'Certification',
    title: 'ISTQB Foundation Masterclass',
    priceLabel: '£79',
    amount: 7900,
    currency: 'gbp',
    stripePriceId: process.env.STRIPE_PRICE_ISTQB,
    route: '/course/istqb-foundation-masterclass',
  },
  {
    slug: 'qa-leadership-academy',
    category: 'Career & Job Search',
    title: 'QA Leadership Academy',
    priceLabel: '£199',
    amount: 19900,
    currency: 'gbp',
    stripePriceId: process.env.STRIPE_PRICE_QA_LEADERSHIP,
    route: '/course/qa-leadership-academy',
  },
  {
    slug: 'modern-test-automation-bootcamp',
    category: 'Automation & Technical',
    title: 'Modern Test Automation Bootcamp',
    priceLabel: '£199',
    amount: 19900,
    currency: 'gbp',
    // Launch price capability (£149) — dormant by default; set launchActive
    // true to charge/display it.
    promoPriceLabel: '£149',
    promoAmount: 14900,
    launchActive: false,
    stripePriceId: process.env.STRIPE_PRICE_MODERN_AUTOMATION,
    route: '/course/modern-test-automation-bootcamp',
  },
];

/** The price actually charged/displayed for a course (launch price when active). */
export function getActivePrice(config: CourseConfig): { amount: number; label: string } {
  if (config.launchActive && config.promoAmount != null) {
    return { amount: config.promoAmount, label: config.promoPriceLabel ?? config.priceLabel };
  }
  return { amount: config.amount, label: config.priceLabel };
}

export function getCourseConfig(slug: string): CourseConfig | undefined {
  return COURSES.find((c) => c.slug === slug);
}
