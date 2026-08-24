'use client';

import { useEffect, useState } from 'react';

const heroes = [
  { emoji: '🐙', name: 'a tap-dancing octopus' },
  { emoji: '🧙🏽‍♀️', name: 'a forgetful young wizard' },
  { emoji: '🤖', name: 'a tiny helpful robot' },
  { emoji: '🐉', name: 'a dragon who loves daisies' },
  { emoji: '🦸🏻', name: 'a superhero in fuzzy slippers' },
  { emoji: '🐿️', name: 'a brave squirrel detective' },
  { emoji: '👽', name: 'a giggly space explorer' },
  { emoji: '🦄', name: 'a unicorn who tells jokes' },
];

const places = [
  { emoji: '🏰', name: 'inside a bouncy castle' },
  { emoji: '🌙', name: 'at a picnic on the moon' },
  { emoji: '📚', name: 'in a library under the sea' },
  { emoji: '🍦', name: 'in an ice-cream jungle' },
  { emoji: '🚂', name: 'aboard a cloud-powered train' },
  { emoji: '🏕️', name: 'at a camp for friendly monsters' },
  { emoji: '🪐', name: 'on a planet made of pillows' },
  { emoji: '🎪', name: 'backstage at a mouse circus' },
];

const problems = [
  { emoji: '🫧', name: 'all the words have turned into bubbles' },
  { emoji: '🥞', name: 'a pancake is stuck to the ceiling' },
  { emoji: '🧦', name: 'every sock has learned to sing' },
  { emoji: '🐔', name: 'a chicken keeps giving silly directions' },
  { emoji: '🎂', name: 'the birthday cake will not stop hiccuping' },
  { emoji: '👒', name: 'everyone’s hats have swapped owners' },
  { emoji: '🍌', name: 'a banana peel is running for mayor' },
  { emoji: '🌈', name: 'the rainbow has lost its purple stripe' },
];

type Choice = { emoji: string; name: string };

function pickDifferent(list: Choice[], current: Choice) {
  let next = list[Math.floor(Math.random() * list.length)];
  while (next.name === current.name) next = list[Math.floor(Math.random() * list.length)];
  return next;
}

export default function Home() {
  const [hero, setHero] = useState(heroes[0]);
  const [place, setPlace] = useState(places[0]);
  const [problem, setProblem] = useState(problems[0]);
  const [spinning, setSpinning] = useState(false);
  const [copied, setCopied] = useState(false);

  const story = `Once upon a time, ${hero.name} was ${place.name} when suddenly ${problem.name}!`;

  function spin() {
    if (spinning) return;
    setSpinning(true);
    setCopied(false);
    window.setTimeout(() => {
      setHero((current) => pickDifferent(heroes, current));
      setPlace((current) => pickDifferent(places, current));
      setProblem((current) => pickDifferent(problems, current));
    }, 220);
    window.setTimeout(() => setSpinning(false), 520);
  }

  async function copyStory() {
    await navigator.clipboard.writeText(story);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space' && event.target === document.body) {
        event.preventDefault();
        spin();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  return (
    <main>
      <div className="sparkles" aria-hidden="true">
        <span>✦</span><span>★</span><span>✦</span><span>●</span><span>★</span>
      </div>

      <section className="hero-section">
        <div className="eyebrow"><span>✎</span> A tiny idea machine</div>
        <h1>Story <em>Spinner!</em></h1>
        <p className="intro">Three silly ingredients. One brand-new adventure.</p>

        <div className={`spinner ${spinning ? 'is-spinning' : ''}`} aria-live="polite">
          <article className="reel hero-reel">
            <div className="reel-label"><span>01</span> Your hero</div>
            <div className="emoji" aria-hidden="true">{hero.emoji}</div>
            <h2>{hero.name}</h2>
          </article>
          <div className="joiner" aria-hidden="true">+</div>
          <article className="reel place-reel">
            <div className="reel-label"><span>02</span> The place</div>
            <div className="emoji" aria-hidden="true">{place.emoji}</div>
            <h2>{place.name}</h2>
          </article>
          <div className="joiner" aria-hidden="true">+</div>
          <article className="reel problem-reel">
            <div className="reel-label"><span>03</span> The pickle</div>
            <div className="emoji" aria-hidden="true">{problem.emoji}</div>
            <h2>{problem.name}</h2>
          </article>
        </div>

        <button className="spin-button" onClick={spin} disabled={spinning}>
          <span aria-hidden="true">↻</span> {spinning ? 'Whirring…' : 'Spin a story'}
        </button>
        <p className="hint">Tap the button or press the space bar</p>
      </section>

      <section className="story-card" aria-label="Your story starter">
        <div>
          <p className="story-label">Your story starts here…</p>
          <p className="story-text">“{story}”</p>
        </div>
        <button className="copy-button" onClick={copyStory} aria-label="Copy story starter">
          {copied ? 'Copied! ✓' : 'Copy idea'}
        </button>
      </section>

      <footer>
        <span>Made for big imaginations</span>
        <span aria-hidden="true">✦</span>
        <span>Every spin is kid-safe</span>
      </footer>
    </main>
  );
}
