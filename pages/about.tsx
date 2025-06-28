'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  ArrowRight,
  Users,
  Target,
  Heart,
  Lightbulb,
  Shield,
  Award,
  Globe,
  TrendingUp,
  Code,
  Database,
  Smartphone,
  BookAIcon,
  ChartCandlestick,
  HousePlug,
  UsersRound,
  HeartHandshake,
  Telescope,
  Handshake,
} from 'lucide-react';
import Image from 'next/image';
import { AnimatedSection } from '@/components/animated-section';
import Link from 'next/link';
import { ButtonScroll } from '@/components/ui/button-scroll';
import { HolographicText } from '@/components/tech-blue-animations';
import { useEffect, useState } from 'react';
import api from '@/utils/axios';
import ContactDialog from '@/components/dialog-contact';
import type { FeedbackContentItem as ContentItem } from './interface';
import HeroSectionAbout from '@/components/banner/about-section';

interface SectionItem {
  id: string | number;
  content: ContentItem[];
}

export default function AboutPage() {
  const coreValues = [
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: 'Đổi mới sáng tạo',
      description:
        'Luôn tìm kiếm và áp dụng những công nghệ tiên tiến nhất để tạo ra giải pháp tối ưu cho khách hàng.',
      color: 'bg-yellow-100 text-yellow-600',
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: 'Tận tâm phục vụ',
      description:
        'Đặt lợi ích và sự hài lòng của khách hàng lên hàng đầu trong mọi hoạt động kinh doanh.',
      color: 'bg-red-100 text-red-600',
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Chất lượng đảm bảo',
      description:
        'Cam kết cung cấp sản phẩm và dịch vụ chất lượng cao, tuân thủ các tiêu chuẩn quốc tế.',
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Hợp tác bền vững',
      description:
        'Xây dựng mối quan hệ đối tác lâu dài dựa trên sự tin tưởng và cùng phát triển.',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: 'Hiệu quả tối ưu',
      description:
        'Tối ưu hóa quy trình và nguồn lực để mang lại hiệu quả cao nhất cho mọi dự án.',
      color: 'bg-purple-100 text-purple-600',
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: 'Tầm nhìn toàn cầu',
      description:
        'Hướng tới việc trở thành đối tác công nghệ hàng đầu không chỉ tại Việt Nam mà còn khu vực.',
      color: 'bg-indigo-100 text-indigo-600',
    },
  ];

  const milestones = [
    {
      year: '2019',
      title: 'Thành lập Katec',
      description:
        'Khởi đầu với 5 thành viên và tầm nhìn trở thành công ty công nghệ hàng đầu Việt Nam.',
    },
    {
      year: '2020',
      title: 'Dự án đầu tiên',
      description:
        'Triển khai thành công hệ thống ERP cho khách hàng doanh nghiệp đầu tiên.',
    },
    {
      year: '2021',
      title: 'Mở rộng đội ngũ',
      description:
        'Phát triển đội ngũ lên 25 chuyên gia và mở rộng dịch vụ sang AI & Machine Learning.',
    },
    {
      year: '2022',
      title: 'Giải thưởng công nghệ',
      description:
        "Nhận giải thưởng 'Sản phẩm công nghệ xuất sắc' từ Hiệp hội Phần mềm Việt Nam.",
    },
    {
      year: '2023',
      title: 'Mở rộng thị trường',
      description:
        'Phục vụ hơn 200 khách hàng và mở rộng sang thị trường Đông Nam Á.',
    },
    {
      year: '2024',
      title: 'Đổi mới AI',
      description:
        'Ra mắt nền tảng AI Analytics và đạt mốc 500+ dự án hoàn thành thành công.',
    },
  ];

  const teamMembers = [
    {
      name: 'Trương Hoàng Khải',
      position: 'Chủ tịch HĐQT & Giám đốc',
      bio: 'Người sáng lập và điều hành KATEC. Với hơn 15 năm kinh nghiệm trong lĩnh vực công nghệ và quản trị doanh nghiệp, và là người định hướng chiến lược toàn diện cho công ty.',
      image: '/khai.jpg?height=300&width=300&query=professional CEO portrait',
      linkedin: '#',
      email: 'khaith.katec@gmail.com',
      specialties: [
        'Lãnh đạo chiến lược',
        'Quản trị doanh nghiệp',
        'Định hướng phát triển công nghệ',
      ],
    },
    {
      name: 'Văn Hoàng Lũy',
      position: 'Phó Giám đốc ',
      bio: 'Chuyên gia kiến trúc hệ thống với hơn 12 năm kinh nghiệm. Anh Lũy là người định hình nền tảng công nghệ cốt lõi tại KATEC, luôn theo đuổi sự ổn định, bảo mật và khả năng mở rộng.',
      image:
        '/luy.jpg?height=300&width=300&query=professional CTO portrait male',
      linkedin: '#',
      email: 'luyvh.katec@gmail.com',
      specialties: [
        'Kiến trúc hệ thống',
        'Cloud Computing',
        'DevOps',
        'Công nghệ AI',
      ],
    },
    {
      name: 'Nguyễn Thanh Bình',
      position: 'Trưởng phòng Kinh doanh',
      bio: 'Dẫn dắt bộ phận kinh doanh với tư duy kỹ thuật sắc bén. Anh Bình kết hợp giữa kỹ năng phát triển phần mềm và chiến lược bán hàng để thúc đẩy tăng trưởng.',
      image:
        '/binh.jpg?height=300&width=300&query=professional business lead portrait',
      linkedin: '#',
      email: 'binhnt.katec@gmail.com',
      specialties: [
        'Chiến lược kinh doanh',
        'Tư vấn giải pháp',
        'Chuyển đổi số',
      ],
    },
    {
      name: 'Nguyễn Trọng Nghĩa',
      position: 'Trưởng phòng Lập trình',
      bio: 'Dẫn dắt đội ngũ lập trình viên tại KATEC. Anh Nghĩa là chuyên gia trong việc xây dựng hệ thống phần mềm hiện đại, đặc biệt là trong môi trường phát triển linh hoạt và microservices.',
      image:
        '/nghia.jpg?height=300&width=300&query=professional developer portrait',
      linkedin: '#',
      email: 'nghia@katec.com',
      specialties: [
        'Phát triển phần mềm',
        'React & Node.js',
        'Kiến trúc Microservices',
      ],
    },
    {
      name: 'Trần Thu Vân',
      position: 'Trưởng phòng Nhân sự',
      bio: 'Với sự nhạy bén trong việc xây dựng văn hoá doanh nghiệp và phát triển con người, chị Vân quản lý toàn bộ hoạt động tuyển dụng, đào tạo và phúc lợi tại KATEC.',
      image:
        '/van.jpg?height=300&width=300&query=professional HR manager portrait',
      linkedin: '#',
      email: 'van@katec.com',
      specialties: [
        'Quản trị nhân sự',
        'Văn hóa doanh nghiệp',
        'Phát triển tổ chức',
      ],
    },
    {
      name: 'Nguyễn Thị Tiên',
      position: 'Nhân viên Kinh doanh lâu năm',
      bio: 'Chị Tiên là một trong những nhân sự gắn bó lâu dài nhất với KATEC. Với sự hiểu biết sâu rộng về sản phẩm và khách hàng, và trong việc duy trì và mở rộng mạng lưới khách hàng.',
      image:
        '/tien.jpg?height=300&width=300&query=professional business staff portrait',
      linkedin: '#',
      email: 'danh@katec.com',
      specialties: ['Chăm sóc khách hàng', 'Bán hàng B2B', 'Tư vấn sản phẩm'],
    },
  ];

  const mockAwards = [
    {
      name: 'Giải thưởng kỹ thuật',
      image:
        '/giaithuong1.jpg?height=300&width=300&query=professional CEO portrait',
      description:
        'Giải nhất cuộc thi sáng tạo kỹ thuật lần thứ 12 năm 2022–2023 TP. Cần Thơ.',
    },
    {
      name: 'Chứng nhận KH&CN',
      image:
        '/giaithuong2.jpg?height=300&width=300&query=professional CEO portrait',
      description:
        'Được công nhận là doanh nghiệp khoa học và công nghệ TP. Cần Thơ 2024.',
    },
    {
      name: 'Giấy chứng nhận doanh nghiệp KH&CN',
      image:
        '/giaithuong3.jpg?height=300&width=300&query=professional CEO portrait',
      description:
        'Chứng nhận doanh nghiệp khoa học và công nghệ cấp ngày 25/01/2024.',
    },
  ];

  const stats = [
    {
      label: 'Năm kinh nghiệm',
      value: '5+',
      icon: <Award className="h-6 w-6" />,
    },
    {
      label: 'Dự án hoàn thành',
      value: '500+',
      icon: <Target className="h-6 w-6" />,
    },
    {
      label: 'Khách hàng hài lòng',
      value: '200+',
      icon: <Users className="h-6 w-6" />,
    },
    {
      label: 'Chuyên gia IT',
      value: '50+',
      icon: <Code className="h-6 w-6" />,
    },
    {
      label: 'Tỷ lệ thành công',
      value: '98%',
      icon: <TrendingUp className="h-6 w-6" />,
    },
    {
      label: 'Hỗ trợ 24/7',
      value: '365',
      icon: <Shield className="h-6 w-6" />,
    },
  ];

  const technologies = [
    { name: 'React/Next.js', level: 95 },
    { name: 'Node.js', level: 90 },
    { name: 'Python/AI', level: 88 },
    { name: 'Cloud (AWS/Azure)', level: 92 },
    { name: 'Mobile (Flutter)', level: 85 },
    { name: 'DevOps', level: 87 },
  ];

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [awards, setAwards] = useState<SectionItem[]>([]);
  const [teams, setTeams] = useState<SectionItem[]>([]);

  const [openContact, setOpenContact] = useState(false);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    setError(null);

    const requests = [];

    // Prepare other endpoints
    requests.push(api.get('/page-section/public/shows?sectionType=award')); // index 0
    requests.push(api.get('/page-section/public/shows?sectionType=teams')); // index 1

    try {
      const [awardRes, teamRes] = await Promise.all(requests);

      // Awards, Teams
      setAwards(awardRes.data.data || []);
      setTeams(teamRes.data.data || []);
    } catch (error: any) {
      console.error('Error fetching homepage data:', error);
      const message =
        error.response?.data?.message ||
        error.message ||
        'Không thể tải dữ liệu trang chủ';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <HeroSectionAbout />

      {/* Company Stats */}
      <AnimatedSection className="py-20 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-blue-600">{stat.icon}</div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Our Story */}
      <AnimatedSection className="py-20 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge
                variant="outline"
                className="mb-4 border-tech-blue-500 text-tech-blue-600"
              >
                <BookAIcon className="h-4 w-4 mr-2" />
                Câu chuyện của chúng tôi
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <HolographicText>
                  Hành trình 5 năm xây dựng và phát triển
                </HolographicText>
              </h2>
              <p className="text-gray-600 mb-6 text-lg">
                Katec được thành lập vào năm 2019 với tầm nhìn trở thành công ty
                công nghệ thông tin hàng đầu Việt Nam. Chúng tôi bắt đầu từ một
                nhóm nhỏ 5 kỹ sư đam mê công nghệ và giờ đây đã phát triển thành
                một đội ngũ hơn 50 chuyên gia.
              </p>
              <p className="text-gray-600 mb-8 text-lg">
                Với phương châm "Công nghệ vì con người", chúng tôi không ngừng
                nghiên cứu và áp dụng những công nghệ tiên tiến nhất để tạo ra
                các sản phẩm và dịch vụ mang lại giá trị thực sự cho khách hàng.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">
                    Đội ngũ chuyên gia giàu kinh nghiệm
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">
                    Công nghệ tiên tiến và hiện đại
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">
                    Cam kết chất lượng và tiến độ
                  </span>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/imageURL.jpg?height=700&width=600&query=modern office team working"
                alt="Katec Office"
                width={600}
                height={500}
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-lg">
                <div className="text-2xl font-bold text-blue-600">500+</div>
                <div className="text-gray-600">Dự án thành công</div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Core Values */}
      <AnimatedSection className="py-20 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <Badge
              variant="outline"
              className="mb-4 border-tech-blue-500 text-tech-blue-600"
            >
              <ChartCandlestick className="h-4 w-4 mr-2" />
              Giá trị cốt lõi
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <HolographicText>
                Những giá trị định hướng hành động
              </HolographicText>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Các giá trị cốt lõi này là nền tảng cho mọi quyết định và hành
              động của chúng tôi
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map((value, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <Card className="group hover:shadow-xl transition-all duration-300 h-full">
                  <CardHeader className="text-center">
                    <div
                      className={`w-16 h-16 ${value.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      {value.icon}
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-base">
                      {value.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Timeline */}
      <AnimatedSection className="py-20 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <Badge
              variant="outline"
              className="mb-4 border-tech-blue-500 text-tech-blue-600"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Hành trình phát triển
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <HolographicText>Các mốc quan trọng</HolographicText>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Những cột mốc đánh dấu sự phát triển và thành công của Katec qua
              từng năm
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-600 to-purple-600"></div>

              {milestones.map((milestone, index) => (
                <AnimatedSection
                  key={index}
                  delay={index * 150}
                  className={`relative flex items-center mb-12 ${
                    index % 2 === 0 ? 'justify-start' : 'justify-end'
                  }`}
                >
                  <div
                    className={`w-full max-w-md ${
                      index % 2 === 0 ? 'pr-8' : 'pl-8'
                    }`}
                  >
                    <Card className="group hover:shadow-xl transition-all duration-300">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <Badge className="bg-blue-600">
                            {milestone.year}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg">
                          {milestone.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>
                          {milestone.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </div>
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-4 border-blue-600 rounded-full"></div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Technology Stack */}
      <AnimatedSection className="py-20 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge
                variant="outline"
                className="mb-4 border-tech-blue-500 text-tech-blue-600"
              >
                <HousePlug className="h-4 w-4 mr-2" />
                Công nghệ chúng tôi sử dụng
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <HolographicText>Chuyên môn công nghệ hàng đầu</HolographicText>
              </h2>
              <p className="text-gray-600 mb-8 text-lg">
                Đội ngũ của chúng tôi thành thạo các công nghệ tiên tiến nhất,
                từ frontend đến backend, từ mobile đến AI, đảm bảo mang lại giải
                pháp tối ưu cho mọi dự án.
              </p>
              <div className="space-y-6">
                {technologies.map((tech, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{tech.name}</span>
                      <span className="text-gray-600">{tech.level}%</span>
                    </div>
                    <Progress value={tech.level} className="h-2" />
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <Code className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Frontend</h3>
                <p className="text-sm text-gray-600">
                  React, Next.js, Vue.js, Angular
                </p>
              </Card>
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <Database className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Backend</h3>
                <p className="text-sm text-gray-600">
                  Node.js, Python, Java, .NET
                </p>
              </Card>
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <Smartphone className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Mobile</h3>
                <p className="text-sm text-gray-600">
                  React Native, Flutter, iOS, Android
                </p>
              </Card>
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <Globe className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Cloud</h3>
                <p className="text-sm text-gray-600">
                  AWS, Azure, Google Cloud, Docker
                </p>
              </Card>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="py-20 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <Badge
              variant="outline"
              className="mb-4 border-tech-blue-500 text-tech-blue-600"
            >
              <Award className="h-4 w-4 mr-2" />
              Thành tích & Giải thưởng
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <HolographicText>
                Vinh danh những cột mốc đáng tự hào
              </HolographicText>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Những giải thưởng không chỉ ghi nhận nỗ lực không ngừng nghỉ, mà
              còn là minh chứng cho sự sáng tạo và cống hiến của tập thể Katec
              trong hành trình chinh phục công nghệ và đổi mới giáo dục.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {awards.map((award, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="relative">
                    <Image
                      src={award?.content[0]?.imageUrl || '/placeholder.svg'}
                      alt={award?.content[0]?.name || 'Thành viên'}
                      width={300}
                      height={300}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl group-hover:text-blue-500">
                      {award?.content[0]?.name}
                    </CardTitle>
                    <CardDescription className="font-medium">
                      {award?.content[0]?.content}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Team Section */}
      <div id="portfolio">
        <AnimatedSection className="py-20 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <Badge
                variant="outline"
                className="mb-4 border-tech-blue-500 text-tech-blue-600"
              >
                <UsersRound className="h-4 w-4 mr-2" />
                Đội ngũ lãnh đạo
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <HolographicText>Gặp gỡ đội ngũ chuyên gia</HolographicText>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Những con người tài năng và đam mê công nghệ, dẫn dắt Katec
                hướng tới thành công
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teams.map((member, index) => (
                <AnimatedSection key={index} delay={index * 100}>
                  <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <div className="relative">
                      <Image
                        src={member?.content[0]?.imageUrl || '/placeholder.svg'}
                        alt={member?.content[0]?.name || 'Thành viên'}
                        width={300}
                        height={300}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl">
                        {member?.content[0]?.name}
                      </CardTitle>
                      <CardDescription className="text-blue-600 font-medium">
                        {member?.content[0]?.role}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">
                        {member?.content[0]?.content}
                      </p>
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">Chuyên môn:</h4>
                        <div className="flex flex-wrap gap-1">
                          {member?.content[0]?.features?.map(
                            (specialty: any, idx: number) => (
                              <Badge
                                key={idx}
                                variant="secondary"
                                className="text-xs"
                              >
                                {specialty}
                              </Badge>
                            )
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* Mission & Vision */}
      <AnimatedSection className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <Badge
                variant="outline"
                className="mb-4 border-white/20 text-white"
              >
                <HeartHandshake className="h-4 w-4 mr-2" />
                Sứ mệnh
              </Badge>

              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Sứ mệnh của chúng tôi
              </h2>
              <p className="text-xl mb-6 opacity-90">
                Tạo ra những giải pháp công nghệ tiên tiến, giúp doanh nghiệp
                Việt Nam chuyển đổi số thành công và cạnh tranh hiệu quả trên
                thị trường toàn cầu.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  <span>
                    Đem công nghệ tiên tiến đến gần hơn với doanh nghiệp Việt
                  </span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  <span>Tạo ra giá trị bền vững cho khách hàng và xã hội</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  <span>
                    Xây dựng hệ sinh thái công nghệ phát triển bền vững
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <Badge
                variant="outline"
                className="mb-4 border-white/20 text-white"
              >
                <Telescope className="h-4 w-4 mr-2" />
                Tầm nhìn
              </Badge>

              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Tầm nhìn 2030
              </h2>
              <p className="text-xl mb-6 opacity-90">
                Trở thành công ty công nghệ thông tin hàng đầu Đông Nam Á, được
                khách hàng tin tưởng và đối tác quốc tế công nhận.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">1000+</div>
                  <div className="text-sm opacity-80">Dự án hoàn thành</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">10+</div>
                  <div className="text-sm opacity-80">Quốc gia phục vụ</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">100+</div>
                  <div className="text-sm opacity-80">Chuyên gia IT</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">5</div>
                  <div className="text-sm opacity-80">Văn phòng khu vực</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Contact CTA */}
      <AnimatedSection className="py-20 bg-white">
        <div className="container px-4 md:px-6 text-center">
          <Badge
            variant="outline"
            className="mb-4 border-tech-blue-500 text-tech-blue-600"
          >
            <Handshake className="h-4 w-4 mr-2" />
            Gia nhập đội ngũ
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <HolographicText>Cùng xây dựng tương lai công nghệ</HolographicText>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Chúng tôi luôn tìm kiếm những tài năng xuất sắc để cùng phát triển
            và tạo ra những sản phẩm công nghệ đột phá
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/careers" passHref legacyBehavior>
              <Button as="a" size="lg" className="flex items-center">
                Xem vị trí tuyển dụng
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>

            <Button
              onClick={() => setOpenContact(true)}
              size="lg"
              variant="outline"
            >
              Liên hệ hợp tác
            </Button>
          </div>
        </div>
      </AnimatedSection>
      {/* Form Contact */}
      <ContactDialog
        title="Liên hệ hợp tác"
        des="Vui lòng để lại thông tin của bạn. Chúng tôi sẽ nhanh chóng liên hệ để trao đổi về cơ hội hợp tác và phát triển lâu dài."
        open={openContact}
        onOpenChange={setOpenContact}
      />
    </div>
  );
}
