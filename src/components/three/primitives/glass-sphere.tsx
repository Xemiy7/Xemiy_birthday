"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import type { Mesh } from "three";
import { threeConfig } from "@/lib/three";

interface GlassSphereProps {
  position?: [number, number, number];
  scale?: number;
  speed?: number;
}

export function GlassSphere({
  position = [0, 0, 0],
  scale = 0.55,
  speed = 1,
}: GlassSphereProps) {
  const ref = useRef<Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.08 * speed;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.5}>
      <mesh ref={ref} position={position} scale={scale}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshPhysicalMaterial
          color={threeConfig.colors.primary}
          metalness={0.15}
          roughness={0.08}
          transmission={0.92}
          thickness={0.8}
          ior={1.2}
          transparent
          opacity={threeConfig.opacity.glass}
          envMapIntensity={0.6}
        />
      </mesh>
    </Float>
  );
}
