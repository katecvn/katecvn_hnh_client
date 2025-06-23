import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Eye,
  Clock,
  ThumbsUp,
  Share2,
  Bookmark,
  TrendingUp,
  Star,
  Award,
  Zap,
  Heart,
  ArrowRight,
  PlayCircle,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { HolographicText } from '@/components/tech-blue-animations';

const VideoSection = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hoveredVideo, setHoveredVideo] = useState(null);
  const videoRef = useRef(null);

  // Mock data cho videos
  const featuredVideo = {
    id: 1,
    title: 'Công Nghệ AI Thay Đổi Thế Giới 2025',
    description:
      'Khám phá những đột phá AI mới nhất và tác động đến tương lai nhân loại. Từ GPT-5 đến robot thông minh, tất cả đều có trong video này.',
    thumbnail:
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop',
    videoUrl:
      'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    duration: '12:34',
    views: '2.1M',
    likes: '85K',
    author: 'Tech Insider VN',
    authorAvatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
    publishedAt: '2 ngày trước',
    category: 'Công nghệ',
    isLive: false,
    isPremium: true,
  };

  const videoList = [
    {
      id: 2,
      title: 'Startup Việt Nam Thành Công Nhất 2025',
      thumbnail:
        'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=300&h=200&fit=crop',
      duration: '8:45',
      views: '890K',
      author: 'Business Today',
      publishedAt: '1 ngày trước',
      category: 'Kinh doanh',
      isLive: false,
      trending: true,
    },
    {
      id: 3,
      title: 'Cuộc Sống Số Hóa Hoàn Toàn',
      thumbnail:
        'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop',
      duration: '15:20',
      views: '1.5M',
      author: 'Digital Life',
      publishedAt: '3 ngày trước',
      category: 'Công nghệ',
      isLive: true,
    },
    {
      id: 4,
      title: 'Đầu Tư Crypto Thông Minh 2025',
      thumbnail:
        'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=300&h=200&fit=crop',
      duration: '10:12',
      views: '650K',
      author: 'Crypto Expert',
      publishedAt: '5 ngày trước',
      category: 'Tài chính',
      isLive: false,
      premium: true,
    },
    {
      id: 5,
      title: 'Metaverse - Tương Lai Của Internet',
      thumbnail:
        'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop',
      duration: '18:30',
      views: '2.8M',
      author: 'VR World',
      publishedAt: '1 tuần trước',
      category: 'Công nghệ',
      isLive: false,
      featured: true,
    },
  ];

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
    setIsPlaying(false);
    setCurrentTime(0);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-500 rounded-full opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge
            variant="outline"
            className="mb-4 border-tech-blue-500 text-tech-blue-600"
          >
            <PlayCircle className="h-4 w-4 mr-2" />
            Video Nổi Bật
          </Badge>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <HolographicText>Khám Phá Qua Video</HolographicText>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Những câu chuyện và xu hướng được kể qua hình ảnh sống động, mang
            đến trải nghiệm hoàn toàn mới
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Video Player */}
          <div className="lg:col-span-2">
            <div className="group relative">
              {/* Glowing border effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-2xl blur opacity-15 group-hover:opacity-25 transition duration-1000 group-hover:duration-200 animate-tilt"></div>

              <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
                {selectedVideo ? (
                  <div className="relative aspect-video">
                    <video
                      ref={videoRef}
                      className="w-full h-full object-cover"
                      src={selectedVideo.videoUrl}
                      poster={selectedVideo.thumbnail}
                      onTimeUpdate={handleTimeUpdate}
                      onLoadedMetadata={handleLoadedMetadata}
                      onEnded={() => setIsPlaying(false)}
                      muted={isMuted}
                    />

                    <iframe
                      className="w-full h-full rounded-xl"
                      src={selectedVideo.videoUrl}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>

                    {/* Video Controls Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4">
                        {/* Progress Bar */}
                        <div className="w-full bg-white/30 rounded-full h-1 mb-4">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-1 rounded-full transition-all duration-300"
                            style={{
                              width: `${(currentTime / duration) * 100}%`,
                            }}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={handlePlayPause}
                              className="flex items-center justify-center w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-300 hover:scale-110 shadow-lg"
                            >
                              {isPlaying ? (
                                <Pause className="w-6 h-6 text-blue-600" />
                              ) : (
                                <Play className="w-6 h-6 text-blue-600 ml-1" />
                              )}
                            </button>

                            <button
                              onClick={handleMuteToggle}
                              className="flex items-center justify-center w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-300 shadow-lg"
                            >
                              {isMuted ? (
                                <VolumeX className="w-5 h-5 text-gray-600" />
                              ) : (
                                <Volume2 className="w-5 h-5 text-gray-600" />
                              )}
                            </button>

                            <span className="text-white text-sm font-medium bg-black/50 px-2 py-1 rounded">
                              {formatTime(currentTime)} / {formatTime(duration)}
                            </span>
                          </div>

                          <button className="flex items-center justify-center w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-300 shadow-lg">
                            <Maximize className="w-5 h-5 text-gray-600" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Live Badge */}
                    {selectedVideo.isLive && (
                      <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                        <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                        LIVE
                      </div>
                    )}

                    {/* Premium Badge */}
                    {selectedVideo.isPremium && (
                      <div className="absolute top-4 right-4 flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full text-sm font-bold">
                        <Star className="w-4 h-4" />
                        Nổi bật
                      </div>
                    )}
                  </div>
                ) : (
                  <div
                    className="relative aspect-video cursor-pointer group/video"
                    onClick={() => handleVideoSelect(featuredVideo)}
                  >
                    <img
                      src={featuredVideo.thumbnail}
                      alt={featuredVideo.title}
                      className="w-full h-full object-cover group-hover/video:scale-105 transition-transform duration-700"
                    />

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover/video:bg-black/50 transition-colors duration-300">
                      <div className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center group-hover/video:scale-110 transition-transform duration-300 hover:bg-white shadow-lg">
                        <Play className="w-10 h-10 text-blue-600 ml-1" />
                      </div>
                    </div>

                    {/* Duration Badge */}
                    <div className="absolute bottom-4 right-4 bg-white/90 text-gray-800 px-2 py-1 rounded text-sm font-medium shadow-lg">
                      {featuredVideo.duration}
                    </div>
                  </div>
                )}

                {/* Video Info */}
                <div className="p-6 bg-white border-t border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                        {selectedVideo?.title || featuredVideo.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {selectedVideo?.description ||
                          featuredVideo.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img
                        src={
                          selectedVideo?.authorAvatar ||
                          featuredVideo.authorAvatar
                        }
                        alt="Author"
                        className="w-10 h-10 rounded-full ring-2 ring-blue-500/30"
                      />
                      <div>
                        <p className="text-gray-800 font-medium">
                          {selectedVideo?.author || featuredVideo.author}
                        </p>
                        <p className="text-gray-500 text-sm">
                          {selectedVideo?.publishedAt ||
                            featuredVideo.publishedAt}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {selectedVideo?.views || featuredVideo.views}
                      </div>
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="w-4 h-4" />
                        {selectedVideo?.likes || featuredVideo.likes}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100">
                    <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 shadow-lg">
                      <ThumbsUp className="w-4 h-4" />
                      Thích
                    </button>
                    <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full transition-all duration-300">
                      <Share2 className="w-4 h-4" />
                      Chia sẻ
                    </button>
                    <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full transition-all duration-300">
                      <Bookmark className="w-4 h-4" />
                      Lưu
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Video Playlist */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-blue-600" />
                Video Đề Xuất
              </h3>

              <div className="space-y-4">
                {videoList.map((video, index) => (
                  <div
                    key={video.id}
                    className={`group relative cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
                      hoveredVideo === video.id ? 'transform scale-[1.02]' : ''
                    }`}
                    onClick={() => handleVideoSelect(video)}
                    onMouseEnter={() => setHoveredVideo(video.id)}
                    onMouseLeave={() => setHoveredVideo(null)}
                  >
                    {/* Glowing effect on hover */}
                    <div
                      className={`absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-0 transition-opacity duration-300 ${
                        hoveredVideo === video.id ? 'opacity-20' : ''
                      }`}
                    ></div>

                    <div className="relative bg-white hover:bg-blue-50 rounded-xl p-3 transition-all duration-300 border border-gray-100 hover:border-blue-200 shadow-sm hover:shadow-md">
                      <div className="flex gap-3">
                        <div className="relative flex-shrink-0">
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-24 h-16 object-cover rounded-lg"
                          />

                          {/* Play button overlay */}
                          <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Play className="w-6 h-6 text-white" />
                          </div>

                          {/* Duration */}
                          <span className="absolute bottom-1 right-1 bg-white/90 text-gray-800 text-xs px-1 rounded shadow">
                            {video.duration}
                          </span>

                          {video.trending && (
                            <div className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                              <TrendingUp className="w-3 h-3" />
                              HOT
                            </div>
                          )}

                          {video.premium && (
                            <div className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                              <Star className="w-3 h-3" />
                              PRO
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="text-gray-800 font-medium text-sm line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                            {video.title}
                          </h4>
                          <p className="text-gray-500 text-xs mt-1">
                            {video.author}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                            <span>{video.views} lượt xem</span>
                            <span>•</span>
                            <span>{video.publishedAt}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* View More Button */}
              <button className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 shadow-lg">
                Xem Thêm Video
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes tilt {
          0%,
          50%,
          100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(0.5deg);
          }
          75% {
            transform: rotate(-0.5deg);
          }
        }

        @keyframes pulse-glow {
          0%,
          100% {
            text-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
          }
          50% {
            text-shadow: 0 0 30px rgba(59, 130, 246, 0.5),
              0 0 40px rgba(147, 51, 234, 0.2);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-tilt {
          animation: tilt 10s infinite linear;
        }

        .animate-pulse-glow {
          animation: pulse-glow 4s ease-in-out infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default VideoSection;
