'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { ClipboardList, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import type { Quiz, QuizQuestion, QuizAnswer } from '@/types';

interface Props {
  quiz: (Quiz & { quiz_questions: (QuizQuestion & { quiz_answers: QuizAnswer[] })[] }) | null;
  moduleId: string;
}

export function QuizEditor({ quiz, moduleId }: Props) {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');
  const [newType, setNewType] = useState<'multiple_choice' | 'true_false'>('multiple_choice');
  const [newAnswers, setNewAnswers] = useState(['', '', '', '']);
  const [correctIndex, setCorrectIndex] = useState(0);
  const [passMark, setPassMark] = useState(quiz?.pass_mark ?? 70);
  const [showAddQuestion, setShowAddQuestion] = useState(false);

  const questions = [...(quiz?.quiz_questions ?? [])].sort((a, b) => a.sort_order - b.sort_order);

  async function handleCreateQuiz() {
    setSaving(true);
    const supabase = createClient();
    await supabase.from('quizzes').insert({ module_id: moduleId, title: 'Module Quiz', pass_mark: passMark });
    router.refresh();
    setSaving(false);
  }

  async function handleUpdatePassMark() {
    if (!quiz) return;
    setSaving(true);
    const supabase = createClient();
    await supabase.from('quizzes').update({ pass_mark: passMark }).eq('id', quiz.id);
    router.refresh();
    setSaving(false);
  }

  async function handleAddQuestion() {
    if (!quiz || !newQuestion.trim()) return;
    setSaving(true);
    const supabase = createClient();

    const { data: q } = await supabase.from('quiz_questions').insert({
      quiz_id: quiz.id,
      question_text: newQuestion.trim(),
      question_type: newType,
      sort_order: questions.length + 1,
    }).select().single();

    if (q) {
      if (newType === 'true_false') {
        await supabase.from('quiz_answers').insert([
          { question_id: q.id, answer_text: 'True', is_correct: correctIndex === 0 },
          { question_id: q.id, answer_text: 'False', is_correct: correctIndex === 1 },
        ]);
      } else {
        const answers = newAnswers.filter(a => a.trim()).map((a, i) => ({
          question_id: q.id,
          answer_text: a.trim(),
          is_correct: i === correctIndex,
        }));
        if (answers.length > 0) await supabase.from('quiz_answers').insert(answers);
      }
    }

    setNewQuestion('');
    setNewAnswers(['', '', '', '']);
    setCorrectIndex(0);
    setShowAddQuestion(false);
    router.refresh();
    setSaving(false);
  }

  async function handleDeleteQuestion(questionId: string) {
    const supabase = createClient();
    await supabase.from('quiz_questions').delete().eq('id', questionId);
    router.refresh();
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-brand-600" />
            <CardTitle>Quiz</CardTitle>
            {quiz && <Badge variant="green">{questions.length} questions</Badge>}
          </div>
          <button onClick={() => setExpanded(!expanded)} className="text-gray-400 hover:text-gray-600">
            {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>
      </CardHeader>

      {!quiz ? (
        <div className="text-center py-6">
          <p className="text-sm text-gray-500 mb-3">No quiz created for this module yet.</p>
          <Button onClick={handleCreateQuiz} loading={saving} size="sm">Create quiz</Button>
        </div>
      ) : expanded ? (
        <div className="space-y-4">
          {/* Pass mark */}
          <div className="flex items-center gap-3">
            <div className="w-32">
              <Input
                label="Pass mark (%)"
                type="number"
                min={1}
                max={100}
                value={passMark}
                onChange={e => setPassMark(Number(e.target.value))}
              />
            </div>
            <Button size="sm" variant="secondary" onClick={handleUpdatePassMark} loading={saving} className="mt-6">
              Save
            </Button>
          </div>

          {/* Questions list */}
          <div className="space-y-3">
            {questions.map((q, idx) => (
              <div key={q.id} className="border border-gray-100 rounded-lg p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{idx + 1}. {q.question_text}</p>
                    <div className="mt-2 space-y-1">
                      {q.quiz_answers.map(a => (
                        <div key={a.id} className={`text-xs px-2 py-1 rounded ${a.is_correct ? 'bg-green-100 text-green-800 font-medium' : 'text-gray-500'}`}>
                          {a.is_correct ? '✓ ' : '○ '}{a.answer_text}
                        </div>
                      ))}
                    </div>
                  </div>
                  <button onClick={() => handleDeleteQuestion(q.id)} className="text-red-400 hover:text-red-600 flex-shrink-0">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add question */}
          {showAddQuestion ? (
            <div className="border border-brand-200 rounded-xl p-4 bg-brand-50 space-y-3">
              <p className="text-sm font-semibold text-gray-900">New question</p>
              <textarea
                value={newQuestion}
                onChange={e => setNewQuestion(e.target.value)}
                placeholder="Question text..."
                rows={2}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
              />
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Type</label>
                <select value={newType} onChange={e => setNewType(e.target.value as 'multiple_choice' | 'true_false')}
                  className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500">
                  <option value="multiple_choice">Multiple choice</option>
                  <option value="true_false">True / False</option>
                </select>
              </div>

              {newType === 'multiple_choice' ? (
                <div className="space-y-2">
                  <p className="text-xs font-medium text-gray-700">Answers (mark correct one)</p>
                  {newAnswers.map((a, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <input type="radio" name="correct" checked={correctIndex === i} onChange={() => setCorrectIndex(i)} className="text-brand-600" />
                      <input
                        type="text"
                        value={a}
                        onChange={e => { const n = [...newAnswers]; n[i] = e.target.value; setNewAnswers(n); }}
                        placeholder={`Answer ${i + 1}`}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-xs font-medium text-gray-700">Correct answer</p>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 text-sm">
                      <input type="radio" name="tf" checked={correctIndex === 0} onChange={() => setCorrectIndex(0)} /> True
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input type="radio" name="tf" checked={correctIndex === 1} onChange={() => setCorrectIndex(1)} /> False
                    </label>
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <Button size="sm" onClick={handleAddQuestion} loading={saving}>Add question</Button>
                <Button size="sm" variant="ghost" onClick={() => setShowAddQuestion(false)}>Cancel</Button>
              </div>
            </div>
          ) : (
            <Button size="sm" variant="secondary" onClick={() => setShowAddQuestion(true)}>
              <Plus className="w-4 h-4" /> Add question
            </Button>
          )}
        </div>
      ) : (
        <p className="text-sm text-gray-500">{questions.length} questions · Pass mark: {quiz.pass_mark}% · <button onClick={() => setExpanded(true)} className="text-brand-600 hover:underline">Edit</button></p>
      )}
    </Card>
  );
}
