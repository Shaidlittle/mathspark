'use client';

import Link from 'next/link';
import { useProgress } from '@/hooks/useProgress';
import { NavBar } from '@/components/layout/NavBar';
import { BottomNav } from '@/components/layout/BottomNav';
import { topics } from '@/data/topics';
import { clsx } from 'clsx';
import { Badge } from '@/components/ui/Badge';

export default function PracticePage() {
  const { progress } = useProgress();

  return (
    <div className="min-h-screen pb-24">
      <NavBar xp={progress.totalXP} streak={progress.streaks.current} />

      <main className="max-w-lg mx-auto px-4 pt-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Practice ✏️</h1>
          <p className="text-gray-500 text-sm mt-1">Pick a topic and get going!</p>
        </div>

        <div className="space-y-3">
          {topics.map(topic => {
            const mastery = progress.masteryByTopic[topic.id] ?? 0;
            const scores  = progress.quizScores[topic.id] ?? [];
            const lastScore = scores[scores.length - 1];

            return (
              <Link key={topic.id} href={`/practice/${topic.id}`}>
                <div className={clsx(
                  'flex items-center gap-4 p-4 rounded-3xl border-2 transition-all hover:shadow-md card-lift',
                  topic.bgColor, topic.borderColor,
                )}>
                  <div className={clsx('w-12 h-12 rounded-2xl flex items-center justify-center text-2xl', topic.color)}>
                    {topic.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={clsx('font-bold text-sm', topic.textColor)}>{topic.title}</h3>
                    {lastScore !== undefined && (
                      <p className="text-xs text-gray-500 mt-0.5">Last score: {lastScore}%</p>
                    )}
                    {lastScore === undefined && (
                      <p className="text-xs text-gray-400 mt-0.5">Not started yet</p>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {mastery >= 80 && <Badge color="green" size="sm">Mastered 🌟</Badge>}
                    {mastery > 0 && mastery < 80 && <Badge color="blue" size="sm">{mastery}%</Badge>}
                    <span className={clsx('text-sm font-bold', topic.textColor)}>→</span>
                  </div>
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
