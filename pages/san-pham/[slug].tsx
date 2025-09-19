import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import api from '@/utils/axios';
import { handleError } from '@/utils/handle-error';
import { toast } from 'sonner';
import type { Product, ProductCardData } from '@/types/interface';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import ShareButtons from '@/components/share-buttons';
import { ProductTabs } from '@/components/enhanced-support';
import { ProductCard } from '@/components/enhanced-cards';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { localStorageUtil } from '@/utils/localStorage';

export default function ProductDetailPage() {
  const router = useRouter();
  const { slug } = router.query;

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [expanded, setExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const [quantity, setQuantity] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<ProductCardData[]>([]);

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

  useEffect(() => {
    if (slug) {
      getProductDetail(slug as string);
    }
  }, [slug]);

  const getProductDetail = async (slug: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get(`/product/public/show-by-slug/${slug}`);
      const data = response.data.data;

      let images: string[] = [];
      if (data.imagesUrl) {
        images = parseImagesUrl(data.imagesUrl) || [];
      }

      setProduct({ ...data, imagesUrl: images });
      setSelectedImage(images[0] || null);

      if (data.relatedProducts) {
        setRelatedProducts(
          data.relatedProducts.map((product: Product) => {
            let image =
              'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop';
            try {
              image = product.imagesUrl[0] || image;
            } catch (error) {
              console.log(error);
            }

            return {
              id: product.id,
              name: product.name,
              category: product.category?.name || 'Sản phẩm',
              categoryId: product.categoryId,
              slug: product.slug,
              unit: product.unit,
              price: product.salePrice
                ? `${parseInt(product.salePrice).toLocaleString('vi-VN')} VNĐ`
                : 'Liên hệ để biết giá',
              originalPrice: product.originalPrice,
              image,
              stock: product.stock,
            };
          })
        );
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

  const handleAdd = () => setQuantity((q) => q + 1);
  const handleMinus = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  useEffect(() => {
    if (contentRef.current) {
      const el = contentRef.current;
      const lineHeight = parseFloat(
        window.getComputedStyle(el).lineHeight || '24'
      );
      const maxHeight = lineHeight * 6; // tương đương line-clamp-6
      if (el.scrollHeight > maxHeight) {
        setIsOverflowing(true);
      }
    }
  }, [product?.content]);

  const handleAddToCart = () => {
    localStorageUtil.addToCart({
      id: String(product?.id ?? ''),
      name: product?.name ?? '',
      image: product?.imagesUrl[0] ?? '',
      price:
        parseFloat(product?.salePrice || product?.originalPrice || '0') / 1000,
      unit: product?.unit,
      slug: product?.slug ?? '',
      quantity: 1,
    });
    toast.success(`Đã thêm ${product?.name} vào giỏ hàng`);
  };

  if (loading) return <p className="text-center py-8">Đang tải...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
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
  console.log(relatedProducts);
  return (
    <div className="container py-4">
      <Breadcrumb items={breadcrumbItems} />
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Gallery */}
        <div>
          <div className="relative mb-4 aspect-[5/4] border border-gray-200 rounded-sm  overflow-hidden">
            {selectedImage && (
              <Image
                src={selectedImage}
                alt={product.name}
                layout="fill"
                objectFit="cover"
                className="rounded"
              />
            )}
          </div>
          <div className="flex space-x-3">
            {product.imagesUrl.length > 1 &&
              product.imagesUrl.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 border rounded-sm overflow-hidden ${
                    selectedImage === img ? 'ring-2 ring-green-500' : ''
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
          <div>
            <h1 className="text-2xl md:text-[1.7rem] text-green-cyan-500 font-semibold mb-2">
              {product.name}{' '}
              {product.unit && <span>{' (' + product.unit + ')'}</span>}
            </h1>
            <div className="w-10 md:w-12 h-1 bg-gray-200 mb-2"></div>

            <p className="text-orange-500 font-bold text-2xl relative inline-flex items-start">
              {parseInt(
                product.salePrice || product.originalPrice
              ).toLocaleString('vi-VN')}
              <span className="text-sm font-semibold ml-1 align-top relative -top-1">
                VNĐ
              </span>
            </p>

            <div className="my-3 relative border border-green-cyan-400 rounded-lg bg-green-cyan-50">
              {/* Nội dung */}
              <div
                ref={contentRef}
                className={`p-4 prose prose-base sm:prose-lg lg:prose-xl max-w-none ${
                  expanded ? 'pb-6' : 'line-clamp-6'
                }`}
                style={{ textAlign: 'justify' }}
                dangerouslySetInnerHTML={{ __html: product.content ?? '' }}
              />

              {/* Nút toggle (chỉ hiện nếu overflow) */}
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
            <div className="flex items-center text-base space-x-3 mb-5">
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

            {/*  Add to Cart */}
            <div className="flex items-center space-x-3 mb-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3 font-sans font-semibold uppercase bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
              >
                Thêm vào giỏ hàng
              </button>
              <button className="flex-1 py-3 font-sans font-semibold uppercase bg-green-cyan-500 text-white px-6 py-2 rounded hover:bg-green-cyan-600 transition">
                Mua ngay
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

      <ProductTabs description={product.content || ''} />

      <div className="border-t border-gray-200 pt-6 my-8">
        <h2 className="uppercase text-xl md:text-2xl text-neutral-gray-600 font-semibold mb-4">
          Sản phẩm liên quan
        </h2>
        {relatedProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 items-stretch">
            {relatedProducts.map((item) => (
              <div key={item.id} className="h-full">
                <ProductCard product={item} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-neutral-gray-500">
            Không có sản phẩm nào tương tự.
          </p>
        )}
      </div>
    </div>
  );
}
