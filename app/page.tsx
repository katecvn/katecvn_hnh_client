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
} from "lucide-react";
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

export default function HomePage() {
  const [showBackgrounds, setShowBackgrounds] = useState(false);
  const [isInitialRender, setIsInitialRender] = useState(true);

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
      <section className="py-20 bg-white relative">
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
            <TechProductCard
              title="Kafood - Quản lý suất ăn"
              description="Hệ thống quản lý suất ăn định lượng thông minh với báo cáo chi tiết và theo dõi dinh dưỡng tự động"
              image="/placeholder.svg?height=200&width=400&query=Food management dashboard"
              badge="Food Tech"
              badgeColor="bg-green-600"
              delay={100}
            />

            <TechProductCard
              title="EduKids - Quản lý mầm non"
              description="Phần mềm quản lý trường mầm non toàn diện với theo dõi học sinh, báo cáo phụ huynh và quản lý tài chính"
              image="/placeholder.svg?height=200&width=400&query=Kindergarten management system"
              badge="Education"
              badgeColor="bg-purple-600"
              delay={200}
            />

            <TechProductCard
              title="Smart Analytics"
              description="Hệ thống báo cáo và phân tích dữ liệu thông minh với dashboard trực quan và insights tự động"
              image="/placeholder.svg?height=200&width=400&query=Analytics dashboard reports"
              badge="Analytics"
              badgeColor="bg-tech-blue-600"
              delay={300}
            />

            <TechProductCard
              title="WebDesign Pro"
              description="Dịch vụ thiết kế website chuyên nghiệp với giao diện hiện đại, tối ưu SEO và mobile-responsive"
              image="/placeholder.svg?height=200&width=400&query=Modern website design"
              badge="Design"
              badgeColor="bg-orange-600"
              delay={400}
            />

            <TechProductCard
              title="TPOS Livestream"
              description="Hệ thống POS thông minh hỗ trợ chốt đơn livestream, quản lý inventory và thanh toán đa kênh"
              image="/placeholder.svg?height=200&width=400&query=POS livestream system"
              badge="E-commerce"
              badgeColor="bg-red-600"
              delay={500}
            />

            <TechProductCard
              title="Business Suite"
              description="Bộ giải pháp tổng thể cho doanh nghiệp với CRM, ERP và tools quản lý tích hợp hoàn chỉnh"
              image="/placeholder.svg?height=200&width=400&query=Business management suite"
              badge="Enterprise"
              badgeColor="bg-cyber-blue"
              delay={600}
            />
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
            <Reveal direction="up" delay={100}>
              <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center h-32">
                <div className="relative w-full h-16">
                  <Image
                    src="/placeholder.svg?height=80&width=160&query=Viettel logo"
                    alt="Viettel"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </Reveal>

            <Reveal direction="up" delay={200}>
              <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center h-32">
                <div className="relative w-full h-16">
                  <Image
                    src="/placeholder.svg?height=80&width=160&query=TMT Group logo"
                    alt="TMT Group"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </Reveal>

            <Reveal direction="up" delay={300}>
              <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center h-32">
                <div className="relative w-full h-16">
                  <Image
                    src="/placeholder.svg?height=80&width=160&query=PosApp logo"
                    alt="PosApp"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </Reveal>

            <Reveal direction="up" delay={400}>
              <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center h-32">
                <div className="relative w-full h-16">
                  <Image
                    src="/placeholder.svg?height=80&width=160&query=VietinBank logo"
                    alt="VietinBank"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </Reveal>

            <Reveal direction="up" delay={500}>
              <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center h-32">
                <div className="relative w-full h-16">
                  <Image
                    src="/placeholder.svg?height=80&width=160&query=VBI insurance logo"
                    alt="VBI"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </Reveal>

            <Reveal direction="up" delay={600}>
              <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center h-32">
                <div className="relative w-full h-16">
                  <Image
                    src="/placeholder.svg?height=80&width=160&query=HDBank logo"
                    alt="HDBank"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
      {/* Enhanced Contact Section */}
      <section className="py-20 bg-gradient-to-r from-navy-tech via-tech-blue-900 to-tech-blue-800 text-white relative overflow-hidden">
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
                  Contact Our AI Team
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  <HolographicText>
                    Sẵn sàng xây dựng tương lai AI?
                  </HolographicText>
                </h2>
                <p className="text-tech-blue-100 mb-8 text-lg leading-relaxed">
                  Hãy để chúng tôi giúp bạn chuyển đổi ý tưởng thành hiện thực
                  với các giải pháp AI và Cloud tiên tiến.
                </p>
                <div className="space-y-4">
                  {[
                    "Tư vấn AI & Cloud Strategy miễn phí",
                    "Thiết kế kiến trúc hệ thống tối ưu",
                    "Triển khai và monitoring 24/7",
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
