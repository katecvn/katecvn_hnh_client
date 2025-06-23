'use client';

import type React from 'react';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { AnimatedSectionProps } from '@/app/interface';

export function AnimatedSection({
  children,
  className,
  delay = 0,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animate-in');
            }, delay);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={cn(
        'opacity-0 translate-y-8 transition-all duration-700 ease-out',
        '[&.animate-in]:opacity-100 [&.animate-in]:translate-y-0',
        className
      )}
    >
      {children}
    </div>
  );
}
