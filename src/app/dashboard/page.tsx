import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { ensureCertificate } from '@/lib/certificates';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Badge } from '@/components/ui/Badge';
import { BookOpen, ChevronRight, Award, Mail, Plus } from 'lucide-react';
import type { Module, ModuleProgress, Certificate, Course, Enrolment } from '@/types';

interface CourseSummary {
  course: Course;
  totalModules: number;
  completedModules: number;
  progressPercent: number;
  currentModule: Module | null;
  certificate: Certificate | null;
}

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const db = createAdminClient();

  const [{ data: profile }, { data: enrolments }, { data: publishedCourses }] = await Promise.all([
    db.from('profiles').select('*').eq('id', user.id).single(),
    db
      .from('enrolments')
      .select('*, courses(*)')
      .eq('user_id', user.id)
      .eq('status', 'active'),
    db.from('courses').select('*').eq('status', 'published').order('title'),
  ]);

  const activeEnrolments = (enrolments ?? []) as (Enrolment & { courses: Course })[];
  const courseIds = activeEnrolments.map((e) => e.courses?.id).filter(Boolean) as string[];

  // Courses the student is not yet enrolled in — surfaced so they can enrol further.
  const enrolledIds = new Set(courseIds);
  const availableCourses = ((publishedCourses ?? []) as Course[]).filter((c) => !enrolledIds.has(c.id));

  // Fetch modules and progress for all enrolled courses in one pass.
  const [{ data: modules }, { data: allProgress }] = await Promise.all([
    courseIds.length
      ? db.from('modules').select('*').in('course_id', courseIds).order('module_number')
      : Promise.resolve({ data: [] as Module[] }),
    db.from('module_progress').select('*').eq('user_id', user.id),
  ]);

  const progressByModule = new Map<string, ModuleProgress>(
    (allProgress ?? []).map((p: ModuleProgress) => [p.module_id, p])
  );

  // Build summaries and auto-issue a certificate once a course is fully complete.
  const summaries: CourseSummary[] = await Promise.all(
    activeEnrolments.map(async (enrolment) => {
      const course = enrolment.courses;
      const courseModules = (modules ?? []).filter((m: Module) => m.course_id === course.id);
      const completed = courseModules.filter(
        (m) => progressByModule.get(m.id)?.status === 'completed'
      ).length;
      const total = courseModules.length;
      const current =
        courseModules.find((m) => progressByModule.get(m.id)?.status !== 'completed') ?? null;
      const eligible = total > 0 && completed === total;
      const certificate = await ensureCertificate(user.id, course.id, eligible);
      return {
        course,
        totalModules: total,
        completedModules: completed,
        progressPercent: total > 0 ? Math.round((completed / total) * 100) : 0,
        currentModule: current,
        certificate,
      };
    })
  );

  const firstName = profile?.first_name ?? 'Student';

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto">
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {firstName} 👋</h1>
          <p className="text-gray-500 mt-1">
            {summaries.length > 0 ? 'Your purchased courses' : 'Browse our courses to get started'}
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 bg-white border border-gray-200 rounded-lg px-3 py-2">
          <Mail className="w-4 h-4" />
          {profile?.email ?? user.email}
        </div>
      </div>

      {summaries.length > 0 && (
        <div className="grid sm:grid-cols-2 gap-6">
          {summaries.map(({ course, totalModules, completedModules, progressPercent, currentModule, certificate }) => (
            <Card key={course.id} className="flex flex-col">
              <div className="flex items-start justify-between gap-3 mb-3">
                <h2 className="text-lg font-semibold text-gray-900">{course.title}</h2>
                {certificate?.status === 'issued' ? (
                  <Badge variant="green">Certified</Badge>
                ) : (
                  <Badge variant="gray">In progress</Badge>
                )}
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-1">
                <span>Progress</span>
                <span className="font-medium text-gray-900">{progressPercent}%</span>
              </div>
              <ProgressBar value={progressPercent} showPercent={false} />
              <p className="text-xs text-gray-400 mt-2">
                {completedModules} / {totalModules} modules completed
              </p>

              {certificate?.status === 'issued' ? (
                <Link
                  href={`/certificate/${certificate.certificate_code}`}
                  className="flex items-center gap-2 text-xs font-medium text-brand-600 hover:text-brand-700 mt-3"
                >
                  <Award className="w-4 h-4" />
                  View certificate →
                </Link>
              ) : (
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-3">
                  <Award className="w-4 h-4 text-brand-600" />
                  Certificate on completion
                </div>
              )}

              <div className="mt-auto pt-4">
                <Link
                  href={
                    currentModule
                      ? `/dashboard/course/${course.id}/module/${currentModule.id}`
                      : `/dashboard/course/${course.id}`
                  }
                  className="inline-flex items-center justify-center gap-1 w-full bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
                >
                  {progressPercent === 0 ? 'Start Learning' : 'Continue Learning'}
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}

      {availableCourses.length > 0 && (
        <div className={summaries.length > 0 ? 'mt-12' : ''}>
          <div className="flex items-center gap-2 mb-1">
            <Plus className="w-5 h-5 text-gold-600" />
            <h2 className="text-lg font-bold text-gray-900">Expand your learning</h2>
          </div>
          <p className="text-sm text-gray-500 mb-5">
            {summaries.length > 0
              ? 'More Inside STLC Academy courses you can enrol on.'
              : 'Choose a course to enrol and start learning.'}
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            {availableCourses.map((course) => (
              <Card key={course.id} className="flex flex-col">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
                  <Badge variant="gold">Available</Badge>
                </div>
                {course.description && (
                  <p className="text-sm text-gray-500 line-clamp-3">{course.description}</p>
                )}
                <div className="mt-auto pt-4">
                  <Link
                    href={`/course/${course.slug}`}
                    className="inline-flex items-center justify-center gap-1 w-full border border-brand-600 text-brand-700 hover:bg-brand-50 text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
                  >
                    View course &amp; enrol
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {summaries.length === 0 && availableCourses.length === 0 && (
        <div className="max-w-2xl mx-auto text-center mt-16">
          <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">No courses yet</h2>
          <p className="text-gray-500">Courses will appear here once they are available.</p>
        </div>
      )}
    </div>
  );
}
