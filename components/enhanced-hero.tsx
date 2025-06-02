'use client';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import {
  ArrowRight,
  Cpu,
  Zap,
  Rocket,
  Database,
  Code2,
  Shield,
} from 'lucide-react';
import {
  MatrixRain,
  CircuitBoard,
  DataStream,
  HolographicText,
  TechTypewriter,
  CyberButton,
  FloatingTechElements,
  TechGrid,
  ScanningLine,
  HolographicTextWhite,
} from './tech-blue-animations';
import { Reveal } from './enhanced-animations';
import { useState, useEffect } from 'react';

export function EnhancedHero() {
  const typewriterTexts = [
    'Thiết kế Website chuyên nghiệp',
    'Giải pháp công nghệ cho doanh nghiệp',
    'Hệ thống quản lý trường mầm non',
    'Phần mềm hỗ trợ Livestream hiệu quả',
  ];

  const [isInitialRender, setIsInitialRender] = useState(true);
  const [showBackgrounds, setShowBackgrounds] = useState(false);

  useEffect(() => {
    setIsInitialRender(true);

    const bgTimer = setTimeout(() => {
      setShowBackgrounds(true);
    }, 300);

    const animTimer = setTimeout(() => {
      setIsInitialRender(false);
    }, 100);

    return () => {
      clearTimeout(animTimer);
      clearTimeout(bgTimer);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-navy-tech via-tech-blue-900 to-tech-blue-800">
      {showBackgrounds && <MatrixRain />}
      {showBackgrounds && <CircuitBoard />}
      {showBackgrounds && <TechGrid />}
      {showBackgrounds && <FloatingTechElements />}
      {showBackgrounds && <DataStream />}
      {showBackgrounds && <ScanningLine />}

      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,191,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,191,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="container px-4 md:px-6 relative z-10 pt-20 md:pt-20">
        <div className="text-center space-y-6 md:space-y-8 max-w-4xl mx-auto">
          <Reveal direction="down" delay={0} skipAnimation={isInitialRender}>
            <div className="relative flex justify-center">
              <Badge
                variant="outline"
                className="relative text-tech-blue-100 border-tech-blue-400/30 bg-tech-blue-500/10 backdrop-blur-sm hover:bg-tech-blue-500/20 transition-all duration-300 animate-tech-pulse cyber-border inline-flex whitespace-nowrap px-3 py-1.5 text-sm"
              >
                <Cpu className="h-4 w-4 mr-2 animate-spin text-cyber-blue" />
                🚀 Công nghệ kết nối
                <Zap className="h-4 w-4 ml-2 animate-pulse text-electric-blue" />
              </Badge>
            </div>
          </Reveal>

          {/* Hidden height preloader for typewriter texts */}
          <div className="sr-only absolute opacity-0 pointer-events-none">
            {typewriterTexts.map((text, idx) => (
              <div
                key={idx}
                className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold"
              >
                {text}
              </div>
            ))}
          </div>

          <Reveal direction="up" delay={50} skipAnimation={isInitialRender}>
            {/* Fixed height wrapper to prevent layout shift */}
            <div className="min-h-[120px] sm:min-h-[140px] md:min-h-[180px] lg:min-h-[210px]">
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                <span className="block mb-4">
                  {isInitialRender ? (
                    <span className="text-shadow">{typewriterTexts[0]}</span>
                  ) : (
                    <TechTypewriter
                      texts={typewriterTexts}
                      className="text-shadow"
                      speed={80}
                    />
                  )}
                </span>
              </h1>
            </div>
          </Reveal>

          <Reveal direction="up" delay={100} skipAnimation={isInitialRender}>
            <p className="text-lg sm:text-xl md:text-2xl text-tech-blue-100 max-w-3xl mx-auto leading-relaxed">
              Từ{' '}
              <span className="text-cyber-blue font-semibold animate-neon-flicker">
                website, hệ thống quản lý đến phần mềm livestream
              </span>
              , chúng tôi đồng hành cùng doanh nghiệp và trường học trên hành
              trình chuyển đổi số toàn diện.
            </p>
          </Reveal>

          <Reveal direction="up" delay={150} skipAnimation={isInitialRender}>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
              <CyberButton
                variant="primary"
                className="group px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold w-full sm:w-auto"
              >
                <div
                  className="flex items-center cursor-pointer group"
                  onClick={() => {
                    const section = document.getElementById('products');
                    if (section) {
                      section.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  <Rocket className="mr-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:animate-bounce text-white" />
                  Khám phá
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform text-white" />
                </div>
              </CyberButton>

              <CyberButton
                variant="outline"
                className="group px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold glass-tech w-full sm:w-auto"
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <div className="mr-2 w-2 h-2 bg-neon-blue rounded-full animate-pulse" />
                Tư vấn miễn phí
                <div className="ml-2 group-hover:animate-wave">🤖</div>
              </CyberButton>
            </div>
          </Reveal>

          <Reveal direction="up" delay={200} skipAnimation={isInitialRender}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-12 md:mt-16 pt-6 md:pt-8 border-t border-tech-blue-400/20">
              {[
                {
                  number: '300+',
                  label: 'Website đã triển khai',
                  icon: <Code2 className="h-5 w-5 md:h-6 md:w-6" />,
                  color: 'text-cyber-blue',
                },
                {
                  number: '100+',
                  label: 'Khách hàng doanh nghiệp & tổ chức',
                  icon: <Database className="h-5 w-5 md:h-6 md:w-6" />,
                  color: 'text-electric-blue',
                },
                {
                  number: '500+',
                  label: 'Trường mầm non sử dụng hệ thống',
                  icon: <Cpu className="h-5 w-5 md:h-6 md:w-6" />,
                  color: 'text-neon-blue',
                },
                {
                  number: '24/7',
                  label: 'Hỗ trợ kỹ thuật & vận hành',
                  icon: <Shield className="h-5 w-5 md:h-6 md:w-6" />,
                  color: 'text-tech-blue-400',
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center group hover-lift glass-tech rounded-lg p-3 md:p-4"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex justify-center mb-2 md:mb-3">
                    <div className={cn('animate-tech-pulse', stat.color)}>
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1 md:mb-2 group-hover:scale-110 transition-transform">
                    <HolographicTextWhite>{stat.number}</HolographicTextWhite>
                  </div>
                  <div className="text-tech-blue-200 text-xs sm:text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal direction="up" delay={250} skipAnimation={isInitialRender}>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-8 mb-4 md:mb-8 md:mt-12">
              {[
                'Thiết kế Website & Hệ thống',
                'Giải pháp phần mềm tùy chỉnh',
                'Hosting & Hạ tầng Web',
                'Ứng dụng AI trong doanh nghiệp',
                'Quản lý trường mầm non',
                'Phần mềm hỗ trợ Livestream',
                'Đào tạo & tư vấn công nghệ',
              ].map((tech, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-tech-blue-200 border-tech-blue-400/30 bg-tech-blue-500/10 hover:bg-tech-blue-500/20 transition-all duration-300 text-xs sm:text-sm"
                  style={{ animationDelay: `${index * 30}ms` }}
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-navy-tech/40 via-transparent to-transparent pointer-events-none" />
    </section>
  );
}
