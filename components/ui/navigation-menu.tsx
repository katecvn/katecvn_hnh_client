'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export function NavigationMenu({ children }: { children: React.ReactNode }) {
  return (
    <nav className="relative z-10 flex items-center justify-center space-x-4">
      {children}
    </nav>
  );
}

export function NavigationMenuItem({
  label,
  children,
}: {
  label: React.ReactNode;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className={cn(
          'flex items-center gap-1 px-4 py-2 text-sm font-medium bg-white hover:bg-gray-100 rounded-md transition'
        )}
      >
        {label}
        <ChevronDown
          className={cn(
            'h-4 w-4 transition-transform duration-200',
            open && 'rotate-180'
          )}
        />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 w-64 rounded-md border bg-white shadow-lg p-4 z-50">
          {children}
        </div>
      )}
    </div>
  );
}

export function NavigationMenuLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition"
    >
      {children}
    </a>
  );
}
