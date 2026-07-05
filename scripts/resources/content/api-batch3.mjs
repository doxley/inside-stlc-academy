// API Testing Masterclass — resource batch 3 (automation, AI prompts, checklist).
const COURSE = 'API Testing Masterclass';
const proTip = (text) => ({ t: 'callout', variant: 'pro', title: 'Inside STLC Pro Tip', text });

export default [
  {
    slug: 'newman-ci-automation-guide',
    title: 'Newman & CI/CD Automation Guide',
    subtitle: 'Run your Postman collections from the command line and in CI.',
    courseTitle: COURSE, category: 'Automation Resources',
    blocks: [
      { t: 'h1', text: 'What Newman Is' },
      { t: 'p', text: 'Newman is Postman’s command-line collection runner. It executes the exact same collections, environments and tests you build in the Postman app, but headlessly — which means your API checks can run on a build server, on a schedule, or as a pre-deployment gate rather than only when someone clicks Send. If you can run a collection in Postman, you can run it in CI with Newman.' },

      { t: 'h1', text: 'Installing Newman' },
      { t: 'p', text: 'Newman is distributed as an npm package and needs Node.js (LTS) installed first. Install it globally so it is on your PATH: npm i -g newman' },
      { t: 'ul', items: [
        'Check the install worked: newman --version',
        'For the rich HTML report, also install the reporter: npm i -g newman-reporter-htmlextra',
        'On CI it is often cleaner to install locally (npm i -D newman) and call it via npx newman, so the version is pinned in package.json.',
      ] },

      { t: 'h1', text: 'Running a Collection with an Environment' },
      { t: 'p', text: 'Export your collection and environment from Postman (as v2.1 JSON), then run: newman run collection.json -e env.json — the -e flag supplies the environment file so variables like {{baseUrl}} and {{token}} resolve exactly as they do in the app.' },
      { t: 'ul', items: [
        'Keep secrets out of the committed environment file — inject tokens at run time (see the CI section).',
        'You can point at a shared collection by URL instead of a file if you use Postman’s API.',
        'Use --folder "Smoke" to run only a named folder for a fast subset.',
      ] },

      { t: 'h1', text: 'Data-Driven Runs' },
      { t: 'p', text: 'To run the same requests against many rows of input, supply a data file with -d: newman run collection.json -e env.json -d data.csv — Newman executes every request once per row, substituting {{columnName}} variables from the file. Both CSV and JSON data files are supported.' },
      { t: 'ul', items: [
        'The CSV header row names the variables you reference in the request as {{header}}.',
        'Add an iterationData-aware assertion so each row asserts against its own expected value.',
        'Great for boundary and negative data sets without duplicating requests.',
      ] },

      { t: 'h1', text: 'Reporters' },
      { t: 'p', text: 'Reporters control how results are output. Select one or more with --reporters and configure them with reporter-specific flags.' },
      { t: 'table', headers: ['Reporter', 'Flag', 'Best for'], rows: [
        ['cli', '--reporters cli', 'Human-readable summary in the terminal / build log (default)'],
        ['json', '--reporters json --reporter-json-export out.json', 'Machine-readable results for dashboards or further processing'],
        ['junit', '--reporters junit --reporter-junit-export results.xml', 'CI test-result panels that expect JUnit XML'],
        ['htmlextra', '--reporters htmlextra --reporter-htmlextra-export report.html', 'A rich, shareable HTML report for stakeholders'],
      ] },
      { t: 'p', text: 'You can combine them, e.g. --reporters cli,htmlextra,junit — the CLI keeps the build log readable while the HTML and JUnit files become artifacts.' },

      { t: 'h1', text: 'Exit Codes (and Why CI Cares)' },
      { t: 'p', text: 'Newman returns exit code 0 when every request and assertion passes, and a non-zero code when anything fails. CI systems read that exit code to decide whether a step passed — so a failing API test automatically fails the pipeline and blocks a bad build, without anyone reading the log.' },
      { t: 'ul', items: [
        'Do not swallow the exit code (e.g. avoid trailing "|| true") or failures will pass silently.',
        'Use --bail to stop on the first failure when you want fast feedback.',
        'Treat a non-zero Newman exit as a genuine gate, not a warning to ignore.',
      ] },
      { t: 'callout', variant: 'best', title: 'Best Practice', text: 'Let the exit code do the gating. A green pipeline should mean every API assertion passed; a red one should mean a real problem. Never mask Newman’s exit code just to keep the build green.' },

      { t: 'h1', text: 'Running in GitHub Actions' },
      { t: 'p', text: 'A GitHub Actions workflow is a YAML file in .github/workflows/. In plain terms, the job runs these steps in order:' },
      { t: 'ol', items: [
        'Checkout — use actions/checkout to pull your repository (including the exported collection and environment files) onto the runner.',
        'Set up Node — use actions/setup-node with an LTS version so npm and npx are available.',
        'Install Newman — run npm i -g newman newman-reporter-htmlextra (or npm ci if it is a dev dependency).',
        'Run the collection — run newman run collection.json -e env.json --reporters cli,htmlextra,junit --reporter-htmlextra-export report.html --reporter-junit-export results.xml, injecting secrets via --env-var "token=${{ secrets.API_TOKEN }}".',
        'Upload the report — use actions/upload-artifact to attach report.html and results.xml so anyone can download and view them from the run.',
      ] },
      { t: 'p', text: 'Because the Run step fails the job on a non-zero exit code, the pipeline blocks automatically when an assertion fails — the report artifact is still uploaded so you can see exactly what broke.' },

      { t: 'h1', text: 'Scheduling & Monitoring' },
      { t: 'ul', items: [
        'Run smoke collections on a schedule (a cron trigger in your CI) to catch environment drift and third-party outages between deployments.',
        'Keep scheduled monitors small and fast — a handful of critical journeys, not the full suite.',
        'Send failures to a Slack/Teams channel or email so someone is alerted rather than discovering it in the next build.',
        'Postman Monitors are a hosted alternative if you do not want to own the scheduling in CI.',
      ] },

      { t: 'h1', text: 'Common Mistakes' },
      { t: 'ul', items: [
        'Committing real tokens or passwords inside the exported environment file instead of injecting them as secrets.',
        'Masking the exit code so the pipeline stays green even when tests fail.',
        'Letting the collection and environment JSON in the repo drift out of sync with what is in the Postman app.',
        'Producing no artifact, so a failed CI run gives you no way to see what actually happened.',
        'Running the entire suite as a synchronous deploy gate when only a fast smoke set is needed.',
      ] },

      proTip('Export your collection and environment into the repo and run them with Newman in CI from day one. The moment your API checks live in the pipeline instead of one person’s Postman app, they become a real quality gate the whole team can trust.'),
    ],
  },

  {
    slug: 'ai-prompt-library-api-testing',
    title: 'AI Prompt Library for API Testing',
    subtitle: 'Ready-to-use prompts to accelerate API testing — used responsibly.',
    courseTitle: COURSE, category: 'AI Prompt Packs',
    blocks: [
      { t: 'h1', text: 'Using AI Responsibly for API Testing' },
      { t: 'p', text: 'AI is a fast assistant for generating test ideas, assertions, data and documentation — but it is an assistant, not an oracle. It does not know your system and it will confidently invent endpoints, fields and status codes that do not exist. Everything it produces is a draft you must verify against the real API and its documentation before you rely on it.' },
      { t: 'ul', items: [
        'Never paste real secrets, API tokens, passwords, customer data or anything confidential into an AI tool. Redact and use placeholders (e.g. {{token}}, user@example.com).',
        'Treat every generated endpoint, field name and status code as unverified until you have checked it against the actual API and docs.',
        'Use AI to widen your thinking, not to replace it — you still own the sign-off decision.',
        'Prefer sanitised, representative examples over production payloads when you need to give the model context.',
      ] },
      { t: 'callout', variant: 'mistake', title: 'Watch Out — Hallucinated Endpoints & Fields', text: 'AI regularly fabricates endpoints, query parameters, response fields and status codes that sound plausible but do not exist in your API. Never add a test for something just because the model suggested it — confirm it against the real contract or documentation first, or you will ship tests that assert fiction.' },

      { t: 'h1', text: 'Endpoint Analysis' },
      { t: 'p', text: 'Prompt: "Here is an API endpoint description (or OpenAPI snippet): [paste sanitised spec]. Explain in plain English what this endpoint does, its inputs (path, query, body), its expected responses and status codes, and any authentication it requires. List anything that is ambiguous or missing from the description."' },
      { t: 'ul', items: [
        'How to use: paste a sanitised spec or the endpoint docs, then read the explanation to confirm your own understanding.',
        'What to check: that the inputs, responses and auth it describes actually match the real endpoint — the "ambiguous or missing" list is the most valuable part.',
      ] },

      { t: 'h1', text: 'Generating Test Ideas' },
      { t: 'p', text: 'Prompt: "Act as a senior QA engineer. For this endpoint [paste sanitised description], list test scenarios grouped into: positive/happy path, negative and error handling, boundary and edge cases, authentication and authorisation, and data validation. For each, state the scenario and the expected result."' },
      { t: 'ul', items: [
        'How to use: use the output as a checklist to expand your coverage, then prune anything that does not apply.',
        'What to check: that expected results are realistic for your API, and add domain-specific cases the model cannot know about.',
      ] },

      { t: 'h1', text: 'Writing Assertions' },
      { t: 'p', text: 'Prompt: "Here is a sample JSON response: [paste sanitised response]. Write Postman test assertions (using pm.test and pm.expect) that verify the status code, key fields exist and have the correct types, and a couple of business rules I describe: [describe rules]. Keep assertions specific and independent."' },
      { t: 'ul', items: [
        'How to use: paste a real (sanitised) response so assertions match the actual shape, then drop them into the Tests tab.',
        'What to check: that field names and types match the real payload exactly, and that no assertion depends on volatile data like timestamps or generated IDs.',
      ] },

      { t: 'h1', text: 'Generating Test Data' },
      { t: 'p', text: 'Prompt: "Generate a CSV of 10 test data rows for this request. Columns: [list fields]. Include valid values, boundary values (min, max, just over), and invalid values (wrong type, empty, too long). Use fake, non-personal data only, and add a column describing the expected outcome for each row."' },
      { t: 'ul', items: [
        'How to use: feed the CSV into a Newman data-driven run (-d data.csv) to exercise many cases at once.',
        'What to check: that boundaries reflect your real limits, the data is entirely synthetic, and the expected-outcome column is correct.',
      ] },

      { t: 'h1', text: 'Writing API Docs' },
      { t: 'p', text: 'Prompt: "Turn this endpoint and sample request/response [paste sanitised examples] into clear API documentation: purpose, method and path, request parameters and body, an example request, an example response, and the possible status codes with their meaning. Write for a developer who has never used this API."' },
      { t: 'ul', items: [
        'How to use: use the draft as a starting point for a README or handover note, then edit for house style.',
        'What to check: every parameter, field and status code against the live API — accurate docs matter more than polished prose.',
      ] },

      { t: 'h1', text: 'Reviewing a Response' },
      { t: 'p', text: 'Prompt: "Here is a request and the response I received [paste sanitised request + response]. Does the response look correct and consistent for this request? Point out anything suspicious: wrong status code, missing or unexpected fields, inconsistent types, values that contradict the request, or signs of an error being returned as a success."' },
      { t: 'ul', items: [
        'How to use: use it as a second pair of eyes when a response "looks fine" but you want a sanity check.',
        'What to check: confirm any issue it raises against the spec — and remember it cannot know your business rules unless you tell it.',
      ] },

      proTip('Keep your best prompts in a shared team file and refine them as you learn what your API returns. A tuned prompt that includes a real (sanitised) response and your specific business rules produces far more useful, less hallucinated output than a generic one-liner.'),
    ],
  },

  {
    slug: 'api-testing-checklist',
    title: 'API Testing Checklist',
    subtitle: 'A thorough checklist to cover before you sign off an API.',
    courseTitle: COURSE, category: 'Checklists',
    blocks: [
      { t: 'h1', text: 'How to Use This Checklist' },
      { t: 'p', text: 'Work through each section for the endpoints you own. Tick an item only when you have genuinely observed the behaviour — not when you assume it. Not every line applies to every endpoint; use judgement, but be able to justify anything you skip.' },

      { t: 'h1', text: 'Functional / CRUD' },
      { t: 'ul', items: [
        'Verified that a valid POST creates the resource and returns it (or its location).',
        'Verified that GET returns the resource just created, with the values sent.',
        'Verified that PUT/PATCH updates the resource and the change persists on a subsequent GET.',
        'Verified that DELETE removes the resource and a following GET returns 404.',
        'Verified that list/collection endpoints return the expected items with working pagination, filtering and sorting.',
      ] },

      { t: 'h1', text: 'Status Codes' },
      { t: 'ul', items: [
        'Verified that success responses use the correct 2xx code (200 read/update, 201 create, 204 no content).',
        'Verified that bad input returns 400 and not a 500.',
        'Verified that missing/invalid auth returns 401 and forbidden access returns 403.',
        'Verified that unknown resources return 404.',
        'Verified that the wrong HTTP method on a valid path returns 405.',
        'Verified that server faults return 5xx and are not masked as 200.',
      ] },

      { t: 'h1', text: 'Response Body & Schema' },
      { t: 'ul', items: [
        'Verified that the response matches the agreed schema (field names, types and structure).',
        'Verified that required fields are always present and correctly typed.',
        'Verified that optional/null fields behave as documented rather than breaking clients.',
        'Verified that no sensitive fields (password hashes, internal IDs, tokens) leak in the payload.',
        'Verified that dates, numbers and enums use consistent formats across endpoints.',
      ] },

      { t: 'h1', text: 'Negative & Error Handling' },
      { t: 'ul', items: [
        'Verified that missing required fields return a clear, structured error.',
        'Verified that wrong data types and malformed JSON are rejected gracefully (no stack trace to the client).',
        'Verified that error responses use a consistent shape (code, message, details).',
        'Verified that error messages are helpful to developers without exposing internal implementation detail.',
      ] },

      { t: 'h1', text: 'Boundary & Edge Cases' },
      { t: 'ul', items: [
        'Verified minimum and maximum values for numeric and length-limited fields, plus just-over-the-limit values.',
        'Verified empty strings, empty arrays and empty request bodies where relevant.',
        'Verified very large payloads and long strings are handled or rejected cleanly.',
        'Verified special characters, Unicode and injection-style input are handled safely.',
        'Verified duplicate creation and idempotency behave as documented.',
      ] },

      { t: 'h1', text: 'Headers & Content Types' },
      { t: 'ul', items: [
        'Verified that Content-Type on requests and responses is correct (e.g. application/json).',
        'Verified that the API rejects or handles an unsupported Accept / Content-Type appropriately (e.g. 415).',
        'Verified that required custom and correlation headers are honoured.',
        'Verified that CORS and caching headers are set as expected for the client.',
      ] },

      { t: 'h1', text: 'Authentication & Authorisation' },
      { t: 'ul', items: [
        'Verified that protected endpoints reject requests with no token (401).',
        'Verified that expired, malformed or tampered tokens are rejected.',
        'Verified that a user cannot access or modify another user’s data (no broken object-level authorisation).',
        'Verified that role/permission boundaries are enforced (403 for insufficient rights).',
        'Verified that tokens and credentials are never returned or logged in responses.',
      ] },

      { t: 'h1', text: 'Performance Basics' },
      { t: 'ul', items: [
        'Verified that typical requests respond within an acceptable, agreed time.',
        'Verified that list endpoints paginate rather than returning unbounded result sets.',
        'Verified behaviour under a modest concurrent load (no obvious errors or timeouts).',
        'Verified that rate limiting (if any) responds with 429 and is documented.',
      ] },

      { t: 'h1', text: 'Contract / Versioning' },
      { t: 'ul', items: [
        'Verified that the response conforms to the published contract / OpenAPI spec.',
        'Verified that the API version is clear (URL or header) and behaves as documented.',
        'Verified that changes are backwards compatible, or the version was bumped.',
        'Verified that adding a new optional field does not break existing consumers.',
      ] },

      { t: 'h1', text: 'Documentation & Handover' },
      { t: 'ul', items: [
        'Verified that every endpoint, parameter and status code is documented and matches actual behaviour.',
        'Verified that example requests and responses are present and correct.',
        'Verified that authentication and error formats are explained.',
        'Verified that the Postman collection / Newman run is exported, committed and reproducible by someone else.',
        'Verified that known limitations and open issues are recorded for handover.',
      ] },

      proTip('A tick means "I saw this happen", not "this should work". The most valuable rows on this checklist are the negative, authorisation and boundary cases — those are exactly where APIs fail in production, and exactly where testers who only check the happy path miss the real defects.'),
    ],
  },
];
