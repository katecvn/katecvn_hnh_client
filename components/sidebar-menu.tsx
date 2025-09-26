'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Menu } from 'lucide-react';
import {
  CategoryPro,
  ListNewsProps,
  NavItem,
  News,
  Product,
  ProductCardData,
} from '@/types/interface';
import Image from 'next/image';
import api from '@/utils/axios';
import { PriceVND, transformProducts } from '@/utils/format';

export const CategoriesProSidebar = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState<number | null>(null);
  const [categories, setCategories] = useState<CategoryPro[]>([]);

  useEffect(() => {
    fetchAllHomeData();
  }, []);

  const fetchAllHomeData = async () => {
    setLoading(true);
    setError(null);

    const { data } = await api.get(`/category/public/shows-tree`);
    try {
      setCategories(data.data || []);
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Không thể tải dữ liệu trang tin tức';
      setError(message);
    } finally {
      setLoading(false);
    }
  };
  const toggle = (id: number) => {
    setOpen(open === id ? null : id);
  };

  return (
    <div className="w-full px-2 max-w-xs  font-sans">
      <div className="bg-green-600 gap-2 border rounded-sm text-white px-4 py-2 font-semibold uppercase flex items-center gap-2">
        <Menu />
        <span>Danh mục sản phẩm</span>
      </div>

      <ul className="divide-y bg-white border border-neutral-gray-200 rounded">
        {categories.map((cat) => (
          <li key={cat.id} className="relative">
            <div className="flex items-center justify-between text-gray-800 text-base px-3 py-2 hover:bg-lime-200/30 hover:text-green-700">
              {cat.subCategories && cat.subCategories.length > 0 ? (
                <button
                  onClick={() => toggle(cat.id)}
                  className="flex-1  text-left  cursor-pointer"
                >
                  {cat.name}
                </button>
              ) : (
                <Link href={`/san-pham?danh_muc=${cat.id}`}>
                  <a className="flex-1 ">{cat.name}</a>
                </Link>
              )}

              {cat.subCategories && cat.subCategories.length > 0 && (
                <div className="flex items-center gap-1">
                  <div
                    className="inline-flex h-5 w-6 items-center justify-center rounded-full 
                                  bg-gradient-to-r from-green-300/50 to-lime-300/50 text-green-700 text-xs font-semibold "
                  >
                    {cat.subCategories.length}
                  </div>
                  <button
                    onClick={() => toggle(cat.id)}
                    className="text-gray-600"
                  >
                    <ChevronDown
                      className={`h-4 w-4 transform transition-transform ${
                        open === cat.id ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </div>
              )}
            </div>

            {cat.subCategories &&
              cat.subCategories.length > 0 &&
              open === cat.id && (
                <ul className="px-3 bg-lime-50/50">
                  {cat.subCategories.map((sub) => (
                    <li
                      key={sub.id}
                      className="py-2 px-3 hover:rounded-sm hover:bg-lime-200/30 text-neutral-gray-600 hover:text-green-700"
                    >
                      <Link href={`/san-pham?danh_muc=${sub.id}`}>
                        <a className="text-[0.9rem] ">{sub.name}</a>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export const NewsSidebar = () => {
  const MAX_LENGHT_LIMIT = 5;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newPosts, setNewPosts] = useState<News[]>([]);

  useEffect(() => {
    fetchAllHomeData();
  }, []);

  const fetchAllHomeData = async (
    options = { page: 1, limit: MAX_LENGHT_LIMIT, categorySlug: null }
  ) => {
    setLoading(true);
    setError(null);

    const { page, limit } = options;

    const { data } = await api.get(
      `/post/public/shows?page=${page}&limit=${limit}`
    ); // index 0

    try {
      setNewPosts(data.data?.posts || []);
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Không thể tải dữ liệu trang tin tức';
      setError(message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full px-2 max-w-xs  font-sans">
      <div className="bg-green-600 gap-2 border rounded-sm text-white px-4 py-2 font-semibold uppercase flex items-center gap-2">
        <Menu />
        <span>Tin tức mới</span>
      </div>

      <ul className="divide-y bg-white border border-neutral-gray-200 rounded font-sans">
        {newPosts.map((item) => (
          <li key={item.id} className="p-3 group">
            <div className="flex gap-3">
              <div className="flex flex-1 items-center justify-center">
                <div className="relative w-full aspect-[3/2]">
                  <Link href={item.slug}>
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      layout="fill"
                      objectFit="cover"
                      className="object-cover rounded group-hover:scale-105 transition-transform"
                    />
                  </Link>
                </div>
              </div>

              <div className="flex-[2]  text-left">
                <Link href={`/tin-tuc/${item.slug}`}>
                  <span className="text-[0.9rem] font-medium text-neutral-gray-800 group-hover:text-green-cyan-500 line-clamp-3">
                    {item.title}
                  </span>
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const ProductSidebar = () => {
  const MAX_LENGHT_LIMIT = 5;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState<ProductCardData[]>([]);

  useEffect(() => {
    fetchAllHomeData();
  }, []);

  const fetchAllHomeData = async (
    options = { page: 1, limit: MAX_LENGHT_LIMIT, categorySlug: null }
  ) => {
    setLoading(true);
    setError(null);

    const { page, limit } = options;

    const { data } = await api.get(
      `/product/public/shows?page=${page}&limit=${limit}`
    ); // index 0

    try {
      const products = transformProducts(data?.data?.products ?? []);
      setProducts(products);
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Không thể tải dữ liệu trang tin tức';
      setError(message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full px-2 max-w-xs  font-sans">
      <div className="bg-green-600 gap-2 border rounded-sm text-white px-4 py-2 font-semibold uppercase flex items-center gap-2">
        <Menu />
        <span>Sản phẩm mới</span>
      </div>

      <ul className="divide-y bg-white border border-neutral-gray-200 rounded font-sans">
        {products.map((item) => (
          <li key={item.id} className="p-3 group">
            <div className="flex gap-3">
              <div className="flex flex-1 items-center justify-center">
                <div className="relative w-full aspect-[3/2]">
                  <Link href={`/san-pham/${item.slug}`}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      layout="fill"
                      objectFit="cover"
                      className="object-cover rounded group-hover:scale-105 transition-transform"
                    />
                  </Link>
                </div>
              </div>

              <div className="flex-[2]  text-left">
                <Link href={`/san-pham/${item.slug}`}>
                  <a className="text-[0.9rem] font-medium text-neutral-gray-800 group-hover:text-green-cyan-500 line-clamp-3">
                    <span>{item.name}</span>
                    {item.unit && <span>{' (' + item.unit + ')'}</span>}
                  </a>
                </Link>
                {/* Giá */}
                <p className="m-0 text-center">
                  {item.originalPrice > 0 &&
                    item.originalPrice > item.salePrice && (
                      <PriceVND
                        value={item.originalPrice}
                        className="line-through text-[0.8rem] text-gray-400 mr-1"
                        symbolClassName="text-[0.7rem] align-baseline"
                      />
                    )}

                  <PriceVND
                    value={item.salePrice}
                    className="font-bold text-orange-400 text-[1.1rem]"
                    symbolClassName="text-[0.9rem] align-baseline"
                  />
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
