'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ArrowRight,
  Calendar,
  User,
  TrendingUp,
  Clock,
  Zap,
  Sparkle,
  ScrollText,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatedSection } from '@/components/animated-section';
import { useEffect, useState } from 'react';
import api from '@/utils/axios';
import { handleError } from '@/utils/handle-error';
import { toast } from 'sonner';
import DynamicNewsGrid from './DynamicNewsGrid';
import AnimatedHeroSection from './HeroSection';
import { SupportSection } from '@/components/enhanced-support';
import { Pagination } from '@/components/pagination';
import { HolographicText } from '@/components/tech-blue-animations';
import {
  LoadingFeaturedArticleSkeleton,
  LoadingNewsPageSkeleton,
  LoadingNewsSkeleton,
  SectionLoader,
} from '@/components/loading-error-components';

export default function NewsPage() {
  const MAX_LENGHT_LIMIT = 6;

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('tat-ca');

  const [searchKeyword, setSearchKeyword] = useState('');

  const [pagination, setPagination] = useState({
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
  });

  const getPost = async (
    page = 1,
    limit = MAX_LENGHT_LIMIT,
    topicSlug = null,
    keyword = ''
  ) => {
    try {
      setLoading(true);
      setError(null);
      let url = `/post/public/shows?page=${page}&limit=${limit}`;

      if (topicSlug && topicSlug !== 'all') {
        url += `&topicSlug=${topicSlug}`;
      }
      if (keyword) {
        url += `&keyword=${encodeURIComponent(keyword)}`;
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
      toast.error('Không thể tải danh sách bài viết');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
    getPost(
      1,
      MAX_LENGHT_LIMIT,
      selectedCategory === 'tat-ca' ? null : selectedCategory,
      keyword
    );
    const section = document.getElementById('postId');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getCategories = async (page = 1, limit = MAX_LENGHT_LIMIT) => {
    try {
      setCategoriesLoading(true);

      // Fetch topics and all posts in parallel
      const [topicsResponse, postsResponse] = await Promise.all([
        api.get(`/topic/public/shows?page=${page}`),
        api.get('/post/public/shows?page=1&limit=9999'), // Fetch a large number to get all posts
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
        slug: topic.slug,
        post_count: topicPostCounts[topic.id] || 0,
      }));

      // Create categories array with "Tất cả" option first
      const categoriesWithAll = [
        {
          id: 'all',
          name: 'Tất cả',
          slug: 'tat-ca',
          post_count: totalPostsCount,
        },
        ...categoriesWithCounts,
      ];

      setCategories(categoriesWithAll);
    } catch (error) {
      const message = handleError(error);
      toast.error('Không thể tải danh mục');
      console.error('Error fetching categories:', error);
    } finally {
      setCategoriesLoading(false);
    }
  };

  const handleCategoryChange = (categorySlug) => {
    setSelectedCategory(categorySlug);
    const topicParam = categorySlug === 'tat-ca' ? null : categorySlug;
    getPost(1, MAX_LENGHT_LIMIT, topicParam);
    const section = document.getElementById('postId');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
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
          'Không có mô tả',
        image: firstPost.thumbnail || '/placeholder.svg',
        category: firstPost.topics?.[0]?.name || 'Tin tức',
        date: firstPost.published_at
          ? new Date(firstPost.published_at).toLocaleDateString('vi-VN')
          : 'N/A',
        author: firstPost.author?.full_name || 'Admin',
        readTime: '8 phút đọc',
        slug: firstPost.slug || firstPost.id,
      };
    }

    // Fallback featured news
    return {
      title: 'Xu hướng AI và Machine Learning sẽ thống trị năm 2024',
      excerpt:
        'Phân tích sâu về những xu hướng công nghệ AI mới nhất và tác động đến doanh nghiệp Việt Nam trong năm 2024...',
      image:
        '/AI-la-gi.jpeg?height=400&width=800&query=AI technology trends 2024 futuristic',
      category: 'Công nghệ',
      date: '15/12/2024',
      author: 'Nguyễn Văn A',
      readTime: '8 phút đọc',
      slug: '#',
    };
  };

  useEffect(() => {
    getPost(1, MAX_LENGHT_LIMIT); // Load first page with 10 items
    getCategories(); // Load categories
  }, []);

  // Update "Tất cả" category count when pagination changes
  useEffect(() => {
    if (categories.length > 0 && selectedCategory === 'tat-ca') {
      setCategories((prev) =>
        prev.map((cat) =>
          cat.slug === 'tat-ca'
            ? { ...cat, post_count: pagination.totalItems }
            : cat
        )
      );
    }
  }, [pagination.totalItems, selectedCategory]);

  const featuredNews = getFeaturedNews();
  const [isHovered, setIsHovered] = useState(false);

  const getRandomCategoryColor = (index) => {
    const gradients = [
      { from: '#3B82F6', to: '#06B6D4', class: 'from-blue-500 to-cyan-500' },
    ];

    return gradients[index % gradients.length];
  };

  const categoryColor = getRandomCategoryColor(1);

  const getWords = (str) => {
    const words = str.split(' ');
    const shortName =
      words.length > 50 ? words.slice(0, 50).join(' ') + '…' : str;
    return shortName;
  };

  const handlePostPageChange = (options) => {
    const { page, limit, categorySlug } = options;
    getPost(page, limit, categorySlug, searchKeyword);
    const section = document.getElementById('postId');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <AnimatedHeroSection onSearch={handleSearch} />

      {/* Featured Article */}
      {loading ? (
        <LoadingFeaturedArticleSkeleton />
      ) : posts.length !== 0 ? (
        <section className="py-20">
          <div className="container px-4 md:px-6">
            <AnimatedSection>
              <Link href={`/news/${featuredNews.slug}`} className="block">
                <div
                  className="group relative h-full cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-500 ease-in-out"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  {/* Enhanced Floating Background Glow */}
                  <div
                    className={`absolute -inset-2 rounded-3xl blur-2xl transition-all duration-700 transform
        ${isHovered ? 'opacity-30 scale-105' : 'opacity-0 scale-95'} -z-20`}
                    style={{
                      background: 'linear-gradient(135deg, #3B82F6, #06B6D4)',
                    }}
                  />

                  {/* Original Card with enhanced hover effects */}
                  <Card className=" overflow-hidden transition-all duration-500 hover:shadow-lg hover:scale-[1.02] relative z-10">
                    <div className="grid md:grid-cols-2 gap-0">
                      <div
                        style={{ aspectRatio: '2/1' }}
                        className="relative  overflow-hidden rounded-tl-lg rounded-bl-lg"
                      >
                        <Image
                          src={featuredNews.image || '/placeholder.svg'}
                          alt={featuredNews.title}
                          fill
                          className={`w-full h-auto object-cover transition-transform duration-700 
      ${isHovered ? 'scale-110' : 'scale-100'}`}
                        />

                        <div className="absolute top-4 left-4 z-20">
                          <div
                            className={`px-4 py-2 rounded-full text-xs font-bold backdrop-blur-md border border-white/30
                transition-all duration-500 transform ${
                  isHovered
                    ? 'text-white shadow-lg scale-110 rotate-3'
                    : 'bg-white/90 text-gray-800 hover:scale-105'
                }`}
                            style={{
                              background: isHovered
                                ? `linear-gradient(135deg, ${categoryColor.from}, ${categoryColor.to})`
                                : 'rgba(255, 255, 255, 0.9)',
                            }}
                          >
                            <div className="flex items-center gap-1">
                              <Zap className="w-3 h-3" />
                              Nổi bật
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-8 flex flex-col justify-center relative">
                        <h2
                          className={`text-2xl md:text-3xl font-bold mb-4 transition-all duration-300 ${
                            isHovered
                              ? 'text-transparent bg-clip-text'
                              : 'text-gray-900'
                          }`}
                          style={
                            isHovered
                              ? {
                                  backgroundImage:
                                    'linear-gradient(135deg, #3B82F6, #06B6D4)',
                                  WebkitBackgroundClip: 'text',
                                  WebkitTextFillColor: 'transparent',
                                }
                              : {}
                          }
                        >
                          {featuredNews.title}
                        </h2>

                        <p className="text-gray-600 text-sm mb-6 transition-colors duration-300">
                          {getWords(featuredNews.excerpt)}
                        </p>

                        <div className="flex items-center text-xs text-gray-500 mb-4 gap-4 flex-wrap relative z-10">
                          <div
                            className={`flex items-center gap-1 transition-all duration-300 transform
                ${isHovered ? 'scale-105' : ''}`}
                            style={{
                              color: isHovered ? categoryColor.from : undefined,
                            }}
                          >
                            <Calendar className="h-3 w-3" />
                            <span>
                              {featuredNews.date
                                ? new Date(
                                    featuredNews.date
                                  ).toLocaleDateString('vi-VN')
                                : article.date || 'N/A'}
                            </span>
                          </div>

                          <div
                            className={`flex items-center gap-1 transition-all duration-300 transform
                ${isHovered ? 'scale-105' : ''}`}
                            style={{
                              color: isHovered ? categoryColor.to : undefined,
                            }}
                          >
                            <User className="h-3 w-3" />
                            <span>{featuredNews.author || 'Admin'}</span>
                          </div>

                          <div
                            className={`flex items-center gap-1 transition-all duration-300 transform
                ${isHovered ? 'scale-105' : ''}`}
                            style={{
                              color: isHovered ? categoryColor.from : undefined,
                            }}
                          >
                            <Clock className="w-3 h-3" />
                            <span>{featuredNews.readTime || '5 phút đọc'}</span>
                          </div>
                        </div>

                        <Button
                          className={`w-full mt-3 py-5 px-6 text-sm text-gray-900 bg-white transition-all duration-300 transform
              ${
                isHovered
                  ? 'translate-x-2 shadow-lg text-white bg-blue-600'
                  : ''
              }`}
                        >
                          <span className="relative py-2 z-10 transition-all duration-300">
                            {isHovered ? 'Khám phá ngay' : 'Đọc thêm'}
                          </span>
                          <ArrowRight
                            className={`ml-2 h-4 w-4 transition-transform duration-300 
              ${isHovered ? 'translate-x-1' : ''}`}
                          />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>
              </Link>
            </AnimatedSection>
          </div>
        </section>
      ) : null}

      {/* Categories and News List */}
      <section id="postId" className="py-20 bg-gray-50">
        <div className="text-center mb-16">
          <Badge
            variant="outline"
            className="mb-4 border-tech-blue-500 text-tech-blue-600"
          >
            <ScrollText className="h-4 w-4 mr-2" />
            Tin tức
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <HolographicText>Cập nhật mới mỗi ngày</HolographicText>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Đừng bỏ lỡ những thông tin mới nhất về công nghệ, sản phẩm và hoạt
            động cộng đồng tại Katec.
          </p>
        </div>

        <div className="container px-4 md:px-6">
          <div className="flex sm:flex-row flex-col   gap-8">
            {/* Sidebar - 4/12 columns */}
            <div className="md:w-1/4 flex-shrink-0">
              <AnimatedSection>
                <Card className="mb-6 shadow-lg border-0 bg-gradient-to-br from-white to-gray-50/50 backdrop-blur-sm">
                  <CardHeader className="pb-4 border-b border-gray-100">
                    <CardTitle className="flex items-center text-gray-800">
                      <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mr-3 shadow-md">
                        <TrendingUp className="h-5 w-5 text-white" />
                      </div>
                      <span className="font-bold text-lg">Danh mục</span>
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="p-4">
                    {categoriesLoading ? (
                      <div className="flex flex-col items-center justify-center py-8 space-y-3">
                        <div className="relative">
                          <div className="animate-spin rounded-full h-8 w-8 border-3 border-gray-200"></div>
                          <div className="animate-spin rounded-full h-8 w-8 border-3 border-blue-500 border-t-transparent absolute top-0 left-0"></div>
                        </div>
                        <p className="text-gray-500 text-sm font-medium">
                          Đang tải danh mục...
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {categories.map((category, index) => (
                          <div
                            key={category.id}
                            className={`group relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 ease-out transform hover:scale-[1.02] ${
                              selectedCategory === category.id
                                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                                : 'bg-white hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 border border-gray-100 hover:border-blue-200 hover:shadow-md'
                            }`}
                            onClick={() => handleCategoryChange(category.slug)}
                            style={{
                              animationDelay: `${index * 50}ms`,
                            }}
                          >
                            <div
                              className={`absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                                selectedCategory === category.id
                                  ? 'opacity-0'
                                  : ''
                              }`}
                            ></div>

                            <div className="relative flex items-center justify-between p-4">
                              <div className="flex items-center space-x-3 mr-2 md:mr-4">
                                <div
                                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                    selectedCategory === category.id
                                      ? 'bg-white shadow-lg'
                                      : 'bg-gradient-to-r from-blue-400 to-purple-500 group-hover:scale-125'
                                  }`}
                                ></div>
                                <span
                                  className={`font-semibold text-sm transition-colors duration-300 ${
                                    selectedCategory === category.id
                                      ? 'text-white'
                                      : 'text-gray-700 group-hover:text-blue-700'
                                  }`}
                                >
                                  {category.name}
                                </span>
                              </div>

                              <Badge
                                variant={
                                  selectedCategory === category.id
                                    ? 'outline'
                                    : 'secondary'
                                }
                                className={`transition-all duration-300 font-bold ${
                                  selectedCategory === category.id
                                    ? 'bg-white/20 text-white border-white/30 shadow-sm'
                                    : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 group-hover:from-blue-100 group-hover:to-purple-100 group-hover:text-blue-700 border-0'
                                }`}
                              >
                                {category.post_count || 0}
                              </Badge>
                            </div>

                            {selectedCategory === category.id && (
                              <div className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full shadow-lg"></div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="mt-6 pt-4 border-t border-gray-100">
                      <div className="flex justify-center">
                        <div className="w-12 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-30"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>

            {/* Main Content - 8/12 columns */}
            <div className="md:w-3/4 flex-1">
              <SectionLoader
                loading={loading}
                error={error}
                onRetry={() =>
                  getPost(
                    pagination.currentPage,
                    MAX_LENGHT_LIMIT,
                    selectedCategory
                  )
                }
                loadingComponent={LoadingNewsPageSkeleton}
              >
                {posts.length === 0 ? (
                  <div className="text-center text-gray-600">
                    Không có bài viết nào phù hợp với tìm kiếm hoặc danh mục
                    này.
                  </div>
                ) : (
                  <DynamicNewsGrid posts={posts} row={false} />
                )}
                <Pagination
                  keyword="bài viết"
                  pagination={pagination}
                  onPageChange={handlePostPageChange}
                  itemsPerPage={MAX_LENGHT_LIMIT}
                  selectedCategory={selectedCategory}
                />
              </SectionLoader>
            </div>
          </div>
        </div>
      </section>

      {/* <VideoSection /> */}

      {/* Support Section */}
      <SupportSection className="bg-white" />
    </div>
  );
}
