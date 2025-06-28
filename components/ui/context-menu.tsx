'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Check, ChevronRight, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

export const ContextMenu = ({
  children,
  menu,
}: {
  children: React.ReactNode;
  menu: React.ReactNode;
}) => {
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setPos({ x: e.pageX, y: e.pageY });
    setVisible(true);
  };

  const handleClick = () => setVisible(false);

  useEffect(() => {
    if (visible) {
      document.addEventListener('click', handleClick);
    }
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [visible]);

  return (
    <div onContextMenu={handleContextMenu} className="relative">
      {children}
      {visible && (
        <div
          ref={menuRef}
          className="absolute z-50 min-w-[8rem] rounded-md border bg-white p-1 text-gray-900 shadow-lg"
          style={{ top: pos.y, left: pos.x }}
        >
          {menu}
        </div>
      )}
    </div>
  );
};

export const ContextMenuItem = ({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => (
  <div
    onClick={onClick}
    className={cn(
      'flex cursor-pointer select-none items-center rounded px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground',
      className
    )}
  >
    {children}
  </div>
);

export const ContextMenuSeparator = () => (
  <div className="my-1 h-px bg-gray-200" />
);

export const ContextMenuLabel = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <div className="px-2 py-1.5 text-sm font-semibold text-gray-600">
    {children}
  </div>
);

export const ContextMenuCheckboxItem = ({
  checked,
  children,
}: {
  checked: boolean;
  children: React.ReactNode;
}) => (
  <ContextMenuItem>
    <span className="mr-2 w-4">
      {checked ? <Check className="h-4 w-4" /> : null}
    </span>
    {children}
  </ContextMenuItem>
);

export const ContextMenuRadioItem = ({
  selected,
  children,
}: {
  selected: boolean;
  children: React.ReactNode;
}) => (
  <ContextMenuItem>
    <span className="mr-2 w-4">
      {selected ? <Circle className="h-2 w-2 fill-current" /> : null}
    </span>
    {children}
  </ContextMenuItem>
);

export const ContextMenuShortcut = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <span className="ml-auto text-xs tracking-widest text-gray-400">
    {children}
  </span>
);
