import { useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';

export function useMediaQuery() {
  const setIsMobile = useAppStore((s) => s.setIsMobile);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [setIsMobile]);
}
