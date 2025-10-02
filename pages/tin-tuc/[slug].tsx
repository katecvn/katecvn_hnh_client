import CommentsSection from '@/components/comment-news';
import { ArticleContent, PostNavigation } from '@/components/enhanced-support';
import {
  LoadingArticleDetailSkeleton,
  SectionLoader,
} from '@/components/loading-error';
import { CategoriesProSidebar, NewsSidebar } from '@/components/sidebar-menu';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Post } from '@/types/interface';
import api from '@/utils/axios';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function NewsPage() {
  const router = useRouter();
  const { slug } = router.query as { slug?: string };

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [post, setPost] = useState<Post | null>(null);
  const [prevNext, setPrevNext] = useState<{ prev?: Post; next?: Post }>({});

  useEffect(() => {
    if (slug) {
      getArticleDetail(slug);
    }
  }, [slug]);

  const getArticleDetail = async (slug: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      // 1. Chi tiết bài viết
      const response = await api.get(`/post/show/${slug}`);
      const currentPost: Post = response.data.data;
      setPost(currentPost);

      // 2. Danh sách bài viết
      const listRes = await api.get(
        `/post/public/shows?topicSlug=tin-tuc&limit=50`
      );
      const posts: Post[] = listRes.data.data?.posts || [];

      // 3. Tìm prev/next
      const index = posts.findIndex((p) => p.slug === slug);
      setPrevNext({
        prev: index > 0 ? posts[index - 1] : undefined,
        next:
          index >= 0 && index < posts.length - 1 ? posts[index + 1] : undefined,
      });
    } catch (e: any) {
      console.error(e);
      setError(e?.message ?? 'Đã có lỗi xảy ra');
      setPost(null);
      setPrevNext({});
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container py-4">
      <SectionLoader
        loading={loading}
        error={error}
        onRetry={() => slug && getArticleDetail(slug)}
        loadingComponent={LoadingArticleDetailSkeleton}
        errorTitle="tải tin tức"
      >
        <Breadcrumb
          items={[
            { label: 'Trang chủ', href: '/' },
            { label: 'Tin tức', href: '/tin-tuc' },
            { label: post?.title ?? '' },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <article className="col-span-1 lg:col-span-3 w-full">
            {/* Chỉ render khi đã có dữ liệu để thỏa kiểu Post */}
            {post && <ArticleContent post={post} />}

            {post && (
              <PostNavigation
                prev={
                  prevNext.prev
                    ? {
                        title: prevNext.prev.title,
                        href: `/tin-tuc/${prevNext.prev.slug}`,
                      }
                    : undefined
                }
                next={
                  prevNext.next
                    ? {
                        title: prevNext.next.title,
                        href: `/tin-tuc/${prevNext.next.slug}`,
                      }
                    : undefined
                }
              />
            )}

            {post && (
              <CommentsSection
                comments={post.postComments || []}
                postId={post.id}
                onCommentSubmitted={() =>
                  post.slug && getArticleDetail(post.slug)
                }
              />
            )}
          </article>

          <aside className="hidden lg:block col-span-1 space-y-5">
            <NewsSidebar />
            <CategoriesProSidebar />
          </aside>
        </div>
      </SectionLoader>
    </section>
  );
}
