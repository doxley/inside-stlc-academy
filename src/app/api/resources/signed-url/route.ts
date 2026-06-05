import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

/**
 * Returns a short-lived signed URL for a resource.
 * Only serves to authenticated, enrolled students.
 * Never exposes the raw storage path.
 */
export async function POST(req: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });

  const { resourceId } = await req.json();
  if (!resourceId) return NextResponse.json({ error: 'resourceId required' }, { status: 400 });

  const db = createAdminClient();

  // Fetch resource and verify enrolment in one go
  const { data: resource } = await db
    .from('resources')
    .select('id, file_url, course_id, visible_to_students')
    .eq('id', resourceId)
    .eq('visible_to_students', true)
    .single();

  if (!resource) return NextResponse.json({ error: 'Resource not found' }, { status: 404 });

  // Verify the student is enrolled in the course this resource belongs to
  const { data: enrolment } = await db
    .from('enrolments')
    .select('id')
    .eq('user_id', user.id)
    .eq('course_id', resource.course_id)
    .eq('status', 'active')
    .single();

  // Admins bypass enrolment check
  const { data: profile } = await db
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (!enrolment && profile?.role !== 'admin') {
    return NextResponse.json({ error: 'Not enrolled' }, { status: 403 });
  }

  // Generate a short-lived signed URL (5 minutes — enough to view, not to share)
  const { data: signedData, error } = await db.storage
    .from('course-resources')
    .createSignedUrl(resource.file_url, 300); // 5 minutes

  if (error || !signedData?.signedUrl) {
    return NextResponse.json({ error: 'Could not generate link' }, { status: 500 });
  }

  return NextResponse.json({ url: signedData.signedUrl });
}
