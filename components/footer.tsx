'use client';

import Link from 'next/link';
import {
  Code2,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Youtube,
  Clock,
  MessageCircle,
  FileAxis3D,
  Clock12,
  ClockAlert,
  ClockArrowDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';
import api from '@/utils/axios';
import { CompanyContentItem } from '@/app/interface';

interface CompanyInfo {
  content: CompanyContentItem[];
}

export function Footer() {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);

  useEffect(() => {
    const fetchCompanyInfo = async (): Promise<void> => {
      try {
        const response = await api.get(
          '/page-section/public/shows?sectionType=infoCompany'
        );
        const { data } = response.data;
        if (data && data.length > 0) {
          setCompanyInfo(data[0]);
        }
      } catch (error) {
        console.error('Error fetching company info:', error);
      }
    };

    fetchCompanyInfo();
  }, []);

  const getContentValue = (key: string): string => {
    return (
      companyInfo?.content?.find((item: CompanyContentItem) => item.key === key)
        ?.value || ''
    );
  };

  const getContentUrl = (key: string): string => {
    return (
      companyInfo?.content?.find((item: CompanyContentItem) => item.key === key)
        ?.url || ''
    );
  };

  return (
    <footer className="relative text-white bg-[url('/footer-bg.png')] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-sky-800 opacity-40 pointer-events-none z-0"></div>
      <div className="container mx-auto px-4 lg:px-6 py-12 relative z-10">
        {/* Top row with proper grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Company Info - spans 4 columns */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold">
                {getContentValue('name')}
              </span>
            </div>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-start space-x-2">
                <MapPin className="h-6 w-6 text-blue-400" />
                <span>{getContentValue('address')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-blue-400" />
                <a
                  href={`tel:${getContentValue('number_phone')}`}
                  className="hover:text-white"
                >
                  {getContentValue('number_phone')}
                </a>
                <span>-</span>
                <a href={`tel:0849 88 1010`} className="hover:text-white">
                  0849 88 1010
                </a>
              </div>

              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-400" />
                <a
                  href={`mailto:${getContentValue('email')}`}
                  className="hover:text-white"
                >
                  {getContentValue('email')}
                </a>
              </div>

              <div className="flex items-center space-x-2">
                <FileAxis3D className="h-4 w-4 text-blue-400" />
                <span>MST: 1801633969</span>
              </div>

              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-blue-400" />
                <span>{getContentValue('working_parttime')}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-4">
            <div className="grid lg:grid-cols-12 gap-8">
              {/* Quick Links - spans 2 columns */}
              <div className="lg:col-span-3 space-y-4">
                <h3 className="text-lg font-semibold">Liên kết nhanh</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  {[
                    { href: '/about', label: 'Về chúng tôi' },
                    { href: '/products', label: 'Sản phẩm' },
                    { href: '/news', label: 'Tin tức' },
                    { href: '/careers', label: 'Tuyển dụng' },
                  ].map(({ href, label }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className="hover:text-white 
                      hover:underline underline-offset-3"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Customer Guidance - spans 2 columns */}
              <div className="lg:col-span-4 space-y-4">
                <h3 className="text-lg font-semibold">Hướng dẫn khách hàng</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  {[
                    { href: '/privacy', label: 'Chính sách bảo mật thông tin' },
                    {
                      href: '/terms1',
                      label: 'Chính sách cài đặt và hướng dẫn sử dụng',
                    },
                    { href: '/terms2', label: 'Chính sách thanh toán' },
                    { href: '/terms3', label: 'Chính sách hoàn tiền' },
                    { href: '/terms4', label: 'Chính sách bảo hành' },
                    { href: '/terms5', label: 'Điều khoản sử dụng phần mềm' },
                  ].map(({ href, label }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className="hover:text-white 
                      hover:underline underline-offset-3"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social Media & Map Section - spans 4 columns */}
              <div className="lg:col-span-5 space-y-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    Kết nối với chúng tôi
                  </h3>
                  <div className="flex space-x-3">
                    {getContentUrl('facebook') && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-300 hover:text-blue-700"
                        asChild
                      >
                        <Link href={getContentUrl('facebook')} target="_blank">
                          <Facebook className="h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                    {getContentUrl('messenger') && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-300 hover:text-green-700"
                        asChild
                      >
                        <Link href={getContentUrl('messenger')} target="_blank">
                          <MessageCircle className="h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                    {getContentUrl('youtube') && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-300 hover:text-red-700"
                        asChild
                      >
                        <Link href={getContentUrl('youtube')} target="_blank">
                          <Youtube className="h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>

                {/* Map Section */}
                <div className="w-full">
                  <div className="w-full h-36 rounded-lg overflow-hidden border border-gray-700">
                    {getContentValue('address') ? (
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14221.100915639166!2d105.75392600000002!3d10.041018!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0886c3ecc3e01%3A0x5a84e770728f1669!2zMTg5IMSQLiBQaGFuIEh1eSBDaMO6LCBQaMaw4budbmcgQW4gS2jDoW5oLCBOaW5oIEtp4buBdSwgQ-G6p24gVGjGoSA5MDAwMDAsIFZp4buHdCBOYW0!5e1!3m2!1svi!2sus!4v1748829783103!5m2!1svi!2sus"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="rounded-lg"
                        title="Google Maps Location"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-400">
                        <div className="text-center">
                          <MapPin className="h-8 w-8 mx-auto mb-2" />
                          <p className="text-sm">Bản đồ sẽ hiển thị tại đây</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-400 mt-8 pt-8 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} {getContentValue('name')}. Tất cả các
          quyền được bảo lưu.
        </div>
      </div>
    </footer>
  );
}
