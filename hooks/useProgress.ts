'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  ProgressData, TopicId, MistakeEntry, TestScore, Mood,
} from '@/types';
import {
  loadProgress, saveProgress, DEFAULT_PROGRESS,
  updateStreak, computeMastery, XP_VALUES,
  checkAndAwardBadges, logSession,
} from '@/lib/storage';

export function useProgress() {
  const [progress, setProgress] = useState<ProgressData>(DEFAULT_PROGRESS);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const loaded = loadProgress();
    setProgress(loaded);
    setHydrated(true);
  }, []);

  const update = useCallback((updater: (prev: ProgressData) => ProgressData) => {
    setProgress(prev => {
      const next = updater(prev);
      saveProgress(next);
      return next;
    });
  }, []);

  // ── Streak ─────────────────────────────────────────────────────────────────
  const touchStreak = useCallback(() => {
    update(prev => updateStreak(prev));
  }, [update]);

  // ── Lessons ────────────────────────────────────────────────────────────────
  const completeLesson = useCallback((lessonId: string) => {
    update(prev => {
      if (prev.completedLessons.includes(lessonId)) return prev;
      let next = { ...prev, completedLessons: [...prev.completedLessons, lessonId] };
      next = { ...next, totalXP: next.totalXP + XP_VALUES.lessonComplete };
      const { data } = checkAndAwardBadges(next);
      return data;
    });
    touchStreak();
  }, [update, touchStreak]);

  // ── Questions ──────────────────────────────────────────────────────────────
  const recordAnswer = useCallback((questionId: string, correct: boolean) => {
    update(prev => {
      const prevAttempt = prev.questionAttempts[questionId] ?? { correct: 0, total: 0 };
      const next: ProgressData = {
        ...prev,
        questionAttempts: {
          ...prev.questionAttempts,
          [questionId]: {
            correct: prevAttempt.correct + (correct ? 1 : 0),
            total: prevAttempt.total + 1,
          },
        },
        totalXP: prev.totalXP + (correct ? XP_VALUES.correctAnswer : 0),
      };
      const { data } = checkAndAwardBadges(next);
      return data;
    });
  }, [update]);

  const recordMistake = useCallback((mistake: MistakeEntry) => {
    update(prev => ({
      ...prev,
      mistakes: [
        ...prev.mistakes.filter(m => m.questionId !== mistake.questionId),
        mistake,
      ],
    }));
  }, [update]);

  const fixMistake = useCallback((questionId: string) => {
    update(prev => ({
      ...prev,
      mistakes: prev.mistakes.map(m =>
        m.questionId === questionId ? { ...m, fixed: true } : m
      ),
    }));
  }, [update]);

  // ── Quiz scores ────────────────────────────────────────────────────────────
  const saveQuizScore = useCallback((topicId: TopicId, score: number) => {
    update(prev => {
      const prevScores = prev.quizScores[topicId] ?? [];
      const newScores  = [...prevScores, score];
      const mastery    = computeMastery(newScores);
      let next: ProgressData = {
        ...prev,
        quizScores:     { ...prev.quizScores, [topicId]: newScores },
        masteryByTopic: { ...prev.masteryByTopic, [topicId]: mastery },
        totalXP: prev.totalXP + (score === 100 ? XP_VALUES.perfectQuiz : 0),
      };
      const { data } = checkAndAwardBadges(next);
      return data;
    });
    touchStreak();
  }, [update, touchStreak]);

  // ── Test scores ────────────────────────────────────────────────────────────
  const saveTestScore = useCallback((score: TestScore) => {
    update(prev => {
      let next: ProgressData = {
        ...prev,
        testScores: [...prev.testScores, score],
        totalXP: prev.totalXP + (score.percentage >= 60 ? XP_VALUES.testPass : 0),
      };
      const { data } = checkAndAwardBadges(next);
      return data;
    });
    touchStreak();
  }, [update, touchStreak]);

  // ── Preferences ────────────────────────────────────────────────────────────
  const setEasyMode = useCallback((val: boolean) => {
    update(prev => ({ ...prev, preferences: { ...prev.preferences, easyMode: val } }));
  }, [update]);

  const setFocusMode = useCallback((val: boolean) => {
    update(prev => ({ ...prev, preferences: { ...prev.preferences, focusMode: val } }));
  }, [update]);

  const setMood = useCallback((mood: Mood) => {
    const today = new Date().toISOString().split('T')[0];
    update(prev => ({ ...prev, mood, moodDate: today }));
    if (mood === 'easy-mode') setEasyMode(true);
  }, [update, setEasyMode]);

  // ── Session ────────────────────────────────────────────────────────────────
  const endSession = useCallback((session: { topicsStudied: TopicId[]; questionsAnswered: number; correctAnswers: number; durationMs: number }) => {
    update(prev => logSession(prev, session));
  }, [update]);

  // ── Reset ──────────────────────────────────────────────────────────────────
  const resetAll = useCallback(() => {
    setProgress({ ...DEFAULT_PROGRESS });
    if (typeof window !== 'undefined') localStorage.removeItem('mathspark_progress_v1');
  }, []);

  return {
    progress,
    hydrated,
    completeLesson,
    recordAnswer,
    recordMistake,
    fixMistake,
    saveQuizScore,
    saveTestScore,
    setEasyMode,
    setFocusMode,
    setMood,
    endSession,
    touchStreak,
    resetAll,
  };
}
