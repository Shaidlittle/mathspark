'use client';

import Link from 'next/link';
import { XPBadge } from '@/components/ui/Badge';

interface NavBarProps {
  xp?: number;
  streak?: number;
  focusMode?: boolean;
  onToggleFocus?: () => void;
}

export function NavBar({ xp = 0, streak = 0, focusMode, onToggleFocus }: NavBarProps) {
  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">⚡</span>
          <span className="font-bold text-lg text-brand-700 hidden sm:block">MathSpark</span>
        </Link>

        <div className="flex items-center gap-3">
          {streak > 0 && (
            <span className="flex items-center gap-1 text-sm font-semibold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full border border-orange-200">
              🔥 {streak}
            </span>
          )}
          <XPBadge xp={xp} />
          {onToggleFocus && (
            <button
              onClick={onToggleFocus}
              title={focusMode ? 'Exit focus mode' : 'Enter focus mode'}
              className="text-xl p-2 rounded-xl hover:bg-brand-50 transition-colors"
            >
              {focusMode ? '🔓' : '🎯'}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
