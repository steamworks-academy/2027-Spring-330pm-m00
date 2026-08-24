'use client';

import { useState, type CSSProperties } from 'react';

type MoodKey = 'sunny' | 'calm' | 'space' | 'bloom';

type Mood = {
  label: string;
  name: string;
  heading: string;
  description: string;
  emoji: string;
  note: string;
  colors: {
    canvas: string;
    ink: string;
    surface: string;
    signal: string;
  };
  cssVars: Record<string, string>;
};

const moods: Record<MoodKey, Mood> = {
  sunny: {
    label: '01 / Sunny',
    name: 'Sunny',
    heading: 'Let the light in.',
    description:
      'A warm, optimistic palette for ideas that want to be seen and shared.',
    emoji: '☀️',
    note: 'warm + optimistic',
    colors: {
      canvas: '#F6CF4A',
      ink: '#202417',
      surface: '#FFF8DE',
      signal: '#E45A32',
    },
    cssVars: {
      '--canvas': '#F6CF4A',
      '--ink': '#202417',
      '--ink-muted': '#5E5C28',
      '--surface': '#FFF8DE',
      '--surface-strong': '#FFFDF1',
      '--signal': '#E45A32',
      '--signal-contrast': '#FFF8DE',
      '--line': '#C7A92F',
      '--soft-line': '#DEC75C',
      '--shadow': 'rgba(92, 71, 6, 0.18)',
      '--wash': 'rgba(255, 248, 222, 0.55)',
    },
  },
  calm: {
    label: '02 / Calm',
    name: 'Calm',
    heading: 'Find your quiet.',
    description:
      'A spacious, sea-glass palette for slower thoughts and softer edges.',
    emoji: '🌊',
    note: 'soft + steady',
    colors: {
      canvas: '#B7E0DB',
      ink: '#163A3B',
      surface: '#ECF8F1',
      signal: '#207D7A',
    },
    cssVars: {
      '--canvas': '#B7E0DB',
      '--ink': '#163A3B',
      '--ink-muted': '#47706E',
      '--surface': '#ECF8F1',
      '--surface-strong': '#F8FCF8',
      '--signal': '#207D7A',
      '--signal-contrast': '#ECF8F1',
      '--line': '#86B9B2',
      '--soft-line': '#A9D2CB',
      '--shadow': 'rgba(20, 84, 82, 0.15)',
      '--wash': 'rgba(236, 248, 241, 0.6)',
    },
  },
  space: {
    label: '03 / Space',
    name: 'Space',
    heading: 'Make room for wonder.',
    description:
      'A deep, electric palette for the big questions and the strange new ideas.',
    emoji: '🪐',
    note: 'deep + electric',
    colors: {
      canvas: '#211D4C',
      ink: '#F8F4FF',
      surface: '#302B63',
      signal: '#C6B5FF',
    },
    cssVars: {
      '--canvas': '#211D4C',
      '--ink': '#F8F4FF',
      '--ink-muted': '#B6AFD4',
      '--surface': '#302B63',
      '--surface-strong': '#3B3473',
      '--signal': '#C6B5FF',
      '--signal-contrast': '#211D4C',
      '--line': '#625B9A',
      '--soft-line': '#4A4380',
      '--shadow': 'rgba(9, 7, 33, 0.35)',
      '--wash': 'rgba(48, 43, 99, 0.72)',
    },
  },
  bloom: {
    label: '04 / Bloom',
    name: 'Bloom',
    heading: 'Make something tender.',
    description:
      'A blush-and-berry palette for gentle momentum and ideas in full color.',
    emoji: '🌸',
    note: 'tender + alive',
    colors: {
      canvas: '#F2B8B8',
      ink: '#381F34',
      surface: '#FFF1E6',
      signal: '#B63D6D',
    },
    cssVars: {
      '--canvas': '#F2B8B8',
      '--ink': '#381F34',
      '--ink-muted': '#76505F',
      '--surface': '#FFF1E6',
      '--surface-strong': '#FFF9F2',
      '--signal': '#B63D6D',
      '--signal-contrast': '#FFF1E6',
      '--line': '#CC8497',
      '--soft-line': '#DDA4B2',
      '--shadow': 'rgba(111, 43, 73, 0.18)',
      '--wash': 'rgba(255, 241, 230, 0.63)',
    },
  },
};

