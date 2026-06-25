import Link from 'next/link';
import Image from 'next/image';

export function SiteNav() {
  return (
    <nav className="border-b border-white/10 bg-navy-900/95 sticky top-0 z-50 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image src="/logo.png" alt="Inside STLC Academy" width={160} height={48} className="h-10 w-auto" priority />
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm text-gray-300 hover:text-white transition-colors">Log in</Link>
          <Link
            href="/#courses"
            className="bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
