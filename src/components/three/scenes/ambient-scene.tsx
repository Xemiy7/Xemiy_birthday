"use client";

import {
  MouseRig,
  SceneEnvironment,
  SceneLights,
  ParticleField,
  GlassSphere,
  WireframeSculpture,
} from "@/components/three/primitives";
import { threeConfig } from "@/lib/three";

/** Minimal accent scene for CTA / contact sections */
export function AmbientScene() {
  return (
    <>
      <SceneLights ambient={0.2} key={0.35} rim={0.2} />
      <SceneEnvironment intensity={0.25} />

      <MouseRig intensity={threeConfig.mouse.ambient}>
        <ParticleField count={threeConfig.particles.ambient} radius={2.5} size={0.014} />
        <GlassSphere position={[1.4, 0.3, -0.5]} scale={0.32} />
        <WireframeSculpture
          shape="ring"
          position={[-1.2, -0.4, 0]}
          scale={0.9}
          speed={0.5}
        />
      </MouseRig>
    </>
  );
}
