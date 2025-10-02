import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import api from '@/utils/axios';
import { toast } from 'sonner';
import type {
  Product,
  ProductCardData,
  Review,
  Reviews,
  ReviewStats,
} from '@/types/interface';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import ShareButtons from '@/components/share-buttons';
import { ProductTabs, ReviewProduct } from '@/components/enhanced-support';
import { ProductCard } from '@/components/enhanced-cards';
import { localStorageUtil } from '@/utils/localStorage';
import { PriceVND, transformProducts } from '@/utils/format';
import {
  ChevronDown,
  ChevronUp,
  Star,
  X,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
} from 'lucide-react';
import { ProductsSlider } from '@/components/keen-sliders';
import {
  LoadingProductDetailSkeleton,
  SectionLoader,
} from '@/components/loading-error';

export default function ProductDetailPage() {
  const router = useRouter();
  const { slug } = router.query;

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [isAdding, setIsAdding] = useState(false);
  const [isBuying, setIsBuying] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const [quantity, setQuantity] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<ProductCardData[]>([]);
  const [reviews, setReviews] = useState<ReviewStats | null>(null);

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const hasImages = (product?.imagesUrl?.length ?? 0) > 0;

  const openLightbox = () => {
    if (!hasImages) return;
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => setIsLightboxOpen(false);

  const prevImage = () =>
    setCurrentImageIndex(
      (i) =>
        (i - 1 + (product?.imagesUrl?.length ?? 1)) %
        (product?.imagesUrl?.length ?? 1)
    );

  const nextImage = () =>
    setCurrentImageIndex((i) => (i + 1) % (product?.imagesUrl?.length ?? 1));

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!isLightboxOpen) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'ArrowRight') nextImage();
  };

  const parseImagesUrl = (imagesUrl: string[] | string | null): string[] => {
    if (!imagesUrl) return [];
    if (Array.isArray(imagesUrl)) return imagesUrl;

    try {
      const parsed = JSON.parse(JSON.parse(imagesUrl as string));
      if (Array.isArray(parsed)) return parsed;
      return [];
    } catch {
      return [];
    }
  };

  const ratingStats = (reviews: Reviews, onlyActive = true): ReviewStats => {
    const list = onlyActive
      ? reviews.filter((r) => r.status === 'active')
      : reviews;
    const total = list.length;
    const counts = [0, 0, 0, 0, 0];
    for (const r of list) {
      const i = Math.min(5, Math.max(1, Math.round(Number(r.rating)))) - 1;
      counts[i]++;
    }
    const avg = total
      ? counts.reduce((s, c, i) => s + c * (i + 1), 0) / total
      : 0;
    return {
      total,
      average: Math.round(avg * 10) / 10,
      percents: counts.map((c) => (total ? Math.round((c / total) * 100) : 0)),
    };
  };

  useEffect(() => {
    if (slug) {
      getProductDetail(slug as string);
    }
  }, [slug]);

  const getProductDetail = async (slug: string) => {
    try {
      setLoading(true);
      setError(null);

      const resProduct = await api.get(`/product/public/show-by-slug/${slug}`);
      const data = resProduct.data.data;
      const ableId = data.variants[0].id;
      const resReview = await api.get(
        `/review/product/public/shows?ableId=${ableId}`
      );
      const reviewsData = resReview.data.data.reviews;
      setReviews(ratingStats(reviewsData));

      let images: string[] = [];
      if (data.imagesUrl) {
        images = parseImagesUrl(data.imagesUrl) || [];
      }

      setProduct({ ...data, imagesUrl: images });
      setSelectedImage(images[0] || null);

      if (data.relatedProducts) {
        const products = transformProducts(
          data.relatedProducts.slice(0, 5) ?? []
        );
        setRelatedProducts(products);
      }
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Không thể tải thông tin sản phẩm';
      setError(message);
      toast.error('Không thể tải thông tin sản phẩm');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (contentRef.current) {
      const height = contentRef.current.scrollHeight;
      setIsOverflowing(height > 80);
    }
  }, [product?.content]);

  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLightboxOpen]);

  const averageRating = (
    reviews: Review[],
    { onlyActive = true, precision = 1 } = {}
  ): number => {
    const list = onlyActive
      ? reviews.filter((r) => r.status === 'active')
      : reviews;
    if (list.length === 0) return 0;
    const sum = list.reduce((s, r) => s + (Number(r.rating) || 0), 0);
    const avg = sum / list.length;
    const p = Math.pow(10, precision);
    return Math.round(avg * p) / p;
  };

  const handleAdd = () => setQuantity((q) => q + 1);
  const handleMinus = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const handleAddToCart = () => {
    setIsAdding(true);

    localStorageUtil.addToCart({
      id: String(product?.id ?? ''),
      variantId: String(product?.variants[0].id ?? ''),
      name: product?.name ?? '',
      image: product?.imagesUrl[0] ?? '',
      price: parseFloat(product?.salePrice || product?.originalPrice || '0'),
      unit: product?.unit,
      slug: product?.slug ?? '',
      quantity: 1,
    });

    setTimeout(() => {
      toast.success(`Đã thêm ${product?.name} vào giỏ hàng`);
    }, 200);

    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };

  const handlePurchase = () => {
    setIsBuying(true);

    localStorageUtil.addToCart({
      id: String(product?.id ?? ''),
      variantId: String(product?.variants[0].id ?? ''),
      name: product?.name ?? '',
      image: product?.imagesUrl[0] ?? '',
      price: parseFloat(product?.salePrice || product?.originalPrice || '0'),
      unit: product?.unit,
      slug: product?.slug ?? '',
      quantity: 1,
    });

    setTimeout(() => {
      toast.success(`Đã thêm ${product?.name} vào giỏ hàng`);
    }, 200);

    setTimeout(() => {
      setIsBuying(false);
    }, 1000);
    router.push('/thanh-toan');
  };

  console.log('reviews >>', reviews);

  if (!product) return <p className="text-center">Không tìm thấy sản phẩm</p>;

  const breadcrumbItems = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Sản phẩm', href: '/san-pham' },
    {
      label: product.category.name,
      href: `/san-pham?danh_muc=${product.category.id}`,
    },
    { label: product.name },
  ];

  return (
    <div className="container py-4">
      <SectionLoader
        loading={loading}
        error={error}
        number={6}
        onRetry={() => getProductDetail(slug as string)}
        loadingComponent={LoadingProductDetailSkeleton}
        errorTitle="tải sản phẩm"
      >
        <Breadcrumb items={breadcrumbItems} />
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
          {/* Gallery */}
          <div>
            {/* Main Image */}
            <div
              className="relative mb-4 aspect-[6/5] border border-gray-100 rounded-sm shadow-lg overflow-hidden group cursor-pointer"
              onClick={openLightbox}
            >
              {selectedImage ? (
                <>
                  <Image
                    src={selectedImage}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded transform group-hover:scale-[1.02] transition-transform duration-500"
                  />
                  {/* Zoom indicator */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-2">
                      {/* icon phóng to */}
                      <svg
                        className="w-6 h-6 text-gray-600"
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
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <span className="text-gray-400">Không có hình ảnh</span>
                </div>
              )}

              {/* Discount badge */}
              {Number(product.originalPrice) > Number(product.salePrice) && (
                <div className="absolute top-3 left-3 z-20">
                  <div className="bg-gradient-to-r from-red-600 via-red-500 to-orange-500 text-white text-base font-bold px-4 py-2 rounded-full shadow-lg">
                    -
                    {Math.floor(
                      (1 -
                        Number(product.salePrice) /
                          Number(product.originalPrice)) *
                        100
                    )}
                    %
                  </div>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            <div className="flex space-x-3">
              {product.imagesUrl.length > 1 &&
                product.imagesUrl.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedImage(img);
                      setCurrentImageIndex(idx);
                    }}
                    className={`w-20 h-20 border rounded-sm overflow-hidden ${
                      selectedImage === img
                        ? 'ring-2 ring-green-500'
                        : 'border-gray-200'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${idx}`}
                      width={80}
                      height={80}
                      objectFit="cover"
                    />
                  </button>
                ))}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col justify-between text-sm h-full">
            {/* Nội dung trên */}
            <div className="flex flex-col justify-between h-full">
              <div>
                <h1 className="text-xl md:text-2xl lg:text-[1.7rem] text-green-cyan-500 font-semibold mb-2">
                  {product.name}{' '}
                  {product.unit && (
                    <span className="text-lg text-neutral-gray-500">
                      {' (' + product.unit + ')'}
                    </span>
                  )}
                </h1>
                <div className="w-10 md:w-12 h-1 bg-gray-200 mb-1 md:mb-2"></div>

                {/* Rating */}
                <div className="flex items-center gap-2 px-3 py-2 mb-2 md:mb-3 text-sm md:text-base text-gray-900 ">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(reviews?.average ?? 0)
                            ? 'fill-yellow-500 text-yellow-500'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span>{reviews?.average ?? 0}</span>
                  <span className="pl-2 border-l-2">
                    ({reviews?.total ?? 0} đánh giá)
                  </span>
                </div>

                <div className="space-y-1 mb-2">
                  <div className="flex gap-4 ">
                    <PriceVND
                      value={product.salePrice}
                      className="text-orange-500 font-bold text-3xl md:text-4xl  items-start"
                      symbolClassName="text-2xl font-semibold ml-1 align-baseline"
                    />
                    {product.originalPrice > product.salePrice && (
                      <PriceVND
                        value={product.originalPrice}
                        className="line-through text-neutral-gray-300 font-medium text-base md:text-lg  inline-flex items-end"
                        symbolClassName="text-xl font-semibold ml-1 align-baseline"
                      />
                    )}
                  </div>
                  <p className="text-gray-900 text-xs">
                    Giá sản phẩm đã gồm VAT và chưa gồm phí vận chuyển (nếu có)
                  </p>
                </div>

                <div className="mt-3 mb-4 md:mt-4 md:mb-6 p-3 md:p-4 relative border-b-2 border-green-cyan-500/50 bg-green-cyan-50">
                  <h4 className="text-sm md:text-base font-semibold mb-2">
                    Mô tả ngắn
                  </h4>

                  <div
                    ref={contentRef}
                    className={`pl-2 prose prose-base sm:prose-lg lg:prose-xl max-w-none ${
                      expanded ? 'pb-6' : 'max-h-[80px] overflow-hidden'
                    }`}
                    style={{ textAlign: 'justify' }}
                    dangerouslySetInnerHTML={{ __html: product.content ?? '' }}
                  />

                  {isOverflowing && !expanded && (
                    <div className="absolute bottom-0 left-0 w-full h-16 flex items-end justify-center bg-gradient-to-t from-white via-green-cyan-50/90 to-transparent rounded-b-lg">
                      <button
                        onClick={() => setExpanded(true)}
                        className="mb-1 flex items-center space-x-1 px-3 text-green-cyan-500 font-medium hover:underline bg-white/10 rounded"
                      >
                        <span>Xem thêm</span>
                        <ChevronDown className="w-3 h-3" />
                      </button>
                    </div>
                  )}

                  {isOverflowing && expanded && (
                    <div className="absolute bottom-[2px] left-1/2 -translate-x-1/2 text-center">
                      <button
                        onClick={() => setExpanded(false)}
                        className="flex items-center space-x-1 px-3 text-green-cyan-600 font-medium hover:underline rounded"
                      >
                        <span>Thu gọn</span>
                        <ChevronUp className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Quantity */}
                <div className="flex items-center text-sm md:text-base space-x-3 mb-3 md:mb-5">
                  <strong>Số lượng: </strong>
                  <div className="flex  rounded border border-gray-300 bg-gray-50 overflow-hidden">
                    <button
                      onClick={handleMinus}
                      className="px-2 py-0.5  hover:bg-gray-100"
                    >
                      -
                    </button>
                    <input
                      type="text"
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="w-12 text-center border-l border-r outline-none"
                      min={1}
                    />
                    <button
                      onClick={handleAdd}
                      className="px-2 py-0.5  hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              {/*  Add to Cart */}
              <div className="flex items-center space-x-3 lg:space-x-6 mb-3">
                <button
                  className={`flex-1 relative overflow-hidden flex items-center justify-center 
              bg-gradient-to-r from-green-cyan-400 via-green-cyan-500 to-green-cyan-400
              w-full gap-1 rounded text-white text-sm font-semibold py-3 
              font-sans font-semibold rounded-xs transition-all duration-300 transform ${
                isAdding
                  ? 'scale-95 shadow-lg'
                  : 'group-hover:scale-105 hover:shadow-xl hover:scale-[1.05] active:scale-105'
              }`}
                  onClick={handleAddToCart}
                  disabled={isAdding}
                >
                  <span
                    className={`flex items-center justify-center gap-2 transition-all duration-300 ${
                      isAdding ? 'scale-110' : ''
                    }`}
                  >
                    {isAdding ? (
                      <>
                        <svg
                          className="w-5 h-5 animate-spin"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          />
                        </svg>
                        ĐANG THÊM...
                      </>
                    ) : (
                      <>
                        <svg
                          className="group-hover:rotate-12 w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293a1 1 0 001.414 1.414L10 13M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z"
                          />
                        </svg>
                        THÊM VÀO GIỎ
                      </>
                    )}
                  </span>

                  {/* Ripple effect */}
                  {isAdding && (
                    <div className="absolute inset-0 bg-white opacity-20 animate-ping rounded" />
                  )}
                </button>
                <button
                  className={`flex-1 relative overflow-hidden flex items-center justify-center 
              bg-gradient-to-r from-red-500 via-red-600 to-red-500
              w-full gap-1 rounded text-white text-sm font-semibold py-3 
              font-sans font-semibold rounded-xs transition-all duration-300 transform ${
                isBuying
                  ? 'scale-95 shadow-lg'
                  : 'group-hover:scale-105 hover:shadow-xl hover:scale-[1.05] active:scale-95'
              }`}
                  onClick={handlePurchase}
                  disabled={isBuying}
                >
                  <span
                    className={`flex items-center justify-center gap-2 transition-all duration-300 ${
                      isBuying ? 'scale-110' : ''
                    }`}
                  >
                    {isBuying ? (
                      <>
                        <svg
                          className="w-5 h-5 animate-spin"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          />
                        </svg>
                        ĐANG MUA...
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-5 h-5" />
                        MUA NGAY
                      </>
                    )}
                  </span>

                  {/* Ripple effect */}
                  {isBuying && (
                    <div className="absolute inset-0 bg-white opacity-20 animate-ping rounded" />
                  )}
                </button>
              </div>
            </div>

            {/* Phần cuối cùng */}
            <div className="border-t border-gray-200 pt-3 my-3">
              <p className="font-sans text-[0.8rem] text-gray-600 mb-4">
                Danh mục:{' '}
                <span className="font-medium text-gray-800">
                  {product.category?.name || ''}
                </span>
              </p>
              <ShareButtons
                url={`/san-pham/${product.slug}`}
                title={product.name}
                media={product.imagesUrl[0]}
                isLine={false}
                align="start"
              />
            </div>
          </div>
        </section>

        {isLightboxOpen && hasImages && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.85)' }}
            onClick={closeLightbox}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            {/* Close */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
              className="absolute top-4 right-4 text-white/90 hover:text-white transition-colors z-10"
              aria-label="Đóng"
            >
              <X className="w-6 h-6 md:w-8 md:h-8" />
            </button>

            {/* Prev / Next */}
            {product.imagesUrl.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/90 hover:text-white transition z-10"
                  aria-label="Ảnh trước"
                >
                  <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/90 hover:text-white transition z-10"
                  aria-label="Ảnh sau"
                >
                  <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
                </button>
              </>
            )}

            {/* Ảnh lớn */}
            <div
              className="max-w-5xl max-h-[90vh] relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* dùng <img> để tránh Next/Image cần layout phức tạp trong modal */}
              <img
                src={product.imagesUrl[currentImageIndex]}
                alt={`${product.name} ${currentImageIndex + 1}`}
                className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              />

              {/* Counter */}
              {product.imagesUrl.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {product.imagesUrl.length}
                </div>
              )}
            </div>

            {/* Thumbnail trong lightbox */}
            {product.imagesUrl.length > 1 && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 max-w-[80vw] overflow-x-auto">
                {product.imagesUrl.map((image, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(index);
                      setSelectedImage(image);
                    }}
                    className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      currentImageIndex === index
                        ? 'border-green-600'
                        : 'border-white/40 hover:border-white/70 opacity-80 hover:opacity-100'
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

        <ProductTabs
          description={product.content || ''}
          specificationValues={product.specificationValues || []}
        />

        <ReviewProduct />

        <div className="pt-6 my-8">
          <div className="flex items-center justify-center mb-6 gap-3">
            <h2 className="uppercase text-lg md:text-xl lg:text-2xl text-green-cyan-500 font-semibold ">
              Sản phẩm gợi ý
            </h2>
            <div className="flex-grow border-t-2 border-orange-300"></div>
          </div>
          {relatedProducts.length > 0 ? (
            <ProductsSlider
              slide={5}
              isShoppingCart={true}
              products={relatedProducts}
            />
          ) : (
            <p className="text-center text-neutral-gray-500">
              Không có sản phẩm nào tương tự.
            </p>
          )}
        </div>
      </SectionLoader>
    </div>
  );
}
