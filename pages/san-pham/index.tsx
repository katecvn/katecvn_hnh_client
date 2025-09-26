import { ProductCard } from '@/components/enhanced-cards';
import { Pagination } from '@/components/pagination';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { CategoryPro, Product, ProductCardData } from '@/types/interface';
import api from '@/utils/axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  CategoriesProSidebar,
  ProductSidebar,
} from '@/components/sidebar-menu';
import { transformProducts } from '@/utils/format';
import { TitleCategory } from '@/components/enhanced-title';
import {
  LoadingProductsSkeleton,
  SectionLoader,
} from '@/components/loading-error';

type CategoryInfo = {
  name: string;
  id: string | number | null;
};

export default function ProductPage() {
  const MAX_LENGHT_LIMIT = 12;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [products, setProducts] = useState<ProductCardData[]>([]);
  const [category, setCategory] = useState<CategoryInfo | null>(null);
  const [pagination, setPagination] = useState({
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
  });

  const router = useRouter();
  const { query } = router;
  const { danh_muc } = router.query;
  const categoryId: number | null = danh_muc ? Number(danh_muc) : null;

  const [orderBy, setOrderBy] = useState(query.orderby || 'menu_order');

  useEffect(() => {
    fetchAllHomeData();
  }, [router.query]);

  const fetchAllHomeData = async (
    options = {
      page: 1,
      limit: MAX_LENGHT_LIMIT,
      categoryId: categoryId,
    }
  ) => {
    setLoading(true);
    setError(null);

    const { page, limit } = options;
    const requests = [];
    let productUrl = `/product/public/shows?page=${page}&limit=${limit}`;
    if (categoryId) {
      productUrl += `&categoryId=${categoryId}`;
    }
    requests.push(api.get(productUrl));
    requests.push(api.get(`/category/public/shows`));
    try {
      const [productRes, categoryRes] = await Promise.all(requests);

      const products = transformProducts(productRes.data?.data?.products ?? []);
      setProducts(products);
      const itemCategory = categoryRes.data.data.categories.find(
        (cat: CategoryPro) => cat.id === categoryId
      );
      if (itemCategory) {
        setCategory({
          id: itemCategory.id,
          name: itemCategory.name,
        });
      } else {
        setCategory(null);
      }
      setPagination({
        totalItems: productRes.data.data.totalItems || 0,
        totalPages: productRes.data.data.totalPages || 1,
        currentPage: productRes.data.data.currentPage || 1,
      });
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.message ||
        'Không thể tải dữ liệu trang sản phẩm';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handlePostPageChange = (options: any) => {
    const { page, limit, categoryId } = options;
    fetchAllHomeData({ page, limit, categoryId });
    const section = document.getElementById('postId');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setOrderBy(value);

    router.push({
      pathname: router.pathname,
      query: {
        ...query,
        orderby: value,
        paged: 1,
      },
    });
  };

  const lastLabel = categoryId
    ? category?.name ?? 'Đang tải…'
    : 'Tất cả sản phẩm';

  const lastHref =
    categoryId && category ? `/san-pham?danh_muc=${category.id}` : '/san-pham';

  const breadcrumbItems = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Sản phẩm', href: '/san-pham' },
    { label: lastLabel, href: lastHref },
  ];

  const sortOptions = [
    { value: 'menu_order', label: 'Sắp xếp mặc định' },
    { value: 'popularity', label: 'Theo mức độ phổ biến' },
    { value: 'rating', label: 'Theo xếp hạng trung bình' },
    { value: 'date', label: 'Theo mới nhất' },
    { value: 'price', label: 'Giá: thấp → cao' },
    { value: 'price-desc', label: 'Giá: cao → thấp' },
  ];

  return (
    <section className="container py-4">
      <Breadcrumb items={breadcrumbItems} />
      <div className=" grid grid-cols-4 gap-6">
        <aside className="col-span-1 space-y-5">
          <CategoriesProSidebar />
          <ProductSidebar />
        </aside>

        <article id="list-news" className="col-span-3">
          <div className="mb-6 flex justify-between">
            <TitleCategory category={lastLabel} />
            <form className="flex items-center space-x-2" method="get">
              <label htmlFor="orderby" className="sr-only">
                Sắp xếp sản phẩm
              </label>
              <select
                id="orderby"
                name="orderby"
                value={orderBy}
                onChange={handleChange}
                className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-green-500 focus:ring focus:ring-green-cyan-500/40"
                aria-label="Sắp xếp sản phẩm"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </form>
          </div>
          <SectionLoader
            loading={loading}
            error={error}
            onRetry={() => fetchAllHomeData()}
            loadingComponent={LoadingProductsSkeleton}
            errorTitle="tải sản phẩm"
          >
            {products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch">
                {products.map((item, index) => (
                  <div key={item.id} className="h-full">
                    <ProductCard product={item} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-neutral-gray-500">
                Không tìm thấy sản phẩm nào khớp với lựa chọn của bạn.
              </p>
            )}

            {products.length > 0 && (
              <Pagination
                keyword="bài viết"
                pagination={pagination}
                onPageChange={handlePostPageChange}
                itemsPerPage={MAX_LENGHT_LIMIT}
                selectedCategory={null}
              />
            )}
          </SectionLoader>
        </article>
      </div>
    </section>
  );
}
