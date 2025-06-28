'use client';
import { useState, useEffect, useRef, memo } from 'react';
import { useRouter } from 'next/router';

import {
  Calendar,
  ArrowLeft,
  MessageCircle,
  Share2,
  Bookmark,
  Heart,
  Eye,
  Clock,
  User,
  ThumbsUp,
  Sparkles,
  TrendingUp,
  Zap,
  Smile,
  Image,
  Link2,
  Send,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';
import Link from 'next/link';
import api from '@/utils/axios';
import { handleError } from '@/utils/handle-error';
import { AnimatedSection } from '@/components/animated-section';
import { HolographicText } from '@/components/tech-blue-animations';
import { SupportSection } from '@/components/enhanced-support';
import { ApiResponse, Comment, Post, PostsResponse } from '@/pages/interface';

const ArticleContent = memo(({ content }: { content: string }) => {
  return (
    <div
      className={`prose prose-base sm:prose-lg lg:prose-xl max-w-none 
        overflow-x-auto break-words whitespace-normal
        prose-headings:text-gray-900 prose-headings:font-bold
        prose-p:text-gray-700 prose-p:leading-relaxed prose-p:text-lg prose-p:text-justify
        prose-a:text-purple-600 prose-a:no-underline hover:prose-a:text-purple-500 prose-a:font-medium
        prose-strong:text-gray-900 prose-strong:font-bold
        prose-img:rounded-xl prose-img:shadow-lg prose-img:max-w-full prose-img:h-auto
        prose-blockquote:border-l-purple-500 prose-blockquote:bg-purple-50 prose-blockquote:rounded-r-lg prose-blockquote:text-gray-700
        prose-code:bg-gray-100 prose-code:text-purple-700 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:font-semibold`}
      style={{ textAlign: 'justify' }}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
});

export default function ArticleDetailPage() {
  const router = useRouter();
  const { slug } = router.query as { slug?: string };

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  const [likeCount, setLikeCount] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const heroRef = useRef<HTMLElement>(null);

  const [viewCount, setViewCount] = useState<number>(0);
  const [readTime, setReadTime] = useState<number>(0);

  useEffect(() => {
    setViewCount(Math.floor(Math.random() * 1000) + 100);
    setReadTime(Math.floor(Math.random() * 5) + 3);
  }, []);

  useEffect(() => {
    if (slug) {
      getArticleDetail(slug);
    }
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const imgs = document.querySelectorAll('.prose img');
    imgs.forEach((img) => {
      img.setAttribute('loading', 'eager'); // tránh delay
      img.setAttribute('decoding', 'async');
    });
  }, []);

  const getArticleDetail = async (slug: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get<ApiResponse<Post>>(`/post/show/${slug}`);
      setPost(response.data.data);
      setLikeCount(Math.floor(Math.random() * 500) + 50);

      const topicId = response.data.data.topics?.[0]?.id;
      if (topicId) {
        getRelatedPosts(topicId, response.data.data.id);
      }
    } catch (error: any) {
      const message = handleError(error);
      setError(message);
      toast.error('Không thể tải thông tin bài viết');
    } finally {
      setLoading(false);
    }
  };

  const getRelatedPosts = async (
    topicId: number,
    currentPostId: number
  ): Promise<void> => {
    try {
      const response = await api.get<ApiResponse<PostsResponse>>(
        `/post/public/shows?topic_id=${topicId}&limit=3`
      );
      const data = response.data.data.posts;
      const filtered = data.filter((post: Post) => post.id !== currentPostId);
      setRelatedPosts(filtered.slice(0, 3));
    } catch (error) {
      console.error('Error fetching related posts:', error);
    }
  };

  const formatDate = (dateString: string): string => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  useEffect(() => {
    const imgs = document.querySelectorAll('.prose img');
    imgs.forEach((img) => {
      if (!img.getAttribute('data-loaded')) {
        img.setAttribute('loading', 'lazy');
        img.setAttribute('decoding', 'async');
        img.setAttribute('data-loaded', 'true');
      }
    });
  }, [post?.content]); // chỉ chạy lại khi post content thay đổi

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
              <Link href="/news">
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
    <>
      <div className="min-h-screen pt-16 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
        {/* Hero Section with Parallax */}
        <section
          ref={heroRef}
          className="relative  flex items-center justify-center overflow-hidden"
        >
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-blue-50/80 to-purple-50/80">
            <div className="absolute  inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2220%22 height=%2220%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cdefs%3E%3Cpattern id=%22grid%22 width=%2220%22 height=%2220%22 patternUnits=%22userSpaceOnUse%22%3E%3Cpath d=%22M 20 0 L 0 0 0 20%22 fill=%22none%22 stroke=%22%23e5e7eb%22 stroke-width=%220.5%22 opacity=%220.3%22/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=%22100%25%22 height=%22100%25%22 fill=%22url(%23grid)%22/%3E%3C/svg%3E')] opacity-30"></div>

            {/* Floating Elements - existing */}
            <div className="absolute top-20 left-10 w-3 h-3 bg-purple-400 rounded-full animate-pulse opacity-60"></div>
            <div className="absolute top-40 right-20 w-4 h-4 bg-pink-400 rounded-full animate-bounce opacity-60"></div>
            <div className="absolute bottom-40 left-20 w-2 h-2 bg-cyan-400 rounded-full animate-ping opacity-60"></div>
            <div className="absolute bottom-20 right-20 w-5 h-5 bg-blue-400 rounded-full animate-pulse opacity-60"></div>

            {/* Floating Elements - thêm mới */}
            <div className="absolute top-10 right-10 w-2 h-2 bg-yellow-300 rounded-full animate-ping opacity-50"></div>
            <div className="absolute bottom-10 left-10 w-4 h-4 bg-rose-400 rounded-full animate-bounce opacity-50"></div>
            <div className="absolute top-1/2 left-1/3 w-3 h-3 bg-indigo-400 rounded-full animate-pulse opacity-50"></div>
            <div className="absolute bottom-1/3 right-1/4 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-bounce opacity-40"></div>
          </div>

          <div className="container  pt-4 px-4 md:px-6 relative z-10">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <div className="flex flex-wrap items-center space-x-2 text-sm">
                <span className="text-gray-500">Trang chủ</span>
                <span className="text-gray-400">/</span>
                <span className="text-gray-500">Tin tức</span>
                <span className="text-gray-400">/</span>
                <span className="font-medium bg-blue-500 bg-clip-text text-transparent">
                  {post.title}
                </span>
              </div>
            </nav>

            <AnimatedSection>
              <div className="max-w-5xl mx-auto text-center">
                {Array.isArray(post.topics) && (
                  <div className="flex flex-wrap justify-center gap-3 mt-2 mb-1">
                    {post.topics.map((topic, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="mb-4 border-tech-blue-500 text-tech-blue-600"
                      >
                        <Sparkles className="h-4 w-4 mr-2" />
                        {topic.name}
                      </Badge>
                    ))}
                  </div>
                )}

                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  <HolographicText>{post.title}</HolographicText>
                </h2>

                <div className="flex flex-wrap justify-center items-center gap-8 text-gray-600 mb-8">
                  <div className="flex items-center bg-white/80 backdrop-blur px-4 py-2 rounded-full border border-gray-200 shadow-sm">
                    <Calendar className="h-4 w-4 mr-2 text-purple-500" />
                    <span className="font-medium">
                      {formatDate(post.published_at)}
                    </span>
                  </div>

                  {post.author && (
                    <div className="flex items-center bg-white/80 backdrop-blur px-4 py-2 rounded-full border border-gray-200 shadow-sm">
                      <Avatar className="h-6 w-6 mr-2 ring-2 ring-purple-300">
                        <AvatarImage
                          src={post.author.avatar_url}
                          alt={post.author.full_name}
                        />
                        <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">
                          {post.author.full_name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">
                        {post.author.full_name}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center bg-white/80 backdrop-blur px-4 py-2 rounded-full border border-gray-200 shadow-sm">
                    <Eye className="h-4 w-4 mr-2 text-cyan-500" />
                    <span className="font-medium">{viewCount} lượt xem</span>
                  </div>

                  <div className="flex items-center bg-white/80 backdrop-blur px-4 py-2 rounded-full border border-gray-200 shadow-sm">
                    <Clock className="h-4 w-4 mr-2 text-green-500" />
                    <span className="font-medium">{readTime} phút đọc</span>
                  </div>
                </div>

                {post.short_description && (
                  <div className="bg-gradient-to-r from-blue-50 to-sky-50 backdrop-blur-lg border border-cyan-200 p-6 mb-20 rounded-3xl max-w-4xl mx-auto shadow-lg">
                    <p className="text-gray-700 italic leading-relaxed font-medium line-clamp-2">
                      {post.short_description}
                    </p>
                  </div>
                )}

                {/* Floating Action Buttons */}
              </div>
            </AnimatedSection>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-gray-600 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Article Body */}
              <div className="lg:w-2/3">
                <AnimatedSection>
                  <Card className="overflow-hidden bg-white backdrop-blur-xl border border-gray-200 shadow-2xl">
                    <CardContent className="px-3 py-4 sm:px-4 sm:py-5 md:px-5 md:py-6 lg:px-6 lg:py-6">
                      <style jsx global>{`
                        .prose img {
                          max-width: 100%;
                          height: auto;
                          border-radius: 12px;
                          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
                          transition: transform 0.3s ease, opacity 0.3s ease;
                          display: block;
                          margin: 1.5rem auto;
                        }
                      `}</style>
                      <ArticleContent content={post.content} />
                    </CardContent>
                  </Card>

                  {/* Comments Section */}
                  <Card className="mt-8 bg-white backdrop-blur-xl border border-gray-200 shadow-2xl">
                    <CardHeader className="border-b border-gray-200 px-4 sm:px-6">
                      <CardTitle className="flex items-center text-gray-900 text-2xl font-bold">
                        <MessageCircle className="h-6 w-6 mr-3 text-blue-500" />
                        Bình luận ({post.postComments?.length || 0})
                        <TrendingUp className="h-5 w-5 ml-2 text-green-500" />
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-8 pt-8 px-4 sm:px-6">
                      {/* List of Comments */}
                      {Array.isArray(post.postComments) &&
                      post.postComments.length > 0 ? (
                        post.postComments.map(
                          (comment: Comment, index: number) => (
                            <div
                              key={comment.id}
                              className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-all duration-300"
                              style={{ animationDelay: `${index * 0.1}s` }}
                            >
                              <Avatar className="ring-2 ring-purple-200 flex-shrink-0">
                                <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold">
                                  {comment.user.full_name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-2 mb-2">
                                  <span className="font-bold text-gray-900">
                                    {comment.user.full_name}
                                  </span>
                                  <Badge
                                    variant="outline"
                                    className="border-purple-300 text-purple-700 text-xs font-medium"
                                  >
                                    Verified
                                  </Badge>
                                </div>
                                <p className="text-gray-700 leading-relaxed">
                                  {comment.content}
                                </p>
                                <div className="flex items-center gap-4 mt-3">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-gray-600 hover:text-purple-600 p-0 h-auto font-medium"
                                  >
                                    <ThumbsUp className="h-3 w-3 mr-1" />
                                    {Math.floor(Math.random() * 10) + 1}
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-gray-600 hover:text-purple-600 p-0 h-auto font-medium"
                                  >
                                    Trả lời
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )
                        )
                      ) : (
                        <div className="text-center">
                          <div className="flex flex-col items-center space-y-4">
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                              <MessageCircle className="h-8 w-8 text-purple-400" />
                            </div>
                            <div className="space-y-2">
                              <h3 className="text-lg font-semibold text-gray-900">
                                Chưa có bình luận nào
                              </h3>
                              <p className="text-gray-600 max-w-md">
                                Hãy là người đầu tiên chia sẻ suy nghĩ của bạn
                                về bài viết này!
                              </p>
                            </div>
                            <Button className="cursor-default bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium px-6 py-2 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl">
                              <MessageCircle className="h-4 w-4 mr-2" />
                              Viết bình luận đầu tiên
                            </Button>
                          </div>
                        </div>
                      )}

                      {/* Comment Input Form */}
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 sm:p-6 rounded-xl border border-blue-100">
                        <div className="flex flex-col sm:flex-row gap-4">
                          <Avatar className="ring-2 ring-blue-200 flex-shrink-0">
                            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold">
                              K
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-4">
                            <div className="relative">
                              <textarea
                                placeholder="Chia sẻ suy nghĩ của bạn về bài viết này..."
                                className="w-full min-h-[100px] p-4 border border-gray-200 rounded-lg bg-white shadow-sm placeholder-gray-500 text-gray-900 resize-none focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-300"
                                style={{ fontSize: '14px', lineHeight: '1.5' }}
                              />

                              <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                                0/500
                              </div>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                              <div className="flex items-center gap-3">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-gray-600 hover:text-purple-600 p-2 h-auto"
                                >
                                  <Smile className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-gray-600 hover:text-purple-600 p-2 h-auto"
                                >
                                  <Image className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-gray-600 hover:text-purple-600 p-2 h-auto"
                                >
                                  <Link2 className="h-4 w-4" />
                                </Button>
                              </div>
                              <div className="flex items-center gap-3">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                                >
                                  Hủy
                                </Button>
                                <Button
                                  className="bg-gradient-to-r from-blue-500 to-blue-500 hover:from-blue-600 hover:to-blue-600 text-white font-medium px-6 py-2 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                                  size="sm"
                                >
                                  <Send className="h-4 w-4 mr-2" />
                                  Đăng bình luận
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              </div>

              {/* Enhanced Sidebar */}
              <div className="lg:w-1/3">
                <div className="sticky top-28 space-y-8">
                  {post.author && (
                    <AnimatedSection>
                      <Card className=" bg-gradient-to-br from-cyan-50 to-blue-50 backdrop-blur-xl border border-purple-200 shadow-2xl overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-100/20 to-pink-100/20"></div>
                        <CardHeader className="relative">
                          <CardTitle className="text-gray-900 flex items-center font-bold">
                            <User className="h-5 w-5 mr-2 text-sky-600" />
                            Tác giả
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="relative">
                          <div className="flex items-center gap-4">
                            <Avatar className="h-16 w-16 ring-4 ring-blue-300">
                              <AvatarImage
                                src={post.author.avatar_url}
                                alt={post.author.full_name}
                              />
                              <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xl font-bold">
                                {post.author.full_name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-bold text-gray-900 text-lg">
                                {post.author.full_name}
                              </h3>
                              <p className="text-gray-600 text-sm font-medium">
                                {post.author.email}
                              </p>
                              <div className="flex items-center mt-2">
                                <Zap className="h-3 w-3 mr-1 text-yellow-500" />
                                <span className="text-xs text-yellow-600 font-bold">
                                  Chuyên gia
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </AnimatedSection>
                  )}

                  {relatedPosts.length > 0 && (
                    <AnimatedSection>
                      <Card className=" bg-gradient-to-br from-cyan-50 to-blue-50 backdrop-blur-xl border border-cyan-200 shadow-2xl">
                        <CardHeader>
                          <CardTitle className="text-gray-900 flex items-center font-bold">
                            <Sparkles className="h-5 w-5 mr-2 text-cyan-600" />
                            Bài viết liên quan
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          {relatedPosts.map(
                            (relatedPost: Post, index: number) => (
                              <Link
                                key={relatedPost.id}
                                href={`/news/${relatedPost.slug}`}
                                className="block group"
                              >
                                <div
                                  className="flex gap-4 p-4 rounded-xl bg-white/70 border border-gray-200 hover:bg-white hover:border-cyan-300 transition-all duration-300 transform hover:scale-105 shadow-sm"
                                  style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                  <div className="flex-shrink-0 w-24 h-20 overflow-hidden rounded-lg ring-2 ring-cyan-200 group-hover:ring-cyan-400 transition-all">
                                    <img
                                      src={
                                        relatedPost.thumbnail ||
                                        '/placeholder.svg'
                                      }
                                      alt={relatedPost.title}
                                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                    />
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="font-bold text-gray-900 text-sm line-clamp-2 mb-2 group-hover:text-cyan-700 transition-colors">
                                      {relatedPost.title}
                                    </h4>
                                    <div className="flex items-center text-xs text-gray-600 font-medium">
                                      <Calendar className="h-3 w-3 mr-1" />
                                      <span>
                                        {formatDate(relatedPost.published_at)}
                                      </span>
                                    </div>
                                    <div className="mt-2 flex items-center text-xs text-cyan-600 font-bold">
                                      <TrendingUp className="h-3 w-3 mr-1" />
                                      <span>Trending</span>
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            )
                          )}
                        </CardContent>
                      </Card>{' '}
                    </AnimatedSection>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Support Section */}
        <SupportSection />
      </div>
    </>
  );
}
