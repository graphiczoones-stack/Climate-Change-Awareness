import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface StarsProps {
  count?: number;
}

export const Stars: React.FC<StarsProps> = ({ count = 3000 }) => {
  const meshRef = useRef<THREE.Points>(null!);

  const positions = React.useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Distribute on a sphere
      const r = 80 + Math.random() * 120;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [count]);

  const sizes = React.useMemo(() => {
    const s = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      s[i] = 0.3 + Math.random() * 1.2;
    }
    return s;
  }, [count]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    // Slow drift rotation
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.006;
    meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.002) * 0.03;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.4}
        sizeAttenuation
        color="#ffffff"
        transparent
        opacity={0.85}
        depthWrite={false}
        fog={false}
      />
    </points>
  );
};
