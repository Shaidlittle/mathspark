'use client';

import { useState } from 'react';
import { LessonCard } from '@/types';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface ConceptCardProps {
  card: LessonCard;
  cardIndex: number;
  totalCards: number;
  onComplete: (lessonId: string) => void;
  onNext: () => void;
}

export function ConceptCard({ card, cardIndex, totalCards, onComplete, onNext }: ConceptCardProps) {
  const [step, setStep] = useState<'learn' | 'example' | 'checkpoint'>('learn');
  const [exampleIdx, setExampleIdx] = useState(0);
  const [cpAnswer, setCpAnswer] = useState('');
  const [cpSubmitted, setCpSubmitted] = useState(false);
  const [cpCorrect, setCpCorrect] = useState(false);

  const example = card.examples[exampleIdx];

  const submitCheckpoint = () => {
    const isCorrect = cpAnswer.trim().toLowerCase() === card.checkpointQuestion.correctAnswer.toLowerCase();
    setCpCorrect(isCorrect);
    setCpSubmitted(true);
    if (isCorrect) onComplete(card.id);
  };

  const handleNext = () => {
    onNext();
    setStep('learn');
    setExampleIdx(0);
    setCpAnswer('');
    setCpSubmitted(false);
    setCpCorrect(false);
  };

  return (
    <div className="space-y-5 animate-slide-up">
      {/* Card header */}
      <div className="text-center space-y-1">
        <p className="text-sm text-gray-400 font-medium">Lesson {cardIndex + 1} of {totalCards}</p>
        <h2 className="text-2xl font-bold text-gray-900">{card.title}</h2>
      </div>

      {/* Step: Learn */}
      {step === 'learn' && (
        <div className="space-y-4">
          <Card padding="lg">
            <p className="text-gray-700 leading-relaxed text-base">{card.explanation}</p>
            {card.keyPoints.length > 0 && (
              <ul className="mt-4 space-y-2">
                {card.keyPoints.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-brand-500 mt-0.5 flex-shrink-0">✦</span>
                    {pt}
                  </li>
                ))}
              </ul>
            )}
          </Card>

          <Card padding="sm" className="border-amber-200 bg-amber-50">
            <p className="text-sm text-amber-800">{card.commonMistake}</p>
          </Card>

          <Button variant="primary" size="lg" fullWidth onClick={() => setStep('example')}>
            Show me an example →
          </Button>
        </div>
      )}

      {/* Step: Example */}
      {step === 'example' && (
        <div className="space-y-4">
          <Card padding="lg" className="border-brand-200 bg-brand-50">
            <p className="text-base font-semibold text-brand-900 mb-4 math">
              {example.problem}
            </p>
            <div className="space-y-2">
              {example.steps.map((s, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-600 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-sm text-brand-800 leading-relaxed math">{s}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-brand-200">
              <p className="text-sm text-gray-500 font-medium">Answer:</p>
              <p className="text-lg font-bold text-brand-900 math">{example.answer}</p>
            </div>
          </Card>

          {card.examples.length > 1 && exampleIdx < card.examples.length - 1 && (
            <Button variant="secondary" size="md" fullWidth onClick={() => setExampleIdx(i => i + 1)}>
              Another example →
            </Button>
          )}

          <Button variant="primary" size="lg" fullWidth onClick={() => setStep('checkpoint')}>
            I get it — test me! 🎯
          </Button>
        </div>
      )}

      {/* Step: Checkpoint */}
      {step === 'checkpoint' && (
        <div className="space-y-4">
          <Card padding="md" className="border-green-200 bg-green-50">
            <p className="text-xs font-semibold text-green-600 mb-2 uppercase tracking-wide">Mini Check</p>
            <p className="text-base font-semibold text-gray-900 math">
              {card.checkpointQuestion.prompt}
            </p>
          </Card>

          <input
            type="text"
            value={cpAnswer}
            onChange={e => setCpAnswer(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !cpSubmitted && cpAnswer.trim() && submitCheckpoint()}
            disabled={cpSubmitted}
            placeholder="Your answer…"
            className="w-full px-5 py-4 text-xl font-semibold rounded-2xl border-2 border-gray-200 focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-100 bg-white"
          />

          {!cpSubmitted && (
            <Button variant="primary" size="lg" fullWidth onClick={submitCheckpoint} disabled={!cpAnswer.trim()}>
              Check ✓
            </Button>
          )}

          {cpSubmitted && (
            <div className={`rounded-3xl p-5 border-2 ${cpCorrect ? 'bg-green-50 border-green-300' : 'bg-rose-50 border-rose-300'}`}>
              <p className={`text-lg font-bold ${cpCorrect ? 'text-green-800' : 'text-rose-800'}`}>
                {cpCorrect ? '🎉 Perfect! You\'ve got this!' : '💡 Not quite — that\'s okay!'}
              </p>
              {!cpCorrect && (
                <p className="text-sm text-gray-700 mt-2">
                  Hint: {card.checkpointQuestion.hint}
                </p>
              )}
              <Button
                variant={cpCorrect ? 'success' : 'primary'}
                size="md"
                fullWidth
                className="mt-4"
                onClick={handleNext}
              >
                {cardIndex < totalCards - 1 ? 'Next lesson →' : 'All done! 🚀'}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
