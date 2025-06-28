'use client';
import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  Users,
  TrendingUp,
  Shield,
  Zap,
  ZapIcon,
  AwardIcon,
  LayoutDashboard,
  ShoppingCart,
} from 'lucide-react';
import api from '@/utils/axios';
import HeroSection from '../../components/banner/product-section';
import Link from 'next/link';
import { HolographicText } from '@/components/tech-blue-animations';
import { ProductCard } from '@/components/enhanced-cards';
import TestimonialSlider from '../../components/feeback-product';
import ContactDialog from '@/components/dialog-contact';
import { Pagination } from '@/components/pagination';
import {
  LoadingSkeleton,
  SectionLoader,
} from '@/components/loading-error-components';

export default function ProductsPage() {
  const MAX_LENGHT_LIMIT = 9;

  const [products, setProducts] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [openContact, setOpenContact] = useState(false);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  });

  const [selectedCategory, setSelectedCategory] = useState('all');

  const fetchAllData = async (
    options = { page: 1, limit: MAX_LENGHT_LIMIT, categoryId: null }
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
    requests.push(api.get('/page-section/public/shows?sectionType=feedback')); // index 1

    try {
      const [productRes, feedbackRes] = await Promise.all(requests);

      // Products
      const productData = productRes.data.data;
      const transformedProducts = productData.products.map((product) => {
        let image =
          'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop';
        try {
          image = JSON.parse(JSON.parse(product.imagesUrl))[0] || image;
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
      setFeedbacks(feedbackRes.data.data || []);
    } catch (error) {
      console.error('Error fetching homepage data:', error);
      const message =
        error.response?.data?.message ||
        error.message ||
        'Không thể tải dữ liệu trang chủ';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const getRandomColor = () => {
    const colors = ['blue', 'purple', 'green', 'red'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const Badge = ({ children, variant = 'default', className = '' }) => {
    const baseClasses =
      'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium';
    const variantClasses =
      variant === 'outline'
        ? 'border border-gray-300 text-gray-700'
        : variant === 'secondary'
        ? 'bg-gray-100 text-gray-800'
        : 'bg-blue-600 text-white';

    return (
      <span className={`${baseClasses} ${variantClasses} ${className}`}>
        {children}
      </span>
    );
  };

  const Button = ({
    children,
    size = 'default',
    variant = 'default',
    className = '',
    onClick,
    ...props
  }) => {
    const baseClasses =
      'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
    const sizeClasses = size === 'lg' ? 'h-11 px-8' : 'h-10 px-4 py-2';
    const variantClasses =
      variant === 'outline'
        ? 'border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50'
        : variant === 'secondary'
        ? 'bg-gray-100 text-gray-900 hover:bg-gray-200'
        : 'bg-blue-600 text-white hover:bg-blue-700';

    return (
      <button
        className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    );
  };

  const AnimatedSection = ({ children, delay = 0, className = '' }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true);
            }, delay);
          }
        },
        {
          threshold: 0.1,
          rootMargin: '50px',
        }
      );

      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }

      return () => {
        if (sectionRef.current) {
          observer.unobserve(sectionRef.current);
        }
      };
    }, [delay]);

    return (
      <div
        ref={sectionRef}
        className={`
        relative
        transform transition-all duration-700 ease-out
        ${
          isVisible
            ? 'translate-y-0 opacity-100 scale-100'
            : 'translate-y-8 opacity-0 scale-95'
        }
        ${isHovered ? 'translate-y-[-4px] scale-105' : ''}
        ${className}
      `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          transitionDelay: `${delay}ms`,
        }}
      >
        {/* Hiệu ứng gradient border khi hover */}
        <div
          className={`
        absolute inset-0 
        bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
        rounded-lg opacity-0 transition-opacity duration-300
        ${isHovered ? 'opacity-20' : ''}
        blur-sm
      `}
        />

        {/* Hiệu ứng ánh sáng */}
        <div
          className={`
        absolute inset-0 
        bg-gradient-to-r from-transparent via-white to-transparent
        opacity-0 transition-all duration-500
        ${isHovered ? 'opacity-10 translate-x-full' : 'translate-x-[-100%]'}
        skew-x-12
      `}
        />

        {/* Nội dung chính */}
        <div className="relative z-10">{children}</div>

        {/* Hiệu ứng particles khi hover */}
        {isHovered && (
          <>
            <div className="absolute top-2 left-2 w-1 h-1 bg-blue-400 rounded-full animate-ping" />
            <div
              className="absolute top-4 right-6 w-1 h-1 bg-purple-400 rounded-full animate-ping"
              style={{ animationDelay: '0.2s' }}
            />
            <div
              className="absolute bottom-4 left-8 w-1 h-1 bg-pink-400 rounded-full animate-ping"
              style={{ animationDelay: '0.4s' }}
            />
            <div
              className="absolute bottom-2 right-2 w-1 h-1 bg-cyan-400 rounded-full animate-ping"
              style={{ animationDelay: '0.6s' }}
            />
          </>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen pt-16 bg-white">
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
      {/* Hero Section */}
      <HeroSection />
      {/* Products Grid */}
      <section id="products" className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <SectionLoader
            loading={loading}
            error={error}
            onRetry={() => fetchAllData()}
            loadingComponent={LoadingSkeleton}
            errorTitle="Không thể tải sản phẩm"
          >
            <div className="text-center mb-12">
              <Badge
                variant="outline"
                className="mb-4 border-tech-blue-500 text-tech-blue-600"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Giải pháp số
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <HolographicText>Sản phẩm của chúng tôi</HolographicText>
              </h2>
              <p className="text-tech-blue-700 max-w-2xl mx-auto">
                Khám phá những sản phẩm tốt nhất được chúng tôi tuyển chọn dành
                cho bạn
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              keyword="sản phẩm"
              pagination={pagination}
              onPageChange={fetchAllData}
              itemsPerPage={MAX_LENGHT_LIMIT}
              selectedCategory={selectedCategory}
            />
          </SectionLoader>
        </div>
      </section>
      {/* Features Section */}
      <AnimatedSection className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <Badge
              variant="outline"
              className="mb-4 border-tech-blue-500 text-tech-blue-600"
            >
              <ZapIcon className="h-4 w-4 mr-2" />
              Tính năng nổi bật
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <HolographicText>Tại sao chọn sản phẩm Katec?</HolographicText>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Các sản phẩm của chúng tôi được thiết kế với công nghệ tiên tiến
              và tối ưu cho thị trường Việt Nam
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Triển khai nhanh</h3>
              <p className="text-gray-600">
                Cài đặt và vận hành trong vòng 1-2 tuần
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Dễ sử dụng</h3>
              <p className="text-gray-600">
                Giao diện thân thiện, đào tạo đơn giản
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Tăng hiệu quả</h3>
              <p className="text-gray-600">Cải thiện năng suất lên đến 40%</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Bảo mật cao</h3>
              <p className="text-gray-600">
                Tuân thủ tiêu chuẩn bảo mật quốc tế
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>
      {/* Customer Feedback Section */}
      <AnimatedSection className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center ">
            <Badge
              variant="outline"
              className="mb-4 border-tech-blue-500 text-tech-blue-600"
            >
              <Users className="h-4 w-4 mr-2" />
              Khách hàng nói gì
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <HolographicText>Phản hồi từ khách hàng</HolographicText>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hơn 500+ doanh nghiệp đã tin tưởng và sử dụng sản phẩm của chúng
              tôi
            </p>
          </div>

          <TestimonialSlider feedbacks={feedbacks} />

          {/* Statistics */}
          <div className=" grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Khách hàng tin tưởng</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">98%</div>
              <div className="text-gray-600">Tỷ lệ hài lòng</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">24/7</div>
              <div className="text-gray-600">Hỗ trợ khách hàng</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">5+</div>
              <div className="text-gray-600">Năm kinh nghiệm</div>
            </div>
          </div>
        </div>
      </AnimatedSection>
      {/* CTA Section */}
      <AnimatedSection className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Sẵn sàng chuyển đổi số doanh nghiệp?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Liên hệ ngay để được tư vấn miễn phí và trải nghiệm demo sản phẩm
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              onClick={() => setOpenContact(true)}
              className="flex items-center border-0 hover:bg-white"
            >
              Dùng thử miễn phí
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </AnimatedSection>
      {/* Form Contact */}
      <ContactDialog
        title="Đăng ký dùng thử miễn phí"
        des="Vui lòng để lại thông tin của bạn. Chúng tôi sẽ kích hoạt bản dùng thử và liên hệ hướng dẫn bạn trải nghiệm sản phẩm miễn phí."
        open={openContact}
        onOpenChange={setOpenContact}
      />
    </div>
  );
}
