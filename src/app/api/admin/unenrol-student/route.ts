import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createClient as createServiceClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });

  // Use service role to bypass RLS for the role check and the enrolment change.
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
  const { studentId, courseId } = body;
  // Default is a soft remove (status = 'suspended') so there is an audit trail.
  // Pass hardDelete: true to remove the enrolment row entirely.
  const hardDelete = body.hardDelete === true;

  if (!studentId || !courseId) {
    return NextResponse.json({ error: 'studentId and courseId are required' }, { status: 400 });
  }

  if (hardDelete) {
    const { error } = await adminClient
      .from('enrolments')
      .delete()
      .eq('user_id', studentId)
      .eq('course_id', courseId);
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ success: true, removed: 'deleted' });
  }

  const { error } = await adminClient
    .from('enrolments')
    .update({ status: 'suspended' })
    .eq('user_id', studentId)
    .eq('course_id', courseId);

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ success: true, removed: 'suspended' });
}
