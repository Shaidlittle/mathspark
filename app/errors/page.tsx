'use client';

import { useState } from 'react';
import { useProgress } from '@/hooks/useProgress';
import { getErrorQuestions, checkAnswer } from '@/lib/questionEngine';
import { NavBar } from '@/components/layout/NavBar';
import { BottomNav } from '@/components/layout/BottomNav';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { QuestionCard } from '@/components/practice/QuestionCard';
import { ERROR_TAGS, TOPIC_LABELS } from '@/types';

const ERROR_TAG_LABELS: Record<string, string> = {
  [ERROR_TAGS.MIXED_TERMS]:   'Mixed terms confusion',
  [ERROR_TAGS.DISTRIBUTIVE]:  'Distributive law error',
  [ERROR_TAGS.INVERSE_OP]:    'Forgot inverse operation',
  [ERROR_TAGS.SUBSTITUTION]:  'Substitution mistake',
  [ERROR_TAGS.LIKE_TERMS]:    'Like terms error',
  [ERROR_TAGS.EXPONENT_RULE]: 'Exponent rule error',
  [ERROR_TAGS.SIGN_ERROR]:    'Sign error',
  [ERROR_TAGS.COEFFICIENT]:   'Coefficient error',
  [ERROR_TAGS.VARIABLE_BOTH]: 'Variables on both sides error',
  [ERROR_TAGS.WORD_TRANSLATE]:'Word translation error',
};

export default function ErrorsPage() {
  const { progress, fixMistake, recordAnswer } = useProgress();
  const [practiceMode, setPracticeMode] = useState(false);
  const [practiceIdx,  setPracticeIdx]  = useState(0);
  const [practiceFixed, setPracticeFixed] = useState<Set<string>>(new Set());

  const unfixed = progress.mistakes.filter(m => !m.fixed);
  const fixed   = progress.mistakes.filter(m => m.fixed);

  // Group by error tag for pattern display
  const byTag = unfixed.reduce<Record<string, number>>((acc, m) => {
    acc[m.errorTag] = (acc[m.errorTag] ?? 0) + 1;
    return acc;
  }, {});

  const errorQuestions = getErrorQuestions(unfixed.map(m => m.questionId));

  if (practiceMode && errorQuestions.length > 0) {
    const q = errorQuestions[practiceIdx];
    const done = practiceIdx >= errorQuestions.length;

    if (done) {
      return (
        <div className="min-h-screen pb-24">
          <NavBar xp={progress.totalXP} streak={progress.streaks.current} />
          <BottomNav />
          <main className="max-w-lg mx-auto px-4 pt-12 text-center space-y-6">
            <div className="text-6xl">🛠️</div>
            <h1 className="text-2xl font-bold text-gray-900">Mistakes Review Done!</h1>
            <p className="text-gray-500">You reviewed {practiceFixed.size} questions correctly.</p>
            <Button variant="primary" onClick={() => { setPracticeMode(false); setPracticeIdx(0); setPracticeFixed(new Set()); }} fullWidth>
              Back to error log
            </Button>
          </main>
        </div>
      );
    }

    return (
      <div className="min-h-screen pb-10">
        <NavBar xp={progress.totalXP} streak={progress.streaks.current} />
        <div className="bg-rose-600 text-white px-4 py-3">
          <div className="max-w-lg mx-auto flex items-center justify-between">
            <span className="font-bold">🛠️ Fix My Mistakes</span>
            <button onClick={() => setPracticeMode(false)} className="text-rose-200 text-sm">Exit</button>
          </div>
        </div>
        <main className="max-w-lg mx-auto px-4 pt-6 pb-10">
          <QuestionCard
            key={q.id}
            question={q}
            questionNumber={practiceIdx + 1}
            totalQuestions={errorQuestions.length}
            onAnswer={(correct) => {
              recordAnswer(q.id, correct);
              if (correct) {
                fixMistake(q.id);
                setPracticeFixed(s => new Set(s).add(q.id));
              }
            }}
            onNext={() => setPracticeIdx(i => i + 1)}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24">
      <NavBar xp={progress.totalXP} streak={progress.streaks.current} />

      <main className="max-w-lg mx-auto px-4 pt-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Error Log 🛠️</h1>
          <p className="text-sm text-gray-500 mt-1">Review your mistakes and turn them into strengths.</p>
        </div>

        {/* Pattern summary */}
        {Object.keys(byTag).length > 0 && (
          <Card padding="md">
            <h2 className="font-bold text-gray-900 mb-3">Mistake Patterns</h2>
            <div className="space-y-2">
              {Object.entries(byTag)
                .sort(([, a], [, b]) => b - a)
                .map(([tag, count]) => (
                  <div key={tag} className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">{ERROR_TAG_LABELS[tag] ?? tag}</span>
                    <Badge color="rose" size="sm">{count}×</Badge>
                  </div>
                ))
              }
            </div>
          </Card>
        )}

        {/* Practice button */}
        {unfixed.length > 0 && (
          <Button
            variant="danger"
            size="lg"
            fullWidth
            onClick={() => { setPracticeMode(true); setPracticeIdx(0); }}
          >
            Fix my {unfixed.length} mistake{unfixed.length !== 1 ? 's' : ''} 🛠️
          </Button>
        )}

        {/* Unfixed mistakes */}
        {unfixed.length === 0 && (
          <Card className="text-center py-10">
            <div className="text-4xl mb-3">✨</div>
            <p className="font-bold text-gray-800">No mistakes to fix!</p>
            <p className="text-gray-500 text-sm mt-1">Keep practising to stay sharp.</p>
          </Card>
        )}

        {unfixed.length > 0 && (
          <div className="space-y-3">
            <h2 className="font-bold text-gray-800">To review ({unfixed.length})</h2>
            {unfixed.slice(0, 10).map(m => (
              <Card key={m.questionId + m.timestamp} padding="sm" className="border-rose-100">
                <div className="flex items-start gap-3">
                  <span className="text-lg">❌</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 math">{m.question}</p>
                    <p className="text-xs text-rose-600 mt-0.5">Your answer: {m.userAnswer || '(blank)'}</p>
                    <p className="text-xs text-green-600">Correct: {m.correctAnswer}</p>
                    <div className="flex gap-2 mt-1 flex-wrap">
                      <Badge color="violet" size="sm">{TOPIC_LABELS[m.topic]}</Badge>
                      <Badge color="rose" size="sm">{ERROR_TAG_LABELS[m.errorTag] ?? m.errorTag}</Badge>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Fixed mistakes */}
        {fixed.length > 0 && (
          <div className="space-y-2">
            <h2 className="font-bold text-gray-800 text-sm text-gray-400">Fixed ({fixed.length})</h2>
            {fixed.slice(-5).map(m => (
              <div key={m.questionId + m.timestamp} className="flex items-center gap-2 text-sm text-gray-400">
                <span>✅</span>
                <span className="truncate math">{m.question}</span>
              </div>
            ))}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
