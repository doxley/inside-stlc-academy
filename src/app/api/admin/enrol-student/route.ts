import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createClient as createServiceClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });

  // Use service role to bypass RLS for role check and enrolment insert
  const adminClient = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: profile } = await adminClient
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const body = await req.json();
  const { studentId } = body;
  // Accept a single courseId or an array of courseIds (multi-course enrol).
  const courseIds: string[] = Array.isArray(body.courseIds)
    ? body.courseIds
    : body.courseId ? [body.courseId] : [];

  if (!studentId || courseIds.length === 0) {
    return NextResponse.json({ error: 'studentId and at least one course are required' }, { status: 400 });
  }

  const now = new Date().toISOString();
  const rows = courseIds.map((course_id) => ({
    user_id: studentId,
    course_id,
    status: 'active',
    enrolled_at: now,
  }));

  const { error } = await adminClient.from('enrolments').upsert(rows, { onConflict: 'user_id,course_id' });

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ success: true, enrolled: courseIds.length });
}
