// Module 11 — CV & LinkedIn Mastery. Premium lesson enhancements.
export default {
  courseSlug: '90-day-software-testing-career-roadmap',
  moduleNumber: 11,
  lessons: [
    {
      lessonNumber: 1,
      enhancements: {
        industryStory: `A strong tester was getting no callbacks. Their CV opened with a generic objective and buried the QA skills on page two. One rewrite — a sharp summary and skills up top — and the interviews started. Recruiters scan; your CV has seconds to land.`,
        badGood: {
          label: 'a CV summary',
          bad: `"Hard-working individual seeking an opportunity to grow in a dynamic company."`,
          good: `"Detail-driven QA tester with hands-on experience in test design, defect management, API testing (Postman) and SQL. Built a public QA portfolio and focused on preventing defects early."`,
        },
        davidTip: `A reviewer scans the top third first. Put your strongest, most relevant content — a sharp summary and key skills — where their eyes land, not buried on page two. Keep it to one or two pages.`,
        miniChallenge: `Write a two-to-three line QA CV summary for yourself, leading with your strongest, most relevant skills.`,
        modelAnswer: `## Example\n"QA tester focused on practical, risk-based testing. Hands-on with test design techniques, professional defect reporting, API testing in Postman and SQL data validation. Built a full QA portfolio demonstrating each skill."`,
        resourcePreview: {
          name: 'QA Career Roadmap Poster', purpose: 'Helps you frame your direction and target roles for your CV summary.',
          whenToUse: 'Use it to set the career-direction line in your CV and LinkedIn.', formats: ['PDF'],
        },
      },
    },
    {
      lessonNumber: 2,
      enhancements: {
        industryStory: `A CV listed "responsible for testing". It said nothing. Rewritten as "designed test cases for a checkout feature, finding 12 defects including 2 critical payment bugs before release", it suddenly showed impact. Achievements beat duties.`,
        badGood: {
          label: 'an experience bullet',
          bad: `"Responsible for testing the application."`,
          good: `"Designed and executed test cases for a checkout feature, identifying 12 defects (including 2 critical payment bugs) before release."`,
        },
        davidTip: `Use strong verbs and show outcomes: designed, identified, automated, improved — with a number where you can. "Responsible for X" describes a job; an achievement describes *you*. Quantify wherever possible.`,
        miniChallenge: `Rewrite two duty-style bullets ("responsible for…") as achievement bullets with an outcome or number.`,
        modelAnswer: `## Example\n- "Responsible for writing test cases" → "Wrote a 40-case test pack using equivalence and boundary techniques, improving coverage of edge cases."\n- "Helped with bugs" → "Introduced a bug-report template that reduced back-and-forth with developers and sped up fixes."`,
        portfolioBuilder: `Your portfolio gives you the raw material for impact bullets — each artefact is evidence behind a CV achievement. Reference your portfolio link on the CV.`,
      },
    },
    {
      lessonNumber: 3,
      enhancements: {
        industryStory: `A recruiter searched LinkedIn for "QA automation Agile" and a strong candidate never appeared — their profile had a one-line headline and an empty About. Optimising LinkedIn is what gets you found, not just seen.`,
        badGood: {
          label: 'a LinkedIn headline',
          bad: `"Looking for opportunities"`,
          good: `"QA Tester | Manual & Automation | Agile · Jira · API · SQL | Building a QA portfolio"`,
        },
        davidTip: `Recruiters search by keyword. If "QA", "automation", "API" and "Agile" appear naturally in your headline and About, you turn up in far more searches. Write the About in the first person, and pin your portfolio to Featured.`,
        miniChallenge: `Rewrite your LinkedIn headline using the role + value + keywords formula, and draft the first two lines of your About.`,
        modelAnswer: `## Example\nHeadline: "Software Tester | Manual + Automation | Agile · Jira · API · SQL | QA portfolio in bio". About opener: "I am a detail-driven tester focused on preventing defects early and communicating quality clearly. I have built a portfolio covering test design, defects, API testing and SQL…"`,
      },
    },
    {
      lessonNumber: 4,
      enhancements: {
        industryStory: `A candidate sent the same generic CV to 50 roles and heard nothing. They started mirroring each job's language and leading with the most relevant skills — and the response rate jumped. Tailoring beats volume.`,
        visualAid: {
          type: 'flow', title: 'Tailoring an application',
          steps: [
            { label: 'Read the JD', detail: 'note key skills/keywords' },
            { label: 'Match', detail: 'map your experience to them' },
            { label: 'Reorder', detail: 'lead with the most relevant' },
            { label: 'Mirror language', detail: 'use their terms (honestly)' },
          ],
        },
        davidTip: `You do not need a new CV per job — you need a strong base CV and a tailored top third. Adjust the summary and reorder skills to match the role, using the words from the job description (honestly). It signals you actually read it.`,
        miniChallenge: `Take a real QA job ad, pull out five keywords, and note how you would adjust your CV's top third to match.`,
        modelAnswer: `## Example\nJD emphasises "API testing, Agile, regression". I lead my summary with API testing and Agile, move my Postman/regression experience to the top of skills, and mirror "regression" and "Agile ceremonies" in my bullets.`,
        portfolioBuilder: `Tailoring is easier when your portfolio is broad — you can foreground whichever artefacts match the role (API collection for an API-heavy job, RTM for a process-heavy one).`,
      },
    },
    {
      lessonNumber: 5,
      enhancements: {
        davidTip: `For this assignment, make your CV and LinkedIn consistent and achievement-led, with your portfolio linked from both. Proofread relentlessly — a typo on a QA application is the worst possible first impression.`,
        miniChallenge: `Before submitting, run the "six-second test": can a stranger tell your role, top skills and that you have a portfolio within six seconds of seeing your CV?`,
        managersReview: {
          intro: 'If I received your CV and LinkedIn as a hiring manager, I would look for:',
          strengths: ['Sharp summary and skills up top', 'Achievement bullets with outcomes', 'Portfolio linked; consistent CV/LinkedIn'],
          gaps: ['Generic objective and duty bullets', 'No metrics or outcomes', 'No portfolio link; typos'],
          improvements: ['Lead with relevant skills', 'Rewrite duties as quantified achievements', 'Link the portfolio and proofread'],
        },
        portfolioBuilder: `Your CV, LinkedIn and portfolio now form one consistent story. Together they are the package you take to the job market in the final module.`,
      },
    },
  ],
};
