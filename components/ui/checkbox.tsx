import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, checked, ...props }, ref) => {
    return (
      <label className="relative inline-flex items-center">
        <input
          type="checkbox"
          ref={ref}
          checked={checked}
          className={cn(
            'peer appearance-none h-4 w-4 shrink-0 rounded-sm border border-primary bg-white ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          {...props}
        />
        <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {checked && <Check className="h-4 w-4 text-primary" />}
        </span>
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
