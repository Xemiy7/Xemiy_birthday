"use client";

import { Text } from "@react-three/drei";
import { Float } from "@react-three/drei";
import { threeConfig } from "@/lib/three";

interface FloatingLabelProps {
  text?: string;
  position?: [number, number, number];
  fontSize?: number;
  rotation?: [number, number, number];
}

export function FloatingLabel({
  text = "xemiy",
  position = [0, 0, -1],
  fontSize = 0.42,
  rotation = [0, 0.15, 0],
}: FloatingLabelProps) {
  return (
    <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.35}>
      <Text
        position={position}
        rotation={rotation}
        fontSize={fontSize}
        color={threeConfig.colors.primary}
        fillOpacity={threeConfig.opacity.typography}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.08}
      >
        {text}
      </Text>
    </Float>
  );
}
