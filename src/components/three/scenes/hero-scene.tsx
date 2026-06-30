"use client";

import {
  MouseRig,
  SceneEnvironment,
  SceneLights,
  ParticleField,
  GlassSphere,
  WireframeSculpture,
  FloatingLabel,
} from "@/components/three/primitives";
import { threeConfig } from "@/lib/three";

export function HeroScene() {
  return (
    <>
      <SceneLights ambient={0.3} key={0.5} rim={0.3} />
      <SceneEnvironment intensity={0.4} />

      <MouseRig intensity={threeConfig.mouse.hero}>
        <ParticleField count={threeConfig.particles.hero} radius={4} />

        <WireframeSculpture
          shape="icosahedron"
          position={[-1.6, 0.4, 0]}
          scale={0.85}
          speed={1}
          distort={0.22}
          opacity={threeConfig.opacity.wireframeBold}
        />
        <WireframeSculpture
          shape="octahedron"
          position={[1.7, -0.2, -0.8]}
          scale={0.55}
          speed={1.3}
        />
        <WireframeSculpture
          shape="torus"
          position={[0.4, 1.1, -0.4]}
          scale={0.48}
          speed={0.9}
        />
        <WireframeSculpture
          shape="ring"
          position={[-0.9, -0.9, 0.3]}
          scale={1.1}
          speed={0.7}
        />

        <GlassSphere position={[1.2, 0.6, -0.2]} scale={0.38} speed={1.1} />
        <GlassSphere position={[-0.3, -0.5, 0.5]} scale={0.28} speed={0.8} />

        <FloatingLabel position={[0, -0.2, -1.2]} fontSize={0.5} />
        <FloatingLabel
          text="studio"
          position={[2.2, 1.4, -2]}
          fontSize={0.14}
          rotation={[0, -0.3, 0]}
        />
      </MouseRig>
    </>
  );
}
