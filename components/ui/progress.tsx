'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // from 0 to 100
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, ...props }, ref) => {
    const progress = Math.max(0, Math.min(value, 100)); // Clamp value

    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
        className={cn(
          'relative h-4 w-full overflow-hidden rounded-full bg-secondary',
          className
        )}
        {...props}
      >
        <div
          className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
    );
  }
);

Progress.displayName = 'Progress';

export { Progress };
