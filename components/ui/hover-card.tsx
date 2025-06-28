'use client';

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

type HoverCardProps = {
  children: React.ReactNode;
};

type HoverCardContentProps = {
  children: React.ReactNode;
  className?: string;
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
};

export const HoverCard = ({ children }: HoverCardProps) => {
  return <div className="relative inline-block">{children}</div>;
};

export const HoverCardTrigger = ({
  children,
  onHoverChange,
}: {
  children: React.ReactNode;
  onHoverChange?: (visible: boolean) => void;
}) => {
  const setVisible = useHoverCardContext();
  return (
    <div
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
    </div>
  );
};

const HoverCardContext = React.createContext<((v: boolean) => void) | null>(
  null
);

const useHoverCardContext = () => {
  const ctx = React.useContext(HoverCardContext);
  if (!ctx) throw new Error('Must be used inside <HoverCardProvider />');
  return ctx;
};

export const HoverCardContent = ({
  children,
  className,
  align = 'center',
  sideOffset = 4,
}: HoverCardContentProps) => {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const show = () => {
      clearTimeout(timeoutRef.current!);
      setVisible(true);
    };

    const hide = () => {
      timeoutRef.current = setTimeout(() => setVisible(false), 100);
    };

    node.addEventListener('mouseenter', show);
    node.addEventListener('mouseleave', hide);
    return () => {
      node.removeEventListener('mouseenter', show);
      node.removeEventListener('mouseleave', hide);
    };
  }, []);

  const positionClass = {
    start: 'left-0',
    center: 'left-1/2 -translate-x-1/2',
    end: 'right-0',
  }[align];

  return (
    <HoverCardContext.Provider value={setVisible}>
      <div ref={containerRef}>
        {visible && (
          <div
            className={cn(
              'absolute z-50 mt-2 w-64 rounded-md border bg-white p-4 shadow-md text-sm transition-opacity duration-200',
              positionClass,
              className
            )}
            style={{ top: `${sideOffset}px` }}
          >
            {children}
          </div>
        )}
      </div>
    </HoverCardContext.Provider>
  );
};
