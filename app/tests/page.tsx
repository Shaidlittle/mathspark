'use client';

import Link from 'next/link';
import { useProgress } from '@/hooks/useProgress';
import { miniTests } from '@/data/tests';
import { NavBar } from '@/components/layout/NavBar';
import { BottomNav } from '@/components/layout/BottomNav';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { TOPIC_LABELS } from '@/types';

export default function TestsPage() {
  const { progress } = useProgress();

  const getLastScore = (testId: string) => {
    const scores = progress.testScores.filter(s => s.testId === testId);
    return scores[scores.length - 1];
  };

  return (
    <div className="min-h-screen pb-24">
      <NavBar xp={progress.totalXP} streak={progress.streaks.current} />

      <main className="max-w-lg mx-auto px-4 pt-6 space-y-5">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mini Tests 📝</h1>
          <p className="text-sm text-gray-500 mt-1">Check your understanding with a timed or untimed quiz.</p>
        </div>

        {miniTests.map(test => {
          const last = getLastScore(test.id);
          const isPerfect = last?.percentage === 100;

          return (
            <Link key={test.id} href={`/tests/${test.id}`}>
              <Card lift className={`border ${isPerfect ? 'border-amber-300 bg-amber-50' : 'border-gray-100'}`}>
                <div className="flex items-start gap-4">
                  <div className="text-3xl flex-shrink-0">
                    {isPerfect ? '🏆' : last ? (last.percentage >= 70 ? '✅' : '🔄') : '📝'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900">{test.title}</h3>
                    <p className="text-sm text-gray-500 mt-0.5">{test.description}</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      <Badge color="gray" size="sm">{test.questions.length} Qs</Badge>
                      {test.timeLimit && <Badge color="blue" size="sm">⏱ {test.timeLimit} min</Badge>}
                      {test.topics.slice(0, 2).map(t => (
                        <Badge key={t} color="violet" size="sm">{TOPIC_LABELS[t]}</Badge>
                      ))}
                    </div>
                    {last && (
                      <p className={`text-sm font-semibold mt-2 ${last.percentage >= 70 ? 'text-green-600' : 'text-rose-600'}`}>
                        Last score: {last.percentage}% ({last.score}/{last.total})
                      </p>
                    )}
                    {!last && (
                      <p className="text-xs text-gray-400 mt-2">Not attempted yet</p>
                    )}
                  </div>
                  <span className="text-gray-400 text-xl mt-1">→</span>
                </div>
              </Card>
            </Link>
          );
        })}
      </main>

      <BottomNav />
    </div>
  );
}
