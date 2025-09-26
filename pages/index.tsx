'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import api from '@/utils/axios';

import type {
  GeneralContentItem,
  SectionItem as BaseSectionItem,
  News,
  NavItem,
  Product,
  CategoryPro,
  ProductCardData,
} from '../types/interface';

import OrderLookupForm from '@/components/order-lookup-form';
import {
  BannerSlider,
  CertificateSlider,
  HelpShoppingSlider,
  NewsSlider,
  PartnerSlider,
  RecentNewsSlider,
} from '@/components/keen-sliders';
import { CategoriesProSidebar } from '@/components/sidebar-menu';
import { ProductSmallCard } from '@/components/enhanced-cards';
import { ProductByCategoty } from '@/components/enhanced-support';
import { transformProducts } from '@/utils/format';
import {
  LoadingProductsSkeleton,
  SectionLoader,
} from '@/components/loading-error';

type ContentItem = GeneralContentItem;
type SectionItem = BaseSectionItem<ContentItem>;

const policies = [
  { id: 1, title: 'ĐỔI TRẢ', desc: 'Trong vòng 3 ngày' },
  { id: 2, title: 'MIỄN PHÍ GIAO HÀNG', desc: 'Hóa đơn trên 500k' },
  { id: 3, title: 'KHÁCH HÀNG VIP', desc: 'Giảm 5% tổng sản phẩm' },
];

const poliShip = [
  {
    id: 1,
    title: 'Chính sách vận chuyển',
    image: './chinh-sach-van-chuyen.jpg',
  },
  {
    id: 2,
    title: 'Chính sách thanh toán',
    image: './chinh-sach-thanh-toan.jpg',
  },
];

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState<ProductCardData[]>([]);
  const [banners, setBanners] = useState<SectionItem[]>([]);
  const [partners, setPartners] = useState<SectionItem[]>([]);
  const [news, setNews] = useState<News[]>([]);
  const [instructions, setInstructions] = useState<News[]>([]);
  const [categorybyProduct, setCategorybyProduct] = useState<CategoryPro[]>([]);

  useEffect(() => {
    fetchAllHomeData();
  }, []);

  const fetchAllHomeData = async (
    options = { page: 1, limit: 6, categoryId: null }
  ) => {
    setLoading(true);
    setError(null);

    const { page } = options;

    const requests = [];

    requests.push(api.get(`/product/public/shows`)); // index 0

    // Prepare other endpoints
    requests.push(api.get('/page-section/public/shows?sectionType=banner'));
    requests.push(api.get('/page-section/public/shows?sectionType=partner')); // index 1
    requests.push(
      api.get(`/post/public/shows?topicSlug=tin-tuc&page=${page}&limit=24`)
    ); // index 2
    requests.push(
      api.get(`/post/public/shows?topicSlug=huong-dan&page=${page}&limit=24`)
    ); // index 3
    requests.push(api.get(`/category/public/shows-tree`)); // index 3

    try {
      const [
        productRes,
        bannerRes,
        partnerRes,
        newsRes,
        instructionRes,
        categoryRes,
      ] = await Promise.all(requests);

      const products = transformProducts(productRes.data?.data?.products ?? []);
      setProducts(products);

      const categories = categoryRes.data.data.filter(
        (cat: CategoryPro) => cat.subCategories.length > 0
      );
      setCategorybyProduct(categories);
      //Partners, News
      setBanners(bannerRes.data.data || []);
      setPartners(partnerRes.data.data || []);
      setNews(newsRes.data.data?.posts || []);
      setInstructions(instructionRes.data.data?.posts || []);
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

  // Hàm lấy tất cả id danh mục (bao gồm cha và con)
  function getAllCategoryIds(category?: CategoryPro): number[] {
    if (!category) return [];
    const ids: number[] = [category.id];
    if (category.subCategories && category.subCategories.length > 0) {
      for (const sub of category.subCategories) {
        ids.push(...getAllCategoryIds(sub as CategoryPro));
      }
    }
    return ids;
  }

  // Hàm lọc sản phẩm theo danh mục
  function filterProductsByCategory(
    category: CategoryPro,
    products: ProductCardData[]
  ): ProductCardData[] {
    const categoryIds = getAllCategoryIds(category);

    return products.filter((p) => categoryIds.includes(p.categoryId));
  }

  return (
    <div className="container">
      <div className="p-4 grid grid-cols-4 gap-6">
        <aside className="col-span-1">
          <CategoriesProSidebar />
          <RecentNewsSlider posts={news} />
          <CertificateSlider />
          <div className="space-y-4 mt-5 mx-2">
            {products.length > 0 &&
              products
                .slice(0, 6)
                .map((product) => <ProductSmallCard product={product} />)}
          </div>
        </aside>
        <article className="col-span-3 ">
          <BannerSlider banners={banners} />

          <div className="bg-green-cyan-500 mt-8 mb-4 py-1">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
              {policies.map((item) => (
                <div key={item.id} className="text-center text-white px-4 py-2">
                  <h3 className="text-lg font-bold mt-1 mb-2">{item.title}</h3>
                  <p className="text-base mb-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <SectionLoader
            loading={loading}
            error={error}
            onRetry={() => fetchAllHomeData()}
            loadingComponent={LoadingProductsSkeleton}
            errorTitle="tải sản phẩm"
          >
            {categorybyProduct
              .slice(0, categorybyProduct.length - 1)
              .map((cat) => (
                <ProductByCategoty
                  id={cat.id}
                  category={cat.name}
                  products={filterProductsByCategory(cat, products) || []}
                />
              ))}
          </SectionLoader>
          <div className="w-full mb-6">
            <div className="relative w-full aspect-[7/1]">
              <Image
                src="/Thuc-pham-sach-HNH-1400x197.jpg"
                alt="Thực phẩm sạch HNH"
                layout="fill"
                objectFit="cover"
                className="rounded"
                priority
              />
            </div>
          </div>
          <SectionLoader
            loading={loading}
            error={error}
            onRetry={() => fetchAllHomeData()}
            loadingComponent={LoadingProductsSkeleton}
            errorTitle="Không thể tải sản phẩm"
          >
            <ProductByCategoty
              id={categorybyProduct[categorybyProduct.length - 1]?.id}
              category={categorybyProduct[categorybyProduct.length - 1]?.name}
              products={filterProductsByCategory(
                categorybyProduct[categorybyProduct.length - 1],
                products
              )}
            />
          </SectionLoader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-4">
            {poliShip.map((item) => (
              <div key={item.id} className="relative w-full aspect-[7/2]">
                <Image
                  src={item.image}
                  alt={item.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded"
                  priority
                />
              </div>
            ))}
          </div>
        </article>
      </div>

      <NewsSlider posts={news} />
      <OrderLookupForm />
      <HelpShoppingSlider posts={instructions} />
      <PartnerSlider partners={partners} />
    </div>
  );
}
