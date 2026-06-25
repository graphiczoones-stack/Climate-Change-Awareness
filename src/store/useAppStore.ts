import { create } from 'zustand';

export type SceneId =
  | 'landing'
  | 'nature'
  | 'development'
  | 'pollution'
  | 'greenhouse'
  | 'warming'
  | 'ice'
  | 'wildfire'
  | 'flood'
  | 'wildlife'
  | 'solutions'
  | 'cta';

interface AppState {
  // Loading
  isLoaded: boolean;
  loadProgress: number;
  setLoaded: (v: boolean) => void;
  setLoadProgress: (v: number) => void;

  // Scroll
  scrollProgress: number; // 0 → 1 across entire site
  setScrollProgress: (v: number) => void;

  // Scene
  activeScene: SceneId;
  setActiveScene: (s: SceneId) => void;

  // Cursor
  isCursorHovering: boolean;
  setCursorHovering: (v: boolean) => void;
  cursorX: number;
  cursorY: number;
  setCursorPos: (x: number, y: number) => void;

  // Audio
  isMuted: boolean;
  toggleMute: () => void;

  // Device
  isMobile: boolean;
  setIsMobile: (v: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Loading
  isLoaded: false,
  loadProgress: 0,
  setLoaded: (v) => set({ isLoaded: v }),
  setLoadProgress: (v) => set({ loadProgress: v }),

  // Scroll
  scrollProgress: 0,
  setScrollProgress: (v) => set({ scrollProgress: v }),

  // Scene
  activeScene: 'landing',
  setActiveScene: (s) => set({ activeScene: s }),

  // Cursor
  isCursorHovering: false,
  setCursorHovering: (v) => set({ isCursorHovering: v }),
  cursorX: 0,
  cursorY: 0,
  setCursorPos: (x, y) => set({ cursorX: x, cursorY: y }),

  // Audio
  isMuted: true,
  toggleMute: () => set((s) => ({ isMuted: !s.isMuted })),

  // Device
  isMobile: false,
  setIsMobile: (v) => set({ isMobile: v }),
}));
