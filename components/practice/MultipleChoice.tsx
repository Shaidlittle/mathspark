'use client';

import { clsx } from 'clsx';

interface MultipleChoiceProps {
  choices: string[];
  selected: string | null;
  correct: string;
  submitted: boolean;
  onSelect: (choice: string) => void;
}

export function MultipleChoice({ choices, selected, correct, submitted, onSelect }: MultipleChoiceProps) {
  return (
    <div className="grid gap-3">
      {choices.map((choice) => {
        const isSelected  = selected === choice;
        const isCorrect   = choice === correct;
        const showResult  = submitted;

        let style = 'bg-white border-2 border-gray-200 hover:border-brand-300 hover:bg-brand-50 text-gray-800';
        if (showResult) {
          if (isCorrect)              style = 'bg-green-50 border-2 border-green-400 text-green-900 font-semibold';
          else if (isSelected)        style = 'bg-rose-50 border-2 border-rose-400 text-rose-900 animate-shake';
          else                        style = 'bg-white border-2 border-gray-100 text-gray-400 opacity-60';
        } else if (isSelected) {
          style = 'bg-brand-50 border-2 border-brand-400 text-brand-900 font-semibold shadow-md';
        }

        return (
          <button
            key={choice}
            onClick={() => !submitted && onSelect(choice)}
            disabled={submitted}
            className={clsx(
              'w-full text-left px-5 py-4 rounded-2xl transition-all duration-150',
              'text-base leading-snug min-h-[56px]',
              style,
            )}
          >
            <span className="flex items-center gap-3">
              <span className={clsx(
                'flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold',
                showResult && isCorrect && 'border-green-500 bg-green-500 text-white',
                showResult && isSelected && !isCorrect && 'border-rose-500 bg-rose-500 text-white',
                !showResult && isSelected && 'border-brand-500 bg-brand-500 text-white',
                !showResult && !isSelected && 'border-gray-300',
              )}>
                {showResult && isCorrect ? '✓' : showResult && isSelected && !isCorrect ? '✗' : ''}
              </span>
              <span className="math">{choice}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
