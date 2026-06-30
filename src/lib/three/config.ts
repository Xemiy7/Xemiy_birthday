/** Shared Three.js performance & aesthetic tokens */

export const threeConfig = {
  /** Device pixel ratio clamp — keeps fill-rate reasonable */
  dpr: [1, 1.35] as [number, number],
  camera: {
    fov: 42,
    position: [0, 0, 5.5] as [number, number, number],
    near: 0.1,
    far: 40,
  },
  colors: {
    primary: "#ffffff",
    muted: "#a3a3a3",
    wire: "#e5e5e5",
  },
  opacity: {
    wireframe: 0.11,
    wireframeBold: 0.16,
    glass: 0.22,
    particles: 0.28,
    typography: 0.07,
    ring: 0.09,
  },
  particles: {
    hero: 64,
    ambient: 36,
    works: 28,
  },
  mouse: {
    hero: 0.18,
    ambient: 0.1,
    works: 0.08,
  },
} as const;
