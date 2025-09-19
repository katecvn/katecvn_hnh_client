import React, { useState, useRef } from 'react';
import { cn } from '@/lib/utils';

type TooltipProps = {
  children: React.ReactNode;
  content: React.ReactNode;
  className?: string;
  sideOffset?: number;
  delay?: number; // thêm delay ms
};

const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  className,
  sideOffset = 4,
  delay = 150,
}) => {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    timerRef.current = setTimeout(() => setVisible(true), delay);
  };

  const handleMouseLeave = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setVisible(false);
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {visible && (
        <div
          className={cn(
            'absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-50 whitespace-nowrap rounded-md bg-black bg-opacity-80 px-3 py-1 text-sm text-white shadow-lg transition-opacity duration-200',
            className
          )}
          style={{
            transform: `translate(-50%, calc(-100% - 2*${sideOffset}px))`,
            marginTop: '4px',
          }}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
