"use client";

import dynamic from "next/dynamic";
import { Suspense, type ReactNode } from "react";
import { useSceneVisible } from "@/hooks/use-scene-visible";
import { threeConfig } from "@/lib/three";
import { cn } from "@/lib/utils";

const Canvas = dynamic(
  () => import("@react-three/fiber").then((mod) => mod.Canvas),
  { ssr: false },
);

const AdaptiveDpr = dynamic(
  () => import("@react-three/drei").then((mod) => mod.AdaptiveDpr),
  { ssr: false },
);

interface SceneCanvasProps {
  children: ReactNode;
  className?: string;
  camera?: {
    position?: [number, number, number];
    fov?: number;
  };
}

function SceneCanvasInner({
  children,
  visible,
  camera,
}: SceneCanvasProps & { visible: boolean }) {
  const cam = {
    position: camera?.position ?? threeConfig.camera.position,
    fov: camera?.fov ?? threeConfig.camera.fov,
  };

  return (
    <Canvas
      camera={{
        position: cam.position,
        fov: cam.fov,
        near: threeConfig.camera.near,
        far: threeConfig.camera.far,
      }}
      dpr={threeConfig.dpr}
      frameloop={visible ? "always" : "demand"}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        stencil: false,
      }}
      performance={{ min: 0.75 }}
    >
      <AdaptiveDpr pixelated />
      <Suspense fallback={null}>{children}</Suspense>
    </Canvas>
  );
}

export function SceneCanvas({ children, className, camera }: SceneCanvasProps) {
  const { ref, visible } = useSceneVisible();

  return (
    <div ref={ref} className={cn("h-full w-full", className)} aria-hidden>
      <SceneCanvasInner visible={visible} camera={camera}>
        {children}
      </SceneCanvasInner>
    </div>
  );
}

/** @deprecated Use SceneCanvas */
export const LazyCanvas = SceneCanvas;
