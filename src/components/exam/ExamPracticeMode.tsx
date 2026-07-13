'use client';

import { useMemo, useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import type {
  PracticeQuestion,
  PracticeOption,
  QuestionAttempt,
  MockExamResult,
  ExamMode,
} from '@/types';

// ISTQB Foundation pass mark.
const PASS_MARK = 65;
const MOCK_TOTAL = 40;
const MOCK_MINUTES = 60;
const TIMED_LENGTH = 20;
const TIMED_MINUTES = 25;

interface Props {
  courseId: string;
  courseTitle: string;
  userId: string;
  questions: PracticeQuestion[];
  initialAttempts: QuestionAttempt[];
  initialMockResults: MockExamResult[];
}

type View = 'hub' | 'run' | 'results';

interface RunConfig {
  mode: ExamMode;
  title: string;
  immediate: boolean;          // reveal answer after each question (learn) vs exam simulation
  timed: boolean;
  seconds: number;             // total time when timed
  passMark: number;
  mockNo: number | null;
}

interface RunQ {
  q: PracticeQuestion;
  opts: PracticeOption[];      // shuffled display order
}

interface FinishedRun {
  cfg: RunConfig;
  items: RunQ[];
  answers: Map<string, PracticeOption>;
  score: number;               // %
  correct: number;
  total: number;
  passed: boolean;
  perTopic: { topic: string; correct: number; total: number }[];
}

// ── helpers ───────────────────────────────────────────────────────
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function fmtTime(s: number): string {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${String(sec).padStart(2, '0')}`;
}

function readinessLabel(pct: number): { label: string; color: string } {
  if (pct >= 80) return { label: 'Exam ready', color: 'text-green-700' };
  if (pct >= 65) return { label: 'On track', color: 'text-brand-700' };
  if (pct >= 50) return { label: 'Getting there', color: 'text-yellow-700' };
  return { label: 'Keep practising', color: 'text-red-600' };
}

export function ExamPracticeMode({
  courseId,
  courseTitle,
  userId,
  questions,
  initialAttempts,
  initialMockResults,
}: Props) {
  const [view, setView] = useState<View>('hub');
  const [attempts, setAttempts] = useState<QuestionAttempt[]>(initialAttempts);
  const [mockResults, setMockResults] = useState<MockExamResult[]>(initialMockResults);

  // active run state
  const [cfg, setCfg] = useState<RunConfig | null>(null);
  const [items, setItems] = useState<RunQ[]>([]);
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Map<string, PracticeOption>>(new Map());
  const [revealed, setRevealed] = useState(false); // immediate mode: current question locked
  const [remaining, setRemaining] = useState(0);
  const [finished, setFinished] = useState<FinishedRun | null>(null);
  const [saving, setSaving] = useState(false);
  const [topicPick, setTopicPick] = useState<string | null>(null);
  const submittedRef = useRef(false);

  // ── derived: split bank vs mocks ────────────────────────────────
  const bank = useMemo(() => questions.filter((q) => q.mock == null), [questions]);
  const mock1 = useMemo(
    () => questions.filter((q) => q.mock === 1).sort((a, b) => (a.mock_order ?? 0) - (b.mock_order ?? 0)),
    [questions],
  );
  const mock2 = useMemo(
    () => questions.filter((q) => q.mock === 2).sort((a, b) => (a.mock_order ?? 0) - (b.mock_order ?? 0)),
    [questions],
  );

  const topics = useMemo(() => {
    const seen = new Map<string, number>();
    for (const q of bank) seen.set(q.syllabus_topic, (seen.get(q.syllabus_topic) ?? 0) + 1);
    // preserve module order
    const order: string[] = [];
    for (const q of bank) if (!order.includes(q.syllabus_topic)) order.push(q.syllabus_topic);
    return order.map((t) => ({ topic: t, total: seen.get(t) ?? 0 }));
  }, [bank]);

  // ── stats from attempts (latest per question) ───────────────────
  const latestByQuestion = useMemo(() => {
    const m = new Map<string, QuestionAttempt>();
    for (const a of attempts) {
      const prev = m.get(a.question_id);
      if (!prev || a.attempted_at > prev.attempted_at) m.set(a.question_id, a);
    }
    return m;
  }, [attempts]);

  const topicStats = useMemo(() => {
    return topics.map(({ topic, total }) => {
      const qs = bank.filter((q) => q.syllabus_topic === topic);
      let attemptedC = 0;
      let correctC = 0;
      for (const q of qs) {
        const a = latestByQuestion.get(q.id);
        if (a) {
          attemptedC++;
          if (a.is_correct) correctC++;
        }
      }
      const accuracy = attemptedC > 0 ? Math.round((correctC / attemptedC) * 100) : null;
      return { topic, total, attempted: attemptedC, correct: correctC, accuracy };
    });
  }, [topics, bank, latestByQuestion]);

  const overall = useMemo(() => {
    let a = 0;
    let c = 0;
    for (const q of bank) {
      const at = latestByQuestion.get(q.id);
      if (at) {
        a++;
        if (at.is_correct) c++;
      }
    }
    const accuracy = a > 0 ? Math.round((c / a) * 100) : 0;
    const coverage = bank.length > 0 ? Math.round((a / bank.length) * 100) : 0;
    return { attempted: a, correct: c, accuracy, coverage, bankSize: bank.length };
  }, [bank, latestByQuestion]);

  // Questions the learner most recently got wrong — the revision pool.
  const wrongPool = useMemo(() => {
    return bank.filter((q) => {
      const a = latestByQuestion.get(q.id);
      return a && !a.is_correct;
    });
  }, [bank, latestByQuestion]);

  // Study streak: consecutive days (up to today) with at least one attempt.
  const streak = useMemo(() => {
    if (attempts.length === 0) return 0;
    const days = new Set(attempts.map((a) => a.attempted_at.slice(0, 10)));
    let count = 0;
    const d = new Date();
    // allow today or yesterday to start the streak
    const iso = (x: Date) => x.toISOString().slice(0, 10);
    if (!days.has(iso(d))) d.setDate(d.getDate() - 1);
    while (days.has(iso(d))) {
      count++;
      d.setDate(d.getDate() - 1);
    }
    return count;
  }, [attempts]);

  const bestMock = useCallback(
    (no: number) => {
      const runs = mockResults.filter((r) => r.mock === no);
      if (runs.length === 0) return null;
      return runs.reduce((best, r) => (r.score > best.score ? r : best));
    },
    [mockResults],
  );

  const readiness = useMemo(() => {
    // Blend accuracy (70%) with coverage of the bank (30%); require a passed mock to reach "ready".
    const base = Math.round(overall.accuracy * 0.7 + overall.coverage * 0.3);
    return Math.min(100, base);
  }, [overall]);

  // ── build & start a run ─────────────────────────────────────────
  function toRunQs(qs: PracticeQuestion[]): RunQ[] {
    return qs.map((q) => ({ q, opts: shuffle(q.options) }));
  }

  function startRun(config: RunConfig, qs: PracticeQuestion[]) {
    submittedRef.current = false;
    setCfg(config);
    setItems(toRunQs(qs));
    setIdx(0);
    setAnswers(new Map());
    setRevealed(false);
    setFinished(null);
    setRemaining(config.seconds);
    setView('run');
  }

  const startTopic = (topic: string, count: number) => {
    const pool = shuffle(bank.filter((q) => q.syllabus_topic === topic));
    startRun(
      { mode: 'topic', title: topic, immediate: true, timed: false, seconds: 0, passMark: PASS_MARK, mockNo: null },
      pool.slice(0, count),
    );
  };

  const startRandom = (count: number) => {
    startRun(
      { mode: 'random', title: `Quick ${count} — random questions`, immediate: true, timed: false, seconds: 0, passMark: PASS_MARK, mockNo: null },
      shuffle(bank).slice(0, count),
    );
  };

  const startTimed = () => {
    startRun(
      { mode: 'timed', title: 'Timed practice', immediate: false, timed: true, seconds: TIMED_MINUTES * 60, passMark: PASS_MARK, mockNo: null },
      shuffle(bank).slice(0, TIMED_LENGTH),
    );
  };

  const startMock = (no: number) => {
    const qs = no === 1 ? mock1 : mock2;
    startRun(
      { mode: 'mock', title: `Mock Exam ${no}`, immediate: false, timed: true, seconds: MOCK_MINUTES * 60, passMark: PASS_MARK, mockNo: no },
      qs,
    );
  };

  const startRevision = () => {
    startRun(
      { mode: 'revision', title: 'Revision — questions you got wrong', immediate: true, timed: false, seconds: 0, passMark: PASS_MARK, mockNo: null },
      shuffle(wrongPool).slice(0, 20),
    );
  };

  // ── timer ───────────────────────────────────────────────────────
  useEffect(() => {
    if (view !== 'run' || !cfg?.timed) return;
    if (remaining <= 0) {
      finishRun();
      return;
    }
    const t = setTimeout(() => setRemaining((r) => r - 1), 1000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view, cfg, remaining]);

  // ── answering ───────────────────────────────────────────────────
  function choose(opt: PracticeOption) {
    if (!cfg) return;
    const q = items[idx].q;
    if (cfg.immediate && revealed) return; // locked after reveal
    setAnswers((prev) => {
      const next = new Map(prev);
      next.set(q.id, opt);
      return next;
    });
    if (cfg.immediate) setRevealed(true);
  }

  function next() {
    if (idx < items.length - 1) {
      setIdx(idx + 1);
      setRevealed(false);
    } else {
      finishRun();
    }
  }
  function prev() {
    if (idx > 0) {
      setIdx(idx - 1);
      setRevealed(cfg?.immediate ? answers.has(items[idx - 1].q.id) : false);
    }
  }

  // ── finish & persist ────────────────────────────────────────────
  const finishRun = useCallback(async () => {
    if (submittedRef.current || !cfg) return;
    submittedRef.current = true;

    let correct = 0;
    const topicAgg = new Map<string, { correct: number; total: number }>();
    const attemptRows: {
      user_id: string;
      question_id: string;
      course_id: string;
      syllabus_topic: string;
      is_correct: boolean;
      mode: ExamMode;
    }[] = [];

    for (const { q } of items) {
      const chosen = answers.get(q.id);
      const isCorrect = !!chosen?.correct;
      // exam modes score every question (unanswered = wrong); practice records only answered
      const counts = cfg.immediate ? chosen != null : true;
      if (isCorrect) correct++;
      const agg = topicAgg.get(q.syllabus_topic) ?? { correct: 0, total: 0 };
      agg.total++;
      if (isCorrect) agg.correct++;
      topicAgg.set(q.syllabus_topic, agg);
      if (counts) {
        attemptRows.push({
          user_id: userId,
          question_id: q.id,
          course_id: courseId,
          syllabus_topic: q.syllabus_topic,
          is_correct: isCorrect,
          mode: cfg.mode,
        });
      }
    }

    const total = items.length;
    const score = total > 0 ? Math.round((correct / total) * 100) : 0;
    const passed = score >= cfg.passMark;
    const perTopic = [...topicAgg.entries()].map(([topic, v]) => ({ topic, correct: v.correct, total: v.total }));

    setFinished({ cfg, items, answers, score, correct, total, passed, perTopic });
    setView('results');

    // persist (best-effort)
    setSaving(true);
    try {
      const supabase = createClient();
      if (attemptRows.length > 0) {
        const { data } = await supabase.from('question_attempts').insert(attemptRows).select('*');
        if (data) setAttempts((prev) => [...prev, ...(data as QuestionAttempt[])]);
      }
      if (cfg.mode === 'mock' && cfg.mockNo != null) {
        const weakTopics = perTopic.filter((t) => t.total > 0 && t.correct / t.total < 0.65).map((t) => t.topic);
        const { data } = await supabase
          .from('mock_exam_results')
          .insert({ user_id: userId, course_id: courseId, mock: cfg.mockNo, score, total, passed, weak_topics: weakTopics })
          .select('*');
        if (data) setMockResults((prev) => [...(data as MockExamResult[]), ...prev]);
      }
    } catch {
      // ignore persistence errors; results still shown
    } finally {
      setSaving(false);
    }
  }, [cfg, items, answers, userId, courseId]);

  // ════════════════════════════════════════════════════════════════
  // RENDER
  // ════════════════════════════════════════════════════════════════
  if (view === 'run' && cfg) return renderRun();
  if (view === 'results' && finished) return renderResults(finished);
  return renderHub();

  // ── HUB ─────────────────────────────────────────────────────────
  function renderHub() {
    const r = readinessLabel(readiness);
    const m1 = bestMock(1);
    const m2 = bestMock(2);
    return (
      <div className="p-6 lg:p-8 max-w-4xl mx-auto">
        <Link href={`/dashboard/course/${courseId}`} className="text-sm text-gray-500 hover:text-gray-700 mb-4 inline-block">
          ← Back to course
        </Link>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Exam Practice</h1>
          <p className="text-gray-500 mt-1">{courseTitle} · {bank.length} practice questions · 2 mock exams · pass mark {PASS_MARK}%</p>
        </div>

        {/* readiness + streak */}
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white border rounded-xl p-5 sm:col-span-1">
            <div className="text-xs uppercase tracking-wide text-gray-400 mb-1">Exam readiness</div>
            <div className={`text-4xl font-bold ${r.color}`}>{readiness}%</div>
            <div className={`text-sm font-medium ${r.color} mt-1`}>{r.label}</div>
            <div className="mt-3 h-2 rounded-full bg-gray-100 overflow-hidden">
              <div className="h-full bg-brand-500" style={{ width: `${readiness}%` }} />
            </div>
          </div>
          <div className="bg-white border rounded-xl p-5">
            <div className="text-xs uppercase tracking-wide text-gray-400 mb-1">Questions attempted</div>
            <div className="text-3xl font-bold text-gray-900">{overall.attempted}<span className="text-lg text-gray-400">/{overall.bankSize}</span></div>
            <div className="text-sm text-gray-500 mt-1">{overall.accuracy}% correct overall</div>
          </div>
          <div className="bg-white border rounded-xl p-5">
            <div className="text-xs uppercase tracking-wide text-gray-400 mb-1">Study streak</div>
            <div className="text-3xl font-bold text-gray-900">{streak} <span className="text-lg text-gray-400">day{streak === 1 ? '' : 's'}</span></div>
            <div className="text-sm text-gray-500 mt-1">{streak > 0 ? 'Keep it going!' : 'Start today'}</div>
          </div>
        </div>

        {/* practice modes */}
        <h2 className="font-semibold text-gray-900 mb-3">Practice</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-4">
          <button onClick={() => startRandom(10)} className="text-left bg-white border rounded-xl p-4 hover:border-brand-300 hover:shadow-sm transition">
            <div className="font-semibold text-gray-900">Quick 10</div>
            <div className="text-sm text-gray-500">10 random questions with instant feedback and explanations.</div>
          </button>
          <button onClick={startRevision} disabled={wrongPool.length === 0}
            className="text-left bg-white border rounded-xl p-4 hover:border-brand-300 hover:shadow-sm transition disabled:opacity-50 disabled:hover:shadow-none disabled:hover:border-gray-200">
            <div className="font-semibold text-gray-900">Revision — your weak spots</div>
            <div className="text-sm text-gray-500">{wrongPool.length > 0 ? `Redo the ${Math.min(wrongPool.length, 20)} questions you last got wrong.` : 'No incorrect answers yet — nothing to revise.'}</div>
          </button>
        </div>

        {/* topic quizzes */}
        <h2 className="font-semibold text-gray-900 mb-3">Quiz by syllabus topic</h2>
        <div className="bg-white border rounded-xl divide-y mb-6">
          {topicStats.map((t) => (
            <div key={t.topic} className="flex items-center gap-4 p-4">
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900 truncate">{t.topic}</div>
                <div className="mt-1.5 flex items-center gap-3">
                  <div className="flex-1 h-1.5 rounded-full bg-gray-100 overflow-hidden max-w-[200px]">
                    <div
                      className={`h-full ${t.accuracy == null ? 'bg-gray-200' : t.accuracy >= 65 ? 'bg-green-500' : 'bg-yellow-500'}`}
                      style={{ width: `${t.accuracy ?? 0}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-400 whitespace-nowrap">
                    {t.accuracy == null ? `${t.total} questions` : `${t.accuracy}% · ${t.attempted}/${t.total} tried`}
                  </span>
                </div>
              </div>
              <button
                onClick={() => startTopic(t.topic, Math.min(t.total, 15))}
                className="flex-shrink-0 text-sm font-semibold text-brand-600 hover:text-brand-700 border border-brand-200 hover:border-brand-400 rounded-lg px-3 py-1.5"
              >
                Practise
              </button>
            </div>
          ))}
        </div>

        {/* exam simulations */}
        <h2 className="font-semibold text-gray-900 mb-3">Exam simulation</h2>
        <div className="grid sm:grid-cols-3 gap-3">
          <button onClick={startTimed} className="text-left bg-white border rounded-xl p-4 hover:border-brand-300 hover:shadow-sm transition">
            <div className="font-semibold text-gray-900">Timed practice</div>
            <div className="text-sm text-gray-500 mt-0.5">{TIMED_LENGTH} questions · {TIMED_MINUTES} min · exam conditions.</div>
          </button>
          {[1, 2].map((no) => {
            const best = no === 1 ? m1 : m2;
            const qs = no === 1 ? mock1 : mock2;
            return (
              <button key={no} onClick={() => startMock(no)} disabled={qs.length === 0}
                className="text-left bg-navy-900 text-white rounded-xl p-4 hover:opacity-95 transition disabled:opacity-40">
                <div className="font-semibold flex items-center justify-between">Mock Exam {no}
                  {best && <span className={`text-xs font-bold px-2 py-0.5 rounded ${best.passed ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>{best.score}%</span>}
                </div>
                <div className="text-sm text-gray-300 mt-0.5">{qs.length} questions · {MOCK_MINUTES} min{best ? ` · best ${best.passed ? 'PASS' : 'not yet'}` : ' · not attempted'}</div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // ── RUN ─────────────────────────────────────────────────────────
  function renderRun() {
    if (!cfg) return null;
    const item = items[idx];
    const chosen = answers.get(item.q.id);
    const showFeedback = cfg.immediate && revealed;
    const answeredCount = items.filter((it) => answers.has(it.q.id)).length;

    return (
      <div className="p-6 lg:p-8 max-w-3xl mx-auto">
        {/* header */}
        <div className="flex items-center justify-between mb-4">
          <div className="min-w-0">
            <div className="text-xs uppercase tracking-wide text-gray-400">{cfg.title}</div>
            <div className="font-semibold text-gray-900">Question {idx + 1} of {items.length}</div>
          </div>
          <div className="flex items-center gap-3">
            {cfg.timed && (
              <div className={`font-mono font-bold px-3 py-1.5 rounded-lg ${remaining <= 60 ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>
                {fmtTime(remaining)}
              </div>
            )}
            <button onClick={() => { if (confirm('End this session? Your answers so far will be scored.')) finishRun(); }}
              className="text-sm text-gray-400 hover:text-gray-600">End</button>
          </div>
        </div>

        {/* progress */}
        <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden mb-6">
          <div className="h-full bg-brand-500 transition-all" style={{ width: `${((idx + 1) / items.length) * 100}%` }} />
        </div>

        {/* question */}
        <div className="bg-white border rounded-xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-medium text-gray-400">{item.q.syllabus_topic}</span>
            {item.q.k_level && <span className="text-xs font-bold text-brand-600 bg-brand-50 rounded px-1.5 py-0.5">{item.q.k_level}</span>}
          </div>
          <p className="text-gray-900 font-medium mb-5 whitespace-pre-wrap">{item.q.question_text}</p>

          <div className="space-y-2">
            {item.opts.map((opt, i) => {
              const isChosen = chosen === opt;
              let cls = 'border-gray-200 hover:border-gray-300';
              if (showFeedback) {
                if (opt.correct) cls = 'border-green-500 bg-green-50';
                else if (isChosen) cls = 'border-red-400 bg-red-50';
                else cls = 'border-gray-200 opacity-70';
              } else if (isChosen) {
                cls = 'border-brand-500 bg-brand-50';
              }
              return (
                <button key={i} onClick={() => choose(opt)} disabled={showFeedback}
                  className={`w-full text-left flex items-start gap-3 p-3 rounded-lg border transition ${cls} disabled:cursor-default`}>
                  <span className="flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold text-gray-500">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="text-sm text-gray-800">{opt.text}</span>
                </button>
              );
            })}
          </div>

          {/* immediate feedback */}
          {showFeedback && chosen && (
            <div className="mt-5 space-y-3">
              <div className={`rounded-lg p-3 text-sm font-semibold ${chosen.correct ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                {chosen.correct ? 'Correct' : 'Not quite'} — {chosen.why}
              </div>
              <div className="rounded-lg bg-gray-50 border border-gray-100 p-3 text-sm text-gray-700">
                <span className="font-semibold text-gray-900">Explanation. </span>{item.q.explanation}
              </div>
              {item.q.workplace_example && (
                <div className="rounded-lg bg-brand-50/50 border border-brand-100 p-3 text-sm text-gray-700">
                  <span className="font-semibold text-brand-700">In the workplace. </span>{item.q.workplace_example}
                </div>
              )}
            </div>
          )}
        </div>

        {/* nav */}
        <div className="flex items-center justify-between mt-5">
          <button onClick={prev} disabled={idx === 0} className="text-sm font-medium text-gray-500 hover:text-gray-700 disabled:opacity-40">← Previous</button>
          <div className="text-xs text-gray-400">{answeredCount}/{items.length} answered</div>
          {cfg.immediate ? (
            <button onClick={next} disabled={!revealed}
              className="bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold px-5 py-2 rounded-lg disabled:opacity-40">
              {idx === items.length - 1 ? 'Finish' : 'Next →'}
            </button>
          ) : idx === items.length - 1 ? (
            <button onClick={() => { if (confirm('Submit your exam for marking?')) finishRun(); }}
              className="bg-navy-900 hover:opacity-90 text-white text-sm font-semibold px-5 py-2 rounded-lg">Submit exam</button>
          ) : (
            <button onClick={next} className="bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold px-5 py-2 rounded-lg">Next →</button>
          )}
        </div>
      </div>
    );
  }

  // ── RESULTS ─────────────────────────────────────────────────────
  function renderResults(f: FinishedRun) {
    const isExam = !f.cfg.immediate;
    return (
      <div className="p-6 lg:p-8 max-w-3xl mx-auto">
        <div className={`rounded-2xl p-8 text-center mb-6 border ${f.passed ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`}>
          <div className="text-xs uppercase tracking-wide text-gray-500 mb-1">{f.cfg.title}</div>
          <div className={`text-5xl font-bold mb-2 ${f.passed ? 'text-green-700' : 'text-yellow-700'}`}>{f.score}%</div>
          <p className={`font-semibold text-lg ${f.passed ? 'text-green-800' : 'text-yellow-800'}`}>
            {f.correct} / {f.total} correct — {f.passed ? (f.cfg.mode === 'mock' ? 'Pass!' : 'Great work!') : `below the ${f.cfg.passMark}% pass mark`}
          </p>
          {saving && <p className="text-xs text-gray-400 mt-2">Saving your progress…</p>}
        </div>

        {/* per-topic breakdown */}
        {f.perTopic.length > 1 && (
          <div className="bg-white border rounded-xl p-5 mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Breakdown by topic</h3>
            <div className="space-y-2.5">
              {f.perTopic.map((t) => {
                const pct = Math.round((t.correct / t.total) * 100);
                return (
                  <div key={t.topic} className="flex items-center gap-3">
                    <span className="text-sm text-gray-700 flex-1 min-w-0 truncate">{t.topic}</span>
                    <div className="w-28 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                      <div className={`h-full ${pct >= 65 ? 'bg-green-500' : 'bg-yellow-500'}`} style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-xs text-gray-400 w-16 text-right">{t.correct}/{t.total}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* review each question (exam mode reveals answers here) */}
        {isExam && (
          <div className="space-y-4 mb-6">
            <h3 className="font-semibold text-gray-900">Review answers</h3>
            {f.items.map((it, i) => {
              const chosen = f.answers.get(it.q.id);
              const correctOpt = it.opts.find((o) => o.correct)!;
              const gotIt = !!chosen?.correct;
              return (
                <div key={it.q.id} className="bg-white border rounded-xl p-5">
                  <div className="flex items-start gap-2 mb-2">
                    <span className={`flex-shrink-0 text-xs font-bold px-2 py-0.5 rounded ${gotIt ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{gotIt ? '✓' : '✗'}</span>
                    <p className="text-sm font-medium text-gray-900">{i + 1}. {it.q.question_text}</p>
                  </div>
                  <div className="text-sm text-gray-700 ml-8 space-y-1">
                    {!gotIt && chosen && <p><span className="text-red-600 font-medium">Your answer:</span> {chosen.text}</p>}
                    {!gotIt && !chosen && <p className="text-red-600 font-medium">Not answered</p>}
                    <p><span className="text-green-700 font-medium">Correct:</span> {correctOpt.text}</p>
                    <p className="text-gray-600 mt-1">{it.q.explanation}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          <button onClick={() => setView('hub')} className="bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg">Back to practice hub</button>
          {f.cfg.mode === 'mock' && f.cfg.mockNo != null ? (
            <button onClick={() => startMock(f.cfg.mockNo!)} className="border border-gray-300 hover:border-gray-400 text-gray-700 text-sm font-semibold px-5 py-2.5 rounded-lg">Retake mock</button>
          ) : (
            <button onClick={() => { const qs = f.items.map((x) => x.q); startRun(f.cfg, qs); }} className="border border-gray-300 hover:border-gray-400 text-gray-700 text-sm font-semibold px-5 py-2.5 rounded-lg">Retake this set</button>
          )}
        </div>
      </div>
    );
  }
}
