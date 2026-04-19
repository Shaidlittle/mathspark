export type TopicId =
  | 'algebra-basics'
  | 'simplifying'
  | 'multiplication-powers'
  | 'division-roots-substitution'
  | 'equations'
  | 'variables-both-sides'
  | 'extensions';

export type Difficulty = 'easy' | 'solid' | 'stretch';
export type QuestionType = 'multiple-choice' | 'fill-blank' | 'tap-correct';
export type Mood = 'ready' | 'tired' | 'easy-mode';

export interface Question {
  id: string;
  topic: TopicId;
  subtopic: string;
  difficulty: Difficulty;
  type: QuestionType;
  prompt: string;
  correctAnswer: string;
  distractors?: string[];
  hint: string;
  explanation: string;
  errorTag: string;
}

export interface LessonExample {
  problem: string;
  steps: string[];
  answer: string;
}

export interface LessonCard {
  id: string;
  title: string;
  explanation: string;
  keyPoints: string[];
  examples: LessonExample[];
  commonMistake: string;
  checkpointQuestion: Question;
}

export interface Topic {
  id: TopicId;
  title: string;
  shortTitle: string;
  description: string;
  icon: string;
  color: string;       // Tailwind bg class
  bgColor: string;     // light bg
  textColor: string;
  borderColor: string;
  accentHex: string;
  subtopics: string[];
  lessonCards: LessonCard[];
  weekNumber: number;
}

export interface MistakeEntry {
  questionId: string;
  topic: TopicId;
  subtopic: string;
  errorTag: string;
  question: string;
  userAnswer: string;
  correctAnswer: string;
  timestamp: number;
  fixed: boolean;
}

export interface SessionEntry {
  date: string;
  topicsStudied: TopicId[];
  questionsAnswered: number;
  correctAnswers: number;
  durationMs: number;
}

export interface TestScore {
  testId: string;
  testTitle: string;
  score: number;
  total: number;
  date: string;
  percentage: number;
  answers: Record<string, { userAnswer: string; correct: boolean }>;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: number;
}

export interface ProgressData {
  completedLessons: string[];
  quizScores: Partial<Record<TopicId, number[]>>;
  streaks: { current: number; best: number; lastDate: string };
  mistakes: MistakeEntry[];
  masteryByTopic: Partial<Record<TopicId, number>>;
  preferences: {
    easyMode: boolean;
    focusMode: boolean;
    reducedMotion: boolean;
  };
  sessionHistory: SessionEntry[];
  testScores: TestScore[];
  badges: Badge[];
  totalXP: number;
  mood: Mood | null;
  moodDate: string;
  questionAttempts: Record<string, { correct: number; total: number }>;
  lastActive: string;
}

export interface MiniTest {
  id: string;
  title: string;
  description: string;
  topics: TopicId[];
  questions: Question[];
  timeLimit?: number; // minutes
}

export const ALL_TOPIC_IDS: TopicId[] = [
  'algebra-basics',
  'simplifying',
  'multiplication-powers',
  'division-roots-substitution',
  'equations',
  'variables-both-sides',
  'extensions',
];

export const TOPIC_LABELS: Record<TopicId, string> = {
  'algebra-basics':               'Algebra Basics',
  'simplifying':                  'Simplifying',
  'multiplication-powers':        'Multiplication & Powers',
  'division-roots-substitution':  'Division, Roots & Substitution',
  'equations':                    'Equations',
  'variables-both-sides':         'Variables on Both Sides',
  'extensions':                   'Extensions',
};

export const ERROR_TAGS = {
  MIXED_TERMS:        'mixed-terms-confusion',
  DISTRIBUTIVE:       'distributive-law-error',
  INVERSE_OP:         'forgot-inverse-operation',
  SUBSTITUTION:       'substitution-mistake',
  LIKE_TERMS:         'like-terms-error',
  EXPONENT_RULE:      'exponent-rule-error',
  SIGN_ERROR:         'sign-error',
  COEFFICIENT:        'coefficient-error',
  VARIABLE_BOTH:      'variables-both-sides-error',
  WORD_TRANSLATE:     'word-translation-error',
} as const;
