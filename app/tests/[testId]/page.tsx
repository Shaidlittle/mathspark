'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getTestById } from '@/data/tests';
import { useProgress } from '@/hooks/useProgress';
import { checkAnswer } from '@/lib/questionEngine';
import { QuestionCard } from '@/components/practice/QuestionCard';
import { NavBar } from '@/components/layout/NavBar';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { TestScore } from '@/types';

export default function TestSessionPage() {
  const params   = useParams<{ testId: string }>();
  const test     = getTestById(params.testId);
  const { progress, recordAnswer, saveTestScore } = useProgress();

  const [started,   setStarted]   = useState(false);
  const [current,   setCurrent]   = useState(0);
  const [answers,   setAnswers]   = useState<Record<string, { userAnswer: string; correct: boolean }>>({});
  const [finished,  setFinished]  = useState(false);
  const [timeLeft,  setTimeLeft]  = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (started && test?.timeLimit) {
      setTimeLeft(test.timeLimit * 60);
      timerRef.current = setInterval(() => {
        setTimeLeft(t => {
          if (t === null || t <= 1) {
            clearInterval(timerRef.current!);
            finishTest();
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [started]);

  if (!test) return <div className="p-8 text-center text-gray-400">Test not found.</div>;

  const finishTest = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setFinished(true);
  };

  const handleAnswer = (isCorrect: boolean, questionId: string) => {
    recordAnswer(questionId, isCorrect);
    setAnswers(prev => ({ ...prev, [questionId]: { userAnswer: '', correct: isCorrect } }));
  };

  const handleNext = () => {
    if (current < test.questions.length - 1) {
      setCurrent(c => c + 1);
    } else {
      // Save test score
      const score      = Object.values(answers).filter(a => a.correct).length;
      const totalFixed = Object.keys(answers).length;
      const pct        = totalFixed > 0 ? Math.round((score / test.questions.length) * 100) : 0;
      const today      = new Date().toISOString().split('T')[0];
      const ts: TestScore = {
        testId: test.id, testTitle: test.title,
        score, total: test.questions.length,
        date: today, percentage: pct, answers,
      };
      saveTestScore(ts);
      finishTest();
    }
  };

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  const finalScore = Object.values(answers).filter(a => a.correct).length;
  const finalPct   = test.questions.length > 0 ? Math.round((finalScore / test.questions.length) * 100) : 0;

  if (!started) {
    return (
      <div className="min-h-screen pb-10">
        <NavBar xp={progress.totalXP} streak={progress.streaks.current} />
        <main className="max-w-lg mx-auto px-4 pt-12 text-center space-y-6">
          <div className="text-5xl">📝</div>
          <h1 className="text-2xl font-bold text-gray-900">{test.title}</h1>
          <p className="text-gray-500">{test.description}</p>
          <div className="grid grid-cols-2 gap-4">
            <Card padding="sm" className="text-center">
              <div className="text-2xl font-bold text-brand-600">{test.questions.length}</div>
              <div className="text-xs text-gray-400">Questions</div>
            </Card>
            <Card padding="sm" className="text-center">
              <div className="text-2xl font-bold text-green-600">{test.timeLimit ?? '—'}</div>
              <div className="text-xs text-gray-400">{test.timeLimit ? 'Minutes (optional)' : 'No time limit'}</div>
            </Card>
          </div>
          <Button variant="primary" size="xl" fullWidth onClick={() => setStarted(true)}>
            Start Test 🚀
          </Button>
          <Link href="/tests">
            <Button variant="ghost" fullWidth>← Back to tests</Button>
          </Link>
        </main>
      </div>
    );
  }

  if (finished) {
    const grade = finalPct >= 80 ? 'A' : finalPct >= 70 ? 'B' : finalPct >= 60 ? 'C' : 'D';
    const emoji = finalPct >= 80 ? '🌟' : finalPct >= 60 ? '👍' : '💪';

    return (
      <div className="min-h-screen pb-10">
        <NavBar xp={progress.totalXP} streak={progress.streaks.current} />
        <main className="max-w-lg mx-auto px-4 pt-10 text-center space-y-6">
          <div className="text-6xl animate-star-pop">{emoji}</div>
          <h1 className="text-2xl font-bold text-gray-900">Test Complete!</h1>
          <div className="text-6xl font-extrabold text-brand-600">{finalPct}%</div>
          <p className="text-lg text-gray-500">Grade: <strong>{grade}</strong> · {finalScore}/{test.questions.length} correct</p>

          {/* Review answers */}
          <Card padding="md" className="text-left">
            <h2 className="font-bold text-gray-900 mb-3">Answer Review</h2>
            <div className="space-y-2">
              {test.questions.map((q, i) => {
                const ans = answers[q.id];
                return (
                  <div key={q.id} className="flex items-start gap-2 text-sm">
                    <span>{ans?.correct ? '✅' : '❌'}</span>
                    <div>
                      <p className="text-gray-800 math">{q.prompt}</p>
                      {!ans?.correct && (
                        <p className="text-xs text-green-600 mt-0.5">Answer: {q.correctAnswer}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          <div className="flex flex-col gap-3">
            <Button variant="primary" fullWidth onClick={() => {
              setStarted(false); setCurrent(0); setAnswers({}); setFinished(false);
            }}>
              Retry test ↺
            </Button>
            <Link href="/tests">
              <Button variant="outline" fullWidth>Back to tests</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const q = test.questions[current];

  return (
    <div className="min-h-screen pb-10">
      <NavBar xp={progress.totalXP} streak={progress.streaks.current} />

      <div className="bg-green-600 text-white px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <span className="font-bold">{test.title}</span>
          {timeLeft !== null && (
            <span className={`font-mono font-bold text-lg ${timeLeft < 60 ? 'text-rose-200 animate-pulse' : ''}`}>
              ⏱ {formatTime(timeLeft)}
            </span>
          )}
        </div>
      </div>

      <main className="max-w-lg mx-auto px-4 pt-6 pb-10">
        <QuestionCard
          key={q.id}
          question={q}
          questionNumber={current + 1}
          totalQuestions={test.questions.length}
          onAnswer={(isCorrect) => handleAnswer(isCorrect, q.id)}
          onNext={handleNext}
        />
      </main>
    </div>
  );
}
