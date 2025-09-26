import * as Icons from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { AlertCircle, RefreshCw, Zap } from 'lucide-react';

// Loading Partners Skeleton
export const LoadingPartnersSkeleton = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 animate-pulse">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="bg-white rounded-lg p-4 shadow-md h-32">
          <div className="w-full h-20 bg-gray-200 rounded"></div>
        </div>
      ))}
    </div>
  );
};

// Loading Products Skeleton (for detailed solutions section)
export const LoadingProductsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 animate-pulse [animation-duration:4s]">
      {[...Array(6)].map((_, index) => (
        <div className="group relative block border border-neutral-gray-100 rounded-sm bg-white shadow-lgtransition-all duration-300">
          {/* Discount badge */}
          <div className="absolute top-3 left-3 z-20">
            <div className="h-6 w-14 rounded-full bg-gray-200 animate-pulse [animation-duration:4s]" />
          </div>

          {/* Product Image (1:1) */}
          <div className="flex items-center justify-center">
            <div className="relative w-full aspect-[1/1] overflow-hidden">
              <Image
                src="/placeholder.jpg"
                alt=""
                layout="fill"
                objectFit="cover"
                className="product-image rounded-t-sm object-cover cursor-pointer  transition-all duration-300 rounded-t-sm"
              />
            </div>
          </div>

          {/* Info */}
          <div className="px-3 py-4">
            {/* Prices */}
            <div className="flex items-center gap-2 mb-2">
              <div className="h-3 w-20 bg-gray-200 rounded animate-pulse [animation-duration:4s]" />
              <div className="h-5 w-28 bg-gray-300 rounded animate-pulse [animation-duration:4s]" />
            </div>

            {/* Add to cart / qty controls */}
            <div className="mt-2">
              <div className="h-9 w-full rounded bg-gray-200 animate-pulse [animation-duration:4s]" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Error Component
interface ErrorDisplayProps {
  message: string;
  onRetry: () => void;
  title?: string;
}

export const ErrorDisplay = ({ title, onRetry }: ErrorDisplayProps) => {
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = async () => {
    setIsRetrying(true);
    await onRetry();
    setTimeout(() => setIsRetrying(false), 500);
  };

  return (
    <div className=" flex items-center justify-center p-4 ">
      {/* Main error card */}
      <div className="relative max-w-md w-full">
        {/* Glass morphism container */}
        <div className="backdrop-blur-xl bg-white/70 p-8 text-center relative overflow-hidden">
          {/* Content */}
          <div className="relative z-10">
            {/* Animated error icon */}
            <div className="w-12 h-12  rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg transform hover:scale-105 transition-all duration-300">
              <AlertCircle className="h-8 w-8 text-red-500 transition-all duration-300" />
            </div>

            {/* Title with gradient text */}
            <h3 className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-3">
              Đã xảy ra lỗi!
            </h3>

            <p className="text-gray-600 mb-8 leading-relaxed font-medium">
              Rất tiếc, một số lỗi đã xảy ra trong quá trình {title}. Vui lòng
              thử lại sau.
            </p>

            {/* Enhanced retry button */}
            <button
              onClick={handleRetry}
              disabled={isRetrying}
              className="group relative inline-flex items-center justify-center px-6 py-2 font-semibold text-white transition-all duration-300 ease-out bg-gradient-to-r from-emerald-600/80 to-green-500/80 rounded-md shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {/* Button background effects */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-500 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Button content */}
              <div className="relative flex items-center">
                {isRetrying ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                    Đang thử lại...
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-5 w-5 mr-3 group-hover:rotate-180 transition-transform duration-500" />
                    Thử lại
                    <Zap className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-1" />
                  </>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Loading Spinner Component
export const LoadingSpinner = ({
  size = 'default',
}: {
  size?: 'sm' | 'default' | 'lg';
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    default: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex items-center justify-center py-8">
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-tech-blue-200 border-t-tech-blue-600`}
      ></div>
    </div>
  );
};

// Section Loading Wrapper
export const SectionLoader = ({
  loading,
  error,
  onRetry,
  children,
  loadingComponent: LoadingComponent,
  errorTitle,
  revealDelay = 250,
}: {
  loading: boolean;
  error: string | null;
  onRetry: () => void;
  children: React.ReactNode;
  loadingComponent: React.ComponentType;
  errorTitle?: string;
  revealDelay?: number;
}) => {
  const [showChildren, setShowChildren] = useState(!loading && !error);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout> | null = null;

    if (loading || error) {
      // đang loading hoặc có lỗi → chưa show content
      setShowChildren(false);
      if (t) clearTimeout(t as any);
      return;
    }

    // đã load xong & không lỗi → đợi thêm 1 chút cho mượt
    t = setTimeout(() => setShowChildren(true), revealDelay);

    return () => {
      if (t) clearTimeout(t);
    };
  }, [loading, error, revealDelay]);

  if (loading || (!showChildren && !error)) {
    // vẫn hiển thị skeleton trong thời gian trì hoãn
    return <LoadingComponent />;
  }

  if (error) {
    return (
      <ErrorDisplay message={error} onRetry={onRetry} title={errorTitle} />
    );
  }

  // Hiển thị nội dung thật, có thể thêm hiệu ứng fade-in nhẹ
  return (
    <div className="opacity-100 transition-opacity duration-300">
      {children}
    </div>
  );
};
