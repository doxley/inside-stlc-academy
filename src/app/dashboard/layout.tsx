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
    .select('role, first_name')
    .eq('id', user.id)
    .single();

  if (profile?.role === 'admin') redirect('/admin');

  return (
    <div className="flex min-h-screen">
      <StudentNav firstName={profile?.first_name ?? null} />
      <main className="flex-1 lg:ml-64 bg-gray-50 min-h-screen">
        {children}
      </main>
    </div>
  );
}
