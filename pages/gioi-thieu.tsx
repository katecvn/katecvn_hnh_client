import { ArticleContent, PressSection } from '@/components/enhanced-support';

import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Post } from '@/types/interface';
import api from '@/utils/axios';
import { useEffect, useState } from 'react';

export default function NewsPage() {
  const MAX_LENGHT_LIMIT = 9;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    getPostData();
  }, []);

  const getPostData = async () => {
    setLoading(true);
    setError(null);

    try {
      const newsRes = await api.get(`/post/public/shows?topicSlug=gioi-thieu`);
      if (
        Array.isArray(newsRes.data.data?.posts) &&
        newsRes.data.data.posts.length > 0
      ) {
        const slug = newsRes.data.data.posts[0].slug;
        const response = await api.get(`/post/show/${slug}`);
        setPost(response.data.data);
      }
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
    <section className="container py-4">
      <Breadcrumb
        items={[
          { label: 'Trang chủ', href: '/' },
          { label: 'Giới thiệu', href: '/gioi-thieu' },
        ]}
      />
      {post ? (
        <ArticleContent post={post} showHeader={false} />
      ) : (
        <p>Chưa có bài viết</p>
      )}
      <PressSection />
    </section>
  );
}
