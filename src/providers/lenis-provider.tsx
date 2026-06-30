"use client";

import { LenisContextProvider } from "./lenis-context";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  return <LenisContextProvider>{children}</LenisContextProvider>;
}
