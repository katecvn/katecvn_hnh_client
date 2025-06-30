import { Shield } from 'lucide-react';
import { AnimatedSection } from './animated-section';
import { Badge } from './ui/badge';
import { HolographicText } from './tech-blue-animations';
import { Button } from './ui/button';
import { WithClassName } from '@/types/interface';

const services = [
  {
    title: 'Hotline 24/7',
    iconColor: 'bg-blue-100',
    iconClass: 'text-blue-600',
    iconPath:
      'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z',
    description:
      'Gọi ngay khi cần hỗ trợ khẩn cấp. Đội ngũ kỹ thuật viên sẵn sàng giải quyết vấn đề của bạn.',
    highlights: [
      { label: '0932 927 007 - Hỗ trợ kỹ thuật', color: 'bg-green-500' },
      { label: '0889 88 1010 - Tư vấn bán hàng', color: 'bg-blue-500' },
    ],
  },

  {
    title: 'Remote Support',
    iconColor: 'bg-green-100',
    iconClass: 'text-green-600',
    iconPath: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    description:
      'Hỗ trợ từ xa qua TeamViewer, AnyDesk để giải quyết vấn đề nhanh chóng.',
    highlights: [
      { label: 'Truy cập an toàn, bảo mật', color: 'bg-green-500' },
      { label: 'Không cần cài đặt phần mềm', color: 'bg-blue-500' },
      { label: 'Ghi lại quá trình sửa chữa', color: 'bg-purple-500' },
    ],
  },
  {
    title: 'Tài liệu & Đào tạo',
    iconColor: 'bg-orange-100',
    iconClass: 'text-orange-600',
    iconPath:
      'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    description:
      'Tài liệu hướng dẫn chi tiết, video tutorial và khóa đào tạo trực tuyến miễn phí.',
    highlights: [
      { label: 'Hướng dẫn sử dụng chi tiết', color: 'bg-green-500' },
      { label: 'Video tutorial HD', color: 'bg-blue-500' },
      { label: 'Khóa đào tạo trực tuyến', color: 'bg-purple-500' },
    ],
  },
  {
    title: 'Bảo trì & Nâng cấp',
    iconColor: 'bg-purple-100',
    iconClass: 'text-purple-600',
    iconPath:
      'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
    description:
      'Dịch vụ bảo trì định kỳ, cập nhật phiên bản mới và tối ưu hóa hiệu suất hệ thống.',
    highlights: [
      { label: 'Bảo trì định kỳ hàng tháng', color: 'bg-green-500' },
      { label: 'Cập nhật tính năng mới', color: 'bg-blue-500' },
      { label: 'Tối ưu hiệu suất', color: 'bg-purple-500' },
    ],
  },
];

interface HighlightItem {
  color: string;
  label: string;
}

interface ServiceCardProps {
  title: string;
  iconColor: string;
  iconClass: string;
  iconPath: string;
  description: string;
  highlights: HighlightItem[];
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  iconColor,
  iconClass,
  iconPath,
  description,
  highlights,
}) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
      <div
        className={`w-16 h-16 ${iconColor} rounded-full flex items-center justify-center mb-6`}
      >
        <svg
          className={`w-8 h-8 ${iconClass}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={iconPath}
          />
        </svg>
      </div>
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="space-y-2">
        {highlights.map((item: any, idx: number) => (
          <p className="flex items-center text-sm" key={idx}>
            <span className={`w-2 h-2 ${item.color} rounded-full mr-2`}></span>
            {typeof item.label === 'string' ? (
              <span>{item.label}</span>
            ) : (
              item.label
            )}
          </p>
        ))}
      </div>
    </div>
  );
};

export const SupportSection = ({ className }: WithClassName) => {
  return (
    <AnimatedSection
      className={`py-20 ${className ? className : 'bg-gray-50'}`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <Badge
            variant="outline"
            className="mb-4 border-blue-500 text-blue-600"
          >
            <Shield className="h-4 w-4 mr-2" />
            Hỗ trợ khách hàng
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <HolographicText>Chúng tôi luôn bên cạnh bạn</HolographicText>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Đội ngũ chuyên gia của chúng tôi sẵn sàng hỗ trợ bạn 24/7, từ triển
            khai đến vận hành và bảo trì hệ thống
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((item, idx) => (
            <ServiceCard key={idx} {...item} />
          ))}
        </div>

        {/* Contact Support CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Cần hỗ trợ ngay?</h3>
            <p className="mb-6 opacity-90">
              Đội ngũ chuyên gia của chúng tôi sẵn sàng hỗ trợ bạn 24/7
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100"
                onClick={() => {
                  window.location.href = `tel:0889881010`;
                }}
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                Gọi ngay: 0889 88 1010
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100"
                onClick={() => {
                  window.open('https://zalo.me/0889881010', '_blank');
                }}
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                Chat với chuyên gia
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};
