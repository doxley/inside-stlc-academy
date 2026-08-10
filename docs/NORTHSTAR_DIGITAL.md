# Northstar Digital — Case-Study Organisation

The single fictional organisation that runs through the **QA Leadership Academy**.
Every module consults for Northstar; new facts are revealed progressively so the
learner feels like they are advising one real company across the whole programme.

**Rule:** Northstar is realistic, not incompetent. It has genuine strengths,
sensible constraints, real technical debt and competing priorities — the kind of
company a capable QA leader actually joins.

---

## Snapshot

- **Company:** Northstar Digital — a mid-sized digital products company.
- **Sector:** B2C + B2B subscription software (a personal-finance product for
  consumers and a white-label version sold to small businesses).
- **Size:** ~120 employees. Engineering org ~55 people.
- **Funding/stage:** Series B, growing ~40% year on year, not yet profitable —
  so speed of delivery and cost discipline both matter.

## Products & architecture

- **Web app** (React SPA) — the primary customer surface.
- **Mobile app** (iOS + Android, React Native) — growing share of usage.
- **Public + internal REST APIs** — the mobile and web clients consume the same
  API; a documented public API is sold to B2B partners.
- **Payments** via a third-party provider (Stripe-style) plus one legacy
  in-house billing service that predates the current platform.
- **Legacy backend** — a monolith still owning billing and reporting; the newer
  capabilities are services around it. Classic strangler-fig-in-progress.

## Delivery model

- Four stream-aligned squads (Web, Mobile, Platform/API, Payments) plus a small
  Data team. Two-week iterations; each squad releases on its own cadence.
- CI exists (build + unit tests on PR); deployment is semi-automated — a human
  still approves production releases.
- "Definition of done" varies by squad; there is no shared quality gate.

## Current QA capability

- **6 QA engineers** for ~35 developers: 4 strong manual/exploratory testers,
  1 automation-leaning engineer maintaining the UI suite, 1 recent hire still
  ramping. No dedicated performance, security or accessibility specialist.
- QA is **centralised** (a QA "team") and pulled into squads late — usually once
  a story is code-complete.
- **Regression:** a large manual regression pass (~5 days) before major releases.
- **UI automation:** ~1,800 Selenium tests, ~6-hour run, ~25% flaky, owned by QA
  alone; developers do not touch it. Trust in it is low.
- **API/unit coverage:** patchy and inconsistent between squads.
- **Environments:** shared staging is unstable and frequently "someone else's
  data"; no reliable test-data strategy.
- **Requirements:** inconsistent — some squads write clear acceptance criteria,
  others hand over a Figma link and a sentence.
- **Defect management:** a Jira workflow exists but severity/priority are used
  loosely; production defects are trending up.
- **Metrics:** number of test cases and number of bugs found are reported; almost
  nothing about escaped defects, change failure rate or customer impact.
- **Career framework:** none for QA — no skills matrix, no progression ladder.

## The people (named, reusable)

- **Priya Nadar — VP Engineering.** Pragmatic, data-driven, time-poor. Will back
  a QA leader who speaks in risk and delivery outcomes, not test-case counts.
- **Tom Fielding — Head of Product.** Growth-focused, pushes hard on dates,
  genuinely reasonable when shown residual risk clearly.
- **Marcus Lee — Payments squad lead (engineering).** Sceptical of QA's value,
  believes "good developers don't need a QA team." Not hostile — unconvinced.
- **Sofia Alvarez — senior QA engineer (inherited team).** Excellent exploratory
  tester, informal team lead, wary of change after a failed "automate everything"
  push last year.
- **Dan Whitmore — automation engineer.** Keen but isolated; owns the flaky
  Selenium suite and is quietly burning out maintaining it.
- **The exec sponsor — the CTO** wants "faster, safer releases" and "more
  automation" without a clear definition of either.

## Business objectives (the backdrop for every decision)

1. Ship faster without increasing production incidents (the board is watching
   both release frequency and customer churn).
2. Make the B2B/public-API offering dependable enough to sell against SLAs.
3. Control cost — headcount growth is scrutinised; a request for 3 more testers
   will be challenged, a request framed as risk reduction + ROI may not.

## Known tensions to exploit in scenarios

- Executives want faster releases; engineering wants "more automation"; nobody
  has defined what problem more automation solves.
- QA is blamed for slow releases (the 5-day regression) yet involved too late to
  prevent the defects that make regression necessary.
- AI adoption is happening informally — a couple of testers already paste code
  and tickets into public AI tools, with no policy. A live governance risk.

---

*Authoring note:* introduce only the facts a given module needs. Modules 1–2
establish the inherited team and current state; later modules reveal budget,
partner-SLA pressure, the payments incident history, and the informal AI usage.
