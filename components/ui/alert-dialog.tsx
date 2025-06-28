import React, { useRef } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

interface AlertDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: React.ReactNode;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
}

export const AlertDialog: React.FC<AlertDialogProps> = ({
  open,
  onClose,
  title,
  description,
  onConfirm,
  confirmText = 'Xác nhận',
  cancelText = 'Hủy',
  children,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Content */}
      <div
        ref={dialogRef}
        className="relative z-10 w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-xl p-6 animate-fade-in"
      >
        <div className="text-lg font-semibold text-gray-900 mb-2">{title}</div>
        {description && (
          <div className="text-sm text-gray-600 mb-4">{description}</div>
        )}

        {children}

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className={cn(
              buttonVariants({ variant: 'outline' }),
              'mt-0 sm:mt-0'
            )}
          >
            {cancelText}
          </button>
          {onConfirm && (
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className={cn(buttonVariants(), 'mt-0 sm:mt-0')}
            >
              {confirmText}
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};
