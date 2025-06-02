'use client';

import { ReactNode } from 'react';

interface ButtonScrollProps {
  children: ReactNode;
  size?: 'default' | 'lg';
  variant?: 'default' | 'outline';
  className?: string;
  targetId?: string;
  [key: string]: any;
}

export const ButtonScroll = ({
  children,
  size = 'default',
  variant = 'default',
  className = '',
  targetId = 'portfolio',
  ...props
}: ButtonScrollProps) => {
  const baseStyles =
    'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

  const sizeStyles = size === 'lg' ? 'h-11 px-8 py-2' : 'h-10 px-4 py-2';

  const variantStyles =
    variant === 'outline'
      ? 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'
      : 'bg-primary text-primary-foreground hover:bg-primary/90 bg-gradient-to-r from-blue-600 to-purple-600';

  const handleClick = () => {
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};
