'use client';

import { Badge } from '@/components/ui/badge';
import * as Icons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
// import { ContactForm } from "@/components/contact-form";
import { ContactForm } from '@/components/contact-form';
import { EnhancedHero } from '@/components/enhanced-hero';
import {
  EnhancedCard,
  StatsCard,
  TechProductCard,
  ProductCard,
} from '@/components/enhanced-cards';
import {
  LoadingSkeleton,
  LoadingStatsSkeleton,
  LoadingPartnersSkeleton,
  LoadingNewsSkeleton,
  SectionLoader,
  LoadingSolutionsSkeleton,
} from '@/components/loading-error-components';
import { Reveal } from '@/components/enhanced-animations';
import {
  HolographicText,
  TechGrid,
  CircuitBoard,
  HolographicTextWhite,
} from '@/components/tech-blue-animations';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import api from '@/utils/axios';

import type {
  GeneralContentItem,
  SectionItem as BaseSectionItem,
} from '../types/interface';

type ContentItem = GeneralContentItem;
type SectionItem = BaseSectionItem<ContentItem>;

export default function HomePage() {
  const [showBackgrounds, setShowBackgrounds] = useState(false);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [solutions, setSolutions] = useState<SectionItem[]>([]);
  const [numbers, setNumbers] = useState<SectionItem[]>([]);
  const [partners, setPartners] = useState<SectionItem[]>([]);
  const [news, setNews] = useState<any[]>([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  });

  useEffect(() => {
    fetchAllHomeData();
  }, []);

  const fetchAllHomeData = async (
    options = { page: 1, limit: 10, categoryId: null }
  ) => {
    setLoading(true);
    setError(null);

    const { page, limit, categoryId } = options;

    const requests = [];

    // Prepare product URL
    let productUrl = `/product/public/shows?page=${page}&limit=${limit}`;
    if (categoryId && categoryId !== 'all') {
      productUrl += `&category_id=${categoryId}`;
    }
    requests.push(api.get(productUrl)); // index 0

    // Prepare other endpoints
    requests.push(api.get('/page-section/public/shows?sectionType=solutions')); // index 1
    requests.push(api.get('/page-section/public/shows?sectionType=numbers')); // index 2
    requests.push(api.get('/page-section/public/shows?sectionType=partner')); // index 3
    requests.push(api.get(`/post/public/shows?page=1&limit=3`)); // index 4

    try {
      const [productRes, solutionRes, numberRes, partnerRes, newsRes] =
        await Promise.all(requests);

      // Products
      const productData = productRes.data.data;
      const transformedProducts = productData.products.map((product: any) => {
        let image =
          'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop';
        try {
          image = product.imagesUrl[0] || image;
        } catch {}

        return {
          id: product.id,
          name: product.name,
          category: product.category?.name || 'Sản phẩm',
          slug: product.slug,
          description: product.content
            ? product.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...'
            : 'Mô tả sản phẩm',
          features: [
            `SKU: ${product.sku}`,
            `Đơn vị: ${product.unit}`,
            product.brand?.name
              ? `Thương hiệu: ${product.brand.name}`
              : 'Sản phẩm chất lượng',
            product.isFeatured ? 'Sản phẩm nổi bật' : 'Giải pháp chuyên nghiệp',
          ],
          price: product.salePrice
            ? `${parseInt(product.salePrice).toLocaleString('vi-VN')} VNĐ`
            : 'Liên hệ để biết giá',
          originalPrice: product.originalPrice,
          image,
          badge: product.isFeatured ? 'Nổi bật' : '',
          color: getRandomColor(),
          stock: product.stock,
        };
      });

      setProducts(transformedProducts);
      setPagination({
        totalItems: productData.totalItems || 0,
        totalPages: productData.totalPages || 1,
        currentPage: productData.currentPage || 1,
      });

      // Solutions, Partners, News
      setSolutions(solutionRes.data.data || []);
      setNumbers(numberRes.data.data || []);
      setPartners(partnerRes.data.data || []);
      setNews(newsRes.data.data?.posts || []);
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Không thể tải dữ liệu trang chủ';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Delay loading background elements
    const timer1 = setTimeout(() => {
      setShowBackgrounds(true);
    }, 800);

    // Delay enabling animations
    const timer2 = setTimeout(() => {
      setIsInitialRender(false);
    }, 1200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const getRandomColor = () => {
    const colors = ['blue', 'purple', 'green', 'orange', 'red', 'slate'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const getIcon = (iconName: string): LucideIcon => {
    const Icon = Icons[iconName as keyof typeof Icons];

    // Chỉ trả về nếu Icon là một React component (function or object with $$typeof)
    if (typeof Icon === 'function' || typeof Icon === 'object') {
      return Icon as LucideIcon;
    }

    // fallback nếu không tồn tại hoặc không hợp lệ
    return Icons.Code;
  };

  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section */}

      {error && (
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 shadow-lg max-w-sm">
            <div className="flex items-start">
              <Icons.AlertCircle className="h-5 w-5 text-red-400 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-red-800">
                  Lỗi tải dữ liệu
                </h3>
                <p className="text-sm text-red-700 mt-1">{error}</p>
                <button
                  onClick={() => {
                    setError(null);
                    fetchAllHomeData();
                  }}
                  className="text-sm text-red-600 hover:text-red-500 mt-2 underline"
                >
                  Thử lại
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <EnhancedHero
        loading={loading}
        numbers={numbers}
        solutions={solutions}
        getIcon={getIcon}
      />
      {/* Enhanced Stats Section */}

      {/* Enhanced Services Section */}
      <section className="py-20 bg-gradient-to-br from-tech-blue-50 to-white relative overflow-hidden">
        {showBackgrounds && <CircuitBoard />}

        <div className="text-center mb-16">
          <Badge
            variant="outline"
            className="mb-4 border-tech-blue-500 text-tech-blue-600"
          >
            <Icons.Shield className="h-4 w-4 mr-2" />
            Dịch vụ công nghệ
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <HolographicText>
              Giải pháp công nghệ toàn diện cho doanh nghiệp & tổ chức
            </HolographicText>
          </h2>
          <p className="text-tech-blue-700 max-w-3xl mx-auto">
            Chúng tôi cung cấp đa dạng dịch vụ công nghệ từ thiết kế website
            chuyên nghiệp đến phát triển hệ thống quản lý dành riêng cho doanh
            nghiệp, tổ chức, trường học và đài truyền hình.
          </p>
        </div>

        <div className="container px-4 md:px-6 relative z-1">
          <SectionLoader
            loading={loading}
            error={error}
            onRetry={() => fetchAllHomeData()}
            loadingComponent={LoadingSolutionsSkeleton}
            errorTitle="Không thể tải giải pháp công nghệ"
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {solutions?.map((solution: any) => {
                const IconComponent = getIcon(solution?.content[0]?.icon);
                return (
                  <EnhancedCard
                    key={solution.id}
                    color=""
                    title={solution?.content[0]?.title}
                    description={solution?.content[0]?.description}
                    features={solution?.content[0]?.features}
                    icon={<IconComponent className="h-6 w-6" />}
                  />
                );
              })}
            </div>

            {solutions?.length === 0 && !loading && (
              <div className="text-center py-12">
                <Icons.Settings className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Chưa có giải pháp nào
                </h3>
                <p className="text-gray-500">
                  Các giải pháp công nghệ sẽ được cập nhật sớm nhất có thể.
                </p>
              </div>
            )}
          </SectionLoader>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-tech-blue-50 via-white to-cyber-blue/10 relative">
        {showBackgrounds && <TechGrid />}
        <div className="container px-4 md:px-6 relative z-10">
          <Reveal direction="up" skipAnimation={isInitialRender}>
            <div className="text-center mb-12">
              <Badge
                variant="outline"
                className="mb-4 border-tech-blue-500 text-tech-blue-600"
              >
                <Icons.Award className="h-4 w-4 mr-2" />
                Thành tựu công nghệ
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <HolographicText>Những con số ấn tượng</HolographicText>
              </h2>
            </div>
          </Reveal>

          <SectionLoader
            loading={loading}
            error={error}
            onRetry={() => fetchAllHomeData()}
            loadingComponent={LoadingStatsSkeleton}
            errorTitle="Không thể tải thống kê"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {numbers?.map((number: any, index: number) => {
                const IconComponent = getIcon(number?.content[0]?.icon);
                return (
                  <StatsCard
                    key={number.id}
                    value={number?.content[0]?.title}
                    label={number?.content[0]?.description}
                    icon={<IconComponent className="h-8 w-8" />}
                    delay={100 * index}
                  />
                );
              })}
            </div>
          </SectionLoader>
        </div>
      </section>

      {/* Enhanced Featured Products */}
      <section className="py-20 bg-white relative" id="products">
        <div className="container px-4 md:px-6">
          <Reveal direction="up" skipAnimation={isInitialRender}>
            <div className="text-center mb-16">
              <Badge
                variant="outline"
                className="mb-4 border-tech-blue-500 text-tech-blue-600"
              >
                <Icons.LayoutDashboard className="h-4 w-4 mr-2" />
                Sản phẩm công nghệ
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <HolographicText>Giải pháp công nghệ toàn diện</HolographicText>
              </h2>
              <p className="text-tech-blue-700 max-w-2xl mx-auto">
                Phần mềm quản lý chuyên nghiệp cho doanh nghiệp, giáo dục và
                thương mại điện tử
              </p>
            </div>
          </Reveal>

          <SectionLoader
            loading={loading}
            error={error}
            onRetry={() => fetchAllHomeData()}
            loadingComponent={LoadingSkeleton}
            errorTitle="Không thể tải sản phẩm"
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products?.map((product: any, index: number) => {
                return (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                  />
                );
              })}
            </div>

            {products?.length === 0 && !loading && (
              <div className="text-center py-12">
                <Icons.Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Chưa có sản phẩm nào
                </h3>
                <p className="text-gray-500">
                  Các sản phẩm sẽ được cập nhật sớm nhất có thể.
                </p>
              </div>
            )}
          </SectionLoader>
        </div>
      </section>

      {/* Enhanced Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-tech-blue-50 to-cyber-blue/10 relative overflow-hidden">
        {showBackgrounds && <TechGrid />}

        <div className="container px-4 md:px-6 relative z-10">
          <Reveal direction="up" skipAnimation={isInitialRender}>
            <div className="text-center mb-16">
              <Badge
                variant="outline"
                className="mb-4 border-tech-blue-500 text-tech-blue-600"
              >
                <Icons.Handshake className="h-4 w-4 mr-2" />
                Đối tác của chúng tôi
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <HolographicText>Đối tác tiêu biểu</HolographicText>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto mb-4">
                Chúng tôi tự hào là đối tác công nghệ đáng tin cậy của các tập
                đoàn và tổ chức hàng đầu Việt Nam
              </p>
            </div>
          </Reveal>

          <SectionLoader
            loading={loading}
            error={error}
            onRetry={() => fetchAllHomeData()}
            loadingComponent={LoadingPartnersSkeleton}
            errorTitle="Không thể tải thông tin đối tác"
          >
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {partners?.map((partner, index) => (
                <Reveal direction="up" delay={index * 100} key={partner.id}>
                  <div className="bg-white rounded-lg p-1 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center h-32 overflow-hidden">
                    <div className="relative w-full h-20 group">
                      <Image
                        src={
                          partner?.content[0]?.imageUrl || '/placeholder.svg'
                        }
                        alt={
                          partner?.content[0]?.title || `Partner ${index + 1}`
                        }
                        width={120}
                        height={60}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-contain transition-all duration-500 ease-in-out"
                        style={{
                          objectPosition: 'center center',
                          filter: 'contrast(1.1) brightness(1.05)',
                          background: 'transparent',
                        }}
                        priority={index < 6}
                        quality={90}
                        onLoad={(e) => {
                          const img = e.target as HTMLImageElement;
                          img.style.imageRendering = 'crisp-edges';
                        }}
                      />
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {partners?.length === 0 && !loading && (
              <div className="text-center py-12">
                <Icons.Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Chưa có thông tin đối tác
                </h3>
                <p className="text-gray-500">
                  Thông tin đối tác sẽ được cập nhật sớm.
                </p>
              </div>
            )}
          </SectionLoader>
        </div>
      </section>
      {/* News Section */}
      <section className="py-20 bg-white relative">
        <div className="container px-4 md:px-6">
          <Reveal direction="up" skipAnimation={isInitialRender}>
            <div className="text-center mb-16">
              <Badge
                variant="outline"
                className="mb-4 border-tech-blue-500 text-tech-blue-600"
              >
                <Icons.Newspaper className="h-4 w-4 mr-2" />
                Tin tức & Sự kiện
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <HolographicText>Tin tức công nghệ mới nhất</HolographicText>
              </h2>
              <p className="text-tech-blue-700 max-w-2xl mx-auto">
                Cập nhật những tin tức, xu hướng công nghệ mới nhất trong ngành
              </p>
            </div>
          </Reveal>

          <SectionLoader
            loading={loading}
            error={error}
            onRetry={() => fetchAllHomeData()}
            loadingComponent={LoadingNewsSkeleton}
            errorTitle="Không thể tải tin tức"
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news?.map((post, index) => (
                <TechProductCard
                  key={post.id || index}
                  title={post.title}
                  description={
                    post.short_description ||
                    post.short_description?.substring(0, 150) + '...'
                  }
                  image={post.thumbnail || '/placeholder.svg'}
                  badge={post.topics[0]?.name || 'Tin tức'}
                  badgeColor="bg-blue-600"
                  delay={index * 100}
                  link={`/news/${post.slug}`}
                />
              ))}
            </div>

            {news?.length === 0 && !loading && (
              <div className="text-center py-12">
                <Icons.Newspaper className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Chưa có tin tức mới
                </h3>
                <p className="text-gray-500">
                  Tin tức mới sẽ được cập nhật thường xuyên.
                </p>
              </div>
            )}
          </SectionLoader>
        </div>
      </section>
      {/* Enhanced Contact Section */}
      <section
        className="py-20 bg-gradient-to-r from-navy-tech via-tech-blue-800 to-tech-blue-700 text-white relative overflow-hidden"
        id="contact"
      >
        {showBackgrounds && <CircuitBoard />}

        <div className="container px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal direction="left" skipAnimation={isInitialRender}>
              <div>
                <Badge
                  variant="outline"
                  className="mb-4 border-tech-blue-400/30 text-tech-blue-100 animate-tech-pulse"
                >
                  <Icons.Zap className="h-4 w-4 mr-2" />
                  Đối tác công nghệ của bạn
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  <HolographicTextWhite>
                    Sẵn sàng nâng cấp doanh nghiệp bằng công nghệ?
                  </HolographicTextWhite>
                </h2>
                <p className="text-tech-blue-100 mb-8 text-lg leading-relaxed">
                  Dù bạn đang cần giải pháp AI, nền tảng Cloud, hay một website
                  ấn tượng – đội ngũ của chúng tôi sẽ đồng hành từ ý tưởng đến
                  triển khai.
                </p>
                <div className="space-y-4">
                  {[
                    'Thiết kế giao diện UI/UX hiện đại, chuẩn SEO',
                    'Xây dựng website & hệ thống web app tùy biến',
                    'Triển khai giải pháp AI, Cloud & giám sát vận hành',
                  ].map((step, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 group"
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-tech-blue-600 to-cyber-blue rounded-full flex items-center justify-center group-hover:scale-110 transition-transform animate-tech-pulse">
                        <span className="text-sm font-bold">{index + 1}</span>
                      </div>
                      <span className="group-hover:text-cyber-blue transition-colors">
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal direction="right" skipAnimation={isInitialRender}>
              <div className="glass-tech rounded-lg p-8 border border-tech-blue-600/40">
                <ContactForm title="" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
