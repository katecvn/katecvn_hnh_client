'use client';

import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { ChevronRight, Check, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

const DropdownMenuContext = createContext<{
  isOpen: boolean;
  setOpen: (v: boolean) => void;
} | null>(null);

export const DropdownMenu = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <DropdownMenuContext.Provider value={{ isOpen, setOpen }}>
      <div className="relative inline-block text-left">{children}</div>
    </DropdownMenuContext.Provider>
  );
};

export const DropdownMenuTrigger = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const ctx = useContext(DropdownMenuContext);
  if (!ctx) return null;

  return (
    <button
      onClick={() => ctx.setOpen(!ctx.isOpen)}
      className="inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium bg-gray-100 hover:bg-gray-200"
    >
      {children}
    </button>
  );
};

export const DropdownMenuContent = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ctx = useContext(DropdownMenuContext);
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        ctx?.setOpen(false);
      }
    },
    [ctx]
  );

  useEffect(() => {
    if (ctx?.isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ctx?.isOpen, handleClickOutside]);

  if (!ctx?.isOpen) return null;

  return (
    <div
      ref={ref}
      className={cn(
        'absolute z-50 mt-2 w-56 rounded-md bg-white shadow-lg border p-1 text-sm',
        className
      )}
    >
      {children}
    </div>
  );
};

export const DropdownMenuItem = ({
  children,
  onClick,
  className,
  inset,
  disabled,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  inset?: boolean;
  disabled?: boolean;
}) => {
  return (
    <button
      onClick={disabled ? undefined : onClick}
      className={cn(
        'w-full text-left px-2 py-1.5 rounded-sm transition-colors hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2',
        inset && 'pl-8',
        className
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export const DropdownMenuSeparator = () => (
  <div className="my-1 h-px bg-gray-200" />
);

export const DropdownMenuLabel = ({
  children,
  inset,
}: {
  children: React.ReactNode;
  inset?: boolean;
}) => (
  <div
    className={cn(
      'px-2 py-1.5 text-xs font-semibold text-gray-500',
      inset && 'pl-8'
    )}
  >
    {children}
  </div>
);

export const DropdownMenuCheckboxItem = ({
  checked,
  children,
  onClick,
}: {
  checked: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  return (
    <DropdownMenuItem onClick={onClick} className="pl-8 relative">
      <span className="absolute left-2 top-1.5">
        {checked && <Check className="w-4 h-4" />}
      </span>
      {children}
    </DropdownMenuItem>
  );
};

export const DropdownMenuRadioItem = ({
  selected,
  children,
  onClick,
}: {
  selected: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  return (
    <DropdownMenuItem onClick={onClick} className="pl-8 relative">
      <span className="absolute left-2 top-1.5">
        {selected && <Circle className="w-3 h-3 fill-current" />}
      </span>
      {children}
    </DropdownMenuItem>
  );
};

export const DropdownMenuShortcut = ({ text }: { text: string }) => (
  <span className="ml-auto text-xs text-gray-400 tracking-wide">{text}</span>
);
