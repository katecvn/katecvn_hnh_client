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
import { ArrowRight, Users, TrendingUp, Shield, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AnimatedSection } from "@/components/animated-section";

export const metadata: Metadata = {
  title: "Sản phẩm - Katec | Giải pháp phần mềm doanh nghiệp",
  description:
    "Khám phá các sản phẩm công nghệ tiên tiến của Katec: ERP, CRM, AI Analytics, và nhiều giải pháp phần mềm doanh nghiệp khác.",
  keywords: "ERP, CRM, AI Analytics, phần mềm doanh nghiệp, hệ thống quản lý",
};

export default function ProductsPage() {
  const products = [
    {
      id: "erp",
      name: "Katec ERP",
      category: "Quản lý doanh nghiệp",
      description:
        "Hệ thống ERP toàn diện với AI tích hợp, quản lý mọi hoạt động doanh nghiệp từ kế toán đến nhân sự",
      features: [
        "Quản lý tài chính",
        "Nhân sự & Lương",
        "Kho bãi & Logistics",
        "Báo cáo thông minh",
      ],
      price: "Từ 2,000,000 VNĐ/tháng",
      image:
        "/placeholder.svg?height=300&width=500&query=ERP dashboard interface",
      badge: "Phổ biến",
      color: "blue",
    },
    {
      id: "crm",
      name: "Katec CRM 360°",
      category: "Quản lý khách hàng",
      description:
        "Nền tảng CRM thông minh giúp tăng doanh số và cải thiện trải nghiệm khách hàng",
      features: [
        "Quản lý Lead",
        "Tự động hóa Marketing",
        "Phân tích khách hàng",
        "Dự đoán doanh số",
      ],
      price: "Từ 1,500,000 VNĐ/tháng",
      image:
        "/placeholder.svg?height=300&width=500&query=CRM customer management dashboard",
      badge: "Mới",
      color: "purple",
    },
    {
      id: "ai-analytics",
      name: "AI Analytics Pro",
      category: "Phân tích dữ liệu",
      description:
        "Nền tảng phân tích dữ liệu với AI, cung cấp insights sâu sắc cho quyết định kinh doanh",
      features: [
        "Machine Learning",
        "Dự đoán xu hướng",
        "Báo cáo tự động",
        "Dashboard tương tác",
      ],
      price: "Từ 3,000,000 VNĐ/tháng",
      image:
        "/placeholder.svg?height=300&width=500&query=AI analytics dashboard with charts",
      badge: "Enterprise",
      color: "green",
    },
    {
      id: "hrms",
      name: "Katec HRMS",
      category: "Quản lý nhân sự",
      description:
        "Hệ thống quản lý nhân sự hiện đại với tính năng AI cho tuyển dụng và đánh giá",
      features: [
        "Tuyển dụng thông minh",
        "Quản lý hiệu suất",
        "Đào tạo & Phát triển",
        "Chấm công tự động",
      ],
      price: "Từ 1,200,000 VNĐ/tháng",
      image:
        "/placeholder.svg?height=300&width=500&query=HR management system interface",
      badge: "",
      color: "orange",
    },
    {
      id: "ecommerce",
      name: "E-Commerce Suite",
      category: "Thương mại điện tử",
      description:
        "Nền tảng thương mại điện tử toàn diện với tích hợp đa kênh và AI marketing",
      features: [
        "Website & Mobile App",
        "Quản lý đa kênh",
        "AI Recommendation",
        "Thanh toán đa dạng",
      ],
      price: "Từ 2,500,000 VNĐ/tháng",
      image:
        "/placeholder.svg?height=300&width=500&query=ecommerce platform dashboard",
      badge: "",
      color: "red",
    },
    {
      id: "security",
      name: "CyberShield Pro",
      category: "Bảo mật thông tin",
      description:
        "Giải pháp bảo mật toàn diện với AI phát hiện mối đe dọa và phản ứng tự động",
      features: [
        "Phát hiện mối đe dọa",
        "Firewall thông minh",
        "Backup tự động",
        "Giám sát 24/7",
      ],
      price: "Từ 1,800,000 VNĐ/tháng",
      image:
        "/placeholder.svg?height=300&width=500&query=cybersecurity dashboard interface",
      badge: "",
      color: "slate",
    },
  ];

  const getBadgeColor = (color: string) => {
    const colors = {
      blue: "bg-blue-600",
      purple: "bg-purple-600",
      green: "bg-green-600",
      orange: "bg-orange-600",
      red: "bg-red-600",
      slate: "bg-slate-600",
    };
    return colors[color as keyof typeof colors] || "bg-blue-600";
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container px-4 md:px-6">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4">
              Sản phẩm công nghệ
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Giải pháp phần mềm
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                doanh nghiệp
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Khám phá bộ sưu tập sản phẩm công nghệ tiên tiến được thiết kế đặc
              biệt cho doanh nghiệp Việt Nam
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                Tư vấn miễn phí
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Xem demo trực tiếp
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <AnimatedSection key={product.id} delay={index * 100}>
                <Card className="group hover:shadow-xl transition-all duration-300 h-full">
                  <div className="relative overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={500}
                      height={300}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className={getBadgeColor(product.color)}>
                        {product.category}
                      </Badge>
                      {product.badge && (
                        <Badge variant="secondary">{product.badge}</Badge>
                      )}
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{product.name}</CardTitle>
                    <CardDescription className="text-base">
                      {product.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <div className="space-y-2 mb-6">
                      {product.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-center text-sm text-gray-600"
                        >
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    <div className="mt-auto">
                      <div className="text-lg font-semibold text-blue-600 mb-4">
                        {product.price}
                      </div>
                      <div className="flex gap-2">
                        <Link
                          href={`/products/${product.id}`}
                          className="flex-1"
                        >
                          <Button className="w-full" variant="outline">
                            Chi tiết
                          </Button>
                        </Link>
                        <Link href="/contact" className="flex-1">
                          <Button className="w-full">Liên hệ</Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <AnimatedSection className="py-20 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Tính năng nổi bật
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tại sao chọn sản phẩm Katec?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Các sản phẩm của chúng tôi được thiết kế với công nghệ tiên tiến
              và tối ưu cho thị trường Việt Nam
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Triển khai nhanh</h3>
              <p className="text-gray-600">
                Cài đặt và vận hành trong vòng 1-2 tuần
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Dễ sử dụng</h3>
              <p className="text-gray-600">
                Giao diện thân thiện, đào tạo đơn giản
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Tăng hiệu quả</h3>
              <p className="text-gray-600">Cải thiện năng suất lên đến 40%</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Bảo mật cao</h3>
              <p className="text-gray-600">
                Tuân thủ tiêu chuẩn bảo mật quốc tế
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Sẵn sàng chuyển đổi số doanh nghiệp?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Liên hệ ngay để được tư vấn miễn phí và trải nghiệm demo sản phẩm
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Đặt lịch demo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              Tải brochure
            </Button>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
