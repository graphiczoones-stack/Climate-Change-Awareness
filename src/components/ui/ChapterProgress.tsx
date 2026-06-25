import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { SCENES } from '../../utils/scenes';

export const ChapterProgress: React.FC = () => {
  const scrollProgress = useAppStore((s) => s.scrollProgress);
  const activeScene = useAppStore((s) => s.activeScene);
  const isLoaded = useAppStore((s) => s.isLoaded);

  if (!isLoaded) return null;

  const currentSceneIndex = SCENES.findIndex((s) => s.id === activeScene);
  const currentScene = SCENES[currentSceneIndex];
  const accent = currentScene?.accentColor ?? '#00B48A';

  return (
    <>
      {/* Top progress bar */}
      <div
        className="chapter-progress"
        style={{
          width: `${scrollProgress * 100}%`,
          background: `linear-gradient(90deg, ${accent}, #fff2)`,
          transition: 'background 1.5s ease',
        }}
      />

      {/* Chapter indicator — top right */}
      <div
        style={{
          position: 'fixed',
          top: '1.2rem',
          right: '1.5rem',
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          opacity: scrollProgress > 0.02 ? 1 : 0,
          transition: 'opacity 0.6s ease',
        }}
      >
        <div style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.7rem',
          color: 'rgba(255,255,255,0.4)',
          letterSpacing: '0.15em',
        }}>
          {currentSceneIndex + 1} / {SCENES.length}
        </div>
        <div style={{
          width: 4, height: 4,
          borderRadius: '50%',
          background: accent,
          boxShadow: `0 0 6px ${accent}`,
          transition: 'background 1s ease, box-shadow 1s ease',
        }} />
        <div style={{
          fontFamily: 'var(--font-kufi)',
          fontSize: '0.8rem',
          color: 'rgba(255,255,255,0.7)',
          fontWeight: 600,
        }}>
          {currentScene?.label ?? ''}
        </div>
      </div>
    </>
  );
};
