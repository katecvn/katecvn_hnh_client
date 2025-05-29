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

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section */}
      <EnhancedHero />
      {/* Enhanced Stats Section */}
      <section className="py-20 bg-gradient-to-r from-tech-blue-50 via-white to-cyber-blue/10 relative">
        <TechGrid />
        <div className="container px-4 md:px-6 relative z-10">
          <Reveal direction="up">
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
              value="500+"
              label="AI Projects"
              icon={<Cpu className="h-8 w-8" />}
              trend={12}
              delay={100}
            />
            <StatsCard
              value="200+"
              label="Cloud Solutions"
              icon={<Cloud className="h-8 w-8" />}
              trend={25}
              delay={200}
            />
            <StatsCard
              value="50+"
              label="Tech Experts"
              icon={<Code className="h-8 w-8" />}
              trend={8}
              delay={300}
            />
            <StatsCard
              value="99.9%"
              label="Security Level"
              icon={<Lock className="h-8 w-8" />}
              delay={400}
            />
          </div>
        </div>
      </section>
      {/* Enhanced Services Section */}
      <section className="py-20 bg-gradient-to-br from-tech-blue-50 to-white relative overflow-hidden">
        <CircuitBoard />

        <div className="container px-4 md:px-6 relative z-10">
          <Reveal direction="up">
            <div className="text-center mb-16">
              <Badge
                variant="outline"
                className="mb-4 border-tech-blue-500 text-tech-blue-600 animate-tech-pulse"
              >
                <Zap className="h-4 w-4 mr-2" />
                Tech Solutions
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <HolographicText>
                  Giải pháp công nghệ AI toàn diện
                </HolographicText>
              </h2>
              <p className="text-tech-blue-700 max-w-2xl mx-auto">
                Từ AI & Machine Learning đến Cloud Computing, chúng tôi cung cấp
                đầy đủ các dịch vụ công nghệ hiện đại
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <EnhancedCard
              title="AI & Machine Learning"
              description="Phát triển các giải pháp AI thông minh với deep learning và neural networks"
              icon={<Cpu className="h-6 w-6" />}
              color="bg-tech-blue-100"
              delay={100}
              badge="Hot"
              features={[
                "Deep Learning",
                "Computer Vision",
                "NLP Processing",
                "Predictive Analytics",
              ]}
            />
            <EnhancedCard
              title="Cloud Computing"
              description="Triển khai và quản lý hạ tầng cloud với độ tin cậy và bảo mật cao"
              icon={<Cloud className="h-6 w-6" />}
              color="bg-cyber-blue/20"
              delay={200}
              badge="Trending"
              features={[
                "AWS/Azure/GCP",
                "Kubernetes",
                "Microservices",
                "DevOps",
              ]}
            />
            <EnhancedCard
              title="Blockchain Technology"
              description="Xây dựng các ứng dụng blockchain và smart contracts an toàn"
              icon={<Database className="h-6 w-6" />}
              color="bg-electric-blue/20"
              delay={300}
              features={[
                "Smart Contracts",
                "DeFi Solutions",
                "NFT Platforms",
                "Crypto Wallets",
              ]}
            />
            <EnhancedCard
              title="IoT Solutions"
              description="Phát triển hệ thống IoT thông minh cho Industry 4.0"
              icon={<Globe className="h-6 w-6" />}
              color="bg-neon-blue/20"
              delay={400}
              badge="Innovation"
              features={[
                "Sensor Networks",
                "Edge Computing",
                "Real-time Analytics",
                "Industrial IoT",
              ]}
            />
            <EnhancedCard
              title="Cybersecurity"
              description="Bảo vệ hệ thống với các giải pháp bảo mật tiên tiến và AI"
              icon={<Shield className="h-6 w-6" />}
              color="bg-steel-blue/20"
              delay={500}
              badge="Critical"
              features={[
                "AI Security",
                "Threat Detection",
                "Zero Trust",
                "Compliance",
              ]}
            />
            <EnhancedCard
              title="Quantum Computing"
              description="Nghiên cứu và ứng dụng công nghệ quantum cho tương lai"
              icon={<Zap className="h-6 w-6" />}
              color="bg-tech-blue-200"
              delay={600}
              badge="Future"
              features={[
                "Quantum Algorithms",
                "Cryptography",
                "Optimization",
                "Research",
              ]}
            />
          </div>
        </div>
      </section>
      {/* Enhanced Featured Products */}
      <section className="py-20 bg-white relative">
        <div className="container px-4 md:px-6">
          <Reveal direction="up">
            <div className="text-center mb-16">
              <Badge
                variant="outline"
                className="mb-4 border-tech-blue-500 text-tech-blue-600"
              >
                <Award className="h-4 w-4 mr-2" />
                Tech Products
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <HolographicText>Sản phẩm công nghệ hàng đầu</HolographicText>
              </h2>
              <p className="text-tech-blue-700 max-w-2xl mx-auto">
                Khám phá các sản phẩm AI và Cloud được phát triển bởi đội ngũ
                chuyên gia của chúng tôi
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TechProductCard
              title="AI ERP System"
              description="Hệ thống ERP thông minh với AI tích hợp cho quản lý doanh nghiệp"
              image="/placeholder.svg?height=200&width=400&query=AI ERP dashboard"
              badge="AI"
              badgeColor="bg-tech-blue-600"
              delay={100}
            />
            <TechProductCard
              title="Cloud CRM Platform"
              description="Nền tảng CRM cloud với analytics và automation thông minh"
              image="/placeholder.svg?height=200&width=400&query=Cloud CRM interface"
              badge="Cloud"
              badgeColor="bg-cyber-blue"
              delay={200}
            />
            <TechProductCard
              title="Quantum Analytics"
              description="Nền tảng phân tích dữ liệu với quantum computing và AI"
              image="/placeholder.svg?height=200&width=400&query=Quantum analytics dashboard"
              badge="Quantum"
              badgeColor="bg-electric-blue"
              delay={300}
            />
          </div>
        </div>
      </section>
      {/* Enhanced Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-tech-blue-50 to-cyber-blue/10 relative overflow-hidden">
        <TechGrid />

        <div className="container px-4 md:px-6 relative z-10">
          <Reveal direction="up">
            <div className="text-center mb-16">
              <Badge
                variant="outline"
                className="mb-4 border-tech-blue-500 text-tech-blue-600"
              >
                <Shield className="h-4 w-4 mr-2" />
                Why Choose Us
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <HolographicText>
                  Đối tác công nghệ AI đáng tin cậy
                </HolographicText>
              </h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              title="AI Excellence"
              description="Chuyên môn sâu về AI và machine learning với đội ngũ PhD"
              icon={<Cpu className="h-8 w-8" />}
              features={[
                "PhD Team",
                "Research Lab",
                "AI Patents",
                "Published Papers",
              ]}
              delay={100}
            />
            <FeatureCard
              title="Cloud Native"
              description="Kiến trúc cloud-native với scalability và reliability cao"
              icon={<Cloud className="h-8 w-8" />}
              features={[
                "Microservices",
                "Auto-scaling",
                "99.99% Uptime",
                "Global CDN",
              ]}
              delay={200}
            />
            <FeatureCard
              title="Security First"
              description="Bảo mật cấp enterprise với encryption và zero-trust"
              icon={<Shield className="h-8 w-8" />}
              features={[
                "Zero Trust",
                "End-to-end Encryption",
                "SOC 2 Compliance",
                "24/7 Monitoring",
              ]}
              delay={300}
            />
            <FeatureCard
              title="Innovation Lab"
              description="Nghiên cứu và phát triển công nghệ tương lai"
              icon={<Zap className="h-8 w-8" />}
              features={[
                "R&D Lab",
                "Quantum Research",
                "Blockchain",
                "Edge Computing",
              ]}
              delay={400}
            />
          </div>
        </div>
      </section>
      {/* Enhanced Contact Section */}
      <section className="py-20 bg-gradient-to-r from-navy-tech via-tech-blue-900 to-tech-blue-800 text-white relative overflow-hidden">
        <CircuitBoard />

        <div className="container px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal direction="left">
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

            <Reveal direction="right">
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
