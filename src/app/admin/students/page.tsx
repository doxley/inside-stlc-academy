import { createAdminClient } from '@/lib/supabase/admin';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import { Users } from 'lucide-react';
import { CreateStudentForm } from '@/components/admin/CreateStudentForm';
import type { Profile } from '@/types';

export default async function AdminStudentsPage() {
  const db = createAdminClient();

  const { data: students } = await db
    .from('profiles')
    .select('*, enrolments(course_id, status, enrolled_at, courses(title))')
    .eq('role', 'student')
    .order('created_at', { ascending: false });

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Users className="w-6 h-6 text-brand-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Students</h1>
            <p className="text-gray-500 text-sm">{(students ?? []).length} total</p>
          </div>
        </div>
        <CreateStudentForm />
      </div>

      <Card padding={false}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Student</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Course</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Enrolled</th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {(students ?? []).length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-400">No students yet. Create one above.</td>
                </tr>
              ) : (
                (students as (Profile & { enrolments: { course_id: string; status: string; enrolled_at: string; courses: { title: string } }[] })[]).map(student => {
                  const activeEnrolment = student.enrolments?.find(e => e.status === 'active');
                  return (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-900">{student.first_name} {student.last_name}</p>
                        <p className="text-xs text-gray-500">{student.email}</p>
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {activeEnrolment?.courses?.title ?? <span className="text-gray-400 italic">Not enrolled</span>}
                      </td>
                      <td className="px-6 py-4">
                        {activeEnrolment ? <Badge variant="green">Active</Badge> : <Badge variant="gray">No enrolment</Badge>}
                      </td>
                      <td className="px-6 py-4 text-gray-500 text-xs">
                        {activeEnrolment ? formatDate(activeEnrolment.enrolled_at) : '—'}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link href={`/admin/students/${student.id}`} className="text-xs text-brand-600 hover:underline font-medium">View →</Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
