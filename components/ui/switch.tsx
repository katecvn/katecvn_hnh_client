'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface SwitchProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, ...props }, ref) => {
    return (
      <label
        className={cn(
          'relative inline-flex h-6 w-11 cursor-pointer items-center',
          className
        )}
      >
        <input type="checkbox" className="peer sr-only" ref={ref} {...props} />
        <div
          className={cn(
            'h-full w-full rounded-full bg-input transition-colors peer-checked:bg-primary peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50'
          )}
        />
        <div
          className={cn(
            'absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-background shadow-lg transition-transform peer-checked:translate-x-5'
          )}
        />
      </label>
    );
  }
);

Switch.displayName = 'Switch';
