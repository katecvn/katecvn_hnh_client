import React, { useState } from 'react';
import { cn } from '@/lib/utils';

type TooltipProps = {
  children: React.ReactNode;
  content: React.ReactNode;
  className?: string;
  sideOffset?: number;
};

const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  className,
  sideOffset = 8,
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div
          className={cn(
            'absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-50 whitespace-nowrap rounded-md bg-black bg-opacity-80 px-3 py-1 text-sm text-white shadow-lg',
            className
          )}
          style={{
            transform: `translate(-50%, calc(-100% - ${sideOffset}px))`,
          }}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
