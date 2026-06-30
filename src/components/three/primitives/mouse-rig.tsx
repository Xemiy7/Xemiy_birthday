"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";

interface MouseRigProps {
  children: ReactNode;
  intensity?: number;
}

export function MouseRig({ children, intensity = 0.12 }: MouseRigProps) {
  const group = useRef<Group>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame(() => {
    if (!group.current) return;
    current.current.x += (target.current.x - current.current.x) * 0.04;
    current.current.y += (target.current.y - current.current.y) * 0.04;
    group.current.rotation.y = current.current.x * intensity;
    group.current.rotation.x = -current.current.y * intensity * 0.6;
  });

  return <group ref={group}>{children}</group>;
}
