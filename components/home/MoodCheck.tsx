'use client';

import { Mood } from '@/types';
import { Button } from '@/components/ui/Button';

const MOODS: { value: Mood; emoji: string; label: string; sub: string }[] = [
  { value: 'ready',     emoji: '🚀', label: 'Ready to go!',   sub: 'Full challenge mode' },
  { value: 'tired',     emoji: '😴', label: 'A bit tired',    sub: 'Easier questions today' },
  { value: 'easy-mode', emoji: '🌱', label: 'Easy mode',      sub: 'Nice and gentle pace' },
];

interface MoodCheckProps {
  onSelect: (mood: Mood) => void;
  todaysMood: Mood | null;
}

export function MoodCheck({ onSelect, todaysMood }: MoodCheckProps) {
  if (todaysMood) return null;

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-4">
      <div>
        <h2 className="text-lg font-bold text-gray-900">Hey Luna! How are you feeling today? 👋</h2>
        <p className="text-sm text-gray-500 mt-0.5">This helps MathSpark pick the right questions for you.</p>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {MOODS.map(m => (
          <button
            key={m.value}
            onClick={() => onSelect(m.value)}
            className="flex flex-col items-center text-center p-4 rounded-2xl border-2 border-gray-100 hover:border-brand-300 hover:bg-brand-50 transition-all group"
          >
            <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">{m.emoji}</span>
            <span className="text-xs font-bold text-gray-800">{m.label}</span>
            <span className="text-xs text-gray-400 mt-0.5">{m.sub}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
