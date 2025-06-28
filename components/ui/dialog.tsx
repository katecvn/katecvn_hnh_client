'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { createPortal } from 'react-dom';

// Types
interface DialogProps {
  open: boolean;
  onClose?: () => void;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export const Dialog = ({
  open,
  onClose,
  onOpenChange,
  children,
}: DialogProps) => {
  useEffect(() => {
    // setup
    if (open) {
      document.body.style.overflow = 'hidden';
    }

    // cleanup
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const handleClose = () => {
    onClose?.();
    onOpenChange?.(false);
  };

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="relative rounded-lg bg-white p-6 shadow-xl mt-0 max-w-lg max-h-[90vh] overflow-y-auto scrollbar-thumb-only scrollbar-hide">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X className="h-6 w-6" />
        </button>
        <div className="mt-0">{children}</div>
      </div>
    </div>,
    document.body
  );
};

export const DialogContent = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={cn('mt-0', className)}>{children}</div>;

// Trigger — bạn sẽ tự xử lý show/hide từ bên ngoài
export const DialogTrigger = ({
  onOpen,
  children,
}: {
  onOpen: () => void;
  children: React.ReactNode;
}) => (
  <button onClick={onOpen} type="button">
    {children}
  </button>
);

// Header
export const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-1.5', className)} {...props} />
);

// Footer
export const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
      className
    )}
    {...props}
  />
);

// Title
export const DialogTitle = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2
    className={cn('text-lg font-semibold leading-none', className)}
    {...props}
  />
);

// Description
export const DialogDescription = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn('text-sm text-gray-600 mb-3', className)} {...props} />
);
