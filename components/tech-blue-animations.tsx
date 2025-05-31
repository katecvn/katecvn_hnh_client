"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// Matrix Rain Animation
export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Only initialize on client-side
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Skip during server-side rendering
    if (!isMounted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasDimensions();
    window.addEventListener("resize", setCanvasDimensions);

    // Matrix rain characters
    const chars = "Katec";
    const fontSize = 16;
    const lineHeight = 30;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);

    // Animation loop
    let lastTime = 0;
    const animationSpeed = 150; // milliseconds delay between frames

    const draw = (currentTime: number) => {
      if (currentTime - lastTime < animationSpeed) {
        requestAnimationFrame(draw);
        return;
      }

      lastTime = currentTime;

      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#0ff";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * lineHeight);

        if (drops[i] * lineHeight > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += 0.4; // Chậm hơn: từ 1 xuống 0.5
      }

      requestAnimationFrame(draw);
    };

    const animationId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", setCanvasDimensions);
      cancelAnimationFrame(animationId);
    };
  }, [isMounted]);

  // Return empty div during SSR
  if (!isMounted) {
    return <div className="absolute inset-0 pointer-events-none opacity-10" />;
  }

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none opacity-10"
    />
  );
}

// Circuit Board Background
export function CircuitBoard() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
      <svg className="w-full h-full" viewBox="0 0 1000 1000">
        <defs>
          <pattern
            id="circuit"
            x="0"
            y="0"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M10,10 L90,10 L90,90 L10,90 Z M30,30 L70,30 M50,10 L50,50 M10,50 L50,50"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
              className="text-tech-blue-500"
            />
            <circle
              cx="50"
              cy="50"
              r="3"
              fill="currentColor"
              className="text-cyber-blue"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit)" />
      </svg>
    </div>
  );
}

// Data Stream Effect
export function DataStream() {
  const [isMounted, setIsMounted] = useState(false);
  const [streams, setStreams] = useState<
    Array<{ top: string; delay: string; duration: string }>
  >([]);

  useEffect(() => {
    // Only initialize on client-side
    setIsMounted(true);

    // Generate stable stream properties
    const newStreams = Array(5)
      .fill(0)
      .map((_, i) => ({
        top: `${20 + i * 20}%`,
        delay: `${i * 0.5}s`,
        duration: `${2 + Math.random()}s`,
      }));

    setStreams(newStreams);
  }, []);

  // Don't render during SSR
  if (!isMounted) {
    return null;
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {streams.map((stream, i) => (
        <div
          key={i}
          className="absolute h-px bg-gradient-to-r from-transparent via-cyber-blue to-transparent animate-data-stream"
          style={{
            top: stream.top,
            width: "200px",
            animationDelay: stream.delay,
            animationDuration: stream.duration,
          }}
        />
      ))}
    </div>
  );
}

// Holographic Text
interface HolographicTextProps {
  children: React.ReactNode;
  className?: string;
}

export function HolographicText({ children, className }: HolographicTextProps) {
  return (
    <span
      className={cn(
        "relative inline-block text-transparent bg-gradient-to-r from-cyan-100 via-blue-100 to-purple-100 bg-clip-text",
        "animate-hologram",
        className
      )}
    >
      {children}
      <span className="absolute inset-0 bg-gradient-to-r from-white via-cyan-50 to-blue-50 bg-clip-text text-transparent animate-neon-flicker opacity-90">
        {children}
      </span>
    </span>
  );
}
// Neon Border Effect
interface NeonBorderProps {
  children: React.ReactNode;
  className?: string;
  color?: "blue" | "cyan" | "electric";
}

export function NeonBorder({
  children,
  className,
  color = "blue",
}: NeonBorderProps) {
  const colorClasses = {
    blue: "border-tech-blue-500 shadow-tech-blue-500",
    cyan: "border-cyber-blue shadow-cyber-blue",
    electric: "border-electric-blue shadow-electric-blue",
  };

  return (
    <div
      className={cn(
        "relative border-2 rounded-lg",
        colorClasses[color],
        "animate-cyber-glow",
        className
      )}
    >
      {children}
      <div className="absolute inset-0 border-2 border-white/20 rounded-lg animate-tech-pulse" />
    </div>
  );
}

