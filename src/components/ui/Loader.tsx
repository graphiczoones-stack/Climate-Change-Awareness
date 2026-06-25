import React, { useEffect, useRef, useState } from 'react';
import { useAppStore } from '../../store/useAppStore';

export const Loader: React.FC = () => {
  const { loadProgress, isLoaded } = useAppStore();
  const [isVisible, setIsVisible] = useState(true);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLoaded) {
      // Fade out after loading completes
      const timer = setTimeout(() => {
        if (wrapperRef.current) {
          wrapperRef.current.style.transition = 'opacity 1s ease, transform 1s ease';
          wrapperRef.current.style.opacity = '0';
          wrapperRef.current.style.transform = 'scale(1.05)';
        }
        setTimeout(() => setIsVisible(false), 1100);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isLoaded]);

  if (!isVisible) return null;

  return (
    <div ref={wrapperRef} className="loader-wrapper">
      {/* Animated rings */}
      <div style={{ position: 'relative', width: 140, height: 140 }}>
        {/* Outer ring */}
        <div style={{
          position: 'absolute', inset: 0,
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.06)',
          borderTopColor: '#00B48A',
          animation: 'spin 1.8s linear infinite',
        }} />
        {/* Mid ring */}
        <div style={{
          position: 'absolute', inset: 12,
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.04)',
          borderTopColor: '#0D3B66',
          animation: 'spin 2.8s linear infinite reverse',
        }} />
        {/* Inner ring */}
        <div style={{
          position: 'absolute', inset: 24,
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.03)',
          borderTopColor: 'rgba(255,255,255,0.2)',
          animation: 'spin 4s linear infinite',
        }} />
        {/* Center dot */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            width: 8, height: 8,
            borderRadius: '50%',
            background: '#00B48A',
            boxShadow: '0 0 12px #00B48A, 0 0 24px rgba(0,180,138,0.4)',
          }} />
        </div>
      </div>

      {/* Title */}
      <div className="loader-title">الأرض في خطر</div>

      {/* Progress bar */}
      <div style={{
        width: 200,
        height: 1,
        background: 'rgba(255,255,255,0.08)',
        borderRadius: 2,
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          width: `${loadProgress}%`,
          background: 'linear-gradient(90deg, #0D3B66, #00B48A)',
          borderRadius: 2,
          transition: 'width 0.3s ease',
          boxShadow: '0 0 8px rgba(0,180,138,0.6)',
        }} />
      </div>

      {/* Percentage */}
      <div className="loader-percent">
        {Math.round(loadProgress)}%
      </div>

      {/* Subtitle */}
      <div style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.7rem',
        color: 'rgba(255,255,255,0.2)',
        letterSpacing: '0.3em',
        textTransform: 'uppercase',
      }}>
        جاري التحميل...
      </div>
    </div>
  );
};
