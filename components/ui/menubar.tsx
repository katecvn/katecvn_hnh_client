'use client';

import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Menubar = ({ children }: { children: React.ReactNode }) => (
  <div className="flex h-10 items-center space-x-1 rounded-md border bg-white p-1 shadow-sm">
    {children}
  </div>
);

export const MenubarItem = ({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) => (
  <button
    onClick={onClick}
    className={cn(
      'px-3 py-1.5 text-sm font-medium rounded-sm hover:bg-gray-100 focus:outline-none',
      className
    )}
  >
    {children}
  </button>
);

export const MenubarMenu = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <MenubarItem>
        {label} <ChevronRight className="ml-2 h-4 w-4" />
      </MenubarItem>
      {open && (
        <div className="absolute top-full left-0 mt-1 w-48 bg-white border rounded-md shadow-lg z-50 p-1 space-y-1">
          {children}
        </div>
      )}
    </div>
  );
};

export const MenubarSubItem = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) => (
  <div
    onClick={onClick}
    className="px-3 py-1.5 text-sm rounded-sm hover:bg-gray-100 cursor-pointer"
  >
    {children}
  </div>
);
