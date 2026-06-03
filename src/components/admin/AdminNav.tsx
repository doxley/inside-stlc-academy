'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Users, BookOpen, FileText, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { cn } from '@/lib/utils';

const nav = [
  { href: '/admin', label: 'Overview', icon: LayoutDashboard, exact: true },
  { href: '/admin/students', label: 'Students', icon: Users },
  { href: '/admin/courses', label: 'Courses', icon: BookOpen },
  { href: '/admin/assignments', label: 'Assignments', icon: FileText },
];

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
  }

  function isActive(href: string, exact?: boolean) {
    return exact ? pathname === href : pathname.startsWith(href);
  }

  return (
    <>
      <aside className="hidden lg:flex flex-col w-64 bg-navy-900 text-white min-h-screen fixed left-0 top-0">
        <div className="p-5 border-b border-white/10">
          <Link href="/admin">
            <Image src="/logo.png" alt="Inside STLC Academy" width={160} height={48} className="h-10 w-auto" priority />
          </Link>
          <p className="text-xs text-gray-400 mt-2 pl-0.5">Admin Panel</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {nav.map(({ href, label, icon: Icon, exact }) => (
            <Link key={href} href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                isActive(href, exact) ? 'bg-brand-600 text-white' : 'text-gray-300 hover:bg-white/10 hover:text-white'
              )}>
              <Icon className="w-4 h-4" />{label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors px-3 py-1.5">
            <LogOut className="w-4 h-4" />Log out
          </button>
        </div>
      </aside>

      <header className="lg:hidden bg-navy-900 text-white sticky top-0 z-40 border-b border-white/10">
        <div className="flex items-center justify-between px-4 h-14">
          <Image src="/logo.png" alt="Inside STLC Academy" width={120} height={36} className="h-8 w-auto" />
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        {menuOpen && (
          <div className="bg-navy-900 border-t border-white/10 p-4 space-y-1">
            {nav.map(({ href, label, icon: Icon, exact }) => (
              <Link key={href} href={href} onClick={() => setMenuOpen(false)}
                className={cn('flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium', isActive(href, exact) ? 'bg-brand-600 text-white' : 'text-gray-300')}>
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
