"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Envuelve la app con scroll suave (Lenis) sincronizado a GSAP ScrollTrigger.
 * Se desactiva por completo si el usuario prefiere menos movimiento o si el
 * dispositivo es táctil (para no interferir con el scroll nativo en móvil,
 * evitando cualquier "scroll-jack").
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (prefersReduced || !isFinePointer) {
      document.documentElement.dataset.reducedMotion = prefersReduced ? "true" : "false";
      return;
    }

    document.documentElement.dataset.reducedMotion = "false";

    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
