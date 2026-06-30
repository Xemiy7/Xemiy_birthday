"use client";

import {
  MouseRig,
  SceneLights,
  ParticleField,
  WireframeSculpture,
} from "@/components/three/primitives";
import { threeConfig } from "@/lib/three";

/** Ultra-light scene for portfolio header — no environment map for speed */
export function WorksScene() {
  return (
    <>
      <SceneLights ambient={0.22} key={0.3} rim={0.15} />

      <MouseRig intensity={threeConfig.mouse.works}>
        <ParticleField
          count={threeConfig.particles.works}
          radius={2}
          size={0.012}
          speed={0.1}
        />
        <WireframeSculpture
          shape="octahedron"
          position={[1.5, 0.2, -0.6]}
          scale={0.4}
          speed={0.6}
        />
        <WireframeSculpture
          shape="icosahedron"
          position={[-1.3, -0.3, 0]}
          scale={0.35}
          speed={0.5}
        />
      </MouseRig>
    </>
  );
}
