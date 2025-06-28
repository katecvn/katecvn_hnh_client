// Sidebar React17-compatible implementation
// File: Sidebar.tsx

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import type { ReactNode, FC } from 'react';
import { cn } from '@/lib/utils';

// Constants
const SIDEBAR_KEYBOARD_SHORTCUT = 'b';
const SIDEBAR_CONTEXT = createContext<SidebarContextValue | undefined>(
  undefined
);

interface SidebarContextValue {
  open: boolean;
  toggle: () => void;
}

export const SidebarProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(true);

  const toggle = useCallback(() => setOpen((prev) => !prev), []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey || e.metaKey) &&
        e.key.toLowerCase() === SIDEBAR_KEYBOARD_SHORTCUT
      ) {
        e.preventDefault();
        toggle();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [toggle]);

  const value = useMemo(() => ({ open, toggle }), [open, toggle]);

  return (
    <SIDEBAR_CONTEXT.Provider value={value}>
      {children}
    </SIDEBAR_CONTEXT.Provider>
  );
};

export const useSidebar = (): SidebarContextValue => {
  const context = useContext(SIDEBAR_CONTEXT);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};

export const Sidebar: FC<{
  children: ReactNode;
  className?: string;
}> = ({ children, className }) => {
  const { open } = useSidebar();

  return (
    <aside
      className={cn(
        'transition-all duration-300 ease-in-out bg-gray-800 text-white h-screen p-4',
        open ? 'w-64' : 'w-16',
        className
      )}
    >
      {children}
    </aside>
  );
};

export const SidebarToggle: FC<{ className?: string }> = ({ className }) => {
  const { toggle } = useSidebar();

  return (
    <button
      onClick={toggle}
      className={cn('p-2 text-sm bg-gray-700 hover:bg-gray-600', className)}
    >
      Toggle
    </button>
  );
};

export const SidebarItem: FC<{
  children: ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <div className={cn('py-2 px-4 hover:bg-gray-700 cursor-pointer', className)}>
    {children}
  </div>
);
