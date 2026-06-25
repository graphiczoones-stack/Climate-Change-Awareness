import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useAppStore } from '../../store/useAppStore';

// Background plane that changes color/texture per scene
export const SceneBackground: React.FC<{ scrollProgress: number }> = ({ scrollProgress }) => {
  const activeScene = useAppStore((s) => s.activeScene);
  const meshRef = useRef<THREE.Mesh>(null!);

  const sceneColors: Record<string, [string, string]> = {
    landing:     ['#050510', '#000005'],
    nature:      ['#021a0a', '#010a05'],
    development: ['#0a0800', '#050400'],
    pollution:   ['#150400', '#080200'],
    greenhouse:  ['#150600', '#080300'],
    warming:     ['#1a0200', '#0a0100'],
    ice:         ['#001020', '#000810'],
    wildfire:    ['#1a0600', '#0a0300'],
    flood:       ['#000a20', '#000514'],
    wildlife:    ['#060012', '#03000a'],
    solutions:   ['#001508', '#000a04'],
    cta:         ['#001508', '#000a04'],
  };

  const [topHex, botHex] = sceneColors[activeScene] ?? sceneColors['landing'];

  useFrame(() => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material as THREE.MeshBasicMaterial;
    const targetColor = new THREE.Color(topHex);
    mat.color.lerp(targetColor, 0.015);
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -50]}>
      <planeGeometry args={[400, 400]} />
      <meshBasicMaterial color={topHex} depthWrite={false} />
    </mesh>
  );
};
