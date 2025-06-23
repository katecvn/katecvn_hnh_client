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
import {
  ArrowRight,
  Heart,
  Zap,
  Coffee,
  Gamepad2,
  Sparkle,
  Armchair,
  Smartphone,
  Palette,
  Cloud,
  Code,
  Megaphone,
} from 'lucide-react';
import { AnimatedSection } from '@/components/animated-section';
import HeroSection from './HeroSection';
import { HolographicText } from '@/components/tech-blue-animations';
import { useEffect, useState } from 'react';
import SubmissionSuccess from './SubmissionSuccess';
import ApplicationFormSection from './ApplicationForm';
import PositionCard from './PositionCard';
import JobDetailPage from './JobDetailPage';
import { FormCareerErrors, FormData, JobPosition } from '../interface';

const benefits = [
  {
    icon: <Heart className="h-6 w-6" />,
    title: 'Bảo hiểm toàn diện',
    description: 'Bảo hiểm y tế, xã hội và tai nạn cho bản thân và gia đình',
    gradientClass: 'bg-gradient-to-br from-teal-400 via-blue-200 to-purple-300',
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: 'Phát triển kỹ năng',
    description: 'Đào tạo nâng cao, tham gia conference và khóa học chuyên sâu',
    gradientClass:
      'bg-gradient-to-br from-emerald-400 via-teal-200 to-blue-300',
  },
  {
    icon: <Coffee className="h-6 w-6" />,
    title: 'Môi trường thoải mái',
    description:
      'Văn phòng hiện đại, snack & coffee miễn phí, không gian thư giãn',
    gradientClass:
      'bg-gradient-to-br from-blue-500 via-indigo-200 to-purple-400',
  },
  {
    icon: <Gamepad2 className="h-6 w-6" />,
    title: 'Work-life balance',
    description:
      'Flexible working time, remote work, team building thường xuyên',
    gradientClass: 'bg-gradient-to-br from-teal-400 via-blue-200 to-indigo-400',
  },
];

const openPositions = [
  {
    title: 'Senior Full-stack Developer',
    department: 'Engineering',
    location: 'Cần Thơ',
    type: 'Full-time',
    experience: '3+ năm',
    salary: '8-10 triệu VNĐ',
    description:
      'Phát triển và maintain các ứng dụng web sử dụng React, Node.js và cloud technologies.',
    requirements: [
      'React/Next.js',
      'Node.js',
      'TypeScript',
      'AWS/Azure',
      'Database design',
    ],
    gradient: 'from-blue-600 via-purple-600 to-cyan-500',
    icon: Code,
    featured: true,
    deadline: new Date('2025-07-30'),
  },
  {
    title: 'AI/ML Engineer',
    department: 'AI Research',
    location: 'Cần Thơ',
    type: 'Full-time',
    experience: '2+ năm',
    salary: '7-10 triệu VNĐ',
    description:
      'Nghiên cứu và phát triển các mô hình AI/ML cho các sản phẩm của công ty.',
    requirements: [
      'Python',
      'TensorFlow/PyTorch',
      'Machine Learning',
      'Deep Learning',
      'Data Science',
    ],
    gradient: 'from-emerald-500 via-teal-600 to-cyan-600',
    icon: Zap,
    featured: true,
    deadline: new Date('2025-02-12'),
  },
  {
    title: 'DevOps Engineer',
    department: 'Infrastructure',
    location: 'Cần Thơ',
    type: 'Full-time',
    experience: '2+ năm',
    salary: '8-10 triệu VNĐ',
    description:
      'Quản lý infrastructure, CI/CD pipeline và monitoring systems.',
    requirements: [
      'Docker',
      'Kubernetes',
      'AWS/Azure',
      'CI/CD',
      'Monitoring tools',
    ],
    gradient: 'from-orange-500 via-red-500 to-pink-600',
    icon: Cloud,
    featured: false,
    deadline: new Date('2025-01-30'),
  },
  {
    title: 'UI/UX Designer',
    department: 'Design',
    location: 'Cần Thơ',
    type: 'Full-time',
    experience: '1+ năm',
    salary: '6-7 triệu VNĐ',
    description:
      'Thiết kế giao diện người dùng cho web và mobile applications.',
    requirements: [
      'Figma',
      'Adobe Creative Suite',
      'User Research',
      'Prototyping',
      'Design Systems',
    ],
    gradient: 'from-violet-600 via-purple-600 to-fuchsia-600',
    icon: Palette,
    featured: false,
    deadline: new Date('2024-12-16'),
  },
  {
    title: 'Mobile Developer (React Native)',
    department: 'Engineering',
    location: 'Cần Thơ',
    type: 'Full-time',
    experience: '1+ năm',
    salary: '6-8 triệu VNĐ',
    description:
      'Phát triển ứng dụng mobile cross-platform sử dụng React Native.',
    requirements: [
      'React Native',
      'JavaScript/TypeScript',
      'iOS/Android',
      'Redux',
      'API Integration',
    ],
    gradient: 'from-indigo-500 via-blue-600 to-cyan-500',
    icon: Smartphone,
    featured: false,
    deadline: new Date('2024-07-18'),
  },
  {
    title: 'Content Marketing Executive',
    department: 'Marketing',
    location: 'Cần Thơ',
    type: 'Full-time',
    experience: '1+ năm',
    salary: '6-8 triệu VNĐ',
    description:
      'Lên kế hoạch, sản xuất và quản lý nội dung số để tăng cường nhận diện thương hiệu và thu hút khách hàng tiềm năng.',
    requirements: [
      'Content Planning',
      'SEO Writing',
      'Social Media Management',
      'Canva/Photoshop cơ bản',
      'Phân tích insight khách hàng',
    ],
    gradient: 'from-yellow-400 via-orange-500 to-pink-500',
    icon: Megaphone,
    featured: false,
    deadline: new Date('2024-01-20'),
  },
];

