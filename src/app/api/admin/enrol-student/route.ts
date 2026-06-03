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

  const { studentId, courseId } = await req.json();

  if (!studentId || !courseId) {
    return NextResponse.json({ error: 'studentId and courseId are required' }, { status: 400 });
  }

  const { error } = await adminClient.from('enrolments').upsert({
    user_id: studentId,
    course_id: courseId,
    status: 'active',
    enrolled_at: new Date().toISOString(),
  }, { onConflict: 'user_id,course_id' });

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ success: true });
}
