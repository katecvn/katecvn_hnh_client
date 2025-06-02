'use client';
import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { ButtonScroll } from '@/components/ui/button-scroll';
import { Badge } from '@/components/ui/badge';

const AnimatedSection = ({ children, className }) => {
  return <div className={` ${className}`}>{children}</div>;
};

const MorphingShape = ({ className, delay = 0, index = 0 }) => {
  const duration = 2 + ((index * 0.3) % 2);

  return (
    <div
      className={`absolute rounded-full bg-gradient-to-br opacity-30 animate-morph-float blur-sm ${className}`}
      style={{
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      }}
    />
  );
};

const ParticleStorm = () => {
  const [particles, setParticles] = useState([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const fixedParticles = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: (i * 37) % 100,
      y: (i * 23) % 100,
      size: (i % 4) + 2,
      delay: (i * 0.2) % 5,
      duration: (i % 3) + 1,
      color: ['blue', 'purple', 'indigo', 'violet', 'cyan'][i % 8],
    }));
    setParticles(fixedParticles);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`absolute rounded-full bg-${particle.color}-400/60 animate-particle-storm blur-[1px]`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}
    </div>
  );
};

const ElectricField = () => {
  const electricLines = Array.from({ length: 8 }, (_, i) => ({
    left: 10 + i * 12,
    top: 20 + (i % 3) * 30,
    height: 100 + ((i * 20) % 200),
    delay: i * 0.3,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {electricLines.map((line, i) => (
        <div
          key={i}
          className="absolute animate-electric-pulse opacity-20"
          style={{
            left: `${line.left}%`,
            top: `${line.top}%`,
            width: '2px',
            height: `${line.height}px`,
            background: `linear-gradient(to bottom, transparent, rgba(59, 130, 246, 0.8), rgba(147, 51, 234, 0.8), transparent)`,
            animationDelay: `${line.delay}s`,
            animationDuration: '3s',
          }}
        />
      ))}
    </div>
  );
};

const HologramGrid = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
      <div
        className="absolute inset-0 animate-grid-scan"
        style={{
          backgroundImage: `
               linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
               linear-gradient(90deg, rgba(147, 51, 234, 0.3) 1px, transparent 1px)
             `,
          backgroundSize: '50px 50px',
        }}
      />
    </div>
  );
};

const QuantumRipples = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full border-2 border-blue-400/30 animate-quantum-ripple"
          style={{
            left: '50%',
            top: '50%',
            width: `${100 + i * 80}px`,
            height: `${100 + i * 80}px`,
            marginLeft: `-${50 + i * 40}px`,
            marginTop: `-${50 + i * 40}px`,
            animationDelay: `${i * 0.8}s`,
            animationDuration: '4s',
          }}
        />
      ))}
    </div>
  );
};

