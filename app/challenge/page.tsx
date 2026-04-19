'use client';

import { useState } from 'react';
import { useProgress } from '@/hooks/useProgress';
import { getMixedQuestions } from '@/lib/questionEngine';
import { QuestionCard } from '@/components/practice/QuestionCard';
import { NavBar } from '@/components/layout/NavBar';
import { BottomNav } from '@/components/layout/BottomNav';
import { Button } from '@/components/ui/Button';
import { ALL_TOPIC_IDS, MistakeEntry } from '@/types';

const CHALLENGE_LENGTH = 5;

export default function ChallengePage() {
  const { progress, recordAnswer, recordMistake, saveQuizScore } = useProgress();
  const [started,  setStarted]  = useState(false);
  const [current,  setCurrent]  = useState(0);
  const [correct,  setCorrect]  = useState(0);
  const [finished, setFinished] = useState(false);
  const [questions, setQuestions] = useState(() => getMixedQuestions(ALL_TOPIC_IDS, CHALLENGE_LENGTH));
  const [stars, setStars] = useState(0);

  const startChallenge = () => {
    setQuestions(getMixedQuestions(ALL_TOPIC_IDS, CHALLENGE_LENGTH));
    setCurrent(0); setCorrect(0); setFinished(false); setStars(0);
    setStarted(true);
  };

  const handleAnswer = (isCorrect: boolean) => {
    recordAnswer(questions[current].id, isCorrect);
    if (isCorrect) {
      setCorrect(c => c + 1);
      setStars(s => s + 1);
    } else {
      const q = questions[current];
      const mistake: MistakeEntry = {
        questionId: q.id, topic: q.topic, subtopic: q.subtopic,
        errorTag: q.errorTag, question: q.prompt, userAnswer: '',
        correctAnswer: q.correctAnswer, timestamp: Date.now(), fixed: false,
      };
      recordMistake(mistake);
    }
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(c => c + 1);
    } else {
      const pct = Math.round((correct / questions.length) * 100);
      saveQuizScore('algebra-basics', pct); // log for general tracking
      setFinished(true);
    }
  };

  const starDisplay = (n: number) => '⭐'.repeat(n) + '☆'.repeat(CHALLENGE_LENGTH - n);

  if (!started) {
    return (
      <div className="min-h-screen pb-24">
        <NavBar xp={progress.totalXP} streak={progress.streaks.current} />
        <BottomNav />
        <main className="max-w-lg mx-auto px-4 pt-12 text-center space-y-8">
          <div className="text-7xl">🎯</div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Challenge Mode</h1>
            <p className="text-gray-500 mt-2">
              5 mixed questions from all topics. Fast, fun, and competitive!
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 py-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-brand-600">5</div>
              <div className="text-xs text-gray-400">Questions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-500">⭐ ×5</div>
              <div className="text-xs text-gray-400">Max stars</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">+10</div>
              <div className="text-xs text-gray-400">XP per correct</div>
            </div>
          </div>
          <Button variant="primary" size="xl" fullWidth onClick={startChallenge}>
            Start Challenge! 🚀
          </Button>
        </main>
      </div>
    );
  }

  if (finished) {
    const pct = Math.round((correct / CHALLENGE_LENGTH) * 100);
    return (
      <div className="min-h-screen pb-24">
        <NavBar xp={progress.totalXP} streak={progress.streaks.current} />
        <BottomNav />
        <main className="max-w-lg mx-auto px-4 pt-12 text-center space-y-6">
          <div className="text-6xl animate-star-pop">{stars === 5 ? '🏆' : stars >= 3 ? '🌟' : '💪'}</div>
          <h1 className="text-2xl font-bold text-gray-900">Challenge Complete!</h1>
          <div className="text-4xl py-2">{starDisplay(stars)}</div>
          <div className="text-5xl font-extrabold text-brand-600">{pct}%</div>
          <p className="text-gray-500">{correct}/{CHALLENGE_LENGTH} correct</p>
          {stars === 5 && (
            <p className="bg-amber-50 text-amber-800 rounded-2xl p-3 border border-amber-200 text-sm">
              🏆 Perfect score! You&apos;re an algebra superstar, Luna!
            </p>
          )}
          <Button variant="primary" size="lg" fullWidth onClick={startChallenge}>
            Play again! ↺
          </Button>
        </main>
      </div>
    );
  }

  const q = questions[current];

  return (
    <div className="min-h-screen pb-10">
      <NavBar xp={progress.totalXP} streak={progress.streaks.current} />

      {/* Challenge banner */}
      <div className="bg-gradient-to-r from-orange-500 to-rose-500 text-white px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <span className="font-bold text-lg">🎯 Challenge Mode</span>
          <span className="text-lg">{starDisplay(stars)}</span>
        </div>
      </div>

      <main className="max-w-lg mx-auto px-4 pt-6 pb-10">
        <QuestionCard
          key={q.id}
          question={q}
          questionNumber={current + 1}
          totalQuestions={questions.length}
          onAnswer={handleAnswer}
          onNext={handleNext}
        />
      </main>

      <BottomNav />
    </div>
  );
}
