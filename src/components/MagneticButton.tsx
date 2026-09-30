/**
 * @file MagneticButton.tsx
 * @description Button component featuring the left-to-right sweep filling hover effect and GSAP magnetic physics.
 */

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'gold' | 'teal' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  magneticStrength?: number;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  variant = 'gold',
  size = 'md',
  className,
  magneticStrength = 0.35,
  onClick,
  ...rest
}) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = buttonRef.current;
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);

    gsap.to(btn, {
      x: x * magneticStrength,
      y: y * magneticStrength,
      duration: 0.25,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    const btn = buttonRef.current;
    if (!btn) return;

    gsap.to(btn, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'elastic.out(1.1, 0.4)',
    });
  };

  const baseStyles =
    'sweep-btn font-display font-medium tracking-tight rounded-button focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98] select-none whitespace-nowrap touch-manipulation';

  const sizeStyles = {
    sm: 'px-5 py-2.5 text-xs font-semibold',
    md: 'px-7 py-3.5 text-sm font-semibold',
    lg: 'px-9 py-4 text-base font-bold',
  };

  const variantClass = `sweep-btn-${variant}`;

  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={twMerge(clsx(baseStyles, sizeStyles[size], variantClass, className))}
      {...rest}
    >
      <span className="relative z-10 flex items-center justify-center gap-2 pointer-events-none">
        {children}
      </span>
    </button>
  );
};