export default function CareersPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<JobPosition | null>(
    null
  );
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    experience: '',
    currentPosition: '',
    expectedSalary: '',
    coverLetter: '',
    cv: null,
    portfolio: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormCareerErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [animate, setAnimate] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    setAnimate(true);
  }, []);

  // Validation function
  const validateForm = () => {
    const newErrors: FormCareerErrors = {};

    // Required fields validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Họ và tên là bắt buộc';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email là bắt buộc';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Số điện thoại là bắt buộc';
    } else if (
      !/^[0-9+\-\s()]{10,15}$/.test(formData.phone.replace(/\s/g, ''))
    ) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
    }

    if (!formData.cv) {
      newErrors.cv = 'CV/Resume là bắt buộc';
    }

    // Portfolio URL validation (if provided)
    if (formData.portfolio && !/^https?:\/\/.+/.test(formData.portfolio)) {
      newErrors.portfolio =
        'URL Portfolio không hợp lệ (phải bắt đầu bằng http:// hoặc https://)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size <= 5 * 1024 * 1024) {
        // 5MB limit
        setFormData((prev) => ({
          ...prev,
          cv: file,
        }));
        // Clear CV error if exists
        if (errors.cv) {
          setErrors((prev) => ({
            ...prev,
            cv: '',
          }));
        }
      } else {
        setErrors((prev) => ({
          ...prev,
          cv: 'File phải nhỏ hơn 5MB',
        }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      // Scroll to first error
      const firstErrorField = Object.keys(errors)[0];
      const errorElement = document.querySelector(
        `[name="${firstErrorField}"], #${firstErrorField}`
      ) as HTMLElement;
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        errorElement.focus();
      }
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call
      setIsSubmitted(true);

      // Reset form after successful submission
      setTimeout(() => {
        setIsSubmitted(false);
        setIsOpen(false);
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          experience: '',
          currentPosition: '',
          expectedSalary: '',
          coverLetter: '',
          cv: null,
          portfolio: '',
        });
        setErrors({});
      }, 3000);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openApplicationForm = (position: JobPosition) => {
    setSelectedPosition(position);
    setIsOpen(true);
    setErrors({}); // Clear any previous errors
    // Scroll to top of page smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openJobDetail = (position: JobPosition) => {
    setSelectedPosition(position);
    setIsDetailOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isSubmitted && selectedPosition) {
    return <SubmissionSuccess position={selectedPosition} />;
  }

  if (isOpen && selectedPosition) {
    return (
      <ApplicationFormSection
        selectedPosition={selectedPosition}
        formData={formData}
        errors={errors}
        isSubmitting={isSubmitting}
        handleInputChange={handleInputChange}
        handleFileChange={handleFileChange}
        handleSubmit={handleSubmit}
        setIsOpen={setIsOpen}
      />
    );
  }

  if (isDetailOpen && selectedPosition) {
    return (
      <JobDetailPage
        jobData={selectedPosition}
        setIsDetailOpen={setIsDetailOpen}
        onApply={openApplicationForm}
      />
    );
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}

      <HeroSection />

      {/* Benefits */}
      <AnimatedSection className="py-20 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <Badge
              variant="outline"
              className="mb-4 border-tech-blue-500 text-tech-blue-600"
            >
              <Sparkle className="h-4 w-4 mr-2" />
              Quyền lợi
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <HolographicText>Tại sao chọn Katec?</HolographicText>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Chúng tôi cam kết tạo ra môi trường làm việc tốt nhất để bạn có
              thể phát triển sự nghiệp
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <div
                  className={`p-1 rounded-lg ${benefit.gradientClass} hover:shadow-xl transition-all duration-300 group`}
                >
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
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Open Positions */}
      <div id="career">
        <AnimatedSection className="py-20 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <Badge
                variant="outline"
                className="mb-4 border-tech-blue-500 text-tech-blue-600"
              >
                <Armchair className="h-4 w-4 mr-2" />
                Vị trí tuyển dụng
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <HolographicText>Cơ hội nghề nghiệp</HolographicText>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Khám phá các vị trí đang tuyển dụng và tìm cơ hội phù hợp với
                bạn
              </p>
            </div>

            <div
              className={`grid gap-8 rounded-lg lg:grid-cols-2 xl:grid-cols-3 transition-all duration-1000 delay-500 ${
                animate
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
            >
              {openPositions.map((position, index) => (
                <PositionCard
                  key={index}
                  index={index}
                  position={position}
                  isHovered={hoveredCard === index}
                  onHover={() => setHoveredCard}
                  onLeave={() => setHoveredCard(null)}
                  onApply={openApplicationForm}
                  onViewDetail={openJobDetail}
                />
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>

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
          <Button
            size="lg"
            variant="secondary"
            onClick={() =>
              alert('Tính năng đang được phát triển. Vui lòng quay lại sau!')
            }
          >
            Gửi CV tự do
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </AnimatedSection>
    </div>
  );
}
