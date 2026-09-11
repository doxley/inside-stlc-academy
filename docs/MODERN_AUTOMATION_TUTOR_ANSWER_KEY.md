# Modern Test Automation Bootcamp — Tutor Answer Key

**Tutor / admin only. Do not share with students.**

This is the marking companion to the 15 practical assignments (12 labs + 3 projects) defined in `scripts/content/modern-automation-assignments.mjs`. For each assignment it gives a model/reference answer (what a strong submission looks like) and marking notes (common failure modes, and how to tell pass from distinction).

General marking stance across the course:
- Reward **meaningful testing** — evidence about real risk — not "the tests are green". A green suite that asserts nothing is a fail signal, not a pass.
- Reward **cheapest-effective-level** thinking (push checks down the pyramid).
- Reward **honesty**: deliberate non-automation decisions, stated limitations, transparent AI use. Penalise any claim of commercial/client experience on portfolio work.
- For the code labs, a "runs green from a clean clone" claim should be spot-checkable; unverifiable claims are treated as unmet.

---

## 1. Lab: Automation Candidate Assessment (Module 1, file)

### Model / reference answer
A strong submission is a decision table plus a short narrative. Representative, defensible decisions:

| Candidate | Automate? | Level | Risk | Stability | Value | Rationale |
|---|---|---|---|---|---|---|
| Search relevance | Partly | API + a thin UI check | Med | Med | High | Relevance ranking is fuzzy; assert *that relevant results appear*, keep exact-ordering out. |
| Add-to-basket count/subtotal | Yes | UI (or component) | High | Med | High | Core revenue journey, user-visible. |
| Checkout VAT calculation | Yes | **Unit / API** | High | High | High | Pure logic + money; do not pay for a slow UI journey to check arithmetic. |
| Payment capture (3rd party) | Yes, but | API against provider sandbox; not real cards | High | Med | High | Mock/sandbox; a full live UI card flow is flaky and out of scope for a fast gate. |
| Promo banner artwork | No | — | Low | Low (changes often) | Low | Presentational and volatile; visual review / manual check. |
| Password-reset email + link | Yes | API/integration (mailbox API) | High | High | Med | Security-relevant; drive via a test mailbox rather than a brittle full-UI journey. |
| Recommendations ordering | No | — | Low | Low | Med | Non-deterministic/model-driven; monitor, don't pin exact order. |
| Registration validation | Yes | Unit/component + one UI happy path | Med | High | High | Rules are logic; cover cheaply, one UI smoke for wiring. |
| Order-history listing | Yes | API + light UI | Med | High | Med | Data correctness at API, rendering at UI. |
| Cookie-consent banner | Maybe (one) | UI smoke | Low–Med | Low | High freq | One check it appears/dismisses; legally visible but simple. |

Narrative should name a first target (booking/checkout money path is the usual right answer — highest consequence), justify two-plus non-automation calls (banner artwork, recommendations ordering) with a concrete alternative, and show a bottom-heavy pyramid.

### Marking notes
- **Distinction**: pushes logic (VAT, validation) down to unit/API and explains the confidence traded; treats non-automation as a defended choice; pyramid is bottom-heavy with reasons.
- **Pass**: every item has a decision, a level where automated, and a risk-based reason; at least two deliberate manual calls with alternatives.
- **Fail / common failure modes**: "automate everything at UI"; justifications that reduce to "it's important" or "it's easy"; no non-automation decisions; risk/stability/value columns filled in but never used in the reasoning; picking a low-consequence item (cookie banner) as the first automation target.

---

## 2. Lab: TypeScript Refactoring (Module 2, file)

### Model / reference answer
Clean strict TypeScript, e.g.:

```ts
import type { Page } from '@playwright/test';

export type Role = 'admin' | 'user' | 'guest';

export interface UserOptions {
  role?: Role;
  active?: boolean;
}

export interface User {
  name: string;
  role: Role;
  active: boolean;
}

export function makeUser(name: string, opts: UserOptions = {}): User {
  return { name, role: opts.role ?? 'user', active: opts.active ?? false };
}

export interface LoginOptions {
  remember?: boolean;
}

export class LoginPage {
  constructor(private readonly page: Page) {}

  async login(email: string, password: string, opts: LoginOptions = {}): Promise<string> {
    await this.page.fill('#email', email);
    await this.page.fill('#password', password);
    if (opts.remember) await this.page.check('#remember');
    await this.page.click('button[type=submit]');
    return this.page.url();
  }

  async errors(): Promise<string[]> {
    return this.page.$$eval('.error', (els) => els.map((e) => e.textContent ?? ''));
  }
}
```

