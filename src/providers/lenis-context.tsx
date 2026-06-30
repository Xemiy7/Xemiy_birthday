"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { registerGsapPlugins } from "@/lib/animations";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const LenisContext = createContext<Lenis | null>(null);

export function useLenisInstance() {
  return useContext(LenisContext);
}

export function LenisContextProvider({ children }: { children: ReactNode }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;

    registerGsapPlugins();

    const instance = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1.2,
    });

    setLenis(instance);

    instance.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length && value !== undefined) {
          instance.scrollTo(value, { immediate: true });
        }
        return instance.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: document.documentElement.style.transform ? "transform" : "fixed",
    });

    const onRefresh = () => instance.resize();
    ScrollTrigger.addEventListener("refresh", onRefresh);
    ScrollTrigger.refresh();

    let frame = 0;
    const raf = (time: number) => {
      instance.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      instance.destroy();
      setLenis(null);
    };
  }, [prefersReducedMotion]);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}
