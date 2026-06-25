import { useEffect, useRef } from 'react';
import { useAppStore } from '../store/useAppStore';

export function useCursor() {
  const setCursorPos = useAppStore((s) => s.setCursorPos);
  const setCursorHovering = useAppStore((s) => s.setCursorHovering);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  // Spring physics for ring
  const ringPos = useRef({ x: 0, y: 0 });
  const mousePos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const dot = document.getElementById('cursor-dot') as HTMLDivElement;
    const ring = document.getElementById('cursor-ring') as HTMLDivElement;
    dotRef.current = dot;
    ringRef.current = ring;

    const onMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      mousePos.current = { x, y };
      setCursorPos(x, y);

      // Dot follows instantly
      if (dot) {
        dot.style.left = `${x}px`;
        dot.style.top = `${y}px`;
      }
    };

    // Spring animation for ring
    const animate = () => {
      const lerp = 0.12;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerp;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerp;

      if (ring) {
        ring.style.left = `${ringPos.current.x}px`;
        ring.style.top = `${ringPos.current.y}px`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    // Hover detection
    const onEnter = () => setCursorHovering(true);
    const onLeave = () => setCursorHovering(false);

    const interactiveEls = document.querySelectorAll(
      'a, button, [data-cursor-hover]'
    );
    interactiveEls.forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [setCursorPos, setCursorHovering]);
}
