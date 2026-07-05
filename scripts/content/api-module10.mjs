// API Testing Masterclass — Module 10: Final API Portfolio Project.
// Capstone module. Learners build a complete, employer-ready API test suite for a
// sample application: documentation, a Postman collection, automated Newman runs and
// reporting. Every lesson carries a portfolioBuilder; lesson 5 also carries a
// managersReview and resourcePreview. Same format/quality as Module 1.
export default {
  courseSlug: 'api-testing-masterclass',
  moduleNumber: 10,
  lessons: [
    {
      lessonNumber: 1,
      title: 'Project Brief & Choosing Your API',
      estimatedTime: '45 minutes',
      lessonOverview: `This is your capstone. Over five sessions you'll build a complete, employer-ready API testing portfolio piece. It starts here: understanding the brief, choosing an API, and writing down the scope you'll be judged on.`,
      learningObjectives: ['Understand what the portfolio project must deliver', 'Choose a suitable API to test', 'Write a one-page project scope and set of test objectives'],
      lessonNotes: `## What you are building
By the end of Module 10 you will have a single, coherent portfolio artefact: a documented Postman collection with environments, an automated test suite run through Newman, and an HTML report you can show a hiring manager. Everything you learned in Modules 1–9 comes together here.

## Choosing your API
Pick something you can actually hit and re-run:
- A free public API — \`https://reqres.in\`, \`https://jsonplaceholder.typicode.com\`, or the **restful-booker** hotel API (\`https://restful-booker.herokuapp.com\`), which has real auth and CRUD.
- Avoid APIs needing paid keys, card details, or a VPN.
- Prefer one with a **create-read-update-delete** flow — it gives you far richer tests.

## Write the scope first
Senior testers scope before they test. In a short document, capture:
- The API and its base URL
- Which endpoints are **in scope** (and which are out)
- Your **test objectives** (functional, negative, auth, schema)
- Any assumptions and risks

## Why this matters
A hiring manager doesn't just want to see requests fire. They want to see that you decided *what mattered* and *why* before touching a keyboard.`,
      workedExample: `Choosing **restful-booker**: base URL \`https://restful-booker.herokuapp.com\`. In scope: \`POST /auth\` (token), \`POST /booking\` (create), \`GET /booking/{id}\` (read), \`PUT /booking/{id}\` (update), \`DELETE /booking/{id}\` (remove). Objectives: happy-path CRUD, an auth-required negative case (delete without token → 403), and schema validation on the booking response. Out of scope: performance and load. One page, written before any request is sent.`,
      commonMistakes: `- Choosing an API that needs paid access or card details, then getting stuck
- Skipping the scope and diving straight into requests
- Picking a read-only API so there's no create/update/delete story to tell`,
      realWorldTip: `The best portfolio APIs have a full CRUD lifecycle and real authentication. They let you demonstrate the whole toolbox — happy paths, negatives, auth, and data cleanup — in one coherent story.`,
      exercise: `Choose your API and write a one-page scope: base URL, in-scope endpoints, out-of-scope items, and three to five test objectives. Save it as \`README.md\` in a new project folder.`,
      reflectionQuestion: `Why is deciding what NOT to test just as important as deciding what to test?`,
      knowledgeCheck: `What single document should you produce before sending any request in this project? (Answer: a one-page scope / test objectives document)`,
      completionChecklist: ['I can explain what the portfolio project must deliver', 'I have chosen a suitable API with a CRUD flow', 'I have written a one-page scope and objectives'],
      enhancements: {
        industryStory: `I once interviewed two candidates with near-identical Postman collections. One could explain why they'd tested those endpoints and skipped others; the other just "tested everything they saw". We hired the first. Scope and judgement are the whole game — the requests are the easy part.`,
        visualAid: { type: 'comparison', title: 'Good vs weak portfolio API', headers: ['Trait', 'Good choice', 'Weak choice'], rows: [['Access', 'Free, no card', 'Needs paid key'], ['Lifecycle', 'Full CRUD', 'Read-only'], ['Auth', 'Real token flow', 'None'], ['Reliability', 'Stable, public', 'Flaky / private'], ['Re-runnable', 'Any time', 'Rate-limited hard']] },
        davidTip: `I always write the scope in the same repo as the collection, as a README. When a hiring manager opens the folder, the very first thing they read is evidence that I think before I test.`,
        miniChallenge: `In two sentences, justify your API choice: why it's a good demonstration piece and what its CRUD/auth story lets you show.`,
        modelAnswer: `## Example\nI chose restful-booker because it has a genuine token-auth step and a full create-read-update-delete lifecycle. That lets me demonstrate happy paths, an auth negative case, and data cleanup in one coherent suite.`,
        badGood: { label: 'project scope', bad: `"I'll test the API." No endpoints listed, no objectives, no out-of-scope — impossible to judge or finish.`, good: `A one-page README naming five in-scope endpoints, four objectives (CRUD, auth negative, schema), and explicitly out-of-scope performance testing.` },
        portfolioBuilder: `Create a project folder \`api-testing-portfolio\` with a \`README.md\` containing your scope and objectives. This folder is your capstone artefact — every later session adds to it.`,
      },
    },
    {
      lessonNumber: 2,
      title: 'Building the Collection & Environments',
      estimatedTime: '60 minutes',
      lessonOverview: `With scope agreed, you build the Postman collection that mirrors it — organised folders, parameterised requests, and environments so the same suite runs against different targets. This is the backbone of your portfolio.`,
      learningObjectives: ['Structure a Postman collection into logical folders', 'Use variables and environments instead of hard-coded values', 'Chain requests so created data flows into later calls'],
      lessonNotes: `## Structure the collection
Mirror your scope. A clean layout tells a reviewer you think in systems:
- A folder per resource or flow (e.g. **Auth**, **Bookings**)
- Requests named as actions: \`Create booking\`, \`Get booking by id\`
- A short description on the collection explaining what it covers

## Never hard-code
Replace literals with variables (Module 6):
- \`{{baseUrl}}\` for the host
- \`{{token}}\` for auth
- \`{{bookingId}}\` for the id you created

## Environments do the heavy lifting
Create at least two environments — for example **Local/Dev** and **Public** — each defining \`baseUrl\`. The same collection now runs anywhere by switching the environment. That portability is exactly what CI needs in the next session.

## Chain your requests
Use a test script on **Create** to save the returned id:
\`pm.environment.set('bookingId', pm.response.json().bookingid)\`
Later requests use \`{{bookingId}}\` — so the suite creates, reads, updates and deletes the *same* record end to end.`,
      workedExample: `In the **Auth** folder, \`POST {{baseUrl}}/auth\` returns a token; a script saves it: \`pm.environment.set('token', pm.response.json().token)\`. In **Bookings**, \`POST {{baseUrl}}/booking\` creates a record and saves \`bookingid\`. \`GET {{baseUrl}}/booking/{{bookingId}}\` then reads that exact record. Switching the environment from Public to Local changes only \`baseUrl\` — every request follows.`,
      commonMistakes: `- Hard-coding the base URL and token into every request
- One giant flat list of requests with no folders or descriptions
- Not saving the created id, so read/update/delete point at the wrong record`,
      realWorldTip: `A collection that runs against three environments by flipping one dropdown is worth ten collections that only work on the author's laptop. Portability is what makes a suite reusable — and reusable is what employers pay for.`,
      exercise: `Build your collection: folders per resource, every value parameterised with \`{{variables}}\`, and two environments defining \`baseUrl\`. Add a script that captures the created id into an environment variable and use it in a later request.`,
      reflectionQuestion: `What breaks if you hard-code the base URL instead of using an environment variable?`,
      knowledgeCheck: `What Postman feature lets one collection run against dev and production without editing requests? (Answer: environments / environment variables)`,
      completionChecklist: ['I have organised the collection into logical folders', 'I have replaced hard-coded values with variables', 'I have at least two environments', 'A created id flows into later requests'],
      enhancements: {
        industryStory: `A team handed me a collection that only worked on the author's machine — every URL was hard-coded to \`localhost:3000\`. It was useless the moment he left. We spent a day parameterising it. Build it portable from the first request and you never pay that tax.`,
        visualAid: { type: 'timeline', title: 'Data flowing through a chained suite', steps: [{ label: 'Auth', detail: 'POST /auth → save {{token}}' }, { label: 'Create', detail: 'POST /booking → save {{bookingId}}' }, { label: 'Read', detail: 'GET /booking/{{bookingId}}' }, { label: 'Update', detail: 'PUT /booking/{{bookingId}}' }, { label: 'Delete', detail: 'DELETE /booking/{{bookingId}} → 200/204' }] },
        davidTip: `I name the collection with my own name — "API Portfolio — David Oxley" — and write a one-paragraph description at the top. When it's exported and shared, it always carries its own context. Never ship a collection called "New Collection".`,
        badGood: { label: 'request values', bad: `\`GET https://restful-booker.herokuapp.com/booking/17\` with the token pasted into the header, per request.`, good: `\`GET {{baseUrl}}/booking/{{bookingId}}\` with \`Authorization: Bearer {{token}}\` — driven by the active environment.` },
        miniChallenge: `Add a second environment to your collection and prove the whole suite runs against it by switching only the environment dropdown.`,
        modelAnswer: `## Example\nEnvironment "Public" sets \`baseUrl = https://restful-booker.herokuapp.com\`; environment "Local" sets \`baseUrl = http://localhost:3001\`. Switching the dropdown re-points all 6 requests with zero edits.`,
        portfolioBuilder: `Export your collection (\`collection.json\`) and both environments into the project folder. Commit them alongside the README so the whole suite is version-controlled and shareable.`,
      },
    },
    {
      lessonNumber: 3,
      title: 'Designing & Automating the Test Suite',
      estimatedTime: '75 minutes',
      lessonOverview: `Requests that only return data aren't tests. Now you add assertions — status, body, schema and negative cases — turning your collection into an automated suite that passes or fails on its own.`,
      learningObjectives: ['Write meaningful assertions for status, body and schema', 'Add negative and authorisation test cases', 'Cover the full CRUD lifecycle with independent, repeatable tests'],
      lessonNotes: `## Assert more than the status
A test that only checks \`200\` misses wrong data (Module 2). For each request assert:
- The **status code** you expect
- Key **body fields** and their values
- The **response schema** where it matters

\`\`\`js
pm.test('status is 200', () => pm.response.to.have.status(200));
pm.test('has bookingid', () => {
  pm.expect(pm.response.json()).to.have.property('bookingid');
});
\`\`\`

## Schema validation
Use \`pm.response.to.have.jsonSchema(schema)\` (Module 5) so the *shape* of the response is guaranteed, not just one field.

## Don't forget the negatives
Portfolios that only show happy paths look junior. Add:
- Auth required: \`DELETE\` without a token → **403**
- Not found: \`GET /booking/999999\` → **404**
- Bad input: \`POST\` with a missing field → **400** (or documented behaviour)

## Make it repeatable
Each run should create its own data and delete it at the end, so the suite is **independent** and leaves nothing behind. That's what lets it run unattended in CI.`,
      workedExample: `On \`POST /booking\`: assert \`200\`, assert the body has \`bookingid\` (number) and \`booking.firstname\` equals what you sent, then validate against a JSON schema for the booking object. Add a negative test: \`DELETE /booking/{{bookingId}}\` with no \`Authorization\` header asserts \`403\`. The final happy-path delete (with token) asserts \`201\`/\`200\` and confirms a follow-up \`GET\` returns \`404\` — proving the record is gone.`,
      commonMistakes: `- Asserting only the status code and never the body or schema
- A suite with zero negative or auth-failure tests
- Tests that depend on data left over from a previous run, so they fail on a clean machine`,
      realWorldTip: `Negative and authorisation tests are what separate a portfolio that says "I can send requests" from one that says "I think like a tester". Reviewers look for them first.`,
      exercise: `Add assertions to every request: status, at least one body field, and a schema check on your main resource. Add at least two negative tests (an auth failure and a not-found). Confirm the whole collection passes when run top to bottom.`,
      reflectionQuestion: `Why must each test set up and clean up its own data rather than relying on the previous test?`,
      knowledgeCheck: `Beyond the status code, name two things a good API test should assert. (Answer: body field values and the response schema)`,
      completionChecklist: ['I assert status, body and schema', 'I have at least two negative / auth tests', 'The suite covers full CRUD', 'It runs cleanly top to bottom and leaves no data behind'],
      enhancements: {
        industryStory: `A candidate's collection had 40 requests and every single test was \`status === 200\`. It looked impressive until I asked "what happens without a token?" — the suite had no answer. One thoughtful negative test would have told me more than all 40 green ticks.`,
        visualAid: { type: 'comparison', title: 'Weak vs strong assertions', headers: ['Layer', 'Weak suite', 'Strong suite'], rows: [['Status', 'Checks 200', 'Checks exact expected code'], ['Body', 'Ignored', 'Key fields + values'], ['Schema', 'None', 'jsonSchema validated'], ['Negatives', 'None', 'Auth 403, not-found 404, bad-input 400'], ['Cleanup', 'Leaves data', 'Deletes what it created']] },
        davidTip: `I write the negative tests first when I can. It forces me to ask "how is this meant to fail?" — and the answer usually reveals whether the developers thought about it at all.`,
        badGood: { label: 'a delete test', bad: `\`DELETE /booking/{{bookingId}}\` asserts \`200\` and stops — the record might still exist.`, good: `\`DELETE\` asserts \`201\`/\`200\`, then a follow-up \`GET /booking/{{bookingId}}\` asserts \`404\`, proving the delete actually worked.` },
        miniChallenge: `Add one negative test that proves authorisation is enforced, and explain in a comment what a *failure* of that test would mean for security.`,
        modelAnswer: `## Example\n\`pm.test('delete without token is rejected', () => pm.response.to.have.status(403));\` — if this ever returned 200, any unauthenticated caller could delete bookings, a serious access-control flaw.`,
        portfolioBuilder: `Store your JSON schemas in a \`schemas/\` folder and re-export the collection with all assertions included. Your suite is now genuinely automated — it decides pass/fail on its own.`,
      },
    },
    {
      lessonNumber: 4,
      title: 'Reporting & Documentation',
      estimatedTime: '60 minutes',
      lessonOverview: `A test suite nobody can read is a test suite nobody trusts. You'll run your collection through Newman on the command line, generate a shareable HTML report, and write the documentation that turns a folder of files into a portfolio piece.`,
      learningObjectives: ['Run a collection headlessly with Newman', 'Generate a clean HTML report a non-tester can read', 'Document the suite so anyone can run it'],
      lessonNotes: `## Run it with Newman
Newman (Module 8) runs your collection from the command line — no clicking. Point it at the exported collection and environment:
\`\`\`bash
newman run collection.json -e public.postman_environment.json
\`\`\`
Green output means every assertion passed, headlessly.

## Generate a shareable report
Install the HTML reporter and produce a file a manager can open in a browser:
\`\`\`bash
npm i -g newman-reporter-htmlextra
newman run collection.json -e public.postman_environment.json \\
  -r htmlextra --reporter-htmlextra-export report.html
\`\`\`
The report shows pass/fail counts, timings and each assertion — no Postman needed to read it.

## Document so anyone can run it
Update your \`README.md\` with:
- **Prerequisites** (Node, Newman, the htmlextra reporter)
- **How to run** (the exact commands, copy-pasteable)
- **What it tests** (the objectives from Session 1)
- **A screenshot** of the passing report

## Why documentation is the multiplier
Good docs turn "my project" into "our project". A reviewer who can clone and run your suite in two minutes rates it far higher than one who can't get past step one.`,
      workedExample: `From the project folder: \`newman run collection.json -e public.postman_environment.json -r cli,htmlextra --reporter-htmlextra-export report.html\`. The terminal prints a summary table (iterations, requests, assertions, failures = 0); \`report.html\` opens in any browser showing every request, its assertions, and response times. You add a screenshot of the green report to the README under "Results".`,
      commonMistakes: `- Only ever running in the Postman GUI, so there's no headless proof it works
- Committing a report but no instructions on how to reproduce it
- A README that assumes the reader already has Newman and the reporter installed`,
      realWorldTip: `Write the README as if the reader has never seen your project and has two minutes. If they can clone it, run one command, and see a green report, you've demonstrated more professionalism than most senior testers manage.`,
      exercise: `Install Newman and the htmlextra reporter, run your collection headlessly, and generate \`report.html\`. Then write a README section with copy-pasteable run instructions and a screenshot of the passing report.`,
      reflectionQuestion: `Why does running through Newman prove something that running only in the Postman GUI does not?`,
      knowledgeCheck: `Which command-line tool runs a Postman collection headlessly for CI and reporting? (Answer: Newman)`,
      completionChecklist: ['I can run my collection with Newman', 'I generate a readable HTML report', 'My README lets anyone reproduce the run', 'The report shows all assertions passing'],
      enhancements: {
        industryStory: `A tester swore his suite worked — but it only ran in his Postman with his saved variables. On a clean machine it fell over instantly. The day he got it running through Newman with an exported environment, it became something the whole team could trust and put in the pipeline. Headless is the honesty test.`,
        visualAid: { type: 'timeline', title: 'From collection to shareable report', steps: [{ label: 'Export', detail: 'collection.json + environment.json' }, { label: 'Install', detail: 'npm i -g newman newman-reporter-htmlextra' }, { label: 'Run', detail: 'newman run … -r htmlextra' }, { label: 'Report', detail: 'report.html generated' }, { label: 'Document', detail: 'README with commands + screenshot' }] },
        davidTip: `I always paste the exact command into the README, tested by copy-pasting it into a fresh terminal myself. If it doesn't run first time for me, it won't run for a hiring manager — and they won't email to ask why.`,
        badGood: { label: 'run instructions', bad: `README says "run the collection in Postman". No commands, no environment, no reporter — impossible to reproduce headlessly.`, good: `README lists prerequisites and one copy-pasteable \`newman run …\` command that produces \`report.html\` on a clean machine.` },
        miniChallenge: `On a fresh terminal, follow only your own README instructions to run the suite. Note anything that didn't work first time and fix the docs.`,
        modelAnswer: `## Example\nMy README's "Run" section: \`npm i -g newman newman-reporter-htmlextra\` then \`newman run collection.json -e public.postman_environment.json -r cli,htmlextra --reporter-htmlextra-export report.html\`. Following it cold produced a green report with zero edits.`,
        portfolioBuilder: `Commit \`report.html\` and a screenshot of it to the project folder, and add the run instructions to your README. Your suite is now reproducible by anyone — the hallmark of a professional artefact.`,
      },
    },
    {
      lessonNumber: 5,
      title: 'Publishing Your API Testing Portfolio',
      estimatedTime: '45 minutes',
      lessonOverview: `Everything comes together. You publish the project to a public repository, write it up so a hiring manager instantly understands its value, and learn how they'll actually assess it. This is the artefact you'll link to on your CV and in interviews.`,
      learningObjectives: ['Publish the project to a public Git repository', 'Write a portfolio-ready README that sells the work', 'Understand how a hiring manager assesses the finished piece'],
      lessonNotes: `## Publish it
Put the whole project on GitHub (public):
- \`README.md\`, \`collection.json\`, environment files, \`schemas/\`, \`report.html\`, screenshot
- A sensible \`.gitignore\` (no \`node_modules\`, no secrets)
- **Never commit real tokens or keys** — use placeholder environment values

## Write the README to sell it
Lead with value, not mechanics. Cover, in order:
1. **What this is** — one line: "An automated API test suite for the restful-booker API."
2. **What it demonstrates** — CRUD, auth, negatives, schema validation, Newman/CI.
3. **How to run it** — the copy-pasteable commands from Session 4.
4. **Results** — the screenshot of the green report.

## See it as they will
A hiring manager skims for signal: is it real, does it run, and does the author *think*? Structure, negative tests, and clear docs are the signals. A wall of \`status === 200\` is noise.

## The finish line
When this is live and linked on your CV, you have something 90% of applicants don't: proof, not claims. That is the entire point of a portfolio.`,
      workedExample: `You push the folder to \`github.com/yourname/api-testing-portfolio\`. The README opens with "Automated API test suite for restful-booker — CRUD, auth, negative and schema tests, run via Newman with an HTML report." A reviewer reads it in 90 seconds, runs \`newman run …\`, sees the green report, and has concrete evidence you can scope, build, automate and document API tests. You link that repo from your CV under "Projects".`,
      commonMistakes: `- Committing real API tokens or a \`.env\` with secrets to a public repo
- A README that explains *how* it's built but never *why it's worth looking at*
- Leaving \`node_modules\` and clutter in the repo so the signal is buried`,
      realWorldTip: `Recruiters and managers spend under two minutes on a portfolio link. The first paragraph of your README does 80% of the work — make it say what the project is and what it proves, before any setup detail.`,
      exercise: `Publish your project to a public GitHub repo with a portfolio-ready README (what it is, what it demonstrates, how to run, results screenshot). Add the repo link to your CV or LinkedIn. Confirm the repo contains no secrets.`,
      reflectionQuestion: `If a manager only reads the first paragraph of your README, what must it convey?`,
      knowledgeCheck: `What must you never commit to a public portfolio repository? (Answer: real tokens, keys or secrets)`,
      completionChecklist: ['I have published the project to a public repo', 'My README sells the work in its first paragraph', 'The repo contains no secrets', 'The link is on my CV / LinkedIn'],
      enhancements: {
        industryStory: `The best junior hire I ever made linked one repo on her CV: a small but immaculate API test suite with a README I could run in a minute. It told me more than three years of "responsible for testing" bullet points ever could. She had proof. In the interview we just talked through her repo — she'd already passed.`,
        visualAid: { type: 'comparison', title: 'How a manager reads your portfolio', headers: ['They look for', 'Weak signal', 'Strong signal'], rows: [['Runs?', 'GUI-only, no instructions', 'One Newman command, green report'], ['Judgement', 'Only happy paths', 'Negatives + auth + schema'], ['Structure', 'Flat, unnamed', 'Folders, clear names, README'], ['Clarity', '"How" but no "why"', 'Value stated up front'], ['Safety', 'Secrets committed', 'Placeholders, clean .gitignore']] },
        davidTip: `When I review a candidate's repo, I clone it and run it before I read a word of the CV. If it runs green in one command, I'm already leaning yes. Make that first command work, and the rest of the interview is yours to lose.`,
        badGood: { label: 'README opening line', bad: `"This project uses Postman and Newman and has some tests in it."`, good: `"An automated API test suite for restful-booker demonstrating CRUD, auth, negative and schema testing, runnable in one command with an HTML report."` },
        miniChallenge: `Rewrite your README's first two sentences so a non-technical recruiter understands what the project is and why it's impressive — no jargon.`,
        modelAnswer: `## Example\n"This is an automated test suite for a hotel-booking API. It proves the API works correctly, blocks unauthorised deletes, and returns the right data shape — and it runs and reports itself with a single command."`,
        managersReview: { intro: `Here's how I, as a hiring manager, would assess your finished portfolio in the two minutes I actually spend on it:`, strengths: ['It runs on a clean machine with one documented command', 'It covers full CRUD plus negative and authorisation cases', 'The README states the value before the mechanics', 'The HTML report shows every assertion, readable without Postman'], improvements: ['Add a short "what I would test next" section to show forward thinking', 'Include one data-driven run over a CSV to show scale', 'Wire the Newman run into a GitHub Actions badge for live CI proof'], gaps: ['No note on how the suite would slot into a real pipeline or release gate', 'No mention of limitations (e.g. performance/load explicitly out of scope)', 'No brief reflection on a bug the tests would have caught in production'] },
        portfolioBuilder: `This is the finish line: your public repository IS your portfolio artefact. Confirm it runs green from a fresh clone, the README sells it in one paragraph, no secrets are committed, and the link sits on your CV. You now have proof, not claims — the outcome of the entire course.`,
        resourcePreview: { name: 'API Portfolio Publishing Checklist', purpose: 'A final checklist covering repo structure, README, secrets and CV placement.', whenToUse: 'Run through it just before you make the repository public and share the link.', formats: ['PDF', 'Markdown'] },
      },
    },
  ],
};
