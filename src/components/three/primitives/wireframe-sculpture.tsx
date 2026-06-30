"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import type { Mesh } from "three";
import { threeConfig } from "@/lib/three";

type SculptureShape = "icosahedron" | "octahedron" | "torus" | "ring";

interface WireframeSculptureProps {
  shape?: SculptureShape;
  position?: [number, number, number];
  scale?: number;
  speed?: number;
  distort?: number;
  opacity?: number;
}

export function WireframeSculpture({
  shape = "icosahedron",
  position = [0, 0, 0],
  scale = 1,
  speed = 1,
  distort = 0,
  opacity = threeConfig.opacity.wireframe,
}: WireframeSculptureProps) {
  const ref = useRef<Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.x = t * 0.12 * speed;
    ref.current.rotation.y = t * 0.16 * speed;
  });

  const geometry = (() => {
    switch (shape) {
      case "octahedron":
        return <octahedronGeometry args={[1, 0]} />;
      case "torus":
        return <torusGeometry args={[1, 0.28, 12, 36]} />;
      case "ring":
        return <ringGeometry args={[0.75, 1.1, 48]} />;
      default:
        return <icosahedronGeometry args={[1, 1]} />;
    }
  })();

  const material =
    distort > 0 && shape !== "ring" ? (
      <MeshDistortMaterial
        color={threeConfig.colors.wire}
        wireframe
        transparent
        opacity={opacity}
        distort={distort}
        speed={1.5}
      />
    ) : (
      <meshBasicMaterial
        color={threeConfig.colors.wire}
        wireframe={shape !== "ring"}
        transparent
        opacity={shape === "ring" ? threeConfig.opacity.ring : opacity}
        side={shape === "ring" ? 2 : 0}
      />
    );

  return (
    <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.6}>
      <mesh ref={ref} position={position} scale={scale}>
        {geometry}
        {material}
      </mesh>
    </Float>
  );
}
