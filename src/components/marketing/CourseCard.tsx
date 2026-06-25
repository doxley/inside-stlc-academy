import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export interface CourseCardProps {
  title: string;
  badge?: string;
  description: string;
  price?: string;
  stats?: string[];
  href: string;
  cta?: string;
}

export function CourseCard({ title, badge, description, price, stats, href, cta = 'View Course' }: CourseCardProps) {
  return (
    <div className="flex flex-col h-full bg-white/5 border border-white/10 rounded-2xl p-6 transition-colors hover:border-brand-400/40">
      <div className="flex items-start justify-between gap-3 mb-4">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        {badge && (
          <span className="flex-shrink-0 bg-gold-500/15 border border-gold-500/30 text-gold-400 text-xs font-semibold px-3 py-1 rounded-full">
            {badge}
          </span>
        )}
      </div>
      <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">{description}</p>

      {stats && stats.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {stats.map((stat) => (
            <span
              key={stat}
              className="bg-brand-500/10 border border-brand-400/20 text-brand-300 text-xs font-medium px-3 py-1 rounded-full"
            >
              {stat}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between gap-4 pt-4 border-t border-white/10">
        {price ? (
          <span className="text-2xl font-bold text-gold-500">{price}</span>
        ) : (
          <span aria-hidden className="sr-only" />
        )}
        <Link
          href={href}
          className={`inline-flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors ${price ? '' : 'w-full'}`}
        >
          {cta}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
