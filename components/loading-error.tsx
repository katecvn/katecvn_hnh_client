import Image from 'next/image';

import { AlertCircle, Divide, RefreshCw, Zap } from 'lucide-react';
import { useResponsiveCols } from '@/hooks/use-responsive-cols';
import { useEffect, useState } from 'react';

// Loading Categories Skeleton
export const LoadingCategoriesSkeleton = ({ number }: { number: number }) => {
  return (
    <ul className="divide-y bg-white border border-neutral-gray-200 rounded overflow-hidden">
      {[...Array(number)].map((_, i) => (
        <li key={i} className="relative bg-white h-10">
          <div className="bg-white flex items-center justify-between text-base px-4 py-2">
            {/* Category name */}
            <div className="h-4 w-32 bg-gray-300 rounded animate-pulse" />

            {/* Badge + Chevron (fake) */}
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-gray-300 animate-pulse" />
              <div className="h-4 w-4 rounded bg-gray-400 animate-pulse" />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

// Loading News List Skeleton
export const LoadingNewsListSkeleton = ({ number }: { number: number }) => {
  return (
    <ul className="divide-y bg-white border border-neutral-gray-100 rounded font-sans">
      {[...Array(number)].map((_, i) => (
        <li key={i} className="p-3">
          <div className="flex gap-3">
            {/* Thumbnail */}
            <div className="flex flex-1 items-center justify-center">
              <div className="relative w-full aspect-[3/2] rounded bg-gray-300 animate-pulse" />
            </div>

            {/* Title */}
            <div className="flex-[2] text-left space-y-2">
              <div className="h-3 w-40 bg-gray-300 rounded animate-pulse" />
              <div className="h-3 w-36 bg-gray-200 rounded animate-pulse" />
              <div className="h-3 w-28 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

// Loading News List Skeleton
export const LoadingProductListSkeleton = ({ number }: { number: number }) => {
  return (
    <ul className="divide-y bg-white border border-neutral-gray-100 rounded font-sans">
      {[...Array(number)].map((_, i) => (
        <li key={i} className="p-3">
          <div className="flex gap-3">
            {/* Thumbnail */}
            <div className="flex flex-1 items-center justify-center">
              <div className="relative w-full aspect-[3/2] rounded bg-gray-300 animate-pulse">
                <Image
                  src="/placeholder.jpg"
                  alt=""
                  layout="fill"
                  objectFit="cover"
                  className="rounded object-cover cursor-pointer  transition-all duration-300 "
                />
              </div>
            </div>

            {/* Title */}
            <div className="flex-[2] text-left space-y-2">
              <div className="h-4 w-full bg-gray-300 rounded animate-pulse" />
              <div className="flex items-end gap-3">
                <div className="h-3 w-12 bg-gray-200 rounded animate-pulse" />
                <div className="h-5 w-20 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

// Loading Partners Skeleton
export const LoadingBannersSkeleton = () => {
  return (
    <div className="border border-gray-300 shadow-md animate-pulse">
      <div className="bg-gray-200 w-full flex items-center justify-center aspect-[5/2]">
        <div className="relative w-96  aspect-[3/2]">
          <Image
            src="/placeholder.jpg"
            alt=""
            layout="fill"
            objectFit="cover"
            className="rounded object-cover cursor-pointer  transition-all duration-300 "
          />
        </div>
      </div>
    </div>
  );
};

// Loading News Slider Skeleton
export const LoadingNewsSliderSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="group relative block  bg-white transition-all duration-300">
        {/* News Slider Image (1:1) */}
        <div className="flex items-center justify-center">
          <div className="relative w-full aspect-[4/3] overflow-hidden">
            <Image
              src="/placeholder.jpg"
              alt=""
              layout="fill"
              objectFit="cover"
              className="product-image rounded-t-sm object-cover cursor-pointer  transition-all duration-300"
            />
          </div>
        </div>

        {/* Info */}
        <div className="px-3 py-4">
          {/* Tilte */}
          <div className="flex items-center gap-2 mb-2">
            <div className="h-8 w-full bg-gray-500 rounded animate-pulse" />
          </div>

          <div className="mt-2 space-y-2">
            {[...Array(2)].map((_, index) => (
              <div className="h-4 w-full rounded bg-gray-400 animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Loading Certificate Slider Skeleton
export const LoadingCertificateSliderSkeleton = () => {
  return (
    <div className="border border-gray-300 shadow-md animate-pulse">
      <div className="bg-gray-200 w-full flex items-center justify-center aspect-[30/41]">
        <div className="relative w-48 lg:w-56  aspect-[3/2]">
          <Image
            src="/placeholder.jpg"
            alt=""
            layout="fill"
            objectFit="cover"
            className="rounded object-cover cursor-pointer  transition-all duration-300 "
          />
        </div>
      </div>
    </div>
  );
};

// Loading Partners Skeleton
export const LoadingPartnersSkeleton = () => {
  const cols = useResponsiveCols({ lgCol: 6, mdCol: 4, smCol: 3, xsCol: 2 });

  return (
    <div
      className="grid gap-4 lg:gap-6"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {[...Array(cols)].map((_, index) => (
        <div
          key={index}
          className="bg-white border-2 border-orange-100 p-2 shadow-md h-30"
        >
          <div className="relative bg-white w-full h-20 rounded  animate-pulse">
            <Image
              src="/placeholder.jpg"
              alt=""
              layout="fill"
              objectFit="cover"
              className="rounded object-cover cursor-pointer  transition-all duration-300 "
            />
          </div>
        </div>
      ))}
    </div>
  );
};

// Loading Products Skeleton (for detailed solutions section)
export const LoadingProductsSkeleton = ({ number }: { number: number }) => {
  const cols = useResponsiveCols({ lgCol: 4, mdCol: 4, smCol: 3, xsCol: 2 });
  return [...Array(number)].map((_, index) => (
    <div>
      <div className="flex items-center justify-between relative my-3 md:my-4">
        <div
          className="
                  w-56 h-8 md:w-72 lg:w-84 md:h-10  bg-gradient-to-r from-gray-300 via-gray-200 to-white/20
                  [clip-path:polygon(5%_0,100%_0,95%_100%,0_100%)] animate-pulse"
        />
        <div className="hidden sm:block w-28 md:w-36 h-5 rounded bg-gray-200 animate-pulse" />
      </div>

      <div
        className="grid gap-4 xl:gap-6 "
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        {[...Array(cols)].map((_, index) => (
          <div className="group relative bg-white block border border-neutral-gray-100 shadow-md rounded-sm bg-white shadow-lgtransition-all duration-300">
            {/* Discount badge */}
            <div className="absolute top-3 left-3 z-20">
              <div className="h-6 w-14 rounded-full bg-gray-200  animate-pulse" />
            </div>

            {/* Product Image (1:1) */}
            <div className="flex items-center justify-center">
              <div className="relative w-full aspect-[1/1] overflow-hidden  animate-pulse">
                <Image
                  src="/placeholder.jpg"
                  alt=""
                  layout="fill"
                  objectFit="cover"
                  className="product-image rounded-t-sm object-cover cursor-pointer  transition-all duration-300"
                />
              </div>
            </div>

            {/* Info */}
            <div className="px-3 py-4">
              <div className="mb-2">
                <div className="h-5 w-full rounded bg-gray-200 animate-pulse" />
              </div>

              {/* Prices */}
              <div className="flex items-center gap-2 mb-2">
                <div className="h-3 w-20 bg-gray-200 rounded  animate-pulse" />
                <div className="h-6 w-28 bg-gray-300 rounded animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center">
        <div className=" block sm:hidden w-36 h-5 my-4  rounded bg-gray-300 animate-pulse" />
      </div>
    </div>
  ));
};

// Loading Product Small Card Skeleton
export const LoadingProductSmallCardSkeleton = ({
  number,
}: {
  number: number;
}) => {
  return [...Array(number)].map((_, index) => (
    <div className="group relative bg-white flex gap-3 mb-4 font-sans block border border-neutral-gray-100 rounded-lg p-2 bg-white shadow-sm">
      {/* Product Image */}
      <div className="flex flex-1 items-center justify-center">
        <div className="relative w-full aspect-[4/3] overflow-hidden rounded-md  animate-pulse">
          <Image
            src="/placeholder.jpg"
            alt=""
            layout="fill"
            objectFit="cover"
            className="product-image rounded-t-sm object-cover cursor-pointer  transition-all duration-300"
          />
        </div>
      </div>

      {/* Product Info */}
      <div className="flex-[2] text-left space-y-2">
        {/* Name */}
        <div className="h-4 w-32 bg-gray-300 rounded  animate-pulse" />

        {/* Price */}
        <div className="flex gap-2">
          <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-20 bg-gray-300 rounded animate-pulse" />
        </div>

        {/* Add to Cart Button */}
        <div className="h-8 w-full rounded bg-gray-300 animate-pulse" />
      </div>
    </div>
  ));
};

// Loading Products Skeleton (for detailed solutions section)
export const LoadingProductDetailSkeleton = () => {
  return (
    <div className="min-h-screen ">
      {/* Breadcrumb Skeleton */}
      <div>
        <div className="max-w-7xl mx-auto pb-3 ">
          <div className="h-4 bg-gray-300 rounded w-48 md:w-96  animate-pulse"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Image Skeleton */}
          <div>
            <div className="bg-gray-300 rounded-lg w-full aspect-[6/5] animate-pulse mb-4"></div>
            <div className="flex gap-2">
              <div className="w-20 h-20 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-20 h-20 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>

          {/* Info Skeleton */}
          <div className="space-y-4">
            <div className="h-8 bg-gray-300 rounded w-3/4 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse"></div>
            <div className="h-10 bg-gray-300 rounded w-1/2 animate-pulse"></div>
            <div className="h-24 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
            <div className="flex gap-4">
              <div className="h-12 bg-gray-300 rounded flex-1 animate-pulse"></div>
              <div className="h-12 bg-gray-300 rounded flex-1 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="flex justify-center items-center py-8">
          <div className="text-center">
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-16 md:h-16 mx-auto mb-4">
              <div className="absolute inset-0 border-4 border-green-200 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-green-500 rounded-full border-t-transparent animate-spin"></div>
            </div>
            <p className="text-gray-600 font-medium">Đang tải sản phẩm...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Loading News Skeleton (for detailed solutions section)
export const LoadingNewsSkeleton = () => {
  const cols = useResponsiveCols({ lgCol: 5, mdCol: 4, smCol: 2, xsCol: 1 });
  return (
    <div
      className="grid gap-4 lg:gap-6"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {[...Array(cols)].map((_, index) => (
        <div className="group relative shadow-lg bg-white block border border-neutral-gray-100 rounded-sm bg-white transition-all duration-300">
          {/* News Image (1:1) */}
          <div className="flex items-center justify-center animate-pulse">
            <div className="relative w-full aspect-[4/3] overflow-hidden">
              <Image
                src="/placeholder.jpg"
                alt=""
                layout="fill"
                objectFit="cover"
                className="product-image rounded-t-sm object-cover cursor-pointer  transition-all duration-300"
              />
            </div>
          </div>

          {/* Info */}
          <div className="px-3 py-4">
            {/* Tilte */}
            <div className="flex items-center gap-2 mb-2">
              <div className="h-8 w-full bg-gray-300 rounded animate-pulse" />
            </div>

            <div className="mt-2 space-y-2">
              {[...Array(4)].map((_, index) => (
                <div className="h-4 w-full rounded bg-gray-200 animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Loading News Skeleton (for detailed solutions section)
export const LoadingListNewsSkeleton = ({ number = 1 }: { number: number }) => {
  const cols = useResponsiveCols({ lgCol: 3, mdCol: 3, smCol: 2, xsCol: 2 });
  return (
    <div
      className="grid gap-4 lg:gap-6"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {[...Array(cols * number)].map((_, index) => (
        <div className="group relative shadow-lg bg-white block border border-neutral-gray-100 rounded-sm bg-white transition-all duration-300">
          <div className="absolute top-2 left-2 z-20">
            <div className="h-12 w-10 bg-gray-300  animate-pulse" />
          </div>
          {/* News Image (1:1) */}
          <div className="flex items-center justify-center animate-pulse">
            <div className="relative w-full aspect-[5/3] overflow-hidden">
              <Image
                src="/placeholder.jpg"
                alt=""
                layout="fill"
                objectFit="cover"
                className="product-image rounded-t-sm object-cover cursor-pointer  transition-all duration-300"
              />
            </div>
          </div>

          {/* Info */}
          <div className="px-3 py-4">
            {/* Tilte */}
            <div className="flex items-center gap-2 mb-2">
              <div className="h-8 w-full bg-gray-300 rounded animate-pulse" />
            </div>
            <div className="h-1 w-10 rounded bg-gray-200 " />
            <div className="mt-2 space-y-2">
              {[...Array(2)].map((_, index) => (
                <div className="h-4 w-full rounded bg-gray-200 animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Loading Article Detail Skeleton
export const LoadingArticleDetailSkeleton = () => {
  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto ">
        <div className="h-4 bg-gray-300 rounded w-48 md:w-72 animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto py-4 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main content */}
        <article className="col-span-1 lg:col-span-3 w-full">
          {/* Title */}
          <div className="space-y-3 mb-2">
            <div className="h-6 sm:h-8 bg-gray-300 rounded w-11/12 animate-pulse" />
            <div className="h-6 sm:h-8 bg-gray-200 rounded w-9/12 animate-pulse" />
          </div>

          {/* Meta row: date, author, category */}
          <div className="flex items-center gap-4 text-sm mb-4">
            <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-28 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-32 animate-pulse" />
          </div>

          {/* Cover image */}
          <div className="bg-gray-300 rounded-lg w-full aspect-[4/3] md:aspect-[16/9] animate-pulse mb-4" />

          {/* “Ngày/Tháng” badge-like */}
          <div className="flex items-center gap-2 mb-6">
            <div className="w-12 h-14 rounded bg-gray-200 animate-pulse" />
            <div className="w-16 h-8 rounded bg-gray-200 animate-pulse" />
          </div>

          {/* Content paragraphs */}
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-10/12 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-11/12 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-9/12 animate-pulse" />
          </div>

          <div className="my-6 space-y-3">
            <div className="h-5 bg-gray-300 rounded w-6/12 animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-11/12 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-10/12 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-9/12 animate-pulse" />
            </div>
          </div>

          {/* Loading spinner + text */}
          <div className="flex justify-center items-center py-8">
            <div className="text-center">
              <div className="relative w-10 h-10 md:w-14 md:h-14 mx-auto mb-3">
                <div className="absolute inset-0 border-4 border-green-200 rounded-full" />
                <div className="absolute inset-0 border-4 border-green-500 rounded-full border-t-transparent animate-spin" />
              </div>
              <p className="text-gray-600 font-medium">Đang tải bài viết...</p>
            </div>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="hidden lg:block col-span-1 space-y-5">
          {/* Box: Tin tức mới */}
          <div className="border rounded-lg p-4">
            <div className="h-5 bg-gray-300 rounded w-32 mb-4 animate-pulse" />
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={`news-${i}`} className="flex gap-3">
                  <div className="w-16 h-12 bg-gray-200 rounded animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                    <div className="h-3 bg-gray-200 rounded w-7/12 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Box: Danh mục sản phẩm */}
          <div className="border rounded-lg p-4">
            <div className="h-5 bg-gray-300 rounded w-40 mb-4 animate-pulse" />
            <div className="space-y-4 ">
              {[...Array(8)].map((_, i) => (
                <div
                  key={`cat-${i}`}
                  className="flex items-center justify-between"
                >
                  <div className="h-5 bg-gray-200 rounded w-9/12 animate-pulse" />
                  <div className="h-5 bg-gray-100 rounded-full w-6 animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

// Loading News Skeleton (for detailed solutions section)
export const LoadingHelpsSkeleton = () => {
  const cols = useResponsiveCols({ lgCol: 3, mdCol: 2, smCol: 2, xsCol: 1 });
  return (
    <div
      className="grid gap-4 lg:gap-6"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {[...Array(cols)].map((_, index) => (
        <div className="group relative shadow-lg bg-white block border border-neutral-gray-100 rounded bg-white shadow-lgtransition-all duration-300">
          {/* Helps Image (1:1) */}
          <div className="flex items-center justify-center py-3 px-4 animate-pulse">
            <div className="relative w-full aspect-[5/3]  overflow-hidden">
              <Image
                src="/placeholder.jpg"
                alt=""
                layout="fill"
                objectFit="cover"
                className="product-image rounded-2xl object-cover cursor-pointer  transition-all duration-300"
              />
            </div>
          </div>

          {/* Info */}
          <div className="px-8 py-4">
            {/* Tilte */}
            <div className="flex items-center gap-2">
              <div className="h-8 w-full bg-gray-300 rounded animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Loading Pagination Skeleton (for detailed solutions section)
export const LoadingPaginationSkeleton = () => {
  const cols = useResponsiveCols({ lgCol: 3, mdCol: 2, smCol: 2, xsCol: 1 });
  return (
    <div className="mt-12 flex flex-col items-center">
      <div className="flex items-center space-x-2 text-base">
        {[...Array(4)].map((_, index) => (
          <div className="w-8 h-8 md:h-10 md:w-10 rounded-full bg-gray-200"></div>
        ))}
      </div>

      <div className="mt-4 h-4 w-full bg-gray-200 text-sm text-gray-600 text-center"></div>
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
  number,
  onRetry,
  children,
  loadingComponent: LoadingComponent,
  errorTitle,
  revealDelay = 300,
}: {
  loading: boolean;
  error: string | null;
  number?: number;
  onRetry: () => void;
  children: React.ReactNode;
  loadingComponent: React.ComponentType<{ number: number }>; // 👈 sửa ở đây
  errorTitle?: string;
  revealDelay?: number;
}) => {
  const [showChildren, setShowChildren] = useState(!loading && !error);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout> | null = null;

    if (loading || error) {
      setShowChildren(false);
      if (t) clearTimeout(t as any);
      return;
    }

    t = setTimeout(() => setShowChildren(true), revealDelay);

    return () => {
      if (t) clearTimeout(t);
    };
  }, [loading, error, revealDelay]);

  if (loading || (!showChildren && !error)) {
    return <LoadingComponent number={number || 1} />; // bây giờ hợp lệ
  }

  if (error) {
    return (
      <ErrorDisplay message={error} onRetry={onRetry} title={errorTitle} />
    );
  }

  return (
    <div className="opacity-100 transition-opacity duration-300">
      {children}
    </div>
  );
};
