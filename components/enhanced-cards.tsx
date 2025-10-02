'use client';

import { CartItem, News, ProductCardData } from '@/types/interface';
import Image from 'next/image';
import Link from 'next/link';
import { DateBadge } from './ui/date-badge';
import { localStorageUtil } from '@/utils/localStorage';
import { toast } from 'sonner';
import { Minus, Plus, PlusCircle, ShoppingCart, Star } from 'lucide-react';
import { PriceVND } from '@/utils/format';
import { useState, useRef } from 'react';
import { useCart } from '@/hooks/use-cart';

export function ProductSmallCard({ product }: { product: ProductCardData }) {
  const [isAdding, setIsAdding] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const createFlyingAnimation = (event: React.MouseEvent) => {
    const card = cardRef.current;
    const cartIcon = document.querySelector('[data-cart-icon]'); // Icon giỏ hàng

    if (!card || !cartIcon) return;

    // Lấy hình ảnh sản phẩm
    const productImage = card.querySelector('.product-image') as HTMLElement;
    if (!productImage) return;

    // Tạo clone animation
    const rect = productImage.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();

    const flyingElement = document.createElement('div');
    flyingElement.innerHTML = `
      <img 
        src="${product.image}" 
        alt="${product.name}"
        style="width: 50px; height: 40px; object-fit: cover; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.3);"
      />
    `;

    flyingElement.style.cssText = `
      position: fixed;
      top: ${rect.top}px;
      left: ${rect.left}px;
      width: 50px;
      height: 40px;
      z-index: 9999;
      pointer-events: none;
      transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    `;

    document.body.appendChild(flyingElement);

    // Trigger animation
    requestAnimationFrame(() => {
      flyingElement.style.transform = `
        translate(${cartRect.left - rect.left + 10}px, ${
        cartRect.top - rect.top + 10
      }px) 
        scale(0.2) 
        rotate(360deg)
      `;
      flyingElement.style.opacity = '0';
    });

    // Cleanup
    setTimeout(() => {
      if (flyingElement.parentNode) {
        flyingElement.parentNode.removeChild(flyingElement);
      }
    }, 800);
  };

  const handleAddToCart = async (event: React.MouseEvent) => {
    setIsAdding(true);

    // Tạo hiệu ứng bay
    createFlyingAnimation(event);

    // Add to cart
    localStorageUtil.addToCart({
      id: product.id,
      variantId: product.variantId,
      name: product.name,
      image: product.image,
      price: product.salePrice,
      unit: product.unit,
      slug: product.slug,
      quantity: 1,
    });

    // Hiển thị thông báo
    setTimeout(() => {
      toast.success(`Đã thêm ${product.name} vào giỏ hàng`);
    }, 200);

    // Reset state
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };

  return (
    <div
      ref={cardRef}
      key={product.id}
      className={`group relative flex gap-3 mb-4 font-sans block group border border-neutral-gray-100 hover:border-2 hover:border-green-cyan-400/50 rounded-lg p-2 bg-white hover:shadow-md transition-all duration-300 ${
        isAdding
          ? 'scale-[0.98] shadow-lg border-green-cyan-400 bg-green-50'
          : 'hover:scale-105'
      }`}
    >
      {/* Product Image */}
      <div className="flex flex-1 items-center justify-center">
        <div className="relative w-full aspect-[4/3] overflow-hidden rounded-md">
          <Link href={`/san-pham/${product.slug}`}>
            <Image
              src={product.image}
              alt={product.name}
              layout="fill"
              objectFit="cover"
              className={`product-image object-cover cursor-pointer transition-all duration-300 ${
                isAdding
                  ? 'scale-110 brightness-110 blur-[0.5px]'
                  : 'group-hover:scale-105'
              }`}
            />
          </Link>

          {/* Overlay effect khi đang thêm */}
          {isAdding && (
            <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
              <div className="bg-green-500/90 rounded-full p-1 animate-pulse">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="flex-[2] text-left relative">
        <Link href={`/san-pham/${product.slug}`}>
          <a className="cursor-pointer text-[0.9rem] font-medium text-green-cyan-500 line-clamp-1 hover:text-green-cyan-600 transition-colors">
            <span className="font-semibold">{product.name}</span>
            {product.unit && (
              <span className="text-xs text-neutral-gray-800">
                {' (' + product.unit + ')'}
              </span>
            )}
          </a>
        </Link>

        {/* Price */}
        <p className="m-0 mb-2">
          {product.originalPrice > 0 &&
            product.originalPrice > product.salePrice && (
              <PriceVND
                value={product.originalPrice}
                className="line-through text-[0.8rem] text-gray-400 mr-2"
                symbolClassName="text-[0.7rem] align-baseline"
              />
            )}

          <PriceVND
            value={product.salePrice}
            className="font-bold text-orange-400 text-[1.1rem]"
            symbolClassName="text-[0.9rem] align-baseline"
          />
        </p>

        {/* Add to Cart Button */}
        <button
          className={`relative overflow-hidden w-full rounded text-white text-[0.7rem] font-semibold
                    bg-gradient-to-r from-green-cyan-400 via-green-cyan-500 to-green-cyan-400
                    py-2 transition-all duration-300 transform ${
                      isAdding
                        ? 'scale-95 shadow-inner cursor-not-allowed'
                        : 'hover:scale-[1.02] active:scale-95 hover:shadow-md'
                    }`}
          onClick={handleAddToCart}
          disabled={isAdding}
        >
          <span
            className={`flex items-center justify-center gap-1 transition-all duration-300 ${
              isAdding ? 'scale-110' : ''
            }`}
          >
            {isAdding ? (
              <>
                <svg
                  className="w-4 h-4 animate-spin"
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
                  className="w-4 h-4"
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
            <>
              <div className="absolute inset-0 bg-white/20 animate-pulse" />
              <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white/40 rounded-full animate-ping transform -translate-x-1/2 -translate-y-1/2" />
            </>
          )}
        </button>

        {/* Success particles */}
        {isAdding && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-green-400 rounded-full animate-ping opacity-60"
                style={{
                  top: `${30 + i * 15}%`,
                  right: `${5 + i * 8}%`,
                  animationDelay: `${i * 0.15}s`,
                  animationDuration: '0.8s',
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function ProductCard({
  product,
  isShoppingCart = true,
}: {
  product: ProductCardData;
  isShoppingCart?: boolean;
}) {
  const [isAdding, setIsAdding] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { cart, updateQuantity, removeItem } = useCart();

  // Kiểm tra sản phẩm có còn hàng không
  const isOutOfStock = product.stock === 0;

  const createFlyingAnimation = (event: React.MouseEvent) => {
    const button = event.currentTarget as HTMLButtonElement;
    const card = cardRef.current;
    const cartIcon = document.querySelector('[data-cart-icon]');

    if (!card || !cartIcon) return;

    const productImage = card.querySelector('.product-image') as HTMLElement;
    if (!productImage) return;

    const rect = productImage.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();

    const flyingElement = document.createElement('div');
    flyingElement.innerHTML = `
      <img 
        src="${product.image}" 
        alt="${product.name}"
        style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;"
      />
    `;

    flyingElement.style.cssText = `
      position: fixed;
      top: ${rect.top}px;
      left: ${rect.left}px;
      width: 60px;
      height: 60px;
      z-index: 9999;
      pointer-events: none;
      transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    `;

    document.body.appendChild(flyingElement);

    // Trigger animation
    requestAnimationFrame(() => {
      flyingElement.style.transform = `
        translate(${cartRect.left - rect.left + 10}px, ${
        cartRect.top - rect.top + 10
      }px) 
        scale(0.3)
      `;
      flyingElement.style.opacity = '0';
    });

    // Cleanup
    setTimeout(() => {
      if (flyingElement.parentNode) {
        flyingElement.parentNode.removeChild(flyingElement);
      }
    }, 800);
  };

  const handleAddToCart = async (event: React.MouseEvent) => {
    if (isOutOfStock) return;

    setIsAdding(true);

    // Tạo hiệu ứng bay
    createFlyingAnimation(event);

    // Add to cart
    localStorageUtil.addToCart({
      id: product.id,
      variantId: product.variantId,
      name: product.name,
      image: product.image,
      price: product.salePrice,
      unit: product.unit,
      slug: product.slug,
      quantity: 1,
    });

    setTimeout(() => {
      toast.success(`Đã thêm ${product.name} vào giỏ hàng`);
    }, 200);

    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };

  const existingItem = cart?.find((i) => i.id === product.id);
  const qty = existingItem?.quantity ?? 0;

  const handleIncrease = (e: React.MouseEvent) => {
    if (isOutOfStock) return;

    createFlyingAnimation(e);
    localStorageUtil.addToCart({
      id: product.id,
      variantId: product.variantId,
      name: product.name,
      image: product.image,
      price: product.salePrice,
      unit: product.unit,
      slug: product.slug,
      quantity: 1,
    });
  };

  const handleDecrease = () => {
    if (!existingItem) return;

    const nextQty = existingItem.quantity - 1;

    if (nextQty <= 0) {
      removeItem(existingItem.id);
    } else {
      console.log(nextQty);
      updateQuantity(existingItem.id, nextQty);
    }
  };

  return (
    <div
      ref={cardRef}
      className={`group relative font-sans shadow-lg block group border border-neutral-gray-100 hover:border-2 hover:border-green-cyan-400/50 rounded-sm bg-white hover:shadow-lg transition-all duration-300 ${
        isAdding ? 'scale-[0.98] shadow-2xl' : ''
      } ${isOutOfStock ? 'opacity-90' : ''}`}
    >
      {/* Discount badge */}
      {product.originalPrice > 0 &&
        product.originalPrice > product.salePrice && (
          <div className="absolute top-3 left-3 z-20">
            <div className="bg-gradient-to-r from-red-600 via-red-500 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
              -
              {Math.floor(
                (1 -
                  Number(product.salePrice) / Number(product.originalPrice)) *
                  100
              )}
              %
            </div>
          </div>
        )}

      {/* Product Image */}
      <div className="flex items-center justify-center relative">
        <div className="relative w-full aspect-[1/1] rounded-t-sm overflow-hidden">
          <Link href={`/san-pham/${product.slug}`}>
            <Image
              src={product.image}
              alt={product.name}
              layout="fill"
              objectFit="cover"
              className={`product-image rounded-t-sm object-cover cursor-pointer transition-all duration-300 ${
                isAdding ? 'scale-105 brightness-110' : 'rounded-t-sm'
              }`}
            />
          </Link>

          {isOutOfStock && (
            <div className="absolute font-sans rounded-t inset-0 bg-black/60 flex items-center justify-center font-semibold text-white/90 text-sm md:text-base">
              HẾT HÀNG
            </div>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <Link href={`/san-pham/${product.slug}`}>
          <a
            className={`text-center cursor-pointer text-[0.9rem] font-medium ${
              isOutOfStock ? 'text-gray-600' : 'text-green-cyan-500'
            } line-clamp-1`}
          >
            <span className="font-semibold">{product.name}</span>
            {product.unit && (
              <span className="text-xs text-neutral-gray-800">
                {' (' + product.unit + ')'}
              </span>
            )}
          </a>
        </Link>

        {/* Price */}
        {!isOutOfStock && (
          <p
            className={`${
              product.originalPrice <= product.salePrice && 'text-center'
            } m-0`}
          >
            {product.originalPrice > 0 &&
              product.originalPrice > product.salePrice && (
                <PriceVND
                  value={product.originalPrice}
                  className="line-through text-[0.8rem] text-gray-400 mr-2"
                  symbolClassName="text-[0.7rem] align-baseline"
                />
              )}

            <PriceVND
              value={product.salePrice}
              className="font-bold text-orange-400 text-[1.2rem]"
              symbolClassName="text-base align-baseline"
            />
          </p>
        )}

        {isShoppingCart &&
          (isOutOfStock ? (
            <div className="mt-2 relative">
              <p className="text-center text-[0.65rem] text-gray-500 mt-2 mb-2 font-medium">
                Sản phẩm sẽ sớm có hàng trở lại
              </p>
              <button
                className="w-full gap-2 rounded text-white/90 text-xs font-bold py-2 
                  bg-gradient-to-r from-black/60 via-black/70 to-black/60 
                  cursor-not-allowed relative overflow-hidden
                  border-2 border-gray-300"
                disabled
              >
                <span className="flex items-center justify-center gap-2 relative z-10">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  TẠM HẾT HÀNG
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
              </button>
            </div>
          ) : !existingItem ? (
            <button
              className={`relative overflow-hidden flex items-center justify-center 
              bg-gradient-to-r from-green-cyan-400 via-green-cyan-500 to-green-cyan-400
               mt-2 w-full gap-1 text-white text-xs font-semibold py-2 
               rounded-xs transition-all duration-300 transform ${
                 isAdding
                   ? 'scale-95 shadow-lg'
                   : 'group-hover:scale-105 hover:scale-[1.02] active:scale-95'
               }`}
              onClick={handleAddToCart}
              disabled={isAdding}
            >
              <span
                className={`flex items-center justify-center gap-1 transition-all duration-300 ${
                  isAdding ? 'scale-110' : ''
                }`}
              >
                {isAdding ? (
                  <>
                    <svg
                      className="w-4 h-4 animate-spin"
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
                      className="w-4 h-4"
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
          ) : (
            <div className="mt-2 text-[0.8rem] flex items-center justify-between rounded-full bg-gray-100">
              <button
                onClick={handleDecrease}
                className="w-8 h-8 border border-gray-400 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-200 text-gray-800"
                aria-label="Giảm số lượng"
              >
                <Minus className="w-4 h-4" />
              </button>

              <div className="px-3 py-1 rounded text-sm font-semibold text-gray-800">
                {qty}
              </div>

              <button
                onClick={handleIncrease}
                className="w-8 h-8 border border-green-cyan-500 flex items-center justify-center rounded-full bg-green-cyan-400 hover:bg-green-600 text-white"
                aria-label="Tăng số lượng"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          ))}
      </div>

      {/* Success indicator */}
      {isAdding && (
        <div className="absolute inset-0 flex items-center justify-center bg-green-500/10 rounded-sm">
          <div className="bg-green-500 text-white p-2 rounded-full animate-bounce">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}

type Topic = {
  label: string;
  href: string;
};

export function NewsCard({ news, topic }: { news: News; topic: Topic }) {
  return (
    <div className="h-full flex flex-col relative">
      <Link href={`/${topic.href}/${news.slug}`} legacyBehavior>
        <a className="block group bg-white shadow-lg hover:shadow-xl transition rounded overflow-hidden">
          {/* Image */}
          <div className="relative w-full aspect-[5/3] cursor-pointer">
            <Image
              src={news.thumbnail}
              alt={news.title}
              layout="fill"
              objectFit="cover"
              className="transition-transform cursor-pointer group-hover:scale-105"
              priority
            />
          </div>

          {/* Content */}
          <div className="flex-1 p-4 flex flex-col">
            <h5 className="font-semibold text-sm sm:text-base mb-2 line-clamp-2 group-hover:text-green-cyan-500">
              {news.title}
            </h5>
            <div className="w-10 h-[2px] bg-gray-200 mb-2"></div>
            <p className="text-[0.8rem] sm:text-sm text-gray-600 line-clamp-2">
              {news.short_description}
            </p>
          </div>
        </a>
      </Link>

      <DateBadge date={news.created_at} />
    </div>
  );
}
