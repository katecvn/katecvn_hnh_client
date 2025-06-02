import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { ButtonScroll } from '@/components/ui/button-scroll';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Generate initial bubbles immediately
const generateInitialBubbles = () => {
  const newBubbles = [];
  const colors = ['blue', 'purple'];
  for (let i = 0; i < 20; i++) {
    const hasLogo = Math.random() > 0.6; // 40% chance of having logo
    newBubbles.push({
      id: i,
      size: Math.random() * 80 + 30, // 30-110px (larger bubbles)
      left: Math.random() * 100, // 0-100%
      animationDuration: Math.random() * 8 + 6, // 6-14s (faster)
      delay: 0, // Removed delay - bubbles start immediately
      color: colors[Math.floor(Math.random() * colors.length)],
      hasLogo: hasLogo,
    });
  }
  return newBubbles;
};

// Bubble component
const Bubble = ({ size, left, animationDuration, delay, color, hasLogo }) => (
  <div
    className="absolute rounded-full opacity-40 animate-pulse flex items-center justify-center"
    style={{
      width: `${size}px`,
      height: `${size}px`,
      left: `${left}%`,
      background:
        color === 'blue'
          ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.5), rgba(37, 99, 235, 0.4))'
          : 'linear-gradient(135deg, rgba(147, 51, 234, 0.5), rgba(126, 34, 206, 0.4))',
      animation: `float ${animationDuration}s infinite linear`,
      animationDelay: `${delay}s`, // This will now be 0
      bottom: '-50px',
      boxShadow:
        color === 'blue'
          ? '0 0 15px rgba(59, 130, 246, 0.2)'
          : '0 0 15px rgba(147, 51, 234, 0.2)',
    }}
  >
    {hasLogo && (
      <div
        className="font-bold text-white opacity-80 select-none"
        style={{
          fontSize: `${size * 0.4}px`,
          textShadow: '0 2px 4px rgba(0,0,0,0.3)',
        }}
      >
        <img
          src="/favicon.ico"
          style={{ opacity: `${size * 0.01}` }}
          alt="Icon"
        />
      </div>
    )}
  </div>
);

// AnimatedSection component
const AnimatedSection = ({ children, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      className={`transform transition-all duration-1000 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      } ${className}`}
    >
      {children}
    </div>
  );
};

const HeroSection = () => {
  // Initialize bubbles immediately when component is created
  const [bubbles] = useState(() => generateInitialBubbles());

  useEffect(() => {
    // Regenerate bubbles periodically to keep the animation fresh
    const interval = setInterval(() => {
      // This will create new bubbles every 10 seconds to maintain the effect
      // Note: We don't update state here to avoid re-renders,
      // but you could implement a more sophisticated bubble management system
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.5;
          }
          90% {
            opacity: 0.4;
          }
          100% {
            transform: translateY(-50vh) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes gentleFloat {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .floating-animation {
          animation: gentleFloat 6s ease-in-out infinite;
        }

        .floating-animation:nth-child(2n) {
          animation-delay: -2s;
        }

        .floating-animation:nth-child(3n) {
          animation-delay: -4s;
        }
      `}</style>

      <section className="relative py-20 bg-gradient-to-br from-blue-50 to-purple-50 overflow-hidden">
        {/* Floating bubbles background - Now renders immediately */}
        <div className="absolute inset-0 pointer-events-none">
          {bubbles.map((bubble) => (
            <Bubble
              key={bubble.id}
              size={bubble.size}
              left={bubble.left}
              animationDuration={bubble.animationDuration}
              delay={bubble.delay}
              color={bubble.color}
              hasLogo={bubble.hasLogo}
            />
          ))}
        </div>

        {/* Additional decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-xl floating-animation"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-xl floating-animation"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-br from-blue-300/20 to-indigo-300/20 rounded-full blur-2xl floating-animation"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <Badge variant="blue" className="mb-4 bg-white/80 backdrop-blur-sm">
              Sản phẩm công nghệ
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-800">
              Giải pháp phần mềm
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {' '}
                doanh nghiệp
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Khám phá bộ sưu tập sản phẩm công nghệ tiên tiến được thiết kế đặc
              biệt cho doanh nghiệp Việt Nam
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                asChild
                className="shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Link href="/contact" className="flex items-center">
                  Tư vấn miễn phí
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <ButtonScroll
                size="lg"
                variant="outline"
                targetId="products"
                className="bg-white/80 backdrop-blur-sm hover:bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <span className="flex items-center">Xem demo trực tiếp</span>
              </ButtonScroll>
            </div>
          </AnimatedSection>
        </div>

        {/* Bottom wave effect */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg
            className="relative block w-full h-20"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          ></svg>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
