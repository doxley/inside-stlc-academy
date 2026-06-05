import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { createAdminClient } from '@/lib/supabase/admin';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ArrowLeft } from 'lucide-react';
import { ModuleEditor } from '@/components/admin/ModuleEditor';
import { ResourceUploader } from '@/components/admin/ResourceUploader';
import type { Course, Module, Resource } from '@/types';

export default async function AdminCourseDetailPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  const db = createAdminClient();

  const [{ data: course }, { data: modules }, { data: resources }] = await Promise.all([
    db.from('courses').select('*').eq('id', courseId).single(),
    db.from('modules').select('*').eq('course_id', courseId).order('module_number'),
    db.from('resources').select('*').eq('course_id', courseId).order('sort_order'),
  ]);

  if (!course) notFound();

  const c = course as Course;
  const mods = (modules ?? []) as Module[];
  const res = (resources ?? []) as Resource[];

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto">
      <Link href="/admin/courses" className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1 mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to courses
      </Link>

      <div className="flex items-start justify-between mb-8 gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold text-gray-900">{c.title}</h1>
            <Badge variant={c.status === 'published' ? 'green' : 'gray'}>
              {c.status === 'published' ? 'Published' : 'Draft'}
            </Badge>
          </div>
          {c.description && <p className="text-gray-500 text-sm max-w-xl">{c.description}</p>}
        </div>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader><CardTitle>Modules ({mods.length})</CardTitle></CardHeader>
          <div className="space-y-2">
            {mods.map(mod => (
              <div key={mod.id} className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg">
                <span className="w-8 h-8 rounded-lg bg-brand-100 text-brand-700 flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {mod.module_number}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{mod.title}</p>
                  {mod.estimated_duration && <p className="text-xs text-gray-400">{mod.estimated_duration}</p>}
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={mod.status === 'published' ? 'green' : mod.status === 'coming_soon' ? 'yellow' : 'gray'}>
                    {mod.status === 'published' ? 'Published' : mod.status === 'coming_soon' ? 'Coming Soon' : 'Draft'}
                  </Badge>
                  <Link href={`/admin/courses/${courseId}/module/${mod.id}`} className="text-gray-400 hover:text-brand-600 transition-colors">
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                  <ModuleEditor module={mod} courseId={courseId} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Course Resources</CardTitle>
              <ResourceUploader courseId={courseId} modules={mods} />
            </div>
          </CardHeader>
          {res.length === 0 ? (
            <p className="text-sm text-gray-400">No resources uploaded yet.</p>
          ) : (
            <div className="space-y-2">
              {res.map(r => (
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
      </div>
    </div>
  );
}
