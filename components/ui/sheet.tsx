'use client';

import React, { useContext, createContext, ReactNode } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

// Types
interface SheetContextType {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Context
const SheetContext = createContext<SheetContextType | null>(null);

// Main Provider
export const Sheet = ({
  children,
  open,
  onOpenChange,
}: SheetContextType & { children: ReactNode }) => {
  return (
    <SheetContext.Provider value={{ open, onOpenChange }}>
      {children}
    </SheetContext.Provider>
  );
};

// Trigger
export const SheetTrigger = ({
  children,
  className,
  ...props
}: {
  children: ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const context = useContext(SheetContext);
  if (!context) return null;

  return (
    <button
      onClick={() => context.onOpenChange(true)}
      className={className}
      {...props}
    >
      {children}
    </button>
  );
};

// Content
export const SheetContent = ({
  children,
  side = 'right',
  className,
}: {
  children: ReactNode;
  side?: 'left' | 'right' | 'top' | 'bottom';
  className?: string;
}) => {
  const context = useContext(SheetContext);
  if (!context || !context.open) return null;

  const positionClass =
    side === 'right'
      ? 'right-0 top-0 h-full w-80'
      : side === 'left'
      ? 'left-0 top-0 h-full w-80'
      : side === 'top'
      ? 'top-0 left-0 w-full h-64'
      : 'bottom-0 left-0 w-full h-64';

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={() => context.onOpenChange(false)}
      />
      <div
        className={cn(
          'fixed z-50 bg-white shadow-xl p-6 transition-all animate-in slide-in-from-right duration-300',
          positionClass,
          className
        )}
      >
        {children}
      </div>
    </>
  );
};

// Close
export const SheetClose = ({ className }: { className?: string }) => {
  const context = useContext(SheetContext);
  if (!context) return null;

  return (
    <button
      className={cn('absolute top-4 right-4', className)}
      onClick={() => context.onOpenChange(false)}
    >
      <X className="h-5 w-5" />
    </button>
  );
};

// Header
export const SheetHeader = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div className={cn('mb-4 text-lg font-semibold', className)}>{children}</div>
);

// Footer
export const SheetFooter = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div className={cn('mt-6 flex justify-end gap-2', className)}>{children}</div>
);

// Title
export const SheetTitle = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => <h2 className={cn('text-xl font-bold mb-2', className)}>{children}</h2>;

// Description
export const SheetDescription = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => <p className={cn('text-sm text-gray-600', className)}>{children}</p>;
