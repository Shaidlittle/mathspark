'use client';

import { useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useProgress } from '@/hooks/useProgress';
import { getTopicById } from '@/data/topics';
import { getQuizQuestions } from '@/lib/questionEngine';
import { QuestionCard } from '@/components/practice/QuestionCard';
import { NavBar } from '@/components/layout/NavBar';
import { Button } from '@/components/ui/Button';
import { MovementBreak } from '@/components/ui/MovementBreak';
import { MistakeEntry } from '@/types';

const QUESTIONS_PER_SESSION = 8;
const MOVEMENT_BREAK_EVERY  = 10;

export default function PracticeTopicPage() {
  const params   = useParams<{ topicId: string }>();
  const { progress, recordAnswer, recordMistake, saveQuizScore } = useProgress();

  const topic    = getTopicById(params.topicId);
  const diff     = progress.preferences.easyMode ? 'easy' : undefined;
  const [questions] = useState(() => getQuizQuestions(params.topicId as never, QUESTIONS_PER_SESSION, diff));

  const [current,    setCurrent]    = useState(0);
  const [correct,    setCorrect]    = useState(0);
  const [showBreak,  setShowBreak]  = useState(false);
  const [finished,   setFinished]   = useState(false);
  const totalAnswered = useRef(0);

  if (!topic) return <div className="p-8 text-center text-gray-400">Topic not found.</div>;

  const handleAnswer = (isCorrect: boolean, questionId: string, userAnswer: string) => {
    recordAnswer(questionId, isCorrect);
    if (isCorrect) {
      setCorrect(c => c + 1);
    } else {
      const q = questions[current];
      const mistake: MistakeEntry = {
        questionId,
        topic: q.topic,
        subtopic: q.subtopic,
        errorTag: q.errorTag,
        question: q.prompt,
        userAnswer,
        correctAnswer: q.correctAnswer,
        timestamp: Date.now(),
        fixed: false,
      };
      recordMistake(mistake);
    }
    totalAnswered.current += 1;
  };

  const handleNext = () => {
    if (totalAnswered.current > 0 && totalAnswered.current % MOVEMENT_BREAK_EVERY === 0) {
      setShowBreak(true);
      return;
    }
    advanceQuestion();
  };

  const advanceQuestion = () => {
    if (current < questions.length - 1) {
      setCurrent(c => c + 1);
    } else {
      const pct = Math.round((correct / questions.length) * 100);
      saveQuizScore(topic.id, pct);
      setFinished(true);
    }
  };

  if (finished) {
    const pct = Math.round((correct / questions.length) * 100);
    const star = pct === 100 ? '🏆' : pct >= 80 ? '🌟' : pct >= 60 ? '👍' : '💪';
    return (
      <div className="min-h-screen pb-10">
        <NavBar xp={progress.totalXP} streak={progress.streaks.current} />
        <main className="max-w-lg mx-auto px-4 pt-12 text-center space-y-6">
          <div className="text-7xl animate-star-pop">{star}</div>
          <h1 className="text-2xl font-bold text-gray-900">Session Complete!</h1>
          <div className="text-5xl font-extrabold text-brand-600">{pct}%</div>
          <p className="text-gray-500">
            {correct} correct out of {questions.length} questions
          </p>
          {pct < 70 && (
            <p className="text-sm text-amber-700 bg-amber-50 rounded-2xl p-3 border border-amber-200">
              💡 Keep practising! Review the explanations and try again.
            </p>
          )}
          {pct >= 70 && pct < 100 && (
            <p className="text-sm text-green-700 bg-green-50 rounded-2xl p-3 border border-green-200">
              Great work! A few more sessions and you&apos;ll master this topic.
            </p>
          )}
          {pct === 100 && (
            <p className="text-sm text-brand-700 bg-brand-50 rounded-2xl p-3 border border-brand-200">
              Perfect round! You&apos;re crushing it, Luna! 🎉
            </p>
          )}
          <div className="flex flex-col gap-3">
            <Button variant="primary" size="lg" fullWidth onClick={() => {
              setCurrent(0); setCorrect(0); setFinished(false); totalAnswered.current = 0;
            }}>
              Practice again ↺
            </Button>
            <Link href="/practice">
              <Button variant="outline" fullWidth>Back to topics</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const q = questions[current];

  return (
    <div className="min-h-screen pb-10">
      {showBreak && <MovementBreak onDone={() => { setShowBreak(false); advanceQuestion(); }} />}
      <NavBar xp={progress.totalXP} streak={progress.streaks.current} />

      {/* Topic banner */}
      <div className={`${topic.color} text-white px-4 py-4`}>
        <div className="max-w-lg mx-auto flex items-center gap-3">
          <Link href="/practice" className="text-white/80 hover:text-white text-sm">← Back</Link>
          <span>{topic.icon}</span>
          <span className="font-bold">{topic.shortTitle}</span>
          {progress.preferences.easyMode && (
            <span className="ml-auto text-xs bg-white/20 rounded-lg px-2 py-0.5">Easy mode</span>
          )}
        </div>
      </div>

      <main className="max-w-lg mx-auto px-4 pt-6 pb-10">
        <QuestionCard
          key={q.id}
          question={q}
          questionNumber={current + 1}
          totalQuestions={questions.length}
          onAnswer={(isCorrect) => handleAnswer(isCorrect, q.id, '')}
          onNext={handleNext}
          easyMode={progress.preferences.easyMode}
        />
      </main>
    </div>
  );
}
