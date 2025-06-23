import * as Icons from 'lucide-react';
import { Button } from '@/components/ui/button';

// Loading Skeleton Component
export const LoadingSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="h-48 bg-gray-200"></div>
            <div className="p-6 space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
              </div>
              <div className="flex justify-between items-center pt-4">
                <div className="h-6 bg-gray-200 rounded w-20"></div>
                <div className="h-8 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Loading Stats Skeleton
export const LoadingStatsSkeleton = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 animate-pulse">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
          </div>
          <div className="h-8 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
        </div>
      ))}
    </div>
  );
};

// Loading Numbers Skeleton (for hero section stats)
export const LoadingNumbersSkeleton = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 animate-pulse">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="text-center glass-tech rounded-lg p-3 md:p-4 border border-tech-blue-400/20 bg-tech-blue-500/10"
        >
          <div className="flex justify-center mb-2 md:mb-3">
            <div className="w-5 h-5 md:w-6 md:h-6 bg-tech-blue-400/30 rounded animate-pulse"></div>
          </div>
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 md:mb-2">
            <div className="h-8 md:h-10 lg:h-12 bg-tech-blue-400/30 rounded-lg animate-pulse"></div>
          </div>
          <div className="text-xs sm:text-sm">
            <div className="h-3 md:h-4 bg-tech-blue-400/20 rounded animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Loading Solutions Badges Skeleton (for hero section solution tags)
export const LoadingSolutionsBadgesSkeleton = () => {
  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-4 animate-pulse">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="h-6 sm:h-7 bg-tech-blue-400/20 border border-tech-blue-400/30 rounded-full animate-pulse"
          style={{
            width: `${Math.floor(Math.random() * 80) + 60}px`,
            animationDelay: `${index * 30}ms`,
          }}
        ></div>
      ))}
    </div>
  );
};

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

// Loading Solutions Skeleton (for detailed solutions section)
export const LoadingSolutionsSkeleton = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-gray-200"
        >
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-gray-200 rounded-lg mr-4"></div>
            <div className="h-6 bg-gray-200 rounded w-32"></div>
          </div>
          <div className="space-y-3 mb-4">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-4/5"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
            <div className="h-3 bg-gray-200 rounded w-4/5"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Loading News Skeleton
