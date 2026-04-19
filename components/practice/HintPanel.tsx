'use client';

import { useState } from 'react';

interface HintPanelProps {
  hint: string;
}

export function HintPanel({ hint }: HintPanelProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-amber-200 overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-2 px-4 py-3 bg-amber-50 text-amber-800 text-sm font-semibold hover:bg-amber-100 transition-colors"
      >
        <span>💡</span>
        <span>{open ? 'Hide hint' : 'Show a hint'}</span>
        <span className="ml-auto text-amber-500">{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div className="px-4 py-3 bg-amber-50/50 text-sm text-amber-900 leading-relaxed animate-fade-in">
          {hint}
        </div>
      )}
    </div>
  );
}
