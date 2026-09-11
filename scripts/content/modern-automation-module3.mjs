// Modern Test Automation Bootcamp — Module 3: Git, GitHub & Professional Workflow.
// Practical Git for test engineers: the commands AND the shared-repo workflow real
// delivery teams use on an automation codebase. Base fields + varied enhancements.
export default {
  courseSlug: 'modern-test-automation-bootcamp',
  moduleNumber: 3,
  lessonsPrefix: 'modern-automation',
  enhPrefix: 'modern-automation',
  enhSep: '-',
  lessons: [
    {
      lessonNumber: 1,
      title: 'Why Version Control Matters for Test Code',
      estimatedTime: '12 minute read',
      lessonOverview: `Test code is production code. It is written by a team, changed constantly, and trusted to gate releases. This lesson makes the case for treating your automation suite with the same version-control discipline the application gets.`,
      learningObjectives: [
        'Explain why test code deserves the same version control as application code',
        'Describe the three things Git gives a team: history, collaboration and safety',
        'Recognise the failure modes of a test suite with no version control',
      ],
      lessonNotes: `## Test code is production code
The moment your Playwright or API suite decides whether a release ships, it stops being a personal script and becomes a shared asset. It has authors, reviewers, a changelog and a blast radius. Treat it the way the application team treats their code — because that is exactly what it is.

## What version control actually buys you
Git is not paperwork. It gives a delivery team three concrete things:

- **History** — every change is recorded with who made it, when, and why. When a flaky test suddenly starts failing, \`git log\` and \`git blame\` tell you what changed and by whom, in seconds.
- **Collaboration** — several engineers work on the same suite without emailing zip files or overwriting each other. Everyone works from one source of truth.
- **Safety** — nothing is ever truly lost. A bad change is one \`git revert\` away from being undone, and experiments live on throwaway branches instead of in your only copy.

## The no-version-control failure modes
You have probably seen these:

- \`tests-final-v2-REALLY-final\` folders on someone's laptop.
- A "quick fix" that silently disabled ten tests, discovered three sprints later.
- The one engineer who "owns" the suite going on leave with all the context in their head.

Git removes every one of these. The history is on the server, the context is in the commit messages, and the current state is whatever is on the shared branch.

## It is a testing skill, not a developer skill
Reviewers judge automation work partly on how it is committed. A clean, well-described history signals an engineer who can be trusted with a shared codebase. This module treats Git as a core part of being a senior test engineer.

## Key takeaway
Your automation suite is a shared, release-gating asset, so it needs the same version control as the application. Git gives your team history, collaboration and safety — the three things a serious test codebase cannot live without.`,
      workedExample: `Imagine a shared \`tests/\` repo with no Git. Two engineers both edit \`login.spec.ts\` on the same afternoon and one overwrites the other on a shared drive. A day of work vanishes with no way to recover it.

Now the same repo under Git. Each engineer works on their own branch:

~~~bash
git log --oneline -5
# a1b2c3d  Fix flaky wait in login smoke test
# d4e5f6a  Add checkout regression tests
# 7g8h9i0  Update Playwright to 1.48
~~~

The history tells you exactly what changed and why. Nothing is overwritten, nothing is lost, and \`git blame login.spec.ts\` shows who touched each line and in which commit.`,
      commonMistakes: `- Treating the test suite as a personal script rather than shared, reviewed team code
- Keeping "backups" as duplicated folders instead of relying on Git history
- Writing commits with no message worth reading, so the history explains nothing later
- Assuming version control is a developer concern that testers can skip`,
      realWorldTip: `On a delivery team, the automation repo is usually the first thing a new joiner clones and the last thing anyone wants to break. A clean Git history is onboarding documentation you get for free — a new engineer can read the recent commits and understand how the suite is evolving before they write a line.`,
      exercise: `Take any test project you have (or a folder of scripts) that is not yet under version control. Write a short note — three to five bullet points — listing the specific risks it currently carries: work that could be lost, changes nobody could explain, and knowledge that lives in one person's head. Deliverable: the risk list, which you will address by putting the project under Git in the next lessons.`,
      reflectionQuestion: `Think of a time test code was lost, overwritten, or mysteriously changed on a team you know. Which of Git's three benefits — history, collaboration or safety — would have prevented it?`,
      knowledgeCheck: `Name the three core benefits version control gives a team working on a shared test suite. (Answer: history, collaboration and safety.)`,
      completionChecklist: [
        'I can explain why test code should be version-controlled like production code',
        'I can name the three benefits Git gives a delivery team',
        'I can identify the risks a test suite runs without version control',
      ],
      enhancements: {
        industryStory: `A team kept its regression suite on a shared network drive with no version control. A well-meaning engineer commented out a block of failing tests to get a green run before a demo, meaning to restore them afterwards, and forgot. Those tests stayed disabled for two release cycles until a production bug slipped through exactly where they would have caught it. Under Git the change would have been a visible, reviewable commit — someone would have asked "why are we disabling these?" before it ever merged.`,
        visualAid: {
          type: 'comparison',
          title: 'Test suite with and without version control',
          headers: ['Concern', 'No version control', 'Under Git'],
          rows: [
            ['Recovering lost work', 'Hope someone has a copy', 'git revert / git checkout'],
            ['Who changed this?', 'Guesswork', 'git blame / git log'],
            ['Two people, one file', 'Overwrites and conflicts', 'Branches merged deliberately'],
            ['Why was this changed?', 'Lost knowledge', 'Commit message on record'],
          ],
        },
        davidTip: `A useful habit: before changing a test suite you inherited, read its recent history first. The commits often explain a "weird" wait or an odd assertion far better than the code does — and stop you from re-introducing a bug someone already fixed.`,
        miniChallenge: `In one sentence each, describe how history, collaboration and safety would each help on a suite you currently work on. Keep it concrete — name the real problem each one solves for you.`,
      },
    },
    {
      lessonNumber: 2,
      title: 'Core Git: The Commands You Use Every Day',
      estimatedTime: '25 minutes',
      lessonOverview: `Most day-to-day Git is a handful of commands. This hands-on lesson covers cloning a repo, inspecting changes, staging deliberately, committing, and reading history — the loop you will run dozens of times a day on a test codebase.`,
      learningObjectives: [
        'Clone a repository and inspect its state with status, diff and log',
        'Explain the staging model and why the index sits between your files and a commit',
        'Write clear, reviewable commit messages for test-code changes',
      ],
      lessonNotes: `## The everyday loop
Nearly all your Git work is one short cycle: change files, see what changed, stage what you want, commit it. The commands are \`clone\`, \`status\`, \`diff\`, \`add\`, \`commit\` and \`log\`.

## Getting the repo
\`git clone <url>\` copies the whole repository — every file and its entire history — onto your machine. You do this once per project.

## Seeing where you are
- \`git status\` — what has changed, what is staged, and which branch you are on. Run it constantly.
- \`git diff\` — the exact line-by-line changes you have made but not yet staged.
- \`git diff --staged\` — the changes you have staged, ready to commit. Review this before every commit.

## The staging model
This is the part newcomers find odd and seniors rely on. Git has three areas:

- **Working directory** — your files as they are right now.
- **Staging area (the index)** — a deliberate snapshot of what your next commit will contain.
- **Repository** — the committed history.

\`git add\` moves changes from the working directory into staging. \`git commit\` turns whatever is staged into a permanent snapshot. The staging area lets you commit *some* of your changes and not others — for example, commit a new test but leave a debug \`console.log\` out of the record.

## Committing
\`git commit -m "message"\` records the staged changes. A good message has a short imperative summary line — "Add login smoke tests", not "stuff" or "fixes". If it needs more, add a blank line and a body explaining *why*.

## Reading history
- \`git log --oneline\` — a compact list of recent commits.
- \`git log -p <file>\` — the full change history of one file.
- \`git blame <file>\` — who last changed each line, and in which commit.

## Key takeaway
The daily loop is \`status\` → \`diff\` → \`add\` → \`commit\`, with the staging area letting you commit deliberately rather than dumping everything at once. Clear commit messages turn that loop into a history your team can actually read.`,
      workedExample: `You have cloned the team's Playwright repo and added a new smoke test. Walk the loop:

~~~bash
git clone git@github.com:acme/web-e2e-tests.git
cd web-e2e-tests

# You add tests/login.smoke.spec.ts, then:
git status
# Untracked files:
#   tests/login.smoke.spec.ts

git diff                 # nothing staged yet — shows working changes
git add tests/login.smoke.spec.ts
git diff --staged        # review exactly what will be committed

git commit -m "Add login smoke test covering happy path"
git log --oneline -1
# 9f3c1a2  Add login smoke test covering happy path
~~~

Note the deliberate steps: you looked at the diff *before* committing, and you staged one specific file rather than running \`git add .\` blindly. That is the difference between a tidy history and a noisy one.`,
      commonMistakes: `- Running \`git add .\` without checking \`git diff\` first, and committing debug output or an unrelated file
- Writing vague messages like "fix", "wip" or "update tests" that tell a reviewer nothing
- Committing huge, mixed changes in one go, so the commit cannot be reviewed or reverted cleanly
- Forgetting \`git status\` and losing track of what is staged versus merely changed`,
      realWorldTip: `On a delivery team, commit messages are read far more often than they are written — in code review, in release notes, in a 2am incident hunt. Write the message for the engineer who will read \`git log\` in six months trying to understand why a test changed. "Increase timeout to fix flaky checkout test on CI" beats "fix timeout" every time.`,
      exercise: `In a test repo (yours, or a throwaway one you create with \`git init\`), make two unrelated changes — say, add one new test and tweak an existing assertion. Using the staging area, commit them as two separate commits with clear messages, not one lump. Deliverable: a \`git log --oneline\` output showing two focused commits, each describing a single change.`,
      reflectionQuestion: `Why does Git put a staging area between your working files and a commit, rather than committing everything you have changed? What does that extra step let you do?`,
      knowledgeCheck: `Which command moves a change from the working directory into the staging area, ready to be committed? (Answer: git add.)`,
      completionChecklist: [
        'I can clone a repo and inspect it with status, diff and log',
        'I can explain the working directory, staging area and repository',
        'I can stage changes deliberately and write a clear commit message',
      ],
      enhancements: {
        badGood: {
          label: 'a commit on a test suite',
          bad: `git add .
git commit -m "tests"

Everything changed is dumped into one commit — a new test, an unrelated config tweak, and a stray \`console.log\` — under a message that explains nothing.`,
          good: `git add tests/checkout.spec.ts
git commit -m "Add checkout regression test for expired card"

One focused change, staged deliberately after reviewing the diff, with a message a reviewer can understand at a glance.`,
        },
        davidTip: `Get comfortable running \`git diff --staged\` as the last thing before every commit. It takes two seconds and it is the single best habit for keeping debug lines, secrets and half-finished experiments out of your team's history.`,
        miniChallenge: `Take a commit message you would honestly have written in a hurry — "fixed test" or similar — and rewrite it as a clear imperative summary line under 60 characters that says what changed and, where useful, why.`,
        visualAid: {
          type: 'flow',
          title: 'How a change moves through Git',
          steps: [
            { label: 'Working directory', detail: 'You edit login.spec.ts' },
            { label: 'git add', detail: 'Stage the file into the index' },
            { label: 'Staging area', detail: 'Review with git diff --staged' },
            { label: 'git commit', detail: 'Snapshot recorded in history' },
          ],
        },
      },
    },
    {
      lessonNumber: 3,
      title: 'Branching & Merging',
      estimatedTime: '22 minutes',
      lessonOverview: `Branches let a team work on the same test suite in parallel without stepping on each other. This lesson covers creating feature branches, merging them back, resolving the conflicts that inevitably arise, and why keeping branches short-lived matters.`,
      learningObjectives: [
        'Create and switch to a feature branch for a unit of test work',
        'Merge a branch back and resolve a merge conflict by hand',
        'Explain why short-lived branches reduce pain on a shared automation repo',
      ],
      lessonNotes: `## What a branch is
A **branch** is an independent line of work. On a test team the pattern is one branch per task: adding a feature's test coverage, fixing a flaky spec, upgrading Playwright. You do the work on the branch, then merge it back into the shared branch (often \`main\`) when it is ready and reviewed.

## Creating and switching
- \`git switch -c add-checkout-tests\` creates a branch and moves onto it. (\`git checkout -b add-checkout-tests\` does the same on older Git.)
- \`git switch main\` moves back to the main branch.
- \`git branch\` lists your branches and marks the one you are on.

Naming matters. \`add-checkout-tests\` or \`fix-flaky-login\` tells the team what the branch is for; \`dave-branch-2\` does not.

## Merging back
Once your work is committed and reviewed, you bring it into \`main\`:

~~~bash
git switch main
git merge add-checkout-tests
~~~

If \`main\` has not changed the same lines, Git merges cleanly. If it has, you get a **merge conflict**.

## Resolving conflicts
A conflict means two branches changed the same lines and Git cannot safely pick a winner. It marks the file:

~~~text
<<<<<<< HEAD
await expect(page).toHaveTitle('Checkout');
=======
await expect(page).toHaveTitle('Basket');
>>>>>>> add-checkout-tests
~~~

You edit the file to the correct final version, delete the marker lines, then \`git add\` the file and \`git commit\` to complete the merge. Conflicts are normal — they are Git asking you, the human, to make a judgement it cannot.

## Keep branches short-lived
The longer a branch lives, the more \`main\` moves underneath it and the worse the eventual conflicts. On a healthy team a branch lives hours to a couple of days, not weeks. Small, frequently merged branches keep everyone close to a shared truth and make conflicts rare and trivial.

## Key takeaway
Branch per task, name it for the work, merge it back promptly, and resolve conflicts by editing to the correct final state. Short-lived branches are the single biggest thing you can do to keep merging painless on a shared test repo.`,
      workedExample: `You pick up a task to add checkout tests. Work on a branch and merge it back:

~~~bash
git switch -c add-checkout-tests
# write tests/checkout.spec.ts, commit as you go
git add tests/checkout.spec.ts
git commit -m "Add checkout regression tests"

git switch main
git pull                      # get the latest main before merging
git merge add-checkout-tests
~~~

Suppose a teammate also edited \`playwright.config.ts\` on \`main\` while you changed it on your branch. Git reports a conflict in that file. You open it, see both versions between the \`<<<<<<<\` and \`>>>>>>>\` markers, keep the correct combined settings, delete the markers, then:

~~~bash
git add playwright.config.ts
git commit                    # completes the merge
~~~

The merge is done, both changes are preserved, and the history records exactly how they came together.`,
      commonMistakes: `- Working directly on \`main\` instead of a feature branch, so unfinished work blocks everyone
- Letting a branch live for weeks until it conflicts with half the suite
- "Resolving" a conflict by deleting the other person's changes instead of combining them correctly
- Leaving conflict markers (\`<<<<<<<\`) in a file and committing them — a broken test file that will not even parse`,
      realWorldTip: `On a delivery team the golden rule is: pull \`main\` before you branch, and pull \`main\` into your branch regularly while you work. A branch that stays close to \`main\` almost never has a nasty conflict. The engineers who "always get horrible merges" are usually the ones sitting on a two-week branch.`,
      exercise: `In a practice repo, create a branch, change one line of a test file, and commit it. Switch back to \`main\` and change the *same* line differently, then commit. Merge the branch and resolve the conflict Git raises, ending with the correct final line and no markers. Deliverable: a clean \`git log\` showing the merge commit and a file with the conflict properly resolved.`,
      reflectionQuestion: `Why does a branch that lives for two weeks tend to cause worse merge conflicts than one that lives for two hours? What is actually happening to \`main\` in the meantime?`,
      knowledgeCheck: `When Git reports a merge conflict, what must you do before the merge can be completed? (Answer: edit the file to the correct final content, remove the conflict markers, then git add and commit.)`,
      completionChecklist: [
        'I can create and switch between branches for separate pieces of work',
        'I can merge a branch back into main',
        'I can resolve a merge conflict and complete the merge cleanly',
      ],
      enhancements: {
        industryStory: `Two engineers spent an afternoon untangling a merge that touched forty test files. The cause was not skill — it was time. One of them had been working on a "big refactor" branch for three weeks while the rest of the team merged into \`main\` daily. By the time the branch came back, it disagreed with \`main\` almost everywhere. The team's fix was a rule, not a tool: no branch lives longer than two days, and big refactors get broken into small merges. Conflicts became a non-event.`,
        davidTip: `When a conflict looks scary, slow down and read both sides literally. The bit between \`<<<<<<< HEAD\` and \`=======\` is what is on your current branch; the bit below is what is coming in. Decide what the *correct final code* is — often it is a combination — and write that. Git is not trying to trick you; it is handing you a decision only a human can make.`,
        miniChallenge: `Write down the branch name you would use for three real tasks: adding tests for a new search feature, fixing a flaky payment test, and upgrading a test dependency. Make each name something a teammate could understand without asking you.`,
        visualAid: {
          type: 'flow',
          title: 'Feature-branch lifecycle',
          steps: [
            { label: 'Branch from main', detail: 'git switch -c fix-flaky-login' },
            { label: 'Commit work', detail: 'Small, focused commits' },
            { label: 'Pull main in', detail: 'Stay close to shared truth' },
            { label: 'Merge back', detail: 'Resolve any conflict, then done' },
          ],
        },
      },
    },
    {
      lessonNumber: 4,
      title: 'GitHub, Pull Requests & Code Review',
      estimatedTime: '24 minutes',
      lessonOverview: `Local Git becomes team Git through a remote like GitHub. This lesson covers pushing and pulling, opening a pull request, and — the senior skill — reviewing test code well: what to look for beyond "does it pass".`,
      learningObjectives: [
        'Push a branch to a remote and open a pull request',
        'Describe the pull request as the unit of review and integration on a team',
        'Review a test-code pull request for correctness, clarity and coverage — not just green ticks',
      ],
      lessonNotes: `## Remotes: local Git meets the team
A **remote** is a shared copy of the repository hosted somewhere every team member can reach — usually GitHub. \`origin\` is the conventional name for it.

- \`git push -u origin add-checkout-tests\` sends your branch to GitHub.
- \`git pull\` brings other people's merged work down into your local copy.
- \`git fetch\` downloads remote changes without merging them, so you can look before you integrate.

## The pull request
A **pull request** (PR) is a proposal to merge your branch into \`main\`, opened on GitHub. It is where review happens. A good PR is:

- **Small** — a reviewer can hold it all in their head. Hundreds of changed lines get rubber-stamped; forty get read properly.
- **Described** — a title and a short body saying what changed and why, plus how you verified it.
- **Focused** — one logical change. "Add checkout tests" and "upgrade Playwright" are two PRs, not one.

## Reviewing test code well
Reviewing automation is not the same as reviewing app code. A test PR can be all green and still be poor. Look for:

- **Correctness** — does the test actually assert the thing it claims to? A test that always passes is worse than no test.
- **Clarity** — will someone understand this test in six months? Are the names and assertions self-explanatory?
- **Coverage and intent** — does it cover the meaningful cases, or just the happy path? Is anything important missing?
- **Flakiness risk** — hard-coded waits, order dependence, shared state. These are the defects that erode trust in the whole suite.
- **No debug residue** — stray \`console.log\`, \`test.only\`, skipped tests, or committed secrets.

## Giving review feedback
Be specific and kind. "This \`waitForTimeout(5000)\` will be flaky under CI load — can we wait on the element instead?" is useful. "This is wrong" is not. Review is a conversation that makes the suite better, not a gate you defend.

## Key takeaway
Push your branch, open a small well-described PR, and treat review as a real quality step. Reviewing test code means checking that the test asserts the right thing, reads clearly, and will not flake — not just that the pipeline is green.`,
      workedExample: `You have finished your checkout tests on a branch and want them reviewed:

~~~bash
git push -u origin add-checkout-tests
# GitHub prints a URL to open a pull request
~~~

On GitHub you open the PR with a description:

~~~text
Title: Add checkout regression tests for expired-card path

- Covers expired card, declined card, and successful payment
- Waits on the confirmation element rather than a fixed timeout
- Verified locally against staging; all three specs pass
~~~

A reviewer reads the diff and leaves a comment on one line:

~~~text
This assertion checks the page title, but the bug we're guarding
against is the wrong total. Can we also assert on the order total?
~~~

You push a follow-up commit to the same branch; it appears in the PR automatically. Once the reviewer approves and CI is green, the PR is merged into \`main\` — one clean, reviewed integration.`,
      commonMistakes: `- Opening one enormous PR that mixes several changes, so nobody can review it properly
- Pushing a branch and merging your own PR with no review because "the tests pass"
- Reviewing only whether CI is green, ignoring whether the test asserts the right thing
- Approving a PR full of hard-coded waits and \`test.only\`, then wondering why the suite is flaky
- Leaving vague review comments ("looks off") instead of specific, actionable ones`,
      realWorldTip: `On a delivery team, the PR description is where you make the reviewer's job easy. Say what changed, why, and how you checked it. A reviewer who has to reverse-engineer your intent from the diff will either miss things or take twice as long — and a hard-to-review PR is a PR that gets waved through, which defeats the point.`,
      exercise: `Push a branch to a remote (a personal GitHub repo is fine) and open a pull request with a proper title and description covering what changed and how you verified it. Then review a PR — a teammate's, or an open-source one — and leave one specific, actionable comment about the test code, not just its result. Deliverable: a link to your PR and the text of the review comment you left.`,
      reflectionQuestion: `A test-code pull request is fully green in CI. Name two things that could still make it a PR you would not approve. Why does "the tests pass" not settle the question?`,
      knowledgeCheck: `On a team using GitHub, what is a pull request the unit of? (Answer: review and integration — it is the reviewed proposal to merge a branch into main.)`,
      completionChecklist: [
        'I can push a branch to a remote and open a pull request',
        'I can write a PR description that makes review easy',
        'I can review a test-code PR for correctness, clarity and flakiness, not just green ticks',
      ],
      enhancements: {
        industryStory: `A team measured how long its pull requests sat waiting for review and found the biggest ones were also the slowest — a five-hundred-line PR could sit for days, then get approved in minutes with barely a comment. Nobody had really read it; it was too big to hold in mind. When the team adopted a soft limit of a couple of hundred changed lines per PR, review turned from a rubber stamp into a genuine conversation, and two real test defects were caught in the first week that a big-PR review would have skimmed straight past.`,
        badGood: {
          label: 'a pull request review comment',
          bad: `"Looks wrong to me."

The author has no idea what is wrong, where, or what to do about it. The comment starts an argument, not a fix.`,
          good: `"This test asserts the page title but the regression we're guarding against is an incorrect order total. Could we assert on the total as well, and wait on the confirmation element instead of the fixed 5s timeout?"

Specific, tied to intent, and actionable — the author knows exactly what to change and why.`,
        },
        davidTip: `When you review test code, ask one blunt question of every test: could this ever fail? If you cannot picture a realistic build where the assertion goes red, the test is not protecting anything — and a suite full of tests that cannot fail gives false confidence, which is worse than no confidence at all.`,
        miniChallenge: `Draft a three-line PR description for a change that adds two tests and fixes one flaky one. Include what changed, why, and how you verified it — nothing more.`,
      },
    },
    {
      lessonNumber: 5,
      title: 'A Professional Automation Workflow',
      estimatedTime: '20 minutes',
      lessonOverview: `This lesson assembles the pieces into the workflow a real delivery team runs on a shared automation repo: branch, pull request, review, merge, CI-ready. It also covers the practical hygiene that keeps the repo clean — a proper \`.gitignore\` for a Playwright/Node project and knowing what must never be committed.`,
      learningObjectives: [
        'Describe the end-to-end branch → PR → review → merge → CI-ready workflow',
        'Write a .gitignore for a Playwright/Node test project',
        'Explain what must never be committed and why: dependencies, secrets and generated reports',
      ],
      lessonNotes: `## The workflow, end to end
Everything in this module comes together as one repeatable loop a team runs many times a day:

1. **Pull \`main\`** so you start from the current shared truth.
2. **Branch** for the task: \`git switch -c fix-flaky-login\`.
3. **Commit** small, focused, well-described changes.
4. **Push** the branch and **open a pull request**.
5. **Review** — a teammate reads the test code, you address feedback.
6. **CI runs** on the PR — the suite executes automatically and must be green.
7. **Merge** into \`main\`, then delete the branch.

This is what "professional" means in practice: not heroics, but a clean, boring loop that keeps a shared codebase healthy.

## Making the repo CI-ready
Continuous integration runs your tests automatically on every PR. For that to work, the repo must contain *everything needed to run the tests and nothing that shouldn't be shared*. That is where \`.gitignore\` earns its place.

## .gitignore for a Playwright/Node project
A \`.gitignore\` tells Git which files to leave out of version control entirely. For a typical Playwright/Node test project:

~~~text
# Dependencies — reinstalled from package.json, never committed
node_modules/

# Playwright output — generated on every run
test-results/
playwright-report/
blob-report/
playwright/.cache/

# Secrets and local config — never committed
.env
.env.*.local

# Editor and OS noise
.vscode/
.idea/
.DS_Store
~~~

## What must never be committed — and why
- **\`node_modules/\`** — hundreds of megabytes of dependencies that CI reinstalls from \`package.json\` and \`package-lock.json\`. Committing it bloats the repo and causes endless spurious conflicts. Commit the *lockfile*, not the folder.
- **Secrets** — API keys, passwords, tokens. Never in the repo, in a test, or in a committed \`.env\`. Once a secret is in Git history it is compromised, even after you delete it, because the history keeps it. Use environment variables and a \`.env\` that is git-ignored.
- **Generated reports and artefacts** — \`playwright-report/\`, \`test-results/\`, screenshots, videos, traces. They are outputs, regenerated on every run. Committing them creates churn and merge noise for zero benefit; CI publishes them as build artefacts instead.

## The rule of thumb
Commit the *source* — tests, config, \`package.json\`, the lockfile, the \`.gitignore\` itself. Ignore everything that is *installed*, *generated*, or *secret*. If a file can be recreated by running a command, or would cause harm if shared, it does not belong in the repo.

## Key takeaway
The professional workflow is a clean loop: pull, branch, commit, push, PR, review, CI, merge. A correct \`.gitignore\` keeps dependencies, secrets and generated reports out of the repo, so what is committed is exactly what CI needs to run your tests — and nothing that would bloat the history or leak a credential.`,
      workedExample: `A full task, start to finish, on a shared Playwright repo:

~~~bash
git switch main
git pull                                   # start from current main

git switch -c fix-flaky-login
# replace a fixed timeout with a proper wait, commit it
git add tests/login.spec.ts
git commit -m "Wait on dashboard heading instead of fixed timeout in login test"

git push -u origin fix-flaky-login         # opens PR on GitHub
~~~

Before the first push, you make sure the repo is clean. \`git status\` shows \`node_modules/\` and \`playwright-report/\` as untracked — a sign they are not yet ignored. You add a \`.gitignore\`:

~~~bash
printf 'node_modules/\\ntest-results/\\nplaywright-report/\\n.env\\n' >> .gitignore
git add .gitignore
git commit -m "Ignore dependencies, reports and env files"
~~~

Now \`git status\` is clean, the PR contains only the real change, CI installs dependencies from the lockfile and runs the suite green, a teammate approves, and you merge. Branch deleted, \`main\` advanced by exactly one meaningful change.`,
      commonMistakes: `- Committing \`node_modules/\` instead of relying on \`package-lock.json\` and \`npm ci\` in CI
- Committing a \`.env\` or a hard-coded token — a secret in Git history stays leaked even after deletion
- Committing \`playwright-report/\` and \`test-results/\`, filling the repo with regenerated churn
- Adding \`.gitignore\` late, after the junk is already tracked, then being surprised it keeps appearing
- Skipping the "pull main first" step and branching from a stale base`,
      realWorldTip: `On a delivery team, a secret committed even once is treated as compromised and rotated — the fix is not "delete the file", it is "revoke the key". So the \`.gitignore\` and the "never commit secrets" rule are not tidiness; they are security. Set the \`.gitignore\` up on day one of any test repo, before the first \`npm install\`, and you never have to clean up a tracked \`node_modules\` or a leaked token later.`,
      exercise: `Set up a Playwright/Node test repo (or take an existing one) and add a \`.gitignore\` that excludes \`node_modules/\`, \`test-results/\`, \`playwright-report/\` and \`.env\`. Confirm with \`git status\` that none of them are tracked, then run through the full loop once: branch, make a small change, commit, push, and open a pull request. Deliverable: the \`.gitignore\` file and a link to the pull request, with a clean \`git status\` showing no ignored artefacts staged.`,
      reflectionQuestion: `Why is deleting a committed secret and pushing the deletion not enough to make it safe again? What does that tell you about the cost of getting \`.gitignore\` wrong even once?`,
      knowledgeCheck: `Name three categories of files that should be listed in a Playwright/Node test project's .gitignore, and give the reason for one of them. (Answer: dependencies like node_modules/ — reinstalled from the lockfile; secrets like .env — must never be in history; generated reports like playwright-report/ and test-results/ — regenerated on every run.)`,
      completionChecklist: [
        'I can run the full branch → PR → review → merge loop on a shared repo',
        'I can write a .gitignore for a Playwright/Node test project',
        'I can explain why node_modules, secrets and reports must not be committed',
      ],
      enhancements: {
        industryStory: `A team discovered an access token sitting in a committed \`.env\` file during a routine review. It had been there for months. Deleting the file was the easy part; the real work was rotating the key, checking whether it had been used, and auditing every place it had been valid — because the token lived on in the Git history and had to be assumed compromised. The lasting fix was a one-line habit: a \`.gitignore\` with \`.env\` in it, added to every new repo before the first commit. The whole class of incident disappeared.`,
        visualAid: {
          type: 'comparison',
          title: 'Commit it or ignore it?',
          headers: ['File', 'Commit?', 'Why'],
          rows: [
            ['tests/, config, package.json', 'Commit', 'Source of truth CI needs'],
            ['package-lock.json', 'Commit', 'Pins exact dependency versions'],
            ['node_modules/', 'Ignore', 'Reinstalled from the lockfile'],
            ['.env / tokens', 'Ignore', 'Secrets — a leak is permanent'],
            ['playwright-report/, test-results/', 'Ignore', 'Generated on every run'],
          ],
        },
        davidTip: `The first commit in any new test repo should be the \`.gitignore\`, before you run \`npm install\`. It costs thirty seconds and it saves you from the two worst first-week mistakes on a shared repo: a tracked \`node_modules\` that will not stop conflicting, and a secret that quietly ends up in the history forever.`,
        miniChallenge: `Write the \`.gitignore\` you would commit as the very first file in a new Playwright/Node repo. Include dependencies, Playwright output, and secrets — and be ready to say in one line why each entry is there.`,
      },
    },
  ],
};
