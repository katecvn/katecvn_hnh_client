'use client';

import type React from 'react';

import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowRight,
  Cpu,
  TrendingUp,
  Zap,
  Database,
  Shield,
  Code2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Reveal } from './enhanced-animations';
import {
  NeonBorder,
  HolographicText,
  CyberButton,
} from './tech-blue-animations';

interface EnhancedCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  delay?: number;
  features?: string[];
  badge?: string;
  onClick?: () => void;
}

export function EnhancedCard({
  title,
  description,
  icon,
  color,
  delay = 0,
  features = [],
  badge,
  onClick,
}: EnhancedCardProps) {
  return (
    <Reveal direction="up" delay={delay}>
      <NeonBorder
        color="blue"
        className="group relative overflow-hidden transition-all duration-500 hover-lift cursor-pointer bg-gradient-to-br from-white to-tech-blue-50/50"
      >
        {/* Tech Grid Background */}
        <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
          <div className="circuit-pattern w-full h-full" />
        </div>

        {/* Holographic Overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 hologram-effect" />

        <CardHeader className="relative z-10">
          {badge && (
            <Badge className="w-fit mb-3 bg-gradient-to-r from-tech-blue-500 to-cyber-blue text-white animate-tech-pulse">
              <Cpu className="h-3 w-3 mr-1" />
              {badge}
            </Badge>
          )}

          <div
            className={cn(
              'w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all duration-300',
              'group-hover:scale-110 group-hover:rotate-3 animate-cyber-glow',
              color
            )}
          >
            <div className="group-hover:animate-bounce text-tech-blue-600">
              {icon}
            </div>
          </div>

          <CardTitle className="text-xl group-hover:text-tech-blue-600 transition-colors duration-300">
            <h1>{title}</h1>
          </CardTitle>
          <CardDescription className="text-base leading-relaxed text-tech-blue-700">
            {description}
          </CardDescription>
        </CardHeader>

        {features.length > 0 && (
          <CardContent className="relative z-10">
            <div className="space-y-2">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center text-sm text-tech-blue-600 group-hover:text-tech-blue-800 transition-colors"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-1.5 h-1.5 bg-gradient-to-r from-tech-blue-500 to-cyber-blue rounded-full mr-3 group-hover:animate-pulse" />
                  {feature}
                </div>
              ))}
            </div>

            <CyberButton
              variant="outline"
              className="w-full mt-4 text-tech-blue-600 border-tech-blue-500 hover:bg-tech-blue-500 hover:text-white group"
              onClick={() => {
                const productSection = document.getElementById('products');
                if (productSection) {
                  productSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Tìm hiểu thêm
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </CyberButton>
          </CardContent>
        )}
      </NeonBorder>
    </Reveal>
  );
}

// Enhanced Stats Card with Tech Blue
interface StatsCardProps {
  value: string;
  label: string;
  icon: React.ReactNode;
  trend?: number;
  delay?: number;
}

export function StatsCard({
  value,
  label,
  icon,
  trend,
  delay = 0,
}: StatsCardProps) {
  return (
    <Reveal direction="up" delay={delay}>
      <div className="text-center group hover-lift glass-tech rounded-lg p-6">
        <div className="relative inline-block mb-4">
          <div className="w-16 h-16 bg-gradient-to-r from-tech-blue-100 to-cyber-blue/20 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 animate-tech-pulse">
            <div className="text-tech-blue-600 group-hover:animate-bounce">
              {icon}
            </div>
          </div>
          {trend && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-neon-blue rounded-full flex items-center justify-center animate-pulse">
              <TrendingUp className="h-3 w-3 text-white" />
            </div>
          )}
        </div>

        <div className="text-3xl md:text-4xl font-bold text-tech-blue-900 mb-2 group-hover:scale-105 transition-transform">
          <HolographicText>{value}</HolographicText>
        </div>

        <div className="text-tech-blue-600 group-hover:text-tech-blue-800 transition-colors">
          {label}
        </div>

        {trend && (
          <div className="text-sm text-neon-blue mt-1 flex items-center justify-center animate-pulse">
            <TrendingUp className="h-3 w-3 mr-1" />+{trend}% tháng này
          </div>
        )}
      </div>
    </Reveal>
  );
}

// Enhanced Feature Card with Tech Theme
interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  delay?: number;
}

export function FeatureCard({
  title,
  description,
  icon,
  features,
  delay = 0,
}: FeatureCardProps) {
  return (
    <Reveal direction="up" delay={delay}>
      <div className="text-center group glass-tech rounded-lg p-6 hover-lift">
        <div className="relative mb-6">
          <NeonBorder
            color="cyan"
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-all duration-300"
          >
            <div className="text-tech-blue-600 group-hover:animate-pulse">
              {icon}
            </div>
          </NeonBorder>
        </div>

        <h3 className="text-xl font-semibold mb-3 group-hover:text-tech-blue-600 transition-colors">
          <HolographicText>{title}</HolographicText>
        </h3>

        <p className="text-tech-blue-700 mb-4 leading-relaxed">{description}</p>

        <div className="space-y-2">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center justify-center text-sm text-tech-blue-600 group-hover:text-tech-blue-800 transition-colors"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Zap className="h-3 w-3 mr-2 text-electric-blue group-hover:animate-pulse" />
              {feature}
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

// Tech Product Card
interface TechProductCardProps {
  title: string;
  description: string;
  image: string;
  badge: string;
  badgeColor: string;
  delay?: number;
  link: string;
}

export function TechProductCard({
  title,
  description,
  image,
  badge,
  badgeColor,
  delay = 0,
  link,
}: TechProductCardProps) {
  return (
    <Reveal direction="up" delay={delay}>
      <NeonBorder
        color="blue"
        className="group overflow-hidden transition-all duration-500 hover-lift bg-white"
      >
        {/* Product Image */}
        <div className="relative w-full h-48 overflow-hidden">
          {image ? (
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-tech-blue-100 to-cyber-blue/20 flex items-center justify-center text-6xl opacity-20">
              {badge === 'AI' && <Database />}
              {badge === 'ERP' && <Code2 />}
              {badge === 'CRM' && <Shield />}
            </div>
          )}

          {/* Overlay hover effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-tech-blue-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Badge */}
          <div className="absolute top-4 left-4">
            <Badge className={cn('animate-tech-pulse', badgeColor)}>
              {badge}
            </Badge>
          </div>
        </div>

        {/* Card Content */}
        <CardHeader>
          <CardTitle className="text-xl group-hover:text-tech-blue-600 transition-colors line-clamp-2">
            <HolographicText>{title}</HolographicText>
          </CardTitle>
          <CardDescription className="text-base text-tech-blue-700">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <a href={link} target="_blank" rel="noopener noreferrer">
            <CyberButton
              variant="outline"
              className="w-full text-tech-blue-600 border-tech-blue-500 hover:bg-tech-blue-500 hover:text-white"
            >
              Tìm hiểu thêm
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </CyberButton>
          </a>
        </CardContent>
      </NeonBorder>
    </Reveal>
  );
}
