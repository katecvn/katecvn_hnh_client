import React, { useState, useEffect } from 'react';
import {
  Calendar,
  User,
  ArrowRight,
  Eye,
  Heart,
  Share2,
  Bookmark,
  Clock,
  Zap,
} from 'lucide-react';

// Mock data để demo
const mockPosts = [
  {
    id: 1,
    title: 'Khám phá công nghệ AI mới nhất trong năm 2025',
    short_description:
      'Những breakthrough đáng chú ý trong lĩnh vực trí tuệ nhân tạo đang thay đổi cách chúng ta làm việc và sống.',
    thumbnail:
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop',
    published_at: '2025-05-30',
    author: { full_name: 'Nguyễn Văn A' },
    topics: [{ name: 'Công nghệ' }],
    slug: 'ai-technology-2025',
  },
  {
    id: 2,
    title: 'Xu hướng thiết kế web hiện đại',
    short_description:
      'Những trend thiết kế web hot nhất được các designer hàng đầu áp dụng trong các dự án lớn.',
    thumbnail:
      'https://images.unsplash.com/photo-1559028006-448665bd7c7f?w=400&h=200&fit=crop',
    published_at: '2025-05-29',
    author: { full_name: 'Trần Thị B' },
    topics: [{ name: 'Design' }],
    slug: 'web-design-trends',
  },
  {
    id: 3,
    title: 'Blockchain và tương lai của tài chính',
    short_description:
      'Công nghệ blockchain đang revolutionize ngành tài chính với những ứng dụng breakthrough.',
    thumbnail:
      'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=200&fit=crop',
    published_at: '2025-05-28',
    author: { full_name: 'Lê Văn C' },
    topics: [{ name: 'Fintech' }],
    slug: 'blockchain-finance',
  },
  {
    id: 4,
    title: 'Sustainable Development Goals 2025',
    short_description:
      'Cách các công ty tech đang đóng góp vào việc đạt được các mục tiêu phát triển bền vững.',
    thumbnail:
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=200&fit=crop',
    published_at: '2025-05-27',
    author: { full_name: 'Phạm Thị D' },
    topics: [{ name: 'Môi trường' }],
    slug: 'sustainable-development',
  },
];

const AnimatedSection = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`transform transition-all duration-1000 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
    >
      {children}
    </div>
  );
};

const ParticleEffect = ({ isHovered }) => (
  <div
    className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
      isHovered ? 'opacity-100' : 'opacity-0'
    }`}
  >
    {[...Array(6)].map((_, i) => (
      <div
        key={i}
        className={`absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full
          animate-bounce transition-all duration-1000 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${i * 200}ms`,
          animationDuration: `${1000 + Math.random() * 1000}ms`,
        }}
      />
    ))}
  </div>
);

