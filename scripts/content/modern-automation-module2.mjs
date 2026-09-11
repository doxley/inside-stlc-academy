// Module 2 — "TypeScript for Testers"
// Course: Modern Test Automation Bootcamp
// Code-heavy module teaching just enough TypeScript to write clean, typed Playwright tests.

export default {
  courseSlug: 'modern-test-automation-bootcamp',
  moduleNumber: 2,
  lessonsPrefix: 'modern-automation',
  enhPrefix: 'modern-automation',
  enhSep: '-',
  lessons: [
    // ---------------------------------------------------------------------
    {
      lessonNumber: 1,
      title: 'Why TypeScript for Automation',
      estimatedTime: '20 min',
      lessonOverview:
        'TypeScript adds a type layer on top of JavaScript that catches whole classes of mistakes before your tests ever run. This lesson explains why that matters for automation and why Playwright is built around it.',
      learningObjectives: [
        'Explain how static types catch defects earlier than runtime failures',
        'Compare plain JavaScript and TypeScript for maintaining a test suite',
        'Describe how Playwright ships with first-class TypeScript support'
      ],
      lessonNotes: `## What TypeScript actually is

TypeScript is JavaScript with an optional type layer. You write mostly ordinary JavaScript, add type annotations where they help, and a compiler checks the whole codebase before anything runs. The types are erased at build time — the browser and Node never see them — so there is no runtime cost. What you gain is a second pair of eyes reading your code as you type it.

For test automation this matters more than most people expect. A test suite is code that other people depend on to tell the truth. A flaky or silently broken test is worse than no test at all, because it erodes trust. Types remove an entire category of silent breakage.

## The failures types catch

Consider a helper that plucks a field from a fixture:

- In JavaScript, \`user.emial\` (a typo) returns \`undefined\`, the test carries on, and you get a confusing assertion failure three lines later — or worse, a false pass.
- In TypeScript, \`user.emial\` is flagged in your editor the moment you type it, with a suggestion for \`email\`.

Types catch typos in property names, wrong argument order, calling something that is not a function, and passing a string where a number was expected. None of these need a running browser to discover. That shifts feedback from minutes (run the suite, wait, read the trace) to milliseconds (a red squiggle as you type).

## Plain JS vs TS for test code

- **Refactoring.** Rename a page-object method in JS and you hunt for call sites by hand. In TS the compiler lists every place that breaks.
- **Onboarding.** A new joiner reads \`login(user: TestUser): Promise<void>\` and immediately knows what to pass and what they get back. In JS they read the body and guess.
- **Editor help.** Autocomplete on a typed Playwright \`page\` object offers every real method and hides the rest. This alone speeds writing tests noticeably.

The cost is small: a \`tsconfig.json\`, a build or transpile step (Playwright handles this for you), and the discipline of occasionally writing a type. For a suite that lives for years, that trade is heavily in your favour.

## Playwright is TypeScript-native

Playwright ships its own type definitions in the box. When you install \`@playwright/test\`, you get full typing for \`page\`, \`expect\`, locators, and fixtures with no extra setup. The default project scaffold (\`npm init playwright@latest\`) offers a TypeScript template that just works. You are not bolting types onto a JS library — you are using a library that was designed type-first.

## Key takeaway

TypeScript moves defect detection from runtime to the moment you type, which is exactly what a test suite — code other people trust — needs. Because Playwright is TypeScript-native, adopting it costs almost nothing and pays back every time you refactor, onboard, or write a new test.`,
      workedExample: `Compare the same helper in plain JavaScript and in TypeScript.

Plain JavaScript — the typo is invisible until runtime:

~~~js
function buildLoginPayload(user) {
  return { username: user.name, password: user.pasword }; // typo: pasword
}
~~~

The \`password\` field silently becomes \`undefined\` and your login test fails with a misleading error.

TypeScript — the same typo is caught before the test runs:

~~~ts
interface TestUser {
  name: string;
  password: string;
}

function buildLoginPayload(user: TestUser) {
  // Error: Property 'pasword' does not exist on type 'TestUser'.
  return { username: user.name, password: user.pasword };
}
~~~

The compiler rejects \`user.pasword\` and your editor suggests \`password\`. You fix it in seconds, and the browser is never even launched.`,
      commonMistakes: `- Treating TypeScript as "JavaScript with extra ceremony" and fighting the compiler by scattering \`any\` everywhere — that throws away the safety you installed it for.
- Assuming types cost runtime performance. They are erased at build time; there is zero runtime overhead.
- Expecting types to catch logic bugs. They catch shape and contract errors, not "I asserted the wrong value". Both matter; do not confuse them.`,
      realWorldTip:
        'On a delivery team the payoff shows up during refactors. When someone renames a page-object method or changes a fixture shape, the compiler produces an exact list of every test that must change — turning a nervy afternoon of manual grep-and-hope into a tight red-to-green loop. Make that visible in code review: a green compile is a cheap signal that a change is at least structurally sound.',
      exercise:
        'Take one small existing JavaScript test helper (or write a five-line one) and rename it to a `.ts` file. Add type annotations to its parameters and return value. Introduce a deliberate typo in a property name and confirm your editor flags it before you run anything. Write two sentences on what the compiler caught.',
      reflectionQuestion:
        'Think about the last confusing test failure you debugged. Would a static type have caught it before the run — and if not, what kind of bug was it?',
      knowledgeCheck:
        'Q: Do TypeScript type annotations run in the browser or Node at test time? A: No. Types are erased during compilation; only plain JavaScript executes, so there is no runtime cost.',
      completionChecklist: [
        'I can explain why static types catch defects earlier than runtime failures',
        'I can give a concrete example of a bug TypeScript catches that JavaScript hides',
        'I can describe how Playwright provides TypeScript support out of the box'
      ],
      enhancements: {
        industryStory:
          'A team ran their end-to-end suite in plain JavaScript for two years. A fixture field was quietly renamed in one PR, and because nothing checked property names, a dozen tests kept passing while asserting against undefined values. The gap was only noticed when a real regression slipped to production. After migrating the suite to TypeScript, the same class of rename produced an immediate compile error listing every affected test.',
        badGood: {
          label: 'Silencing the compiler versus using it',
          bad: `// Reaches for 'any' the moment a type is inconvenient
function submit(form: any) {
  return form.feilds.map((f: any) => f.value); // typo survives
}`,
          good: `interface Field { value: string; }
interface Form { fields: Field[]; }

function submit(form: Form) {
  return form.fields.map((f) => f.value); // typo would be caught
}`
        },
        davidTip:
          'Adopt TypeScript at the boundary first: type your fixtures and page objects, where a wrong shape does the most damage. You do not need to type every line on day one to get most of the benefit.'
      }
    },

    // ---------------------------------------------------------------------
    {
      lessonNumber: 2,
      title: 'Variables, Types & Type Inference',
      estimatedTime: '25 min',
      lessonOverview:
        'You will learn how to declare variables with let and const, the primitive types you will use daily, union types, and — crucially — when to annotate a type versus letting TypeScript infer it.',
      learningObjectives: [
        'Choose between let and const correctly in test code',
        'Use the core primitive and union types for test data',
        'Decide when to annotate a type and when inference is enough'
      ],
      lessonNotes: `## Declaring variables: const first

Prefer \`const\` for everything, and reach for \`let\` only when you genuinely reassign. In test code most values — a locator, a fixture, an expected string — are set once and read many times. \`const\` signals that intent and prevents accidental reassignment.

- \`const baseUrl = 'https://staging.example.com';\` — never changes.
- \`let attempts = 0;\` then \`attempts += 1;\` — a counter that legitimately changes.

Avoid \`var\` entirely. It has confusing scoping rules and has no place in modern code.

## The primitives you will actually use

- \`string\` — text: URLs, selectors, expected labels.
- \`number\` — counts, timeouts, indexes.
- \`boolean\` — flags: \`isLoggedIn\`, feature toggles.
- \`null\` and \`undefined\` — absence of a value; you will meet these when a locator finds nothing.

## Union types

A union says "one of these types". They model the small, closed sets that appear everywhere in tests:

~~~ts
type Environment = 'dev' | 'staging' | 'prod';
let target: Environment = 'staging';
target = 'prod';   // fine
target = 'preprod'; // Error: not assignable to Environment
~~~

That string-literal union is one of the most useful tools in a test codebase. It turns a loosely-typed \`string\` into a fixed menu, so a mistyped environment name is a compile error, not a mysterious 404.

## Inference: let TypeScript do the work

TypeScript infers types from the value on the right-hand side. You do **not** need to annotate obvious cases:

~~~ts
const name = 'Ada';        // inferred as string
const retries = 3;         // inferred as number
const isReady = true;      // inferred as boolean
~~~

Adding \`: string\` here is noise. The rule of thumb:

- **Let inference work** when the value makes the type obvious (literals, simple expressions).
- **Annotate** when there is no value to infer from (function parameters), when you want to widen or constrain a type deliberately (a union), or when an empty container's element type is not yet knowable (\`const ids: number[] = [];\`).

## const and literal types

\`const\` also narrows inference. \`const env = 'staging'\` is inferred as the literal type \`'staging'\`, not the broad \`string\`. That narrowing is what makes unions and \`const\` work so well together for test configuration.

## Key takeaway

Reach for \`const\` by default and let inference type your obvious values; annotate only where there is no value to infer from or where you want to constrain a value to a fixed set with a union. That keeps test code both safe and uncluttered.`,
      workedExample: `A small configuration block for a test run, using inference, a union, and const:

~~~ts
type Environment = 'dev' | 'staging' | 'prod';

const env: Environment = 'staging';        // annotated: constrain to the menu
const baseUrl = envToUrl(env);             // inferred: string
const defaultTimeout = 30_000;             // inferred: number
let flakyRetries = 0;                       // let: it will be reassigned

function envToUrl(target: Environment): string {
  const urls: Record<Environment, string> = {
    dev: 'https://dev.example.com',
    staging: 'https://staging.example.com',
    prod: 'https://example.com',
  };
  return urls[target];
}
~~~

Note what is and is not annotated. \`env\` is annotated because we want the compiler to reject any value outside the union. \`baseUrl\` and \`defaultTimeout\` are left to inference because their values make the type obvious. \`flakyRetries\` uses \`let\` because a retry loop reassigns it.`,
      commonMistakes: `- Annotating everything, including obvious literals, which adds visual noise without safety: \`const count: number = 3\` gains nothing over \`const count = 3\`.
- Using \`let\` by habit when \`const\` would do, hiding which values actually change.
- Typing a config field as plain \`string\` when it is really one of a fixed set — you lose the compiler's ability to catch a mistyped environment name.`,
      realWorldTip:
        'Model environment names, user roles, and feature-flag states as string-literal unions in a shared types file. On a delivery team this means a mistyped role or environment is caught in review by a failed compile rather than surfacing as a puzzling test failure on someone else\'s branch.',
      exercise:
        'Create a small `run-config.ts` that declares: an `Environment` union of three values, a `const` for the chosen environment, and a `let` counter for retries. Deliberately assign an invalid environment value and confirm the compiler rejects it, then fix it.',
      reflectionQuestion:
        'Where in your current test code are you using a plain string that is really one of a small fixed set of values? What would change if you made it a union?',
      knowledgeCheck:
        'Q: Should you annotate `const port = 8080`? A: No. TypeScript infers `number` from the literal, so an annotation adds noise without adding safety. Annotate where there is no value to infer from, or to constrain to a union.',
      completionChecklist: [
        'I can choose const versus let based on whether a value is reassigned',
        'I can define and use a string-literal union type',
        'I can decide when to annotate a variable and when to rely on inference'
      ],
      enhancements: {
        visualAid: {
          type: 'comparison',
          title: 'Annotate or infer?',
          headers: ['Situation', 'What to do', 'Why'],
          rows: [
            ['const with a literal value', 'Let TypeScript infer', 'The value already makes the type obvious'],
            ['Function parameter', 'Annotate', 'There is no value to infer the type from'],
            ['One of a fixed set of strings', 'Annotate with a union', 'Constrains to the valid menu; catches typos'],
            ['Empty array to be filled later', 'Annotate the element type', 'An empty [] infers as never[] and blocks pushes']
          ]
        },
        davidTip:
          'A good heuristic: if deleting the type annotation would leave the compiler equally sure of the type, delete it. Keep annotations that genuinely add information, especially unions.'
      }
    },

    // ---------------------------------------------------------------------
    {
      lessonNumber: 3,
      title: 'Functions, Parameters & Return Types',
      estimatedTime: '25 min',
      lessonOverview:
        'Functions are where types earn their keep in a test suite. You will learn to type parameters and return values, use optional and default parameters, and write arrow functions the way Playwright expects.',
      learningObjectives: [
        'Annotate function parameters and return types clearly',
        'Use optional and default parameters for flexible test helpers',
        'Write and read arrow functions, including the ones Playwright passes tests as'
      ],
      lessonNotes: `## Typed parameters and returns

A function signature is a contract. Typing it tells every caller — and the compiler — exactly what goes in and what comes out.

~~~ts
function buildUrl(base: string, path: string): string {
  return \`\${base}/\${path.replace(/^\\//, '')}\`;
}
~~~

Parameters almost always need annotations, because there is no value for the compiler to infer from. Return types are often inferred correctly, but annotating them on anything non-trivial is good practice: it documents intent and catches a body that accidentally returns the wrong thing.

## Optional parameters

A trailing \`?\` marks a parameter as optional. Inside the function it may be \`undefined\`, so you must handle that case:

~~~ts
function openMenu(name: string, timeout?: number): void {
  const wait = timeout ?? 5_000; // default when not supplied
  // ...
}
~~~

The \`??\` (nullish coalescing) operator supplies a fallback only when the left side is \`null\` or \`undefined\`.

## Default parameters

Often cleaner than optional-plus-fallback: give the parameter a default directly.

~~~ts
function openMenu(name: string, timeout: number = 5_000): void {
  // timeout is always a number here
}
~~~

TypeScript infers the type from the default, so you rarely need to annotate a defaulted parameter. Prefer defaults over optional-and-coalesce when there is a sensible default value.

## Arrow functions

Arrow functions are the compact function form you will read and write constantly:

~~~ts
const double = (n: number): number => n * 2;
~~~

They matter for testers because Playwright's test API takes them everywhere. Every \`test(...)\` body is an arrow function that receives a fixtures object and returns a promise:

~~~ts
import { test, expect } from '@playwright/test';

test('homepage has a title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Example/);
});
~~~

The \`async\` keyword and the destructured \`{ page }\` parameter are both fully typed by Playwright — you get autocomplete on \`page\` for free.

## Key takeaway

Type your parameters always and your return values on anything non-trivial; use default parameters for sensible fallbacks and optional parameters where absence is genuinely meaningful. Arrow functions are the shape Playwright hands you every test in, so reading them fluently is essential.`,
      workedExample: `A reusable login helper showing typed parameters, a default, and an async return type:

~~~ts
import { Page } from '@playwright/test';

interface Credentials {
  username: string;
  password: string;
}

async function login(
  page: Page,
  creds: Credentials,
  landingPath: string = '/dashboard',
): Promise<void> {
  await page.goto('/login');
  await page.getByLabel('Username').fill(creds.username);
  await page.getByLabel('Password').fill(creds.password);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.waitForURL(landingPath);
}
~~~

Walking through the signature: \`page: Page\` is Playwright's own type, so every method on \`page\` autocompletes. \`creds: Credentials\` forces callers to pass a correctly shaped object. \`landingPath\` defaults to \`/dashboard\`, so most callers omit it. The \`Promise<void>\` return type is what makes the function awaitable and signals it produces no value — only side effects.`,
      commonMistakes: `- Forgetting a helper is async and not returning \`Promise<void>\` (or letting it be inferred wrongly), so callers forget to await it.
- Using an optional parameter and then not handling the \`undefined\` case, which crashes only on the code path that omits it.
- Making several parameters optional and positional, so callers must pass \`undefined\` placeholders. Prefer a single typed options object once you have more than two or three settings.`,
      realWorldTip:
        'On a delivery team, shared helpers like `login` become the backbone of the suite. Type their parameters strictly and give sensible defaults so that the common call is one line and the unusual call is still safe. A well-typed helper signature is documentation that cannot go out of date.',
      exercise:
        'Write a typed helper `fillForm(page: Page, fields: Record<string, string>): Promise<void>` that fills each labelled field with its value. Add an optional `submit` boolean parameter (default true) that clicks the submit button when true. Confirm it compiles.',
      reflectionQuestion:
        'When a helper grows to four or five parameters, at what point does an options object become clearer than a long positional list — and why?',
      knowledgeCheck:
        'Q: What return type should an async Playwright helper that performs actions but returns no value have? A: `Promise<void>`. It is async so it returns a promise, and `void` signals there is no meaningful resolved value.',
      completionChecklist: [
        'I can annotate function parameters and choose an appropriate return type',
        'I can use default and optional parameters correctly',
        'I can read and write the arrow-function form Playwright passes tests as'
      ],
      enhancements: {
        badGood: {
          label: 'Positional flags versus an options object',
          bad: `async function open(page: Page, name: string, wait?: number, force?: boolean, exact?: boolean) {
  // callers must pass open(page, 'Menu', undefined, true) — what is 'true'?
}`,
          good: `interface OpenOptions { wait?: number; force?: boolean; exact?: boolean; }

async function open(page: Page, name: string, options: OpenOptions = {}) {
  // callers write open(page, 'Menu', { force: true }) — self-documenting
}`
        },
        miniChallenge:
          'Refactor a helper of your own that has more than three positional parameters into one that takes a page plus a single typed options object with sensible defaults.'
      }
    },

    // ---------------------------------------------------------------------
    {
      lessonNumber: 4,
      title: 'Objects, Interfaces & Types',
      estimatedTime: '30 min',
      lessonOverview:
        'Test data has shape, and interfaces let you describe that shape once and reuse it everywhere. You will model fixtures with interfaces and type aliases, protect values with readonly, and handle nested structures.',
      learningObjectives: [
        'Model test data with interfaces and type aliases',
        'Use readonly to protect fixture values from mutation',
        'Describe nested and optional object shapes accurately'
      ],
      lessonNotes: `## Interfaces describe shape

An interface names the shape of an object so you can reuse it and let the compiler enforce it:

~~~ts
interface TestUser {
  id: number;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
}
~~~

Every object typed as \`TestUser\` must have exactly those properties, with those types. A missing \`email\` or a \`role\` of \`'guest'\` is a compile error. This is how you keep a growing folder of fixtures consistent.

## Interface versus type alias

TypeScript also has \`type\` aliases, which can name any type — including unions and primitives, not just objects:

~~~ts
type Role = 'admin' | 'editor' | 'viewer';
type Id = number;
~~~

For object shapes, \`interface\` and \`type\` are largely interchangeable. A common convention: use \`interface\` for object shapes (fixtures, page-object contracts) and \`type\` for unions and aliases. Consistency matters more than the exact choice; pick one and hold to it across the repo.

## Optional properties

A \`?\` marks a property that may be absent — useful for fixtures that vary:

~~~ts
interface TestUser {
  id: number;
  email: string;
  role: Role;
  displayName?: string; // may be omitted
}
~~~

Accessing \`user.displayName\` then has type \`string | undefined\`, so the compiler makes you handle the missing case.

## readonly protects fixtures

Shared fixtures should not be mutated by a test, or one test can corrupt another. \`readonly\` makes a property immutable after creation:

~~~ts
interface Config {
  readonly baseUrl: string;
  readonly timeout: number;
}

const config: Config = { baseUrl: 'https://staging.example.com', timeout: 30_000 };
config.baseUrl = 'https://prod.example.com'; // Error: cannot assign to readonly
~~~

For arrays, \`readonly string[]\` (or \`ReadonlyArray<string>\`) blocks \`push\` and friends. Mark shared, load-once test data \`readonly\` so accidental mutation is a compile error rather than a Heisenbug.

## Nested shapes

Real fixtures nest. Describe the inner shape with its own interface and reference it:

~~~ts
interface Address {
  city: string;
  postcode: string;
}

interface Account {
  owner: TestUser;
  billingAddress: Address;
  tags: readonly string[];
}
~~~

Small, named, composed interfaces read far better than one giant inline object type, and they are reusable across fixtures.

## Key takeaway

Model each distinct shape of test data as a small named interface, compose them for nested structures, and mark shared fixtures \`readonly\` so no test can mutate data another test depends on. This is what keeps a large fixture set trustworthy.`,
      workedExample: `Modelling a realistic account fixture with composition, an optional field, and readonly:

~~~ts
type Role = 'admin' | 'editor' | 'viewer';

interface Address {
  readonly city: string;
  readonly postcode: string;
}

interface TestUser {
  readonly id: number;
  readonly email: string;
  readonly role: Role;
  displayName?: string;
}

interface Account {
  readonly owner: TestUser;
  readonly billingAddress: Address;
  readonly tags: readonly string[];
}

const account: Account = {
  owner: { id: 1, email: 'ada@example.com', role: 'admin' },
  billingAddress: { city: 'Bristol', postcode: 'BS1 4DJ' },
  tags: ['beta', 'priority'],
};

// Compiler protects the fixture:
// account.owner.email = 'x'; // Error: readonly
// account.tags.push('new');  // Error: push does not exist on readonly array
~~~

The shape is described once, composed from reusable pieces, and locked down. Any test using \`account\` gets full autocomplete and cannot accidentally mutate shared state. Note \`displayName?\` — code reading it must handle \`undefined\`, which reflects that not every user has one.`,
      commonMistakes: `- Writing one enormous inline object type instead of small named interfaces, which cannot be reused and is painful to read.
- Forgetting that an optional property is \`T | undefined\`, then dereferencing it without a guard.
- Mutating a shared fixture inside a test. Without \`readonly\` this compiles, and the resulting cross-test contamination is one of the nastiest sources of flakiness.`,
      realWorldTip:
        'Keep a single `fixtures/types.ts` that defines the shapes of your test data, and import them wherever fixtures are built. On a delivery team this becomes the shared contract: when the product model changes, you update the interface once and the compiler shows every fixture and test that must follow. Marking those shapes readonly stops a careless test from poisoning the suite.',
      exercise:
        'Define interfaces for a `Product` (id, name, priceInPence, optional discountCode) and an `Order` that contains an array of readonly products and a `customer: TestUser`. Build one valid fixture object, then try to mutate a readonly field and confirm the compiler rejects it.',
      reflectionQuestion:
        'Which pieces of your current test data are shared across multiple tests, and would marking them readonly have caught any flakiness you have seen?',
      knowledgeCheck:
        'Q: What type does accessing an optional property `displayName?: string` produce? A: `string | undefined`. The compiler forces you to handle the possibility that it is absent.',
      completionChecklist: [
        'I can model object test data with interfaces and compose nested shapes',
        'I can use optional properties and handle the undefined case',
        'I can apply readonly to protect shared fixtures from mutation'
      ],
      enhancements: {
        industryStory:
          'A suite shared a single user fixture object across many tests to save setup time. One test mutated a field on that object mid-run, and every test that happened to run afterwards inherited the change. The failures moved around depending on run order, which made them nearly impossible to reproduce. Declaring the fixture type with readonly fields turned the offending mutation into a compile error and the flakiness disappeared.',
        davidTip:
          'Treat your fixture type definitions as a product artefact, not throwaway test plumbing. When they mirror the real domain model, updating them when the product changes becomes a guided task rather than a hunt.',
        visualAid: {
          type: 'comparison',
          title: 'interface versus type alias',
          headers: ['Aspect', 'interface', 'type'],
          rows: [
            ['Object shapes', 'Yes, idiomatic', 'Yes, also fine'],
            ['Unions (a | b | c)', 'No', 'Yes'],
            ['Naming a primitive', 'No', 'Yes (type Id = number)'],
            ['Common convention', 'Fixtures and object contracts', 'Unions and aliases']
          ]
        }
      }
    },

    // ---------------------------------------------------------------------
    {
      lessonNumber: 5,
      title: 'Arrays & Everyday Methods',
      estimatedTime: '30 min',
      lessonOverview:
        'Tests constantly work with collections — rows in a table, items in a list, a batch of results. This lesson covers typed arrays and the handful of methods (map, filter, find, some, every) you will use to assert on them.',
      learningObjectives: [
        'Declare and type arrays of test data',
        'Transform and query collections with map, filter and find',
        'Assert across a whole collection with some and every'
      ],
      lessonNotes: `## Typed arrays

An array type is the element type followed by \`[]\`:

~~~ts
const emails: string[] = ['a@x.com', 'b@x.com'];
const users: TestUser[] = [];
~~~

Annotate an empty array's element type. \`const ids = []\` infers \`never[]\` and will reject every \`push\`; \`const ids: number[] = []\` is what you want.

## map — transform every element

\`map\` produces a new array by applying a function to each element. Perfect for pulling one field out of a set of objects:

~~~ts
const names = users.map((u) => u.email); // string[]
~~~

The callback's parameter type is inferred from the array, so \`u\` is a \`TestUser\` with full autocomplete. The result type is inferred from what you return.

## filter — keep matching elements

\`filter\` returns a new array of the elements for which the callback is true:

~~~ts
const admins = users.filter((u) => u.role === 'admin'); // TestUser[]
~~~

Common in assertions: filter a table's rows to those in an "error" state, then assert the count is zero.

## find — the first match, or undefined

\`find\` returns the first matching element, or \`undefined\` if none match:

~~~ts
const ada = users.find((u) => u.email === 'ada@example.com'); // TestUser | undefined
~~~

Because it can be \`undefined\`, the compiler makes you guard before using it — which is exactly the check you want ("did we actually find the row?").

## some and every — collection-wide assertions

These return a \`boolean\` and read like plain English, which makes them ideal in \`expect\`:

~~~ts
const anyAdmin = users.some((u) => u.role === 'admin');   // at least one
const allVerified = users.every((u) => u.verified);        // all of them
~~~

Reach for these when a test asserts a property of a whole set: "every row shows a price", "no item is out of stock" (\`!items.some(...)\`).

## Applying it to Playwright results

Playwright's \`locator.all()\` returns an array of locators, and \`allTextContents()\` returns \`string[]\`. Those arrays flow straight into these methods:

~~~ts
const prices = await page.getByTestId('price').allTextContents();
expect(prices.every((p) => p.startsWith('£'))).toBe(true);
~~~

## Key takeaway

A small vocabulary — \`map\` to transform, \`filter\` to narrow, \`find\` for one item, \`some\`/\`every\` for whole-collection assertions — covers almost everything you do with test data. Each is fully typed, so the callback element and the result type are checked for you.`,
      workedExample: `Asserting on a batch of results pulled from the page, using several array methods together:

~~~ts
import { test, expect, Page } from '@playwright/test';

interface Row {
  name: string;
  priceInPence: number;
  inStock: boolean;
}

async function readRows(page: Page): Promise<Row[]> {
  const cells = page.getByRole('row');
  const count = await cells.count();
  const rows: Row[] = [];
  for (let i = 0; i < count; i++) {
    const row = cells.nth(i);
    rows.push({
      name: (await row.getByTestId('name').textContent()) ?? '',
      priceInPence: Number(await row.getByTestId('price').getAttribute('data-pence')),
      inStock: (await row.getByTestId('stock').textContent()) === 'In stock',
    });
  }
  return rows;
}

test('catalogue is priced and mostly in stock', async ({ page }) => {
  await page.goto('/catalogue');
  const rows = await readRows(page);

  // every row has a positive price
  expect(rows.every((r) => r.priceInPence > 0)).toBe(true);

  // at least one row is in stock
  expect(rows.some((r) => r.inStock)).toBe(true);

  // the cheapest in-stock item
  const cheapest = rows
    .filter((r) => r.inStock)
    .sort((a, b) => a.priceInPence - b.priceInPence)[0];
  expect(cheapest).toBeDefined();
});
~~~

\`readRows\` returns a typed \`Row[]\`, so every array method downstream knows its element shape. \`every\` and \`some\` express the assertions in one readable line each, and \`filter\` plus \`sort\` finds the cheapest in-stock item. Note the \`?? ''\` guarding \`textContent()\`, which can return \`null\`.`,
      commonMistakes: `- Leaving an empty array untyped (\`const rows = []\`), which infers \`never[]\` and rejects every push with a confusing error.
- Using \`find\` and then using the result without checking for \`undefined\`, so the test crashes when the item is absent instead of failing with a clear assertion.
- Forgetting that \`map\`/\`filter\` return new arrays and do not mutate the original, then wondering why the source is unchanged.`,
      realWorldTip:
        'On a delivery team these methods keep table and list assertions readable. Instead of a hand-rolled loop with a flag, a reviewer sees `expect(rows.every(r => r.priceInPence > 0)).toBe(true)` and understands the intent instantly. Readable assertions get reviewed properly; clever loops get skimmed.',
      exercise:
        'Given an array of `Order` objects (each with a `total` number and a `status` string), write expressions that produce: the list of totals, the orders with status `"failed"`, whether every order has a positive total, and the first order over £100. Confirm the types are what you expect.',
      reflectionQuestion:
        'Where in your current tests have you written a manual loop that map, filter, some or every would express more clearly — and would a reviewer grasp the intent faster?',
      knowledgeCheck:
        'Q: What does `array.find(...)` return when nothing matches, and what does the type force you to do? A: It returns `undefined` (type `T | undefined`), so the compiler forces you to guard the result before using it.',
      completionChecklist: [
        'I can declare typed arrays, including empty ones, correctly',
        'I can transform and narrow collections with map and filter',
        'I can assert across a whole collection with some and every'
      ],
      enhancements: {
        badGood: {
          label: 'Manual loop versus a collection method',
          bad: `let allPriced = true;
for (const r of rows) {
  if (r.priceInPence <= 0) { allPriced = false; break; }
}
expect(allPriced).toBe(true);`,
          good: `expect(rows.every((r) => r.priceInPence > 0)).toBe(true);`
        },
        miniChallenge:
          'Take a list assertion in your suite that uses a manual loop and a boolean flag, and rewrite it as a single some or every expression. Check it still reads clearly to someone who did not write it.'
      }
    },

    // ---------------------------------------------------------------------
    {
      lessonNumber: 6,
      title: 'Async/Await & Promises',
      estimatedTime: '30 min',
      lessonOverview:
        'Almost every Playwright action returns a promise, so async/await is the heart of writing tests. This lesson explains what promises are, why you await nearly everything, and the async pitfalls that cause flaky suites.',
      learningObjectives: [
        'Explain what a Promise represents and how await unwraps it',
        'Identify which Playwright calls must be awaited',
        'Avoid the common async pitfalls that cause flaky or false-passing tests'
      ],
      lessonNotes: `## What a promise is

A \`Promise<T>\` represents a value of type \`T\` that will be available later. Browser automation is inherently asynchronous — clicking a button, waiting for navigation, reading text all take time — so Playwright returns promises rather than blocking.

## await unwraps a promise

\`await\` pauses the current async function until the promise settles, then gives you the resolved value:

~~~ts
const title: string = await page.title(); // page.title() returns Promise<string>
~~~

Any function that uses \`await\` must itself be declared \`async\`, and calling it returns a promise. Playwright's \`test\` callback is already \`async\`, so you can \`await\` freely inside it.

## Why you await almost everything

Nearly every Playwright call is asynchronous: \`goto\`, \`click\`, \`fill\`, \`textContent\`, and the assertions via \`expect(...).toHaveText(...)\`. If you forget \`await\`, the action is still kicked off, but your code races ahead without waiting for it to finish. That is the single most common source of flaky Playwright tests.

~~~ts
// Wrong — nothing is awaited, order is not guaranteed
page.goto('/login');
page.getByRole('button', { name: 'Sign in' }).click();

// Right — each step completes before the next begins
await page.goto('/login');
await page.getByRole('button', { name: 'Sign in' }).click();
~~~

## Web-first assertions retry — and must be awaited

\`expect(locator).toHaveText('Done')\` returns a promise and automatically retries until the condition holds or a timeout expires. This built-in waiting is why you rarely need manual sleeps. But it only works if you \`await\` it:

~~~ts
await expect(page.getByRole('status')).toHaveText('Saved');
~~~

Forget the \`await\` and the assertion never actually runs to completion — the test can pass regardless of the real state. A forgotten \`await\` on an \`expect\` is a false-pass waiting to happen.

## Running things in parallel with Promise.all

When two independent things must happen and you want both, \`Promise.all\` awaits them together:

~~~ts
const [response] = await Promise.all([
  page.waitForResponse('**/api/save'),
  page.getByRole('button', { name: 'Save' }).click(),
]);
~~~

This starts the wait *before* the click, avoiding a race where the response arrives before you began listening.

## Loops and await

A \`for...of\` loop with \`await\` inside runs sequentially, which is usually what you want in a test. Do **not** put \`await\` inside \`array.forEach\` — \`forEach\` ignores the returned promises and does not wait. Use \`for...of\` instead.

## Key takeaway

In Playwright, treat "await it" as the default for every action and every assertion; a missing \`await\` either races your steps or, on an assertion, silently passes. Use \`for...of\` (not \`forEach\`) for awaiting in loops, and \`Promise.all\` to start a listener before the action that triggers it.`,
      workedExample: `A save flow that awaits correctly, uses a web-first assertion, and coordinates a click with a network wait:

~~~ts
import { test, expect } from '@playwright/test';

test('saving a note shows a confirmation', async ({ page }) => {
  await page.goto('/notes/new');
  await page.getByLabel('Title').fill('Release checklist');
  await page.getByLabel('Body').fill('Cut the tag, run the suite, ship.');

  // Start listening for the response before triggering it, so we never miss it.
  const [response] = await Promise.all([
    page.waitForResponse((r) => r.url().includes('/api/notes') && r.request().method() === 'POST'),
    page.getByRole('button', { name: 'Save' }).click(),
  ]);

  expect(response.ok()).toBe(true);

  // Web-first assertion: retries until the toast appears or times out.
  await expect(page.getByRole('status')).toHaveText('Note saved');
});
~~~

Every action and the assertion are awaited. \`Promise.all\` registers the \`waitForResponse\` listener before the click fires, closing the race where the response could arrive first. The final \`await expect(...)\` retries automatically, so no manual sleep is needed — and because it is awaited, a missing toast fails the test rather than slipping through.`,
      commonMistakes: `- Forgetting \`await\` on an action — steps race and the test is flaky.
- Forgetting \`await\` on an \`expect(locator)\` assertion — the assertion never resolves and the test can pass regardless of the real state. This is the dangerous one because it hides real defects.
- Using \`array.forEach(async ...)\` and expecting it to wait. \`forEach\` discards the promises; use \`for...of\`.
- Adding \`await page.waitForTimeout(1000)\` as a fix for flakiness instead of a web-first assertion that waits for the real condition.`,
      realWorldTip:
        'On a delivery team, enable the ESLint rule that flags floating promises (no-floating-promises) so a forgotten await on an action or assertion becomes a lint error in CI, not a flaky test three weeks later. Pair it with a team habit of banning waitForTimeout in review — a hard-coded sleep is almost always a web-first assertion in disguise.',
      exercise:
        'Write a test that fills a form, clicks submit, waits for the POST response with Promise.all, asserts the response is ok, and then asserts a success message appears with a web-first assertion. Then deliberately remove one await and describe what goes wrong.',
      reflectionQuestion:
        'A test passes reliably today but has a forgotten await on one assertion. Why is that more dangerous than a test that fails — and how would you catch it?',
      knowledgeCheck:
        'Q: Why is a forgotten await on `expect(locator).toHaveText(...)` especially dangerous? A: The assertion returns a promise that is never awaited, so it never runs to completion — the test can pass even when the condition is false, hiding a real defect.',
      completionChecklist: [
        'I can explain what a Promise is and how await unwraps it',
        'I can identify which Playwright calls and assertions must be awaited',
        'I can use for...of and Promise.all correctly instead of forEach and manual sleeps'
      ],
      enhancements: {
        industryStory:
          'A suite had one assertion missing its await. The test was green for months and everyone trusted it, until a regression broke exactly the behaviour that assertion was meant to guard — and the test stayed green through the whole incident. The fix was one keyword, but the lesson stuck: the team turned on lint rules for floating promises so the compiler would never let it recur.',
        badGood: {
          label: 'Awaiting in a loop',
          bad: `// forEach ignores the returned promises — nothing is actually awaited
items.forEach(async (item) => {
  await page.getByText(item).click();
});`,
          good: `// for...of awaits each iteration before the next
for (const item of items) {
  await page.getByText(item).click();
}`
        },
        visualAid: {
          type: 'flow',
          title: 'What happens to a forgotten await',
          steps: [
            { label: 'You call an action without await', detail: 'page.click() returns a promise that is never awaited' },
            { label: 'Code races ahead', detail: 'The next line runs before the click has completed' },
            { label: 'Order is not guaranteed', detail: 'Sometimes it works, sometimes it does not — flakiness' },
            { label: 'On an assertion, worse', detail: 'The check never resolves, so the test can pass regardless of state' }
          ]
        }
      }
    },

    // ---------------------------------------------------------------------
    {
      lessonNumber: 7,
      title: 'Modules, Imports & Project Setup',
      estimatedTime: '25 min',
      lessonOverview:
        'A real test repo is many files sharing helpers, fixtures and types. This lesson covers import/export, the tsconfig settings that matter, useful npm scripts, and a sensible folder structure.',
      learningObjectives: [
        'Use named and default exports and imports across files',
        'Understand the tsconfig options that matter for a Playwright repo',
        'Lay out a maintainable test repository with helpful npm scripts'
      ],
      lessonNotes: `## Modules: export and import

Each TypeScript file is a module. You share code between files with \`export\` and \`import\`. Prefer **named exports** — they keep names consistent across the codebase and support autocomplete:

~~~ts
// helpers/login.ts
export async function login(page: Page, creds: Credentials): Promise<void> { /* ... */ }
export const DEFAULT_TIMEOUT = 30_000;
~~~

~~~ts
// tests/checkout.spec.ts
import { login, DEFAULT_TIMEOUT } from '../helpers/login';
~~~

A file may also have one \`default\` export, imported without braces. Named exports are usually the better default for a test repo because renaming is explicit and grep-able.

## Re-exporting through a barrel

A small index file can re-export several modules so callers import from one place:

~~~ts
// helpers/index.ts
export * from './login';
export * from './navigation';
~~~

~~~ts
import { login, gotoDashboard } from '../helpers';
~~~

Use barrels sparingly — they are convenient but can obscure where something comes from if overused.

## tsconfig essentials

Playwright reads \`tsconfig.json\` for compiler options. The ones worth knowing:

- \`"strict": true\` — turns on the strict family (including \`strictNullChecks\`). Always on. This is what makes \`find\` return \`T | undefined\` and forces you to handle it.
- \`"target"\` and \`"module"\` — the JS version and module system to emit; a modern target such as \`ES2022\` is fine.
- \`"moduleResolution": "node"\` (or \`"bundler"\`) — how imports are resolved.
- \`"types": ["@playwright/test"]\` — optional, ensures Playwright's globals are picked up.
- \`"paths"\` — optional path aliases so you write \`import { login } from '@helpers/login'\` instead of long relative paths.

You rarely need to run \`tsc\` yourself for Playwright — it transpiles specs on the fly. But keeping a \`tsconfig.json\` with \`strict\` on gives your editor and any \`tsc --noEmit\` type-check the right rules.

## npm scripts

Put common commands behind \`npm run\` names in \`package.json\` so the whole team runs them the same way:

~~~json
{
  "scripts": {
    "test": "playwright test",
    "test:headed": "playwright test --headed",
    "test:ui": "playwright test --ui",
    "typecheck": "tsc --noEmit",
    "report": "playwright show-report"
  }
}
~~~

A \`typecheck\` script that runs \`tsc --noEmit\` in CI catches type errors that Playwright's on-the-fly transpile would otherwise ignore.

## Sensible folder structure

A structure that scales without much thought:

~~~text
tests/          the .spec.ts files, grouped by feature
pages/          page objects (one class per page or component)
helpers/        shared actions like login, navigation
fixtures/       test data and custom Playwright fixtures
fixtures/types.ts   shared interfaces for test data
playwright.config.ts
tsconfig.json
package.json
~~~

Keep specs thin: they orchestrate steps and assert. Push reusable interaction into page objects and helpers, and shared shapes into \`fixtures/types.ts\`. That separation is what lets a suite grow to hundreds of tests without turning into copy-paste.

## Key takeaway

Share code with named exports, keep \`strict\` on in \`tsconfig.json\`, wrap common commands in npm scripts (including a \`typecheck\`), and separate thin specs from reusable page objects, helpers and typed fixtures. This structure is what keeps a large test repo navigable and maintainable.`,
      workedExample: `A minimal but realistic repo slice showing exports, imports, and a typecheck script.

fixtures/types.ts — shared shapes:

~~~ts
export type Role = 'admin' | 'editor' | 'viewer';

export interface Credentials {
  readonly username: string;
  readonly password: string;
}
~~~

helpers/login.ts — a named export importing a shared type:

~~~ts
import { Page } from '@playwright/test';
import { Credentials } from '../fixtures/types';

export async function login(page: Page, creds: Credentials): Promise<void> {
  await page.goto('/login');
  await page.getByLabel('Username').fill(creds.username);
  await page.getByLabel('Password').fill(creds.password);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.waitForURL('/dashboard');
}
~~~

tests/dashboard.spec.ts — the spec pulls it together:

~~~ts
import { test, expect } from '@playwright/test';
import { login } from '../helpers/login';

const admin = { username: 'ada', password: 'correct-horse' };

test('admin reaches the dashboard', async ({ page }) => {
  await login(page, admin);
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
});
~~~

The spec is thin — it logs in and asserts. The reusable action lives in \`helpers/login.ts\`, the shared type in \`fixtures/types.ts\`. Running \`npm run typecheck\` (\`tsc --noEmit\`) verifies the whole graph compiles before any browser opens.`,
      commonMistakes: `- Using default exports everywhere, so the same helper gets imported under three different names and grep no longer finds all call sites.
- Leaving \`strict\` off (or missing) in \`tsconfig.json\`, which silently disables \`strictNullChecks\` and lets \`undefined\` bugs through.
- Putting reusable interaction logic directly in spec files, so it gets copy-pasted across tests instead of shared from a helper or page object.
- Relying only on Playwright's on-the-fly transpile and never running \`tsc --noEmit\`, so type errors in unrun code paths go unnoticed.`,
      realWorldTip:
        'On a delivery team, add a `typecheck` step to CI that runs `tsc --noEmit` before the tests. It is fast and catches type errors across the whole repo — including in helpers not exercised by the current run — so a broken import or a wrong fixture shape fails the pipeline early rather than surfacing as a confusing test error later. Agree the folder layout once and enforce it in review; consistency is what lets anyone find anything.',
      exercise:
        'Set up a minimal repo slice: a `fixtures/types.ts` with an exported interface, a `helpers/` file that imports it and exports a typed function, and a spec that imports the helper. Add a `typecheck` npm script running `tsc --noEmit` and confirm the project type-checks cleanly.',
      reflectionQuestion:
        'Looking at your current (or a typical) test repo, where does reusable logic leak into spec files, and which folder would it belong in instead?',
      knowledgeCheck:
        'Q: Why add a `tsc --noEmit` typecheck step when Playwright already transpiles specs on the fly? A: Playwright only transpiles the specs it runs and does not fail on type errors; `tsc --noEmit` type-checks the entire codebase, catching errors in helpers and paths the current run does not exercise.',
      completionChecklist: [
        'I can share code between files with named exports and imports',
        'I can explain the key tsconfig options, especially strict',
        'I can lay out a test repo with thin specs, shared helpers, typed fixtures and useful npm scripts'
      ],
      enhancements: {
        badGood: {
          label: 'Logic in the spec versus a shared helper',
          bad: `// tests/checkout.spec.ts — login steps copy-pasted into every spec
test('checkout', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('Username').fill('ada');
  await page.getByLabel('Password').fill('correct-horse');
  await page.getByRole('button', { name: 'Sign in' }).click();
  // ... the actual checkout test
});`,
          good: `// tests/checkout.spec.ts — one shared, typed helper
import { login } from '../helpers/login';

test('checkout', async ({ page }) => {
  await login(page, admin);
  // ... the actual checkout test
});`
        },
        davidTip:
          'Decide the folder structure and export style on day one and write it into the repo README. It is far cheaper to agree the shape of the repo before there are two hundred specs than to reorganise after.',
        miniChallenge:
          'Add path aliases to your tsconfig (for example @helpers/* and @fixtures/*) and update one import to use them. Confirm both the editor and tsc --noEmit still resolve the import.'
      }
    }
  ]
};
