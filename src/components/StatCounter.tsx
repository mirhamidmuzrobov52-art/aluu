/**
 * @file StatCounter.tsx
 * @description GSAP-driven scroll-triggered numeric counter component with gold numerals on teal surface.
 */

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StatCounterProps {
  targetValue: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  label: string;
  description: string;
  id?: string;
}

export const StatCounter: React.FC<StatCounterProps> = ({
  targetValue,
  prefix = '',
  suffix = '',
  duration = 1.8,
  label,
  description,
  id,
}) => {
  const numberRef = useRef<HTMLSpanElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const obj = { val: 0 };
    const el = numberRef.current;
    const triggerEl = containerRef.current;

    const anim = gsap.to(obj, {
      val: targetValue,
      duration: duration,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: triggerEl,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      onUpdate: () => {
        if (el) {
          el.innerText = `${prefix}${Math.round(obj.val)}${suffix}`;
        }
      },
    });

    return () => {
      anim.kill();
    };
  }, [targetValue, prefix, suffix, duration]);

  return (
    <div
      ref={containerRef}
      id={id}
      className="flex flex-col items-center text-center p-6 sm:p-8 rounded-card border border-teal-50/10 transition-colors"
    >
      <div className="flex items-baseline justify-center">
        <span
          ref={numberRef}
          className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-gold tracking-tight"
        >
          {prefix}0{suffix}
        </span>
      </div>
      <span className="font-display font-semibold text-linen text-base sm:text-lg mt-2">
        {label}
      </span>
      <p className="font-body text-linen/75 text-xs sm:text-sm mt-1 max-w-[240px] leading-relaxed">
        {description}
      </p>
    </div>
  );
};
