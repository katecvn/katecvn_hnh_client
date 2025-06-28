import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface CollapsibleProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

export const Collapsible: React.FC<CollapsibleProps> = ({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  children,
  className,
}) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  const setOpen = (value: boolean) => {
    if (!isControlled) setInternalOpen(value);
    onOpenChange?.(value);
  };

  return (
    <div
      className={cn('w-full', className)}
      data-state={open ? 'open' : 'closed'}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        return React.cloneElement(child as any, {
          open,
          setOpen,
        });
      })}
    </div>
  );
};

interface TriggerProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: (open: boolean) => void;
}

export const CollapsibleTrigger: React.FC<TriggerProps> = ({
  open,
  setOpen,
  children,
  ...props
}) => {
  return (
    <button aria-expanded={open} onClick={() => setOpen?.(!open)} {...props}>
      {children}
    </button>
  );
};

interface ContentProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
}

export const CollapsibleContent: React.FC<ContentProps> = ({
  open,
  children,
  className,
  ...props
}) => {
  return (
    <div
      hidden={!open}
      className={cn('transition-all duration-300', className)}
      {...props}
    >
      {children}
    </div>
  );
};
