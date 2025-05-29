import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Tin tức - Katec | Cập nhật công nghệ và xu hướng IT",
  description:
    "Theo dõi tin tức công nghệ mới nhất, xu hướng IT, case study và insights từ các chuyên gia Katec.",
  keywords:
    "tin tức công nghệ, xu hướng IT, chuyển đổi số, AI, blockchain, cloud computing",
};

export default function NewsPage() {
  const featuredNews = {
    title: "Xu hướng AI và Machine Learning sẽ thống trị năm 2024",
    excerpt:
      "Phân tích sâu về những xu hướng công nghệ AI mới nhất và tác động đến doanh nghiệp Việt Nam trong năm 2024...",
    image:
      "/placeholder.svg?height=400&width=800&query=AI technology trends 2024 futuristic",
    category: "Công nghệ",
    date: "15/12/2024",
    author: "Nguyễn Văn A",
    readTime: "8 phút đọc",
  };

  const newsCategories = [
    { name: "Tất cả", count: 156, active: true },
    { name: "Công nghệ", count: 45 },
    { name: "Chuyển đổi số", count: 32 },
    { name: "Case Study", count: 28 },
    { name: "Xu hướng", count: 25 },
    { name: "Bảo mật", count: 18 },
    { name: "AI & ML", count: 8 },
  ];

  const newsList = [
    {
      id: 1,
      title: "Chuyển đổi số thành công tại Tập đoàn ABC: Tăng 40% hiệu quả",
      excerpt:
        "Câu chuyện thành công về việc triển khai giải pháp ERP toàn diện tại một trong những tập đoàn lớn nhất Việt Nam...",
      image:
        "/placeholder.svg?height=200&width=400&query=digital transformation success story",
      category: "Case Study",
      date: "12/12/2024",
      author: "Trần Thị B",
      readTime: "6 phút đọc",
    },
    {
      id: 2,
      title: "5 nguyên tắc bảo mật thông tin cơ bản cho doanh nghiệp",
      excerpt:
        "Hướng dẫn chi tiết về các nguyên tắc bảo mật cơ bản mà mọi doanh nghiệp cần áp dụng để bảo vệ dữ liệu...",
      image:
        "/placeholder.svg?height=200&width=400&query=cybersecurity best practices",
      category: "Bảo mật",
      date: "10/12/2024",
      author: "Lê Văn C",
      readTime: "5 phút đọc",
    },
    {
      id: 3,
      title: "Cloud Computing: Xu hướng không thể bỏ qua trong 2024",
      excerpt:
        "Phân tích về sự phát triển của điện toán đám mây và lợi ích mang lại cho doanh nghiệp vừa và nhỏ...",
      image:
        "/placeholder.svg?height=200&width=400&query=cloud computing technology",
      category: "Xu hướng",
      date: "08/12/2024",
      author: "Phạm Thị D",
      readTime: "7 phút đọc",
    },
    {
      id: 4,
      title: "Blockchain trong quản lý chuỗi cung ứng: Cơ hội và thách thức",
      excerpt:
        "Khám phá tiềm năng ứng dụng công nghệ blockchain trong việc tối ưu hóa chuỗi cung ứng doanh nghiệp...",
      image:
        "/placeholder.svg?height=200&width=400&query=blockchain supply chain management",
      category: "Công nghệ",
      date: "05/12/2024",
      author: "Hoàng Văn E",
      readTime: "9 phút đọc",
    },
    {
      id: 5,
      title: "IoT và Industry 4.0: Cách mạng trong sản xuất thông minh",
      excerpt:
        "Tìm hiểu về Internet of Things và cách nó đang thay đổi ngành sản xuất với các giải pháp thông minh...",
      image:
        "/placeholder.svg?height=200&width=400&query=IoT Industry 4.0 smart manufacturing",
      category: "Công nghệ",
      date: "03/12/2024",
      author: "Vũ Thị F",
      readTime: "6 phút đọc",
    },
    {
      id: 6,
      title: "Tối ưu hóa hiệu suất website: 10 tips từ chuyên gia",
      excerpt:
        "Chia sẻ những kinh nghiệm thực tế về cách tối ưu hóa hiệu suất website để cải thiện trải nghiệm người dùng...",
      image:
        "/placeholder.svg?height=200&width=400&query=website performance optimization",
      category: "Công nghệ",
      date: "01/12/2024",
      author: "Đặng Văn G",
      readTime: "8 phút đọc",
    },
  ];

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
                  <Button className="w-fit">
                    Đọc bài viết
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </AnimatedSection>
        </div>
      </section>

      {/* Categories and News List */}
      <section className="py-20 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Categories Sidebar */}
            <AnimatedSection className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Danh mục
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {newsCategories.map((category) => (
                    <div
                      key={category.name}
                      className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                        category.active
                          ? "bg-blue-100 text-blue-700"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <span className="font-medium">{category.name}</span>
                      <Badge variant="secondary">{category.count}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Newsletter Signup */}
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

            {/* News Grid */}
            <div className="lg:col-span-3">
              <div className="grid md:grid-cols-2 gap-8">
                {newsList.map((article, index) => (
                  <AnimatedSection key={article.id} delay={index * 100}>
                    <Card className="group hover:shadow-xl transition-all duration-300 h-full">
                      <div className="relative overflow-hidden">
                        <Image
                          src={article.image || "/placeholder.svg"}
                          alt={article.title}
                          width={400}
                          height={200}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-white/90 text-gray-900">
                            {article.category}
                          </Badge>
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle className="line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {article.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-3">
                          {article.excerpt}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="mt-auto">
                        <div className="flex items-center text-sm text-gray-500 mb-4">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span className="mr-4">{article.date}</span>
                          <User className="h-4 w-4 mr-2" />
                          <span className="mr-4">{article.author}</span>
                          <span>{article.readTime}</span>
                        </div>
                        <Link href={`/news/${article.id}`}>
                          <Button
                            variant="outline"
                            className="w-full group-hover:bg-blue-600 group-hover:text-white transition-colors"
                          >
                            Đọc thêm
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </AnimatedSection>
                ))}
              </div>

              {/* Pagination */}
              <AnimatedSection className="mt-12 flex justify-center">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" disabled>
                    Trước
                  </Button>
                  <Button className="bg-blue-600">1</Button>
                  <Button variant="outline">2</Button>
                  <Button variant="outline">3</Button>
                  <Button variant="outline">Sau</Button>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
