// Module 2 — Test Design Techniques. Premium lesson enhancements.
export default {
  courseSlug: '90-day-software-testing-career-roadmap',
  moduleNumber: 2,
  lessons: [
    {
      lessonNumber: 1,
      enhancements: {
        industryStory: `A tester "tested" a form by typing a few random values and clicking submit. It passed. In production, a 500-character name crashed the page and a negative age was accepted. The problem was not effort — it was the lack of a *technique*. Test design is what turns random clicking into deliberate, defensible coverage.`,
        visualAid: {
          type: 'comparison', title: 'Ad-hoc vs designed testing',
          headers: ['', 'Ad-hoc clicking', 'Designed testing'],
          rows: [
            ['Coverage', 'Unknown', 'Deliberate and explainable'],
            ['Repeatable', 'No', 'Yes'],
            ['Finds edge cases', 'By luck', 'By design'],
            ['Defensible', '"I clicked around"', '"Here is what I covered and why"'],
          ],
        },
        davidTip: `When I ask a tester "how did you decide what to test?", I am really asking whether they used a technique. "I applied equivalence partitioning and boundary analysis to the inputs" is a senior answer. "I tried some values" is not.`,
        miniChallenge: `Take a "quantity" field that accepts 1–99. Without formal techniques yet, list every value you would try and why. Keep this list — you will compare it to the technique-based set in the next lessons.`,
        modelAnswer: `## Example\n1 (min), 99 (max), 50 (typical), 0 (just below min), 100 (just above max), -1 (negative), "abc" (non-numeric), blank (empty), 1.5 (decimal). The techniques in this module give you a repeatable way to derive exactly this kind of list.`,
        portfolioBuilder: `The test cases you design in this module become a core portfolio artefact — a well-structured test case pack that proves you can think about coverage, not just click.`,
      },
    },
    {
      lessonNumber: 2,
      enhancements: {
        industryStory: `A team had 400 test cases for a single form and still missed a bug. Most cases were near-duplicates testing the same behaviour. Equivalence partitioning would have cut those to a handful of meaningful cases — and freed time to find the bug they missed.`,
        visualAid: {
          type: 'comparison', title: 'Equivalence partitioning — age field (18–65)',
          headers: ['Partition', 'Type', 'Representative value'],
          rows: [
            ['Below range (<18)', 'Invalid', '10'],
            ['In range (18–65)', 'Valid', '30'],
            ['Above range (>65)', 'Invalid', '80'],
            ['Non-numeric', 'Invalid', '"abc"'],
          ],
        },
        davidTip: `Equivalence partitioning is the technique that stops you wasting time. If 30 and 31 are treated identically by the system, testing both adds no value. Pick one representative per class and move on — coverage with judgement.`,
        miniChallenge: `A password field accepts 8–20 characters. Identify the equivalence classes (valid and invalid) and one representative value for each.`,
        modelAnswer: `## Example\n- Too short (<8): "abc123" (6) — invalid\n- Valid (8–20): "Password1" (9) — valid\n- Too long (>20): a 25-char string — invalid\n- Empty: "" — invalid\nOne representative per class gives strong coverage with few cases.`,
        portfolioBuilder: `Show equivalence partitioning explicitly in your test case pack — annotating which class each case covers signals real test-design skill to a reviewer.`,
      },
    },
    {
      lessonNumber: 3,
      enhancements: {
        industryStory: `A discount applied "for orders over £50". It worked at £60, so it shipped. Customers spending exactly £50 got no discount — an off-by-one boundary bug. Defects cluster at boundaries, which is exactly what this technique targets.`,
        visualAid: {
          type: 'flow', title: 'Boundary values for "18–65"',
          steps: [
            { label: '17', detail: 'just below (invalid)' },
            { label: '18', detail: 'min (valid)' },
            { label: '19', detail: 'just inside' },
            { label: '64', detail: 'just inside' },
            { label: '65', detail: 'max (valid)' },
            { label: '66', detail: 'just above (invalid)' },
          ],
          caption: 'Test the edges, not just the middle.',
        },
        davidTip: `Boundary value analysis pairs with equivalence partitioning: partitions tell you the classes, boundaries tell you the dangerous values within them. Together they are the two techniques I expect every tester to use by reflex.`,
        miniChallenge: `For a field accepting 1–100, list the boundary values you would test and label each valid or invalid.`,
        modelAnswer: `## Example\n0 (invalid), 1 (valid min), 2 (valid), 99 (valid), 100 (valid max), 101 (invalid). Six values catch the bugs that cluster at the edges.`,
        resourcePreview: {
          name: 'Test Case Template', purpose: 'A structured format for writing clear, repeatable test cases.',
          whenToUse: 'Use it to capture the boundary and partition cases you design.', formats: ['DOCX', 'XLSX'],
        },
      },
    },
    {
      lessonNumber: 4,
      enhancements: {
        industryStory: `A login allowed access based on "active account" AND "verified email" AND "correct password". Testers checked each separately and missed the combination where an unverified user with a correct password still got in. A decision table would have forced every combination into view.`,
        visualAid: {
          type: 'comparison', title: 'Decision table — login access',
          headers: ['Active?', 'Verified?', 'Correct password?', 'Access'],
          rows: [
            ['Yes', 'Yes', 'Yes', 'Granted'],
            ['Yes', 'No', 'Yes', 'Denied (verify email)'],
            ['Yes', 'Yes', 'No', 'Denied (wrong password)'],
            ['No', 'Yes', 'Yes', 'Denied (inactive)'],
          ],
        },
        davidTip: `Reach for a decision table whenever behaviour depends on combinations of conditions. It is the technique that catches the "we tested each rule but not the combination" class of bug — and those are often the embarrassing ones.`,
        miniChallenge: `A shipping fee is free if (order > £50) OR (customer is Premium). Build a decision table covering all combinations and the expected fee outcome.`,
        modelAnswer: `## Example\n- >£50 & Premium → Free\n- >£50 & not Premium → Free\n- ≤£50 & Premium → Free\n- ≤£50 & not Premium → Charged\nFour rows make the rule unambiguous and fully covered.`,
      },
    },
    {
      lessonNumber: 5,
      enhancements: {
        industryStory: `An account was supposed to lock after 3 failed logins. Testers confirmed it locked — but never tested what happened on the 4th attempt, or whether a successful login reset the counter. State transition testing maps exactly these moves so none are missed.`,
        visualAid: {
          type: 'flow', title: 'State transitions — login attempts',
          steps: [
            { label: 'Logged out' },
            { label: '1–2 fails', detail: 'still allowed' },
            { label: '3rd fail', detail: 'locked' },
            { label: 'Locked', detail: 'further attempts blocked' },
          ],
        },
        davidTip: `State transition testing shines for anything with status: orders, accounts, subscriptions, workflows. Map the states and the valid/invalid moves between them — the bugs hide in the transitions nobody drew.`,
        miniChallenge: `Draw the states for an order: Placed → Paid → Shipped → Delivered (and Cancelled). List two invalid transitions that should be blocked.`,
        modelAnswer: `## Example\nValid: Placed→Paid→Shipped→Delivered; Placed→Cancelled.\nInvalid (should be blocked): Delivered→Paid (cannot re-pay a delivered order); Shipped→Placed (cannot go backwards).`,
      },
    },
    {
      lessonNumber: 6,
      enhancements: {
        industryStory: `A tester wrote "Test login works". A week later nobody — including them — could remember what "works" meant or what data to use. A good test case is a precise, repeatable instruction anyone on the team could execute and get the same result.`,
        badGood: {
          label: 'a test case',
          bad: `Title: Test login\nSteps: Log in\nExpected: It works`,
          good: `Title: Valid credentials log the user into the dashboard\nPre-conditions: Registered active user exists\nSteps: 1) Go to /login 2) Enter valid email + password 3) Click Sign in\nExpected: User lands on /dashboard; their name shows in the header`,
        },
        davidTip: `A test case is only good if someone else can run it and get the same result without asking you questions. Specific title, clear steps, concrete data, and an expected result you can actually verify — that is the bar.`,
        miniChallenge: `Write one professional test case for "reset password with a valid email", including title, pre-conditions, steps, test data and expected result.`,
        modelAnswer: `## Example\nTitle: Valid email receives a password-reset link\nPre-conditions: A registered account exists for test@example.com\nSteps: 1) Go to /reset 2) Enter test@example.com 3) Submit\nTest data: test@example.com\nExpected: Confirmation message shown; a reset email arrives within 2 minutes.`,
        managersReview: {
          intro: 'If I reviewed your test case as a QA lead, I would check:',
          strengths: ['Specific, behaviour-led title', 'Clear pre-conditions and concrete test data', 'A verifiable expected result'],
          gaps: ['Vague expected results like "it works"', 'Missing pre-conditions or data', 'Steps that assume knowledge only you have'],
          improvements: ['Make the expected result observable', 'State the exact test data', 'Number the steps so anyone can follow them'],
        },
        resourcePreview: {
          name: 'Test Case Template', purpose: 'A professional structure for test cases (ID, title, steps, data, expected result).',
          whenToUse: 'Use it for the test case pack you build for your portfolio.', formats: ['DOCX', 'XLSX'],
        },
        portfolioBuilder: `Your test case pack is one of the most-scrutinised portfolio artefacts. Well-structured cases using the techniques from this module are direct evidence you can do the core of the job.`,
      },
    },
    {
      lessonNumber: 7,
      enhancements: {
        davidTip: `For the assignment, do not just list test cases — show the technique behind each (partition, boundary, decision table). Demonstrating *why* you chose each case is what separates a strong submission from a list.`,
        miniChallenge: `Before the full assignment, pick your feature and note which technique you will apply to each input. A technique-per-input plan makes the assignment fast to write and easy to defend.`,
        managersReview: {
          intro: 'If I received this assignment as a QA lead, I would look for:',
          strengths: ['Techniques named and applied correctly', 'Both valid and invalid/edge cases', 'Clear, repeatable test cases'],
          gaps: ['Only happy-path cases', 'No boundary or negative cases', 'Technique not evident in the cases'],
          improvements: ['Add boundary and negative cases', 'Annotate which technique each case uses', 'Tighten vague expected results'],
        },
      },
    },
  ],
};
