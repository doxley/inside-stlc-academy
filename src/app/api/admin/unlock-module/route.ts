import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(req: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });

  const db = createAdminClient();
  const { data: profile } = await db.from('profiles').select('role').eq('id', user.id).single();
  if (profile?.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { studentId, moduleId, note } = await req.json();
  if (!studentId || !moduleId) return NextResponse.json({ error: 'studentId and moduleId required' }, { status: 400 });

  const { error } = await db.from('module_unlocks').upsert({
    user_id: studentId,
    module_id: moduleId,
    unlocked_by: user.id,
    note: note ?? null,
  }, { onConflict: 'user_id,module_id' });

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ success: true });
}
