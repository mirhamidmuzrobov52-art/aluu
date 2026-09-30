/**
 * @file useGsapScroll.ts
 * @description Hook to manage GSAP ScrollTrigger contexts safely with React lifecycles and cleanups.
 */

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useGsapScroll(
  callback: (context: gsap.Context) => void,
  deps: React.DependencyList = []
) {
  const scopeRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      callback(ctx);
    }, scopeRef);

    // Refresh ScrollTrigger after DOM renders
    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
    };
  }, deps);

  return scopeRef;
}
