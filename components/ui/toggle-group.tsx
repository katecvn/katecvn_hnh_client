'use client';

import React, { createContext, useContext, useState } from 'react';
import { cn } from '@/lib/utils';
import { toggleVariants } from '@/components/ui/toggle';
import type { VariantProps } from 'class-variance-authority';

interface ToggleGroupContextType extends VariantProps<typeof toggleVariants> {
  type?: 'single' | 'multiple';
  value: string[]; // supports multiple selection
  setValue: (val: string[]) => void;
}

const ToggleGroupContext = createContext<ToggleGroupContextType | null>(null);

interface ToggleGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toggleVariants> {
  type?: 'single' | 'multiple';
  value?: string[];
  defaultValue?: string[];
  onChange?: (val: string[]) => void;
}

export const ToggleGroup = ({
  className,
  variant = 'default',
  size = 'default',
  type = 'single',
  value,
  defaultValue,
  onChange,
  children,
  ...props
}: ToggleGroupProps) => {
  const [internalValue, setInternalValue] = useState<string[]>(
    defaultValue || []
  );

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const setValue = (newVal: string[]) => {
    if (!isControlled) setInternalValue(newVal);
    onChange?.(newVal);
  };

  return (
    <ToggleGroupContext.Provider
      value={{ variant, size, type, value: currentValue, setValue }}
    >
      <div
        className={cn('flex items-center justify-center gap-1', className)}
        role="group"
        {...props}
      >
        {children}
      </div>
    </ToggleGroupContext.Provider>
  );
};

interface ToggleGroupItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof toggleVariants> {
  value: string;
}

export const ToggleGroupItem = ({
  className,
  children,
  value,
  variant,
  size,
  ...props
}: ToggleGroupItemProps) => {
  const ctx = useContext(ToggleGroupContext);
  if (!ctx) throw new Error('ToggleGroupItem must be used within ToggleGroup');

  const isActive = ctx.value.includes(value);

  const handleClick = () => {
    if (ctx.type === 'single') {
      ctx.setValue(isActive ? [] : [value]);
    } else {
      ctx.setValue(
        isActive ? ctx.value.filter((v) => v !== value) : [...ctx.value, value]
      );
    }
  };

  return (
    <button
      type="button"
      aria-pressed={isActive}
      onClick={handleClick}
      className={cn(
        toggleVariants({
          variant: variant ?? ctx.variant,
          size: size ?? ctx.size,
        }),
        isActive && 'bg-primary text-white', // or use `data-[state=on]` in variants
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
