'use client';

import React, { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

type PopoverProps = {
  children: React.ReactNode;
};

type PopoverContentProps = {
  children: React.ReactNode;
  className?: string;
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
};

const PopoverContext = React.createContext<{
  open: boolean;
  setOpen: (v: boolean) => void;
} | null>(null);

function usePopoverContext() {
  const ctx = React.useContext(PopoverContext);
  if (!ctx) {
    throw new Error('Popover components must be used within <Popover>');
  }
  return ctx;
}

export function Popover({ children }: PopoverProps) {
  const [open, setOpen] = useState(false);

  return (
    <PopoverContext.Provider value={{ open, setOpen }}>
      <div className="relative inline-block">{children}</div>
    </PopoverContext.Provider>
  );
}

export function PopoverTrigger({ children }: { children: React.ReactNode }) {
  const { setOpen } = usePopoverContext();

  return (
    <div
      onClick={() => setOpen((prev) => !prev)}
      className="cursor-pointer inline-flex"
    >
      {children}
    </div>
  );
}

export function PopoverContent({
  children,
  className,
  align = 'center',
  sideOffset = 8,
}: PopoverContentProps) {
  const { open, setOpen } = usePopoverContext();
  const ref = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open, setOpen]);

  const alignClass = {
    start: 'left-0',
    center: 'left-1/2 -translate-x-1/2',
    end: 'right-0',
  }[align];

  if (!open) return null;

  return (
    <div
      ref={ref}
      className={cn(
        'absolute z-50 mt-2 w-72 rounded-md border bg-white p-4 shadow-lg text-sm transition-all',
        alignClass,
        className
      )}
      style={{ top: `${sideOffset}px` }}
    >
      {children}
    </div>
  );
}
