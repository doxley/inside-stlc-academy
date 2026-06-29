// Module 7 — SQL for Testers. Premium lesson enhancements.
export default {
  courseSlug: '90-day-software-testing-career-roadmap',
  moduleNumber: 7,
  lessons: [
    {
      lessonNumber: 1,
      enhancements: {
        industryStory: `The UI showed a customer's order as "complete", but accounting said it never arrived. A tester ran one SQL query and found the order row had status "pending" — the UI was lying. SQL lets you check what the system actually stored, not just what the screen shows.`,
        visualAid: {
          type: 'comparison', title: 'Verifying via UI vs database',
          headers: ['', 'UI only', 'UI + SQL'],
          rows: [
            ['Sees what is stored', 'No', 'Yes'],
            ['Can set up test data', 'Slowly, by clicking', 'Quickly, with a query'],
            ['Catches silent data bugs', 'Often misses', 'Catches them'],
          ],
        },
        davidTip: `You do not need to be a database developer — you need enough SQL to verify data and investigate issues. SELECT, WHERE, JOIN and a few aggregates cover the vast majority of what a tester needs. It is one of the highest-value skills you can add.`,
        miniChallenge: `Think of a feature you know and name two things you could verify in the database that the UI might hide.`,
        modelAnswer: `## Example — checkout\n- The order row's stored total matches what the UI displayed (catches rounding/discount bugs)\n- The order status is actually "paid", not stuck at "pending" despite a success screen.`,
      },
    },
    {
      lessonNumber: 2,
      enhancements: {
        industryStory: `A tester needed to confirm a user existed but waited two days for a developer to "check the database". Five minutes of SELECT would have answered it instantly. Basic querying makes you self-sufficient.`,
        visualAid: {
          type: 'comparison', title: 'Anatomy of a SELECT',
          headers: ['Clause', 'Purpose', 'Example'],
          rows: [
            ['SELECT', 'Which columns', 'SELECT name, email'],
            ['FROM', 'Which table', 'FROM users'],
            ['WHERE', 'Which rows', "WHERE status = 'active'"],
            ['ORDER BY', 'Sort', 'ORDER BY created_at DESC'],
          ],
        },
        davidTip: `Start every query by asking "which columns, from which table, for which rows?" That maps directly to SELECT / FROM / WHERE. Once that is automatic, SQL stops feeling like code and starts feeling like asking questions of the data.`,
        miniChallenge: `Write a SELECT to return the email and signup date of all users whose status is "active", newest first.`,
        modelAnswer: `## Example\nSELECT email, created_at FROM users WHERE status = 'active' ORDER BY created_at DESC;`,
      },
    },
    {
      lessonNumber: 3,
      enhancements: {
        industryStory: `A tester pulled "all orders" — 2 million rows — to find one customer's order. Filtering with WHERE is what turns an unusable dump into the exact rows you need to verify a test.`,
        visualAid: {
          type: 'comparison', title: 'Common WHERE operators',
          headers: ['Operator', 'Use'],
          rows: [
            ['=, <>', 'Equals / not equals'],
            ['>, <, >=, <=', 'Comparisons'],
            ['LIKE', 'Pattern match (e.g. email LIKE %@test.com)'],
            ['IN (…)', 'Match any in a list'],
            ['AND / OR', 'Combine conditions'],
            ['IS NULL', 'Missing values'],
          ],
        },
        davidTip: `Filtering precisely is a core testing skill — it is how you isolate the one record your test cares about. And checking for IS NULL often surfaces data-quality bugs the UI never reveals.`,
        miniChallenge: `Write a query for all orders over £100 placed by customers whose email ends in "@test.com".`,
        modelAnswer: `## Example\nSELECT * FROM orders o JOIN users u ON u.id = o.user_id\nWHERE o.total > 100 AND u.email LIKE '%@test.com';`,
      },
    },
    {
      lessonNumber: 4,
      enhancements: {
        industryStory: `Order data lived in one table, customer data in another. To verify "this customer's orders", a tester needed to combine them — that is exactly what a JOIN does. Without joins, you are stuck looking at half the picture.`,
        visualAid: {
          type: 'comparison', title: 'Common joins',
          headers: ['Join', 'Returns'],
          rows: [
            ['INNER JOIN', 'Only rows matching in both tables'],
            ['LEFT JOIN', 'All left rows + matches (nulls if none)'],
            ['Use case', 'Orders with their customer details'],
          ],
        },
        davidTip: `INNER JOIN and LEFT JOIN cover almost everything a tester needs. A LEFT JOIN is especially handy for finding orphans — e.g. orders with no matching customer, which is exactly the kind of data bug worth catching.`,
        miniChallenge: `Write a query that lists each order's id and total alongside the customer's name, for orders and a customers table.`,
        modelAnswer: `## Example\nSELECT o.id, o.total, c.name\nFROM orders o\nINNER JOIN customers c ON c.id = o.customer_id;`,
      },
    },
    {
      lessonNumber: 5,
      enhancements: {
        industryStory: `Finance reported the dashboard's "total revenue" looked wrong. A tester used SUM and COUNT to reconcile it against the raw rows and found duplicate orders inflating the figure. Aggregations let you validate the numbers a UI reports.`,
        visualAid: {
          type: 'comparison', title: 'Aggregations for data validation',
          headers: ['Function', 'Answers'],
          rows: [
            ['COUNT(*)', 'How many rows?'],
            ['SUM(col)', 'What is the total?'],
            ['AVG(col)', 'What is the average?'],
            ['GROUP BY', 'Per category (e.g. per status)'],
          ],
        },
        davidTip: `Aggregations are how you check that a reported number is true. COUNT to spot duplicates, SUM to reconcile totals, GROUP BY to break figures down by status. This is data validation — a skill that quickly makes you the person teams trust with "are these numbers right?".`,
        miniChallenge: `Write a query that returns the number of orders and total revenue per order status.`,
        modelAnswer: `## Example\nSELECT status, COUNT(*) AS orders, SUM(total) AS revenue\nFROM orders\nGROUP BY status;`,
        portfolioBuilder: `Include a few SQL data-validation examples in your portfolio. Showing you can verify data at the source — not just trust the UI — is a strong differentiator.`,
      },
    },
    {
      lessonNumber: 6,
      enhancements: {
        davidTip: `For this assignment, show SQL as a testing tool, not just syntax — frame each query around what it verifies (data integrity, a reported total, a user's records). That connects the skill to real QA value.`,
        miniChallenge: `Before submitting, add one sentence to each query explaining what testing question it answers.`,
        managersReview: {
          intro: 'If I reviewed your SQL work as a QA lead, I would look for:',
          strengths: ['Correct use of SELECT/WHERE/JOIN/aggregates', 'Queries tied to a testing purpose', 'Data-validation examples'],
          gaps: ['Syntax with no testing context', 'No joins or aggregations attempted', 'Queries that would not run'],
          improvements: ['Explain what each query verifies', 'Include at least one join and one aggregation', 'Test your queries actually run'],
        },
        portfolioBuilder: `A short "SQL for testing" snippet set — each query with its purpose — rounds out your technical portfolio alongside your API collection.`,
      },
    },
  ],
};
