"use client";

import { Badge } from "@/components/ui/badge";
import {
  Code,
  Database,
  Globe,
  Award,
  TrendingUp,
  Zap,
  Shield,
  Cpu,
  Cloud,
  Briefcase,
  School,
  ShieldCheck,
  ShoppingCart,
  Server,
  Video,
  Printer,
  Lock,
  Newspaper,
} from "lucide-react";
// import { ContactForm } from "@/components/contact-form";
import { ContactForm } from "@/components/contact-form";
import { EnhancedHero } from "@/components/enhanced-hero";
import {
  EnhancedCard,
  StatsCard,
  FeatureCard,
  TechProductCard,
} from "@/components/enhanced-cards";
import { Reveal } from "@/components/enhanced-animations";
import {
  HolographicText,
  TechGrid,
  CircuitBoard,
} from "@/components/tech-blue-animations";
import { useState, useEffect } from "react";
import Image from "next/image";
import api from "@/utils/axios";

export default function HomePage() {
  const [showBackgrounds, setShowBackgrounds] = useState(false);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [partners, setPartners] = useState([]);
  const [news, setNews] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  });

  useEffect(() => {
    fetchProducts();
    fetchPartners();
    fetchNews();
  }, []);

  useEffect(() => {
    // Delay loading background elements
    const timer1 = setTimeout(() => {
      setShowBackgrounds(true);
    }, 800);

    // Delay enabling animations
    const timer2 = setTimeout(() => {
      setIsInitialRender(false);
    }, 1200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const getRandomColor = () => {
    const colors = ["blue", "purple", "green", "orange", "red", "slate"];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  const fetchProducts = async (page = 1, limit = 10, categoryId = null) => {
    try {
      setLoading(true);
      setError(null);

      let url = `/product/public/shows?page=${page}&limit=${limit}`;
      if (categoryId && categoryId !== "all") {
        url += `&category_id=${categoryId}`;
      }

      const response = await api.get(url);
      const { data } = response.data;

      // Transform API data to match component structure
      const transformedProducts = data.products.map((product: any) => ({
        id: product.id,
        name: product.name,
        category: product.category?.name || "Sản phẩm",
        slug: product.slug,
        description: product.content
          ? product.content.replace(/<[^>]*>/g, "").substring(0, 150) + "..."
          : "Mô tả sản phẩm",
        features: [
          `SKU: ${product.sku}`,
          `Đơn vị: ${product.unit}`,
          product.brand?.name
            ? `Thương hiệu: ${product.brand.name}`
            : "Sản phẩm chất lượng",
          product.isFeatured ? "Sản phẩm nổi bật" : "Giải pháp chuyên nghiệp",
        ],
        price: product.salePrice
          ? `${parseInt(product.salePrice).toLocaleString("vi-VN")} VNĐ`
          : "Liên hệ để biết giá",
        originalPrice: product.originalPrice,
        image: product.imagesUrl
          ? JSON.parse(JSON.parse(product.imagesUrl))[0] ||
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop"
          : "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop",
        badge: product.isFeatured ? "Nổi bật" : "",
        color: getRandomColor(),

        stock: product.stock,
      }));

      setProducts(transformedProducts);
      setPagination({
        totalItems: data.totalItems || 0,
        totalPages: data.totalPages || 1,
        currentPage: data.currentPage || 1,
      });
    } catch (error) {
      console.error("Error fetching products:", error);
      const message =
        error.response?.data?.message ||
        error.message ||
        "Không thể tải danh sách sản phẩm";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const fetchPartners = async () => {
    try {
      const response = await api.get(
        "/page-section/public/shows?sectionType=partner"
      );
      const { data } = response.data;
      setPartners(data || []);
    } catch (error) {
      console.error("Error fetching partners:", error);
    }
  };

  const fetchNews = async (page = 1, limit = 3) => {
    try {
      const response = await api.get(
        `/post/public/shows?page=${page}&limit=${limit}`
      );
      const { data } = response.data;
      setNews(data?.posts || []);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section */}

      <EnhancedHero />
      {/* Enhanced Stats Section */}

      {/* Enhanced Services Section */}
      <section className="py-20 bg-gradient-to-br from-tech-blue-50 to-white relative overflow-hidden">
        {showBackgrounds && <CircuitBoard />}

        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <HolographicText>
              Giải pháp công nghệ toàn diện cho doanh nghiệp & tổ chức
            </HolographicText>
          </h2>
          <p className="text-tech-blue-700 max-w-3xl mx-auto">
            Chúng tôi cung cấp đa dạng dịch vụ công nghệ từ thiết kế website
            chuyên nghiệp đến phát triển hệ thống quản lý dành riêng cho doanh
            nghiệp, tổ chức, trường học và đài truyền hình.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 container px-4 md:px-6 relative z-1">
          <EnhancedCard
            title="Thiết kế Website"
            description="Tạo dựng website hiện đại, tối ưu SEO và tương thích thiết bị di động"
            features={[
              "Website doanh nghiệp",
              "Landing Page",
              "E-commerce",
              "Responsive UI",
            ]}
            icon={<Globe className="h-6 w-6" />}
          />
          <EnhancedCard
            title="Hệ thống quản lý doanh nghiệp"
            description="Tối ưu quy trình nội bộ, quản lý nhân sự, khách hàng, tài chính"
            features={[
              "CRM",
              "ERP",
              "Báo cáo tự động",
              "Phân quyền người dùng",
            ]}
            icon={<Briefcase className="h-6 w-6" />}
          />
          <EnhancedCard
            title="Giải pháp quản lý cho đài truyền hình"
            description="Triển khai hệ thống hỗ trợ quản lý nội dung, hợp đồng bản quyền và xử lý yêu cầu liên quan đến chương trình"
            features={[
              "Quản lý chương trình và lịch phát sóng",
              "Tự động hóa quy trình sản xuất và phân phối",
              "Bảo mật thông tin và dữ liệu bản quyền",
            ]}
            icon={<ShieldCheck className="h-6 w-6" />}
          />

          <EnhancedCard
            title="Quản lý trường học & mầm non"
            description="Giải pháp số hóa trường học: điểm danh, học phí, sổ liên lạc điện tử"
            features={[
              "Hệ thống mầm non",
              "Trường tư thục",
              "Ứng dụng phụ huynh",
            ]}
            icon={<School className="h-6 w-6" />}
          />
          <EnhancedCard
            title="Thương mại điện tử"
            description="Xây dựng nền tảng bán hàng trực tuyến, tích hợp thanh toán và vận chuyển"
            features={["Giỏ hàng", "Thanh toán online", "Quản lý tồn kho"]}
            icon={<ShoppingCart className="h-6 w-6" />}
          />
          <EnhancedCard
            title="Hosting & Hạ tầng"
            description="Cung cấp hosting tốc độ cao, bảo mật và hỗ trợ kỹ thuật 24/7"
            features={["Hosting SSD", "Domain", "Sao lưu dữ liệu"]}
            icon={<Server className="h-6 w-6" />}
          />
          <EnhancedCard
            title="Quản lý bán hàng qua livestream"
            description="Hỗ trợ chốt đơn, theo dõi đơn hàng và tương tác với khách hàng trong suốt buổi livestream"
            features={[
              "Lên lịch và quản lý phiên livestream",
              "Tích hợp đa nền tảng (Facebook, TikTok...)",
              "Tự động chốt đơn và phản hồi người xem",
            ]}
            icon={<Video className="h-6 w-6" />}
          />

          <EnhancedCard
            title="Giải pháp in ấn"
            description="Kết nối và điều phối máy in, quản lý số lượng và chi phí in hiệu quả"
            features={[
              "Theo dõi máy in",
              "Báo cáo in ấn",
              "Tích hợp hệ thống nội bộ",
            ]}
            icon={<Printer className="h-6 w-6" />}
          />
        </div>
      </section>
      <section className="py-20 bg-gradient-to-r from-tech-blue-50 via-white to-cyber-blue/10 relative">
        {showBackgrounds && <TechGrid />}
        <div className="container px-4 md:px-6 relative z-10">
          <Reveal direction="up" skipAnimation={isInitialRender}>
            <div className="text-center mb-12">
              <Badge
                variant="outline"
                className="mb-4 animate-tech-pulse border-tech-blue-500 text-tech-blue-600"
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Thành tựu công nghệ
              </Badge>
              <h2 className="text-3xl font-bold mb-4">
                <HolographicText>Những con số ấn tượng</HolographicText>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatsCard
              value="300+"
              label="Dự án Web & Hệ thống"
              icon={<Cpu className="h-8 w-8" />}
              // trend={15}
              delay={100}
            />
            <StatsCard
              value="120+"
              label="Khách hàng Doanh nghiệp"
              icon={<Briefcase className="h-8 w-8" />}
              // trend={22}
              delay={200}
            />
            <StatsCard
              value="60+"
              label="Hệ thống Mầm non"
              icon={<School className="h-8 w-8" />}
              // trend={10}
              delay={300}
            />
            <StatsCard
              value="24/7"
              label="Hỗ trợ & Giám sát"
              icon={<ShieldCheck className="h-8 w-8" />}
              delay={400}
            />
          </div>
        </div>
      </section>
      {/* Enhanced Featured Products */}
      <section className="py-20 bg-white relative" id="products">
        <div className="container px-4 md:px-6">
          <Reveal direction="up" skipAnimation={isInitialRender}>
            <div className="text-center mb-16">
              <Badge
                variant="outline"
                className="mb-4 border-tech-blue-500 text-tech-blue-600"
              >
                <Award className="h-4 w-4 mr-2" />
                Sản phẩm công nghệ
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <HolographicText>Giải pháp công nghệ toàn diện</HolographicText>
              </h2>
              <p className="text-tech-blue-700 max-w-2xl mx-auto">
                Phần mềm quản lý chuyên nghiệp cho doanh nghiệp, giáo dục và
                thương mại điện tử
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products?.map((product: any, index: number) => {
              const nameC = product?.category?.name || null;
              return (
                <TechProductCard
                  key={product.id || index}
                  title={product.name}
                  description={product.description}
                  image={product.image}
                  badge={product?.category}
                  badgeColor="bg-green-600"
                  delay={index * 100}
                  link={product.slug}
                />
              );
            })}
          </div>
        </div>
      </section>
      {/* Enhanced Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-tech-blue-50 to-cyber-blue/10 relative overflow-hidden">
        {showBackgrounds && <TechGrid />}

        <div className="container px-4 md:px-6 relative z-10">
          <Reveal direction="up" skipAnimation={isInitialRender}>
            <div className="text-center mb-16">
              <Badge
                variant="outline"
                className="mb-4 border-tech-blue-500 text-tech-blue-600"
              >
                <Shield className="h-4 w-4 mr-2" />
                Đối tác của chúng tôi
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <HolographicText>Đối tác tiêu biểu</HolographicText>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto mb-4">
                Chúng tôi tự hào là đối tác công nghệ tin cậy của các tập đoàn
                và tổ chức hàng đầu Việt Nam
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {partners?.map((partner, index) => (
              <Reveal direction="up" delay={index * 100} key={partner.id}>
                <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center h-32">
                  <div className="relative w-full h-16">
                    <Image
                      src={partner?.content[0]?.imageUrl || "/placeholder.svg"}
                      alt={partner?.content[0]?.title || `Partner ${index + 1}`}
                      layout="fill"
                      className="object-contain"
                    />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      {/* News Section */}
      <section className="py-20 bg-white relative">
        <div className="container px-4 md:px-6">
          <Reveal direction="up" skipAnimation={isInitialRender}>
            <div className="text-center mb-16">
              <Badge
                variant="outline"
                className="mb-4 border-tech-blue-500 text-tech-blue-600"
              >
                <Newspaper className="h-4 w-4 mr-2" />
                Tin tức & Sự kiện
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <HolographicText>Tin tức công nghệ mới nhất</HolographicText>
              </h2>
              <p className="text-tech-blue-700 max-w-2xl mx-auto">
                Cập nhật những tin tức, xu hướng công nghệ mới nhất trong ngành
              </p>
            </div>
          </Reveal>
          {console.log(news, "mews")}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news?.map((post, index) => (
              <TechProductCard
                key={post.id || index}
                title={post.title}
                description={
                  post.short_description ||
                  post.short_description?.substring(0, 150) + "..."
                }
                image={post.thumbnail || "/placeholder.svg"}
                badge={post.topics[0]?.name || "Tin tức"}
                badgeColor="bg-blue-600"
                delay={index * 100}
                link={`/news/${post.slug}`}
              />
            ))}
          </div>
        </div>
      </section>
      {/* Enhanced Contact Section */}
      <section className="py-20 bg-gradient-to-r from-navy-tech via-tech-blue-900 to-tech-blue-800 text-white relative overflow-hidden" id="contact">
        {showBackgrounds && <CircuitBoard />}

        <div className="container px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal direction="left" skipAnimation={isInitialRender}>
              <div>
                <Badge
                  variant="outline"
                  className="mb-4 border-tech-blue-400/30 text-tech-blue-100 animate-tech-pulse"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Đối tác công nghệ của bạn
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  <HolographicText>
                    Sẵn sàng nâng cấp doanh nghiệp bằng công nghệ?
                  </HolographicText>
                </h2>
                <p className="text-tech-blue-100 mb-8 text-lg leading-relaxed">
                  Dù bạn đang cần giải pháp AI, nền tảng Cloud, hay một website
                  ấn tượng – đội ngũ của chúng tôi sẽ đồng hành từ ý tưởng đến
                  triển khai.
                </p>
                <div className="space-y-4">
                  {[
                    "Thiết kế giao diện UI/UX hiện đại, chuẩn SEO",
                    "Xây dựng website & hệ thống web app tùy biến",
                    "Triển khai giải pháp AI, Cloud & giám sát vận hành",
                  ].map((step, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 group"
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-tech-blue-600 to-cyber-blue rounded-full flex items-center justify-center group-hover:scale-110 transition-transform animate-tech-pulse">
                        <span className="text-sm font-bold">{index + 1}</span>
                      </div>
                      <span className="group-hover:text-cyber-blue transition-colors">
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal direction="right" skipAnimation={isInitialRender}>
              <div className="glass-tech rounded-lg p-8 border border-tech-blue-400/20">
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
