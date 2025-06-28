'use client';

import React, { useEffect, useState } from 'react';
import { ArrowRight, Shield, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import api from '@/utils/axios';
import { localStorageUtil } from '@/utils/localStorage';

const GoogleLoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data } = await api.get('/customer/auth/google/redirect');

      if (data?.data) {
        const popupWidth = 600;
        const popupHeight = 600;
        const left = window.screenX + (window.outerWidth - popupWidth) / 2;
        const top = window.screenY + (window.outerHeight - popupHeight) / 2;

        const popup = window.open(
          data.data,
          '_blank',
          `noopener,noreferrer,width=${popupWidth},height=${popupHeight},top=${top},left=${left}`
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
    console.log(11122);
    const listener = () => {
      console.log(11122233);
      const status = localStorageUtil.getAuthStatus();
      const message = localStorageUtil.getAuthMessage();

      if (status && message) {
        if (status === 'success') {
          toast.success(message);
          window.location.href = '/';
        } else {
          toast.error(message);
        }

        localStorageUtil.clearAuthStatus();
      }
    };

    window.addEventListener('message', listener);
    return () => window.removeEventListener('message', listener);
  }, []);

  // useEffect(() => {
  //   console.log('Received Google ');
  //   const listener = async (event: MessageEvent) => {
  //     console.log('Received Google 132423 ');
  //     if (event.origin !== window.location.origin) return;

  //     const { type, payload } = event.data;

  //     if (type === 'google-auth-code') {
  //       try {
  //         const rawQuery = payload.rawQuery;
  //         console.log('Received Google OAuth code:', rawQuery);

  //         if (!rawQuery) {
  //           toast.error('Không nhận được mã code từ Google');
  //           return;
  //         }

  //         // Gửi mã code về server để lấy access token và thông tin user
  //         const { data } = await api.get(
  //           `/customer/auth/google/callback?code=${rawQuery}`
  //         );

  //         if (data?.token) {
  //           localStorage.setItem('token', data.token);
  //           toast.success('Đăng nhập Google thành công!');

  //           // 👉 Thực hiện điều hướng (ví dụ về trang dashboard)
  //           window.location.href = '/dashboard';
  //         } else {
  //           toast.error('Đăng nhập thất bại. Không nhận được token');
  //         }
  //       } catch (err) {
  //         console.error(err);
  //         toast.error('Xác thực Google thất bại, vui lòng thử lại');
  //       } finally {
  //         window.removeEventListener('message', listener);
  //       }
  //     }

  //     if (type === 'google-auth-error') {
  //       toast.error('Đăng nhập Google thất bại');
  //       window.removeEventListener('message', listener);
  //     }
  //   };

  //   window.addEventListener('message', listener);
  //   return () => window.removeEventListener('message', listener);
  // }, []);

  // const { handleGoogleLogin } = useGoogleLogin();

  return (
    <div className=" pt-16 flex flex-col justify-between min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-blue-100">
      {/* Nội dung Google Login */}
      <div className="flex items-center justify-center p-4 relative overflow-hidden flex-grow z-10">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-300 to-blue-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-slate-300 to-blue-400 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-bounce opacity-40"></div>
          <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-blue-300 rounded-full animate-bounce delay-300 opacity-30"></div>
          <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce delay-700 opacity-50"></div>
          <div className="absolute bottom-1/4 left-1/2 w-2.5 h-2.5 bg-slate-400 rounded-full animate-bounce delay-1000 opacity-25"></div>
        </div>

        {/* Main Container */}
        <div className="relative w-full max-w-lg">
          {/* Main Card */}
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-blue-100/50 p-10 relative overflow-hidden">
            {/* Decorative Corner Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-50/60 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-slate-50/60 to-transparent rounded-full translate-y-12 -translate-x-12"></div>

            {/* Sparkle Effects */}
            <div className="absolute top-6 right-6">
              <Sparkles className="w-5 h-5 text-blue-400 animate-pulse opacity-60" />
            </div>
            <div className="absolute bottom-6 left-6">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse delay-500 opacity-50" />
            </div>

            {/* Back to Home Button */}
            <button
              onClick={() => {
                //console.log('Navigate to homepage');
                window.location.href = '/';
              }}
              className="absolute top-8 left-8 flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors group"
            >
              <svg
                className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span className="text-sm font-medium">Trang chủ</span>
            </button>

            {/* Header Section */}
            <div className="text-center mb-10 relative z-10">
              {/* Logo/Icon */}
              <div className="relative group">
                <div className=" flex justify-center pt-3 pb-5">
                  <span
                    className={cn(
                      'text-3xl font-black tracking-tight relative transition-all duration-500',
                      'group-hover:from-sky-300 group-hover:via-purple-400 group-hover:to-blue-500',
                      'opacity-90 scale-95'
                    )}
                  >
                    <img
                      src="/logo.png"
                      alt="Logo"
                      className="w-auto h-14 object-contain md:w-full"
                      style={{
                        maxWidth: '100%',
                        display: 'block',
                      }}
                      loading="eager"
                      decoding="sync"
                    />
                    {/* Underline accent */}
                    <div
                      className={cn(
                        'absolute -bottom-2 left-0 h-1 transition-all duration-500 w-0 group-hover:w-full',
                        'bg-gradient-to-r from-blue-900 via-sky-400 to-cyan-600'
                      )}
                    ></div>
                    {/* Floating dot accent */}
                    <div
                      className={cn(
                        'absolute -top-1 -right-2 w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 animate-bounce transition-opacity duration-300',
                        'bg-gradient-to-br from-sky-400 to-purple-500'
                      )}
                    ></div>
                  </span>
                </div>
              </div>

              {/* Welcome Text */}
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-3">
                Xin chào, bạn!
              </h1>
              <p className="text-slate-600 text-base leading-relaxed">
                Đăng nhập nhanh chóng và an toàn
                <br />
                <span className="text-blue-600 font-medium">
                  bằng tài khoản Google của bạn
                </span>
              </p>
            </div>

            {/* Google Login Button */}
            <button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full group relative"
            >
              <div className="bg-white border-2 border-gray-200 rounded-xl p-4 transition-all duration-300 hover:border-blue-300 hover:shadow-lg group-hover:scale-[1.02] relative">
                {/* Button Content */}
                <div className="flex items-center justify-center gap-3">
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-sm font-medium text-gray-700">
                        Đang xác thực...
                      </span>
                    </>
                  ) : (
                    <>
                      {/* Google Icon */}
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

                      <span className=" md:text-md font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                        Đăng nhập với Google
                      </span>

                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300" />
                    </>
                  )}
                </div>
              </div>
            </button>

            {/* Features List */}
            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-3 text-slate-600">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                <span className="text-sm">
                  Đăng nhập an toàn với mã hóa end-to-end
                </span>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                <span className="text-sm">Không cần nhớ mật khẩu phức tạp</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></div>
                <span className="text-sm">
                  Truy cập nhanh chóng trong 1 cú click
                </span>
              </div>
            </div>

            {/* Security Badge */}
            <div className="mt-6 p-3 bg-gradient-to-r from-blue-50 to-slate-50 rounded-xl border border-blue-100">
              <div className="flex items-center justify-center gap-2">
                <Shield className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-blue-700 font-medium">
                  Được bảo vệ bởi Google Security
                </span>
              </div>
            </div>
          </div>

          {/* Floating Action Elements */}
          <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-15 animate-bounce shadow-md"></div>
          <div className="absolute -bottom-8 -left-6 w-6 h-6 bg-gradient-to-r from-slate-400 to-blue-400 rounded-full opacity-20 animate-pulse shadow-md"></div>
          <div className="absolute top-1/3 -right-8 w-4 h-4 bg-gradient-to-r from-blue-300 to-cyan-300 rounded-full opacity-25 animate-ping shadow-md"></div>
        </div>
      </div>
    </div>
  );
};

export default GoogleLoginPage;
