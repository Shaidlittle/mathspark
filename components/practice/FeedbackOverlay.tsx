'use client';

import { Button } from '@/components/ui/Button';

const CORRECT_MESSAGES = [
  'Brilliant! 🌟',
  'You nailed it! ⚡',
  'Perfect! 🎉',
  'Exactly right! 💎',
  'That\'s the one! ✨',
  'Great work, Luna! 🦸',
  'Spot on! 🎯',
];

const WRONG_MESSAGES = [
  'Not quite — let\'s look at why.',
  'Almost! Here\'s what happened.',
  'Good try. Let\'s work through it.',
  'Don\'t worry — mistakes help us learn!',
];

interface FeedbackOverlayProps {
  correct: boolean;
  correctAnswer: string;
  explanation: string;
  onNext: () => void;
  onRetry?: () => void;
}

export function FeedbackOverlay({ correct, correctAnswer, explanation, onNext, onRetry }: FeedbackOverlayProps) {
  const message = correct
    ? CORRECT_MESSAGES[Math.floor(Math.random() * CORRECT_MESSAGES.length)]
    : WRONG_MESSAGES[Math.floor(Math.random() * WRONG_MESSAGES.length)];

  return (
    <div className={`rounded-3xl p-6 border-2 animate-slide-up ${
      correct
        ? 'bg-green-50 border-green-300'
        : 'bg-rose-50 border-rose-300'
    }`}>
      <div className="flex items-start gap-4">
        <span className="text-4xl flex-shrink-0">
          {correct ? '🎉' : '💡'}
        </span>
        <div className="flex-1 space-y-3">
          <p className={`text-xl font-bold ${correct ? 'text-green-800' : 'text-rose-800'}`}>
            {message}
          </p>

          {!correct && (
            <div className="bg-white rounded-2xl p-3 border border-rose-200">
              <p className="text-sm text-gray-500 mb-1">Correct answer:</p>
              <p className="text-lg font-bold text-gray-800 math">{correctAnswer}</p>
            </div>
          )}

          <div className="bg-white/70 rounded-2xl p-3">
            <p className="text-sm font-semibold text-gray-500 mb-1">Why?</p>
            <p className="text-sm text-gray-700 leading-relaxed">{explanation}</p>
          </div>

          <div className="flex gap-3 pt-1">
            {!correct && onRetry && (
              <Button variant="outline" size="sm" onClick={onRetry}>
                Try again
              </Button>
            )}
            <Button
              variant={correct ? 'success' : 'primary'}
              size="md"
              fullWidth
              onClick={onNext}
            >
              {correct ? 'Keep going! →' : 'Next question →'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
