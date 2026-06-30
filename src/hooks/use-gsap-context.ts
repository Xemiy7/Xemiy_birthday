"use client";

import { useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";
import { registerGsapPlugins } from "@/lib/animations";

export function useGsapContext(scope: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    if (!scope.current) return;

    registerGsapPlugins();
    const ctx = gsap.context(() => {}, scope);

    return () => ctx.revert();
  }, [scope]);
}
