import { NewsCard } from '@/components/enhanced-cards';
import {
  LoadingListNewsSkeleton,
  SectionLoader,
} from '@/components/loading-error';
import { Pagination } from '@/components/pagination';
import { CategoriesProSidebar, NewsSidebar } from '@/components/sidebar-menu';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { useResponsiveCols } from '@/hooks/use-responsive-cols';
import { News } from '@/types/interface';
import api from '@/utils/axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function NewsPage() {
  const cols = useResponsiveCols({ lgCol: 3, mdCol: 3, smCol: 2, xsCol: 2 });

  const MAX_LENGHT_LIMIT = cols * 4;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [posts, setPosts] = useState<News[]>([]);

  const [pagination, setPagination] = useState({
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
  });

  useEffect(() => {
    getPostsData();
  }, [MAX_LENGHT_LIMIT]);

  const getPostsData = async (
    options = { page: 1, limit: MAX_LENGHT_LIMIT, categorySlug: null }
  ) => {
    setLoading(true);
    setError(null);

    const { page, limit } = options;

    try {
      const newsRes = await api.get(
        `/post/public/shows?topicSlug=huong-dan&page=${page}&limit=${limit}`
      );

      setPosts(newsRes.data.data?.posts || []);

      setPagination({
        totalItems: newsRes.data.data.totalItems || 0,
        totalPages: newsRes.data.data.totalPages || 1,
        currentPage: newsRes.data.data.currentPage || 1,
      });
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

  const handlePostPageChange = (options: any) => {
    const { page, limit, categorySlug } = options;
    getPostsData({ page, limit, categorySlug });
    const section = document.getElementById('postId');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const breadcrumbItems = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Hướng dẫn', href: '/huong-dan' },
  ];

  return (
    <section className="container py-4">
      <Breadcrumb items={breadcrumbItems} />
      <div className=" grid grid-cols-1 lg:grid-cols-4 gap-6">
        <aside className="hidden lg:block col-span-1 space-y-5">
          <NewsSidebar />
          <CategoriesProSidebar />
        </aside>

        <article id="list-news" className="col-span-1 lg:col-span-3">
          <div className="mb-6 text-center">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-green-cyan-500 mb-2">
              Hướng dẫn sử dụng
            </h1>
            <p className="text-[0.8rem] md:text-base text-gray-600">
              Cập nhật những thông tin mới nhất từ HNH
            </p>
          </div>
          <SectionLoader
            loading={loading}
            error={error}
            number={4}
            onRetry={() => getPostsData()}
            loadingComponent={LoadingListNewsSkeleton}
            errorTitle="tải sản phẩm"
          >
            {posts.length > 0 ? (
              <div
                className="grid gap-4 xl:gap-6 items-stretch"
                style={{
                  gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                }}
              >
                {posts.map((item) => (
                  <div key={item.id} className="h-full">
                    <NewsCard news={item} topic={breadcrumbItems[1]} />
                  </div>
                ))}
              </div>
            ) : (
              <p>Không có bài viết nào.</p>
            )}
            <Pagination
              keyword="bài viết"
              pagination={pagination}
              onPageChange={handlePostPageChange}
              itemsPerPage={MAX_LENGHT_LIMIT}
              selectedCategory={null}
            />
          </SectionLoader>
        </article>
      </div>
    </section>
  );
}
