import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { ResourceDownloads } from '@/components/module/ResourceDownloads';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Library } from 'lucide-react';
import type { Resource } from '@/types';

const CATEGORY_LABELS: Record<string, string> = {
  beginner:  'Beginner Resources',
  templates: 'Templates',
  career:    'Career Resources',
  ai:        'AI Resources',
  general:   'General',
};

export default async function ResourceLibraryPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const db = createAdminClient();
  const { data: enrolment } = await db.from('enrolments').select('course_id').eq('user_id', user.id).eq('status', 'active').single();

  if (!enrolment) {
    return <div className="p-8 text-center mt-20"><p className="text-gray-500">No active enrolment found.</p></div>;
  }

  const { data: resources } = await db.from('resources').select('*').eq('course_id', enrolment.course_id).eq('visible_to_students', true).order('sort_order');

  const grouped: Record<string, Resource[]> = {};
  for (const r of (resources ?? []) as Resource[]) {
    const cat = r.category ?? 'general';
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(r);
  }
  const categories = Object.keys(grouped);

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <Library className="w-6 h-6 text-brand-600" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Resource Library</h1>
          <p className="text-gray-500 text-sm mt-0.5">All your course downloads in one place</p>
        </div>
      </div>
      {categories.length === 0 ? (
        <Card className="text-center py-12">
          <Library className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">Resources will appear here as they become available.</p>
        </Card>
      ) : (
        <div className="space-y-6">
          {categories.map(cat => (
            <Card key={cat}>
              <CardHeader><CardTitle>{CATEGORY_LABELS[cat] ?? cat}</CardTitle></CardHeader>
              <ResourceDownloads resources={grouped[cat]} />
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
