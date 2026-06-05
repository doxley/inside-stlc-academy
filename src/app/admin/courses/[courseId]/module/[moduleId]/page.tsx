import { notFound } from 'next/navigation';
import Link from 'next/link';
import { createAdminClient } from '@/lib/supabase/admin';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ArrowLeft } from 'lucide-react';
import { QuizEditor } from '@/components/admin/QuizEditor';
import { AssignmentEditor } from '@/components/admin/AssignmentEditor';
import { ModuleEditor } from '@/components/admin/ModuleEditor';
import { ResourceUploader } from '@/components/admin/ResourceUploader';
import type { Module, Quiz, QuizQuestion, QuizAnswer, Assignment, Resource } from '@/types';

export default async function AdminModuleDetailPage({
  params,
}: {
  params: Promise<{ courseId: string; moduleId: string }>;
}) {
  const { courseId, moduleId } = await params;
  const db = createAdminClient();

  const [{ data: module }, { data: quiz }, { data: assignment }, { data: resources }] =
    await Promise.all([
      db.from('modules').select('*').eq('id', moduleId).single(),
      db.from('quizzes').select('*, quiz_questions(*, quiz_answers(*))').eq('module_id', moduleId).single(),
      db.from('assignments').select('*').eq('module_id', moduleId).single(),
      db.from('resources').select('*').eq('module_id', moduleId).order('sort_order'),
    ]);

  if (!module) notFound();

  const mod = module as Module;
  const mods = [mod]; // for ResourceUploader

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto">
      <Link href={`/admin/courses/${courseId}`} className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1 mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to course
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between mb-8 gap-4 flex-wrap">
        <div>
          <p className="text-sm text-brand-600 font-medium mb-1">Module {mod.module_number}</p>
          <h1 className="text-2xl font-bold text-gray-900">{mod.title}</h1>
          {mod.description && <p className="text-gray-500 text-sm mt-1 max-w-xl">{mod.description}</p>}
          <div className="flex items-center gap-2 mt-2">
            <Badge variant={mod.status === 'published' ? 'green' : mod.status === 'coming_soon' ? 'yellow' : 'gray'}>
              {mod.status === 'published' ? 'Published' : mod.status === 'coming_soon' ? 'Coming Soon' : 'Draft'}
            </Badge>
            {mod.unlock_day !== null && (
              <span className="text-xs text-gray-400">Unlocks day {mod.unlock_day}</span>
            )}
          </div>
        </div>
        <ModuleEditor module={mod} courseId={courseId} />
      </div>

      <div className="space-y-6">
        {/* Resources */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Resources & Downloads</CardTitle>
              <ResourceUploader courseId={courseId} modules={mods} defaultModuleId={moduleId} />
            </div>
          </CardHeader>
          {(resources ?? []).length === 0 ? (
            <p className="text-sm text-gray-400">No resources uploaded yet.</p>
          ) : (
            <div className="space-y-2">
              {(resources as Resource[]).map(r => (
                <div key={r.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{r.title}</p>
                    <p className="text-xs text-gray-400">{r.category} · {r.file_type}</p>
                  </div>
                  <Badge variant={r.visible_to_students ? 'green' : 'gray'}>
                    {r.visible_to_students ? 'Visible' : 'Hidden'}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Quiz */}
        <QuizEditor quiz={quiz as (Quiz & { quiz_questions: (QuizQuestion & { quiz_answers: QuizAnswer[] })[] }) | null} moduleId={moduleId} />

        {/* Assignment */}
        <AssignmentEditor assignment={assignment as Assignment | null} moduleId={moduleId} />
      </div>
    </div>
  );
}
