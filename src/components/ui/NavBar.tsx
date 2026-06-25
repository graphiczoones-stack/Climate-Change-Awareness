import React from 'react';
import { useAppStore } from '../../store/useAppStore';

export const NavBar: React.FC = () => {
  const isLoaded = useAppStore((s) => s.isLoaded);
  const isMuted = useAppStore((s) => s.isMuted);
  const toggleMute = useAppStore((s) => s.toggleMute);
  const scrollProgress = useAppStore((s) => s.scrollProgress);

  const opacity = isLoaded ? 1 : 0;

  return (
    <nav
      className="nav-bar"
      style={{
        opacity,
        transition: 'opacity 1s ease',
        background: scrollProgress > 0.02
          ? 'linear-gradient(to bottom, rgba(5,5,5,0.7) 0%, transparent 100%)'
          : 'transparent',
      }}
    >
      {/* Logo */}
      <div className="nav-logo">🌍 الأرض في خطر</div>

      {/* Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* Mute toggle */}
        <button
          onClick={toggleMute}
          data-cursor-hover
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '100px',
            padding: '0.45rem 1rem',
            color: 'rgba(255,255,255,0.6)',
            fontFamily: 'var(--font-body)',
            fontSize: '0.75rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
          }}
        >
          <span style={{ fontSize: '1rem' }}>{isMuted ? '🔇' : '🔊'}</span>
          <span>{isMuted ? 'تشغيل الصوت' : 'إيقاف الصوت'}</span>
        </button>

        {/* Scroll to top */}
        {scrollProgress > 0.05 && (
          <button
            onClick={() => window.scrollTo({ top: 0 })}
            data-cursor-hover
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '100px',
              padding: '0.45rem 1rem',
              color: 'rgba(255,255,255,0.6)',
              fontFamily: 'var(--font-body)',
              fontSize: '0.75rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          >
            ↑ البداية
          </button>
        )}
      </div>
    </nav>
  );
};
