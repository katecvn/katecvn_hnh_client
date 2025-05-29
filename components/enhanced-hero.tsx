"use client";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Cpu,
  Zap,
  Rocket,
  Database,
  Code2,
  Shield,
} from "lucide-react";
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
} from "./tech-blue-animations";
import { Reveal } from "./enhanced-animations";

export function EnhancedHero() {
  const typewriterTexts = [
    "Công nghệ AI tiên tiến",
    "Chuyển đổi thông minh",
    "Giải pháp Cloud hiện đại",
    "Hệ thống bảo mật cao cấp",
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-navy-tech via-tech-blue-900 to-tech-blue-800">
      {/* Tech Background Effects */}
      <MatrixRain />
      <CircuitBoard />
      <TechGrid />
      <FloatingTechElements />
      <DataStream />
      <ScanningLine />

      {/* Animated Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,191,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,191,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

      {/* Main Content */}
      <div className="container px-4 md:px-6 relative z-10">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          {/* Tech Badge */}
          <Reveal direction="down" delay={200}>
            <div className="relative inline-block">
              <Badge
                variant="outline"
                className="relative text-tech-blue-100 border-tech-blue-400/30 bg-tech-blue-500/10 backdrop-blur-sm hover:bg-tech-blue-500/20 transition-all duration-300 animate-tech-pulse cyber-border"
              >
                <Cpu className="h-4 w-4 mr-2 animate-spin text-cyber-blue" />
                🚀 Công nghệ AI & Cloud 2024
                <Zap className="h-4 w-4 ml-2 animate-pulse text-electric-blue" />
              </Badge>
            </div>
          </Reveal>

          {/* Main Heading */}
          <Reveal direction="up" delay={400}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              <span className="block mb-4">
                <TechTypewriter
                  texts={typewriterTexts}
                  className="text-shadow"
                  speed={80}
                />
              </span>
              <HolographicText className="text-glow">
                cho doanh nghiệp Việt
              </HolographicText>
            </h1>
          </Reveal>

          {/* Subtitle */}
          <Reveal direction="up" delay={600}>
            <p className="text-xl md:text-2xl text-tech-blue-100 max-w-3xl mx-auto leading-relaxed">
              Chúng tôi tạo ra các{" "}
              <span className="text-cyber-blue font-semibold animate-neon-flicker">
                giải pháp công nghệ AI
              </span>{" "}
              tiên tiến, giúp doanh nghiệp chuyển đổi số và phát triển bền vững
            </p>
          </Reveal>

          {/* Action Buttons */}
          <Reveal direction="up" delay={800}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <CyberButton
                variant="primary"
                className="group px-8 py-4 text-lg font-semibold"
              >
                <Rocket className="mr-2 h-5 w-5 group-hover:animate-bounce text-white" />
                Khám phá AI Solutions
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform text-white" />
              </CyberButton>

              <CyberButton
                variant="outline"
                className="group px-8 py-4 text-lg font-semibold glass-tech"
              >
                <div className="mr-2 w-2 h-2 bg-neon-blue rounded-full animate-pulse" />
                Tư vấn miễn phí
                <div className="ml-2 group-hover:animate-wave">🤖</div>
              </CyberButton>
            </div>
          </Reveal>

          {/* Tech Stats */}
          <Reveal direction="up" delay={1000}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-8 border-t border-tech-blue-400/20">
              {[
                {
                  number: "500+",
                  label: "AI Projects",
                  icon: <Database className="h-6 w-6" />,
                  color: "text-cyber-blue",
                },
                {
                  number: "200+",
                  label: "Cloud Solutions",
                  icon: <Code2 className="h-6 w-6" />,
                  color: "text-electric-blue",
                },
                {
                  number: "50+",
                  label: "Tech Experts",
                  icon: <Cpu className="h-6 w-6" />,
                  color: "text-neon-blue",
                },
                {
                  number: "99.9%",
                  label: "Uptime SLA",
                  icon: <Shield className="h-6 w-6" />,
                  color: "text-tech-blue-400",
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center group hover-lift glass-tech rounded-lg p-4"
                  style={{ animationDelay: `${1200 + index * 100}ms` }}
                >
                  <div className="flex justify-center mb-3">
                    <div className={cn("animate-tech-pulse", stat.color)}>
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform">
                    <HolographicText>{stat.number}</HolographicText>
                  </div>
                  <div className="text-tech-blue-200 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Tech Features */}
          <Reveal direction="up" delay={1200}>
            <div className="flex flex-wrap justify-center gap-4 mt-12">
              {[
                "AI & Machine Learning",
                "Cloud Computing",
                "Blockchain",
                "IoT Solutions",
                "Cybersecurity",
                "DevOps",
              ].map((tech, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-tech-blue-200 border-tech-blue-400/30 bg-tech-blue-500/10 hover:bg-tech-blue-500/20 transition-all duration-300"
                  style={{ animationDelay: `${1400 + index * 100}ms` }}
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </Reveal>

          {/* Scroll Indicator */}
         
        </div>
      </div>

      {/* Tech Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-tech/40 via-transparent to-transparent pointer-events-none" />
    </section>
  );
}
