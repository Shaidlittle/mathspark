'use client';

import Link from 'next/link';
import { useProgress } from '@/hooks/useProgress';
import { NavBar } from '@/components/layout/NavBar';
import { BottomNav } from '@/components/layout/BottomNav';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { topics } from '@/data/topics';
import { clsx } from 'clsx';

export default function LearnPage() {
  const { progress } = useProgress();

  return (
    <div className="min-h-screen pb-24">
      <NavBar xp={progress.totalXP} streak={progress.streaks.current} />

      <main className="max-w-lg mx-auto px-4 pt-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Learn 📚</h1>
          <p className="text-gray-500 text-sm mt-1">Choose a topic to start learning.</p>
        </div>

        <div className="space-y-3">
          {topics.map((topic, i) => {
            const mastery = progress.masteryByTopic[topic.id] ?? 0;
            const lessonsCompleted = topic.lessonCards.filter(c =>
              progress.completedLessons.includes(c.id)
            ).length;
            const locked = i > 0 && (progress.masteryByTopic[topics[i - 1].id] ?? 0) < 30;

            return (
              <Link
                key={topic.id}
                href={locked ? '#' : `/learn/${topic.id}`}
                className={clsx(
                  'block rounded-3xl border-2 p-5 transition-all',
                  topic.bgColor, topic.borderColor,
                  locked ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md card-lift',
                )}
              >
                <div className="flex items-center gap-4">
                  <div className={clsx('w-12 h-12 rounded-2xl flex items-center justify-center text-2xl', topic.color)}>
                    {topic.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className={clsx('font-bold', topic.textColor)}>{topic.title}</h3>
                      {mastery >= 80 && <span className="text-base">🌟</span>}
                      {locked && <span className="text-xs text-gray-400">🔒</span>}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5 truncate">{topic.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <ProgressBar
                        value={(lessonsCompleted / topic.lessonCards.length) * 100}
                        height="sm"
                        color={topic.color}
                        animated={false}
                      />
                      <span className="text-xs text-gray-400 whitespace-nowrap">
                        {lessonsCompleted}/{topic.lessonCards.length}
                      </span>
                    </div>
                  </div>
                  <span className={clsx('text-2xl', topic.textColor)}>→</span>
                </div>
              </Link>
            );
          })}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
