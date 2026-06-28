// ─────────────────────────────────────────────────────────────
// Course catalogue — single source of truth for sellable courses.
// Slugs MUST match the public route (/course/<slug>) and the
// `slug` column in the Supabase `courses` table.
// ─────────────────────────────────────────────────────────────

export interface CourseConfig {
  slug: string;
  title: string;
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
  route: string;
}

export const COURSES: CourseConfig[] = [
  {
    slug: '90-day-software-testing-career-roadmap',
    title: '90-Day Software Testing Career Roadmap',
    priceLabel: '£99',
    amount: 9900,
    currency: 'gbp',
    stripePriceId: process.env.STRIPE_PRICE_90_DAY,
    route: '/course/90-day-software-testing-career-roadmap',
  },
  {
    slug: 'ai-for-qa-testers',
    title: 'AI for QA Testers',
    priceLabel: '£99',
    amount: 9900,
    currency: 'gbp',
    stripePriceId: process.env.STRIPE_PRICE_AI_QA,
    route: '/course/ai-for-qa-testers',
  },
  {
    slug: 'qa-interview-accelerator',
    title: 'QA Interview Accelerator',
    priceLabel: '£49',
    amount: 4900,
    currency: 'gbp',
    stripePriceId: process.env.STRIPE_PRICE_QA_INTERVIEW,
    route: '/course/qa-interview-accelerator',
  },
  {
    slug: 'practical-test-automation-playwright',
    title: 'Practical Test Automation with Playwright',
    priceLabel: '£149',
    amount: 14900,
    currency: 'gbp',
    stripePriceId: process.env.STRIPE_PRICE_PLAYWRIGHT,
    route: '/course/practical-test-automation-playwright',
  },
];

export function getCourseConfig(slug: string): CourseConfig | undefined {
  return COURSES.find((c) => c.slug === slug);
}
