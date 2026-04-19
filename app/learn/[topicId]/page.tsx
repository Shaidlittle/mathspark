'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useProgress } from '@/hooks/useProgress';
import { getTopicById } from '@/data/topics';
import { ConceptCard } from '@/components/learn/ConceptCard';
import { NavBar } from '@/components/layout/NavBar';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function TopicLearnPage() {
  const params = useParams<{ topicId: string }>();
  const router = useRouter();
  const { progress, completeLesson } = useProgress();
  const [cardIndex, setCardIndex] = useState(0);
  const [finished, setFinished] = useState(false);

  const topic = getTopicById(params.topicId);

  if (!topic) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">Topic not found.</p>
          <Link href="/learn"><Button variant="primary" className="mt-4">Back to Learn</Button></Link>
        </div>
      </div>
    );
  }

  const card = topic.lessonCards[cardIndex];

  const handleNext = () => {
    if (cardIndex < topic.lessonCards.length - 1) {
      setCardIndex(i => i + 1);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    return (
      <div className="min-h-screen pb-10">
        <NavBar xp={progress.totalXP} streak={progress.streaks.current} />
        <main className="max-w-lg mx-auto px-4 pt-12 text-center space-y-6">
          <div className="text-7xl animate-star-pop">🌟</div>
          <h1 className="text-2xl font-bold text-gray-900">Topic Complete!</h1>
          <p className="text-gray-500">You've finished all {topic.lessonCards.length} lessons in <strong>{topic.title}</strong>.</p>
          <div className="flex flex-col gap-3 mt-4">
            <Link href={`/practice/${topic.id}`}>
              <Button variant="primary" size="lg" fullWidth>Practice what I learned ✏️</Button>
            </Link>
            <Link href="/learn">
              <Button variant="outline" size="md" fullWidth>Back to all topics</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-10">
      <NavBar xp={progress.totalXP} streak={progress.streaks.current} />

      {/* Topic header */}
      <div className={`${topic.color} text-white px-4 py-4`}>
        <div className="max-w-lg mx-auto flex items-center gap-3">
          <Link href="/learn" className="text-white/80 hover:text-white text-sm">← Back</Link>
          <span className="text-xl">{topic.icon}</span>
          <h1 className="font-bold text-lg flex-1 truncate">{topic.title}</h1>
        </div>
      </div>

      <main className="max-w-lg mx-auto px-4 pt-6 pb-10">
        <ConceptCard
          card={card}
          cardIndex={cardIndex}
          totalCards={topic.lessonCards.length}
          onComplete={completeLesson}
          onNext={handleNext}
        />
      </main>
    </div>
  );
}
