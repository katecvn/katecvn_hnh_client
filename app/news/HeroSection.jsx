import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// AnimatedSection component
const AnimatedSection = ({ children, className = '' }) => {
  return <div className={`animate-fade-in ${className}`}>{children}</div>;
};

// Input component
const Input = ({ className = '', ...props }) => {
  return (
    <input
      className={`w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${className}`}
      {...props}
    />
  );
};

// Button component
const Button = ({ children, className = '', ...props }) => {
  return (
    <button
      className={`px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 font-medium ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const AnimatedHeroSection = () => {
  const [showBubbles, setShowBubbles] = useState(false);

  // Kích hoạt animation bong bóng khi component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBubbles(true);
    }, 500); // Delay 500ms trước khi hiển thị bong bóng

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-gray-50">
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        @keyframes bubble-rise {
          0% {
            transform: translateY(100vh) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) scale(1);
            opacity: 0;
          }
        }

        @keyframes drift {
          0%,
          100% {
            transform: translateX(0px) translateY(0px);
          }
          25% {
            transform: translateX(20px) translateY(-10px);
          }
          50% {
            transform: translateX(-10px) translateY(-20px);
          }
          75% {
            transform: translateX(-20px) translateY(-5px);
          }
        }

        @keyframes pulse-glow {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(59, 130, 246, 0.6);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .bubble {
          position: absolute;
          border-radius: 50%;
          background: linear-gradient(
            45deg,
            rgba(59, 130, 246, 0.1),
            rgba(147, 51, 234, 0.1)
          );
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          opacity: 0;
          transform: translateY(100vh) scale(0);
        }

        .bubble.active {
          opacity: 1;
        }

        .bubble-1.active {
          width: 60px;
          height: 60px;
          left: 10%;
          animation: bubble-rise 8s infinite linear;
          animation-delay: 0s;
        }

        .bubble-2.active {
          width: 40px;
          height: 40px;
          left: 20%;
          animation: bubble-rise 10s infinite linear;
          animation-delay: 2s;
        }

        .bubble-3.active {
          width: 80px;
          height: 80px;
          left: 70%;
          animation: bubble-rise 12s infinite linear;
          animation-delay: 4s;
        }

        .bubble-4.active {
          width: 30px;
          height: 30px;
          left: 80%;
          animation: bubble-rise 9s infinite linear;
          animation-delay: 1s;
        }

        .bubble-5.active {
          width: 50px;
          height: 50px;
          left: 50%;
          animation: bubble-rise 11s infinite linear;
          animation-delay: 3s;
        }

        .floating-shape {
          position: absolute;
          opacity: 0.1;
        }

        .shape-1 {
          width: 100px;
          height: 100px;
          background: linear-gradient(45deg, #3b82f6, #8b5cf6);
          border-radius: 20px;
          top: 20%;
          right: 10%;
          animation: float 6s ease-in-out infinite;
        }

        .shape-2 {
          width: 60px;
          height: 60px;
          background: linear-gradient(45deg, #8b5cf6, #3b82f6);
          border-radius: 50%;
          top: 60%;
          left: 5%;
          animation: drift 8s ease-in-out infinite;
          animation-delay: 1s;
        }

        .shape-3 {
          width: 80px;
          height: 80px;
          background: linear-gradient(45deg, #3b82f6, #8b5cf6);
          transform: rotate(45deg);
          top: 40%;
          right: 20%;
          animation: float 7s ease-in-out infinite;
          animation-delay: 2s;
        }

        .glow-orb {
          position: absolute;
          width: 200px;
          height: 200px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(59, 130, 246, 0.1) 0%,
            transparent 70%
          );
          animation: pulse-glow 4s ease-in-out infinite;
        }

        .glow-1 {
          top: 10%;
          left: 20%;
          animation-delay: 0s;
        }

        .glow-2 {
          bottom: 20%;
          right: 15%;
          animation-delay: 2s;
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
        }
      `}</style>

      <section className="relative py-20 bg-gradient-to-br from-blue-50 to-purple-50 overflow-hidden">
        {/* Lớp hiệu ứng bong bóng */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className={`bubble bubble-1 ${showBubbles ? 'active' : ''}`} />
          <div className={`bubble bubble-2 ${showBubbles ? 'active' : ''}`} />
          <div className={`bubble bubble-3 ${showBubbles ? 'active' : ''}`} />
          <div className={`bubble bubble-4 ${showBubbles ? 'active' : ''}`} />
          <div className={`bubble bubble-5 ${showBubbles ? 'active' : ''}`} />

          {/* Các hình học chuyển động */}
          <div className="floating-shape shape-1" />
          <div className="floating-shape shape-2" />
          <div className="floating-shape shape-3" />

          {/* Hiệu ứng ánh sáng */}
          <div className="glow-orb glow-1" />
          <div className="glow-orb glow-2" />

          {/* Thêm các hạt nhỏ di chuyển */}
          <div
            className="absolute top-1/4 left-1/3 w-2 h-2 bg-blue-400 rounded-full opacity-30 animate-ping"
            style={{ animationDelay: '1s' }}
          />
          <div
            className="absolute top-3/4 right-1/4 w-3 h-3 bg-purple-400 rounded-full opacity-20 animate-pulse"
            style={{ animationDelay: '2s' }}
          />
          <div
            className="absolute top-1/2 left-1/4 w-1 h-1 bg-blue-500 rounded-full opacity-40 animate-bounce"
            style={{ animationDelay: '3s' }}
          />
          <div
            className="absolute top-1/3 right-1/3 w-2 h-2 bg-purple-500 rounded-full opacity-25 animate-ping"
            style={{ animationDelay: '4s' }}
          />
        </div>

        <div className="container relative z-10 px-4 md:px-6">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <Badge variant="blue" className="mb-4">
              Tin tức & Insights
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Cập nhật
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {' '}
                công nghệ <br /> mới nhất
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Theo dõi những xu hướng công nghệ, case study thành công và
              insights từ các chuyên gia hàng đầu
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 m-1" />
                <Input
                  placeholder="Tìm kiếm bài viết..."
                  className="pl-10 backdrop-blur-sm bg-white/90"
                />
              </div>
              <Button>Tìm kiếm</Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default AnimatedHeroSection;
