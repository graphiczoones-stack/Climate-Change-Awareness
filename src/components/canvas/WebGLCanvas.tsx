import React, { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useAppStore } from '../../store/useAppStore';
import { Earth } from './Earth';
import { Stars } from './Stars';
import { ParticleSystem } from './ParticleSystem';
import { SceneLighting } from './SceneLighting';
import { CameraController } from './CameraController';
import { SceneBackground } from './SceneBackground';

export const WebGLCanvas: React.FC = () => {
  const scrollProgress = useAppStore((s) => s.scrollProgress);
  const cursorX = useAppStore((s) => s.cursorX);
  const cursorY = useAppStore((s) => s.cursorY);
  const setLoaded = useAppStore((s) => s.setLoaded);
  const setLoadProgress = useAppStore((s) => s.setLoadProgress);

  // Simulate loading progress
  useEffect(() => {
    let prog = 0;
    const interval = setInterval(() => {
      prog += Math.random() * 12 + 3;
      if (prog >= 100) {
        prog = 100;
        setLoadProgress(100);
        clearInterval(interval);
        setTimeout(() => setLoaded(true), 500);
      } else {
        setLoadProgress(prog);
      }
    }, 120);
    return () => clearInterval(interval);
  }, [setLoaded, setLoadProgress]);

  return (
    <div
      id="webgl-canvas"
      style={{ position: 'fixed', inset: 0, zIndex: 0 }}
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
          toneMapping: 1, // THREE.ACESFilmicToneMapping
          toneMappingExposure: 1.1,
        }}
        dpr={[1, 2]}
        style={{ background: '#050505' }}
      >
        {/* Camera control */}
        <CameraController
          scrollProgress={scrollProgress}
          mouseX={cursorX}
          mouseY={cursorY}
        />

        {/* Scene background */}
        <SceneBackground scrollProgress={scrollProgress} />

        {/* Lighting */}
        <SceneLighting scrollProgress={scrollProgress} />

        {/* Stars */}
        <Stars count={2500} />

        {/* Earth */}
        <Earth scrollProgress={scrollProgress} />

        {/* Particles */}
        <ParticleSystem scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
};