const HeroSection = () => {
  useEffect(() => {
    // Inject CSS animations
    const style = document.createElement('style');
    style.textContent = `
      @keyframes morph-float {
        0% {
          transform: translateY(0px) scale(1) rotate(0deg);
          border-radius: 50%;
        }
        25% {
          transform: translateY(-30px) scale(1.2) rotate(90deg);
          border-radius: 60% 40% 30% 70%;
        }
        50% {
          transform: translateY(-20px) scale(0.8) rotate(180deg);
          border-radius: 30% 60% 70% 40%;
        }
        75% {
          transform: translateY(-40px) scale(1.1) rotate(270deg);
          border-radius: 40% 30% 60% 70%;
        }
        100% {
          transform: translateY(0px) scale(1) rotate(360deg);
          border-radius: 50%;
        }
      }

      @keyframes particle-storm {
        0% {
          transform: translate(0, 0) rotate(0deg) scale(0.5);
          opacity: 0;
        }
        20% {
          opacity: 1;
        }
        50% {
          transform: translate(40px, -60px) rotate(180deg) scale(1.5);
          opacity: 0.8;
        }
        80% {
          opacity: 0.6;
        }
        100% {
          transform: translate(-30px, -100px) rotate(360deg) scale(0.2);
          opacity: 0;
        }
      }

      @keyframes wave-1 {
        0%, 100% {
          transform: scale(1) rotate(0deg);
        }
        50% {
          transform: scale(1.1) rotate(180deg);
        }
      }

      @keyframes wave-2 {
        0%, 100% {
          transform: scale(1.1) rotate(180deg);
        }
        50% {
          transform: scale(1) rotate(360deg);
        }
      }

      @keyframes electric-pulse {
        0%, 100% {
          opacity: 0.1;
          transform: scaleY(0.5);
        }
        50% {
          opacity: 0.8;
          transform: scaleY(1.2);
        }
      }

      @keyframes grid-scan {
        0% {
          transform: translateX(-100px) translateY(-100px);
        }
        100% {
          transform: translateX(100px) translateY(100px);
        }
      }

      @keyframes quantum-ripple {
        0% {
          transform: translate(-50%, -50%) scale(0.5);
          opacity: 1;
        }
        100% {
          transform: translate(-50%, -50%) scale(2);
          opacity: 0;
        }
      }

      @keyframes fade-in {
        0% {
          opacity: 0;
          transform: translateY(50px) scale(0.9);
        }
        100% {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      @keyframes glow-pulse {
        0%, 100% {
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.3), 0 0 40px rgba(147, 51, 234, 0.2);
          transform: scale(1);
        }
        50% {
          box-shadow: 0 0 30px rgba(59, 130, 246, 0.6), 0 0 60px rgba(147, 51, 234, 0.4);
          transform: scale(1.05);
        }
      }

      @keyframes button-glow {
        0%, 100% {
          box-shadow: 0 10px 40px rgba(59, 130, 246, 0.3), 0 0 0 rgba(147, 51, 234, 0.3);
        }
        50% {
          box-shadow: 0 20px 60px rgba(59, 130, 246, 0.6), 0 0 20px rgba(147, 51, 234, 0.5);
        }
      }

      @keyframes text-shimmer {
        0% {
          background-position: -200% center;
        }
        100% {
          background-position: 200% center;
        }
      }

      .animate-morph-float {
        animation: morph-float 3s ease-in-out infinite;
      }

      .animate-particle-storm {
        animation: particle-storm 2s linear infinite;
      }

      .animate-wave-1 {
        animation: wave-1 4s ease-in-out infinite;
      }

      .animate-wave-2 {
        animation: wave-2 5s ease-in-out infinite reverse;
      }

      .animate-electric-pulse {
        animation: electric-pulse 0.8s ease-in-out infinite;
      }

      .animate-grid-scan {
        animation: grid-scan 3s linear infinite;
      }

      .animate-quantum-ripple {
        animation: quantum-ripple 1.5s ease-out infinite;
      }

      .animate-fade-in {
        animation: fade-in 1.5s ease-out;
      }

      .animate-glow-pulse {
        animation: glow-pulse 2s ease-in-out infinite;
      }

      .animate-button-glow {
        animation: button-glow 2s ease-in-out infinite;
      }

      .text-shimmer {
        background: linear-gradient(
          90deg,
          rgba(59, 130, 246, 0.8) 0%,
          rgba(147, 51, 234, 0.8) 25%,
          rgba(244, 145, 243, 0.8) 50%,
          rgba(147, 51, 234, 0.8) 75%,
          rgba(59, 130, 246, 0.8) 100%
        );
        background-size: 200% auto;
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        
      }
    `;

    document.head.appendChild(style);

    // Cleanup function to remove the style when component unmounts
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return (
    <div className="relative">
      <section className="relative py-20 bg-gradient-to-br from-blue-50 to-purple-50 overflow-hidden">
        {/* Multi-layered background effects */}

        <ParticleStorm />
        <ElectricField />
        <HologramGrid />
        <QuantumRipples />

        {/* Morphing shapes */}
        <MorphingShape
          className="w-32 h-32 from-blue-200 to-cyan-400 top-10 left-10"
          delay={0}
          index={0}
        />
        <MorphingShape
          className="w-48 h-48 from-purple-400 to-cyan-600 top-20 right-20"
          delay={2}
          index={1}
        />
        <MorphingShape
          className="w-24 h-24 from-indigo-400 to-violet-600 bottom-32 left-1/4"
          delay={4}
          index={2}
        />
        <MorphingShape
          className="w-40 h-40 from-cyan-400 to-blue-600 bottom-20 right-1/3"
          delay={1}
          index={3}
        />
        <MorphingShape
          className="w-20 h-20 from-violet-400 to-purple-600 top-1/2 left-20"
          delay={3}
          index={4}
        />
        <MorphingShape
          className="w-36 h-36 from-violet-400 to-pink-600 top-1/3 right-10"
          delay={5}
          index={5}
        />

        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-white/10 pointer-events-none" />

        {/* Spotlight effect */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at center, transparent 30%, rgba(255,255,255,0.3) 100%)',
          }}
        />

        <div className="container px-4 md:px-6 relative z-10 mx-auto max-w-7xl">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <Badge variant="blue" className="mb-4">
              Tuyển dụng
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Gia nhập đội ngũ
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {' '}
                Katec
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Cùng chúng tôi xây dựng tương lai công nghệ. Môi trường làm việc
              năng động, cơ hội phát triển không giới hạn và đồng nghiệp tuyệt
              vời.
            </p>

            <ButtonScroll
              size="lg"
              variant="outline"
              targetId="career"
              className="bg-blue-600 text-white backdrop-blur-sm  shadow-lg  transition-all duration-300 "
            >
              <span className="flex items-center">Xem vị trí tuyển dụng</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </ButtonScroll>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
