import Link from 'next/link';
import { GoogleLoginModal } from './enhanced-modal';
import { useState } from 'react';

export const RequestLogin = ({ message }: { message: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="p-8  text-center">
      <div className="mx-auto mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-50">
        <svg
          className="h-6 w-6 text-green-cyan-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.25a8.25 8.25 0 1 1 15 0v.75H4.5v-.75Z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-800">Cần đăng nhập</h3>
      <p className="mt-1 text-sm text-gray-600">
        Vui lòng đăng nhập để {message} của bạn.
      </p>
      <div className="mt-4 flex items-center justify-center gap-3">
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center rounded-lg font-semibold bg-green-600 px-6 py-2 text-white hover:bg-green-500 transition"
        >
          Đăng nhập
        </button>
      </div>
      <GoogleLoginModal open={open} onOpenChange={() => setOpen(false)} />
    </div>
  );
};
