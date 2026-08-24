'use client';

import { useState } from 'react';

type Question = {
  eyebrow: string;
  emoji: string;
  question: string;
  answers: string[];
  correct: number;
  fact: string;
};

const questions: Question[] = [
  {
    eyebrow: 'Ocean explorer',
    emoji: '🐙',
    question: 'How many hearts does an octopus have?',
    answers: ['One', 'Two', 'Three', 'Eight'],
    correct: 2,
    fact: 'An octopus has three hearts! Two pump blood to its gills, while one pumps blood around the rest of its body.',
  },
  {
    eyebrow: 'Speedy spotter',
    emoji: '🐆',
    question: 'Which animal is the fastest runner on land?',
    answers: ['Cheetah', 'Horse', 'Ostrich', 'Lion'],
    correct: 0,
    fact: 'The cheetah is the fastest land animal. It can sprint at highway speeds, but only for a short time.',
  },
  {
    eyebrow: 'Sleep detective',
    emoji: '🦦',
    question: 'Why do sea otters sometimes hold hands while sleeping?',
    answers: ['To stay warm', 'To share food', 'To avoid drifting apart', 'To play a game'],
    correct: 2,
    fact: 'Sea otters may hold paws so they do not drift away from each other while resting in the water. Cozy and clever!',
  },
  {
    eyebrow: 'Wild sounds',
    emoji: '🦒',
    question: 'Which sound can giraffes make?',
    answers: ['A low hum', 'A loud roar', 'A sharp bark', 'No sounds at all'],
    correct: 0,
    fact: 'Giraffes are usually quiet, but researchers have recorded them humming softly, especially at night.',
  },
  {
    eyebrow: 'Amazing abilities',
    emoji: '🦎',
    question: 'What can many geckos do that humans cannot?',
    answers: ['Breathe underwater', 'Walk on ceilings', 'Glow like a lamp', 'Turn into a ball'],
    correct: 1,
    fact: 'Millions of tiny hair-like structures on a gecko’s toes help it cling to walls and even walk across ceilings.',
  },
];

function encouragement(score: number) {
  if (score === 5) return ['Wildlife whiz!', 'Perfect score! Your animal knowledge is roaring.'];
  if (score >= 3) return ['Brilliant explorer!', 'You know a lot about the animal kingdom—and every new fact makes you even sharper.'];
  return ['Curious creature!', 'Great explorers keep learning. You discovered five fascinating animal facts today!'];
}

export default function Home() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);

  const question = questions[questionIndex];
  const isCorrect = selected === question.correct;
  const [finishTitle, finishCopy] = encouragement(score);

  function chooseAnswer(answerIndex: number) {
    if (selected !== null) return;
    setSelected(answerIndex);
    if (answerIndex === question.correct) setScore((current) => current + 1);
  }

  function nextQuestion() {
    if (questionIndex === questions.length - 1) {
      setFinished(true);
      return;
    }
    setQuestionIndex((current) => current + 1);
    setSelected(null);
  }

  function playAgain() {
    setQuestionIndex(0);
    setScore(0);
    setSelected(null);
    setFinished(false);
  }

  return (
    <main className="quiz-shell">
      <div className="sun sun-one" aria-hidden="true" />
      <div className="sun sun-two" aria-hidden="true" />

      <header className="site-header">
        <a className="brand" href="#quiz" aria-label="Wildly Curious Animal Quiz home">
          <span className="brand-mark" aria-hidden="true">W</span>
          <span>
            <strong>Wildly Curious</strong>
            <small>Animal quiz</small>
          </span>
        </a>
        <div className="score-pill" aria-live="polite">
          <span aria-hidden="true">★</span> {score} point{score === 1 ? '' : 's'}
        </div>
      </header>

      <section className="quiz-stage" id="quiz" aria-labelledby="quiz-title">
        {!finished ? (
          <>
            <div className="progress-row">
              <p>Question {questionIndex + 1} of {questions.length}</p>
              <div className="progress-track" aria-hidden="true">
                <span style={{ width: `${((questionIndex + 1) / questions.length) * 100}%` }} />
              </div>
            </div>

            <div className="quiz-card">
              <div className="animal-badge" aria-hidden="true">{question.emoji}</div>
              <p className="eyebrow">{question.eyebrow}</p>
              <h1 id="quiz-title">{question.question}</h1>

              <div className="answers" role="group" aria-label="Answer choices">
                {question.answers.map((answer, index) => {
                  const state = selected === null
                    ? ''
                    : index === question.correct
                      ? 'correct'
                      : index === selected
                        ? 'incorrect'
                        : 'dimmed';
                  return (
                    <button
                      className={`answer ${state}`}
                      key={answer}
                      onClick={() => chooseAnswer(index)}
                      disabled={selected !== null}
                      aria-pressed={selected === index}
                    >
                      <span className="answer-letter">{String.fromCharCode(65 + index)}</span>
                      <span>{answer}</span>
                      {state === 'correct' && <span className="answer-icon" aria-label="Correct">✓</span>}
                      {state === 'incorrect' && <span className="answer-icon" aria-label="Not quite">×</span>}
                    </button>
                  );
                })}
              </div>

              {selected !== null && (
                <div className={`explanation ${isCorrect ? 'right' : 'try-again'}`} role="status" aria-live="polite">
                  <div>
                    <strong>{isCorrect ? 'You got it!' : 'Good guess!'}</strong>
                    <p>{isCorrect ? question.fact : `The answer is ${question.answers[question.correct]}. ${question.fact}`}</p>
                  </div>
                  <button className="next-button" onClick={nextQuestion} autoFocus>
                    {questionIndex === questions.length - 1 ? 'See my score' : 'Next question'} <span aria-hidden="true">→</span>
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="quiz-card finish-card">
            <div className="celebration" aria-hidden="true">🎉</div>
            <p className="eyebrow">Quiz complete</p>
            <h1 id="quiz-title">{finishTitle}</h1>
            <div className="final-score"><strong>{score}</strong><span>out of 5</span></div>
            <p className="finish-copy">{finishCopy}</p>
            <button className="restart-button" onClick={playAgain}>Play again <span aria-hidden="true">↻</span></button>
          </div>
        )}
      </section>

      <footer>
        <span aria-hidden="true">🦋</span> Made for curious minds ages 8–11
      </footer>
    </main>
  );
}