Key decisions: `Role` union not `string`; options object replaces the mystery `remember` boolean; explicit return types; `?? default` fixes the `active` truthiness bug honestly; `errors()` returns `string[]` (nulls coerced) not `(string|null)[]`. `tsconfig` shows `"strict": true`. Write-up lists: implicit `any` on every param, `opts && opts.x` guards, positional boolean, leaking null from `textContent`.

### Marking notes
- **Distinction**: zero suppressions; discriminated/`readonly` touches; options-object ergonomics; clear defect write-up; clean `tsc --noEmit`.
- **Pass**: strict on, no `any`, union for role, explicit return types, behaviour preserved.
- **Fail / common failure modes**: `role: string`; leftover implicit `any` (didn't actually enable strict); `as any` / `@ts-ignore` to silence errors; changed behaviour while "refactoring"; typed params but omitted return types; no evidence of a clean compile.

---

## 3. Lab: Git & GitHub Workflow (Module 3, url)

### Model / reference answer
A public repo, baseline on `main`, a `feature/*` branch with 3+ atomic commits (e.g. "Add Playwright config", "Add homepage title test", "Document how to run tests"), pushed, and an **open** PR into `main`. PR body states what/why/how-verified ("ran `npx playwright test`, 1 passed locally"). `.gitignore` covers `node_modules`, `test-results/`, `playwright-report/`, `.env`.

### Marking notes
- **Distinction**: history reads as a clean story; imperative messages saying why; PR description a real reviewer would welcome.
- **Pass**: branch off main, 3+ atomic well-messaged commits, open unmerged PR with change/rationale/verification, no secrets.
- **Fail / common failure modes**: single "initial commit" dump; noise messages ("wip", "fix", "asdf"); committed straight to `main`; PR already merged (reviewer can't see the flow — mark leniently only if history is intact); committed `node_modules` or `.env`; PR description empty or "updated files".

---

## 4. Lab: Your First Customer Journey (Module 4, url)

### Model / reference answer
Playwright + TS repo automating a 4+ step journey (search → detail → add to basket → checkout form → assert summary) with `getByRole`/`getByLabel`/`getByText`, web-first `await expect(locator)...`, and assertions at intermediate checkpoints (right product name in basket, correct subtotal), not only at the end. Runs via `npm ci && npx playwright test`. README names the target site.

### Marking notes
- **Distinction**: resilient locators throughout, no hard waits, assertions that would catch a real regression a customer would notice.
- **Pass**: 4+ steps, role-based locators, web-first assertions, at least one customer-relevant mid-journey assertion, green from clean clone.
- **Fail / common failure modes**: `waitForTimeout` everywhere; brittle CSS/XPath chains; only asserts a page loaded / URL; single end-of-test assertion; won't run from a clean clone (missing config, hard-coded local state); automated a site they clearly shouldn't hit.

---

## 5. Lab: Strengthen Weak Tests (Module 5, file)

### Model / reference answer
Correct diagnoses: (1) `expect(page).toBeTruthy()` — tautology, `page` is never falsy, asserts nothing; (2) `>= 0` — always true, plus a 3s hard wait; (3) `toContain('£')` — passes on any price incl. wrong ones; (4) no assertion at all.

Rewrites assert real values, e.g.:

```ts
test('checkout shows the order summary with the correct total', async ({ page }) => {
  await seedBasket(page, [{ sku: 'SKU-100', price: 20 }]);
  await page.goto('/checkout');
  await expect(page.getByTestId('total')).toHaveText('£24.00'); // incl. 20% VAT
});

test('search returns relevant results for the query', async ({ page }) => {
  await page.goto('/search?q=camera');
  const results = page.getByRole('listitem');
  await expect(results.first()).toBeVisible();          // waits on real condition
  await expect(results.filter({ hasText: /camera/i })).not.toHaveCount(0);
});

test('valid login lands on the dashboard', async ({ page }) => {
  // ... fill + submit ...
  await expect(page).toHaveURL(/\/dashboard/);
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
});

test('wrong password shows an error and stays on login', async ({ page }) => {
  // ... fill wrong pw + submit ...
  await expect(page.getByRole('alert')).toHaveText(/invalid/i);
  await expect(page).toHaveURL(/\/login/);
});
```

Timing hack replaced by asserting `results.first()` visible. At least one negative case added.

### Marking notes
- **Distinction**: names the exact failure mode per test; assertions provably catch the specific regression the original missed; negative/boundary case with stated risk.
- **Pass**: correct diagnosis + a meaningful rewrite each; all `waitForTimeout` gone; one negative/boundary case; assumptions stated.
- **Fail / common failure modes**: vague "it's weak" diagnoses; swapping one weak assertion for another (`toBeVisible` on the page body); keeping the sleep; asserting `£` still present; no negative case; not stating the expected total so the assertion isn't checkable.

---

## 6. Lab: Flaky Suite Rescue (Module 6, url)

### Model / reference answer
Write-up characterises the flakiness, then attributes causes: hard waits racing the UI; a shared account/order mutated across tests; order-dependence (test B relies on data test A created). Fixes: `waitForTimeout` → web-first assertions / `expect.poll`; each test seeds and tears down its own data; fresh context/storage per test; remove ordering assumptions. Proof: `npx playwright test --repeat-each=20` green and stable, ideally under parallel workers. Retries only mentioned for genuine external noise, not as the cure.

### Marking notes
- **Distinction**: clear before/after; fixes hold under parallel execution; retries used only where justified and said so; explains *why* each change removes the race.
- **Pass**: correct root causes, proper fixes (no hard waits, self-contained order-independent tests), stability shown under `--repeat-each`.
- **Fail / common failure modes**: "fixed" by bumping timeouts or adding `retries: 3`; still has `waitForTimeout`; single green run offered as proof of reliability; tests still share/order-depend on state; write-up describes symptoms not causes.

---

## 7. Project 1: UI Automation (Module 7, url — PORTFOLIO)

### Model / reference answer
A well-structured Playwright + TS repo: 3–5 risk-carrying journeys, page/component objects, fixtures for shared setup, independent parallel-safe tests, no hard waits, README stating app, journeys, risks covered, how to run, limitations, and explicit "portfolio project" framing.

### Marking notes
- **Distinction**: clean extensible structure (a UI change is a one-place edit); risk-driven journey selection articulated; reliability shown under repeated/parallel runs.
- **Pass**: 3+ meaningful journeys, role-based locators, web-first assertions, page-object/fixture structure, independent tests, no hard waits, honest README.
- **Fail / common failure modes**: selectors copy-pasted across tests (no structure); trivial journeys chosen for ease with no risk articulated; hard waits; tests depend on each other; README overclaims commercial experience or omits limitations.

---

## 8. Lab: Multi-Role Authentication (Module 8, url)

### Model / reference answer
A `setup` project authenticates each role once and saves `storageState` (`admin.json`, `user.json`); per-role projects in `playwright.config.ts` reference the stored state via `storageState` and a `dependencies: ['setup']`. A programmatic/API login obtains a session via `request.post('/api/login')` and injects cookies/token into context. Tests: admin performs an admin-only action successfully; the same action is *denied/absent* for a standard user (the negative is asserted). Credentials in env / git-ignored `.env`. Runs from clean clone with documented env.

### Marking notes
- **Distinction**: clean role separation via projects; justifies UI-vs-API login trade-off; asserts the negative (user genuinely denied), not just the positive.
- **Pass**: per-role `storageState` reused via setup dependency + projects; working programmatic login; a test per role incl. a proven boundary; no committed secrets.
- **Fail / common failure modes**: logging in through the UI inside every test; only one role; no programmatic login (or a fake one that still drives the form); admin path asserted but user-denied path missing; credentials committed.

---

## 9. Lab: API + UI Hybrid Automation (Module 9, url)

### Model / reference answer
Standalone API tests using the `request` fixture with body/shape + status assertions (not just `200`). An API setup helper seeds the data a UI test needs and returns ids; the UI test navigates straight to the relevant page and asserts the UI reflects the seeded state. Teardown deletes created data in an `afterEach`/fixture. A short note explains the split: correctness/edge cases at API, rendering/interaction at UI, and why this is faster and less flaky than UI setup.

### Marking notes
- **Distinction**: schema-aware API assertions; robust fixture-based setup/teardown; convincing account of why the hybrid cuts flakiness and run time.
- **Pass**: real API assertions, API-seeded UI preconditions with teardown, clear split rationale, repeatable from clean clone.
- **Fail / common failure modes**: API "tests" that only check status 200; UI test still clicks through creation instead of using the seed; no teardown (residue accumulates, second run fails); no rationale for the split.

---

## 10. Lab: Network Mocking (Module 10, url)

### Model / reference answer
`page.route` intercepts the page's data call and `route.fulfill`s controlled responses. Error-state test: fulfil with 500/malformed body, assert the UI shows a clear error affordance (message/retry), not a blank/crashed page. Empty-state test: fulfil with `[]`, assert the intended empty-state messaging and intact layout. A real, unmocked happy-path test remains. A note acknowledges the over-mocking risk (mocks can hide real integration breakage) and a mitigation (keep the real happy path; contract/integration checks; don't mock everything).

### Marking notes
- **Distinction**: precise, minimal mocking of the right request; asserts genuinely user-relevant handling of each state; clear reasoning on where mocking helps vs hides risk.
- **Pass**: both error and empty states forced via interception with graceful-handling assertions; a real happy path kept; over-mocking risk + mitigation stated.
- **Fail / common failure modes**: mocking the wrong request or the whole page; asserting only that the mock returned (not that the UI handled it); no real happy-path test left (only testing fiction); no acknowledgement of the mocking trade-off.

---

## 11. Project 2: Full-Stack Automation with CI (Module 12, url — PORTFOLIO)

### Model / reference answer
One repo combining: API tests + API-driven setup/verification; UI tests; `storageState` auth (per-role where relevant); a documented, isolated, self-cleaning test-data strategy that survives parallel workers; multiple browser projects (Chromium/Firefox/WebKit); `@smoke`/`@regression` tags mapped to where they run (smoke pre-merge, regression nightly/fuller); a GitHub Actions workflow on push/PR that installs, runs, uploads HTML report + traces as artefacts, and is green. README covers architecture, data strategy, local + CI running, and honest limitations. Both the repo link and a successful CI run link are submitted.

### Marking notes
- **Distinction**: coherent architecture; data strategy holds under parallel CI; tag-driven run profiles genuinely used; README a reviewer could act on immediately.
- **Pass**: API+UI integrated, documented isolated cleanup strategy, `storageState`, multiple projects, smoke/regression tags, green Actions run with artefacts, link to a successful run.
- **Fail / common failure modes**: no CI link, or a red/again-and-again-failing run; a token workflow that just runs `echo`; data strategy accidental (tests collide under parallelism); tags declared but unused; secrets in the workflow file; overclaiming the project as commercial work.

---

## 12. Lab: Debugging & Reporting (Module 13, file)

### Model / reference answer
Trace enabled (`--trace on` / `on-first-retry`); trace viewer used to inspect snapshots/network/console/timeline for each failure. Two *different* root causes correctly distinguished — e.g. a **test defect** (stale locator or a race the trace shows waiting on the wrong element) versus a **genuine product bug** (API returns the wrong value; the trace's network tab shows it). Each fixed appropriately: fix the test where the test is wrong; where it's a real product bug, say so and keep an assertion that pins it (do not delete the assertion). Report per failure: symptom → trace evidence (the specific frame/network/console entry) → root cause → fix → prevention. HTML report shows red → green.

### Marking notes
- **Distinction**: cleanly separates test defect from product bug; cites the precise trace artefact per cause; credible prevention (e.g. better locator strategy, a network assertion, isolation).
- **Pass**: both failures diagnosed from trace evidence with correct root cause, appropriate fix, suite ends green, specific artefact shown per cause.
- **Fail / common failure modes**: diagnosis by guessing/`console.log` with no trace evidence; loosening the assertion to force green (esp. deleting the assertion that catches a real product bug); generic screenshots instead of the telling frame; both failures blamed on the same generic cause; prevention = "be more careful".

---

## 13. Lab: AI-Generated Test Critique (Module 14, file — REQUIRED AI ASSIGNMENT)

### Model / reference answer
Original AI output preserved verbatim and labelled. A defect list mapping each weakness to its fix, covering at least: a **hallucinated/non-existent API or method** (e.g. an invented Playwright helper); an **invented or brittle selector**; a **weak or green-but-wrong assertion** (asserts the wrong thing / passes regardless); and **missing cases** (negative/boundary/error/empty). The corrected version is genuinely runnable — real APIs, resilient locators, regression-catching assertions, added cases. An AI-usage declaration: tool, prompt, what it got wrong, what was changed and why, and a judgement on where AI helped vs where it would mislead a junior.

### Marking notes
- **Distinction**: sharp characterisation of each failure mode; articulates precisely how an unwary engineer would have shipped the AI version believing it worked; strong corrections.
- **Pass**: original kept; at least one hallucinated API/selector and one weak/green-but-wrong assertion found and fixed; missing cases added; runnable corrected version; clear AI-usage declaration.
- **Fail / common failure modes**: cosmetic tidy-ups only (renaming, formatting) while real defects survive; corrected version still uses the hallucinated API; no negative cases added; no declaration, or a declaration that hides how much the AI got wrong; student defers to the AI rather than supervising it.

---

## 14. Lab: Team Automation Strategy (Module 15, file)

### Model / reference answer
A 1–2 page decision document for Meridian Health: goals/constraints (release confidence without a 2-day manual regression; small team, weekly cadence); a level-by-level plan (booking/payment logic at unit/API, journeys at UI) with a bottom-heavy pyramid justified for *this* product; risk-first priorities (booking and payment first) with explicit trade-offs (what confidence is being forgone); a tagging strategy (`@smoke` pre-merge gate, `@regression` nightly); and a clear "will NOT automate" section with alternatives (exploratory testing, production monitoring/observability for payments, manual visual/accessibility review). Tailored, concise, actionable.

### Marking notes
- **Distinction**: genuine trade-off reasoning specific to Meridian Health; a strategy a real lead could adopt with minimal change.
- **Pass**: coverage across unit/API/UI with rationale; highest-risk areas prioritised; tagging tied to where tests run; explicit "will not automate" with alternatives; fits the constraints.
- **Fail / common failure modes**: generic essay ignoring the given context; "automate everything"; no non-automation section, or it's a list of gaps with no alternatives; no tagging/run-location thinking; no stated trade-offs (implies total coverage); over-length and undecided.

---

## 15. Project 3: Final Capstone (Module 16, url — PORTFOLIO CAPSTONE)

### Model / reference answer
A single coherent Playwright + TS repo delivering every required output, each functional (not stubbed): UI automation; API automation (standalone + setup/verification); reusable fixtures/component objects; `storageState` auth/state handling; a documented test-data strategy (create/isolate/clean-up); environment configuration (per-env `baseURL`, no hard-coded URLs/secrets); multiple browser projects; `@smoke`/`@regression` tagging; a green GitHub Actions CI/CD workflow with report/trace artefacts; reporting retained in CI; a README (architecture, run locally + CI, how pieces fit); a written automation strategy with risk/coverage decisions and honest limitations; and an AI-usage declaration. Runs green from a clean clone. Framed honestly as a portfolio/practice project.

### Marking notes
- **Distinction**: a genuinely employable portfolio piece — coherent architecture, reliable in CI, well-reasoned strategy, honest professional framing throughout; the written strategy shows real judgement.
- **Pass**: all required elements present and functional, runnable from a clean clone, green CI, README + strategy/risk/limitations + AI declaration.
- **Fail / common failure modes**: elements stubbed or missing (no CI, or red CI; no data strategy; hard-coded URLs/secrets); a bag of disconnected demos rather than one coherent repo; no written strategy/limitations; no AI declaration; hard waits/flaky; overclaims the work as commercial or client experience.

---

### Cross-course marking reminders
- A submission whose only evidence is "all green" without meaningful assertions is a **fail signal**: green must mean the risk was actually exercised.
- For every `url` submission, prefer to clone and run rather than trust the README's claims.
- Treat honesty (limitations, deliberate non-automation, transparent AI use) as a graded quality, not a nicety — and never award credit for claimed commercial/client experience on portfolio or capstone work.
