// Playwright — Module 9: Git & CI/CD. Enhancements.
export default {
  courseSlug: 'practical-test-automation-playwright',
  moduleNumber: 9,
  lessons: [
    {
      lessonNumber: 1,
      enhancements: {
        industryStory: `A new starter's first task was "commit that to the repo" and they froze — unsure how to stage, commit or write a message. Basic Git fluency removes that day-one friction; your framework lives in Git and employers expect you to use it competently.`,
        davidTip: `Commit small, logical changes with clear messages (what and why). A tidy GitHub history is itself a portfolio asset — treat commit messages as communication, not an afterthought.`,
        miniChallenge: `Make a small change in a repo and commit it with a clear message; note what makes the message good.`,
        modelAnswer: `## Example\ngit add tests/login.spec.ts && git commit -m "Add login boundary tests for password length" — small, scoped, and the message says exactly what and why.`,
      },
    },
    {
      lessonNumber: 2,
      enhancements: {
        industryStory: `An engineer committed straight to main and broke the build for everyone. Moving to feature branches and pull requests meant CI ran and a teammate reviewed before anything merged. Branches and PRs are how teams ship safely.`,
        visualAid: {
          type: 'flow', title: 'Branch → PR → merge',
          steps: [
            { label: 'Feature branch', detail: 'off main' },
            { label: 'Commit & push' },
            { label: 'Open PR', detail: 'review + CI' },
            { label: 'Merge', detail: 'once green & approved' },
          ],
        },
        davidTip: `Small, focused pull requests get reviewed faster and merge sooner. Never commit straight to main, and never merge before CI passes — a PR that does one thing is a gift to your reviewer.`,
        miniChallenge: `Create a feature branch, push a change, and open a pull request on your own repo.`,
        modelAnswer: `## Example\ngit checkout -b feature/checkout-tests → push → open a PR titled "Add checkout regression tests". CI runs on the PR and a reviewer checks it before it merges to main.`,
      },
    },
    {
      lessonNumber: 3,
      enhancements: {
        industryStory: `Tests only ran when someone remembered to run them locally — so regressions slipped in. A GitHub Actions workflow running the suite on every push and PR turned testing from optional into automatic.`,
        davidTip: `A green CI badge on a public repo is a powerful portfolio signal — it shows you can wire tests into a real pipeline, not just write them. Always install browsers with --with-deps and upload the report on failure.`,
        miniChallenge: `Add a GitHub Actions workflow to your project that installs browsers, runs Playwright, and uploads the report.`,
        modelAnswer: `## Example steps\ncheckout → setup-node → npm ci → npx playwright install --with-deps → npx playwright test → upload playwright-report/ (if: always()). Triggers: push and pull_request.`,
        resourcePreview: {
          name: 'CI/CD Integration Guide (GitHub Actions)', purpose: 'Run your Playwright tests automatically on every push and PR.',
          whenToUse: 'Use it to wire CI into your capstone.', formats: ['PDF', 'DOCX'],
        },
      },
    },
    {
      lessonNumber: 4,
      enhancements: {
        industryStory: `A team "had CI" but merges were allowed over red builds, so broken tests piled up. Making the test check required before merge turned CI from decoration into a real quality gate that protected main.`,
        davidTip: `CI that can be ignored is just decoration. Make the test check required before merge, treat a red build as "stop and fix", and use retries in CI only for rare infra blips — never to mask genuine flakiness.`,
        miniChallenge: `Describe how you'd configure your repo so tests run on every PR and must pass before merge.`,
        modelAnswer: `## Example\nWorkflow runs on pull_request; branch protection requires the Playwright check to pass before merging. A failing run blocks the merge until it's fixed — main stays green.`,
      },
    },
    {
      lessonNumber: 5,
      enhancements: {
        industryStory: `A growing suite took 40 minutes serially and slowed every release. With independent tests, Playwright ran them across workers in parallel, cutting it to under 10 — fast feedback restored. Parallelism is free speed, if your tests allow it.`,
        davidTip: `Parallel execution is free speed — but only with independent, data-safe tests (the work you did on data-independence is exactly what enables it). Tune workers to the runner and surface clear pass/fail on the PR.`,
        miniChallenge: `Run your suite with multiple workers and confirm it still passes; note the time saved.`,
        modelAnswer: `## Example\nWith independent tests, npx playwright test ran across 4 workers and finished in roughly a quarter of the serial time; the PR showed a clear pass/fail and linked the report.`,
        portfolioBuilder: `Green CI, parallel runs and uploaded reports in your capstone repo are concrete proof you can build a real, automated pipeline — exactly what employers want to see.`,
        resourcePreview: {
          name: 'CI/CD Integration Guide (GitHub Actions)', purpose: 'Parallelism, reporting and reliable CI runs.',
          whenToUse: 'Reference it when tuning your pipeline.', formats: ['PDF', 'DOCX'],
        },
      },
    },
  ],
};
