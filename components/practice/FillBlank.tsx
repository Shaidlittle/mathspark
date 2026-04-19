'use client';

import { KeyboardEvent } from 'react';
import { clsx } from 'clsx';

interface FillBlankProps {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  submitted: boolean;
  correct?: boolean;
}

export function FillBlank({ value, onChange, onSubmit, submitted, correct }: FillBlankProps) {
  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && value.trim() && !submitted) onSubmit();
  };

  return (
    <div className="space-y-3">
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={handleKey}
        disabled={submitted}
        placeholder="Type your answer here…"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        className={clsx(
          'w-full px-5 py-4 text-xl font-semibold rounded-2xl border-2 transition-all duration-150',
          'placeholder:text-gray-300 placeholder:font-normal',
          'focus:outline-none focus:ring-4',
          !submitted && 'border-gray-200 focus:border-brand-400 focus:ring-brand-100 bg-white',
          submitted && correct  && 'border-green-400 bg-green-50 text-green-900 focus:ring-green-100',
          submitted && !correct && 'border-rose-400 bg-rose-50 text-rose-900 focus:ring-rose-100',
        )}
      />
      {!submitted && (
        <p className="text-xs text-gray-400 pl-1">Press Enter or tap the Check button to submit</p>
      )}
    </div>
  );
}
