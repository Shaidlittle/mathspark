import { ProgressData, TopicId, MistakeEntry, TestScore, Badge, SessionEntry, Mood } from '@/types';

const STORAGE_KEY = 'mathspark_progress_v1';

export const DEFAULT_PROGRESS: ProgressData = {
  completedLessons:  [],
  quizScores:        {},
  streaks:           { current: 0, best: 0, lastDate: '' },
  mistakes:          [],
  masteryByTopic:    {},
  preferences:       { easyMode: false, focusMode: false, reducedMotion: false },
  sessionHistory:    [],
  testScores:        [],
  badges:            [],
  totalXP:           0,
  mood:              null,
  moodDate:          '',
  questionAttempts:  {},
  lastActive:        '',
};

export function loadProgress(): ProgressData {
  if (typeof window === 'undefined') return DEFAULT_PROGRESS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_PROGRESS };
    return { ...DEFAULT_PROGRESS, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_PROGRESS };
  }
}

export function saveProgress(data: ProgressData): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch { /* storage full — silently ignore */ }
}

export function resetProgress(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}

// ── Mastery ──────────────────────────────────────────────────────────────────

/** Score is 0–100. Mastery is a weighted rolling average. */
export function computeMastery(scores: number[]): number {
  if (!scores.length) return 0;
  const recent = scores.slice(-5); // last 5 quiz scores for topic
  const avg = recent.reduce((a, b) => a + b, 0) / recent.length;
  return Math.round(avg);
}

// ── Streak ───────────────────────────────────────────────────────────────────

export function todayStr(): string {
  return new Date().toISOString().split('T')[0];
}

export function updateStreak(data: ProgressData): ProgressData {
  const today = todayStr();
  if (data.streaks.lastDate === today) return data;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yStr = yesterday.toISOString().split('T')[0];

  const newCurrent = data.streaks.lastDate === yStr ? data.streaks.current + 1 : 1;
  const newBest    = Math.max(newCurrent, data.streaks.best);

  return {
    ...data,
    streaks: { current: newCurrent, best: newBest, lastDate: today },
    lastActive: today,
  };
}

// ── XP ───────────────────────────────────────────────────────────────────────

export const XP_VALUES = {
  correctAnswer:   10,
  perfectQuiz:     50,
  lessonComplete:  25,
  streak3:         30,
  streak7:         100,
  testPass:        75,
} as const;

// ── Badges ───────────────────────────────────────────────────────────────────

export const BADGE_DEFINITIONS: Record<string, Omit<Badge, 'earnedAt'>> = {
  first_correct:   { id: 'first_correct',   name: 'First Spark!',       description: 'Got your first correct answer', icon: '⚡' },
  streak_3:        { id: 'streak_3',         name: 'On a Roll',          description: '3-day streak',                  icon: '🔥' },
  streak_7:        { id: 'streak_7',         name: 'Week Warrior',       description: '7-day streak',                  icon: '🏆' },
  topic_master:    { id: 'topic_master',     name: 'Topic Master',       description: 'Mastered a full topic',         icon: '🌟' },
  perfect_quiz:    { id: 'perfect_quiz',     name: 'Perfect Round',      description: '5/5 in a practice session',     icon: '💎' },
  error_fixer:     { id: 'error_fixer',      name: 'Mistake Crusher',    description: 'Fixed 5 mistakes',              icon: '🛠️' },
  challenger:      { id: 'challenger',       name: 'Challenger',         description: 'Completed Challenge Mode',      icon: '🎯' },
  xp_100:          { id: 'xp_100',           name: 'Power-Up',           description: 'Earned 100 XP',                icon: '⭐' },
  xp_500:          { id: 'xp_500',           name: 'Algebra Hero',       description: 'Earned 500 XP',                icon: '🦸' },
};

export function checkAndAwardBadges(data: ProgressData): { data: ProgressData; newBadges: Badge[] } {
  const earned = new Set(data.badges.map(b => b.id));
  const newBadges: Badge[] = [];

  function award(id: string) {
    if (earned.has(id)) return;
    const def = BADGE_DEFINITIONS[id];
    if (!def) return;
    const badge: Badge = { ...def, earnedAt: Date.now() };
    newBadges.push(badge);
    earned.add(id);
  }

  const totalCorrect = Object.values(data.questionAttempts).reduce((s, a) => s + a.correct, 0);
  if (totalCorrect >= 1)   award('first_correct');
  if (data.streaks.current >= 3)  award('streak_3');
  if (data.streaks.current >= 7)  award('streak_7');
  if (data.totalXP >= 100) award('xp_100');
  if (data.totalXP >= 500) award('xp_500');

  const perfectQuizzes = Object.values(data.quizScores).flat().filter(s => s === 100);
  if (perfectQuizzes.length >= 1) award('perfect_quiz');

  const fixedMistakes = data.mistakes.filter(m => m.fixed);
  if (fixedMistakes.length >= 5) award('error_fixer');

  const masteredTopics = Object.values(data.masteryByTopic).filter(m => (m ?? 0) >= 80);
  if (masteredTopics.length >= 1) award('topic_master');

  if (!newBadges.length) return { data, newBadges };

  return {
    data: { ...data, badges: [...data.badges, ...newBadges] },
    newBadges,
  };
}

// ── Session logging ──────────────────────────────────────────────────────────

export function logSession(data: ProgressData, session: Omit<SessionEntry, 'date'>): ProgressData {
  const entry: SessionEntry = { ...session, date: todayStr() };
  return {
    ...data,
    sessionHistory: [...data.sessionHistory.slice(-29), entry], // keep last 30
  };
}
