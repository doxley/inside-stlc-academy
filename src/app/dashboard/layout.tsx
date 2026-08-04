import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { createClient as createServiceClient } from '@supabase/supabase-js';
import { StudentNav } from '@/components/dashboard/StudentNav';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  // Use service role to bypass RLS for the profile lookup
  const admin = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: profile } = await admin
    .from('profiles')
    .select('role, first_name, last_seen_at')
    .eq('id', user.id)
    .single();

  if (profile?.role === 'admin') redirect('/admin');

  // Record "last active" for admin monitoring. Throttled to at most once per
  // 15 minutes so ordinary page navigation doesn't write on every request.
  const THROTTLE_MS = 15 * 60 * 1000;
  const lastSeen = profile?.last_seen_at ? new Date(profile.last_seen_at).getTime() : 0;
  if (Date.now() - lastSeen > THROTTLE_MS) {
    await admin.from('profiles').update({ last_seen_at: new Date().toISOString() }).eq('id', user.id);
  }

  return (
    <div className="flex min-h-screen">
      <StudentNav firstName={profile?.first_name ?? null} />
      <main className="flex-1 lg:ml-64 bg-gray-50 min-h-screen">
        {children}
      </main>
    </div>
  );
}
