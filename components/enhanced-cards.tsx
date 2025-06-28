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
  CalendarClock,
  CalendarCheck,
  Star,
  Users,
  MapPin,
  Clock,
  Bookmark,
  Share2,
  Eye,
  Heart,
  Calendar,
  User,
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
import { useEffect, useState } from 'react';
import ContactDialog from './dialog-contact';
import { AnimatedSection } from './animated-section';
import { useRouter } from 'next/router';
import {
  EnhancedCardProps,
  FeatureCardProps,
  ProductCardProps,
  StatsCardProps,
  TechProductCardProps,
  JobPosition,
  PositionCardProps,
  AnimatedSectionProps,
  NewsCardProps,
  ParticleEffectProps,
} from '@/pages/interface';

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

export const PositionCard = ({
  position,
  index,
  isHovered,
  onHover,
  onLeave,
  onApply,
  onViewDetail,
}: PositionCardProps) => {
  const IconComponent = position.icon;

  return (
    <div
      key={index}
      className={`group relative border  border-gray-300  hover:border-blue-300 overflow-hidden rounded-lg transition-all duration-500 hover:shadow-xl hover:scale-105 ${
        position.featured ? 'lg:col-span-2 xl:col-span-1' : ''
      }`}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={onLeave}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div
        className={`absolute inset-0 overflow-hidden rounded-lg transition-all duration-500 ${
          isHovered
            ? `bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-500 opacity-90`
            : 'bg-white  opacity-100'
        }`}
      />

      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm border border-white/40 shadow-2xl" />

      {position.featured && (
        <div className="absolute top-4 right-4 z-20">
          <div className="flex items-center bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold">
            <Star className="w-3 h-3 mr-1" /> HOT
          </div>
        </div>
      )}

      <div className="relative z-10 p-8 h-full flex flex-col">
        <div className="mb-6">
          <div className="w-16 h-16  bg-white/60 rounded-2xl flex items-center justify-center backdrop-blur-sm border  border-gray-200 group-hover:scale-110  group-hover:border-blue-500 transition-transform duration-300 shadow-lg">
            <IconComponent className="w-8 h-8 text-gray-500 group-hover:text-blue-500 " />
          </div>
        </div>

        <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-500 to-cyan-500 bg-clip-text text-transparent group-hover:opacity-100 transition-opacity duration-300">
          {position.title}
        </h3>

        <div className="space-y-3 mb-6">
          <div className="flex items-center text-gray-700">
            <Users className="w-4 h-4 mr-3 text-gray-500" />
            <span className="text-sm font-medium">{position.department}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <MapPin className="w-4 h-4 mr-3 text-gray-500" />
            <span className="text-sm font-medium">{position.location}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <Clock className="w-4 h-4 mr-3 text-gray-500" />
            <span className="text-sm font-medium">{position.type}</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">
          {position.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {position.requirements.slice(0, 3).map((req, reqIndex) => (
            <span
              key={reqIndex}
              className="px-3 py-1 bg-gray-100 border border-gray-200 rounded-full text-xs text-gray-700 font-medium"
            >
              {req}
            </span>
          ))}
          {position.requirements.length > 3 && (
            <span className="px-3 py-1 bg-gray-100 border border-gray-200 rounded-full text-xs text-gray-700 font-medium">
              +{position.requirements.length - 3} more
            </span>
          )}
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="text-gray-800">
            <div className="text-2xl text-sky-600 font-bold">
              {position.salary}
            </div>
            <div className="text-sm text-gray-500">{position.experience}</div>
          </div>
          <div className="flex items-center text-gray-600">
            {new Date(position.deadline) < new Date() ? (
              <p className="flex items-center text-sm text-red-500">
                {' '}
                <CalendarClock className="w-4 h-4 mr-1" /> Đã hết hạn{' '}
              </p>
            ) : (
              <p className=" flex items-center text-sm text-green-600">
                <CalendarCheck className="w-4 h-4 mr-1" />
                Hạn nộp: {position.deadline.toLocaleDateString('vi-VN')}
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => onApply(position as JobPosition)}
            className="flex-1 text-sm bg-blue-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center justify-center group"
          >
            Ứng tuyển ngay
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
          <button
            onClick={() => onViewDetail(position as JobPosition)}
            className="px-6 py-3 bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 rounded-xl transition-all duration-300 hover:scale-105"
          >
            Chi tiết
          </button>
        </div>
      </div>

      <div
        className={`absolute inset-0 bg-gradient-to-t from-gray-100/50 to-transparent transition-opacity duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};

const ParticleEffect = ({ isHovered }: ParticleEffectProps) => (
  <div
    className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
      isHovered ? 'opacity-100' : 'opacity-0'
    }`}
  >
    {[...Array(6)].map((_, i) => (
      <div
        key={i}
        className={`absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full
          animate-bounce transition-all duration-1000 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${i * 200}ms`,
          animationDuration: `${1000 + Math.random() * 1000}ms`,
        }}
      />
    ))}
  </div>
);

export const NewsCard = ({ article, index, row }: NewsCardProps) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState<number>(
    Math.floor(Math.random() * 50) + 10
  );
  const [viewCount] = useState<number>(Math.floor(Math.random() * 1000) + 100);

  const getRandomCategoryColor = (index: number) => {
    return {
      from: '#3B82F6',
      to: '#06B6D4',
      class: 'from-blue-500 to-cyan-500',
    };
  };

  const category = article.topics?.[0]?.name || article.category || 'Tin tức';
  const categoryColor = getRandomCategoryColor(index);

  const handleBookmark = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const navigateToArticle = () => {
    if (article.slug) {
      router.push(`/news/${article.slug}`);
    } else if (article.id) {
      router.push(`/news/${article.id}`);
    }
  };

  const getWords = (str: string) => {
    const words = str.split(' ');
    return words.length > 20 ? words.slice(0, 28).join(' ') + '…' : str;
  };

  return (
    <AnimatedSection delay={index * 150}>
      <div
        className="group relative h-full cursor-pointer "
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={navigateToArticle}
      >
        {/* Enhanced Floating Background Glow */}
        <div
          className={`absolute -inset-2 rounded-3xl blur-2xl group hover:scale-[1.03] transition-all duration-500 ease-in-out
          ${isHovered ? 'opacity-30 ' : 'opacity-0 '} -z-20`}
          style={{
            background: `linear-gradient(135deg, ${categoryColor.from}, ${categoryColor.to})`,
          }}
        />

        {/* Magnetic Field Effect */}
        <div
          className={`absolute -inset-1 rounded-2xl blur-sm transition-all duration-500 transform
          ${isHovered ? 'opacity-20 rotate-1' : 'opacity-0'} -z-10`}
          style={{
            background: `linear-gradient(135deg, ${categoryColor.from}, ${categoryColor.to})`,
          }}
        />

        <div
          className={`relative bg-white rounded-lg overflow-hidden h-full border border-gray-100 
          transition-all duration-700 ease-out transform-gpu
          ${
            isHovered
              ? 'hover:shadow-[0_0_18px_rgba(191,219,254,0.4),0_0_30px_rgba(191,219,254,0.3),0_0_42px_rgba(191,219,254,0.2)] hover:scale-105 transition-all duration-300  scale-105'
              : 'shadow-lg hover:shadow-xl'
          }`}
        >
          {/* Particle Effects */}
          <ParticleEffect isHovered={isHovered} categoryColor={categoryColor} />

          {/* Image Section with Advanced Effects */}
          <div className={`flex flex-col ${row && 'md:flex-row'}  h-full`}>
            <div
              className={`relative ${
                row && 'md:w-1/'
              } overflow-hidden h-56 group/image`}
            >
              {/* Main Image with Ken Burns Effect */}
              <img
                src={
                  article.thumbnail ||
                  'https://via.placeholder.com/600x300/f3f4f6/6b7280?text=News+Image'
                }
                alt={article.title}
                className={`w-full h-full object-cover transition-all duration-1000 transform-gpu
                ${
                  isHovered ? 'scale-110 rotate-2 brightness-110' : 'scale-110'
                }`}
                style={{ aspectRatio: '2/1' }}
              />

              {/* Dynamic Multi-layer Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent
              transition-all duration-500 ${
                isHovered ? 'opacity-80' : 'opacity-40'
              }`}
              />

              <div
                className={`absolute inset-0 mix-blend-multiply transition-all duration-700 ${
                  isHovered ? 'opacity-20' : 'opacity-0'
                }`}
                style={{
                  background: `linear-gradient(135deg, ${categoryColor.from}, ${categoryColor.to})`,
                }}
              />

              {/* Animated Category Badge */}
              <div className="absolute top-4 left-4 z-20">
                <div
                  className={`px-4 py-2 rounded-full text-xs font-bold backdrop-blur-md border border-white/30
                transition-all duration-500 transform ${
                  isHovered
                    ? 'text-white shadow-lg scale-110 rotate-3'
                    : 'bg-white/90 text-gray-800 hover:scale-105'
                }`}
                  style={{
                    background: isHovered
                      ? `linear-gradient(135deg, ${categoryColor.from}, ${categoryColor.to})`
                      : 'rgba(255, 255, 255, 0.9)',
                  }}
                >
                  <div className="flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    {category}
                  </div>
                </div>
              </div>

              {/* Enhanced Action Buttons */}
              <div
                className={`absolute top-4 right-4 flex gap-2 z-20 transition-all duration-500 transform
              ${
                isHovered
                  ? 'translate-x-0 opacity-100'
                  : 'translate-x-8 opacity-0'
              }`}
              >
                <button
                  onClick={handleBookmark}
                  className={`w-10 h-10 rounded-full backdrop-blur-md border border-white/30
                  flex items-center justify-center transition-all duration-300 transform hover:scale-110
                  ${
                    isBookmarked
                      ? 'bg-yellow-500/90 text-white shadow-lg'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  <Bookmark
                    className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`}
                  />
                </button>
                <button
                  className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30
                flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300
                transform hover:scale-110 hover:rotate-12"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              {/* Enhanced Stats with Animation */}
              <div
                className={`absolute bottom-4 left-4 right-4 z-20 transition-all duration-500 transform
              ${
                isHovered
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-6 opacity-0'
              }`}
              >
                <div className="flex items-center gap-3 text-white text-sm">
                  <div
                    className="flex items-center gap-2 bg-black/40 px-3 py-2 rounded-full backdrop-blur-sm
                  hover:bg-black/60 transition-all duration-300"
                  >
                    <Eye className="w-4 h-4" />
                    <span className="font-medium">
                      {viewCount.toLocaleString()}
                    </span>
                  </div>
                  <button
                    onClick={handleLike}
                    className={`flex items-center gap-2 px-3 py-2 rounded-full backdrop-blur-sm
                    transition-all duration-300 transform hover:scale-105 ${
                      isLiked
                        ? 'bg-red-500/80 text-white'
                        : 'bg-black/40 hover:bg-black/60'
                    }`}
                  >
                    <Heart
                      className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`}
                    />
                    <span className="font-medium">{likeCount}</span>
                  </button>
                </div>
              </div>

              {/* Holographic Shimmer Effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent
              transform skew-x-12 transition-all duration-1000 pointer-events-none
              ${isHovered ? 'translate-x-full' : '-translate-x-full'}`}
                style={{ width: '50%' }}
              />
            </div>

            {/* Enhanced Content Section */}
            <div
              className={`p-6 flex ${
                row && 'md:w-1/'
              } flex-col h-[calc(100%-14rem)] relative`}
            >
              {/* Background Pattern */}
              <div
                className={`absolute inset-0 bg-gradient-to-br from-gray-50/50 to-transparent
              transition-all duration-500 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
              />

              {/* Title with Advanced Animation */}
              <h3
                className={`font-bold text-lg leading-tight mb-3 line-clamp-2 relative z-10
              transition-all duration-500 transform ${
                isHovered
                  ? 'translate-x-2 scale-105'
                  : 'text-gray-900 hover:text-blue-600'
              }`}
                style={{
                  background: isHovered
                    ? `linear-gradient(135deg, ${categoryColor.from}, ${categoryColor.to})`
                    : undefined,
                  WebkitBackgroundClip: isHovered ? 'text' : undefined,
                  WebkitTextFillColor: isHovered ? 'transparent' : undefined,
                  color: isHovered ? 'transparent' : undefined,
                }}
              >
                {article.title}
              </h3>

              {/* Description with Fade Effect */}
              <p
                className={`text-gray-600 text-sm line-clamp-3 mb-4 flex-grow leading-relaxed relative z-10
              transition-all duration-500 ${
                isHovered ? 'text-gray-700 transform translate-x-1' : ''
              }`}
              >
                {getWords(
                  article.short_description ||
                    article.excerpt ||
                    article.description ||
                    ''
                ) || 'Không có mô tả'}
              </p>

              {/* Enhanced Meta Information */}
              <div className="flex items-center text-xs text-gray-500 mb-4 gap-4 flex-wrap relative z-10">
                <div
                  className={`flex items-center gap-1 transition-all duration-300 transform
                ${isHovered ? 'scale-105' : ''}`}
                  style={{
                    color: isHovered ? categoryColor.from : undefined,
                  }}
                >
                  <Calendar className="h-3 w-3" />
                  <span>
                    {article.published_at
                      ? new Date(article.published_at).toLocaleDateString(
                          'vi-VN'
                        )
                      : article.date || 'N/A'}
                  </span>
                </div>

                <div
                  className={`flex items-center gap-1 transition-all duration-300 transform
                ${isHovered ? 'scale-105' : ''}`}
                  style={{
                    color: isHovered ? categoryColor.to : undefined,
                  }}
                >
                  <User className="h-3 w-3" />
                  <span>
                    {typeof article.author === 'object'
                      ? article.author?.full_name || 'Admin'
                      : article.author || 'Admin'}
                  </span>
                </div>

                <div
                  className={`flex items-center gap-1 transition-all duration-300 transform
                ${isHovered ? 'scale-105' : ''}`}
                  style={{
                    color: isHovered ? categoryColor.from : undefined,
                  }}
                >
                  <Clock className="w-3 h-3" />
                  <span>{article.readTime || '5 phút đọc'}</span>
                </div>
              </div>

              {/* Super Enhanced CTA Button */}
              <div className="relative overflow-hidden rounded-lg group/button">
                <div
                  className={`relative w-full py-3 px-6 rounded-lg font-semibold text-sm
                flex items-center justify-center gap-2 transition-all duration-500 transform
                ${
                  isHovered
                    ? 'text-white bg-blue-600 shadow-xl scale-105'
                    : 'bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 hover:from-gray-200 hover:to-gray-100'
                }`}
                  style={{
                    boxShadow: isHovered
                      ? `0 10px 25px ${categoryColor.from}25`
                      : undefined,
                  }}
                  onClick={navigateToArticle}
                >
                  <span className="relative z-10 transition-all duration-300">
                    {isHovered ? 'Khám phá ngay' : 'Đọc thêm'}
                  </span>
                  <ArrowRight
                    className={`h-4 w-4 relative z-10 transition-all duration-500 transform
                  ${isHovered ? 'translate-x-2 rotate-12' : ''}`}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Global Card Shimmer */}
          <div
            className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent
            transform rotate-12 transition-all duration-1500 pointer-events-none
            ${isHovered ? 'translate-x-full' : '-translate-x-full'}`}
            style={{ width: '30%' }}
          />
        </div>
      </div>
    </AnimatedSection>
  );
};
