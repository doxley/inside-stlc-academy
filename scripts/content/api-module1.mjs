// API Testing Masterclass — Module 1: API Fundamentals.
// Full lesson content (base fields + enhancements). This is the TEMPLATE for all
// modules: every lesson must fill every base field and a rich `enhancements` block.
export default {
  courseSlug: 'api-testing-masterclass',
  moduleNumber: 1,
  lessons: [
    {
      lessonNumber: 1,
      title: 'What Is an API?',
      estimatedTime: '12 minute read',
      lessonOverview: `An API is how two pieces of software talk to each other. Before you can test one, you need a clear mental model of what an API actually is and why it exists.`,
      learningObjectives: ['Explain what an API is in plain language', 'Describe the client–server relationship', 'Identify where APIs sit in a real application'],
      lessonNotes: `## The plain-English definition
An **API** (Application Programming Interface) is a contract that lets one program request something from another and get a predictable response back. You don't need to know *how* the other program works — only what to send and what you'll get.

## An everyday analogy
Ordering at a restaurant: you (the **client**) give your order to the waiter (the **API**), who takes it to the kitchen (the **server**) and brings back your food (the **response**). You never enter the kitchen — the waiter is the defined interface.

## Where APIs live
- The **frontend** calls APIs to fetch and save data.
- The **backend** exposes those APIs and talks to databases.
- Apps also call **third-party** APIs (payments, maps, email).

## Why testers care
Most business logic and integration risk lives at the API layer — below the UI. Testing there is faster, more stable, and catches bugs the UI can hide.`,
      workedExample: `Open a weather app. When you type a city, it sends \`GET /weather?city=Sheffield\` to a weather service, which replies with JSON (temperature, conditions, forecast). The app draws the screen from that data — the UI is just a view of an API response.`,
      commonMistakes: `- Thinking an API is "a website" — it returns data, not pages
- Believing you must be a developer to test APIs
- Assuming the UI and the API always show the same thing (they often don't)`,
      realWorldTip: `APIs are where the real contract between systems lives. If you can read and test an API, you can find bugs long before they ever reach a screen.`,
      exercise: `In one or two sentences, describe an app you use daily and name one thing it almost certainly requests from an API.`,
      reflectionQuestion: `In the client–server model, which side sends the request?`,
      knowledgeCheck: `In the client–server model, which side sends the request? (Answer: the client)`,
      completionChecklist: ['I can explain what an API is without jargon', 'I can describe the client–server relationship', 'I can point to where APIs sit in an app'],
      enhancements: {
        industryStory: `A manual tester I mentored spent weeks only clicking through the UI. The day she opened the API behind the "Save" button, she found the app was silently storing the wrong customer id — a bug no amount of UI testing had surfaced. Understanding what an API is changed how she tested everything after that.`,
        visualAid: { type: 'comparison', title: 'The restaurant analogy', headers: ['Restaurant', 'Software'], rows: [['You (the diner)', 'The client (app / browser)'], ['The waiter', 'The API'], ['The kitchen', 'The server'], ['Your order', 'The request'], ['The food', 'The response']] },
        davidTip: `Never assume the UI tells the whole truth. The moment you can read the API behind a screen, you can see what the application is *really* doing — and that is where the interesting bugs live.`,
        miniChallenge: `Pick one app you used today. Write one sentence describing something it almost certainly requested from an API, and what it got back.`,
        modelAnswer: `## Example\nA food-delivery app: on open it sent \`GET /restaurants?lat=..&lng=..\` and got back a JSON list of nearby restaurants (name, rating, delivery time), which it drew as cards.`,
        resourcePreview: { name: 'API Fundamentals Cheat Sheet', purpose: 'One-page reference for API vocabulary.', whenToUse: 'Keep it open through Module 1.', formats: ['PDF'] },
      },
    },
    {
      lessonNumber: 2,
      title: 'Requests & Responses: How the Web Talks',
      estimatedTime: '14 minute read',
      lessonOverview: `Every API interaction is a request and a response. Understanding their anatomy is the foundation of everything else in this course.`,
      learningObjectives: ['Break a request into its parts (method, URL, headers, body)', 'Break a response into its parts (status, headers, body)', 'Read a real request/response exchange'],
      lessonNotes: `## The request has four parts
1. **Method** — the action: GET, POST, PUT, PATCH, DELETE
2. **URL / endpoint** — what you're acting on
3. **Headers** — metadata: \`Content-Type\`, \`Authorization\`, \`Accept\`
4. **Body** — the data you send (mostly POST/PUT/PATCH), usually JSON

## The response has three parts
1. **Status code** — did it work?
2. **Headers** — metadata about the response
3. **Body** — the returned data (usually JSON)

## Reading an exchange
\`GET /orders/42\` → \`200 OK\` + a JSON order. \`POST /orders\` with a body → \`201 Created\`. Each request is **stateless** — it carries everything the server needs.`,
      workedExample: `Request: \`POST /orders\` with \`Content-Type: application/json\` and body \`{"item":"mug","qty":2}\`. Response: \`201 Created\`, header \`Location: /orders/99\`, body \`{"id":99,"item":"mug","qty":2,"status":"pending"}\`. Check: status is 201, body echoes input, an id was assigned.`,
      commonMistakes: `- Ignoring headers — auth and content-type problems hide there
- Only checking the status code and never the body
- Forgetting the body must match the Content-Type you declared`,
      realWorldTip: `Always inspect the full response — status, headers and body. Many "passing" API tests only checked the status code and missed a wrong payload.`,
      exercise: `Write out the four parts of a request to fetch user 7 from \`https://api.example.com\`.`,
      reflectionQuestion: `Which part of the response tells you whether the request succeeded?`,
      knowledgeCheck: `Which part of the response tells you whether the request succeeded? (Answer: the status code)`,
      completionChecklist: ['I can name the parts of a request', 'I can name the parts of a response', 'I can read a request/response exchange'],
      enhancements: {
        industryStory: `A release went out where every API test "passed" — because they only checked for \`200 OK\`. In production the endpoint was returning 200 with an empty body. The lesson stuck: a status code is necessary, never sufficient.`,
        visualAid: { type: 'timeline', title: 'The life of a request', steps: [{ label: 'Build', detail: 'client sets method, URL, headers, body' }, { label: 'Send', detail: 'request travels to the server' }, { label: 'Process', detail: 'server runs the logic' }, { label: 'Respond', detail: 'status + headers + body come back' }, { label: 'Read', detail: 'tester inspects the response' }] },
        davidTip: `Read three things on every response: the status code, the key headers (auth, content-type), and the body. Testers who skip the body ship bugs.`,
        badGood: { label: 'asserting a response', bad: `The test only checks \`status == 200\`. It passes even when the body is empty or wrong.`, good: `The test checks \`status == 201\`, that the body contains the created \`id\`, and that returned fields match what was sent.` },
        miniChallenge: `Write out the four parts of a request that fetches user 7 from \`https://api.example.com\`.`,
        modelAnswer: `## Example\nMethod: \`GET\`. URL: \`https://api.example.com/users/7\`. Headers: \`Accept: application/json\`. Body: none (GET has no body).`,
      },
    },
    {
      lessonNumber: 3,
      title: 'REST Principles & Resources',
      estimatedTime: '13 minute read',
      lessonOverview: `REST is the style most modern APIs follow. Knowing its principles tells you what to expect from an endpoint before you even test it.`,
      learningObjectives: ['Explain what REST means', 'Describe resources and how URLs represent them', 'Recognise statelessness and its testing impact'],
      lessonNotes: `## REST in one line
**RE**presentational **S**tate **T**ransfer: you act on **resources** using standard HTTP methods.

## Resources and URLs
- Collection: \`/users\`
- Single item: \`/users/42\`
- Sub-resource: \`/users/42/orders\`
Nouns, not verbs — the *method* is the verb.

## Key principles
- **Statelessness** — each request is independent
- **Uniform interface** — consistent methods and status codes
- **Client–server separation**

## Why it matters
Once you know an API is RESTful you can predict behaviour: \`GET /users/42\` reads, \`DELETE /users/42\` removes, a missing user returns \`404\`. Predictability = testability.`,
      workedExample: `A bookshop API: \`GET /books\` (list), \`GET /books/12\` (one), \`POST /books\` (add), \`PUT /books/12\` (replace), \`DELETE /books/12\` (remove). If \`GET /getBook?id=12\` appears instead, the API isn't cleanly RESTful — worth noting in your approach.`,
      commonMistakes: `- Expecting verbs in URLs (\`/createUser\`) — REST uses nouns + methods
- Assuming a session is remembered between requests
- Treating every API as REST when some are RPC or GraphQL`,
      realWorldTip: `RESTful design is a gift to testers: it makes behaviour predictable. When an API breaks its own conventions, that unpredictability is a risk worth flagging.`,
      exercise: `Design the five REST endpoints (method + path) for managing "projects".`,
      reflectionQuestion: `Should REST URLs contain nouns or verbs, and why?`,
      knowledgeCheck: `In REST, should URLs contain nouns or verbs? (Answer: nouns — the HTTP method is the verb)`,
      completionChecklist: ['I can explain REST simply', 'I can design resource URLs', 'I understand statelessness'],
      enhancements: {
        industryStory: `An API used \`/getUser?id=5\` for reads but \`/users\` for creates — inconsistent and non-RESTful. New joiners kept guessing endpoints wrong. Consistent REST conventions save real time and prevent real mistakes.`,
        visualAid: { type: 'comparison', title: 'REST methods on a resource', headers: ['Method', 'Action', 'Example'], rows: [['GET', 'Read', 'GET /books/12'], ['POST', 'Create', 'POST /books'], ['PUT', 'Replace', 'PUT /books/12'], ['PATCH', 'Update part', 'PATCH /books/12'], ['DELETE', 'Remove', 'DELETE /books/12']] },
        davidTip: `When an API follows REST properly you can often guess an endpoint correctly first try. When you can't, that unpredictability is a testing risk worth writing down.`,
        miniChallenge: `Design the five REST endpoints (method + path) for managing "projects".`,
        modelAnswer: `## Example\n\`GET /projects\`, \`GET /projects/{id}\`, \`POST /projects\`, \`PUT /projects/{id}\`, \`DELETE /projects/{id}\`.`,
      },
    },
    {
      lessonNumber: 4,
      title: 'Where API Testing Fits in the SDLC',
      estimatedTime: '12 minute read',
      lessonOverview: `API testing is one of the highest-value activities a tester can do. This lesson shows why, and where it fits in the test pyramid and delivery lifecycle.`,
      learningObjectives: ['Place API testing on the test pyramid', 'Explain the value of shifting testing left', 'Describe when API tests run in delivery'],
      lessonNotes: `## The test pyramid
- **Unit** (many, fast) — individual functions
- **API / integration** (fewer, still fast) — services talking
- **UI / end-to-end** (few, slow, brittle) — the whole app

API tests sit in the middle: far more stable and faster than UI, far broader than unit.

## Shift left
APIs are often built **before** the UI. Testing them early finds integration and data bugs when they're cheapest to fix.

## Where they run
- During development
- In CI/CD on every commit (via Newman — Module 8)
- In regression suites and monitoring`,
      workedExample: `A team's checkout kept failing flaky UI tests. Moving the core checks to the API layer (\`POST /cart\`, \`POST /orders\`) made them fast and stable — and caught a real tax-calculation bug days before release.`,
      commonMistakes: `- Only testing through the UI and ignoring the API layer
- Waiting for the UI to exist before testing anything
- Duplicating every UI test at the API level instead of choosing the right layer`,
      realWorldTip: `If a test can be done at the API layer instead of the UI, it usually should — faster, more stable, and it runs on every build.`,
      exercise: `List two checks that are better done at the API layer than through the UI, and say why.`,
      reflectionQuestion: `Why are API tests generally more stable than end-to-end UI tests?`,
      knowledgeCheck: `On the test pyramid, are API tests faster or slower than UI/end-to-end tests? (Answer: faster and more stable)`,
      completionChecklist: ['I can place API testing on the pyramid', 'I can explain shifting left', 'I know when API tests run'],
      enhancements: {
        industryStory: `A team's end-to-end checkout suite was so flaky nobody trusted it. We moved the core checks to the API layer — they ran green in seconds on every commit, and within a week caught a tax-rounding bug that would have shipped.`,
        visualAid: { type: 'timeline', title: 'The test pyramid (bottom to top)', steps: [{ label: 'Unit', detail: 'many · fastest · functions' }, { label: 'API / integration', detail: 'fewer · fast · services talking' }, { label: 'UI / end-to-end', detail: 'few · slow · whole app' }] },
        davidTip: `If a check can be done at the API layer, it usually should be. Speed, stability, and it runs on every build — three things UI tests struggle to give you.`,
        miniChallenge: `Name two checks that belong at the API layer rather than the UI, and say why for each.`,
        modelAnswer: `## Example\n1) Validating an order total — pure logic, fast and exact at the API. 2) Checking a 404 for a missing resource — trivial at the API, slow via the UI.`,
        portfolioBuilder: `Start an "API test strategy" note for your portfolio: which checks you'd place at the API layer vs the UI for a sample feature, and why.`,
      },
    },
    {
      lessonNumber: 5,
      title: 'API Testing vs UI Testing',
      estimatedTime: '11 minute read',
      lessonOverview: `API and UI testing answer different questions. Knowing which to use — and when — is what separates a strategic tester from a button-clicker.`,
      learningObjectives: ['Contrast API and UI testing', 'Choose the right layer for a given check', 'Explain why the UI can mask API problems'],
      lessonNotes: `## Different questions
- **API testing** asks: *is the logic and data correct?*
- **UI testing** asks: *can a user actually do this on screen?*

## Trade-offs
| | API | UI |
|---|---|---|
| Speed | Fast | Slow |
| Stability | High | Lower |
| Setup | Low | Higher |
| User realism | Lower | High |

## The UI can hide API bugs
A screen might show "Success" while the API returned the wrong data. Only testing the API reveals it.

## Rule of thumb
Push logic, data and edge-case checks **down** to the API. Keep the UI for a few true end-to-end journeys.`,
      workedExample: `A discount API returned \`£0.00\` off for a valid code, but the UI defaulted to full price with no error — so UI testing "passed". An API test asserting the discounted total caught it immediately.`,
      commonMistakes: `- Doing everything through the UI because it "feels real"
- Assuming a green UI means the data underneath is correct
- Never testing the API independently of the screen`,
      realWorldTip: `When the UI and the API disagree, trust the API response — then find out why the UI hid the truth.`,
      exercise: `Give one example of a bug the UI could show as "passing" while the API is actually wrong.`,
      reflectionQuestion: `Which layer better answers "is the returned data correct?" and why?`,
      knowledgeCheck: `Which layer better answers "is the returned data correct?" (Answer: the API layer)`,
      completionChecklist: ['I can contrast API and UI testing', 'I can choose the right layer', 'I understand how UIs can mask API bugs'],
      enhancements: {
        industryStory: `A discount code returned £0.00 off for a valid customer, but the UI just showed full price with no error — so manual UI testing "passed" and it reached production. One API assertion on the discounted total would have caught it on day one.`,
        visualAid: { type: 'comparison', title: 'API vs UI testing', headers: ['Dimension', 'API', 'UI'], rows: [['Speed', 'Fast', 'Slow'], ['Stability', 'High', 'Lower'], ['Setup cost', 'Low', 'Higher'], ['User realism', 'Lower', 'High'], ['Best for', 'Logic & data', 'Real journeys']] },
        davidTip: `When the UI and the API disagree, believe the API — then investigate why the UI hid the truth. A green screen is not proof the data is right.`,
        badGood: { label: 'test strategy', bad: `Every check is done through the UI — slow, flaky, and blind to wrong data behind a "Success" message.`, good: `Logic, data and edge cases are checked at the API; a small set of true end-to-end journeys is kept at the UI.` },
        miniChallenge: `Give one bug the UI could report as "passing" while the API is actually returning something wrong.`,
        modelAnswer: `## Example\nA profile update shows "Saved!" but the API stored the old email because the UI sent a cached value. The UI looks correct; the API response reveals the stale data.`,
      },
    },
    {
      lessonNumber: 6,
      title: 'Setting Up Your API Testing Toolkit',
      estimatedTime: '25 minutes',
      lessonOverview: `Time to get hands-on. You install Postman, point it at a free public API, and send your very first request.`,
      learningObjectives: ['Install and open Postman', 'Send a first GET request to a public API', 'Read the status code and JSON response'],
      lessonNotes: `## Your toolkit
- **Postman** (free) — the client we use throughout the course
- A **free public API**: \`https://jsonplaceholder.typicode.com\` and \`https://reqres.in\`
- No coding required to start

## Step by step
1. Download Postman from postman.com and open it.
2. Click **New → HTTP Request**.
3. Set method **GET**, URL \`https://jsonplaceholder.typicode.com/users/1\`.
4. Click **Send**.
5. You should see **200 OK** and a JSON user object.

## What you're looking at
The bottom pane shows the **status** (200), **time**, **size**, and **body** (JSON). You just made an API request and read the response.`,
      workedExample: `\`GET https://reqres.in/api/users?page=2\` returns \`200 OK\` and a body with a \`data\` array plus pagination (\`page\`, \`total\`, \`total_pages\`). Change \`page=2\` to \`page=3\` and watch the data change — you're already exploring an API.`,
      commonMistakes: `- Putting the URL in the wrong field or forgetting \`https://\`
- Choosing the wrong method (POST when you meant GET)
- Panicking at a 404 — it usually just means a wrong path`,
      realWorldTip: `Keep one "scratch" request tab open while you learn. Being able to poke any endpoint in seconds is how experienced API testers explore quickly.`,
      exercise: `Send a GET to \`https://jsonplaceholder.typicode.com/posts/1\` and note the status code and two fields from the body.`,
      reflectionQuestion: `What does a 200 status code tell you, and what does it not tell you?`,
      knowledgeCheck: `What status code indicates a successful GET request? (Answer: 200 OK)`,
      completionChecklist: ['Postman is installed and open', 'I sent a GET request successfully', 'I can read the status code and JSON body', 'I saved my first request'],
      enhancements: {
        industryStory: `The testers who get good at APIs fastest all do the same thing: they keep one scratch request open and poke endpoints constantly. Curiosity plus a ready tool beats any amount of reading.`,
        visualAid: { type: 'timeline', title: 'Your first request', steps: [{ label: 'Install', detail: 'download & open Postman' }, { label: 'New request', detail: 'New → HTTP Request' }, { label: 'GET', detail: 'jsonplaceholder.typicode.com/users/1' }, { label: 'Send', detail: 'click Send' }, { label: 'Read', detail: '200 OK + JSON body' }] },
        davidTip: `Save your first working request into a collection straight away. Your Module 10 portfolio project grows from exactly these small saved requests.`,
        miniChallenge: `Send a GET to \`https://jsonplaceholder.typicode.com/posts/1\` and note the status code plus two fields from the body.`,
        modelAnswer: `## Example\nStatus \`200 OK\`. Body fields: \`userId\` and \`title\` (also \`id\`, \`body\`).`,
        managersReview: { intro: `If I reviewed your first hands-on setup as a lead, I'd look for:`, strengths: ['Postman installed and a request sent', 'You can read the status code and body', 'First request saved into a collection'], gaps: ['Only reading, never sending', 'Not noticing the response body', 'Nothing saved to build on'], improvements: ['Send at least three different GET requests', 'Change a path/param and observe the change', 'Name and save your collection clearly'] },
        portfolioBuilder: `Create a Postman collection "API Masterclass — <your name>" and save your first request into it. This becomes your Module 10 portfolio artefact.`,
        resourcePreview: { name: 'Postman Starter Collection', purpose: 'A ready-to-import collection with your first practice requests.', whenToUse: 'Import it now and add to it as the course progresses.', formats: ['JSON'] },
      },
    },
  ],
};
