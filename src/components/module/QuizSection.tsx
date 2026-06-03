'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { formatDate } from '@/lib/utils';
import type { Quiz, QuizQuestion, QuizAnswer, QuizAttempt } from '@/types';

interface Props {
  quiz: Quiz & { quiz_questions: (QuizQuestion & { quiz_answers: QuizAnswer[] })[] };
  userId: string;
  bestAttempt: QuizAttempt | null;
  quizPassed: boolean;
}

type QuizState = 'idle' | 'taking' | 'submitted';

export function QuizSection({ quiz, userId, bestAttempt, quizPassed }: Props) {
  const [state, setState] = useState<QuizState>('idle');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<{ score: number; passed: boolean; total: number } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const questions = [...(quiz.quiz_questions ?? [])].sort((a, b) => a.sort_order - b.sort_order);

  function selectAnswer(questionId: string, answerId: string) {
    setAnswers(prev => ({ ...prev, [questionId]: answerId }));
  }

  async function submitQuiz() {
    setSubmitting(true);
    const supabase = createClient();

    let correct = 0;
    for (const q of questions) {
      const selectedId = answers[q.id];
      const correctAnswer = q.quiz_answers.find(a => a.is_correct);
      if (selectedId && correctAnswer && selectedId === correctAnswer.id) {
        correct++;
      }
    }

    const total = questions.length;
    const score = total > 0 ? Math.round((correct / total) * 100) : 0;
    const passed = score >= quiz.pass_mark;

    await supabase.from('quiz_attempts').insert({
      quiz_id: quiz.id,
      user_id: userId,
      score,
      passed,
    });

    setResult({ score, passed, total });
    setState('submitted');
    setSubmitting(false);
  }

  if (state === 'idle') {
    return (
      <div>
        <p className="text-sm text-gray-600 mb-2">
          {questions.length} questions &bull; Pass mark: {quiz.pass_mark}%
        </p>
        {bestAttempt && (
          <div className={`mb-4 p-3 rounded-lg text-sm ${bestAttempt.passed ? 'bg-green-50 text-green-800' : 'bg-yellow-50 text-yellow-800'}`}>
            Last attempt: {bestAttempt.score}% – {bestAttempt.passed ? 'Passed' : 'Not passed'} &bull;{' '}
            {formatDate(bestAttempt.attempted_at)}
          </div>
        )}
        <Button onClick={() => setState('taking')}>
          {bestAttempt ? 'Retake quiz' : 'Start quiz'}
        </Button>
      </div>
    );
  }

  if (state === 'submitted' && result) {
    return (
      <div>
        <div className={`p-6 rounded-xl text-center mb-6 ${result.passed ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'}`}>
          <div className={`text-4xl font-bold mb-2 ${result.passed ? 'text-green-700' : 'text-yellow-700'}`}>
            {result.score}%
          </div>
          <p className={`font-semibold text-lg ${result.passed ? 'text-green-800' : 'text-yellow-800'}`}>
            {result.passed ? '🎉 Congratulations, you passed!' : 'Not passed this time'}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Pass mark: {quiz.pass_mark}%
          </p>
        </div>
        {!result.passed && (
          <Button variant="secondary" onClick={() => { setState('idle'); setAnswers({}); setResult(null); }}>
            Try again
          </Button>
        )}
      </div>
    );
  }

  const allAnswered = questions.every(q => answers[q.id]);

  return (
    <div className="space-y-6">
      {questions.map((question, idx) => (
        <div key={question.id}>
          <p className="text-sm font-semibold text-gray-900 mb-3">
            {idx + 1}. {question.question_text}
          </p>
          <div className="space-y-2">
            {question.quiz_answers.map(answer => (
              <label
                key={answer.id}
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                  answers[question.id] === answer.id
                    ? 'border-brand-500 bg-brand-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name={question.id}
                  value={answer.id}
                  checked={answers[question.id] === answer.id}
                  onChange={() => selectAnswer(question.id, answer.id)}
                  className="text-brand-600"
                />
                <span className="text-sm text-gray-800">{answer.answer_text}</span>
              </label>
            ))}
          </div>
        </div>
      ))}

      <div className="flex gap-3 pt-2">
        <Button onClick={submitQuiz} disabled={!allAnswered} loading={submitting}>
          Submit quiz
        </Button>
        <Button variant="ghost" onClick={() => { setState('idle'); setAnswers({}); }}>
          Cancel
        </Button>
      </div>

      {!allAnswered && (
        <p className="text-xs text-gray-400">Please answer all questions before submitting.</p>
      )}
    </div>
  );
}
