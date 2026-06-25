import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useAppStore } from '../../store/useAppStore';

// ---- Atmosphere shader ----
const atmosphereVert = `
varying vec3 vNormal;
varying vec3 vPosition;
void main() {
  vNormal = normalize(normalMatrix * normal);
  vPosition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const atmosphereFrag = `
varying vec3 vNormal;
uniform vec3 uColor;
uniform float uIntensity;
void main() {
  float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.5);
  gl_FragColor = vec4(uColor, fresnel * uIntensity);
}
`;

interface EarthProps {
  scrollProgress: number;
}

export const Earth: React.FC<EarthProps> = ({ scrollProgress }) => {
  const earthRef = useRef<THREE.Mesh>(null!);
  const atmosphereRef = useRef<THREE.Mesh>(null!);
  const activeScene = useAppStore((s) => s.activeScene);

  // Textures — using procedural colors since we don't have texture files yet
  // In production these would be replaced with real NASA texture maps
  const earthMaterial = useMemo(() => {
    return new THREE.MeshPhongMaterial({
      color: new THREE.Color('#1a5276'),
      emissive: new THREE.Color('#0a1a2e'),
      emissiveIntensity: 0.1,
      shininess: 25,
      specular: new THREE.Color('#4FC3F7'),
    });
  }, []);

  // Atmosphere color shifts based on scene
  const atmosphereColor = useMemo(() => {
    const sceneColors: Record<string, string> = {
      landing: '#4FC3F7',
      nature: '#00B48A',
      development: '#FFB347',
      pollution: '#FF4500',
      greenhouse: '#FF6B35',
      warming: '#FF2200',
      ice: '#89D4F5',
      wildfire: '#FF4500',
      flood: '#1E90FF',
      wildlife: '#9B8FFF',
      solutions: '#00B48A',
      cta: '#00E5AD',
    };
    return sceneColors[activeScene] ?? '#4FC3F7';
  }, [activeScene]);

  const atmosphereMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: atmosphereVert,
      fragmentShader: atmosphereFrag,
      uniforms: {
        uColor: { value: new THREE.Color(atmosphereColor) },
        uIntensity: { value: 1.2 },
      },
      side: THREE.BackSide,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, []);

  useFrame(({ clock }) => {
    if (!earthRef.current) return;

    // Slow auto-rotation
    earthRef.current.rotation.y += 0.0015;

    // Camera tilt based on scroll
    earthRef.current.rotation.x = scrollProgress * 0.4;

    // Pulse atmosphere intensity based on scene
    if (atmosphereRef.current) {
      const mat = atmosphereRef.current.material as THREE.ShaderMaterial;
      // Update color smoothly
      const targetColor = new THREE.Color(atmosphereColor);
      (mat.uniforms.uColor.value as THREE.Color).lerp(targetColor, 0.03);
      mat.uniforms.uIntensity.value =
        0.9 + Math.sin(clock.getElapsedTime() * 0.8) * 0.3;
    }

    // Earth color shifts with scene
    const sceneEmissiveMap: Record<string, number> = {
      pollution: 0.05,
      warming: 0.08,
      wildfire: 0.06,
      flood: 0.04,
      solutions: 0.0,
      nature: 0.02,
    };
    const targetEmissive = sceneEmissiveMap[activeScene] ?? 0.05;
    (earthMaterial.emissiveIntensity) +=
      (targetEmissive - earthMaterial.emissiveIntensity) * 0.02;

    // Scale: grow slightly as we approach surface
    const scale = 1 + scrollProgress * 0.3;
    earthRef.current.scale.setScalar(scale);
    atmosphereRef.current.scale.setScalar(scale);
  });

  return (
    <group>
      {/* Earth sphere */}
      <mesh ref={earthRef} material={earthMaterial}>
        <sphereGeometry args={[2.5, 64, 64]} />
      </mesh>

      {/* Atmosphere glow */}
      <mesh ref={atmosphereRef} material={atmosphereMaterial}>
        <sphereGeometry args={[2.72, 64, 64]} />
      </mesh>
    </group>
  );
};