export const LoadingNewsSkeleton = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="h-48 bg-gray-200"></div>
          <div className="p-6 space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-5 bg-blue-200 rounded-full w-20"></div>
            </div>
            <div className="h-6 bg-gray-200 rounded w-4/5"></div>
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// LoadingNewsSkeleton.tsx
export const LoadingNewsPageSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2  gap-8 animate-pulse">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
        >
          {/* Thumbnail */}
          <div className="relative w-full h-48 bg-gray-200 rounded-t-xl" />

          {/* Content */}
          <div className="p-6 space-y-4">
            {/* Badge / Category */}
            <div className="h-5 w-24 bg-gray-200 rounded-full" />

            {/* Title */}
            <div className="h-6 w-3/4 bg-gray-300 rounded" />
            <div className="h-6 w-2/3 bg-gray-300 rounded" />

            {/* Description */}
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
              <div className="h-4 bg-gray-200 rounded w-2/3" />
            </div>

            {/* Footer meta: date, author, read time */}
            <div className="flex items-center gap-4 pt-2">
              <div className="h-4 w-16 bg-gray-200 rounded" />
              <div className="h-4 w-12 bg-gray-200 rounded" />
              <div className="h-4 w-16 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const LoadingFeaturedArticleSkeleton = () => {
  return (
    <section className="py-20">
      <div className="container px-4 md:px-6">
        <div className="animate-pulse relative group h-full">
          {/* Gradient Glow Effect */}
          <div className="absolute -inset-2 rounded-3xl blur-2xl bg-gradient-to-br from-blue-400 to-cyan-400 opacity-10" />

          <div className="grid md:grid-cols-2 gap-0 relative z-10 bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Left: Image */}
            <div
              style={{ aspectRatio: '2/1' }}
              className="relative bg-gray-200"
            >
              <div className="absolute top-4 left-4">
                <div className="h-7 w-20 bg-white/60 rounded-full border border-white/30" />
              </div>
            </div>

            {/* Right: Text Skeleton */}
            <div className="p-8 flex flex-col justify-center space-y-4">
              {/* Title lines */}
              <div className="h-8 bg-gray-300 rounded w-3/4" />
              <div className="h-8 bg-gray-300 rounded w-1/2" />

              {/* Excerpt */}
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-5/6" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
              </div>

              {/* Meta info */}
              <div className="flex gap-4 text-xs text-gray-500 pt-4">
                <div className="h-4 w-16 bg-gray-200 rounded" />
                <div className="h-4 w-12 bg-gray-200 rounded" />
                <div className="h-4 w-20 bg-gray-200 rounded" />
              </div>

              {/* Button */}
              <div className="h-12 w-40 bg-gray-300 rounded-lg mt-4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Loading Hero Section Skeleton (complete hero loading state)
export const LoadingHeroSkeleton = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-navy-tech via-tech-blue-900 to-tech-blue-800">
      <div className="container px-4 md:px-6 relative z-10 pt-20 md:pt-20">
        <div className="text-center space-y-6 md:space-y-8 max-w-4xl mx-auto animate-pulse">
          {/* Badge skeleton */}
          <div className="flex justify-center">
            <div className="h-8 w-48 bg-tech-blue-400/20 rounded-full border border-tech-blue-400/30"></div>
          </div>

          {/* Title skeleton */}
          <div className="min-h-[120px] sm:min-h-[140px] md:min-h-[180px] lg:min-h-[210px] space-y-4">
            <div className="h-12 sm:h-16 md:h-20 lg:h-24 bg-tech-blue-400/20 rounded-lg mx-auto w-4/5"></div>
            <div className="h-12 sm:h-16 md:h-20 lg:h-24 bg-tech-blue-400/20 rounded-lg mx-auto w-3/5"></div>
          </div>

          {/* Description skeleton */}
          <div className="space-y-3 max-w-3xl mx-auto">
            <div className="h-6 bg-tech-blue-400/20 rounded w-full"></div>
            <div className="h-6 bg-tech-blue-400/20 rounded w-4/5 mx-auto"></div>
            <div className="h-6 bg-tech-blue-400/20 rounded w-3/5 mx-auto"></div>
          </div>

          {/* Buttons skeleton */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            <div className="h-12 w-full sm:w-40 bg-tech-blue-400/20 rounded-lg"></div>
            <div className="h-12 w-full sm:w-48 bg-tech-blue-400/20 rounded-lg border border-tech-blue-400/30"></div>
          </div>

          {/* Numbers skeleton */}
          <div className="mt-12 md:mt-16 pt-6 md:pt-8 border-t border-tech-blue-400/20">
            <LoadingNumbersSkeleton />
          </div>

          {/* Solutions badges skeleton */}
          <div className="mt-8 mb-4 md:mb-8 md:mt-12">
            <LoadingSolutionsBadgesSkeleton />
          </div>
        </div>
      </div>
    </section>
  );
};

// Error Component
export const ErrorDisplay = ({
  message,
  onRetry,
  title = 'Đã xảy ra lỗi',
}: {
  message: string;
  onRetry: () => void;
  title?: string;
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icons.AlertCircle className="h-8 w-8 text-red-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        <Button
          onClick={onRetry}
          className="bg-tech-blue-600 hover:bg-tech-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
        >
          <Icons.RefreshCw className="h-4 w-4 mr-2" />
          Thử lại
        </Button>
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
}: {
  loading: boolean;
  error: string | null;
  onRetry: () => void;
  children: React.ReactNode;
  loadingComponent: React.ComponentType;
  errorTitle?: string;
}) => {
  if (loading) {
    return <LoadingComponent />;
  }

  if (error) {
    return (
      <ErrorDisplay message={error} onRetry={onRetry} title={errorTitle} />
    );
  }

  return <>{children}</>;
};
