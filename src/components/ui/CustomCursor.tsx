import React from 'react';
import { useAppStore } from '../../store/useAppStore';

export const CustomCursor: React.FC = () => {
  const isCursorHovering = useAppStore((s) => s.isCursorHovering);
  const isMobile = useAppStore((s) => s.isMobile);

  if (isMobile) return null;

  return (
    <>
      <div
        id="cursor-dot"
        className="cursor-dot"
        style={{
          background: isCursorHovering ? '#00B48A' : '#fff',
          transform: `translate(-50%, -50%) scale(${isCursorHovering ? 1.5 : 1})`,
          transition: 'background 0.3s ease, transform 0.2s ease',
        }}
      />
      <div
        id="cursor-ring"
        className={`cursor-ring ${isCursorHovering ? 'hovering' : ''}`}
      />
    </>
  );
};
