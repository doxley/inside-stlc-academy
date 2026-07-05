// API Testing Masterclass — Module 8: Newman & Automation.
// Full lesson content (base fields + enhancements). Follows the Module 1 template:
// every lesson fills every base field and a rich `enhancements` block.
export default {
  courseSlug: 'api-testing-masterclass',
  moduleNumber: 8,
  lessons: [
    {
      lessonNumber: 1,
      title: 'Introducing Newman',
      estimatedTime: '13 minute read',
      lessonOverview: `Everything you've built in Postman can run without Postman. Newman is Postman's command-line runner — the bridge between clicking "Run" and full automation.`,
      learningObjectives: ['Explain what Newman is and why it exists', 'Describe how Newman relates to your Postman collections', 'Install Newman and confirm it works'],
      lessonNotes: `## What Newman is
**Newman** is Postman's official **command-line collection runner**. It takes the exact same collection you built and tested in the Postman app and runs it in a terminal — no GUI, no clicking. The requests, tests, scripts and assertions all behave identically.

## Why testers need it
The Postman app is brilliant for building and exploring. But automation lives on the command line: CI servers, scheduled jobs and monitoring tools can't click buttons. Newman lets the *same* collection run anywhere a terminal exists.

## How it fits
- You **build and debug** in the Postman app.
- You **export** the collection (and environment) to JSON.
- Newman **runs** that JSON from the command line — locally, in CI, or on a schedule.

## Installing it
Newman runs on Node.js, so install Node first, then:
\`\`\`
npm i -g newman
\`\`\`
Confirm it worked with \`newman --version\`. That's it — you now have Postman's engine on the command line.`,
      workedExample: `After installing Node, run \`npm i -g newman\` in a terminal. Then \`newman --version\` prints something like \`6.2.1\`. You haven't run a collection yet, but the tool that will drive all your automation is now installed and ready.`,
      commonMistakes: `- Trying to install Newman without Node.js — it depends on npm
- Forgetting the \`-g\` flag, so \`newman\` isn't on your PATH
- Assuming Newman is a different tool — it runs your *existing* Postman collections unchanged`,
      realWorldTip: `Newman is not "Postman lite". It's the same test engine with no UI — which is exactly why it belongs in every pipeline. If a collection passes in the app, it passes in Newman.`,
      exercise: `Install Node.js if you don't have it, then run \`npm i -g newman\` and \`newman --version\`. Note the version number you see.`,
      reflectionQuestion: `Why can't the Postman desktop app run inside a CI pipeline, but Newman can?`,
      knowledgeCheck: `What is Newman? (Answer: Postman's command-line collection runner)`,
      completionChecklist: ['I can explain what Newman is', 'I have Newman installed', 'I can run `newman --version`'],
      enhancements: {
        industryStory: `A team had a gorgeous Postman collection that only ever ran when one tester manually clicked "Run". When she was on leave, nothing got tested. The fix took ten minutes: \`npm i -g newman\` and the same collection ran on every commit. Automation isn't a new tool — it's the same tool without the human clicking.`,
        visualAid: { type: 'comparison', title: 'Postman app vs Newman', headers: ['Aspect', 'Postman app', 'Newman'], rows: [['Interface', 'Graphical (click Run)', 'Command line'], ['Best for', 'Building & exploring', 'Automation & CI'], ['Runs the same collection', 'Yes', 'Yes'], ['Needs a human', 'Yes', 'No'], ['Fits in a pipeline', 'No', 'Yes']] },
        davidTip: `The first time I got a Postman collection running under Newman, it felt like magic — but it's just the engine without the dashboard. Build in the app, run with Newman. That split is the whole mental model.`,
        miniChallenge: `Run \`npm i -g newman\` then \`newman --version\`. If it errors with "command not found", what is the most likely cause?`,
        modelAnswer: `## Example\nMost likely Node.js/npm isn't installed, or the global npm bin folder isn't on your PATH. Installing Node and reopening the terminal usually fixes it. A healthy result prints a version like \`6.2.1\`.`,
      },
    },
    {
      lessonNumber: 2,
      title: 'Running Collections from the Command Line',
      estimatedTime: '16 minute read',
      lessonOverview: `Time to actually run something. You'll export a collection and its environment, then drive them through Newman — including feeding in data files for data-driven runs.`,
      learningObjectives: ['Run a collection with Newman', 'Pass an environment and variables on the command line', 'Feed a data file for data-driven runs'],
      lessonNotes: `## The core command
Export your collection to JSON from the Postman app (Collection → ⋯ → **Export**). Then:
\`\`\`
newman run collection.json
\`\`\`
Newman executes every request and every test, printing a pass/fail summary.

## Adding an environment
Environments (base URLs, tokens) export the same way. Attach one with \`-e\`:
\`\`\`
newman run collection.json -e env.json
\`\`\`
Now \`{{baseUrl}}\` and \`{{token}}\` resolve exactly as they did in the app.

## Data-driven runs
Point Newman at a CSV or JSON data file with \`-d\`. It runs the collection **once per row**, substituting the columns as variables:
\`\`\`
newman run collection.json -e env.json -d users.csv
\`\`\`
A three-row CSV means three iterations — perfect for testing the same endpoint across many inputs.

## Reading the output
The CLI summary shows iterations, requests, assertions, and how many failed. Zero failures is a green run.`,
      workedExample: `You export "User API" to \`collection.json\` and your staging environment to \`env.json\`. A \`users.csv\` has columns \`name,job\` with three rows. Running \`newman run collection.json -e env.json -d users.csv\` runs the whole collection three times — once per row — so a single command tests three users end to end.`,
      commonMistakes: `- Running the collection but forgetting \`-e\`, so \`{{baseUrl}}\` is empty and every request 404s
- A CSV whose header names don't match the \`{{variables}}\` used in requests
- Exporting the collection but editing it further in the app and forgetting to re-export`,
      realWorldTip: `Keep your exported \`collection.json\` and \`env.json\` in the repo next to your code. That way the tests version alongside the app, and anyone can run \`newman run\` to reproduce a result.`,
      exercise: `Export one of your Postman collections and its environment, then run \`newman run collection.json -e env.json\`. Confirm the requests run and note the pass/fail summary.`,
      reflectionQuestion: `What does the \`-d\` flag change about how a collection runs, and when is that useful?`,
      knowledgeCheck: `Which Newman flag attaches an environment file to a run? (Answer: -e, e.g. \`newman run collection.json -e env.json\`)`,
      completionChecklist: ['I exported a collection and environment', 'I ran a collection with `newman run`', 'I understand how `-d` drives iterations'],
      enhancements: {
        industryStory: `A tester swore her API "worked for one user but broke for others". Rather than test names by hand, we dropped 50 rows into a CSV and ran \`newman run collection.json -e env.json -d users.csv\`. Three rows failed instantly — a name with an apostrophe broke the payload. Data files turned a vague hunch into a precise, repeatable bug report.`,
        visualAid: { type: 'comparison', title: 'Common Newman flags', headers: ['Flag', 'Purpose', 'Example'], rows: [['(none)', 'Run a collection', 'newman run collection.json'], ['-e', 'Attach an environment', '-e env.json'], ['-d', 'Data file (iterate per row)', '-d users.csv'], ['-n', 'Number of iterations', '-n 5'], ['--folder', 'Run one folder only', "--folder 'Smoke'"]] },
        davidTip: `I keep the exported collection and environment in the repo and treat \`newman run\` as the single source of truth. If someone says "it passed on my machine", I ask them to run the Newman command — no more, no less.`,
        badGood: { label: 'running a collection', bad: `\`newman run collection.json\` — no environment, so \`{{baseUrl}}\` is blank and every request fails with a confusing 404.`, good: `\`newman run collection.json -e env.json\` — the environment resolves \`{{baseUrl}}\` and \`{{token}}\`, so the run reproduces exactly what you saw in the app.` },
        miniChallenge: `You have a \`prices.csv\` with 10 rows and want to test the same endpoint for each. Write the full Newman command including an environment.`,
        modelAnswer: `## Example\n\`newman run collection.json -e env.json -d prices.csv\`. Newman runs the collection ten times, once per CSV row, substituting each row's columns as variables.`,
      },
    },
    {
      lessonNumber: 3,
      title: 'Newman Reporters & HTML Reports',
      estimatedTime: '15 minute read',
      lessonOverview: `A wall of terminal text is fine for you, but not for your team. Reporters turn a Newman run into readable output — from JSON for machines to polished HTML for humans.`,
      learningObjectives: ['List Newman\'s built-in reporters', 'Generate a machine-readable JSON report', 'Produce a shareable HTML report with htmlextra'],
      lessonNotes: `## What a reporter is
A **reporter** decides how Newman presents results. You choose reporters with \`-r\`. The default is \`cli\` — the summary printed to the terminal.

## Built-in reporters
- \`cli\` — human-readable terminal output (the default)
- \`json\` — a machine-readable file, great for feeding other tools
- \`junit\` — XML that CI systems understand for test dashboards

Combine them: \`newman run collection.json -r cli,json\`.

## The star: htmlextra
\`htmlextra\` produces a rich, shareable HTML report with pass/fail breakdowns, request/response detail and timings. It's a separate package:
\`\`\`
npm i -g newman-reporter-htmlextra
newman run collection.json -e env.json -r htmlextra
\`\`\`
By default it writes to \`newman/\`. This is the report you send to a manager who wasn't watching the run.

## Choosing reporters
- **You, live** → \`cli\`
- **Another tool / CI dashboard** → \`json\` or \`junit\`
- **A human who needs a nice summary** → \`htmlextra\``,
      workedExample: `You install htmlextra with \`npm i -g newman-reporter-htmlextra\`, then run \`newman run collection.json -e env.json -r cli,htmlextra\`. The terminal shows a live summary (cli) and Newman writes an HTML file under \`newman/\` that you open in a browser — colour-coded passes and failures your lead can read at a glance.`,
      commonMistakes: `- Trying \`-r htmlextra\` without installing \`newman-reporter-htmlextra\` first
- Overwriting the same HTML file every run, so you lose the history
- Emailing raw terminal logs when a clean HTML report would land far better`,
      realWorldTip: `The \`htmlextra\` report is your reputation on a page. When a stakeholder asks "did the API tests pass?", a tidy HTML report answers instantly — and quietly shows how thorough you are.`,
      exercise: `Install \`newman-reporter-htmlextra\`, run your collection with \`newman run collection.json -e env.json -r htmlextra\`, and open the generated HTML report in a browser.`,
      reflectionQuestion: `Which reporter would you pick to feed results into a CI dashboard, and which to email a non-technical manager?`,
      knowledgeCheck: `Which reporter produces a rich, shareable HTML report? (Answer: htmlextra, via \`-r htmlextra\`)`,
      completionChecklist: ['I can name the built-in reporters', 'I generated a JSON report', 'I produced an htmlextra HTML report and opened it'],
      enhancements: {
        industryStory: `A tester kept pasting 400 lines of green terminal text into Slack after every run — nobody read it. She switched to \`-r htmlextra\`, dropped the HTML report link into the channel, and suddenly the whole team was clicking through failures themselves. Same data, radically better reach. Presentation is part of the job.`,
        visualAid: { type: 'comparison', title: 'Choosing a reporter', headers: ['Reporter', 'Output', 'Best audience'], rows: [['cli', 'Terminal text', 'You, running live'], ['json', 'JSON file', 'Other tools / scripts'], ['junit', 'XML file', 'CI test dashboards'], ['htmlextra', 'Rich HTML page', 'Managers & stakeholders']] },
        davidTip: `I always run \`cli,htmlextra\` together: cli so I see it live, htmlextra so I have something to share afterwards. Costs nothing extra and saves the "can you send me the results?" round-trip.`,
        badGood: { label: 'sharing results', bad: `Pasting hundreds of lines of raw terminal output into a chat and asking people to "scroll to the red bit".`, good: `\`newman run collection.json -e env.json -r htmlextra\` and sharing the colour-coded HTML report — failures are front and centre.` },
        miniChallenge: `Write one Newman command that shows a live terminal summary *and* writes an HTML report, using an environment file.`,
        modelAnswer: `## Example\n\`newman run collection.json -e env.json -r cli,htmlextra\`. The \`cli\` reporter prints live; \`htmlextra\` writes a shareable HTML file (under \`newman/\` by default).`,
        resourcePreview: { name: 'Sample Newman HTML Report', purpose: 'An example htmlextra report to show what "good" looks like.', whenToUse: 'Open it before your first run so you know what to expect.', formats: ['HTML'] },
      },
    },
    {
      lessonNumber: 4,
      title: 'Integrating API Tests into CI/CD',
      estimatedTime: '17 minute read',
      lessonOverview: `This is where automation earns its keep. You'll wire your Newman run into a CI/CD pipeline so the API tests run automatically on every commit — and fail the build when they should.`,
      learningObjectives: ['Explain why Newman fits naturally into CI/CD', 'Describe how exit codes make a build pass or fail', 'Add a Newman step to a pipeline (e.g. GitHub Actions)'],
      lessonNotes: `## Why CI/CD loves Newman
CI systems run commands and check whether they succeeded. Newman is just a command, so it drops straight in. Commit code → pipeline installs Newman → runs the collection → reports pass or fail. No human required.

## Exit codes are the magic
When a run passes, Newman exits with code **0**. If **any** assertion fails, it exits with a **non-zero** code. CI treats non-zero as failure — so a failing API test automatically **fails the build**. That's the whole contract:
- \`0\` → tests passed → pipeline continues
- non-zero → tests failed → pipeline stops (or is marked red)

## A minimal GitHub Actions example
\`\`\`yaml
name: API Tests
on: [push]
jobs:
  api-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm i -g newman newman-reporter-htmlextra
      - run: newman run collection.json -e env.json -r cli,htmlextra
\`\`\`
On every push, the pipeline installs Newman and runs your collection. If a test fails, the non-zero exit code turns the whole run red.`,
      workedExample: `You commit \`collection.json\` and \`env.json\` to the repo, add the workflow above, and push. GitHub Actions checks out the code, installs Newman, and runs \`newman run collection.json -e env.json -r cli,htmlextra\`. A broken endpoint makes an assertion fail, Newman exits non-zero, and the commit gets a red ✗ — the team knows *before* it ships.`,
      commonMistakes: `- Assuming CI knows a test failed — it only knows the exit code, so your Postman *tests* must actually assert
- Hard-coding secrets in \`env.json\` and committing them, instead of using CI secret variables
- Forgetting to install Newman as a pipeline step, so \`newman run\` isn't found`,
      realWorldTip: `The value of CI isn't the fancy report — it's that a failing API test *stops the line*. If your collection has no real assertions, Newman exits 0 and the pipeline goes green on broken code. Assertions are what make automation meaningful.`,
      exercise: `Take the collection you exported earlier and write the CI step that would run it: a single \`newman run collection.json -e env.json\` line inside a pipeline job. Note where the exit code decides pass/fail.`,
      reflectionQuestion: `If a collection has no assertions, what exit code will Newman return even when the API is broken — and why is that dangerous?`,
      knowledgeCheck: `What exit code does Newman return when a run passes, and what does CI do with a non-zero code? (Answer: 0 on pass; a non-zero code fails the build)`,
      completionChecklist: ['I can explain why Newman suits CI/CD', 'I understand how exit codes pass/fail a build', 'I can add a Newman step to a pipeline'],
      enhancements: {
        industryStory: `A team proudly showed me their "green" CI pipeline running Newman on every commit. But their collection only sent requests — no assertions. Every run exited 0, so the build was green while the API returned garbage. We added real \`pm.test\` assertions, and the next broken deploy went red in seconds. Green means nothing without assertions behind it.`,
        visualAid: { type: 'timeline', title: 'Newman in a CI pipeline', steps: [{ label: 'Push', detail: 'developer commits code' }, { label: 'Checkout', detail: 'CI pulls the repo (collection + env included)' }, { label: 'Install', detail: 'npm i -g newman' }, { label: 'Run', detail: 'newman run collection.json -e env.json' }, { label: 'Verdict', detail: 'exit 0 → green · non-zero → red' }] },
        davidTip: `I treat the exit code as a promise: "if this is non-zero, we do not ship". Everything else — reports, dashboards — is decoration on top of that one guarantee. Get the assertions right first.`,
        badGood: { label: 'a CI Newman step', bad: `A collection full of requests but no \`pm.test\` assertions. Newman always exits 0, so CI is permanently green and catches nothing.`, good: `Each request asserts status and key fields, so a real failure exits non-zero and turns the build red — automation that actually protects you.` },
        miniChallenge: `Write the two pipeline lines that (a) install Newman and (b) run a collection with its environment.`,
        modelAnswer: `## Example\n\`\`\`yaml\n- run: npm i -g newman\n- run: newman run collection.json -e env.json\n\`\`\`\nLine (a) installs the runner; line (b) runs the collection. A non-zero exit from line (b) fails the job.`,
      },
    },
    {
      lessonNumber: 5,
      title: 'Scheduling & Monitoring',
      estimatedTime: '16 minute read',
      lessonOverview: `CI catches problems when code changes — but APIs can break when nothing changed at all. This final lesson covers running your tests on a schedule and using them as lightweight monitoring.`,
      learningObjectives: ['Explain the difference between CI runs and scheduled runs', 'Schedule a Newman run with cron or a CI scheduler', 'Use scheduled runs as lightweight API monitoring'],
      lessonNotes: `## CI vs scheduled runs
CI runs on **change** — a commit or a pull request. But a third-party dependency can go down, a certificate can expire, or data can drift **without anyone touching the code**. **Scheduled runs** trigger on **time** instead, so you catch these silent failures.

## Scheduling options
- **cron** on a server: \`0 * * * * newman run collection.json -e env.json\` runs hourly.
- **CI scheduler**: GitHub Actions supports \`on: schedule\` with a cron expression — no server needed.
- **Postman Monitors**: Postman's own cloud scheduler runs the same collection on an interval.

A GitHub Actions schedule looks like:
\`\`\`yaml
on:
  schedule:
    - cron: '0 * * * *'   # every hour
\`\`\`

## Lightweight monitoring
Point a scheduled Newman run at your **production or staging** environment and it becomes a health check: is the API up, fast enough, and returning the right shape? Add htmlextra plus a notification (email/Slack) on failure and you have monitoring for the cost of a cron line.

## Keep it sensible
- Run a small, fast **smoke** collection frequently; the full suite less often.
- Alert only on failure — nobody reads "all green" emails.
- Watch response times, not just status codes.`,
      workedExample: `You add \`on: schedule: - cron: '0 * * * *'\` to your workflow and point it at staging with \`newman run smoke.json -e staging.json -r cli,htmlextra\`. Every hour it checks the core endpoints. At 3am a dependency's certificate expires; the next run fails, exits non-zero, and you get an alert — hours before any user notices.`,
      commonMistakes: `- Scheduling the entire regression suite every 5 minutes — expensive and noisy
- Alerting on success too, so real failures drown in "all good" emails
- Only checking status codes and missing slow-but-200 responses`,
      realWorldTip: `A scheduled smoke test against production is the cheapest early-warning system you'll ever build. It won't replace a proper monitoring platform, but it often catches outages before the dashboards do.`,
      exercise: `Export a small "smoke" collection (2–3 critical requests), then write the cron expression and Newman command you'd use to run it hourly against staging.`,
      reflectionQuestion: `Why might a scheduled run catch a failure that a commit-triggered CI run never would?`,
      knowledgeCheck: `What triggers a scheduled run rather than a CI run? (Answer: time — e.g. a cron schedule — not a code change)`,
      completionChecklist: ['I can explain CI runs vs scheduled runs', 'I can schedule a Newman run with cron or a CI scheduler', 'I can use a scheduled run as lightweight monitoring'],
      enhancements: {
        industryStory: `A payments API we relied on had its TLS certificate expire over a bank holiday weekend. Our code hadn't changed, so CI never ran — but an hourly scheduled Newman smoke test failed at 06:00 Saturday and paged the on-call engineer. We had it flagged with the vendor before customers were awake. That single cron line saved a Monday of angry tickets.`,
        visualAid: { type: 'comparison', title: 'CI runs vs scheduled runs', headers: ['Aspect', 'CI run', 'Scheduled run'], rows: [['Trigger', 'Code change / commit', 'Time (cron)'], ['Catches', 'Regressions from new code', 'Silent / external failures'], ['Environment', 'Usually test/staging', 'Often staging or production'], ['Doubles as', 'Quality gate', 'Lightweight monitoring']] },
        davidTip: `My rule: a tiny smoke collection runs often, the full suite runs on commits and overnight. Frequent + small beats occasional + huge. And I only ever alert on red — an inbox of green emails trains people to ignore all of them.`,
        badGood: { label: 'a monitoring schedule', bad: `The full 300-request regression suite runs every 5 minutes and emails the team on every run, pass or fail. Costs pile up and everyone mutes the alerts.`, good: `A 3-request smoke collection runs hourly against staging, alerting only on failure — cheap, quiet, and impossible to ignore when it matters.` },
        miniChallenge: `Write a cron expression for "every 15 minutes" and pair it with a Newman command that runs a smoke collection against staging with an HTML report.`,
        modelAnswer: `## Example\nCron: \`*/15 * * * *\`. Command: \`newman run smoke.json -e staging.json -r cli,htmlextra\`. Together they run the smoke collection every 15 minutes and leave a shareable report each time.`,
        managersReview: { intro: `If I reviewed your automation work at the end of this module, here's what I'd be looking for:`, strengths: ['A collection that runs cleanly under Newman', 'Real assertions so exit codes are meaningful', 'An htmlextra report you can share', 'Tests wired into CI on every commit'], improvements: ['Add a scheduled smoke run against staging', 'Alert on failure only, not on every run', 'Keep collection + environment versioned in the repo'], gaps: ['A pipeline that goes green with no assertions behind it', 'Committing secrets into env.json instead of using CI secrets', 'Scheduling the full suite too aggressively'] },
        portfolioBuilder: `Add an "API automation" artefact to your portfolio: your exported collection and environment, the Newman command you run them with, a sample htmlextra report, and the CI/schedule YAML. Together these prove you can take an API from manual testing all the way to automated, monitored coverage.`,
        resourcePreview: { name: 'Newman Automation Starter Kit', purpose: 'A ready-to-adapt CI workflow plus cron schedule for running collections with htmlextra.', whenToUse: 'Copy it into your own repo when you set up your first automated pipeline.', formats: ['YAML', 'Markdown'] },
      },
    },
  ],
};
