'use client';
import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ButtonScroll } from '@/components/ui/button-scroll';
import { Button } from '@/components/ui/button';

const FloatingParticles = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create particles
    const createParticles = () => {
      const particles = [];
      const particleCount = 300; // Tăng từ 50 lên 120

      // Mảng màu sắc đa dạng hơn
      const colors = [
        '#3B82F6', // Blue 500
        '#1D4ED8', // Blue 700
        '#60A5FA', // Blue 400
        '#93C5FD', // Blue 300
        '#8B5CF6', // Purple 500
        '#7C3AED', // Purple 600
        '#A78BFA', // Purple 400
        '#C4B5FD', // Purple 300
        '#06B6D4', // Cyan 500
        '#0891B2', // Cyan 600
        '#22D3EE', // Cyan 400
        '#67E8F9', // Cyan 300
      ];

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 5 + 0.5, // Kích thước từ 0.5 đến 5.5
          speedX: (Math.random() - 0.5) * 2, // Giảm từ 7.5 xuống 4.5 (3 lần tốc độ gốc)
          speedY: (Math.random() - 0.5) * 2, // Giảm từ 7.5 xuống 4.5
          opacity: Math.random() * 0.6 + 0.2, // Độ trong suốt từ 0.2 đến 0.8
          color: colors[Math.floor(Math.random() * colors.length)],
          // Giảm tốc độ pulse xuống 3 lần
          pulseSpeed: Math.random() * 0.06 + 0.03, // Giảm từ 0.05-0.15 xuống 0.03-0.09
          pulseOffset: Math.random() * Math.PI * 2,
        });
      }

      particlesRef.current = particles;
    };

    // Animate particles
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, index) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Bounce off edges với hiệu ứng mềm mại
        if (
          particle.x <= particle.size ||
          particle.x >= canvas.width - particle.size
        ) {
          particle.speedX *= -0.9; // Tăng hệ số bounce để giữ tốc độ cao hơn
        }
        if (
          particle.y <= particle.size ||
          particle.y >= canvas.height - particle.size
        ) {
          particle.speedY *= -0.9; // Tăng hệ số bounce để giữ tốc độ cao hơn
        }

        // Keep particles within bounds
        particle.x = Math.max(
          particle.size,
          Math.min(canvas.width - particle.size, particle.x)
        );
        particle.y = Math.max(
          particle.size,
          Math.min(canvas.height - particle.size, particle.y)
        );

        // Hiệu ứng nhấp nháy
        const time = Date.now() * 0.001;
        const pulseOpacity =
          particle.opacity +
          Math.sin(time * particle.pulseSpeed + particle.pulseOffset) * 0.2;

        // Draw particle với gradient
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size
        );
        gradient.addColorStop(0, particle.color);
        gradient.addColorStop(1, particle.color + '00'); // Trong suốt ở viền

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.globalAlpha = Math.max(0.1, Math.min(1, pulseOpacity));
        ctx.fill();

        // Draw connections với điều kiện tối ưu
        if (index % 3 === 0) {
          // Chỉ vẽ kết nối cho 1/3 số particles để tối ưu performance
          particlesRef.current.forEach((otherParticle, otherIndex) => {
            if (otherIndex <= index) return; // Tránh vẽ duplicate

            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {
              // Tăng khoảng cách kết nối
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);

              // Gradient cho đường kết nối
              const lineGradient = ctx.createLinearGradient(
                particle.x,
                particle.y,
                otherParticle.x,
                otherParticle.y
              );
              lineGradient.addColorStop(0, particle.color);
              lineGradient.addColorStop(1, otherParticle.color);

              ctx.strokeStyle = lineGradient;
              ctx.globalAlpha = (120 - distance) / 600; // Giảm opacity
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          });
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    createParticles();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

const AnimatedSection = ({ children, className = '' }) => (
  <div className={` animate-fade-in ${className}`}>{children}</div>
);

export default function HeroSection() {
  return (
    <section className="relative py-20 bg-gradient-to-br from-blue-50 to-purple-50 overflow-hidden">
      {/* Floating Particles Background */}
      <FloatingParticles />

      {/* Content */}
      <div className="container px-4 md:px-6 relative z-10">
        <AnimatedSection className="text-center max-w-4xl mx-auto">
          <Badge variant="blue" className="mb-4 bg-white/80 backdrop-blur-sm">
            Về Katec
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Đối tác công nghệ
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {' '}
              đáng tin cậy
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Chúng tôi là đội ngũ những người đam mê công nghệ, cam kết mang lại
            những giải pháp IT tiên tiến nhất để giúp doanh nghiệp Việt Nam phát
            triển và cạnh tranh trên thị trường toàn cầu.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center text-base">
            <Button
              size="lg"
              asChild
              className="shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <a href="/contact" className="flex items-center">
                Liên hệ hợp tác
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <ButtonScroll
              size="lg"
              variant="outline"
              targetId="portfolio"
              className="bg-white/80 backdrop-blur-sm hover:bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <span className="flex items-center">Xem portfolio</span>
            </ButtonScroll>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
