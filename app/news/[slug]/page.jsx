"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  Calendar,
  ArrowLeft,
  MessageCircle,
  Share2,
  Bookmark,
  Heart,
  Eye,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import Link from "next/link";
import api from "@/utils/axios";
import { handleError } from "@/utils/handle-error";
import { AnimatedSection } from "@/components/animated-section";

export default function ArticleDetailPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    if (slug) {
      getArticleDetail(slug);
    }
  }, [slug]);

  const getArticleDetail = async (slug) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get(`/post/show/${slug}`);
      setPost(response.data.data); // <-- cập nhật theo response mới

      // Gọi bài viết liên quan
      const topicId = response.data.data.topics?.[0]?.id;
      if (topicId) {
        getRelatedPosts(topicId, response.data.data.id);
      }
    } catch (error) {
      const message = handleError(error);
      setError(message);
      toast.error("Không thể tải thông tin bài viết");
    } finally {
      setLoading(false);
    }
  };

  const getRelatedPosts = async (topicId, currentPostId) => {
    try {
      const response = await api.get(`/post/public/shows?topic_id=${topicId}&limit=3`);
      const data = response.data.data.posts;
      const filtered = data.filter(post => post.id !== currentPostId);
      setRelatedPosts(filtered.slice(0, 3));
    } catch (error) {
      console.error("Error fetching related posts:", error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
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
      <div className="min-h-screen pt-16">
        <div className="container px-4 md:px-6 py-20">
          <div className="flex flex-col justify-center items-center min-h-[50vh]">
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Không thể tải bài viết
            </h2>
            <p className="text-gray-600 mb-6">
              {error?.message || "Bài viết không tồn tại hoặc đã bị xóa"}
            </p>
            <Link href="/news">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Quay lại trang tin tức
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container px-4 md:px-6">
          <Link
            href="/news"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại danh sách bài viết
          </Link>

          <AnimatedSection>
            <div className="max-w-4xl mx-auto">
              {post.topics?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.topics.map((topic) => (
                    <Badge key={topic.id} variant="outline" className="font-medium">
                      {topic.name}
                    </Badge>
                  ))}
                </div>
              )}

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                  <span>{formatDate(post.published_at)}</span>
                </div>

                {post.author && (
                  <div className="flex items-center">
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarImage src={post.author.avatar_url} alt={post.author.full_name} />
                      <AvatarFallback>{post.author.full_name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{post.author.full_name}</span>
                  </div>
                )}

                <div className="flex items-center">
                  <Eye className="h-4 w-4 mr-2 text-blue-600" />
                  <span>{Math.floor(Math.random() * 1000) + 100} lượt xem</span>
                </div>
              </div>

              {post.short_description && (
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8 rounded">
                  <p className="text-lg italic text-gray-700">{post.short_description}</p>
                </div>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Article Body */}
            <div className="md:w-2/3">
              <AnimatedSection>
                <Card className="overflow-hidden">
                  {post.thumbnail && (
                    <div className="relative aspect-video w-full overflow-hidden">
                      <img
                        src={post.thumbnail}
                        alt={post.title}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  )}

                  <CardContent className="pt-6">
                    <div
                      className="prose prose-lg max-w-none prose-img:rounded-md prose-headings:text-blue-700"
                      dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    <div className="flex justify-between items-center mt-10 pt-6 border-t border-gray-200">
                      <div className="flex gap-4">
                        <Button variant="outline" size="sm">
                          <Heart className="mr-2 h-4 w-4" />
                          Thích
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share2 className="mr-2 h-4 w-4" />
                          Chia sẻ
                        </Button>
                        <Button variant="outline" size="sm">
                          <Bookmark className="mr-2 h-4 w-4" />
                          Lưu
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {post.postComments?.length > 0 && (
                  <Card className="mt-8">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <MessageCircle className="h-5 w-5 mr-2" />
                        Bình luận ({post.postComments.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {post.postComments.map((comment) => (
                        <div key={comment.id} className="flex gap-4">
                          <Avatar>
                            <AvatarFallback>{comment.user.full_name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium">{comment.user.full_name}</span>
                            </div>
                            <p className="text-gray-700">{comment.content}</p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}
              </AnimatedSection>
            </div>

            {/* Sidebar Fixed */}
            <div className="md:w-1/3">
              <div className="sticky top-28 space-y-6">
                <AnimatedSection>
                  {post.author && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Tác giả</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={post.author.avatar_url} alt={post.author.full_name} />
                            <AvatarFallback>{post.author.full_name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{post.author.full_name}</h3>
                            <p className="text-sm text-gray-600">{post.author.email}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {relatedPosts.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Bài viết liên quan</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {relatedPosts.map((relatedPost) => (
                          <Link
                            key={relatedPost.id}
                            href={`/news/${relatedPost.slug}`}
                            className="block"
                          >
                            <div className="flex gap-3 hover:bg-gray-50 p-2 rounded-lg transition-colors">
                              <div className="flex-shrink-0 w-20 h-16 overflow-hidden rounded">
                                <img
                                  src={relatedPost.thumbnail || "/placeholder.svg"}
                                  alt={relatedPost.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-sm line-clamp-2 mb-1">
                                  {relatedPost.title}
                                </h4>
                                <div className="flex items-center text-xs text-gray-500">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  <span>{formatDate(relatedPost.published_at)}</span>
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </CardContent>
                    </Card>
                  )}
                </AnimatedSection>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
