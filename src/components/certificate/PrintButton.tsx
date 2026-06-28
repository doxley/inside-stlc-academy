'use client';

import { Printer } from 'lucide-react';

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="print:hidden inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
    >
      <Printer className="w-4 h-4" />
      Print / Save as PDF
    </button>
  );
}
