'use client';

import React, { useEffect, useState } from 'react';
import {
  Star,
  Heart,
  Zap,
  Users,
  BarChart3,
  Share2,
  Check,
  Phone,
  ArrowLeft,
  Headset,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import api from '@/utils/axios';
import { toast } from 'sonner';
import { handleError } from '@/utils/handle-error';

import ContactDialog from '@/components/dialog-contact';
import { ProductCard } from '@/components/enhanced-cards';
import RatingDialog from '@/components/dialog-rating';
import { HolographicText } from '@/components/tech-blue-animations';
import { SupportSection } from '@/components/enhanced-support';

const ProductDetailPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const [openContact, setOpenContact] = useState(false);
  const [openRating, setOpenRating] = useState(false);

  const [activeTab, setActiveTab] = useState('description');
  const [isLiked, setIsLiked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const parseImagesUrl = (imagesUrl) => {
    if (!imagesUrl || typeof imagesUrl !== 'string') return [];

    try {
      const parsed = JSON.parse(JSON.parse(imagesUrl));
      if (Array.isArray(parsed)) return parsed[0];
      return [];
    } catch (error) {
      console.error('Lỗi parse imagesUrl:', error);
      return [];
    }
  };

  useEffect(() => {
    if (slug) {
      getProductDetail(slug);
    }
  }, [slug]);

  const getProductDetail = async (slug) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get(`/product/public/show-by-slug/${slug}`);
      const data = response.data.data;

      // Giải mã imagesUrl nếu có
      let images = [];
      if (data.imagesUrl) {
        try {
          images = JSON.parse(JSON.parse(data.imagesUrl));
        } catch (e) {
          console.warn('Lỗi khi parse imagesUrl:', e);
        }
      }

      setProduct({ ...data, images });

      setRelatedProducts(
        data.relatedProducts.map((item) => ({
          ...item,
          image: parseImagesUrl(item.imagesUrl),
        }))
      );
    } catch (error) {
      const message = handleError(error);
      setError(message);
      toast.error('Không thể tải thông tin sản phẩm');
    } finally {
      setLoading(false);
    }
  };

  const features = [
    'Giao diện trực quan, dễ sử dụng',
    'Kết nối máy in hóa đơn',
    'Quản lý tồn kho thông minh',
    'Quản lý khách hàng & công nợ',
    'Báo cáo doanh thu thời gian thực',
    'Tích hợp đa kênh bán hàng',
  ];

  const openLightbox = () => {
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowRight') {
      nextImage();
    } else if (e.key === 'ArrowLeft') {
      prevImage();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-16">
        <div className="container px-4 md:px-6 py-20">
          <div className="flex justify-center items-center min-h-[50vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Đang tải sản phẩm...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen pt-16">
        <div className="container px-4 md:px-6 py-20">
          <div className="flex flex-col justify-center items-center min-h-[50vh]">
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Không thể tải sản phẩm
            </h2>
            <p className="text-gray-600 mb-6">
              {error?.message || 'Sản phẩm không tồn tại hoặc đã bị xóa'}
            </p>
            <Link href="/products">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Quay lại trang sản phẩm
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const hasImages = product.images && product.images.length > 0;

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container max-w-7xl mx-auto lg:px-6 px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex flex-wrap items-center space-x-2 text-sm">
            <span className="text-gray-500">Trang chủ</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-500">Sản phẩm</span>
            <span className="text-gray-400">/</span>
            <span className="font-medium bg-blue-500 bg-clip-text text-transparent">
              {product.name}
            </span>
          </div>
        </nav>

        {/* Main Product Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative group">
              <div
                style={{
                  aspectRatio: product.images.length > 1 ? '2/1' : '3/2',
                }}
                className="rounded-lg overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 p-0 shadow-xl cursor-pointer"
                onClick={openLightbox}
              >
                {hasImages ? (
                  <>
                    <img
                      src={product.images[currentImageIndex]}
                      alt={product.name}
                      className="w-full h-full rounded-lg transform group-hover:scale-105 transition-transform duration-500 object-cover"
                    />
                    {product.originalPrice && product.salePrice && (
                      <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold animate-pulse">
                        Giảm{' '}
                        {Math.round(
                          ((product.originalPrice - product.salePrice) /
                            product.originalPrice) *
                            100
                        )}
                        %
                      </div>
                    )}
                    {/* Zoom indicator */}
                    <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white bg-opacity-90 rounded-full p-2">
                        <svg
                          className="w-6 h-6 text-gray-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                          />
                        </svg>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-lg">
                    <span className="text-gray-400">Không có hình ảnh</span>
                  </div>
                )}
              </div>
            </div>

            {/* Image Thumbnails */}
            {hasImages && product.images.length > 1 && (
              <>
                <div className="flex justify-center space-x-2 gap-3 overflow-x-auto pb-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                        currentImageIndex === index
                          ? 'border-blue-500 ring-2 ring-blue-200 shadow-lg'
                          : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                      }`}
                    >
                      <div className="w-full h-full bg-gradient-to-br from-blue-50 to-purple-50 p-1">
                        <img
                          src={image}
                          alt={`${product.name} ${index + 1}`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                    </button>
                  ))}
                </div>

                {/* Image Navigation Dots */}
                <div className="flex justify-center space-x-2 pt-2">
                  {product.images.map((_, index) => (
                    <span
                      key={index}
                      role="button"
                      tabIndex={0}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        currentImageIndex === index
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 w-8'
                          : 'bg-gray-300 hover:bg-gray-400 w-2'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Lightbox Modal */}
          {isLightboxOpen && (
            <div
              className="fixed inset-0 bg-black-900 bg-opacity-90 z-50 flex items-center justify-center p-4"
              style={{ background: 'rgba(0, 0, 0, 0.8)' }}
              onClick={closeLightbox}
              onKeyDown={handleKeyDown}
              tabIndex={0}
            >
              {/* Close button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
              >
                <X size={32} />
              </button>

              {/* Navigation buttons */}
              {hasImages && product.images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white transition-all z-10 hover:bg-white hover:rounded-full p-2"
                  >
                    <ChevronLeft size={32} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white transition-all z-10 hover:bg-white hover:rounded-full p-2"
                  >
                    <ChevronRight size={32} />
                  </button>
                </>
              )}

              {/* Main lightbox image */}
              <div
                className="max-w-4xl max-h-full relative p-10"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                />

                {/* Image counter */}
                {hasImages && product.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {product.images.length}
                  </div>
                )}
              </div>

              {/* Thumbnail navigation in lightbox */}
              {hasImages && product.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 max-w-sm overflow-x-auto">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex(index);
                      }}
                      className={`flex-shrink-0 w-12 h-12 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                        currentImageIndex === index
                          ? 'border-blue-600'
                          : 'border-blue-400 hover:border-blue-500 opacity-80 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-xs font-semibold">
                  {product.category?.name}
                </span>
                <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-xs font-semibold">
                  {product.brand?.name}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                <div className="flex items-center flex-wrap gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < product.averageRating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-gray-600 whitespace-nowrap">
                    {product.totalReviews > 0
                      ? `(${product.totalReviews} đánh giá)`
                      : '(Chưa có đánh giá)'}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  Mã sản phẩm: {product.sku}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 pt-6">
              <button
                onClick={() => setOpenContact(true)}
                className="w-full bg-blue-500 hover:bg-blue-600  text-white py-4 px-8 rounded-xl font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5 mr-3" />
                Liên hệ
              </button>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`py-3 px-6 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                    isLiked
                      ? 'bg-red-500 text-white shadow-lg'
                      : 'border-2 border-gray-200 text-gray-700 hover:border-red-300'
                  }`}
                >
                  <Heart
                    className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`}
                  />
                  {isLiked ? 'Đã thích' : 'Yêu thích'}
                </button>

                <button className="py-3 px-6 rounded-xl font-semibold border-2 border-gray-200 text-gray-700 hover:border-blue-300 transition-all flex items-center justify-center gap-2">
                  <Share2 className="w-5 h-5" />
                  Chia sẻ
                </button>
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

            {/* Trust Badges */}
            <div className="overflow-x-auto">
              <div className="flex min-w-[400px] justify-between gap-4 pt-6 border-t px-4">
                <div className="flex-shrink-0 text-center w-1/3">
                  <Headset className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-green-500" />
                  <div className="text-xs font-semibold text-gray-700">
                    Lắp đặt
                  </div>
                  <div className="text-xs text-gray-500">Trực tuyến</div>
                </div>
                <div className="flex-shrink-0 text-center w-1/3">
                  <Zap className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-blue-500" />
                  <div className="text-xs font-semibold text-gray-700">
                    Hỗ trợ
                  </div>
                  <div className="text-xs text-gray-500">24/7</div>
                </div>
                <div className="flex-shrink-0 text-center w-1/3">
                  <Users className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-purple-500" />
                  <div className="text-xs font-semibold text-gray-700">
                    Khách hàng
                  </div>
                  <div className="text-xs text-gray-500">Tin tưởng</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white border-gray-200 rounded-2xl shadow-2xl overflow-hidden mb-16">
          <div className="border-b">
            <div className="flex">
              {[
                { id: 'description', label: 'Mô tả sản phẩm', icon: BarChart3 },
                { id: 'features', label: 'Tính năng', icon: Check },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-semibold transition-all ${
                    activeTab === tab.id
                      ? 'border-b-4 border-blue-500 text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-8">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <div
                  className="prose max-w-none text-gray-600 mt-4"
                  dangerouslySetInnerHTML={{ __html: product.content }}
                />
              </div>
            )}

            {activeTab === 'features' && (
              <div className="grid md:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl"
                  >
                    <Check className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-blue-600  mb-8 ">
          Đánh giá sản phẩm
        </h2>

        <div className="relative p-3 rounded-lg bg-gradient-to-br from-white to-gray-50 border border-gray-100 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden mb-16">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full translate-y-16 translate-x-32 opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-100 to-orange-100 rounded-full translate-y-12 -translate-x-12 opacity-50"></div>

          <div className="relative">
            <div className="text-center py-16">
              {/* Enhanced star icon with glow effect */}
              <div className="relative inline-block mt-3 mb-3">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-xl opacity-30 scale-150"></div>
                <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 p-6 rounded-full">
                  <Star className="w-12 h-12 text-gray-400" />
                </div>
              </div>

              {/* Enhanced heading */}
              <h3 className="text-xl  md:text-2xl  font-bold text-gray-700 mb-3">
                Chưa có đánh giá nào
              </h3>

              {/* Enhanced description */}
              <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto leading-relaxed">
                Trở thành người đầu tiên chia sẻ trải nghiệm của bạn về sản phẩm
                này!
              </p>

              {/* Enhanced button */}
              <button
                onClick={() => setOpenRating(true)}
                className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-3 rounded-2xl font-semibold  md:text-md  shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                {/* Button glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>

                {/* Button content */}
                <Star className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                <span className="relative">Viết đánh giá đầu tiên</span>

                {/* Arrow icon */}
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              {/* Additional elements */}
              <div className="mt-8 flex justify-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-gray-200 rounded-full animate-pulse"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <RatingDialog open={openRating} onOpenChange={setOpenRating} />

        {/* Related Products */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <HolographicText>Sản phẩm liên quan</HolographicText>
          </h2>
          <div className=" pt-3 grid md:grid-cols-3 gap-8">
            {relatedProducts.slice(0, 3).map((item, index) => (
              <ProductCard key={item.id} product={item} index={index} />
            ))}
          </div>
        </div>
      </div>

      {/* Support Section */}
      <SupportSection />
    </div>
  );
};

export default ProductDetailPage;
