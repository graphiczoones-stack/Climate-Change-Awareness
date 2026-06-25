import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useAppStore } from '../../store/useAppStore';

interface ParticleSystemProps {
  scrollProgress: number;
}

export const ParticleSystem: React.FC<ParticleSystemProps> = ({ scrollProgress: _scrollProgress }) => {
  const activeScene = useAppStore((s) => s.activeScene);
  const groupRef = useRef<THREE.Group>(null!);
  
  // Determine particle properties per scene
  const config = useMemo(() => {
    const configs: Record<string, {
      count: number;
      color: string;
      size: number;
      speed: number;
      spread: number;
      opacity: number;
    }> = {
      nature:      { count: 120, color: '#00E5AD', size: 0.06, speed: 0.3,  spread: 8,  opacity: 0.6 },
      development: { count: 200, color: '#888888', size: 0.08, speed: 0.6,  spread: 10, opacity: 0.4 },
      pollution:   { count: 400, color: '#553300', size: 0.12, speed: 0.4,  spread: 12, opacity: 0.5 },
      greenhouse:  { count: 150, color: '#FF6B35', size: 0.07, speed: 0.5,  spread: 9,  opacity: 0.7 },
      warming:     { count: 300, color: '#FF3300', size: 0.05, speed: 0.8,  spread: 8,  opacity: 0.6 },
      ice:         { count: 200, color: '#89D4F5', size: 0.06, speed: 0.2,  spread: 10, opacity: 0.7 },
      wildfire:    { count: 500, color: '#FF6600', size: 0.09, speed: 1.2,  spread: 8,  opacity: 0.8 },
      flood:       { count: 600, color: '#1E90FF', size: 0.04, speed: 2.0,  spread: 14, opacity: 0.5 },
      wildlife:    { count: 100, color: '#E8F4FD', size: 0.05, speed: 0.2,  spread: 8,  opacity: 0.4 },
      solutions:   { count: 150, color: '#00B48A', size: 0.07, speed: 0.3,  spread: 10, opacity: 0.7 },
      cta:         { count: 200, color: '#00E5AD', size: 0.06, speed: 0.25, spread: 12, opacity: 0.8 },
      landing:     { count: 80,  color: '#4FC3F7', size: 0.05, speed: 0.15, spread: 20, opacity: 0.3 },
    };
    return configs[activeScene] ?? configs['landing'];
  }, [activeScene]);

  // Generate particle positions
  const { positions, velocities } = useMemo(() => {
    const count = Math.min(config.count, 600);
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * config.spread;
      pos[i * 3 + 1] = (Math.random() - 0.5) * config.spread;
      pos[i * 3 + 2] = (Math.random() - 0.5) * config.spread;

      vel[i * 3 + 0] = (Math.random() - 0.5) * 0.01;
      vel[i * 3 + 1] = (Math.random() * 0.02) * config.speed;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
    }
    return { positions: pos, velocities: vel };
  }, [config]);

  const pointsRef = useRef<THREE.Points>(null!);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const geo = pointsRef.current.geometry;
    const attr = geo.attributes.position as THREE.BufferAttribute;
    const pos = attr.array as Float32Array;
    const t = clock.getElapsedTime();
    const spread = config.spread;

    for (let i = 0; i < pos.length / 3; i++) {
      pos[i * 3 + 1] += velocities[i * 3 + 1] * config.speed;

      // Reset if out of bounds
      if (pos[i * 3 + 1] > spread / 2) {
        pos[i * 3 + 1] = -spread / 2;
      }
      if (pos[i * 3 + 1] < -spread / 2) {
        pos[i * 3 + 1] = spread / 2;
      }

      // Slight horizontal drift
      pos[i * 3 + 0] += Math.sin(t * 0.3 + i) * 0.002;
    }
    attr.needsUpdate = true;

    // Gentle group rotation
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={config.size}
          color={config.color}
          transparent
          opacity={config.opacity}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};
