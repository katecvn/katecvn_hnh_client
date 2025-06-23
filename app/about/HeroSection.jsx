'use client';
import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Building2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ButtonScroll } from '@/components/ui/button-scroll';
import { Button } from '@/components/ui/button';
import ContactDialog from '@/components/dialog-contact';

const FloatingParticles = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef();
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Set canvas size with delay to ensure proper sizing
    const resizeCanvas = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    // Initial resize with small delay to ensure DOM is ready
    setTimeout(() => {
      resizeCanvas();
      initializeAnimation();
    }, 100);

    window.addEventListener('resize', resizeCanvas);

    // Create particles
    const createParticles = (canvasWidth, canvasHeight) => {
      const particles = [];
      const particleCount = 300;

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

      const centerX = canvasWidth / 2;
      const centerY = canvasHeight / 2;

      for (let i = 0; i < particleCount; i++) {
        // Tạo vị trí ban đầu theo hình tròn
        const angle = (i / particleCount) * Math.PI * 2;
        const radius = 50 + Math.random() * 200; // Bán kính từ 50 đến 250px

        particles.push({
          // Vị trí ban đầu theo hình tròn
          initialX: centerX + Math.cos(angle) * radius,
          initialY: centerY + Math.sin(angle) * radius,
          x: centerX + Math.cos(angle) * radius,
          y: centerY + Math.sin(angle) * radius,

          // Vị trí cuối cùng (ngẫu nhiên)
          finalX: Math.random() * canvasWidth,
          finalY: Math.random() * canvasHeight,

          // Thuộc tính cho chuyển động tròn
          angle: angle,
          radius: radius,
          rotationSpeed: 0.02 + Math.random() * 0.03, // Tốc độ quay

          size: Math.random() * 5 + 0.5,
          speedX: (Math.random() - 0.5) * 2,
          speedY: (Math.random() - 0.5) * 2,
          opacity: Math.random() * 0.6 + 0.2,
          color: colors[Math.floor(Math.random() * colors.length)],
          pulseSpeed: Math.random() * 0.06 + 0.03,
          pulseOffset: Math.random() * Math.PI * 2,

          // Thời gian delay để particles xuất hiện dần
          delay: i * 10, // Mỗi particle xuất hiện sau 10ms
          hasAppeared: false,
        });
      }

      return particles;
    };

    // Initialize animation function
    const initializeAnimation = () => {
      if (!canvas.width || !canvas.height) return;

      particlesRef.current = createParticles(canvas.width, canvas.height);
      startTimeRef.current = Date.now();

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      animate();
    };

    // Animate particles
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTimeRef.current;

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      particlesRef.current.forEach((particle, index) => {
        // Kiểm tra xem particle đã đến lúc xuất hiện chưa
        if (elapsedTime < particle.delay) {
          return; // Chưa đến lúc xuất hiện
        }

        if (!particle.hasAppeared) {
          particle.hasAppeared = true;
        }

        const particleAge = elapsedTime - particle.delay;

        // Giai đoạn 1: Quay tròn (3 giây đầu)
        if (particleAge < 3000) {
          // Cập nhật góc quay
          particle.angle += particle.rotationSpeed;

          // Vị trí theo hình tròn
          particle.x = centerX + Math.cos(particle.angle) * particle.radius;
          particle.y = centerY + Math.sin(particle.angle) * particle.radius;

          // Giảm dần bán kính để tạo hiệu ứng spiral
          particle.radius *= 0.9995;
        }
        // Giai đoạn 2: Chuyển tiếp (1 giây)
        else if (particleAge < 4000) {
          const transitionProgress = (particleAge - 3000) / 1000; // 0 đến 1

          // Smooth transition từ vị trí tròn đến vị trí ngẫu nhiên
          const easeProgress = 1 - Math.pow(1 - transitionProgress, 3); // Ease out cubic

          particle.x =
            particle.x + (particle.finalX - particle.x) * easeProgress * 0.1;
          particle.y =
            particle.y + (particle.finalY - particle.y) * easeProgress * 0.1;
        }
        // Giai đoạn 3: Chuyển động tự do
        else {
          // Chuyển động bình thường
          particle.x += particle.speedX;
          particle.y += particle.speedY;

          // Bounce off edges
          if (
            particle.x <= particle.size ||
            particle.x >= canvas.width - particle.size
          ) {
            particle.speedX *= -0.9;
          }
          if (
            particle.y <= particle.size ||
            particle.y >= canvas.height - particle.size
          ) {
            particle.speedY *= -0.9;
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
        }

        // Hiệu ứng nhấp nháy
        const time = currentTime * 0.001;
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
        gradient.addColorStop(1, particle.color + '00');

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.globalAlpha = Math.max(0.1, Math.min(1, pulseOpacity));
        ctx.fill();

        // Draw connections (chỉ trong giai đoạn chuyển động tự do)
        if (particleAge > 4000 && index % 3 === 0) {
          particlesRef.current.forEach((otherParticle, otherIndex) => {
            if (otherIndex <= index || !otherParticle.hasAppeared) return;
            if (currentTime - startTimeRef.current - otherParticle.delay < 4000)
              return;

            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);

              const lineGradient = ctx.createLinearGradient(
                particle.x,
                particle.y,
                otherParticle.x,
                otherParticle.y
              );
              lineGradient.addColorStop(0, particle.color);
              lineGradient.addColorStop(1, otherParticle.color);

              ctx.strokeStyle = lineGradient;
              ctx.globalAlpha = (120 - distance) / 600;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          });
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

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
  const [openContact, setOpenContact] = useState(false);
  return (
    <section className="relative py-20 bg-gradient-to-br from-blue-50 to-purple-50 overflow-hidden">
      {/* Floating Particles Background */}
      <FloatingParticles />

      {/* Content */}
      <div className="container px-4 md:px-6 relative z-10">
        <AnimatedSection className="text-center max-w-4xl mx-auto">
          <Badge
            variant="outline"
            className="mb-4 border-tech-blue-500 text-tech-blue-600"
          >
            <Building2 className="h-4 w-4 mr-2" />
            Về Katec
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Đối tác công nghệ
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              <br />
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
              onClick={() => setOpenContact(true)}
              className="shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Liên hệ hợp tác
              <ArrowRight className="ml-2 h-4 w-4" />
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
      {/* Form Contact */}
      <ContactDialog
        title="Liên hệ hợp tác"
        des="Vui lòng để lại thông tin của bạn. Chúng tôi sẽ nhanh chóng liên hệ để trao đổi về cơ hội hợp tác và phát triển lâu dài."
        open={openContact}
        onOpenChange={setOpenContact}
      />
    </section>
  );
}
