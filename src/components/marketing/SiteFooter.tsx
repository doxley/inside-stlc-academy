import Link from 'next/link';
import Image from 'next/image';

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-navy-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
        <Image src="/logo.png" alt="Inside STLC Academy" width={120} height={36} className="h-8 w-auto opacity-70" />
        <div className="flex items-center gap-6">
          <a href="mailto:info@insidestlc.com" className="hover:text-white transition-colors">info@insidestlc.com</a>
          <Link href="/login" className="hover:text-white transition-colors">Log in</Link>
        </div>
      </div>
    </footer>
  );
}
