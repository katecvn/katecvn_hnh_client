'use client';

import * as React from 'react';
import { cn } from '@/lib/utils'; // Hàm merge class (tùy bạn giữ hoặc bỏ)

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface CustomSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  placeholder?: string;
  label?: string;
  labelClassName?: string;
  wrapperClassName?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, CustomSelectProps>(
  (
    {
      options,
      placeholder,
      label,
      labelClassName,
      wrapperClassName,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn('space-y-1', wrapperClassName)}>
        {label && (
          <label
            className={cn('text-sm font-medium text-gray-700', labelClassName)}
            htmlFor={props.id}
          >
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={cn(
            'block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50',
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

Select.displayName = 'CustomSelect';
