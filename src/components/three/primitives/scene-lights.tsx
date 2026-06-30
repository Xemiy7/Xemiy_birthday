"use client";

interface SceneLightsProps {
  ambient?: number;
  key?: number;
  rim?: number;
}

export function SceneLights({
  ambient = 0.25,
  key = 0.55,
  rim = 0.35,
}: SceneLightsProps) {
  return (
    <>
      <ambientLight intensity={ambient} color="#ffffff" />
      <directionalLight
        position={[4, 6, 5]}
        intensity={key}
        color="#ffffff"
      />
      <directionalLight
        position={[-5, -2, -4]}
        intensity={rim}
        color="#d4d4d4"
      />
      <pointLight position={[0, 3, 2]} intensity={0.2} color="#fafafa" />
    </>
  );
}
