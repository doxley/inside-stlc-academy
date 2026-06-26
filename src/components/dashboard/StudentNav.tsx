'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, FileText, Library, LifeBuoy, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { cn } from '@/lib/utils';

const nav = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/resources', label: 'Resource Library', icon: Library },
  { href: '/dashboard/assignments', label: 'Assignments', icon: FileText },
];

interface Props { firstName: string | null; }

export function StudentNav({ firstName }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
  }

  return (
    <>
      {/* Sidebar – desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-navy-900 text-white min-h-screen fixed left-0 top-0">
        <div className="p-5 border-b border-white/10">
          <Link href="/dashboard">
            <Image src="/logo.png" alt="Inside STLC Academy" width={160} height={48} className="h-10 w-auto" priority />
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {nav.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                pathname === href || (href !== '/dashboard' && pathname.startsWith(href))
                  ? 'bg-brand-600 text-white'
                  : 'text-gray-300 hover:bg-white/10 hover:text-white'
              )}>
              <Icon className="w-4 h-4" />{label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="text-xs text-gray-500 mb-3">Signed in as {firstName ?? 'Student'}</div>
          <a href="mailto:info@insidestlc.com" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-3">
            <LifeBuoy className="w-4 h-4" />Need help?
          </a>
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
            <LogOut className="w-4 h-4" />Log out
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="lg:hidden bg-navy-900 text-white sticky top-0 z-40 border-b border-white/10">
        <div className="flex items-center justify-between px-4 h-14">
          <Link href="/dashboard">
            <Image src="/logo.png" alt="Inside STLC Academy" width={120} height={36} className="h-8 w-auto" />
          </Link>
          <button onClick={() => setMenuOpen(!menuOpen)} className="p-1">
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        {menuOpen && (
          <div className="bg-navy-900 border-t border-white/10 p-4 space-y-1">
            {nav.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href} onClick={() => setMenuOpen(false)}
                className={cn('flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium', pathname === href ? 'bg-brand-600 text-white' : 'text-gray-300')}>
                <Icon className="w-4 h-4" />{label}
              </Link>
            ))}
            <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-gray-400 px-3 py-2">
              <LogOut className="w-4 h-4" />Log out
            </button>
          </div>
        )}
      </header>
    </>
  );
}
