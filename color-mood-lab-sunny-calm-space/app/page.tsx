'use client';

import { useState, type CSSProperties } from 'react';

type MoodKey = 'sunny' | 'calm' | 'space';

type Mood = {
  index: string;
  name: string;
  note: string;
  heading: string;
  description: string;
  emoji: string;
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
    index: '01',
    name: 'Sunny',
    note: 'warm / open / bright',
    heading: 'Let some light in.',
    description:
      'A golden, high-energy palette for ideas that want to be noticed and shared.',
    emoji: '☀️',
    colors: {
      canvas: '#F5C947',
      ink: '#28220D',
      surface: '#FFF7D6',
      signal: '#D9482B',
    },
    cssVars: {
      '--canvas': '#F5C947',
      '--ink': '#28220D',
      '--muted': '#6F5B1B',
      '--surface': '#FFF7D6',
      '--surface-strong': '#FFFCEB',
      '--signal': '#D9482B',
      '--signal-contrast': '#FFF7D6',
      '--line': '#D09F24',
      '--shadow': 'rgba(88, 62, 5, 0.18)',
      '--wash': 'rgba(255, 247, 214, 0.64)',
    },
  },
  calm: {
    index: '02',
    name: 'Calm',
    note: 'soft / spacious / steady',
    heading: 'Make room for quiet.',
    description:
      'A sea-glass palette with enough breathing room for slower thoughts and softer edges.',
    emoji: '🌊',
    colors: {
      canvas: '#B4DED8',
      ink: '#173C3B',
      surface: '#ECF8F3',
      signal: '#1D7270',
    },
    cssVars: {
      '--canvas': '#B4DED8',
      '--ink': '#173C3B',
      '--muted': '#47716D',
      '--surface': '#ECF8F3',
      '--surface-strong': '#F9FFFC',
      '--signal': '#1D7270',
      '--signal-contrast': '#ECF8F3',
      '--line': '#83B9B2',
      '--shadow': 'rgba(18, 77, 76, 0.14)',
      '--wash': 'rgba(236, 248, 243, 0.68)',
    },
  },
  space: {
    index: '03',
    name: 'Space',
    note: 'deep / electric / curious',
    heading: 'Leave room for wonder.',
    description:
      'A deep-indigo palette for the big questions, bright sparks, and strange new ideas.',
    emoji: '🪐',
    colors: {
      canvas: '#1B1747',
      ink: '#F8F4FF',
      surface: '#302B68',
      signal: '#D3BFFF',
    },
    cssVars: {
      '--canvas': '#1B1747',
      '--ink': '#F8F4FF',
      '--muted': '#B6AFD7',
      '--surface': '#302B68',
      '--surface-strong': '#3B3476',
      '--signal': '#D3BFFF',
      '--signal-contrast': '#1B1747',
      '--line': '#625B9F',
      '--shadow': 'rgba(6, 5, 27, 0.35)',
      '--wash': 'rgba(48, 43, 104, 0.76)',
    },
  },
};

const moodOrder: MoodKey[] = ['sunny', 'calm', 'space'];

function ColorToken({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <li className="color-token">
      <span className="color-swatch" style={{ backgroundColor: color }} aria-hidden="true" />
      <span className="color-token-copy">
        <span className="color-token-label">{label}</span>
        <span className="color-token-value">{value}</span>
      </span>
    </li>
  );
}

export default function Home() {
  const [activeMood, setActiveMood] = useState<MoodKey>('sunny');
  const mood = moods[activeMood];

  return (
    <main className="mood-lab" style={mood.cssVars as CSSProperties}>
      <div className="background-grid" aria-hidden="true" />
      <div className={`background-orb background-orb-${activeMood}`} aria-hidden="true" />

      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Color Mood Lab home">
          <span className="wordmark-mark" aria-hidden="true">
            ✦
          </span>
          <span>Color Mood Lab</span>
        </a>
        <p className="header-meta">Palette study / 03 moods</p>
      </header>

      <div className="lab-shell" id="top">
        <section className="hero" aria-labelledby="mood-heading">
          <div className="hero-copy">
            <p className="eyebrow">Color / mood / study</p>

            <div className="mood-symbol" aria-hidden="true">
              <span className="mood-symbol-ring" />
              <span className="mood-emoji" key={mood.emoji}>
                {mood.emoji}
              </span>
            </div>

            <p className="active-label" aria-live="polite">
              <span className="signal-dot" aria-hidden="true" />
              Now exploring <strong>{mood.name}</strong>
            </p>

            <h1 id="mood-heading" key={mood.heading}>
              {mood.heading}
            </h1>
            <p className="hero-description">{mood.description}</p>

            <div className="hero-note">
              <span className="hero-note-label">The experiment</span>
              <p>Pick a feeling. The whole page follows.</p>
            </div>
          </div>

          <section className="control-card" aria-labelledby="mood-controls">
            <div className="control-heading">
              <div>
                <p className="eyebrow">Choose your state</p>
                <h2 id="mood-controls">Change the mood</h2>
              </div>
              <span className="option-count">3 options</span>
            </div>

            <div className="mood-buttons" role="group" aria-label="Choose a color mood">
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
                    style={{
                      '--button-accent': option.colors.signal,
                      '--button-surface': option.colors.surface,
                    } as CSSProperties}
                  >
                    <span className="button-index">{option.index}</span>
                    <span className="button-copy">
                      <span className="button-name">{option.name}</span>
                      <span className="button-note">{option.note}</span>
                    </span>
                    <span className="button-arrow" aria-hidden="true">
                      {isSelected ? '●' : '↗'}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="selection-status" role="status" aria-live="polite">
              <span className="selection-status-label">Active palette</span>
              <strong>{mood.name}</strong>
              <span className="selection-status-mark" aria-hidden="true">
                ✓
              </span>
            </div>
          </section>
        </section>

        <section className="contract-card" aria-labelledby="color-contract">
          <div className="contract-heading">
            <div>
              <p className="eyebrow">The promise</p>
              <h2 id="color-contract">Color contract</h2>
            </div>
            <p>
              Four roles keep the interface legible while the atmosphere changes.
            </p>
          </div>

          <ul className="token-grid" aria-label={`${mood.name} color tokens`}>
            <ColorToken label="Canvas" value={mood.colors.canvas} color={mood.colors.canvas} />
            <ColorToken label="Ink" value={mood.colors.ink} color={mood.colors.ink} />
            <ColorToken label="Surface" value={mood.colors.surface} color={mood.colors.surface} />
            <ColorToken label="Signal" value={mood.colors.signal} color={mood.colors.signal} />
          </ul>
        </section>
      </div>

      <footer className="site-footer">
        <span>Color Mood Lab / 001</span>
        <span>Three moods. One system.</span>
      </footer>
    </main>
  );
}
