'use client';

import { News, ProductCardData } from '@/types/interface';
import Image from 'next/image';
import Link from 'next/link';
import { DateBadge } from './ui/date-badge';
import { localStorageUtil } from '@/utils/localStorage';
import { toast } from 'sonner';

export function ProductSmallCard({ product }: { product: ProductCardData }) {
  const handleAddToCart = () => {
    localStorageUtil.addToCart({
      id: product.id,
      name: product.name,
      image: product.image,
      price: parseFloat(product.price),
      unit: product.unit,
      slug: product.slug,
      quantity: 1,
    });
    toast.success(`Đã thêm ${product.name} vào giỏ hàng`);
  };
  return (
    <div
      key={product.id}
      className="flex gap-3 font-sans block group hover:scale-105 border border-neutral-gray-100 rounded-lg p-2 bg-white hover:shadow-md transition"
    >
      <div className="flex flex-1 items-center justify-center">
        <div className="relative w-full aspect-[4/3]">
          <Link href={`/san-pham/${product.slug}`}>
            <Image
              src={product.image}
              alt={product.name}
              layout="fill"
              objectFit="cover"
              className="object-cover group-hover:scale-105 transition-transform"
            />
          </Link>
        </div>
      </div>

      <div className="flex-[2]  text-left">
        <Link href={`/san-pham/${product.slug}`}>
          <a className="text-[0.9rem] font-medium text-green-cyan-400 group-hover:text-green-cyan-500 line-clamp-1">
            <span>{product.name}</span>
            {product.unit && <span>{' (' + product.unit + ')'}</span>}
          </a>
        </Link>

        {/* Giá */}
        <p className="text-orange-400 font-bold text-lg m-0">{product.price}</p>

        {/* Nút thêm giỏ hàng */}
        <button
          className="mt-2 w-full bg-green-cyan-500 hover:bg-green-cyan-400 text-white text-[0.7rem] font-semibold py-2 rounded-xs transition"
          onClick={handleAddToCart}
        >
          THÊM VÀO GIỎ HÀNG
        </button>
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
  const handleAddToCart = () => {
    localStorageUtil.addToCart({
      id: product.id,
      name: product.name,
      image: product.image,
      price: parseFloat(product.price),
      unit: product.unit,
      slug: product.slug,
      quantity: 1,
    });
    toast.success(`Đã thêm ${product.name} vào giỏ hàng`);
  };

  return (
    <div
      key={product.id}
      className="font-sans shadow-md block group border border-neutral-gray-100 rounded bg-white hover:shadow-lg transition"
    >
      <div className="flex items-center justify-center">
        <div className="relative w-full aspect-[1/1] overflow-hidden">
          <Link href={`/san-pham/${product.slug}`}>
            <Image
              src={product.image}
              alt={product.name}
              layout="fill"
              objectFit="cover"
              className="object-cover rounded-t transition-transform"
            />
          </Link>
        </div>
      </div>

      <div className="p-3 pb-4 text-center">
        <Link href={`/san-pham/${product.slug}`}>
          <a className="cursor-pointer text-[0.9rem] font-medium text-green-cyan-400 group-hover:text-green-cyan-500 line-clamp-1">
            <span>{product.name}</span>
            {product.unit && <span>{' (' + product.unit + ')'}</span>}
          </a>
        </Link>

        <p className="text-orange-400 font-bold text-lg m-0">{product.price}</p>

        {isShoppingCart && (
          <button
            className="mt-2 w-full bg-green-cyan-500 hover:bg-green-cyan-400 text-white text-[0.7rem] font-semibold py-2 rounded-xs transition"
            onClick={handleAddToCart}
          >
            THÊM VÀO GIỎ HÀNG
          </button>
        )}
      </div>
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
        <a className="block group bg-white shadow hover:shadow-lg transition rounded overflow-hidden">
          {/* Image */}
          <div className="relative w-full aspect-[5/3]">
            <Image
              src={news.thumbnail}
              alt={news.title}
              layout="fill"
              objectFit="cover"
              className="transition-transform group-hover:scale-105"
              priority
            />
          </div>

          {/* Content */}
          <div className="flex-1 p-4 flex flex-col">
            <h5 className="font-semibold text-base mb-2 line-clamp-2 group-hover:text-green-cyan-500">
              {news.title}
            </h5>
            <div className="w-10 h-[2px] bg-gray-200 mb-2"></div>
            <p className="text-sm text-gray-600 line-clamp-2">
              {news.short_description}
            </p>
          </div>
        </a>
      </Link>

      <DateBadge date={news.created_at} />
    </div>
  );
}
