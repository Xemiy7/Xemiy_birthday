import type { Variants } from "framer-motion";
import { duration, easing } from "@/lib/design-system";

const premiumEase = easing.premium;
const dramaticEase = easing.dramatic;

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration.cinematic, ease: premiumEase },
  },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.cinematic, ease: premiumEase },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.08 },
  },
};

export const revealMask: Variants = {
  hidden: { clipPath: "inset(100% 0 0 0)" },
  visible: {
    clipPath: "inset(0% 0 0 0)",
    transition: { duration: duration.dramatic, ease: dramaticEase },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.cinematic, ease: premiumEase },
  },
};

export const blurFade: Variants = {
  hidden: {
    opacity: 0,
    filter: "blur(10px)",
    y: 12,
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: duration.cinematic, ease: premiumEase },
  },
  exit: {
    opacity: 0,
    filter: "blur(8px)",
    y: -8,
    transition: { duration: duration.slow, ease: premiumEase },
  },
};

export const blurReveal: Variants = {
  hidden: { opacity: 0, filter: "blur(12px)", y: 24 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: duration.dramatic, ease: dramaticEase },
  },
};
