# MathSpark — Run & Deploy Guide

## Run locally

```bash
cd mathspark
npm install
npm run dev
# Open http://localhost:3000
```

## Build for production

```bash
npm run build
npm start
```

## Deploy to Vercel (recommended — free)

### Option A: Vercel CLI
```bash
npm i -g vercel
vercel login
vercel --prod
```

### Option B: Vercel Dashboard
1. Push the `mathspark/` folder to a GitHub repo
2. Go to https://vercel.com → New Project
3. Import your GitHub repo
4. Root Directory: `mathspark` (or `.` if it's the repo root)
5. Framework Preset: Next.js (auto-detected)
6. Click Deploy

Vercel auto-deploys on every git push. No environment variables required for the localStorage-only version.

---

## Folder structure

```
mathspark/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Home / Dashboard
│   ├── learn/              # Learning hub + topic lessons
│   ├── practice/           # Practice sessions per topic
│   ├── challenge/          # Gamified 5-question rounds
│   ├── errors/             # Mistake log + fix-my-mistakes mode
│   ├── progress/           # Mastery bars, streaks, badges
│   ├── tests/              # Mini tests + full term test
│   └── tutor/              # Parent/teacher summary view
├── components/
│   ├── ui/                 # Button, Card, Badge, ProgressBar, MovementBreak
│   ├── layout/             # NavBar, BottomNav
│   ├── home/               # MoodCheck, MasteryMap
│   ├── learn/              # ConceptCard (learn+example+checkpoint)
│   └── practice/           # QuestionCard, MultipleChoice, FillBlank, etc.
├── data/
│   ├── topics.ts           # 7 topic definitions with lesson cards
│   ├── tests.ts            # 9 mini tests incl. 2 mixed + 1 full term
│   └── questions/          # 175+ seeded questions (25 per topic)
├── hooks/
│   └── useProgress.ts      # All localStorage state management
├── lib/
│   ├── storage.ts          # Raw localStorage read/write, XP, badges, streaks
│   └── questionEngine.ts   # Filtering, shuffling, checking answers
└── types/index.ts          # All TypeScript types
```

---

## Future feature ideas

1. **Firebase sync** — swap `lib/storage.ts` reads/writes for Firestore; the hook interface stays the same
2. **Teacher class view** — multiple learner profiles, class average mastery
3. **Spaced repetition** — SM-2 algorithm to schedule question reviews
4. **Audio read-aloud** — Web Speech API for accessibility
5. **Drag-and-match** questions — animated term-sorting UI
6. **Parent weekly email digest** — summary of the week's progress
7. **Offline mode (PWA)** — service worker + cache for full offline use
8. **Adaptive difficulty** — auto-adjust based on rolling accuracy
9. **More subjects** — extend to geometry, number, data handling
10. **Leaderboard** — anonymous class ranking for motivation
