'use client';
import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Users, TrendingUp, Shield, Zap } from 'lucide-react';
import api from '@/utils/axios';
import HeroSection from './HeroSection';
import Link from 'next/link';
import { HolographicTitle } from '@/components/tech-blue-animations';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  });

  const [selectedCategory, setSelectedCategory] = useState('all');

  const fetchProducts = async (page = 1, limit = 10, categoryId = null) => {
    try {
      setLoading(true);
      setError(null);

      let url = `/product/public/shows?page=${page}&limit=${limit}`;
      if (categoryId && categoryId !== 'all') {
        url += `&category_id=${categoryId}`;
      }

      const response = await api.get(url);
      const { data } = response.data;

      // Transform API data to match component structure
      const transformedProducts = data.products.map((product) => ({
        id: product.id,
        name: product.name,
        category: product.category?.name || 'Sản phẩm',
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
        image: product.imagesUrl
          ? JSON.parse(JSON.parse(product.imagesUrl))[0] ||
            'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop'
          : 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop',
        badge: product.isFeatured ? 'Nổi bật' : '',
        color: getRandomColor(),
        slug: product.slug,
        stock: product.stock,
      }));

      setProducts(transformedProducts);
      setPagination({
        totalItems: data.totalItems || 0,
        totalPages: data.totalPages || 1,
        currentPage: data.currentPage || 1,
      });
    } catch (error) {
      console.error('Error fetching products:', error);
      const message =
        error.response?.data?.message ||
        error.message ||
        'Không thể tải danh sách sản phẩm';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const getRandomColor = () => {
    const colors = ['blue', 'purple', 'green', 'orange', 'red', 'slate'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const getName = (str) => {
    const words = str.split(' ');
    const shortName =
      words.length > 15 ? words.slice(0, 15).join(' ') + '…' : str;
    return shortName;
  };

  const getBadgeColor = (color) => {
    const colors = {
      blue: 'bg-blue-600',
      purple: 'bg-purple-600',
      green: 'bg-green-600',
      orange: 'bg-orange-600',
      red: 'bg-red-600',
      slate: 'bg-slate-600',
    };
    return colors[color] || 'bg-blue-600';
  };

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

  const Card = ({ children, className = '' }) => (
    <div
      className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}
    >
      {children}
    </div>
  );

  const CardHeader = ({ children, className = '' }) => (
    <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>
      {children}
    </div>
  );

  const CardTitle = ({ children, className = '' }) => (
    <h3
      className={`text-2xl font-semibold leading-none tracking-tight ${className}`}
    >
      {children}
    </h3>
  );

  const CardDescription = ({ children, className = '' }) => (
    <p className={`text-sm text-muted-foreground ${className}`}>{children}</p>
  );

  const CardContent = ({ children, className = '' }) => (
    <div className={`p-6 pt-0 ${className}`}>{children}</div>
  );

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
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Đang tải sản phẩm...</p>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-600 mb-4">
                Có lỗi xảy ra khi tải sản phẩm: {error}
              </p>
              <Button
                onClick={() =>
                  fetchProducts(pagination.currentPage, 10, selectedCategory)
                }
              >
                Thử lại
              </Button>
            </div>
          ) : (
            <>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  <HolographicTitle>Sản phẩm của chúng tôi</HolographicTitle>
                </h2>
                <p className="text-gray-600">
                  {pagination.totalItems} sản phẩm - Trang{' '}
                  {pagination.currentPage} / {pagination.totalPages}
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product, index) => (
                  <AnimatedSection key={product.id} delay={index * 100}>
                    <Card className="group hover:shadow-xl transition-all duration-300 h-full">
                      <div className="relative overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.target.src =
                              'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop';
                          }}
                        />
                        <div className="absolute top-4 left-4 flex gap-2">
                          <Badge className={getBadgeColor(product.color)}>
                            {product.category}
                          </Badge>
                          {product.badge && (
                            <Badge variant="secondary">{product.badge}</Badge>
                          )}
                        </div>
                        {product.stock === 0 && (
                          <div className="absolute top-4 right-4">
                            <Badge className="bg-red-600">Hết hàng</Badge>
                          </div>
                        )}
                      </div>
                      <CardHeader>
                        <CardTitle className="text-xl">
                          {getName(product.name)}
                        </CardTitle>
                        <CardDescription className="text-base">
                          {product.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex-1 flex flex-col">
                        <div className="space-y-2 mb-6">
                          {product.features.map((feature, idx) => (
                            <div
                              key={idx}
                              className="flex items-center text-sm text-gray-600"
                            >
                              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2" />
                              {feature}
                            </div>
                          ))}
                        </div>
                        <div className="mt-auto">
                          <div className="text-lg font-semibold text-blue-600 mb-4">
                            {product.price}
                            {product.originalPrice &&
                              parseFloat(product.originalPrice) >
                                parseFloat(product.price || 0) && (
                                <span className="text-sm text-gray-400 line-through ml-2">
                                  {parseInt(
                                    product.originalPrice
                                  ).toLocaleString('vi-VN')}{' '}
                                  VNĐ
                                </span>
                              )}
                          </div>
                          <div className="flex gap-2">
                            <Button
                              className="flex-1"
                              variant="outline"
                              onClick={() =>
                                product.slug &&
                                window.open(product.slug, '_blank')
                              }
                            >
                              Chi tiết
                            </Button>
                            <Button asChild className="flex-1">
                              {' '}
                              <Link
                                href="/contact"
                                className="flex items-center"
                              >
                                Liên hệ
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </AnimatedSection>
                ))}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="flex justify-center mt-12 gap-2">
                  <Button
                    variant="outline"
                    onClick={() =>
                      fetchProducts(
                        pagination.currentPage - 1,
                        10,
                        selectedCategory
                      )
                    }
                    disabled={pagination.currentPage === 1}
                  >
                    Trang trước
                  </Button>
                  <span className="flex items-center px-4">
                    Trang {pagination.currentPage} / {pagination.totalPages}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() =>
                      fetchProducts(
                        pagination.currentPage + 1,
                        10,
                        selectedCategory
                      )
                    }
                    disabled={pagination.currentPage === pagination.totalPages}
                  >
                    Trang sau
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Features Section */}
      <AnimatedSection className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Tính năng nổi bật
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <HolographicTitle>Tại sao chọn sản phẩm Katec?</HolographicTitle>
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
              <h3 className="text-xl font-semibional mb-2">Dễ sử dụng</h3>
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
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact" className="flex items-center">
                Đặt lịch demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
