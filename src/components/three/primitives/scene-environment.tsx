"use client";

import { Environment } from "@react-three/drei";

interface SceneEnvironmentProps {
  intensity?: number;
}

/** Low-cost studio reflections for glass materials. */
export function SceneEnvironment({ intensity = 0.35 }: SceneEnvironmentProps) {
  return (
    <Environment
      preset="studio"
      background={false}
      environmentIntensity={intensity}
    />
  );
}
