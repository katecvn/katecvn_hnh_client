import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  Users,
  Headphones,
  Globe,
  Facebook,
  Linkedin,
  Youtube,
} from "lucide-react";
import { AnimatedSection } from "@/components/animated-section";
import { ContactForm } from "@/components/contact-form";
import { OfficeMap } from "@/components/office-map";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Liên hệ - Katec | Tư vấn miễn phí giải pháp công nghệ",
  description:
    "Liên hệ với Katec để được tư vấn miễn phí về các giải pháp công nghệ thông tin. Văn phòng tại TP.HCM, Hà Nội và Đà Nẵng.",
  keywords: "liên hệ Katec, tư vấn IT, văn phòng công nghệ, hỗ trợ khách hàng",
};

export default function ContactPage() {
  const offices = [
    {
      city: "TP. Hồ Chí Minh",
      address: "123 Đường Nguyễn Huệ, Quận 1, TP.HCM",
      phone: "+84 28 1234 5678",
      email: "hcm@Katec.com",
      hours: "8:00 - 18:00 (T2-T6)",
      isMain: true,
      coordinates: { lat: 10.7769, lng: 106.7009 },
    },
    {
      city: "Hà Nội",
      address: "456 Phố Hoàn Kiếm, Quận Hoàn Kiếm, Hà Nội",
      phone: "+84 24 1234 5678",
      email: "hanoi@Katec.com",
      hours: "8:00 - 18:00 (T2-T6)",
      isMain: false,
      coordinates: { lat: 21.0285, lng: 105.8542 },
    },
    {
      city: "Đà Nẵng",
      address: "789 Đường Bạch Đằng, Quận Hải Châu, Đà Nẵng",
      phone: "+84 236 1234 567",
      email: "danang@Katec.com",
      hours: "8:00 - 18:00 (T2-T6)",
      isMain: false,
      coordinates: { lat: 16.0544, lng: 108.2022 },
    },
  ];

  const contactMethods = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Hotline 24/7",
      description: "Hỗ trợ khẩn cấp và tư vấn nhanh",
      contact: "1900 1234",
      action: "Gọi ngay",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email hỗ trợ",
      description: "Gửi yêu cầu chi tiết qua email",
      contact: "support@Katec.com",
      action: "Gửi email",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Live Chat",
      description: "Trò chuyện trực tiếp với chuyên gia",
      contact: "Trực tuyến 8:00-22:00",
      action: "Bắt đầu chat",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Đặt lịch hẹn",
      description: "Gặp mặt trực tiếp tại văn phòng",
      contact: "Linh hoạt theo lịch",
      action: "Đặt lịch",
      color: "bg-orange-100 text-orange-600",
    },
  ];

  const supportTeams = [
    {
      department: "Tư vấn bán hàng",
      description: "Tư vấn giải pháp và báo giá",
      phone: "+84 28 1234 5678",
      email: "sales@Katec.com",
      hours: "8:00 - 20:00 (T2-CN)",
    },
    {
      department: "Hỗ trợ kỹ thuật",
      description: "Hỗ trợ sản phẩm và dịch vụ",
      phone: "+84 28 1234 5679",
      email: "support@Katec.com",
      hours: "24/7",
    },
    {
      department: "Đối tác & Hợp tác",
      description: "Hợp tác kinh doanh và đối tác",
      phone: "+84 28 1234 5680",
      email: "partner@Katec.com",
      hours: "8:00 - 18:00 (T2-T6)",
    },
  ];

  const faqs = [
    {
      question: "Thời gian triển khai dự án thường là bao lâu?",
      answer:
        "Tùy thuộc vào quy mô dự án, thời gian triển khai từ 2-12 tuần. Chúng tôi sẽ đưa ra timeline chi tiết sau khi phân tích yêu cầu.",
    },
    {
      question: "Katec có hỗ trợ sau khi bàn giao không?",
      answer:
        "Có, chúng tôi cung cấp gói bảo hành và hỗ trợ từ 6-24 tháng tùy theo sản phẩm, bao gồm cả đào tạo sử dụng.",
    },
    {
      question: "Chi phí dự án được tính như thế nào?",
      answer:
        "Chi phí được tính dựa trên phạm vi công việc, công nghệ sử dụng và thời gian triển khai. Chúng tôi sẽ báo giá chi tiết sau khi tư vấn.",
    },
    {
      question: "Katec có làm việc với khách hàng ở tỉnh không?",
      answer:
        "Có, chúng tôi phục vụ khách hàng trên toàn quốc. Có thể làm việc remote hoặc cử team đến tại chỗ khi cần thiết.",
    },
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container px-4 md:px-6">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4">
              Liên hệ với chúng tôi
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Sẵn sàng hỗ trợ
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                24/7
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Đội ngũ chuyên gia của chúng tôi luôn sẵn sàng tư vấn và hỗ trợ
              bạn tìm ra giải pháp công nghệ tối ưu nhất cho doanh nghiệp.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                <Phone className="mr-2 h-4 w-4" />
                Gọi ngay: 1900 1234
              </Button>
              <Button size="lg" variant="outline">
                <MessageSquare className="mr-2 h-4 w-4" />
                Chat trực tuyến
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Methods */}
      <AnimatedSection className="py-20 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Cách thức liên hệ
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Chọn cách liên hệ phù hợp
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Chúng tôi cung cấp nhiều kênh liên hệ để bạn có thể dễ dàng tiếp
              cận và nhận được hỗ trợ nhanh chóng
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <Card className="group hover:shadow-xl transition-all duration-300 h-full">
                  <CardHeader className="text-center">
                    <div
                      className={`w-16 h-16 ${method.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      {method.icon}
                    </div>
                    <CardTitle className="text-lg">{method.title}</CardTitle>
                    <CardDescription>{method.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="font-medium text-gray-900 mb-4">
                      {method.contact}
                    </div>
                    <Button
                      variant="outline"
                      className="w-full group-hover:bg-blue-600 group-hover:text-white transition-colors"
                    >
                      {method.action}
                    </Button>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Contact Form & Map */}
      <section className="py-20 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <AnimatedSection>
              <div className="bg-white rounded-lg p-8 shadow-lg">
                <Badge variant="outline" className="mb-4">
                  Gửi yêu cầu
                </Badge>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Để lại thông tin liên hệ
                </h2>
                <p className="text-gray-600 mb-6">
                  Điền form bên dưới và chúng tôi sẽ liên hệ với bạn trong vòng
                  24 giờ để tư vấn chi tiết.
                </p>
                <ContactForm />
              </div>
            </AnimatedSection>

            {/* Map */}
            <AnimatedSection delay={200}>
              <div className="space-y-6">
                <div>
                  <Badge variant="outline" className="mb-4">
                    Vị trí văn phòng
                  </Badge>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    Tìm chúng tôi tại
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Với 3 văn phòng tại các thành phố lớn, chúng tôi luôn gần
                    bạn để hỗ trợ tốt nhất.
                  </p>
                </div>
                <OfficeMap offices={offices} />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <AnimatedSection className="py-20 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Văn phòng
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Hệ thống văn phòng toàn quốc
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Chúng tôi có mặt tại 3 thành phố lớn để phục vụ khách hàng tốt
              nhất
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {offices.map((office, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <Card
                  className={`hover:shadow-xl transition-all duration-300 h-full ${
                    office.isMain ? "ring-2 ring-blue-200" : ""
                  }`}
                >
                  {office.isMain && (
                    <div className="bg-blue-600 text-white text-center py-2 text-sm font-medium rounded-t-lg">
                      Trụ sở chính
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl">
                      <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                      {office.city}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-4 w-4 mt-1 text-gray-400" />
                      <span className="text-gray-600">{office.address}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">{office.phone}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">{office.email}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">{office.hours}</span>
                    </div>
                    <div className="pt-4">
                      <Button variant="outline" className="w-full">
                        Xem bản đồ
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Support Teams */}
      <AnimatedSection className="py-20 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Đội ngũ hỗ trợ
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Liên hệ trực tiếp theo bộ phận
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Mỗi bộ phận có chuyên môn riêng để hỗ trợ bạn một cách hiệu quả
              nhất
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {supportTeams.map((team, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <Card className="hover:shadow-lg transition-shadow h-full">
                  <CardHeader>
                    <CardTitle className="text-lg">{team.department}</CardTitle>
                    <CardDescription>{team.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Phone className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">{team.phone}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">{team.email}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <span className="text-gray-600">{team.hours}</span>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* FAQ Section */}
      <AnimatedSection className="py-20 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Câu hỏi thường gặp
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Có thể bạn quan tâm
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Một số câu hỏi thường gặp từ khách hàng về dịch vụ của chúng tôi
            </p>
          </div>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg text-left">
                      {faq.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{faq.answer}</p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Không tìm thấy câu trả lời bạn cần?
            </p>
            <Button>
              <MessageSquare className="mr-2 h-4 w-4" />
              Đặt câu hỏi khác
            </Button>
          </div>
        </div>
      </AnimatedSection>

      {/* Social & Emergency Contact */}
      <AnimatedSection className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge
                variant="outline"
                className="mb-4 border-white/20 text-white"
              >
                Kết nối với chúng tôi
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Theo dõi Katec
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Kết nối với chúng tôi trên các mạng xã hội để cập nhật tin tức
                công nghệ mới nhất và các ưu đãi đặc biệt.
              </p>
              <div className="flex space-x-4">
                <Button variant="secondary" size="lg">
                  <Facebook className="h-5 w-5 mr-2" />
                  Facebook
                </Button>
                <Button variant="secondary" size="lg">
                  <Linkedin className="h-5 w-5 mr-2" />
                  LinkedIn
                </Button>
                <Button variant="secondary" size="lg">
                  <Youtube className="h-5 w-5 mr-2" />
                  YouTube
                </Button>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
              <div className="flex items-center mb-4">
                <Headphones className="h-6 w-6 mr-3" />
                <h3 className="text-xl font-semibold">Hỗ trợ khẩn cấp</h3>
              </div>
              <p className="mb-6 opacity-90">
                Dành cho khách hàng đang sử dụng dịch vụ và cần hỗ trợ khẩn cấp
                ngoài giờ hành chính.
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-3" />
                  <span className="font-medium">Hotline 24/7: 1900 1234</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-3" />
                  <span className="font-medium">emergency@Katec.com</span>
                </div>
                <div className="flex items-center">
                  <Globe className="h-4 w-4 mr-3" />
                  <span className="font-medium">Remote Support Portal</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
