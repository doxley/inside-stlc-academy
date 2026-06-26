export interface ComingSoonCardProps {
  title: string;
  description: string;
}

export function ComingSoonCard({ title, description }: ComingSoonCardProps) {
  const mailto = `mailto:info@insidestlc.com?subject=${encodeURIComponent(
    `Register interest: ${title}`
  )}`;

  return (
    <div className="flex flex-col h-full bg-white/5 border border-white/10 rounded-2xl p-6">
      <div className="mb-4">
        <span className="inline-flex bg-white/10 border border-white/15 text-gray-300 text-xs font-semibold px-3 py-1 rounded-full">
          Coming Soon
        </span>
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">{description}</p>
      <a
        href={mailto}
        className="inline-flex items-center justify-center w-full border border-brand-400/40 hover:border-brand-400 hover:bg-brand-500/10 text-brand-300 text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
      >
        Register Interest
      </a>
    </div>
  );
}
