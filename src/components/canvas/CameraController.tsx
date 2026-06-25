import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useAppStore } from '../../store/useAppStore';

interface CameraControllerProps {
  scrollProgress: number;
  mouseX: number;
  mouseY: number;
}

// Camera path: a series of keyframes for [position, lookAt] per scene
const CAMERA_PATH: Array<{
  progress: number;
  pos: [number, number, number];
  target: [number, number, number];
  fov: number;
}> = [
  { progress: 0.00, pos: [0, 0, 10],    target: [0, 0, 0],   fov: 60 },
  { progress: 0.08, pos: [0, 0, 7],     target: [0, 0, 0],   fov: 55 },
  { progress: 0.16, pos: [3, 1, 7],     target: [0, 0, 0],   fov: 52 },
  { progress: 0.25, pos: [4, 2, 6],     target: [0, 0.5, 0], fov: 55 },
  { progress: 0.35, pos: [2, 0, 8],     target: [0, 0, 0],   fov: 58 },
  { progress: 0.45, pos: [0, 0, 9],     target: [0, 0, 0],   fov: 60 },
  { progress: 0.55, pos: [-1, 1, 8],    target: [0, 0, 0],   fov: 55 },
  { progress: 0.63, pos: [2, -1, 7],    target: [0, -0.5, 0], fov: 52 },
  { progress: 0.72, pos: [3, 1, 6],     target: [0, 0.5, 0], fov: 55 },
  { progress: 0.80, pos: [-2, 1, 7],    target: [0, 0, 0],   fov: 58 },
  { progress: 0.87, pos: [0, -1, 8],    target: [0, 0, 0],   fov: 55 },
  { progress: 0.93, pos: [0, 0, 8],     target: [0, 0, 0],   fov: 52 },
  { progress: 1.00, pos: [0, 0, 9],     target: [0, 0, 0],   fov: 55 },
];

function lerp3(a: [number,number,number], b: [number,number,number], t: number): [number,number,number] {
  return [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t,
  ];
}

export const CameraController: React.FC<CameraControllerProps> = ({
  scrollProgress,
  mouseX,
  mouseY,
}) => {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 0, 10));
  const targetLook = useRef(new THREE.Vector3(0, 0, 0));
  const isMobile = useAppStore((s) => s.isMobile);

  useFrame(({ size }) => {
    // Find surrounding keyframes
    let fromKF = CAMERA_PATH[0];
    let toKF = CAMERA_PATH[1];

    for (let i = 0; i < CAMERA_PATH.length - 1; i++) {
      if (
        scrollProgress >= CAMERA_PATH[i].progress &&
        scrollProgress <= CAMERA_PATH[i + 1].progress
      ) {
        fromKF = CAMERA_PATH[i];
        toKF = CAMERA_PATH[i + 1];
        break;
      }
    }

    const range = toKF.progress - fromKF.progress;
    const t = range === 0 ? 0 : (scrollProgress - fromKF.progress) / range;
    const smooth = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // ease in-out

    const pos = lerp3(fromKF.pos, toKF.pos, smooth);
    const look = lerp3(fromKF.target, toKF.target, smooth);

    // Mouse parallax (desktop only)
    const parallaxStrength = isMobile ? 0 : 0.3;
    const mx = (mouseX / window.innerWidth - 0.5) * parallaxStrength;
    const my = -(mouseY / window.innerHeight - 0.5) * parallaxStrength;

    targetPos.current.set(pos[0] + mx, pos[1] + my, pos[2]);
    targetLook.current.set(look[0], look[1], look[2]);

    // Smooth camera movement
    camera.position.lerp(targetPos.current, 0.04);

    const lookTarget = new THREE.Vector3().lerp(targetLook.current, 0.04);
    camera.lookAt(camera.position.clone().add(
      targetLook.current.clone().sub(camera.position).normalize()
    ));

    // FOV
    const targetFov = fromKF.fov + (toKF.fov - fromKF.fov) * smooth;
    const perspCam = camera as THREE.PerspectiveCamera;
    perspCam.fov += (targetFov - perspCam.fov) * 0.03;
    perspCam.updateProjectionMatrix();
  });

  return null;
};
