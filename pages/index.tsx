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
  ProductsSlider,
  RecentNewsSlider,
} from '@/components/keen-sliders';
import { CategoriesProSidebar } from '@/components/sidebar-menu';
import { ProductSmallCard } from '@/components/enhanced-cards';
import { ProductByCategoty } from '@/components/enhanced-support';
import { transformProducts } from '@/utils/format';
import {
  LoadingBannersSkeleton,
  LoadingCertificateSliderSkeleton,
  LoadingHelpsSkeleton,
  LoadingNewsSkeleton,
  LoadingNewsSliderSkeleton,
  LoadingPartnersSkeleton,
  LoadingProductSmallCardSkeleton,
  LoadingProductsSkeleton,
  SectionLoader,
} from '@/components/loading-error';
import { TitleCategory, TitleHome } from '@/components/enhanced-title';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

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

      const products = transformProducts(
        productRes.data?.data?.products ?? []
      ).filter((p) => (p.stock ?? 0) > 0);
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
    <div className="container grap-8">
      <div className="px-0 pt-4 lg:px-4 grid grid-cols-1 lg:grid-cols-4 gap-6">
        <aside className="hidden lg:block lg:col-span-1">
          <CategoriesProSidebar />

          <div className="shadow-sliders rounded border border-gray-100 bg-white p-2 mt-5 mb-0">
            <h2 className="font-sans text-lg text-green-cyan-500 font-semibold mb-4">
              TIN TỨC GẦN ĐÂY
            </h2>
            <SectionLoader
              loading={loading}
              error={error}
              onRetry={() => fetchAllHomeData()}
              loadingComponent={LoadingNewsSliderSkeleton}
              errorTitle="tải tin tức"
            >
              <RecentNewsSlider posts={news} />
            </SectionLoader>
          </div>
          <div className="shadow-sliders rounded border border-gray-100 bg-white p-2 mt-5 mb-0">
            <h2 className="font-sans text-lg text-green-cyan-500 font-semibold mb-4">
              GIẤY CHỨNG NHẬN
            </h2>
            <SectionLoader
              loading={loading}
              error={error}
              onRetry={() => fetchAllHomeData()}
              loadingComponent={LoadingCertificateSliderSkeleton}
              errorTitle="tải tin tức"
            >
              {' '}
              <CertificateSlider />
            </SectionLoader>
          </div>

          <div className="mt-5 mx-2">
            <SectionLoader
              loading={loading}
              error={error}
              number={6}
              onRetry={() => fetchAllHomeData()}
              loadingComponent={LoadingProductSmallCardSkeleton}
              errorTitle="tải sản phẩm"
            >
              {products.length > 0 &&
                products
                  .slice(0, 6)
                  .map((product) => <ProductSmallCard product={product} />)}
            </SectionLoader>
          </div>
        </aside>
        <article className="col-span-1 lg:col-span-3 space-y-6 lg:space-y-8">
          <SectionLoader
            loading={loading}
            error={error}
            onRetry={() => fetchAllHomeData()}
            loadingComponent={LoadingBannersSkeleton}
            errorTitle="tải banners"
          >
            <BannerSlider banners={banners} />
          </SectionLoader>

          <div className="bg-green-cyan-500 py-2 sm:py-3">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-4 max-w-6xl mx-auto">
              {policies.map((item) => (
                <div
                  key={item.id}
                  className="text-center text-white px-2 sm:px-4 py-2 rounded-lg"
                >
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold sm:font-bold mt-1 mb-1 sm:mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <SectionLoader
            loading={loading}
            error={error}
            number={2}
            onRetry={() => fetchAllHomeData()}
            loadingComponent={LoadingProductsSkeleton}
            errorTitle="tải sản phẩm"
          >
            {categorybyProduct
              .slice(0, categorybyProduct.length - 1)
              .map((cat) => (
                <section className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <TitleCategory category={cat.name} />

                    <Link href={`/san-pham?danh_muc=${cat.id}`}>
                      <a className="hidden min-[484px]:flex items-center group text-gray-500 hover:underline text-sm font-medium">
                        <span className="mr-1 group-hover:underline">
                          Xem thêm
                        </span>{' '}
                        <strong className="text-gray-600">{cat.name}</strong>
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </Link>
                  </div>

                  <ProductsSlider
                    slide={4}
                    products={filterProductsByCategory(cat, products) || []}
                  />

                  <div className="mt-4 block min-[484px]:hidden flex justify-center items-center">
                    <Link href={`/san-pham?danh_muc=${cat.id}`}>
                      <a className="flex items-center group text-gray-500 hover:underline text-sm font-medium">
                        <span className="mr-1 group-hover:underline">
                          Xem thêm
                        </span>{' '}
                        <strong className="text-gray-600">{cat.name}</strong>
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </Link>
                  </div>
                </section>
              ))}
          </SectionLoader>

          <div className="w-full my-6">
            <div className="relative w-full aspect-[9/2] sm:aspect-[7/1]">
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
            number={1}
            onRetry={() => fetchAllHomeData()}
            loadingComponent={LoadingProductsSkeleton}
            errorTitle="Không thể tải sản phẩm"
          >
            <section className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <TitleCategory
                  category={
                    categorybyProduct[categorybyProduct.length - 1]?.name
                  }
                />

                <Link
                  href={`/san-pham?danh_muc=${
                    categorybyProduct[categorybyProduct.length - 1]?.id
                  }`}
                >
                  <a className=" hidden min-[484px]:flex items-center group text-gray-500 hover:underline text-sm font-medium">
                    <span className="mr-1 group-hover:underline">Xem thêm</span>{' '}
                    <strong className="text-gray-600">
                      {categorybyProduct[categorybyProduct.length - 1]?.name}
                    </strong>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </Link>
              </div>

              <ProductsSlider
                slide={4}
                products={filterProductsByCategory(
                  categorybyProduct[categorybyProduct.length - 1],
                  products
                )}
              />
              <div className="mt-4 block min-[484px]:hidden flex justify-center items-center">
                <Link
                  href={`/san-pham?danh_muc=${
                    categorybyProduct[categorybyProduct.length - 1]?.id
                  }`}
                >
                  <a className=" flex items-center group text-gray-500 hover:underline text-sm font-medium">
                    <span className="mr-1 group-hover:underline">Xem thêm</span>{' '}
                    <strong className="text-gray-600">
                      {categorybyProduct[categorybyProduct.length - 1]?.name}
                    </strong>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </Link>
              </div>
            </section>
          </SectionLoader>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mt-4">
            {poliShip.map((item) => (
              <div
                key={item.id}
                className="relative w-full aspect-[9/2] sm:aspect-[7/2]"
              >
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

      <div className="mx-auto mt-8 pt-3 mb-5">
        <TitleHome children="TIN CẬP NHẬT" />
        <SectionLoader
          loading={loading}
          error={error}
          onRetry={() => fetchAllHomeData()}
          loadingComponent={LoadingNewsSkeleton}
          errorTitle="tải tin tức"
        >
          <NewsSlider posts={news} />
        </SectionLoader>
      </div>

      <OrderLookupForm />

      <div className="mx-auto mt-8 mb-5">
        <TitleHome children="HƯỚNG DẪN MUA HÀNG" />
        <SectionLoader
          loading={loading}
          error={error}
          onRetry={() => fetchAllHomeData()}
          loadingComponent={LoadingHelpsSkeleton}
          errorTitle="tải hướng dẫn"
        >
          <HelpShoppingSlider posts={instructions} />
        </SectionLoader>
      </div>

      <div className="mx-auto mt-2 mb-5">
        <TitleHome children="ĐỐI TÁC CỦA CHÚNG TÔI" />
        <SectionLoader
          loading={loading}
          error={error}
          onRetry={() => fetchAllHomeData()}
          loadingComponent={LoadingPartnersSkeleton}
          errorTitle="tải đối tác"
        >
          <PartnerSlider partners={partners} />
        </SectionLoader>
      </div>
    </div>
  );
}
