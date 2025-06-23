'use client';

import type React from 'react';

import {
  Card,
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
import { Button } from './ui/button';
import Link from 'next/link';
import { useState } from 'react';
import ContactDialog from './dialog-contact';
import { AnimatedSection } from './animated-section';
import { useRouter } from 'next/navigation';
import {
  EnhancedCardProps,
  FeatureCardProps,
  ProductCardProps,
  StatsCardProps,
  TechProductCardProps,
} from '@/app/interface';

const getWords = (str: string, number: number) => {
  if (!str) return '';
  const words = str.split(' ');
  const shortName =
    words.length > number ? words.slice(0, number).join(' ') + '…' : str;
  return shortName;
};

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
        color="gray" // thay vì "blue"
        className="group bg-white relative overflow-hidden transition-all duration-500 hover-lift cursor-pointer bg-gradient-to-br from-white to-gray-50/50 border border-gray-300"
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
              'w-14 h-14 border border-gray-300 rounded-xl flex items-center justify-center mb-4 transition-all',
              'group-hover:scale-110 group-hover:rotate-3 group-hover:border-blue-500',
              color
            )}
          >
            <div className="group-hover:animate-bounce text-tech-blue-600">
              {icon}
            </div>
          </div>

          <CardTitle className="text-xl text-tech-blue-700 group-hover:text-tech-blue-600 transition-colors duration-300">
            <h1>{title}</h1>
          </CardTitle>
          <CardDescription className="text-base leading-relaxed text-gray-600 group-hover:text-tech-blue-600">
            {description}
          </CardDescription>
        </CardHeader>

        {features.length > 0 && (
          <CardContent className="relative z-10">
            <div className="space-y-2">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center text-sm  group-hover:text-tech-blue-700 transition-colors"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-1.5 h-1.5 bg-gradient-to-r from-tech-blue-500 to-cyber-blue rounded-full mr-3 group-hover:animate-pulse" />
                  {feature}
                </div>
              ))}
            </div>

            <CyberButton
              variant="outline"
              className={cn(
                'w-full mt-4 text-gray-600  border-gray-300  group',
                'group-hover:bg-tech-blue-500 group-hover:border-blue-500 group-hover:text-white'
              )}
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
          <div className="w-16 h-16 bg-gradient-to-r from-tech-blue-100 to-cyber-blue/20 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform  animate-tech-pulse">
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

export function ProductCard({ product, index }: ProductCardProps) {
  const router = useRouter();
  const [openContact, setOpenContact] = useState(false);

  const navigateToArticle = (slug: string) => {
    if (slug) {
      router.push(`/products/${slug}`);
    }
  };

  return (
    <AnimatedSection key={product.id} delay={index * 100}>
      <Card className="group hover:shadow-[0_0_18px_rgba(191,219,254,0.4),0_0_30px_rgba(191,219,254,0.3),0_0_42px_rgba(191,219,254,0.2)] hover:scale-105 transition-all duration-300 h-full overflow-hidden">
        {/* Image */}
        <div
          className="relative overflow-hidden"
          onClick={() => navigateToArticle(product.slug)}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 rounded-t-lg"
            onError={(e) => {
              e.currentTarget.src =
                'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop';
            }}
          />
          <div className="absolute top-4 left-4 flex gap-2">
            {product.category && (
              <Badge className={`bg-green-600 animate-tech-pulse`}>
                {product.category}
              </Badge>
            )}

            {product.badge && <Badge variant="warning">{product.badge}</Badge>}
          </div>

          {product.stock === 0 && (
            <div className="absolute top-4 right-4">
              <Badge className="bg-red-600">Hết hàng</Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <CardHeader className="space-y-2 mt-4">
          <CardTitle
            onClick={() => navigateToArticle(product.slug)}
            className="text-xl group-hover:text-tech-blue-600 transition-colors line-clamp-2 leading-relaxed"
          >
            {getWords(product.name, 15)}
          </CardTitle>
          <CardDescription className="text-base text-gray-600 leading-relaxed">
            <div
              dangerouslySetInnerHTML={{
                __html: getWords(product.description, 28),
              }}
            />
          </CardDescription>
        </CardHeader>

        {/* Actions */}
        <CardContent className="flex-1 flex flex-col mt-2">
          <div className="mt-auto pt-4">
            <div className="flex gap-3">
              <Button
                className="flex-1 hover:scale-105"
                variant="outline"
                onClick={() => navigateToArticle(product.slug)}
              >
                Chi tiết
              </Button>
              <Button
                onClick={() => setOpenContact(true)}
                className="border border-blue-500 flex-1 inline-flex items-center justify-center rounded-md font-medium transition-colors text-white bg-blue-600 group-hover:bg-blue-700 hover:scale-105 transition-all duration-300 ease-in-out h-10 px-4"
              >
                Liên hệ
              </Button>
            </div>
          </div>
          {/* Form Contact */}
          <ContactDialog
            title="Liên hệ tư vấn sản phẩm"
            des="Vui lòng để lại thông tin để chúng tôi hỗ trợ bạn sớm nhất."
            product={product.name}
            open={openContact}
            onOpenChange={setOpenContact}
          />
        </CardContent>
      </Card>
    </AnimatedSection>
  );
}

// Tech Product Card

export function TechProductCard({
  title,
  description,
  image,
  badge,
  badgeColor,
  delay = 0,
  link,
}: TechProductCardProps) {
  const router = useRouter();
  const navigateToArticle = () => {
    if (link) {
      router.push(link);
    }
  };
  return (
    <Reveal direction="up" delay={delay}>
      <div onClick={navigateToArticle} className="cursor-pointer ">
        <NeonBorder
          color="blue"
          className="group overflow-hidden transition-all duration-500 hover-lift bg-white border border-gray-200"
        >
          {/* Product Image */}

          <div className="relative w-full h-48 overflow-hidden cursor-pointer">
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
            <div className="absolute top-4 left-4">
              <Badge className={cn('animate-tech-pulse', badgeColor)}>
                {badge}
              </Badge>
            </div>
          </div>

          {/* Card Content */}
          <CardHeader>
            <CardTitle className="text-xl group-hover:text-tech-blue-600 transition-colors line-clamp-2 cursor-pointer">
              {title}
            </CardTitle>

            <CardDescription className="text-base text-gray-600">
              {getWords(description, 20)}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Link href={link}>
              <CyberButton
                variant="outline"
                className="w-full mt-4 text-gray-600 border-gray-300 group-hover:border-blue-500 group-hover:bg-tech-blue-500 group-hover:text-white group"
              >
                Tìm hiểu thêm
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </CyberButton>
            </Link>
          </CardContent>
        </NeonBorder>
      </div>
    </Reveal>
  );
}
