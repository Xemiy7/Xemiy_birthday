"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { InstancedMesh, Object3D } from "three";
import { threeConfig } from "@/lib/three";

interface ParticleFieldProps {
  count?: number;
  radius?: number;
  size?: number;
  speed?: number;
}

const dummy = new Object3D();

export function ParticleField({
  count = threeConfig.particles.ambient,
  radius = 3.5,
  size = 0.018,
  speed = 0.15,
}: ParticleFieldProps) {
  const mesh = useRef<InstancedMesh>(null);

  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      x: (Math.random() - 0.5) * radius * 2,
      y: (Math.random() - 0.5) * radius * 1.4,
      z: (Math.random() - 0.5) * radius * 1.2,
      phase: Math.random() * Math.PI * 2,
      drift: 0.3 + Math.random() * 0.7,
      id: i,
    }));
  }, [count, radius]);

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime * speed;

    particles.forEach((p, i) => {
      dummy.position.set(
        p.x + Math.sin(t * p.drift + p.phase) * 0.08,
        p.y + Math.cos(t * p.drift * 0.8 + p.phase) * 0.06,
        p.z,
      );
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });

    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[size, 6, 6]} />
      <meshBasicMaterial
        color={threeConfig.colors.primary}
        transparent
        opacity={threeConfig.opacity.particles}
      />
    </instancedMesh>
  );
}