const NewsCard = ({ article, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(
    Math.floor(Math.random() * 50) + 10
  );
  const [viewCount] = useState(Math.floor(Math.random() * 1000) + 100);

  const categoryColors = {
    'Công nghệ': 'from-blue-500 to-cyan-500',
    Design: 'from-purple-500 to-pink-500',
    Fintech: 'from-green-500 to-emerald-500',
    'Môi trường': 'from-orange-500 to-red-500',
    'Tin tức': 'from-gray-500 to-slate-500',
  };

  const category = article.topics?.[0]?.name || article.category || 'Tin tức';
  const categoryColor = categoryColors[category] || categoryColors['Tin tức'];

  const handleBookmark = (e) => {
    e.preventDefault();
    setIsBookmarked(!isBookmarked);
  };

  const handleLike = (e) => {
    e.preventDefault();
    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  return (
    <AnimatedSection delay={index * 150}>
      <div
        className="group relative h-full cursor-pointer perspective-1000"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Enhanced Floating Background Glow */}
        <div
          className={`absolute -inset-2 bg-gradient-to-r ${categoryColor} 
          rounded-3xl blur-2xl transition-all duration-700 transform
          ${isHovered ? 'opacity-30 scale-110' : 'opacity-0 scale-95'} -z-20`}
        />

        {/* Magnetic Field Effect */}
        <div
          className={`absolute -inset-1 bg-gradient-to-r ${categoryColor}
          rounded-2xl blur-sm transition-all duration-500 transform
          ${isHovered ? 'opacity-20 rotate-1' : 'opacity-0'} -z-10`}
        />

        {/* Main Card with 3D Transform */}
        <div
          className={`relative bg-white rounded-2xl overflow-hidden h-full border border-gray-100
          transition-all duration-700 ease-out transform-gpu
          ${
            isHovered
              ? 'shadow-2xl shadow-blue-500/25 -translate-y-4 scale-105 rotate-y-5'
              : 'shadow-lg hover:shadow-xl'
          }`}
          style={{
            transformStyle: 'preserve-3d',
            transform: isHovered
              ? 'translateY(-16px) scale(1.05) rotateX(5deg)'
              : 'none',
          }}
        >
          {/* Particle Effects */}
          <ParticleEffect isHovered={isHovered} />

          {/* Image Section with Advanced Effects */}
          <div className="relative overflow-hidden h-56 group/image">
            {/* Main Image with Ken Burns Effect */}
            <img
              src={article.thumbnail || '/placeholder.svg'}
              alt={article.title}
              className={`w-full h-full object-cover transition-all duration-1000 transform-gpu
                ${
                  isHovered ? 'scale-125 rotate-2 brightness-110' : 'scale-110'
                }`}
            />

            {/* Dynamic Multi-layer Gradient */}
            <div
              className={`absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent
              transition-all duration-500 ${
                isHovered ? 'opacity-80' : 'opacity-40'
              }`}
            />

            <div
              className={`absolute inset-0 bg-gradient-to-r ${categoryColor} mix-blend-multiply
              transition-all duration-700 ${
                isHovered ? 'opacity-20' : 'opacity-0'
              }`}
            />

            {/* Animated Category Badge */}
            <div className="absolute top-4 left-4 z-20">
              <div
                className={`px-4 py-2 rounded-full text-xs font-bold backdrop-blur-md border border-white/30
                bg-white/90 text-gray-800 transition-all duration-500 transform
                ${
                  isHovered
                    ? `bg-gradient-to-r ${categoryColor} text-white shadow-lg scale-110 rotate-3`
                    : 'hover:scale-105'
                }`}
              >
                <div className="flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  {category}
                </div>
              </div>
            </div>

            {/* Enhanced Action Buttons */}
            <div
              className={`absolute top-4 right-4 flex gap-2 z-20 transition-all duration-500 transform
              ${
                isHovered
                  ? 'translate-x-0 opacity-100'
                  : 'translate-x-8 opacity-0'
              }`}
            >
              <button
                onClick={handleBookmark}
                className={`w-10 h-10 rounded-full backdrop-blur-md border border-white/30
                  flex items-center justify-center transition-all duration-300 transform hover:scale-110
                  ${
                    isBookmarked
                      ? 'bg-yellow-500/90 text-white shadow-lg'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
              >
                <Bookmark
                  className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`}
                />
              </button>
              <button
                className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30
                flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300
                transform hover:scale-110 hover:rotate-12"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            {/* Enhanced Stats with Animation */}
            <div
              className={`absolute bottom-4 left-4 right-4 z-20 transition-all duration-500 transform
              ${
                isHovered
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-6 opacity-0'
              }`}
            >
              <div className="flex items-center gap-3 text-white text-sm">
                <div
                  className="flex items-center gap-2 bg-black/40 px-3 py-2 rounded-full backdrop-blur-sm
                  hover:bg-black/60 transition-all duration-300"
                >
                  <Eye className="w-4 h-4" />
                  <span className="font-medium">
                    {viewCount.toLocaleString()}
                  </span>
                </div>
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 px-3 py-2 rounded-full backdrop-blur-sm
                    transition-all duration-300 transform hover:scale-105 ${
                      isLiked
                        ? 'bg-red-500/80 text-white'
                        : 'bg-black/40 hover:bg-black/60'
                    }`}
                >
                  <Heart
                    className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`}
                  />
                  <span className="font-medium">{likeCount}</span>
                </button>
              </div>
            </div>

            {/* Holographic Shimmer Effect */}
            <div
              className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent
              transform skew-x-12 transition-all duration-1000 pointer-events-none
              ${isHovered ? 'translate-x-full' : '-translate-x-full'}`}
              style={{ width: '50%' }}
            />

            {/* Animated Border Glow */}
            <div
              className={`absolute inset-0 rounded-2xl transition-all duration-500
              ${
                isHovered
                  ? `border-2 border-gradient-to-r ${categoryColor} opacity-60`
                  : ''
              }`}
            />
          </div>

          {/* Enhanced Content Section */}
          <div className="p-6 flex flex-col h-[calc(100%-14rem)] relative">
            {/* Background Pattern */}
            <div
              className={`absolute inset-0 bg-gradient-to-br from-gray-50/50 to-transparent
              transition-all duration-500 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            />

            {/* Title with Advanced Animation */}
            <h3
              className={`font-bold text-lg leading-tight mb-3 line-clamp-2 relative z-10
              text-gray-900 transition-all duration-500 transform
              ${
                isHovered
                  ? `bg-gradient-to-r ${categoryColor} bg-clip-text text-transparent translate-x-2 scale-105`
                  : 'hover:text-blue-600'
              }`}
            >
              {article.title}
            </h3>

            {/* Description with Fade Effect */}
            <p
              className={`text-gray-600 text-sm line-clamp-3 mb-4 flex-grow leading-relaxed relative z-10
              transition-all duration-500 ${
                isHovered ? 'text-gray-700 transform translate-x-1' : ''
              }`}
            >
              {article.short_description ||
                article.excerpt ||
                article.description ||
                'Không có mô tả'}
            </p>

            {/* Enhanced Meta Information */}
            <div className="flex items-center text-xs text-gray-500 mb-4 gap-4 flex-wrap relative z-10">
              <div
                className={`flex items-center gap-1 transition-all duration-300 transform
                ${isHovered ? 'text-blue-500 scale-105' : ''}`}
              >
                <Calendar className="h-3 w-3" />
                <span>
                  {article.published_at
                    ? new Date(article.published_at).toLocaleDateString('vi-VN')
                    : article.date || 'N/A'}
                </span>
              </div>

              <div
                className={`flex items-center gap-1 transition-all duration-300 transform
                ${isHovered ? 'text-purple-500 scale-105' : ''}`}
              >
                <User className="h-3 w-3" />
                <span>
                  {article.author?.full_name || article.author || 'Admin'}
                </span>
              </div>

              <div
                className={`flex items-center gap-1 transition-all duration-300 transform
                ${isHovered ? 'text-green-500 scale-105' : ''}`}
              >
                <Clock className="w-3 h-3" />
                <span>{article.readTime || '5 phút đọc'}</span>
              </div>
            </div>

            {/* Super Enhanced CTA Button */}
            <div className="relative overflow-hidden rounded-xl group/button">
              <div
                className={`relative w-full py-4 px-6 rounded-xl font-semibold text-sm
                bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700
                flex items-center justify-center gap-2 transition-all duration-500 transform
                ${
                  isHovered
                    ? `bg-gradient-to-r ${categoryColor} text-white shadow-xl scale-105 shadow-blue-500/25`
                    : 'hover:from-gray-200 hover:to-gray-100'
                }`}
              >
                {/* Button Background Waves */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${categoryColor}
                  transform transition-all duration-700 ${
                    isHovered ? 'translate-x-0' : '-translate-x-full'
                  }`}
                />

                {/* Ripple Effect */}
                <div
                  className={`absolute inset-0 bg-white/20 rounded-full transform scale-0
                  transition-transform duration-500 ${
                    isHovered ? 'scale-150' : ''
                  }`}
                />

                <span className="relative z-10 transition-all duration-300">
                  {isHovered ? 'Khám phá ngay' : 'Đọc thêm'}
                </span>
                <ArrowRight
                  className={`h-4 w-4 relative z-10 transition-all duration-500 transform
                  ${isHovered ? 'translate-x-2 rotate-12' : ''}`}
                />
              </div>
            </div>
          </div>

          {/* Global Card Shimmer */}
          <div
            className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent
            transform rotate-12 transition-all duration-1500 pointer-events-none
            ${isHovered ? 'translate-x-full' : '-translate-x-full'}`}
            style={{ width: '30%' }}
          />
        </div>
      </div>
    </AnimatedSection>
  );
};

export default NewsCard;
