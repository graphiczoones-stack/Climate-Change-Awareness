import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useAppStore } from '../../store/useAppStore';

interface SceneLightingProps {
  scrollProgress: number;
}

export const SceneLighting: React.FC<SceneLightingProps> = ({ scrollProgress: _scrollProgress }) => {
  const activeScene = useAppStore((s) => s.activeScene);
  const sunRef = useRef<THREE.DirectionalLight>(null!);
  const fillRef = useRef<THREE.PointLight>(null!);
  const ambientRef = useRef<THREE.AmbientLight>(null!);

  // Scene-specific lighting configs
  const getLightConfig = (scene: string) => {
    const configs: Record<string, {
      sunColor: string;
      sunIntensity: number;
      fillColor: string;
      fillIntensity: number;
      ambient: number;
      sunX: number; sunY: number; sunZ: number;
    }> = {
      landing:     { sunColor: '#FFF5E4', sunIntensity: 2.0, fillColor: '#4FC3F7', fillIntensity: 0.4, ambient: 0.15, sunX: 5, sunY: 3, sunZ: 4 },
      nature:      { sunColor: '#FFF0C0', sunIntensity: 2.5, fillColor: '#00B48A', fillIntensity: 0.5, ambient: 0.25, sunX: 4, sunY: 5, sunZ: 3 },
      development: { sunColor: '#FFCC66', sunIntensity: 1.8, fillColor: '#FFB347', fillIntensity: 0.6, ambient: 0.2,  sunX: 3, sunY: 4, sunZ: 5 },
      pollution:   { sunColor: '#CC4400', sunIntensity: 1.2, fillColor: '#882200', fillIntensity: 0.8, ambient: 0.1,  sunX: 2, sunY: 2, sunZ: 6 },
      greenhouse:  { sunColor: '#FF5500', sunIntensity: 1.4, fillColor: '#FF3300', fillIntensity: 0.9, ambient: 0.08, sunX: 2, sunY: 3, sunZ: 5 },
      warming:     { sunColor: '#FF2200', sunIntensity: 3.0, fillColor: '#FF0000', fillIntensity: 1.2, ambient: 0.05, sunX: 1, sunY: 5, sunZ: 3 },
      ice:         { sunColor: '#C8E8FF', sunIntensity: 2.2, fillColor: '#89D4F5', fillIntensity: 0.6, ambient: 0.3,  sunX: 3, sunY: 6, sunZ: 2 },
      wildfire:    { sunColor: '#FF4400', sunIntensity: 1.0, fillColor: '#FF6600', fillIntensity: 1.5, ambient: 0.05, sunX: -2, sunY: 1, sunZ: 4 },
      flood:       { sunColor: '#334466', sunIntensity: 0.6, fillColor: '#1E90FF', fillIntensity: 0.4, ambient: 0.08, sunX: -1, sunY: 3, sunZ: 6 },
      wildlife:    { sunColor: '#330044', sunIntensity: 0.4, fillColor: '#9B8FFF', fillIntensity: 0.5, ambient: 0.05, sunX: 3, sunY: 2, sunZ: 3 },
      solutions:   { sunColor: '#FFD700', sunIntensity: 2.8, fillColor: '#00B48A', fillIntensity: 0.8, ambient: 0.35, sunX: 4, sunY: 6, sunZ: 2 },
      cta:         { sunColor: '#FFF0C0', sunIntensity: 2.5, fillColor: '#00E5AD', fillIntensity: 0.6, ambient: 0.3,  sunX: 4, sunY: 5, sunZ: 3 },
    };
    return configs[scene] ?? configs['landing'];
  };

  useFrame(() => {
    const cfg = getLightConfig(activeScene);
    if (!sunRef.current || !fillRef.current || !ambientRef.current) return;

    const lerp = 0.025;
    // Lerp sun color and intensity
    sunRef.current.color.lerp(new THREE.Color(cfg.sunColor), lerp);
    sunRef.current.intensity += (cfg.sunIntensity - sunRef.current.intensity) * lerp;
    sunRef.current.position.lerp(new THREE.Vector3(cfg.sunX, cfg.sunY, cfg.sunZ), lerp);

    // Lerp fill light
    fillRef.current.color.lerp(new THREE.Color(cfg.fillColor), lerp);
    fillRef.current.intensity += (cfg.fillIntensity - fillRef.current.intensity) * lerp;

    // Lerp ambient
    ambientRef.current.intensity += (cfg.ambient - ambientRef.current.intensity) * lerp;
  });

  return (
    <>
      {/* Primary sun */}
      <directionalLight
        ref={sunRef}
        color="#FFF5E4"
        intensity={2.0}
        position={[5, 3, 4]}
        castShadow
      />
      {/* Fill / atmosphere light */}
      <pointLight
        ref={fillRef}
        color="#4FC3F7"
        intensity={0.4}
        position={[-4, 2, 3]}
        distance={30}
      />
      {/* Ambient */}
      <ambientLight ref={ambientRef} intensity={0.15} />
      {/* Back rim light */}
      <directionalLight
        color="#0a0a2a"
        intensity={0.3}
        position={[-3, -2, -3]}
      />
    </>
  );
};
