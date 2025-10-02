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
import { useResponsiveCols } from '@/hooks/use-responsive-cols';
import { ArrowDownWideNarrow, ChevronDown } from 'lucide-react';

type CategoryInfo = {
  name: string;
  id: string | number | null;
};

const SortDropdown = ({ orderBy, onChange, sortOptions }: any) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-2 py-1 md:px-3 md:py-2 text-sm shadow-sm hover:border-green-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition"
      >
        <span className="hidden md:inline">
          {sortOptions.find((o: any) => o.value === orderBy)?.label ||
            'Sắp xếp sản phẩm'}
        </span>

        <span className="md:hidden">
          <ArrowDownWideNarrow className="w-5 h-5 text-gray-500" />
        </span>
        <span className="hidden md:inline">
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </span>
      </button>

      {open && (
        <ul
          className="absolute right-0 mt-2 w-48 md:w-56 rounded-md border border-gray-200 bg-white shadow-lg z-20 
                    before:content-[''] before:absolute before:top-[-6px] before:right-4 lg:before:left-2
                    before:w-3 before:h-3 before:border-t before:border-l before:bg-white before:rotate-45 z-50"
        >
          {sortOptions.map((opt: any) => (
            <li
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`px-4 py-2 text-sm cursor-pointer hover:bg-lime-50 ${
                orderBy === opt.value ? 'text-green-600 font-semibold' : ''
              }`}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default function ProductPage() {
  const cols = useResponsiveCols({ lgCol: 4, mdCol: 4, smCol: 3, xsCol: 2 });

  const MAX_LENGHT_LIMIT = cols * 4;
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
  }, [router.query, MAX_LENGHT_LIMIT]);

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

      const sortedProducts = products.sort((a, b) => {
        if ((a.stock ?? 0) > 0 && (b.stock ?? 0) <= 0) return -1; // a trước b
        if ((a.stock ?? 0) <= 0 && (b.stock ?? 0) > 0) return 1; // b trước a
        return 0; // giữ nguyên thứ tự nếu cùng trạng thái
      });

      setProducts(sortedProducts);
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
      <div className=" grid grid-cols-1 lg:grid-cols-4 gap-4 xl:gap-6">
        <aside className="hidden lg:block col-span-1 space-y-5">
          <CategoriesProSidebar />
          <ProductSidebar />
        </aside>

        <article id="list-news" className="col-span-1 lg:col-span-3">
          <div className="mb-6 flex justify-between">
            <TitleCategory category={lastLabel} />

            <SortDropdown
              orderBy={orderBy}
              onChange={(value: string) =>
                handleChange({ target: { value } } as any)
              }
              sortOptions={sortOptions}
            />
          </div>
          <SectionLoader
            loading={loading}
            error={error}
            number={4}
            onRetry={() => fetchAllHomeData()}
            loadingComponent={LoadingProductsSkeleton}
            errorTitle="tải sản phẩm"
          >
            {products.length > 0 ? (
              <div
                className="grid gap-4 xl:gap-6 items-stretch"
                style={{
                  gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                }}
              >
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
                keyword="sản phẩm"
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