const moodOrder: MoodKey[] = ['sunny', 'calm', 'space', 'bloom'];

export default function Home() {
  const [activeMood, setActiveMood] = useState<MoodKey>('sunny');
  const mood = moods[activeMood];

  return (
    <main className="mood-lab" style={mood.cssVars as CSSProperties}>
      <div className="orb orb-one" aria-hidden="true" />
      <div className="orb orb-two" aria-hidden="true" />

      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Color Mood Lab home">
          <span className="wordmark-mark" aria-hidden="true">
            ◐
          </span>
          <span>Color Mood Lab</span>
        </a>
        <p className="header-note">Four palettes. One tiny experiment.</p>
      </header>

      <div className="lab-grid" id="top">
        <section className="intro-panel" aria-labelledby="mood-heading">
          <p className="eyebrow">A small study in atmosphere</p>
          <div className="emoji-orbit" aria-hidden="true">
            <span className="emoji-orbit-ring" />
            <span className="mood-emoji" key={mood.emoji}>
              {mood.emoji}
            </span>
          </div>
          <p className="active-label" aria-live="polite">
            Now exploring <span>{mood.name}</span>
          </p>
          <h1 id="mood-heading" key={mood.heading}>
            {mood.heading}
          </h1>
          <p className="intro-copy">{mood.description}</p>
          <div className="mini-rule" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <p className="prompt">
            Change the feeling.
            <br />
            The whole page follows.
          </p>
        </section>

        <section className="control-panel" aria-labelledby="choose-mood">
          <div className="section-heading">
            <div>
              <p className="eyebrow">The controls</p>
              <h2 id="choose-mood">Choose a mood</h2>
            </div>
            <span className="count-badge">04 options</span>
          </div>

          <div className="mood-list" role="group" aria-label="Mood choices">
            {moodOrder.map((key) => {
              const option = moods[key];
              const isSelected = key === activeMood;

              return (
                <button
                  className={`mood-button ${isSelected ? 'is-selected' : ''}`}
                  key={key}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setActiveMood(key)}
                >
                  <span className="button-index">{option.label}</span>
                  <span className="button-name">{option.name}</span>
                  <span className="button-note">{option.note}</span>
                  <span className="button-arrow" aria-hidden="true">
                    {isSelected ? '✓' : '↗'}
                  </span>
                </button>
              );
            })}
          </div>

          <p className="control-hint">
            <span className="hint-dot" aria-hidden="true" />
            Active palette: <strong>{mood.name}</strong>
          </p>
        </section>
      </div>

      <section className="contract-card" aria-labelledby="color-contract">
        <div className="contract-heading">
          <div>
            <p className="eyebrow">The promise</p>
            <h2 id="color-contract">Color contract</h2>
          </div>
          <p className="contract-description">
            Every mood keeps the same roles — only the feeling changes.
          </p>
        </div>

        <div className="token-grid">
          <ColorToken label="Canvas" value={mood.colors.canvas} color={mood.colors.canvas} />
          <ColorToken label="Ink" value={mood.colors.ink} color={mood.colors.ink} />
          <ColorToken label="Surface" value={mood.colors.surface} color={mood.colors.surface} />
          <ColorToken label="Signal" value={mood.colors.signal} color={mood.colors.signal} />
        </div>
      </section>

      <footer className="site-footer">
        <span>CM—001</span>
        <span>Designed to feel different.</span>
        <span>Scroll less. Notice more.</span>
      </footer>
    </main>
  );
}

function ColorToken({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="color-token">
      <span className="token-swatch" style={{ backgroundColor: color }} aria-hidden="true" />
      <span className="token-label">{label}</span>
      <span className="token-value">{value}</span>
    </div>
  );
}
