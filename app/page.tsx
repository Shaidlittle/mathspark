'use client';

import Link from 'next/link';
import { useProgress } from '@/hooks/useProgress';
import { NavBar } from '@/components/layout/NavBar';
import { BottomNav } from '@/components/layout/BottomNav';
import { MoodCheck } from '@/components/home/MoodCheck';
import { MasteryMap } from '@/components/home/MasteryMap';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { topics } from '@/data/topics';

const GREETINGS = [
  'Ready to spark some algebra? ⚡',
  'Let\'s make maths feel easy today! 🌟',
  'You\'re doing great, Luna! 🚀',
  'One question at a time — you\'ve got this! 💪',
  'Every question makes you stronger! 🦸',
];

export default function HomePage() {
  const { progress, hydrated, setMood, setFocusMode } = useProgress();

  if (!hydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-brand-600 text-2xl animate-pulse">⚡ MathSpark</div>
      </div>
    );
  }

  const greeting = GREETINGS[new Date().getDay() % GREETINGS.length];
  const firstUnstartedTopic = topics.find(t => !progress.masteryByTopic[t.id]);
  const lastActiveTopic = topics.find(t =>
    (progress.quizScores[t.id]?.length ?? 0) > 0 && (progress.masteryByTopic[t.id] ?? 0) < 80
  ) ?? firstUnstartedTopic;

  const totalMastery = Object.values(progress.masteryByTopic).reduce((a, b) => a + (b ?? 0), 0);
  const avgMastery   = topics.length > 0 ? Math.round(totalMastery / topics.length) : 0;

  return (
    <div className="min-h-screen pb-24">
      <NavBar
        xp={progress.totalXP}
        streak={progress.streaks.current}
        focusMode={progress.preferences.focusMode}
        onToggleFocus={() => setFocusMode(!progress.preferences.focusMode)}
      />

      <main className="max-w-lg mx-auto px-4 pt-6 space-y-6">
        {/* Welcome */}
        <div className="text-center space-y-1 py-2">
          <h1 className="text-2xl font-bold text-gray-900">Hi Luna! 👋</h1>
          <p className="text-gray-500">{greeting}</p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3">
          <Card padding="sm" className="text-center">
            <div className="text-2xl font-bold text-brand-600">{progress.streaks.current}</div>
            <div className="text-xs text-gray-400 font-medium mt-0.5">Day streak 🔥</div>
          </Card>
          <Card padding="sm" className="text-center">
            <div className="text-2xl font-bold text-amber-500">{progress.totalXP}</div>
            <div className="text-xs text-gray-400 font-medium mt-0.5">XP earned ⭐</div>
          </Card>
          <Card padding="sm" className="text-center">
            <div className="text-2xl font-bold text-green-600">{avgMastery}%</div>
            <div className="text-xs text-gray-400 font-medium mt-0.5">Avg mastery</div>
          </Card>
        </div>

        {/* Mood check */}
        <MoodCheck
          onSelect={setMood}
          todaysMood={progress.moodDate === new Date().toISOString().split('T')[0] ? progress.mood : null}
        />

        {/* Today's goal / Continue */}
        {lastActiveTopic && (
          <Card lift className="border-brand-200 bg-gradient-to-br from-brand-50 to-violet-50">
            <div className="flex items-center gap-4">
              <span className="text-4xl">{lastActiveTopic.icon}</span>
              <div className="flex-1">
                <p className="text-xs font-semibold text-brand-600 uppercase tracking-wide mb-0.5">
                  Continue learning
                </p>
                <h3 className="font-bold text-gray-900">{lastActiveTopic.title}</h3>
                <p className="text-sm text-gray-500">{lastActiveTopic.description}</p>
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <Link href={`/learn/${lastActiveTopic.id}`} className="flex-1">
                <Button variant="secondary" fullWidth size="sm">📚 Learn</Button>
              </Link>
              <Link href={`/practice/${lastActiveTopic.id}`} className="flex-1">
                <Button variant="primary" fullWidth size="sm">✏️ Practice</Button>
              </Link>
            </div>
          </Card>
        )}

        {/* Quick actions */}
        <div className="grid grid-cols-2 gap-3">
          <Link href="/challenge">
            <Card lift className="text-center py-5 border-orange-200 bg-orange-50">
              <div className="text-3xl mb-1">🎯</div>
              <div className="font-bold text-orange-700 text-sm">Challenge Mode</div>
              <div className="text-xs text-orange-500 mt-0.5">5 questions, fast!</div>
            </Card>
          </Link>
          <Link href="/tests">
            <Card lift className="text-center py-5 border-green-200 bg-green-50">
              <div className="text-3xl mb-1">📝</div>
              <div className="font-bold text-green-700 text-sm">Mini Tests</div>
              <div className="text-xs text-green-500 mt-0.5">Check your progress</div>
            </Card>
          </Link>
          <Link href="/errors">
            <Card lift className="text-center py-5 border-rose-200 bg-rose-50">
              <div className="text-3xl mb-1">🛠️</div>
              <div className="font-bold text-rose-700 text-sm">Fix Mistakes</div>
              <div className="text-xs text-rose-500 mt-0.5">
                {progress.mistakes.filter(m => !m.fixed).length} to review
              </div>
            </Card>
          </Link>
          <Link href="/tutor">
            <Card lift className="text-center py-5 border-blue-200 bg-blue-50">
              <div className="text-3xl mb-1">👩‍🏫</div>
              <div className="font-bold text-blue-700 text-sm">Tutor View</div>
              <div className="text-xs text-blue-500 mt-0.5">For parents & teachers</div>
            </Card>
          </Link>
        </div>

        {/* Mastery map */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-3">Your Progress Map 🗺️</h2>
          <MasteryMap progress={progress} />
        </div>

        {/* Badges */}
        {progress.badges.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3">Your Badges 🏅</h2>
            <div className="flex flex-wrap gap-2">
              {progress.badges.map(b => (
                <div key={b.id} className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
                  <span className="text-xl">{b.icon}</span>
                  <div>
                    <div className="text-xs font-bold text-amber-800">{b.name}</div>
                    <div className="text-xs text-amber-600">{b.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
