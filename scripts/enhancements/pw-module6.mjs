// Playwright — Module 6: Test Data Management. Enhancements.
export default {
  courseSlug: 'practical-test-automation-playwright',
  moduleNumber: 6,
  lessons: [
    {
      lessonNumber: 1,
      enhancements: {
        industryStory: `A registration test reused the same email every run, so the second run failed on "email already exists". Switching to a unique email per run made it repeatable. Test data choices quietly decide whether a suite is reliable.`,
        visualAid: {
          type: 'comparison', title: 'Static vs dynamic vs unique data',
          headers: ['Kind', 'When to use'],
          rows: [
            ['Static', 'Fixed values you assert exactly'],
            ['Dynamic', 'Created at run time (e.g. via API)'],
            ['Unique/random', 'Avoid collisions (e.g. unique emails)'],
          ],
        },
        davidTip: `Unique-by-default data is the simplest cure for order-dependent, flaky suites. Generate it (user+timestamp@example.com) rather than relying on records that already exist.`,
        miniChallenge: `For a sign-up test, decide what data should be static, dynamic or unique, and why.`,
        modelAnswer: `## Example\nUnique: email (user+timestamp) to avoid collisions. Dynamic: an account created via API for a "logged-in" test. Static: a known invalid email to assert the exact validation message.`,
      },
    },
    {
      lessonNumber: 2,
      enhancements: {
        industryStory: `Every test hand-built a full user object, repeating fields and occasionally producing invalid data. A factory function returning a valid user with overridable fields made tests short and their intent obvious.`,
        badGood: {
          label: 'building test data',
          bad: `const user = { name:'Test', email:'a@b.com', password:'pw', role:'user', country:'UK', ... } // repeated everywhere`,
          good: `const user = makeUser({ role: 'admin' }); // factory fills valid defaults + unique email`,
        },
        davidTip: `A good factory lets a test state only what's special about its data and fills the rest with valid defaults. Combine it with unique values for ids/emails to keep tests both short and collision-free.`,
        miniChallenge: `Write a factory function that returns a valid user and lets you override the role.`,
        modelAnswer: `## Example\nfunction makeUser(overrides={}){ return { name:'Test User', email:\`user+\${unique()}@example.com\`, password:'Passw0rd!', role:'user', ...overrides }; }`,
      },
    },
    {
      lessonNumber: 3,
      enhancements: {
        industryStory: `A data-driven test had 30 cases hard-coded inline, making the spec unreadable. Moving them to a JSON file meant adding a case was a one-line data change, and non-developers could review the data. External files shine when data changes often.`,
        davidTip: `Use JSON/CSV files for reusable fixtures, larger sets, or data owned by non-developers. Read the file and iterate rows to drive parameterised tests — keep the files small and validated.`,
        miniChallenge: `Move an inline data set into a JSON file and load it in the test.`,
        modelAnswer: `## Example\ndiscounts.json: [{"code":"SAVE10","result":"10% off"},{"code":"EXPIRED","result":"code expired"}] — the test loads it and runs the same assertion per row; adding a case is a one-line edit.`,
      },
    },
    {
      lessonNumber: 4,
      enhancements: {
        industryStory: `A tester hard-coded a password in a test and committed it. It ended up in the public repo history — a real security incident. Secrets must come from the environment, never the code.`,
        badGood: {
          label: 'handling a password in a test',
          bad: `const password = 'Sup3rSecret!'; // committed to the repo`,
          good: `const password = process.env.TEST_PASSWORD; // from .env locally, CI secret in the pipeline`,
        },
        davidTip: `Treat any committed secret as compromised. Read credentials from environment variables, gitignore your .env, and store CI secrets in the pipeline's secret store. Drive baseURL/credentials from env so one suite runs against dev, staging and prod.`,
        miniChallenge: `Refactor a test that hard-codes a password to read it from an environment variable instead.`,
        modelAnswer: `## Example\nReplaced the literal with process.env.TEST_PASSWORD; added .env (gitignored) for local runs and a GitHub Actions secret for CI. The password never touches the repo.`,
      },
    },
    {
      lessonNumber: 5,
      enhancements: {
        industryStory: `Tests passed when run alone but failed together — they shared one record and stepped on each other. Making each test create and clean up its own data fixed it and unlocked parallel execution. Independence is the foundation of a reliable suite.`,
        davidTip: `A reliable test passes alone or with others, in any order, any number of times. If yours pass solo but fail together, data coupling is almost always the cause. Each test owns its data and cleans up.`,
        miniChallenge: `Take an order-dependent test and refactor it to create its own data and clean up; run it twice to confirm independence.`,
        modelAnswer: `## Example\nThe test now creates its account via the API in setup, runs the UI behaviour, and deletes the account in teardown — so it passes repeatedly and in parallel without interfering with other tests.`,
        portfolioBuilder: `Independent, self-cleaning tests in your capstone are what make parallel CI runs reliable — a clear signal of professional-grade automation.`,
        resourcePreview: {
          name: 'Test Data Management Template', purpose: 'Keep test data clean, isolated and maintainable.',
          whenToUse: 'Use it to plan data setup/teardown for your tests.', formats: ['PDF', 'DOCX'],
        },
      },
    },
  ],
};
