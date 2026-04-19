'use client';

import Link from 'next/link';
import { topics } from '@/data/topics';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { ProgressData } from '@/types';
import { clsx } from 'clsx';

interface MasteryMapProps {
  progress: ProgressData;
}

export function MasteryMap({ progress }: MasteryMapProps) {
  return (
    <div className="space-y-3">
      {topics.map((topic) => {
        const mastery = progress.masteryByTopic[topic.id] ?? 0;
        const lessonsCompleted = topic.lessonCards.filter(c => progress.completedLessons.includes(c.id)).length;
        const started = mastery > 0 || lessonsCompleted > 0;

        return (
          <Link
            key={topic.id}
            href={`/learn/${topic.id}`}
            className={clsx(
              'block p-4 rounded-2xl border-2 transition-all hover:shadow-md',
              topic.bgColor, topic.borderColor,
            )}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{topic.icon}</span>
              <div className="flex-1 min-w-0">
                <p className={clsx('font-bold text-sm', topic.textColor)}>{topic.shortTitle}</p>
                <p className="text-xs text-gray-500">
                  {lessonsCompleted}/{topic.lessonCards.length} lessons
                  {mastery > 0 && ` · ${mastery}% mastery`}
                </p>
              </div>
              {mastery >= 80 && <span className="text-xl">🌟</span>}
              {!started && <span className="text-xs text-gray-400 font-medium">Start →</span>}
            </div>
            <ProgressBar
              value={mastery}
              color={mastery >= 80 ? 'bg-green-500' : mastery >= 50 ? 'bg-brand-500' : 'bg-gray-300'}
              height="sm"
            />
          </Link>
        );
      })}
    </div>
  );
}
