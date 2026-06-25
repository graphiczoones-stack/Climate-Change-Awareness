import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useAppStore } from '../store/useAppStore';
import { SCENES, TOTAL_SCROLL_HEIGHT } from '../utils/scenes';

gsap.registerPlugin(ScrollTrigger);

export function useSmoothScroll() {
  const setScrollProgress = useAppStore((s) => s.setScrollProgress);
  const setActiveScene = useAppStore((s) => s.setActiveScene);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Create Lenis instance
    const lenis = new Lenis({
      duration: 1.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Track scroll progress
    lenis.on('scroll', ({ progress }: { progress: number }) => {
      setScrollProgress(progress);

      // Determine active scene
      const activeScene = SCENES.find(
        (s) => progress >= s.scrollStart && progress <= s.scrollEnd
      );
      if (activeScene) {
        setActiveScene(activeScene.id as any);
      }
    });

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, [setScrollProgress, setActiveScene]);

  return lenisRef;
}
