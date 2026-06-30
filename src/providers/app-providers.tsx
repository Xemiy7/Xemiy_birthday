"use client";

import { LenisProvider } from "./lenis-provider";
import { MotionProvider } from "./motion-provider";
import { LikesProvider } from "./likes-provider";
import { AnimationLayer } from "./animation-layer";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <MotionProvider>
      <LenisProvider>
        <LikesProvider>
          <AnimationLayer>{children}</AnimationLayer>
        </LikesProvider>
      </LenisProvider>
    </MotionProvider>
  );
}
