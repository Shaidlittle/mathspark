'use client';

import { useProgress } from '@/hooks/useProgress';
import { NavBar } from '@/components/layout/NavBar';
import { BottomNav } from '@/components/layout/BottomNav';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { topics } from '@/data/topics';
import { TOPIC_LABELS } from '@/types';

export default function TutorPage() {
  const { progress, resetAll } = useProgress();

  const totalQ   = Object.values(progress.questionAttempts).reduce((s, a) => s + a.total, 0);
  const totalC   = Object.values(progress.questionAttempts).reduce((s, a) => s + a.correct, 0);
  const accuracy = totalQ > 0 ? Math.round((totalC / totalQ) * 100) : 0;

  const masteredTopics = topics.filter(t => (progress.masteryByTopic[t.id] ?? 0) >= 80);
  const weakTopics     = topics.filter(t => {
    const m = progress.masteryByTopic[t.id] ?? 0;
    const scores = progress.quizScores[t.id] ?? [];
    return scores.length > 0 && m < 60;
  });

  const recommendedNext = topics.find(t => {
    const m = progress.masteryByTopic[t.id] ?? 0;
    const scores = progress.quizScores[t.id] ?? [];
    return scores.length > 0 && m < 80;
  }) ?? topics.find(t => !(progress.quizScores[t.id]?.length));

  return (
    <div className="min-h-screen pb-24">
      <NavBar xp={progress.totalXP} streak={progress.streaks.current} />

      <main className="max-w-lg mx-auto px-4 pt-6 space-y-5">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Parent & Tutor View 👩‍🏫</h1>
          <p className="text-sm text-gray-500 mt-1">A summary of Luna's learning progress.</p>
        </div>

        {/* Summary */}
        <Card padding="md" className="bg-gradient-to-br from-brand-50 to-violet-50 border-brand-200">
          <h2 className="font-bold text-brand-800 mb-4">Luna's Overview</h2>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-extrabold text-brand-700">{progress.streaks.current}</div>
              <div className="text-xs text-gray-500">Day streak 🔥</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-amber-600">{progress.totalXP}</div>
              <div className="text-xs text-gray-500">XP earned ⭐</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-green-600">{accuracy}%</div>
              <div className="text-xs text-gray-500">Overall accuracy</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-blue-600">{totalQ}</div>
              <div className="text-xs text-gray-500">Questions done</div>
            </div>
          </div>
        </Card>

        {/* Topic mastery */}
        <Card padding="md">
          <h2 className="font-bold text-gray-900 mb-4">Topic Mastery Breakdown</h2>
          <div className="space-y-4">
            {topics.map(t => {
              const m      = progress.masteryByTopic[t.id] ?? 0;
              const scores = progress.quizScores[t.id] ?? [];
              const color  = m >= 80 ? 'bg-green-500' : m >= 50 ? 'bg-brand-500' : 'bg-gray-300';
              return (
                <div key={t.id}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700">{t.icon} {t.shortTitle}</span>
                    <span className="text-gray-500">
                      {scores.length > 0 ? `${m}% (${scores.length} session${scores.length !== 1 ? 's' : ''})` : 'Not started'}
                    </span>
                  </div>
                  <ProgressBar value={m} color={color} height="md" />
                </div>
              );
            })}
          </div>
        </Card>

        {/* Strengths & weaknesses */}
        {masteredTopics.length > 0 && (
          <Card padding="md" className="border-green-200 bg-green-50">
            <h2 className="font-bold text-green-800 mb-2">✅ Strengths</h2>
            <div className="flex flex-wrap gap-2">
              {masteredTopics.map(t => (
                <Badge key={t.id} color="green" size="sm">{t.icon} {t.shortTitle}</Badge>
              ))}
            </div>
          </Card>
        )}

        {weakTopics.length > 0 && (
          <Card padding="md" className="border-rose-200 bg-rose-50">
            <h2 className="font-bold text-rose-800 mb-2">⚠️ Needs Revision</h2>
            <div className="flex flex-wrap gap-2">
              {weakTopics.map(t => (
                <Badge key={t.id} color="rose" size="sm">{t.icon} {t.shortTitle}</Badge>
              ))}
            </div>
          </Card>
        )}

        {/* Recommended next */}
        {recommendedNext && (
          <Card padding="md" className="border-blue-200 bg-blue-50">
            <h2 className="font-bold text-blue-800 mb-1">📌 Recommended Next</h2>
            <p className="text-blue-700 text-sm">
              {recommendedNext.icon} <strong>{recommendedNext.title}</strong> — {recommendedNext.description}
            </p>
          </Card>
        )}

        {/* Mistake log */}
        {progress.mistakes.length > 0 && (
          <Card padding="md">
            <h2 className="font-bold text-gray-900 mb-3">Common Mistakes</h2>
            {(() => {
              const byTag = progress.mistakes.reduce<Record<string, number>>((acc, m) => {
                acc[m.errorTag] = (acc[m.errorTag] ?? 0) + 1;
                return acc;
              }, {});
              return (
                <div className="space-y-2">
                  {Object.entries(byTag).sort(([, a], [, b]) => b - a).map(([tag, count]) => (
                    <div key={tag} className="flex justify-between text-sm">
                      <span className="text-gray-700">{tag.replace(/-/g, ' ')}</span>
                      <span className="font-semibold text-rose-600">{count}×</span>
                    </div>
                  ))}
                </div>
              );
            })()}
          </Card>
        )}

        {/* Test scores */}
        {progress.testScores.length > 0 && (
          <Card padding="md">
            <h2 className="font-bold text-gray-900 mb-3">Test Results</h2>
            <div className="space-y-2">
              {progress.testScores.map((ts, i) => (
                <div key={i} className="flex justify-between text-sm border-b border-gray-50 py-1.5 last:border-0">
                  <span className="text-gray-700">{ts.testTitle}</span>
                  <span className={ts.percentage >= 70 ? 'text-green-600 font-semibold' : 'text-rose-600 font-semibold'}>
                    {ts.percentage}% ({ts.score}/{ts.total})
                  </span>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Reset */}
        <Card padding="md" className="border-rose-200">
          <h2 className="font-bold text-rose-800 mb-2">⚠️ Reset Progress</h2>
          <p className="text-sm text-gray-500 mb-3">This will erase all of Luna's data. Only use this to start fresh.</p>
          <Button
            variant="danger"
            size="sm"
            onClick={() => {
              if (confirm('Are you sure you want to reset all of Luna\'s progress? This cannot be undone.')) {
                resetAll();
              }
            }}
          >
            Reset all data
          </Button>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
}
