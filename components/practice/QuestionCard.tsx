'use client';

import { useState, useEffect } from 'react';
import { Question } from '@/types';
import { getAnswerChoices, checkAnswer } from '@/lib/questionEngine';
import { MultipleChoice } from './MultipleChoice';
import { FillBlank } from './FillBlank';
import { FeedbackOverlay } from './FeedbackOverlay';
import { HintPanel } from './HintPanel';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (correct: boolean) => void;
  onNext: () => void;
  easyMode?: boolean;
}

export function QuestionCard({
  question, questionNumber, totalQuestions, onAnswer, onNext, easyMode,
}: QuestionCardProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [typed, setTyped] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [choices, setChoices] = useState<string[]>([]);
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    setSelected(null);
    setTyped('');
    setSubmitted(false);
    setCorrect(false);
    setAnswered(false);
    if (question.type === 'multiple-choice' || question.type === 'tap-correct') {
      setChoices(getAnswerChoices(question));
    }
  }, [question.id]);

  const submit = () => {
    if (answered) return;
    const userAnswer = question.type === 'fill-blank' ? typed : (selected ?? '');
    if (!userAnswer.trim()) return;

    const isCorrect = checkAnswer(question, userAnswer);
    setCorrect(isCorrect);
    setSubmitted(true);
    setAnswered(true);
    onAnswer(isCorrect);
  };

  const difficultyColor: Record<string, 'green' | 'blue' | 'rose'> = {
    easy: 'green', solid: 'blue', stretch: 'rose',
  };

  return (
    <div className="space-y-5 animate-slide-up">
      {/* Progress */}
      <div className="space-y-2">
        <ProgressBar
          value={(questionNumber / totalQuestions) * 100}
          height="sm"
          color="bg-brand-500"
        />
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400 font-medium">
            Question {questionNumber} of {totalQuestions}
          </span>
          <Badge color={difficultyColor[question.difficulty] ?? 'gray'} size="sm">
            {question.difficulty}
          </Badge>
        </div>
      </div>

      {/* Question prompt */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
        <p className="text-lg font-semibold text-gray-800 leading-relaxed math">
          {question.prompt}
        </p>
      </div>

      {/* Input */}
      {(question.type === 'multiple-choice' || question.type === 'tap-correct') && (
        <MultipleChoice
          choices={choices}
          selected={selected}
          correct={question.correctAnswer}
          submitted={submitted}
          onSelect={setSelected}
        />
      )}
      {question.type === 'fill-blank' && (
        <FillBlank
          value={typed}
          onChange={setTyped}
          onSubmit={submit}
          submitted={submitted}
          correct={correct}
        />
      )}

      {/* Hint */}
      {!submitted && <HintPanel hint={question.hint} />}

      {/* Submit button */}
      {!submitted && (
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={submit}
          disabled={question.type === 'fill-blank' ? !typed.trim() : !selected}
        >
          Check my answer ✓
        </Button>
      )}

      {/* Feedback */}
      {submitted && (
        <FeedbackOverlay
          correct={correct}
          correctAnswer={question.correctAnswer}
          explanation={question.explanation}
          onNext={onNext}
        />
      )}
    </div>
  );
}
