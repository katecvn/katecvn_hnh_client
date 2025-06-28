import React from 'react';
import { Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RadioGroupProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
  className?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  value,
  onChange,
  options,
  className,
}) => {
  return (
    <div className={cn('grid gap-2', className)}>
      {options.map((option) => (
        <label
          key={option.value}
          className="flex items-center space-x-2 cursor-pointer"
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
            className="peer hidden"
          />
          <span
            className={cn(
              'inline-flex items-center justify-center h-4 w-4 rounded-full border border-primary transition',
              value === option.value && 'bg-primary text-white'
            )}
          >
            {value === option.value && (
              <Circle className="h-2.5 w-2.5 fill-current text-current" />
            )}
          </span>
          <span className="text-gray-700 text-sm">{option.label}</span>
        </label>
      ))}
    </div>
  );
};
