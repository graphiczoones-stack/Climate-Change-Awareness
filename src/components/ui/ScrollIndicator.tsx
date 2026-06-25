import React from 'react';
import { useAppStore } from '../../store/useAppStore';

export const ScrollIndicator: React.FC = () => {
  const scrollProgress = useAppStore((s) => s.scrollProgress);
  const isLoaded = useAppStore((s) => s.isLoaded);

  // Only show at the very beginning
  const visible = isLoaded && scrollProgress < 0.04;

  return (
    <div
      className="scroll-indicator"
      style={{
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.8s ease',
        pointerEvents: 'none',
      }}
    >
      <span>انتقل للأسفل</span>
      <div className="scroll-chevron" />
    </div>
  );
};
