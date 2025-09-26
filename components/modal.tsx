'use client';

import React, { useEffect, useState } from 'react';
import { ArrowRight, Shield, CheckCircle } from 'lucide-react';

import api from '@/utils/axios';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { toast } from 'sonner';
import { useToast } from './ui/toast';

export interface DialogProps {
  open: boolean;
  onOpenChange: (open?: boolean) => void;
}

export const GoogleLoginModal = ({ open, onOpenChange }: DialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();
  const handleGoogleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data } = await api.get('/customer/auth/google/redirect');

      if (data?.data) {
        const popupWidth = 500;
        const popupHeight = 600;
        const left = window.screenX + (window.outerWidth - popupWidth) / 2;
        const top = window.screenY + (window.outerHeight - popupHeight) / 2;

        const popup = window.open(
          data.data,
          '_blank',
          `width=${popupWidth},height=${popupHeight},top=${top},left=${left}`
        );

        if (!popup) {
          toast.error(
            'Trình duyệt đã chặn cửa sổ. Vui lòng bật cho phép popup.'
          );
          return;
        }
      } else {
        toast.error('Không lấy được URL đăng nhập Google');
      }
    } catch (err) {
      toast.error('Xảy ra lỗi, vui lòng thử lại sau!');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;

      if (!event.data || event.data.type !== 'google-auth-status') return;

      const { status, message } = event.data as {
        status: 'success' | 'failed';
        message?: string;
      };

      if (status === 'success') {
        showToast({
          title: 'Lưu thành công',
          description: 'Dữ liệu đã được cập nhật.',
        });
        setTimeout(() => {
          window.location.reload();
        }, 10);
        onOpenChange(false);
      } else {
        toast.error(message || 'Đăng nhập Google thất bại.');
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md w-full p-2">
        <DialogHeader className="text-center space-y-2 mb-6">
          <DialogTitle className="text-2xl font-bold  text-green-cyan-500">
            Đăng nhập bằng Google
          </DialogTitle>
          <DialogDescription className="text-gray-600 text-sm">
            Sử dụng tài khoản Google để đăng nhập nhanh chóng và an toàn
          </DialogDescription>
        </DialogHeader>

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="/logo-crop.png"
            alt="Logo"
            className="h-16 w-auto object-contain"
          />
        </div>

        {/* Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="w-full group relative"
        >
          <div className="bg-white border-2 border-gray-200 rounded-xl p-3 mx-5 transition-all duration-300 hover:border-green-500 hover:shadow-lg flex items-center justify-center gap-3">
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm font-medium text-gray-700">
                  Đang xác thực...
                </span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                  Đăng nhập với Google
                </span>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-green-500 group-hover:translate-x-1 transition-all duration-300" />
              </>
            )}
          </div>
        </button>

        {/* Features */}
        <div className="mt-8 space-y-3">
          {[
            'Đăng nhập an toàn với mã hóa end-to-end',
            'Không cần nhớ mật khẩu phức tạp',
            'Truy cập nhanh chóng trong 1 cú click',
          ].map((text, i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-sm text-slate-700"
            >
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
              <span>{text}</span>
            </div>
          ))}
        </div>

        {/* Security Badge */}
        <div className="mt-6 p-3 bg-gradient-to-r from-green-50 to-slate-50 rounded-xl border border-green-100">
          <div className="flex items-center justify-center gap-2">
            <Shield className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-700 font-medium">
              Được bảo vệ bởi Google Security
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
