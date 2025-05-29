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
import {
  ArrowRight,
  MapPin,
  Clock,
  Users,
  Heart,
  Zap,
  Coffee,
  Gamepad2,
} from "lucide-react";
import { AnimatedSection } from "@/components/animated-section";

export const metadata: Metadata = {
  title: "Tuyển dụng - Katec | Cơ hội nghề nghiệp trong lĩnh vực IT",
  description:
    "Tham gia đội ngũ Katec - Môi trường làm việc năng động, cơ hội phát triển và mức lương cạnh tranh trong lĩnh vực công nghệ thông tin.",
  keywords:
    "tuyển dụng IT, việc làm công nghệ, developer jobs, career opportunities",
};

export default function CareersPage() {
  const benefits = [
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Bảo hiểm toàn diện",
      description: "Bảo hiểm y tế, xã hội và tai nạn cho bản thân và gia đình",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Phát triển kỹ năng",
      description:
        "Đào tạo nâng cao, tham gia conference và khóa học chuyên sâu",
    },
    {
      icon: <Coffee className="h-6 w-6" />,
      title: "Môi trường thoải mái",
      description:
        "Văn phòng hiện đại, snack & coffee miễn phí, không gian thư giãn",
    },
    {
      icon: <Gamepad2 className="h-6 w-6" />,
      title: "Work-life balance",
      description:
        "Flexible working time, remote work, team building thường xuyên",
    },
  ];

  const openPositions = [
    {
      title: "Senior Full-stack Developer",
      department: "Engineering",
      location: "TP.HCM",
      type: "Full-time",
      experience: "3+ năm",
      salary: "25-40 triệu VNĐ",
      description:
        "Phát triển và maintain các ứng dụng web sử dụng React, Node.js và cloud technologies.",
      requirements: [
        "React/Next.js",
        "Node.js",
        "TypeScript",
        "AWS/Azure",
        "Database design",
      ],
    },
    {
      title: "AI/ML Engineer",
      department: "AI Research",
      location: "TP.HCM",
      type: "Full-time",
      experience: "2+ năm",
      salary: "30-50 triệu VNĐ",
      description:
        "Nghiên cứu và phát triển các mô hình AI/ML cho các sản phẩm của công ty.",
      requirements: [
        "Python",
        "TensorFlow/PyTorch",
        "Machine Learning",
        "Deep Learning",
        "Data Science",
      ],
    },
    {
      title: "DevOps Engineer",
      department: "Infrastructure",
      location: "TP.HCM",
      type: "Full-time",
      experience: "2+ năm",
      salary: "22-35 triệu VNĐ",
      description:
        "Quản lý infrastructure, CI/CD pipeline và monitoring systems.",
      requirements: [
        "Docker",
        "Kubernetes",
        "AWS/Azure",
        "CI/CD",
        "Monitoring tools",
      ],
    },
    {
      title: "UX/UI Designer",
      department: "Design",
      location: "TP.HCM",
      type: "Full-time",
      experience: "2+ năm",
      salary: "18-30 triệu VNĐ",
      description:
        "Thiết kế giao diện người dùng cho web và mobile applications.",
      requirements: [
        "Figma",
        "Adobe Creative Suite",
        "User Research",
        "Prototyping",
        "Design Systems",
      ],
    },
    {
      title: "Product Manager",
      department: "Product",
      location: "TP.HCM",
      type: "Full-time",
      experience: "3+ năm",
      salary: "28-45 triệu VNĐ",
      description: "Quản lý lifecycle của sản phẩm từ ý tưởng đến triển khai.",
      requirements: [
        "Product Strategy",
        "Agile/Scrum",
        "Data Analysis",
        "User Research",
        "Technical Background",
      ],
    },
    {
      title: "Mobile Developer (React Native)",
      department: "Engineering",
      location: "TP.HCM",
      type: "Full-time",
      experience: "2+ năm",
      salary: "20-32 triệu VNĐ",
      description:
        "Phát triển ứng dụng mobile cross-platform sử dụng React Native.",
      requirements: [
        "React Native",
        "JavaScript/TypeScript",
        "iOS/Android",
        "Redux",
        "API Integration",
      ],
    },
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container px-4 md:px-6">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4">
              Tuyển dụng
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Gia nhập đội ngũ
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                Katec
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Cùng chúng tôi xây dựng tương lai công nghệ. Môi trường làm việc
              năng động, cơ hội phát triển không giới hạn và đồng nghiệp tuyệt
              vời.
            </p>
            <Button size="lg">
              Xem vị trí tuyển dụng
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* Benefits */}
      <AnimatedSection className="py-20 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Quyền lợi
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tại sao chọn Katec?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Chúng tôi cam kết tạo ra môi trường làm việc tốt nhất để bạn có
              thể phát triển sự nghiệp
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <Card className="text-center hover:shadow-lg transition-shadow h-full">
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <div className="text-blue-600">{benefit.icon}</div>
                    </div>
                    <CardTitle className="text-lg">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{benefit.description}</CardDescription>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Open Positions */}
      <AnimatedSection className="py-20 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Vị trí tuyển dụng
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Cơ hội nghề nghiệp
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Khám phá các vị trí đang tuyển dụng và tìm cơ hội phù hợp với bạn
            </p>
          </div>
          <div className="grid gap-6">
            {openPositions.map((position, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <Card className="hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <CardTitle className="text-xl mb-2">
                          {position.title}
                        </CardTitle>
                        <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {position.department}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {position.location}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {position.type}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-blue-600">
                          {position.salary}
                        </div>
                        <div className="text-sm text-gray-600">
                          {position.experience}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4 text-base">
                      {position.description}
                    </CardDescription>
                    <div className="mb-6">
                      <h4 className="font-medium mb-2">Yêu cầu:</h4>
                      <div className="flex flex-wrap gap-2">
                        {position.requirements.map((req, idx) => (
                          <Badge key={idx} variant="secondary">
                            {req}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1">
                        Ứng tuyển ngay
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                      <Button variant="outline">Chi tiết</Button>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* CTA */}
      <AnimatedSection className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Không tìm thấy vị trí phù hợp?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Gửi CV của bạn cho chúng tôi. Chúng tôi sẽ liên hệ khi có cơ hội phù
            hợp.
          </p>
          <Button size="lg" variant="secondary">
            Gửi CV tự do
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </AnimatedSection>
    </div>
  );
}