// Tech Grid Background
export function TechGrid() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-30">
      <div className="data-grid w-full h-full" />
      <div className="absolute inset-0 bg-gradient-to-br from-tech-blue-500/5 via-transparent to-cyber-blue/5" />
    </div>
  );
}

// Scanning Line Effect
export function ScanningLine() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-blue to-transparent animate-tech-scan opacity-60" />
    </div>
  );
}

// Floating Tech Elements
export function FloatingTechElements() {
  const [isMounted, setIsMounted] = useState(false);
  const [elements, setElements] = useState<
    Array<{ left: string; top: string; delay: string; duration: string }>
  >([]);

  useEffect(() => {
    // Only initialize on client-side
    setIsMounted(true);

    // Generate stable positions for elements
    const newElements = Array(8)
      .fill(0)
      .map((_, i) => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${i * 0.7}s`,
        duration: `${4 + Math.random() * 2}s`,
      }));

    setElements(newElements);
  }, []);

  // Don't render during SSR
  if (!isMounted) {
    return null;
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map((element, i) => (
        <div
          key={i}
          className={cn(
            "absolute w-6 h-6 border border-tech-blue-400/30 rounded",
            "animate-float"
          )}
          style={{
            left: element.left,
            top: element.top,
            animationDelay: element.delay,
            animationDuration: element.duration,
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-tech-blue-500/20 to-cyber-blue/20 rounded animate-tech-pulse" />
        </div>
      ))}
    </div>
  );
}

// Tech Typewriter Effect
interface TechTypewriterProps {
  texts: string[];
  className?: string;
  speed?: number;
}

export function TechTypewriter({
  texts,
  className,
  speed = 100,
}: TechTypewriterProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        const fullText = texts[currentTextIndex];

        if (isDeleting) {
          setCurrentText(fullText.substring(0, currentText.length - 1));
        } else {
          setCurrentText(fullText.substring(0, currentText.length + 1));
        }

        if (!isDeleting && currentText === fullText) {
          setTimeout(() => setIsDeleting(true), 1000);
        } else if (isDeleting && currentText === "") {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        }
      },
      isDeleting ? speed / 2 : speed
    );

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentTextIndex, texts, speed]);

  return (
    <span className={cn("neon-glow", className)}>
      {currentText}
      <span className="animate-pulse text-cyber-blue">|</span>
    </span>
  );
}

// Cyber Button Effect
interface CyberButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "outline";
  onClick?: () => void;
}

export function CyberButton({
  children,
  className,
  variant = "primary",
  onClick,
}: CyberButtonProps) {
  const variants = {
    primary:
      "bg-gradient-to-r from-tech-blue-600 to-cyber-blue hover:from-tech-blue-700 hover:to-electric-blue text-white",
    secondary:
      "bg-gradient-to-r from-steel-blue to-tech-blue-600 hover:from-tech-blue-600 hover:to-cyber-blue text-white",
    outline:
      "border-2 border-tech-blue-500 text-tech-blue-500 hover:bg-tech-blue-500 hover:text-white",
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "relative px-6 py-3 rounded-lg font-semibold transition-all duration-500 ease-in-out",
        "before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent",
        "before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700 before:ease-in-out",
        variants[variant],
        className
      )}
    >
      <span className="relative z-10 flex items-center">{children}</span>
    </button>
  );
}

// Tech Progress Bar
interface TechProgressProps {
  value: number;
  className?: string;
  showValue?: boolean;
}

export function TechProgress({
  value,
  className,
  showValue = false,
}: TechProgressProps) {
  return (
    <div
      className={cn(
        "relative w-full h-2 bg-tech-blue-100 rounded-full overflow-hidden",
        className
      )}
    >
      <div
        className="h-full bg-gradient-to-r from-tech-blue-500 to-cyber-blue rounded-full transition-all duration-500 relative"
        style={{ width: `${value}%` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-tech-scan" />
      </div>
      {showValue && (
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs font-mono text-tech-blue-700">
          {value}%
        </div>
      )}
    </div>
  );
}

// Loading Dots with Tech Style
export function TechLoadingDots() {
  return (
    <div className="flex space-x-2">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-3 h-3 bg-tech-blue-500 rounded-full animate-bounce"
          style={{ animationDelay: `${i * 0.1}s` }}
        />
      ))}
    </div>
  );
}
