// Course-specific progress derivations for the Modern Test Automation Bootcamp:
// a skills panel and a weighted grade. Everything here is derived from REAL
// completion/pass data — never faked percentages.

export const BOOTCAMP_SLUG = 'modern-test-automation-bootcamp';

// Each skill maps to the modules that build it. A skill's percentage is the
// share of its modules the student has completed (module_progress = 'completed').
export interface SkillDef {
  name: string;
  modules: number[];
}

export const BOOTCAMP_SKILLS: SkillDef[] = [
  { name: 'TypeScript', modules: [2] },
  { name: 'Playwright', modules: [4, 6, 10] },
  { name: 'Test Design', modules: [1, 5] },
  { name: 'API Automation', modules: [9] },
  { name: 'Git / GitHub', modules: [3] },
  { name: 'Framework Architecture', modules: [7, 8] },
  { name: 'CI/CD', modules: [11, 12] },
  { name: 'Debugging', modules: [6, 13] },
  { name: 'AI-Assisted Automation', modules: [14] },
];

// Weighted grade. Weights sum to 100. Each component's achieved fraction (0..1)
// is derived from passed quizzes / passed assignments (projects are single
// url-submission assignments on their module).
export interface GradeComponent {
  key: string;
  label: string;
  weight: number;
  // Modules whose quiz must be passed (quizzes component)…
  quizModules?: number[];
  // …or whose assignment must be passed (assignment/project components).
  assignmentModules?: number[];
}

export const BOOTCAMP_GRADE: { components: GradeComponent[]; passMark: number; distinction: number } = {
  components: [
    { key: 'quizzes', label: 'Quizzes', weight: 15, quizModules: [1, 2, 4, 5, 6, 7, 8, 9, 12, 14] },
    { key: 'assignments', label: 'Practical assignments', weight: 30, assignmentModules: [1, 2, 3, 4, 5, 6, 8, 9, 10, 13, 14, 15] },
    { key: 'project1', label: 'Project 1 — UI Automation', weight: 10, assignmentModules: [7] },
    { key: 'project2', label: 'Project 2 — Full-Stack + CI', weight: 15, assignmentModules: [12] },
    { key: 'capstone', label: 'Final Capstone', weight: 30, assignmentModules: [16] },
  ],
  passMark: 70,
  distinction: 85,
};

export interface SkillProgress {
  name: string;
  percent: number;
  done: number;
  total: number;
}

export function computeSkills(completedModuleNumbers: Set<number>): SkillProgress[] {
  return BOOTCAMP_SKILLS.map((s) => {
    const done = s.modules.filter((m) => completedModuleNumbers.has(m)).length;
    const total = s.modules.length;
    return { name: s.name, done, total, percent: total ? Math.round((done / total) * 100) : 0 };
  });
}

export interface GradeComponentResult {
  key: string;
  label: string;
  weight: number;
  achieved: number; // 0..1
  earned: number;   // weight * achieved
  done: number;
  total: number;
}

export interface GradeResult {
  components: GradeComponentResult[];
  overall: number; // 0..100
  passed: boolean;
  distinction: boolean;
}

export function computeGrade(input: {
  passedQuizModules: Set<number>;
  passedAssignmentModules: Set<number>;
}): GradeResult {
  const components = BOOTCAMP_GRADE.components.map((c) => {
    const mods = c.quizModules ?? c.assignmentModules ?? [];
    const passedSet = c.quizModules ? input.passedQuizModules : input.passedAssignmentModules;
    const done = mods.filter((m) => passedSet.has(m)).length;
    const total = mods.length;
    const achieved = total ? done / total : 0;
    return { key: c.key, label: c.label, weight: c.weight, achieved, earned: c.weight * achieved, done, total };
  });
  const overall = Math.round(components.reduce((sum, c) => sum + c.earned, 0));
  return {
    components,
    overall,
    passed: overall >= BOOTCAMP_GRADE.passMark,
    distinction: overall >= BOOTCAMP_GRADE.distinction,
  };
}
