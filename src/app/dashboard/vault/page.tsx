import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { ResourceVault } from '@/components/dashboard/ResourceVault';
import { loadVaultItems } from '@/lib/resourceVault.server';
import { Library } from 'lucide-react';

export const metadata = { title: 'Resource Vault — Inside STLC Academy' };

export default async function ResourceVaultPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const db = createAdminClient();

  // Admins see every resource; students see resources for their active enrolments.
  const { data: profile } = await db.from('profiles').select('role').eq('id', user.id).single();
  const isAdmin = profile?.role === 'admin';

  const allItems = await loadVaultItems();

  let items = allItems;
  if (!isAdmin) {
    const { data: enrolments } = await db
      .from('enrolments')
      .select('course_id')
      .eq('user_id', user.id)
      .eq('status', 'active');

    const courseIds = (enrolments ?? []).map((e) => e.course_id);
    if (courseIds.length === 0) {
      items = [];
    } else {
      const { data: courses } = await db.from('courses').select('slug').in('id', courseIds);
      const allowedSlugs = new Set((courses ?? []).map((c) => c.slug));
      items = allItems.filter((it) => allowedSlugs.has(it.courseSlug));
    }
  }

  // Distinct courses present in the visible items, for the course filter.
  const courseMap = new Map<string, string>();
  for (const it of items) courseMap.set(it.courseSlug, it.courseTitle);
  const courses = [...courseMap.entries()].map(([slug, title]) => ({ slug, title }));

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <Library className="w-6 h-6 text-brand-600" />
        <h1 className="text-2xl font-bold text-navy-900">Resource Vault</h1>
      </div>
      <p className="text-gray-500 text-sm mb-8">
        Every template, checklist, prompt pack and cheat sheet from your courses — searchable, in editable DOCX and branded PDF.
      </p>

      {items.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
          <Library className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">Enrol on a course to unlock its resources here.</p>
        </div>
      ) : (
        <ResourceVault items={items} courses={courses} />
      )}
    </div>
  );
}
