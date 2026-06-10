'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Momentum smooth-scrolling, the backbone of the cinematic feel.
 *
 * Lenis intercepts wheel/touch and eases the *native* scroll position,
 * so Framer Motion's useScroll (used for every parallax/reveal) keeps
 * working. Honours prefers-reduced-motion by skipping the smoothing.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const lenis = new Lenis({
      duration: 1.15,
      lerp: 0.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });

    // Expose for anchor scrolling elsewhere if needed.
    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      (window as unknown as { lenis?: Lenis }).lenis = undefined;
    };
  }, []);

  return null;
}
