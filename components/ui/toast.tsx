'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

type ToastType = 'default' | 'destructive';

interface ToastOptions {
  title: string;
  description?: string;
  type?: ToastType;
  duration?: number;
  action?: React.ReactNode;
}

interface ToastData extends ToastOptions {
  id: string;
}

interface ToastContextProps {
  showToast: (options: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    // fallback: không ném lỗi, chỉ cảnh báo
    return {
      showToast: ({ title }: { title: string }) => {
        if (process.env.NODE_ENV !== 'production') {
          console.warn('useToast called without ToastProvider:', title);
        }
      },
    } as ToastContextProps;
  }
  return ctx;
};

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const showToast = useCallback((options: ToastOptions) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { ...options, id }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, options.duration ?? 3000);
  }, []);

  const remove = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[100] flex w-full max-w-sm flex-col gap-3">
        {toasts.map(({ id, title, description, type = 'default', action }) => (
          <div
            key={id}
            className={cn(
              'relative flex w-full flex-col rounded-md border p-4 shadow-lg bg-white text-black',
              type === 'destructive' && 'bg-red-600 text-white border-red-700'
            )}
          >
            <strong className="text-sm font-semibold">{title}</strong>
            {description && <p className="text-sm">{description}</p>}
            {action && <div className="mt-2">{action}</div>}
            <button
              onClick={() => remove(id)}
              className="absolute right-2 top-2 text-gray-400 hover:text-black"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
