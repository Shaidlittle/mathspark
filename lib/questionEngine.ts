import { Question, TopicId, Difficulty } from '@/types';
import { allQuestions } from '@/data/questions';

export function getQuestionsByTopic(topicId: TopicId): Question[] {
  return allQuestions.filter(q => q.topic === topicId);
}

export function getQuestionsByDifficulty(topicId: TopicId, difficulty: Difficulty): Question[] {
  return allQuestions.filter(q => q.topic === topicId && q.difficulty === difficulty);
}

export function getQuizQuestions(topicId: TopicId, count = 5, difficulty?: Difficulty): Question[] {
  let pool = difficulty
    ? getQuestionsByDifficulty(topicId, difficulty)
    : getQuestionsByTopic(topicId);

  if (!pool.length) pool = getQuestionsByTopic(topicId);
  return shuffle(pool).slice(0, count);
}

export function getMixedQuestions(topicIds: TopicId[], count = 10): Question[] {
  const pool = allQuestions.filter(q => topicIds.includes(q.topic));
  return shuffle(pool).slice(0, count);
}

export function getErrorQuestions(questionIds: string[]): Question[] {
  const idSet = new Set(questionIds);
  return allQuestions.filter(q => idSet.has(q.id));
}

export function getAnswerChoices(q: Question): string[] {
  if (q.type !== 'multiple-choice') return [];
  const choices = [q.correctAnswer, ...(q.distractors ?? [])];
  return shuffle(choices);
}

export function checkAnswer(q: Question, userAnswer: string): boolean {
  return normalise(q.correctAnswer) === normalise(userAnswer);
}

export function getDifficultyForMood(mood: 'ready' | 'tired' | 'easy-mode' | null): Difficulty {
  if (mood === 'tired' || mood === 'easy-mode') return 'easy';
  return 'solid';
}

function normalise(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, ' ');
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
