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

const ParticleEffect = ({ isHovered, categoryColor }) => (
  <div
    className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
      isHovered ? 'opacity-100' : 'opacity-0'
    }`}
  >
    {[...Array(6)].map((_, i) => (
      <div
        key={i}
        className={`absolute w-1 h-1 rounded-full animate-bounce transition-all duration-1000 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: `linear-gradient(45deg, ${categoryColor.from}, ${categoryColor.to})`,
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

  // Tạo màu cố định cho mỗi card dựa trên index
  const getRandomCategoryColor = (index) => {
    const gradients = [
      { from: '#3B82F6', to: '#06B6D4', class: 'from-blue-500 to-cyan-500' },
    ];

    return gradients[index % gradients.length];
  };

  const category = article.topics?.[0]?.name || article.category || 'Tin tức';
  const categoryColor = getRandomCategoryColor(index);

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
        className="group relative h-full cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Enhanced Floating Background Glow */}
        <div
          className={`absolute -inset-2 rounded-3xl blur-2xl transition-all duration-700 transform
          ${isHovered ? 'opacity-30 scale-110' : 'opacity-0 scale-95'} -z-20`}
          style={{
            background: `linear-gradient(135deg, ${categoryColor.from}, ${categoryColor.to})`,
          }}
        />

        {/* Magnetic Field Effect */}
        <div
          className={`absolute -inset-1 rounded-2xl blur-sm transition-all duration-500 transform
          ${isHovered ? 'opacity-20 rotate-1' : 'opacity-0'} -z-10`}
          style={{
            background: `linear-gradient(135deg, ${categoryColor.from}, ${categoryColor.to})`,
          }}
        />

        {/* Main Card with 3D Transform */}
        <div
          className={`relative bg-white rounded-2xl overflow-hidden h-full border border-gray-100 
          transition-all duration-700 ease-out transform-gpu
          ${
            isHovered
              ? 'shadow-2xl -translate-y-4 scale-105'
              : 'shadow-lg hover:shadow-xl'
          }`}
          style={{
            boxShadow: isHovered && `0 25px 50px -12px ${categoryColor.from}80`,
            transform: isHovered
              ? 'translateY(-16px) scale(1.05) rotateX(5deg)'
              : 'none',
            borderRadius: '4px',
          }}
        >
          {/* Particle Effects */}
          <ParticleEffect isHovered={isHovered} categoryColor={categoryColor} />

          {/* Image Section with Advanced Effects */}
          <div className="relative overflow-hidden h-56 group/image">
            {/* Main Image with Ken Burns Effect */}
            <img
              src={
                article.thumbnail ||
                'https://via.placeholder.com/600x300/f3f4f6/6b7280?text=News+Image'
              }
              alt={article.title}
              className={`w-full h-full object-cover transition-all duration-1000 transform-gpu
                ${
                  isHovered ? 'scale-125 rotate-2 brightness-110' : 'scale-110'
                }`}
              style={{ aspectRatio: '2/1' }}
            />

            {/* Dynamic Multi-layer Gradient */}
            <div
              className={`absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent
              transition-all duration-500 ${
                isHovered ? 'opacity-80' : 'opacity-40'
              }`}
            />

            <div
              className={`absolute inset-0 mix-blend-multiply transition-all duration-700 ${
                isHovered ? 'opacity-20' : 'opacity-0'
              }`}
              style={{
                background: `linear-gradient(135deg, ${categoryColor.from}, ${categoryColor.to})`,
              }}
            />

            {/* Animated Category Badge */}
            <div className="absolute top-4 left-4 z-20">
              <div
                className={`px-4 py-2 rounded-full text-xs font-bold backdrop-blur-md border border-white/30
                transition-all duration-500 transform ${
                  isHovered
                    ? 'text-white shadow-lg scale-110 rotate-3'
                    : 'bg-white/90 text-gray-800 hover:scale-105'
                }`}
                style={{
                  background: isHovered
                    ? `linear-gradient(135deg, ${categoryColor.from}, ${categoryColor.to})`
                    : 'rgba(255, 255, 255, 0.9)',
                }}
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
              transition-all duration-500 transform ${
                isHovered
                  ? 'translate-x-2 scale-105'
                  : 'text-gray-900 hover:text-blue-600'
              }`}
              style={{
                background: isHovered
                  ? `linear-gradient(135deg, ${categoryColor.from}, ${categoryColor.to})`
                  : undefined,
                WebkitBackgroundClip: isHovered ? 'text' : undefined,
                WebkitTextFillColor: isHovered ? 'transparent' : undefined,
                color: isHovered ? 'transparent' : undefined,
              }}
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
                ${isHovered ? 'scale-105' : ''}`}
                style={{
                  color: isHovered ? categoryColor.from : undefined,
                }}
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
                ${isHovered ? 'scale-105' : ''}`}
                style={{
                  color: isHovered ? categoryColor.to : undefined,
                }}
              >
                <User className="h-3 w-3" />
                <span>
                  {article.author?.full_name || article.author || 'Admin'}
                </span>
              </div>

              <div
                className={`flex items-center gap-1 transition-all duration-300 transform
                ${isHovered ? 'scale-105' : ''}`}
                style={{
                  color: isHovered ? categoryColor.from : undefined,
                }}
              >
                <Clock className="w-3 h-3" />
                <span>{article.readTime || '5 phút đọc'}</span>
              </div>
            </div>

            {/* Super Enhanced CTA Button */}
            <div className="relative overflow-hidden rounded-xl group/button">
              <div
                className={`relative w-full py-4 px-6 rounded-xl font-semibold text-sm
                flex items-center justify-center gap-2 transition-all duration-500 transform
                ${
                  isHovered
                    ? 'text-white shadow-xl scale-105'
                    : 'bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 hover:from-gray-200 hover:to-gray-100'
                }`}
                style={{
                  background:
                    isHovered &&
                    `linear-gradient(135deg, ${categoryColor.from}, ${categoryColor.to})`,

                  boxShadow: isHovered
                    ? `0 10px 25px ${categoryColor.from}25`
                    : undefined,
                }}
              >
                {/* Button Background Waves */}
                <div
                  className={`absolute inset-0 transform transition-all duration-700 ${
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

export default function DynamicNewsGrid({ posts = [] }) {
  // Use passed posts or fallback to mock data
  const articlesToShow = posts && posts.length > 0 ? posts : [];

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {articlesToShow.length > 0 &&
        articlesToShow
          .slice(1)
          .map((article, index) => (
            <NewsCard key={article.id} article={article} index={index} />
          ))}
    </div>
  );
}
