// Knowledge-check quizzes for "Modern Test Automation Bootcamp".
// Consumed by the seed builder — do not run the builder from here.

export default {
  courseSlug: 'modern-test-automation-bootcamp',
  outFile: 'seed-modern-automation-quizzes-a.sql',
  passMark: 70,
  quizzes: [
    {
      moduleNumber: 1,
      title: 'Reflection & Knowledge Check',
      questions: [
        {
          text: `A teammate proposes automating a rarely used admin screen that changes every sprint, while the checkout flow that earns the company money has no automated coverage at all. Where should the effort go first?`,
          answers: [
            { text: `The admin screen, because unstable areas are the ones most likely to break`, correct: false },
            { text: `The checkout flow, because it is high value and comparatively stable, so coverage there pays back`, correct: true },
            { text: `Whichever is quicker to script, since more tests is always better`, correct: false },
            { text: `Neither, because anything that changes often should never be automated`, correct: false },
          ],
        },
        {
          text: `Your suite runs green every night. Which statement best reflects what that green result actually gives you?`,
          answers: [
            { text: `Proof that the application is free of defects`, correct: false },
            { text: `Evidence that the specific behaviours you encoded did not regress, nothing more`, correct: true },
            { text: `A guarantee that untested paths also still work`, correct: false },
            { text: `Confirmation that the code is well designed`, correct: false },
          ],
        },
        {
          text: `In the test pyramid, why are unit tests placed at the wide base rather than the tip?`,
          answers: [
            { text: `They are the only tests that can find real bugs`, correct: false },
            { text: `They are fast and cheap to run, so you can afford many of them for quick feedback`, correct: true },
            { text: `They exercise the fully integrated system end to end`, correct: false },
            { text: `They require a running browser, which the base layer provides`, correct: false },
          ],
        },
        {
          text: `A large end-to-end suite fails intermittently, and the team has started re-running it until it passes before every release. What is the real cost being paid here?`,
          answers: [
            { text: `Nothing meaningful, because the tests eventually pass`, correct: false },
            { text: `The suite has stopped being a trustworthy signal, so genuine regressions can hide behind the re-runs`, correct: true },
            { text: `Only the extra minutes of compute time`, correct: false },
            { text: `The tests are now too fast to be useful`, correct: false },
          ],
        },
        {
          text: `Which of these is the strongest candidate for automation?`,
          answers: [
            { text: `A one-off exploratory session on a brand-new feature whose design is still in flux`, correct: false },
            { text: `A deterministic, repeatable check on a core business rule that must keep working release after release`, correct: true },
            { text: `A subjective judgement about whether a page "feels" fast`, correct: false },
            { text: `A visual design review of new branding`, correct: false },
          ],
        },
        {
          text: `What distinguishes "evidence" from "proof" in the context of a passing automated check?`,
          answers: [
            { text: `Nothing — the terms are interchangeable`, correct: false },
            { text: `Evidence supports a claim about the behaviour you checked; proof would require exhaustively covering every possible input and state`, correct: true },
            { text: `Evidence comes from manual testing, proof comes from automation`, correct: false },
            { text: `Proof is weaker because automation can be flaky`, correct: false },
          ],
        },
        {
          text: `A manager asks for "100% end-to-end coverage of every feature through the UI". As an automation engineer, what is the best response?`,
          answers: [
            { text: `Agree, since UI tests are the most realistic and therefore always best`, correct: false },
            { text: `Push back: heavy reliance on slow, brittle UI tests inverts the pyramid and raises maintenance cost, so push most checks lower down`, correct: true },
            { text: `Agree, because coverage percentage is the only metric that matters`, correct: false },
            { text: `Refuse to automate anything through the UI`, correct: false },
          ],
        },
        {
          text: `A test is written so loosely that it stays green even when the feature under test is completely broken. What has the team actually gained from it?`,
          answers: [
            { text: `A useful safety net`, correct: false },
            { text: `A false sense of security that is arguably worse than having no test at all`, correct: true },
            { text: `Faster releases with no downside`, correct: false },
            { text: `Improved code coverage that guarantees quality`, correct: false },
          ],
        },
        {
          text: `Which factor should weigh MOST heavily when deciding whether a given check is worth automating?`,
          answers: [
            { text: `Whether the check is technically possible to script`, correct: false },
            { text: `The value of the behaviour combined with how often the check will be repeated against a stable target`, correct: true },
            { text: `Whether other teams have automated something similar`, correct: false },
            { text: `How impressive the test will look in a demo`, correct: false },
          ],
        },
        {
          text: `An integration test sits in the middle layer of the pyramid. What trade-off does it represent compared with a unit test?`,
          answers: [
            { text: `It is faster and more isolated than a unit test`, correct: false },
            { text: `It gives more confidence that components work together, at the cost of being slower and harder to diagnose when it fails`, correct: true },
            { text: `It replaces the need for any unit tests`, correct: false },
            { text: `It has no downsides over a unit test`, correct: false },
          ],
        },
        {
          text: `Thinking like an automation engineer, which mindset best describes a healthy relationship with your own suite?`,
          answers: [
            { text: `Trust every green result completely and never question it`, correct: false },
            { text: `Treat the suite as a tool that must keep earning trust — a failure should mean something, and a pass should be meaningful`, correct: true },
            { text: `Assume the suite is worthless and rely only on manual testing`, correct: false },
            { text: `Judge the suite purely by how many tests it contains`, correct: false },
          ],
        },
      ],
    },
    {
      moduleNumber: 2,
      title: 'Reflection & Knowledge Check',
      questions: [
        {
          text: `Given \`const ids = [1, 2, 3];\`, what type does TypeScript infer for \`ids\`?`,
          answers: [
            { text: `\`any[]\``, correct: false },
            { text: `\`number[]\``, correct: true },
            { text: `\`readonly number[]\``, correct: false },
            { text: `\`[1, 2, 3]\``, correct: false },
          ],
        },
        {
          text: `What does the following function log?
~~~ts
async function load() {
  const value = await Promise.resolve(42);
  console.log(value);
}
load();
~~~`,
          answers: [
            { text: `\`Promise { 42 }\``, correct: false },
            { text: `\`42\``, correct: true },
            { text: `\`undefined\``, correct: false },
            { text: `It throws, because you cannot await a resolved promise`, correct: false },
          ],
        },
        {
          text: `Consider this interface:
~~~ts
interface User {
  name: string;
  age?: number;
}
~~~
Which object is a valid \`User\`?`,
          answers: [
            { text: `\`{ age: 30 }\``, correct: false },
            { text: `\`{ name: 'Sam' }\``, correct: true },
            { text: `\`{ name: 42 }\``, correct: false },
            { text: `\`{ fullName: 'Sam', age: 30 }\``, correct: false },
          ],
        },
        {
          text: `Why does calling an \`async\` function without \`await\` (or \`.then\`) sometimes cause a test to pass even though the assertion inside it has not run yet?`,
          answers: [
            { text: `Because async functions never actually execute`, correct: false },
            { text: `Because the async function returns a promise immediately, so the test continues before the awaited work — and its assertions — complete`, correct: true },
            { text: `Because \`await\` is only decorative and has no runtime effect`, correct: false },
            { text: `Because TypeScript strips all async code at compile time`, correct: false },
          ],
        },
        {
          text: `What is the result type of \`greet\` here?
~~~ts
function greet(name: string) {
  return \`Hello, \${name}\`;
}
~~~`,
          answers: [
            { text: `\`void\``, correct: false },
            { text: `\`string\` (inferred from the return)`, correct: true },
            { text: `\`any\``, correct: false },
            { text: `\`Promise<string>\``, correct: false },
          ],
        },
        {
          text: `Which statement about type inference is correct?`,
          answers: [
            { text: `You must annotate every variable or TypeScript will treat it as \`any\``, correct: false },
            { text: `TypeScript can often infer a variable's type from its initial value, so explicit annotations are not always required`, correct: true },
            { text: `Inference only works for numbers`, correct: false },
            { text: `Inference and annotation always produce different types`, correct: false },
          ],
        },
        {
          text: `What does this snippet evaluate to?
~~~ts
const nums = [1, 2, 3, 4];
const result = nums.filter(n => n % 2 === 0).length;
~~~`,
          answers: [
            { text: `\`4\``, correct: false },
            { text: `\`2\``, correct: true },
            { text: `\`[2, 4]\``, correct: false },
            { text: `\`0\``, correct: false },
          ],
        },
        {
          text: `Given \`let count: number;\` followed by \`count = 'five';\`, what happens?`,
          answers: [
            { text: `It runs fine and \`count\` becomes the string \`'five'\``, correct: false },
            { text: `TypeScript reports a compile-time error because a string is not assignable to \`number\``, correct: true },
            { text: `\`count\` is silently coerced to \`NaN\``, correct: false },
            { text: `It throws a runtime error only`, correct: false },
          ],
        },
        {
          text: `An interface and a type alias can both describe an object shape. In a test helper that defines the shape of a fixture, which reasoning is sound?`,
          answers: [
            { text: `Interfaces are always slower at runtime, so avoid them`, correct: false },
            { text: `Either can work for an object shape; interfaces are conventional for object contracts and can be extended, so many teams reach for them here`, correct: true },
            { text: `Type aliases cannot describe objects at all`, correct: false },
            { text: `Only interfaces exist in the compiled JavaScript output`, correct: false },
          ],
        },
        {
          text: `What is logged?
~~~ts
async function main() {
  console.log('a');
  await Promise.resolve();
  console.log('b');
}
console.log('start');
main();
console.log('end');
~~~`,
          answers: [
            { text: `\`start\`, \`a\`, \`b\`, \`end\``, correct: false },
            { text: `\`start\`, \`a\`, \`end\`, \`b\``, correct: true },
            { text: `\`a\`, \`b\`, \`start\`, \`end\``, correct: false },
            { text: `\`start\`, \`end\`, \`a\`, \`b\``, correct: false },
          ],
        },
        {
          text: `A test uses \`const data: any = await fetchJson();\` and then reads \`data.usr.name\`. Why is the \`any\` type a problem for a tester?`,
          answers: [
            { text: `\`any\` makes the code run slower`, correct: false },
            { text: `\`any\` switches off type checking for that value, so a typo like \`usr\` slips through the compiler and only fails at runtime`, correct: true },
            { text: `\`any\` forces every property to be optional`, correct: false },
            { text: `\`any\` cannot be used with \`await\``, correct: false },
          ],
        },
      ],
    },
    {
      moduleNumber: 4,
      title: 'Reflection & Knowledge Check',
      questions: [
        {
          text: `You need to click the "Submit" button on a form. Which locator is the most resilient and closest to how a user perceives the page?`,
          answers: [
            { text: `\`page.locator('.btn-primary.mt-4')\``, correct: false },
            { text: `\`page.getByRole('button', { name: 'Submit' })\``, correct: true },
            { text: `\`page.locator('div > form > button:nth-child(3)')\``, correct: false },
            { text: `\`page.locator('#app_root_12f9c > .form-9a > button')\``, correct: false },
          ],
        },
        {
          text: `Why is \`await expect(page.getByText('Saved')).toBeVisible()\` preferred over grabbing the text with \`textContent()\` and asserting on it?`,
          answers: [
            { text: `Because \`textContent()\` is deprecated`, correct: false },
            { text: `Because the web-first assertion automatically retries until the element appears or a timeout is hit, removing a race condition`, correct: true },
            { text: `Because \`toBeVisible\` runs without a browser`, correct: false },
            { text: `Because \`textContent()\` cannot read visible text`, correct: false },
          ],
        },
        {
          text: `What does this line do?
~~~ts
await page.getByLabel('Email').fill('sam@example.com');
~~~`,
          answers: [
            { text: `Locates an input associated with the label "Email" and sets its value to the address`, correct: true },
            { text: `Creates a new label element containing the email text`, correct: false },
            { text: `Asserts that the email field already contains that address`, correct: false },
            { text: `Submits the form with the given email`, correct: false },
          ],
        },
        {
          text: `A test fails with: \`Error: locator.click: Timeout 30000ms exceeded ... waiting for element to be visible\`. What is the most likely cause?`,
          answers: [
            { text: `Playwright is installed incorrectly`, correct: false },
            { text: `The element the locator matches never became visible within the timeout — perhaps it is hidden, not yet rendered, or the locator is wrong`, correct: true },
            { text: `The test file has a syntax error`, correct: false },
            { text: `The assertion library is missing`, correct: false },
          ],
        },
        {
          text: `In \`playwright.config.ts\`, what is the primary purpose of the \`baseURL\` setting?`,
          answers: [
            { text: `It sets the default browser to launch`, correct: false },
            { text: `It lets tests navigate with relative paths like \`page.goto('/login')\` instead of full URLs`, correct: true },
            { text: `It defines the database connection string`, correct: false },
            { text: `It controls how many workers run in parallel`, correct: false },
          ],
        },
        {
          text: `Which of these is an "action" in Playwright, as opposed to an assertion or a locator?`,
          answers: [
            { text: `\`expect(locator).toHaveText('Hi')\``, correct: false },
            { text: `\`page.getByRole('link', { name: 'Home' }).click()\``, correct: true },
            { text: `\`page.getByTestId('cart')\``, correct: false },
            { text: `\`expect(page).toHaveURL('/home')\``, correct: false },
          ],
        },
        {
          text: `Two elements on the page contain the text "Delete". Calling \`page.getByText('Delete').click()\` throws a strict-mode violation. What is the cleanest fix?`,
          answers: [
            { text: `Wrap the click in a try/catch and ignore the error`, correct: false },
            { text: `Narrow the locator so it resolves to a single element, for example by scoping to the relevant row or using a role plus accessible name`, correct: true },
            { text: `Disable strict mode globally so ambiguous locators are allowed`, correct: false },
            { text: `Add a fixed \`waitForTimeout\` before the click`, correct: false },
          ],
        },
        {
          text: `What is the effect of \`await expect(page.getByRole('alert')).toHaveText('Payment failed')\`?`,
          answers: [
            { text: `It types "Payment failed" into the alert element`, correct: false },
            { text: `It waits for the alert's text content to equal "Payment failed", retrying until it matches or the timeout expires`, correct: true },
            { text: `It checks only that an alert element exists, ignoring its text`, correct: false },
            { text: `It dismisses the alert dialog`, correct: false },
          ],
        },
        {
          text: `A colleague sets \`retries: 3\` in the config to make a consistently failing suite go green. Why is this the wrong use of the setting?`,
          answers: [
            { text: `Retries slow the suite down and provide no value ever`, correct: false },
            { text: `Retries are meant to absorb rare, genuine flakiness — using them to mask a real, reproducible failure hides a defect`, correct: true },
            { text: `The maximum allowed retry count is 1`, correct: false },
            { text: `Retries only work in headed mode`, correct: false },
          ],
        },
        {
          text: `Which locator strategy generally survives a front-end refactor best?`,
          answers: [
            { text: `Auto-generated CSS class names produced by a build tool`, correct: false },
            { text: `User-facing attributes: roles, accessible names, labels, or an explicit \`data-testid\``, correct: true },
            { text: `Absolute XPath from the document root`, correct: false },
            { text: `The element's position index within its parent`, correct: false },
          ],
        },
        {
          text: `You run \`npx playwright test --headed\` while debugging. What does the \`--headed\` flag do?`,
          answers: [
            { text: `Runs the tests but skips all assertions`, correct: false },
            { text: `Launches a visible browser window so you can watch the test drive the UI`, correct: true },
            { text: `Runs only the tests whose titles start with "head"`, correct: false },
            { text: `Disables parallel workers permanently in the config`, correct: false },
          ],
        },
      ],
    },
    {
      moduleNumber: 5,
      title: 'Reflection & Knowledge Check',
      questions: [
        {
          text: `A test for a login flow ends with \`await expect(page).not.toHaveURL('/login')\`. Why is this a weak assertion?`,
          answers: [
            { text: `Because \`not\` is never allowed in assertions`, correct: false },
            { text: `Because leaving \`/login\` does not confirm the user actually reached the authenticated area — an error page would also pass`, correct: true },
            { text: `Because URLs cannot be asserted on in Playwright`, correct: false },
            { text: `Because it checks too many things at once`, correct: false },
          ],
        },
        {
          text: `Which assertion most meaningfully verifies that "adding an item updates the cart total"?`,
          answers: [
            { text: `\`await expect(page.getByTestId('cart')).toBeVisible()\``, correct: false },
            { text: `\`await expect(page.getByTestId('cart-total')).toHaveText('£24.00')\``, correct: true },
            { text: `\`await expect(page).toHaveTitle(/Shop/)\``, correct: false },
            { text: `\`await expect(addButton).toBeEnabled()\``, correct: false },
          ],
        },
        {
          text: `Look at this test:
~~~ts
test('creates an order', async ({ page }) => {
  await page.goto('/orders/new');
  await page.getByRole('button', { name: 'Create' }).click();
  expect(true).toBe(true);
});
~~~
Why is it green-but-useless?`,
          answers: [
            { text: `Because it never navigates anywhere`, correct: false },
            { text: `Because its only assertion checks a constant, so it can never fail regardless of whether the order was created`, correct: true },
            { text: `Because \`getByRole\` is the wrong locator`, correct: false },
            { text: `Because tests must not click buttons`, correct: false },
          ],
        },
        {
          text: `What is the main risk of an assertion like \`await expect(rows).toHaveCount(0)\` immediately after loading a list that is populated asynchronously?`,
          answers: [
            { text: `There is no risk; zero is always correct`, correct: false },
            { text: `It may pass simply because the rows have not rendered yet, so it can assert "empty" on a list that will shortly be full`, correct: true },
            { text: `\`toHaveCount\` cannot take the value 0`, correct: false },
            { text: `Counting rows is not supported by Playwright`, correct: false },
          ],
        },
        {
          text: `A meaningful test typically follows an arrange–act–assert structure. What is the "act" step verifying quality of, if the "assert" is vague?`,
          answers: [
            { text: `Nothing — a vague assertion undermines the whole test, because the act can succeed or fail without the assertion noticing`, correct: true },
            { text: `The act step is unaffected; assertions are optional`, correct: false },
            { text: `A vague assertion makes the act step run faster`, correct: false },
            { text: `The act step automatically compensates for a weak assertion`, correct: false },
          ],
        },
        {
          text: `Which change turns a weak "smoke" check into a meaningful behavioural test for a search feature?`,
          answers: [
            { text: `Assert only that the search page loaded`, correct: false },
            { text: `Search for a known term and assert that a result containing that term appears and an unrelated result does not`, correct: true },
            { text: `Assert that the search box is present on the page`, correct: false },
            { text: `Assert that the page title contains the word "Search"`, correct: false },
          ],
        },
        {
          text: `A test asserts \`await expect(page.locator('body')).toContainText('Success')\`. Why might this pass even when the wrong success message is shown?`,
          answers: [
            { text: `Because \`toContainText\` matches anywhere in the body, so any element containing the substring — including an unrelated banner — satisfies it`, correct: true },
            { text: `Because \`body\` is not a valid locator`, correct: false },
            { text: `Because \`toContainText\` ignores case and therefore always passes`, correct: false },
            { text: `Because the assertion targets the wrong page`, correct: false },
          ],
        },
        {
          text: `You inherit a suite where every test ends with a screenshot and no assertions, described as "visual coverage". What is the core problem?`,
          answers: [
            { text: `Screenshots are too large to store`, correct: false },
            { text: `Nothing is being verified automatically — a human would have to inspect every screenshot for the suite to catch anything`, correct: true },
            { text: `Screenshots cannot be captured in headless mode`, correct: false },
            { text: `There is no problem; screenshots are equivalent to assertions`, correct: false },
          ],
        },
        {
          text: `Which of these is the strongest sign a test is actually testing something?`,
          answers: [
            { text: `It has a long, descriptive title`, correct: false },
            { text: `Deliberately breaking the feature it covers makes the test fail`, correct: true },
            { text: `It runs quickly`, correct: false },
            { text: `It contains many \`await\` calls`, correct: false },
          ],
        },
        {
          text: `A test verifies a discount by asserting the discounted price is "less than the original". Why might a designer of meaningful tests still object?`,
          answers: [
            { text: `Because "less than" is impossible to express in code`, correct: false },
            { text: `Because a wildly wrong discount (for example, a penny off, or a negative total) would also be "less than the original" and slip through`, correct: true },
            { text: `Because prices should never be compared`, correct: false },
            { text: `Because the test needs a screenshot to be valid`, correct: false },
          ],
        },
        {
          text: `Two tests give the same confidence, but one asserts the exact expected value and the other asserts only that a field is "not empty". Which is preferable and why?`,
          answers: [
            { text: `The "not empty" one, because it is more flexible and rarely fails`, correct: false },
            { text: `The exact-value one, because it will catch a wrong-but-present value that the looser check would let through`, correct: true },
            { text: `They are identical, so it does not matter`, correct: false },
            { text: `The "not empty" one, because exact assertions are always brittle and should be avoided`, correct: false },
          ],
        },
      ],
    },
    {
      moduleNumber: 6,
      title: 'Reflection & Knowledge Check',
      questions: [
        {
          text: `A test does \`await page.waitForTimeout(2000)\` before checking a result, and it still fails on a slow CI runner. What is the underlying problem with this approach?`,
          answers: [
            { text: `Two seconds is simply too short; five seconds would fix it permanently`, correct: false },
            { text: `A fixed sleep guesses at timing rather than waiting for the actual condition, so it is both slow and unreliable across environments`, correct: true },
            { text: `\`waitForTimeout\` is not a real Playwright method`, correct: false },
            { text: `The problem is the assertion, not the wait`, correct: false },
          ],
        },
        {
          text: `Which replacement removes a hard wait correctly before reading a total?`,
          answers: [
            { text: `\`await page.waitForTimeout(1000)\` then read the total`, correct: false },
            { text: `\`await expect(page.getByTestId('total')).toHaveText('£30.00')\``, correct: true },
            { text: `\`for (let i = 0; i < 100; i++) {}\` then read the total`, correct: false },
            { text: `Remove the wait entirely and hope the value is ready`, correct: false },
          ],
        },
        {
          text: `A test passes locally but flakes on CI roughly one run in five. Which investigation step is most productive first?`,
          answers: [
            { text: `Add \`retries: 5\` and consider it solved`, correct: false },
            { text: `Reproduce and diagnose it — use the trace, video, or repeated runs to find the race condition or timing assumption behind the intermittent failure`, correct: true },
            { text: `Delete the test, since flaky tests are worthless`, correct: false },
            { text: `Increase every timeout in the config to ten minutes`, correct: false },
          ],
        },
        {
          text: `Which of these is a classic cause of flakiness in browser automation?`,
          answers: [
            { text: `Using \`getByRole\` locators`, correct: false },
            { text: `Asserting on an element or reading state before the application has finished updating it`, correct: true },
            { text: `Setting a \`baseURL\` in the config`, correct: false },
            { text: `Writing tests in TypeScript rather than JavaScript`, correct: false },
          ],
        },
        {
          text: `Consider this flaky snippet:
~~~ts
await page.getByRole('button', { name: 'Load' }).click();
const text = await page.getByTestId('status').textContent();
expect(text).toBe('Done');
~~~
Why does it flake, and what fixes it?`,
          answers: [
            { text: `It flakes because \`textContent\` is deprecated; switch to \`innerText\``, correct: false },
            { text: `It reads the status immediately after the click without waiting for it to change; use \`await expect(page.getByTestId('status')).toHaveText('Done')\` which retries`, correct: true },
            { text: `It flakes because the button name is wrong; rename it`, correct: false },
            { text: `It flakes because \`expect\` cannot compare strings`, correct: false },
          ],
        },
        {
          text: `Why is \`page.locator('button').nth(4)\` a fragile locator in a test that keeps breaking after UI tweaks?`,
          answers: [
            { text: `Because \`nth\` is not supported`, correct: false },
            { text: `Because it depends on the exact number and order of buttons, so adding or reordering any button silently changes what it selects`, correct: true },
            { text: `Because it always selects the wrong element by design`, correct: false },
            { text: `Because indexing is slower than other locators`, correct: false },
          ],
        },
        {
          text: `A suite shares one logged-in account across parallel workers, and tests intermittently corrupt each other's data. What is the most robust fix?`,
          answers: [
            { text: `Run everything on a single worker forever`, correct: false },
            { text: `Isolate test data so each test (or worker) uses its own account or fixtures, removing the shared-state dependency`, correct: true },
            { text: `Add random sleeps to space the tests out`, correct: false },
            { text: `Increase the number of workers so there is less contention`, correct: false },
          ],
        },
        {
          text: `What is the main advantage of Playwright's trace viewer when debugging a flaky failure?`,
          answers: [
            { text: `It rewrites the failing test automatically`, correct: false },
            { text: `It captures a timeline of actions, DOM snapshots, and network activity so you can see the exact state when the test failed`, correct: true },
            { text: `It disables flakiness by removing timing from the run`, correct: false },
            { text: `It only records the final screenshot and nothing else`, correct: false },
          ],
        },
        {
          text: `A test asserts on an animation's end state but occasionally catches it mid-transition. Which approach is most reliable?`,
          answers: [
            { text: `Sleep for exactly the animation's duration in milliseconds`, correct: false },
            { text: `Assert on the stable end condition (for example the final text or a settled attribute) with a web-first assertion that retries until it holds`, correct: true },
            { text: `Disable all CSS on the page before every test`, correct: false },
            { text: `Re-run the test until it happens to pass`, correct: false },
          ],
        },
        {
          text: `Which statement best captures the right attitude toward the \`retries\` config option?`,
          answers: [
            { text: `Retries are a permanent cure for flakiness and should be maxed out`, correct: false },
            { text: `Retries can reduce noise from genuinely rare flakiness, but a test that regularly needs them signals a real problem to fix, not hide`, correct: true },
            { text: `Retries should never be used under any circumstances`, correct: false },
            { text: `Retries change the application code to make it faster`, correct: false },
          ],
        },
        {
          text: `You remove a hard wait and replace it with a web-first assertion, and the suite gets both faster and more stable. Why does the assertion improve speed as well as reliability?`,
          answers: [
            { text: `Because assertions run on a separate thread`, correct: false },
            { text: `Because it proceeds the moment the condition is met instead of always waiting a fixed duration, and it keeps retrying until the timeout only if needed`, correct: true },
            { text: `Because it skips the check entirely on fast machines`, correct: false },
            { text: `Because web-first assertions do not actually wait for anything`, correct: false },
          ],
        },
      ],
    },
  ],
};
