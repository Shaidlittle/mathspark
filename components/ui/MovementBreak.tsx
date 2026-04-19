'use client';

import { useState } from 'react';
import { Button } from './Button';

const BREAKS = [
  { emoji: '🌊', activity: 'Stand up and stretch your arms wide — hold for 10 seconds.' },
  { emoji: '💃', activity: 'Do 10 jumping jacks or just wiggle around for 30 seconds!' },
  { emoji: '🧘', activity: 'Take 3 slow deep breaths. In for 4 counts, out for 6.' },
  { emoji: '🚶', activity: 'Walk around the room once, or shake out your hands.' },
  { emoji: '💪', activity: 'Roll your shoulders backwards 5 times. You\'ve got this!' },
];

interface MovementBreakProps {
  onDone: () => void;
}

export function MovementBreak({ onDone }: MovementBreakProps) {
  const b = BREAKS[Math.floor(Math.random() * BREAKS.length)];
  const [done, setDone] = useState(false);

  const handleDone = () => {
    setDone(true);
    setTimeout(onDone, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-600/95 backdrop-blur-sm p-6 animate-fade-in">
      <div className="max-w-sm w-full text-center text-white space-y-6">
        <div className="text-7xl mb-2">{b.emoji}</div>
        <h2 className="text-2xl font-bold">Break Time! 🎉</h2>
        <p className="text-lg text-violet-100 leading-relaxed">
          You've been working hard. Take a quick movement break:
        </p>
        <p className="text-xl font-semibold bg-white/20 rounded-2xl p-4">
          {b.activity}
        </p>

        {!done ? (
          <Button variant="success" size="lg" fullWidth onClick={handleDone}>
            I did it! Back to maths 💪
          </Button>
        ) : (
          <div className="text-2xl animate-bounce-sm">Amazing! Let's go! 🚀</div>
        )}

        <button
          onClick={onDone}
          className="text-violet-200 text-sm underline hover:text-white"
        >
          Skip break
        </button>
      </div>
    </div>
  );
}
