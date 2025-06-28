'use client';

import React, { useState, useCallback, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

export const toggleVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 gap-2',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline:
          'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        default: 'h-10 px-3 min-w-10',
        sm: 'h-9 px-2.5 min-w-9',
        lg: 'h-11 px-5 min-w-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

interface ToggleProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof toggleVariants> {
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
}

const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  (
    {
      className,
      variant,
      size,
      pressed,
      defaultPressed = false,
      onPressedChange,
      ...props
    },
    ref
  ) => {
    const isControlled = pressed !== undefined;
    const [internalPressed, setInternalPressed] = useState(defaultPressed);
    const currentPressed = isControlled ? pressed : internalPressed;

    const handleClick = useCallback(() => {
      const newState = !currentPressed;
      if (!isControlled) setInternalPressed(newState);
      onPressedChange?.(newState);
    }, [currentPressed, isControlled, onPressedChange]);

    return (
      <button
        ref={ref}
        type="button"
        aria-pressed={currentPressed}
        data-state={currentPressed ? 'on' : 'off'}
        className={cn(toggleVariants({ variant, size }), className)}
        onClick={handleClick}
        {...props}
      />
    );
  }
);

Toggle.displayName = 'Toggle';

export { Toggle };
