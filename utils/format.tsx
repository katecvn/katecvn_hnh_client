import { Product, ProductCardData } from '@/types/interface';
import { toUSVString } from 'node:util';
import React from 'react';

export function formatDateVN(iso?: string, tz = 'Asia/Ho_Chi_Minh') {
  if (!iso) return '';
  const d = new Date(iso);

  const s = d.toLocaleDateString('vi-VN', {
    timeZone: tz,
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return s.replace('tháng', 'Tháng');
}

type PriceVNDProps = {
  value: number | string | null | undefined;
  fractionDigits?: number;
  className?: string;
  symbolClassName?: string;
  symbol?: string;
};

export const PriceVND = ({
  value,
  fractionDigits = 0,
  className = '',
  symbolClassName = 'text-[0.9em] align-baseline ml-0.5',
  symbol = '₫',
}: PriceVNDProps) => {
  if (value === null || value === undefined || value === '') return null;
  const n = Number(value);
  if (Number.isNaN(n)) return null;

  const amount = new Intl.NumberFormat('vi-VN', {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(n);

  return (
    <span className={className}>
      {amount}
      <span className={symbolClassName}>{symbol}</span>
    </span>
  );
};

const FALLBACK_IMAGE = '/placeholder.jpg';

const firstImage = (imagesUrl?: unknown): string => {
  if (
    Array.isArray(imagesUrl) &&
    imagesUrl.length > 0 &&
    typeof imagesUrl[0] === 'string'
  ) {
    return imagesUrl[0] as string;
  }
  return FALLBACK_IMAGE;
};

const toNumber = (v: unknown): number => {
  const n = Number(v);
  return Number.isFinite(n) ? Math.round(n) : 0;
};

const transformApiProduct = (product: Product): ProductCardData => ({
  id: String(product.id),
  variantId: String(product.variants[0].id),
  name: product.name,
  category: product.category?.name || 'Sản phẩm',
  categoryId: product.categoryId ?? null,
  slug: product.slug,
  unit: product.unit ?? null,
  salePrice: toNumber(product.salePrice),
  originalPrice: toNumber(product.originalPrice),
  image: firstImage(product.imagesUrl),
  stock:
    typeof product.stock === 'number' ? product.stock : toNumber(product.stock),
});

export const transformProducts = (
  products: Product[] = []
): ProductCardData[] => products.map(transformApiProduct);
