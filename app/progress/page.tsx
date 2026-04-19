'use client';

import { useProgress } from '@/hooks/useProgress';
import { NavBar } from '@/components/layout/NavBar';
import { BottomNav } from '@/components/layout/BottomNav';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Badge } from '@/components/ui/Badge';
import { topics } from '@/data/topics';
import { TOPIC_LABELS } from '@/types';

export default function ProgressPage() {
  const { progress } = useProgress();

  const totalQuestions = Object.values(progress.questionAttempts).reduce((s, a) => s + a.total, 0);
  const totalCorrect   = Object.values(progress.questionAttempts).reduce((s, a) => s + a.correct, 0);
  const accuracy       = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

  const weakTopics = topics
    .filter(t => {
      const m = progress.masteryByTopic[t.id] ?? 0;
      const scores = progress.quizScores[t.id] ?? [];
      return scores.length > 0 && m < 60;
    })
    .map(t => t.id);

  return (
    <div className="min-h-screen pb-24">
      <NavBar xp={progress.totalXP} streak={progress.streaks.current} />

      <main className="max-w-lg mx-auto px-4 pt-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Progress 📊</h1>

        {/* Summary stats */}
        <div className="grid grid-cols-2 gap-3">
          <Card padding="sm" className="text-center">
            <div className="text-3xl font-bold text-brand-600">{progress.streaks.current}</div>
            <div className="text-xs text-gray-400 mt-0.5">Current streak 🔥</div>
            <div className="text-xs text-gray-400">Best: {progress.streaks.best}</div>
          </Card>
          <Card padding="sm" className="text-center">
            <div className="text-3xl font-bold text-amber-500">{progress.totalXP}</div>
            <div className="text-xs text-gray-400 mt-0.5">Total XP ⭐</div>
          </Card>
          <Card padding="sm" className="text-center">
            <div className="text-3xl font-bold text-green-600">{accuracy}%</div>
            <div className="text-xs text-gray-400 mt-0.5">Accuracy</div>
            <div className="text-xs text-gray-400">{totalCorrect}/{totalQuestions} correct</div>
          </Card>
          <Card padding="sm" className="text-center">
            <div className="text-3xl font-bold text-blue-600">{progress.completedLessons.length}</div>
            <div className="text-xs text-gray-400 mt-0.5">Lessons done</div>
          </Card>
        </div>

        {/* Topic mastery */}
        <Card padding="md">
          <h2 className="font-bold text-gray-900 mb-4">Topic Mastery</h2>
          <div className="space-y-4">
            {topics.map(topic => {
              const mastery = progress.masteryByTopic[topic.id] ?? 0;
              const scores  = progress.quizScores[topic.id] ?? [];
              const color   = mastery >= 80 ? 'bg-green-500' : mastery >= 50 ? 'bg-brand-500' : 'bg-gray-300';
              const needsRevision = weakTopics.includes(topic.id);

              return (
                <div key={topic.id}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="flex items-center gap-2">
                      <span>{topic.icon}</span>
                      <span className="text-sm font-semibold text-gray-800">{topic.shortTitle}</span>
                    </span>
                    <div className="flex items-center gap-2">
                      {needsRevision && <Badge color="rose" size="sm">Needs revision</Badge>}
                      {mastery >= 80 && <Badge color="green" size="sm">Mastered ✓</Badge>}
                      <span className="text-sm font-bold text-gray-600">{mastery}%</span>
                    </div>
                  </div>
                  <ProgressBar value={mastery} color={color} height="md" />
                  {scores.length > 0 && (
                    <p className="text-xs text-gray-400 mt-1">
                      Last score: {scores[scores.length - 1]}% · {scores.length} session{scores.length !== 1 ? 's' : ''}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </Card>

        {/* Badges */}
        {progress.badges.length > 0 && (
          <Card padding="md">
            <h2 className="font-bold text-gray-900 mb-3">Badges Earned 🏅</h2>
            <div className="grid grid-cols-2 gap-2">
              {progress.badges.map(b => (
                <div key={b.id} className="flex items-center gap-3 bg-amber-50 rounded-2xl p-3 border border-amber-100">
                  <span className="text-2xl">{b.icon}</span>
                  <div>
                    <div className="text-sm font-bold text-amber-800">{b.name}</div>
                    <div className="text-xs text-amber-600">{b.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Test scores */}
        {progress.testScores.length > 0 && (
          <Card padding="md">
            <h2 className="font-bold text-gray-900 mb-3">Test Scores 📝</h2>
            <div className="space-y-2">
              {progress.testScores.slice(-10).reverse().map((ts, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{ts.testTitle}</p>
                    <p className="text-xs text-gray-400">{ts.date}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-lg font-bold ${ts.percentage >= 70 ? 'text-green-600' : 'text-rose-600'}`}>
                      {ts.percentage}%
                    </span>
                    <div className="text-xs text-gray-400">{ts.score}/{ts.total}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Session history */}
        {progress.sessionHistory.length > 0 && (
          <Card padding="md">
            <h2 className="font-bold text-gray-900 mb-3">Recent Sessions</h2>
            <div className="space-y-2">
              {progress.sessionHistory.slice(-5).reverse().map((s, i) => (
                <div key={i} className="flex justify-between items-center py-1.5 text-sm border-b border-gray-50 last:border-0">
                  <span className="text-gray-500">{s.date}</span>
                  <span className="text-gray-700">{s.questionsAnswered} questions</span>
                  <span className="font-semibold text-brand-600">
                    {s.questionsAnswered > 0 ? Math.round((s.correctAnswers / s.questionsAnswered) * 100) : 0}%
                  </span>
                </div>
              ))}
            </div>
          </Card>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
