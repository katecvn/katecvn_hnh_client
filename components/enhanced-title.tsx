'use client';

import { cn } from '@/lib/utils';
import { TextProps } from '@/types/interface';

export function TitleHome({ children, className }: TextProps) {
  return (
    <div className="flex items-center justify-center mt-1 mb-8 ">
      <div className="flex-grow border-t-2 border-ograne"></div>
      <span
        className={cn(
          'bg-green-cyan-500 text-white px-4 py-2 rounded-lg font-bold text-lg md:text-xl',
          className
        )}
      >
        {children}
      </span>
      <div className="flex-grow border-t-2 border-ograne"></div>
    </div>
  );
}
