import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useAppStore } from '../../store/useAppStore';
import { SCENE_CONTENT, SCENES } from '../../utils/scenes';

export const SceneOverlay: React.FC = () => {
  const scrollProgress = useAppStore((s) => s.scrollProgress);
  const activeScene = useAppStore((s) => s.activeScene);
  const isLoaded = useAppStore((s) => s.isLoaded);

  const contentRef = useRef<HTMLDivElement>(null);
  const lastScene = useRef<string>('');

  const currentScene = SCENES.find((s) => s.id === activeScene);
  const content = SCENE_CONTENT[activeScene];

  // Animate text in when scene changes
  useEffect(() => {
    if (activeScene === lastScene.current || !contentRef.current) return;
    lastScene.current = activeScene;

    const el = contentRef.current;
    gsap.fromTo(
      el,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );
  }, [activeScene]);

  if (!isLoaded || !content || activeScene === 'landing') return null;

  const accent = currentScene?.accentColor ?? '#00B48A';
  const isRight = true; // Always position on right for RTL
  const isMobile = window.innerWidth < 768;

  return (
    <div
      className="scene-overlay"
      style={{
        alignItems: isMobile ? 'flex-end' : 'center',
        justifyContent: isMobile ? 'center' : 'flex-start',
        padding: isMobile ? '0 1rem 6rem' : '0 4rem',
      }}
    >
      <div
        ref={contentRef}
        className="glass scene-content"
        style={{
          maxWidth: isMobile ? '100%' : '420px',
          padding: '2rem 2.5rem',
          borderColor: `${accent}30`,
          background: `rgba(5,5,5,0.5)`,
        }}
      >
        {/* Chapter badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '1rem',
          padding: '0.3rem 0.8rem',
          borderRadius: '100px',
          background: `${accent}18`,
          border: `1px solid ${accent}40`,
        }}>
          <div style={{
            width: 5, height: 5, borderRadius: '50%',
            background: accent,
            boxShadow: `0 0 6px ${accent}`,
          }} />
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.7rem',
            color: accent,
            letterSpacing: '0.1em',
          }}>
            الفصل {content.chapter}
          </span>
        </div>

        {/* Title */}
        <h2 style={{
          fontFamily: 'var(--font-kufi)',
          fontWeight: 800,
          fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
          lineHeight: 1.2,
          color: '#fff',
          marginBottom: '0.6rem',
          textShadow: `0 0 30px ${accent}40`,
        }}>
          {content.title}
        </h2>

        {/* Subtitle */}
        {content.subtitle && (
          <div style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.95rem',
            color: accent,
            marginBottom: '1rem',
            opacity: 0.9,
          }}>
            {content.subtitle}
          </div>
        )}

        {/* Accent line */}
        <div style={{
          width: 40, height: 2,
          background: `linear-gradient(90deg, ${accent}, transparent)`,
          borderRadius: 2,
          marginBottom: '1rem',
        }} />

        {/* Body */}
        <p className="text-body-arabic" style={{ lineHeight: 1.9 }}>
          {content.body}
        </p>
      </div>
    </div>
  );
};
