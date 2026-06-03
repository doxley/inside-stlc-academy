import { createAdminClient } from '@/lib/supabase/admin';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Users, BookOpen, FileText } from 'lucide-react';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import type { Profile, AssignmentSubmission, Assignment } from '@/types';

export default async function AdminOverviewPage() {
  const db = createAdminClient();

  const [
    { count: totalStudents },
    { count: totalEnrolments },
    { data: recentEnrolments },
    { data: pendingSubmissions },
    { count: totalSubmissions },
  ] = await Promise.all([
    db.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'student'),
    db.from('enrolments').select('*', { count: 'exact', head: true }).eq('status', 'active'),
    db.from('enrolments')
      .select('*, profiles(first_name, last_name, email), courses(title)')
      .order('enrolled_at', { ascending: false })
      .limit(5),
    db.from('assignment_submissions')
      .select('*, assignments(title), profiles(first_name, last_name)')
      .eq('status', 'submitted')
      .order('submitted_at', { ascending: false })
      .limit(10),
    db.from('assignment_submissions').select('*', { count: 'exact', head: true }).eq('status', 'submitted'),
  ]);

  const stats = [
    { label: 'Total students', value: totalStudents ?? 0, icon: Users, href: '/admin/students', colour: 'bg-blue-50 text-blue-600' },
    { label: 'Active enrolments', value: totalEnrolments ?? 0, icon: BookOpen, href: '/admin/courses', colour: 'bg-purple-50 text-purple-600' },
    { label: 'Pending reviews', value: totalSubmissions ?? 0, icon: FileText, href: '/admin/assignments', colour: 'bg-yellow-50 text-yellow-600' },
  ];

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Admin Overview</h1>
        <p className="text-gray-500 mt-1">Inside STLC Academy dashboard</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, href, colour }) => (
          <Link key={label} href={href}>
            <Card className="hover:border-brand-200 hover:shadow-md transition-all cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
                </div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colour}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Enrolments</CardTitle>
              <Link href="/admin/students" className="text-xs text-brand-600 hover:underline">View all</Link>
            </div>
          </CardHeader>
          {(recentEnrolments ?? []).length === 0 ? (
            <p className="text-sm text-gray-400">No enrolments yet.</p>
          ) : (
            <div className="space-y-3">
              {(recentEnrolments ?? []).map((e: {
                id: string; enrolled_at: string;
                profiles: { first_name: string | null; last_name: string | null; email: string };
                courses: { title: string };
              }) => (
                <div key={e.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{e.profiles?.first_name} {e.profiles?.last_name}</p>
                    <p className="text-xs text-gray-500">{e.profiles?.email}</p>
                  </div>
                  <p className="text-xs text-gray-400">{formatDate(e.enrolled_at)}</p>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Awaiting Review</CardTitle>
              <Link href="/admin/assignments" className="text-xs text-brand-600 hover:underline">View all</Link>
            </div>
          </CardHeader>
          {(pendingSubmissions ?? []).length === 0 ? (
            <p className="text-sm text-gray-400">No pending submissions.</p>
          ) : (
            <div className="space-y-3">
              {(pendingSubmissions as (AssignmentSubmission & { assignments: Assignment; profiles: Profile })[]).map(sub => (
                <div key={sub.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{sub.assignments?.title}</p>
                    <p className="text-xs text-gray-500">{sub.profiles?.first_name} {sub.profiles?.last_name}</p>
                  </div>
                  <Link href={`/admin/assignments?submission=${sub.id}`} className="text-xs text-brand-600 hover:underline">Review →</Link>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
