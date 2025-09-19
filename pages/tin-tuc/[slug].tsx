import CommentsSection from '@/components/comment-card';
import { ArticleContent, PostNavigation } from '@/components/enhanced-support';
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
  const [error, setError] = useState<any>(null);

  const [post, setPost] = useState<Post | null>(null);
  const [prevNext, setPrevNext] = useState<{
    prev?: Post;
    next?: Post;
  }>({});

  useEffect(() => {
    if (slug) {
      getArticleDetail(slug);
    }
  }, [slug]);

  const getArticleDetail = async (slug: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      // 1. Lấy chi tiết bài viết hiện tại
      const response = await api.get(`/post/show/${slug}`);
      const currentPost = response.data.data;
      setPost(currentPost);

      // 2. Lấy danh sách tất cả bài viết (hoặc cùng category)
      const listRes = await api.get(
        `/post/public/shows?topicSlug=tin-tuc&limit=50`
      );
      const posts: Post[] = listRes.data.data?.posts || [];

      // 3. Tìm vị trí của bài hiện tại
      const index = posts.findIndex((p) => p.slug === slug);

      setPrevNext({
        prev: index > 0 ? posts[index - 1] : undefined,
        next: index < posts.length - 1 ? posts[index + 1] : undefined,
      });
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-16">
        <div className="container px-4 md:px-6 py-20">
          <div className="flex justify-center items-center min-h-[50vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Đang tải bài viết...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-purple-50">
        <div className="container px-4 md:px-6 py-20">
          <div className="flex flex-col justify-center items-center min-h-[50vh] text-center">
            <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-12 border border-red-200 shadow-2xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Oops! Có lỗi xảy ra
              </h2>
              <p className="text-gray-600 mb-8 text-lg">
                {error?.message || 'Bài viết không tồn tại hoặc đã bị xóa'}
              </p>
              <Link href="/tin-tuc">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 px-8 py-3 text-lg shadow-lg">
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Quay lại trang tin tức
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="container py-4">
      <Breadcrumb
        items={[
          { label: 'Trang chủ', href: '/' },
          { label: 'Tin tức', href: '/tin-tuc' },
          { label: post.title },
        ]}
      />
      <div className=" grid grid-cols-4 gap-6">
        <article className="col-span-3">
          <ArticleContent post={post} />
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
          <CommentsSection
            comments={post.postComments || []}
            postId={post.id}
            onCommentSubmitted={() => getArticleDetail(post.slug)} // fetch lại bài viết nếu cần
          />
        </article>

        <aside className="col-span-1 space-y-5">
          <NewsSidebar />
          <CategoriesProSidebar />
        </aside>
      </div>
    </section>
  );
}
