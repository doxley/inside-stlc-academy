import { createAdminClient } from '@/lib/supabase/admin';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import Link from 'next/link';
import { BookOpen, ChevronRight } from 'lucide-react';
import type { Course } from '@/types';

export default async function AdminCoursesPage() {
  const db = createAdminClient();
  const { data: courses } = await db.from('courses').select('*').order('created_at');

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <BookOpen className="w-6 h-6 text-brand-600" />
        <h1 className="text-2xl font-bold text-gray-900">Courses</h1>
      </div>

      <div className="space-y-3">
        {(courses ?? []).map((course: Course) => (
          <Link key={course.id} href={`/admin/courses/${course.id}`}>
            <Card className="hover:border-brand-200 hover:shadow-sm transition-all cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900">{course.title}</p>
                  {course.description && <p className="text-sm text-gray-500 mt-1 line-clamp-1">{course.description}</p>}
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={course.status === 'published' ? 'green' : 'gray'}>
                    {course.status === 'published' ? 'Published' : 'Draft'}
                  </Badge>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
