// AI for QA Testers — Module 3: Prompt Engineering for QA. Lesson enhancements.
export default {
  courseSlug: 'ai-for-qa-testers',
  moduleNumber: 3,
  lessons: [
    {
      lessonNumber: 1,
      enhancements: {
        industryStory: `Two testers used the same AI tool on the same story. One typed "make tests for this" and got six shallow cases. The other gave role, context and format and got a thorough, well-structured set including edge cases. The prompt was the entire difference.`,
        davidTip: `A great prompt is just clear thinking written down. If you can brief a junior tester to do the task, you can prompt AI to do the draft. Vague in, vague out.`,
        miniChallenge: `Write the same testing request as a one-line vague prompt and as a detailed prompt. Note what extra information the detailed version gives the model.`,
        modelAnswer: `## Example\nVague: "test the login". Detailed: "Act as a QA engineer. For a login (email + password, locks after 5 fails), list positive, negative and boundary test cases as a table with steps and expected results." The detailed one supplies role, rules, scope and format.`,
        portfolioBuilder: `The prompts you craft here feed your personal QA prompt library (built in lesson 5) — a genuinely useful, modern portfolio asset.`,
      },
    },
    {
      lessonNumber: 2,
      enhancements: {
        industryStory: `A tester's prompts kept producing brittle, generic output until they learned the structure: role, context, task, format, constraints. Suddenly the output matched what they actually needed.`,
        visualAid: {
          type: 'comparison', title: 'Anatomy of a strong QA prompt',
          headers: ['Part', 'Example'],
          rows: [
            ['Role', '"Act as a senior QA engineer…"'],
            ['Context', '"…for a login with email + password…"'],
            ['Task', '"…generate positive, negative and boundary cases…"'],
            ['Format', '"…as a table: ID, steps, expected result…"'],
            ['Constraints', '"…do not invent fields; ask if unclear."'],
          ],
        },
        davidTip: `Bake your standards into the prompt up front — the format you want and the constraints ("do not invent fields"). It is far faster than fixing weak output afterwards.`,
        miniChallenge: `Write one full prompt using all five parts (role, context, task, format, constraints) for a feature of your choice.`,
        modelAnswer: `## Example\n"Act as a QA analyst (role) for a password-reset feature that emails a link valid for 30 minutes (context). Generate positive, negative and boundary test cases (task) as a table with steps and expected results (format). Do not assume fields I have not described; ask if anything is unclear (constraints)."`,
        resourcePreview: {
          name: 'Prompt Writing Framework', purpose: 'A reusable structure (role + context + task + format + constraints) for QA prompts.',
          whenToUse: 'Use it as a template every time you prompt for a testing task.', formats: ['PDF', 'DOCX'],
        },
      },
    },
    {
      lessonNumber: 3,
      enhancements: {
        industryStory: `A tester reused the same few prompt shapes — "generate cases", "review for gaps", "explain this error" — and got fast, reliable results across very different tasks. Patterns turn prompting from guesswork into a toolkit.`,
        visualAid: {
          type: 'comparison', title: 'Go-to prompt patterns for testers',
          headers: ['Pattern', 'Use it to'],
          rows: [
            ['Generate', 'Draft test cases / data / scenarios'],
            ['Review', 'Find gaps in cases, stories or a bug report'],
            ['Explain', 'Understand an error, log or concept'],
            ['Transform', 'Turn manual steps into structured cases'],
          ],
        },
        davidTip: `Keep a handful of proven patterns rather than reinventing prompts each time. "Review this for gaps and missing scenarios" alone will sharpen a surprising amount of your work.`,
        miniChallenge: `Pick two patterns and write a ready-to-use prompt for each, tailored to a feature you know.`,
        modelAnswer: `## Example\nGenerate: "Generate test cases for the checkout discount feature covering happy path, invalid and expired codes." Review: "Review these test cases for missing negative and boundary scenarios: [paste]."`,
        resourcePreview: {
          name: 'AI Prompt Library (100 Prompts)', purpose: 'A categorised library of ready-to-use QA prompts.',
          whenToUse: 'Borrow and adapt prompts instead of starting from scratch.', formats: ['PDF', 'DOCX'],
        },
      },
    },
    {
      lessonNumber: 4,
      enhancements: {
        industryStory: `A first AI answer was decent but missed boundary cases. Instead of accepting it, the tester replied "add boundary and negative cases, and make expected results specific" — and the second pass was genuinely strong. Iteration is where prompting pays off.`,
        davidTip: `Treat the first answer as a draft to refine, not a final result. Short follow-ups — "add edge cases", "make this a table", "tighten the expected results" — get you to strong output fast.`,
        miniChallenge: `Generate something with AI, then write two follow-up instructions that would improve it, and apply them.`,
        modelAnswer: `## Example\nFirst output: happy-path cases only. Follow-ups: "Add negative cases (empty, invalid, too long)" and "Make each expected result specific and verifiable." The refined set is now usable.`,
      },
    },
    {
      lessonNumber: 5,
      enhancements: {
        industryStory: `A tester who saved their best prompts ramped up in a new job far faster — they started each task from a proven prompt instead of a blank box. A personal prompt library is a quiet career accelerator.`,
        davidTip: `Save prompts that work as you go. The tester who walks into a new role with a tested AI toolkit is productive on day one — your prompt library is a genuine career asset.`,
        miniChallenge: `Start your QA prompt library: capture at least three prompts that worked for you, each with a one-line note on when to use it.`,
        modelAnswer: `## Example\n"Test design: generate positive/negative/boundary cases as a table (use at story start)." "Requirement review: find ambiguity and missing scenarios (use at refinement)." "Bug report review: tighten clarity and structure (use before logging)."`,
        portfolioBuilder: `Your prompt library is a portfolio-worthy artefact — it shows you use AI systematically and responsibly, not ad hoc.`,
        resourcePreview: {
          name: 'AI Prompt Cheat Sheet for Testers', purpose: 'A one-page reference of the prompt formula, patterns and safety rules.',
          whenToUse: 'Keep it beside you while you build and use your prompt library.', formats: ['PDF', 'DOCX'],
        },
      },
    },
    {
      lessonNumber: 6,
      enhancements: {
        davidTip: `For this assignment, show the structure behind your prompts and a before/after of one you improved. Demonstrating *why* a prompt works is more impressive than a long list of prompts.`,
        miniChallenge: `Before submitting, take your weakest prompt and improve it using the five-part anatomy; include both versions.`,
        managersReview: {
          intro: 'If I reviewed your prompt work as a QA lead, I would look for:',
          strengths: ['Well-structured prompts (role/context/task/format/constraints)', 'A clear before/after improvement', 'Patterns you can reuse'],
          gaps: ['One-line vague prompts', 'No constraints or format', 'No sign of iteration'],
          improvements: ['Apply the five-part anatomy', 'Add a constraint like "do not invent fields"', 'Show one refinement step'],
        },
      },
    },
  ],
};
