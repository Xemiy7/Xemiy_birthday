/**
 * xemiy Design System — TypeScript tokens
 * Apple-inspired monochrome system for programmatic use (Framer Motion, GSAP).
 */

export const typography = {
  display2xl: "text-display-2xl",
  displayXl: "text-display-xl",
  displayLg: "text-display-lg",
  displayMd: "text-display-md",
  titleLg: "text-title-lg",
  titleMd: "text-title-md",
  titleSm: "text-title-sm",
  headline: "text-headline",
  bodyLg: "text-body-lg",
  body: "text-body",
  bodySm: "text-body-sm",
  caption: "text-caption",
  overline: "text-overline",
  mono: "font-mono text-mono",
} as const;

export const spacing = {
  section: "section-y",
  sectionX: "section-x",
  stackXs: "stack-xs",
  stackSm: "stack-sm",
  stackMd: "stack-md",
  stackLg: "stack-lg",
  stackXl: "stack-xl",
} as const;

export const surfaces = {
  elevated: "surface-elevated",
  inset: "surface-inset",
  glass: "glass",
  glassSubtle: "glass-subtle",
  glassStrong: "glass-strong",
} as const;

export const cards = {
  base: "card",
  interactive: "card card-interactive",
  glass: "card card-glass",
  flat: "card card-flat",
} as const;

export const images = {
  frame: "image-frame",
  cover: "image-cover",
  reveal: "image-reveal",
  portrait: "image-portrait",
  landscape: "image-landscape",
  square: "image-square",
} as const;

export const hover = {
  lift: "hover-lift",
  fade: "hover-fade",
  scale: "hover-scale",
  glow: "hover-glow",
  underline: "hover-underline",
} as const;

export const transition = {
  premium: "transition-premium",
  fast: "transition-fast",
  slow: "transition-slow",
  colors: "transition-colors-premium",
} as const;

export const grid = {
  container: "grid-container",
  wide: "grid-container-wide",
  cols12: "grid-12",
  cols2: "grid-2",
  cols3: "grid-3",
  cols4: "grid-4",
} as const;

export const loading = {
  shimmer: "loading-shimmer",
  pulse: "loading-pulse",
  spinner: "loading-spinner",
  dots: "loading-dots",
} as const;

/** Animation durations in seconds */
export const duration = {
  instant: 0.1,
  fast: 0.2,
  normal: 0.35,
  slow: 0.5,
  slower: 0.7,
  cinematic: 1,
  dramatic: 1.4,
} as const;

/** Apple-style easing curves */
export const easing = {
  standard: [0.25, 0.1, 0.25, 1] as const,
  decelerate: [0, 0, 0.2, 1] as const,
  accelerate: [0.4, 0, 1, 1] as const,
  premium: [0.22, 1, 0.36, 1] as const,
  dramatic: [0.77, 0, 0.175, 1] as const,
} as const;

export const radius = {
  xs: "rounded-xs",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  full: "rounded-full",
} as const;

export const shadow = {
  xs: "shadow-xs",
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
  xl: "shadow-xl",
  glow: "shadow-glow",
  none: "shadow-none",
} as const;

export const ds = {
  typography,
  spacing,
  surfaces,
  cards,
  images,
  hover,
  transition,
  grid,
  loading,
  duration,
  easing,
  radius,
  shadow,
} as const;

export type DesignSystem = typeof ds;
