"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowRight, Calendar, User, Search, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AnimatedSection } from "@/components/animated-section";
import { useEffect, useState } from "react";
import api from "@/utils/axios";
import { handleError } from "@/utils/handle-error";
import { toast } from "sonner";
import NewsCard from "./EnhancedArticleCard";
import DynamicNewsGrid from "./DynamicNewsGrid";

export default function NewsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [pagination, setPagination] = useState({
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
  });

  const getPost = async (page = 1, limit = 10, topicId = null) => {
    try {
      setLoading(true);
      setError(null);

      let url = `/post/public/shows?page=${page}&limit=${limit}`;
      if (topicId && topicId !== "all") {
        url += `&topic_id=${topicId}`;
      }

      const response = await api.get(url);
      const { data } = response.data;
      setPosts(data.posts || []);
      setPagination({
        totalItems: data.totalItems || 0,
        totalPages: data.totalPages || 1,
        currentPage: data.currentPage || 1,
      });
    } catch (error) {
      const message = handleError(error);
      setError(message);
      toast.error("Không thể tải danh sách bài viết");
    } finally {
      setLoading(false);
    }
  };

  const getCategories = async (page = 1, limit = 10) => {
    try {
      setCategoriesLoading(true);

      // Fetch topics and all posts in parallel
      const [topicsResponse, postsResponse] = await Promise.all([
        api.get(`/topic/public/shows?page=${page}&limit=${limit}`),
        api.get("/post/public/shows?page=1&limit=1000"), // Fetch a large number to get all posts
      ]);

      const topics = topicsResponse.data.data.topics || [];
      const allPosts = postsResponse.data.data.posts || [];
      const totalPostsCount = postsResponse.data.data.totalItems || 0;

      // Count posts for each topic
      const topicPostCounts = {};
      allPosts.forEach((post) => {
        if (post.topics && post.topics.length > 0) {
          post.topics.forEach((topic) => {
            topicPostCounts[topic.id] = (topicPostCounts[topic.id] || 0) + 1;
          });
        }
      });

      // Create categories with counts
      const categoriesWithCounts = topics.map((topic) => ({
        id: topic.id,
        name: topic.name,
        post_count: topicPostCounts[topic.id] || 0,
      }));

      // Create categories array with "Tất cả" option first
      const categoriesWithAll = [
        {
          id: "all",
          name: "Tất cả",
          post_count: totalPostsCount,
        },
        ...categoriesWithCounts,
      ];

      setCategories(categoriesWithAll);
    } catch (error) {
      const message = handleError(error);
      toast.error("Không thể tải danh mục");
      console.error("Error fetching categories:", error);
    } finally {
      setCategoriesLoading(false);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= pagination.totalPages) {
      getPost(page, 10, selectedCategory);
    }
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    getPost(1, 10, categoryId); // Reset to first page when changing category
  };

  // Get featured news from first post or fallback
  const getFeaturedNews = () => {
    if (posts && posts.length > 0) {
      const firstPost = posts[0];
      return {
        title: firstPost.title,
        excerpt:
          firstPost.short_description ||
          firstPost.description ||
          "Không có mô tả",
        image: firstPost.thumbnail || "/placeholder.svg",
        category: firstPost.topics?.[0]?.name || "Tin tức",
        date: firstPost.published_at
          ? new Date(firstPost.published_at).toLocaleDateString("vi-VN")
          : "N/A",
        author: firstPost.author?.full_name || "Admin",
        readTime: "8 phút đọc",
        slug: firstPost.slug || firstPost.id,
      };
    }

    // Fallback featured news
    return {
      title: "Xu hướng AI và Machine Learning sẽ thống trị năm 2024",
      excerpt:
        "Phân tích sâu về những xu hướng công nghệ AI mới nhất và tác động đến doanh nghiệp Việt Nam trong năm 2024...",
      image:
        "/AI-la-gi.jpeg?height=400&width=800&query=AI technology trends 2024 futuristic",
      category: "Công nghệ",
      date: "15/12/2024",
      author: "Nguyễn Văn A",
      readTime: "8 phút đọc",
      slug: "#",
    };
  };

 

  useEffect(() => {
    getPost(1, 4); // Load first page with 10 items
    getCategories(); // Load categories
  }, []);

  // Update "Tất cả" category count when pagination changes
  useEffect(() => {
    if (categories.length > 0 && selectedCategory === "all") {
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === "all" ? { ...cat, post_count: pagination.totalItems } : cat
        )
      );
    }
  }, [pagination.totalItems, selectedCategory]);
  const featuredNews = getFeaturedNews();

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container px-4 md:px-6">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4">
              Tin tức & Insights
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Cập nhật
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                công nghệ mới nhất
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Theo dõi những xu hướng công nghệ, case study thành công và
              insights từ các chuyên gia hàng đầu
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input placeholder="Tìm kiếm bài viết..." className="pl-10" />
              </div>
              <Button>Tìm kiếm</Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <AnimatedSection>
            <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative">
                  <Image
                    src={featuredNews.image || "/placeholder.svg"}
                    alt={featuredNews.title}
                    width={800}
                    height={400}
                    className="w-full h-64 md:h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-blue-600">Nổi bật</Badge>
                  </div>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <Badge variant="outline" className="w-fit mb-4">
                    {featuredNews.category}
                  </Badge>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    {featuredNews.title}
                  </h2>
                  <p className="text-gray-600 mb-6">{featuredNews.excerpt}</p>
                  <div className="flex items-center text-sm text-gray-500 mb-6">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="mr-4">{featuredNews.date}</span>
                    <User className="h-4 w-4 mr-2" />
                    <span className="mr-4">{featuredNews.author}</span>
                    <span>{featuredNews.readTime}</span>
                  </div>
                  <Link href={`/news/${featuredNews.slug}`}>
                    <Button className="w-fit">
                      Đọc bài viết
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </AnimatedSection>
        </div>
      </section>

      {/* Categories and News List */}
      <section className="py-20 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-8">

            {/* Sidebar - 4/12 columns */}
            <div className="md:w-1/3 flex-shrink-0">
              <AnimatedSection>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2" />
                      Danh mục
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {categoriesLoading ? (
                      <div className="flex justify-center py-4">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                      </div>
                    ) : (
                      categories.map((category) => (
                        <div
                          key={category.id}
                          className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                            selectedCategory === category.id
                              ? "bg-blue-100 text-blue-700"
                              : "hover:bg-gray-100"
                          }`}
                          onClick={() => handleCategoryChange(category.id)}
                        >
                          <span className="font-medium">{category.name}</span>
                          <Badge variant="secondary">
                            {category.post_count || 0}
                          </Badge>
                        </div>
                      ))
                    )}
                  </CardContent>
                </Card>

                {/* Newsletter */}
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Đăng ký nhận tin</CardTitle>
                    <CardDescription>
                      Nhận tin tức công nghệ mới nhất qua email
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Input placeholder="Email của bạn" />
                    <Button className="w-full">Đăng ký</Button>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>

            {/* Main Content - 8/12 columns */}
            <div className="md:w-2/3 flex-1">
              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Đang tải tin tức...</p>
                  </div>
                </div>
              ) : error ? (
                <div className="text-center py-20">
                  <p className="text-red-600 mb-4">
                    Có lỗi xảy ra khi tải tin tức
                  </p>
                  <Button
                    onClick={() =>
                      getPost(pagination.currentPage, 10, selectedCategory)
                    }
                  >
                    Thử lại
                  </Button>
                </div>
              ) : (
                <>
                  <DynamicNewsGrid posts={posts} />

                  <AnimatedSection className="mt-12 flex flex-col items-center">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        disabled={pagination.currentPage <= 1}
                        onClick={() =>
                          handlePageChange(pagination.currentPage - 1)
                        }
                      >
                        Trước
                      </Button>

                      {Array.from(
                        { length: Math.min(5, pagination.totalPages) },
                        (_, i) => {
                          let pageNum;
                          if (pagination.totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (pagination.currentPage <= 3) {
                            pageNum = i + 1;
                          } else if (
                            pagination.currentPage >=
                            pagination.totalPages - 2
                          ) {
                            pageNum = pagination.totalPages - 4 + i;
                          } else {
                            pageNum = pagination.currentPage - 2 + i;
                          }

                          return (
                            <Button
                              key={pageNum}
                              variant={
                                pagination.currentPage === pageNum
                                  ? "default"
                                  : "outline"
                              }
                              className={
                                pagination.currentPage === pageNum
                                  ? "bg-blue-600"
                                  : ""
                              }
                              onClick={() => handlePageChange(pageNum)}
                            >
                              {pageNum}
                            </Button>
                          );
                        }
                      )}

                      {pagination.totalPages > 5 &&
                        pagination.currentPage < pagination.totalPages - 2 && (
                          <>
                            <span className="px-2">...</span>
                            <Button
                              variant="outline"
                              onClick={() =>
                                handlePageChange(pagination.totalPages)
                              }
                            >
                              {pagination.totalPages}
                            </Button>
                          </>
                        )}

                      <Button
                        variant="outline"
                        disabled={
                          pagination.currentPage >= pagination.totalPages
                        }
                        onClick={() =>
                          handlePageChange(pagination.currentPage + 1)
                        }
                      >
                        Sau
                      </Button>
                    </div>

                    <div className="mt-4 text-sm text-gray-600 text-center">
                      Hiển thị{" "}
                      {Math.min(
                        (pagination.currentPage - 1) * 10 + 1,
                        pagination.totalItems
                      )}{" "}
                      -{" "}
                      {Math.min(
                        pagination.currentPage * 10,
                        pagination.totalItems
                      )}{" "}
                      của {pagination.totalItems} bài viết
                    </div>
                  </AnimatedSection>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
