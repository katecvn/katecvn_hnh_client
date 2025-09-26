'use client';

import Link from 'next/link';
import {
  MapPin,
  Facebook,
  Youtube,
  MessageCircle,
  FileAxis3D,
  User,
  Phone,
  Headset,
  Mail,
  Locate,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import api from '@/utils/axios';
import { CompanyContentItem } from '@/types/interface';

type CompanySection = {
  content: CompanyContentItem[];
};

export function Footer() {
  const [companyInfo, setCompanyInfo] = useState<CompanySection | null>(null);
  const [footerInfo, setFooterInfo] = useState<CompanySection | null>(null);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [infoRes, footerRes] = await Promise.all([
          api.get('/page-section/public/shows?sectionType=infoCompany'),
          api.get('/page-section/public/shows?sectionType=footer'),
        ]);
        setCompanyInfo(infoRes.data.data[0]);
        setFooterInfo(footerRes.data.data[0]);
      } catch (err) {
        console.error('Error fetching footer data:', err);
      }
    };
    fetchData();
  }, []);

  // Helpers
  const getValue = (key: string) =>
    companyInfo?.content?.find((i) => i.key === key)?.value || '';

  const getUrl = (key: string) =>
    companyInfo?.content?.find((item: CompanyContentItem) => item.key === key)
      ?.url || '';

  const getFooterUrl = (key: string) =>
    footerInfo?.content?.find((i) => i.key === key)?.url || '';
  const getPolicy = (key: string) =>
    footerInfo?.content?.filter((i) => i.key === key) || [];

  return (
    <footer className="bg-green-cyan-500 text-white font-sans">
      <div className="container mx-auto px-4 lg:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-5 space-y-3">
            <h2 className="text-xl font-bold uppercase">{getValue('name')}</h2>
            <ul className="space-y-2 text-base text-gray-100">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-green-cyan-100" />
                <span>Địa chỉ: {getValue('address')}</span>
              </li>
              <li className="flex items-center gap-2">
                <FileAxis3D className="h-4 w-4 text-green-cyan-100" />
                <span>
                  MST: {getValue('mst')} - {getValue('date_mst')}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Locate className="h-4 w-4 text-green-cyan-100" />
                <span>Nơi cấp: {getValue('pleace_mst')}</span>
              </li>
              <li className="flex items-center gap-2">
                <User className="h-4 w-4 text-green-cyan-100" />
                <span>Giám đốc: {getValue('ceo')}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-green-cyan-100" />
                <span>Hotline:</span>
                <a
                  href={`tel:${getValue('hotline_1')}`}
                  className="hover:underline"
                >
                  {getValue('hotline_1')}
                </a>
                <span>-</span>
                <a
                  href={`tel:${getValue('hotline_2')}`}
                  className="hover:underline"
                >
                  {getValue('hotline_2')}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Headset className="h-4 w-4 text-green-cyan-100" />
                <a
                  href={`tel:${getValue('number_phone')}`}
                  className="hover:underline"
                >
                  Máy bàn: {getValue('number_phone')}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-green-cyan-100" />
                <a
                  href={`mailto:${getValue('email')}`}
                  className="hover:underline"
                >
                  Email: {getValue('email')}
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Support + Socials */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Support Links */}
              <div>
                <h3 className="text-xl font-bold uppercase mb-4">
                  Hỗ trợ khách hàng
                </h3>
                <ul className="space-y-2 text-base text-gray-100 list-disc list-inside">
                  {getPolicy('policy').map((item) => (
                    <li key={item.url}>
                      <Link href={item.url ?? '/'}>
                        <span className="hover:underline hover:underline-offset-2">
                          {item.title}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href="http://online.gov.vn/Website/chi-tiet-128743"
                  target="_blank"
                >
                  <img
                    src="/logoSaleNoti.png"
                    alt="Đăng ký bộ công thương"
                    className="mt-4 w-48"
                  />
                </Link>
              </div>

              {/* Socials + Map */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold uppercase mb-4">
                    Kết nối với chúng tôi
                  </h3>
                  <div className="flex space-x-3">
                    {getUrl('facebook') && (
                      <SocialButton
                        href={getUrl('facebook')}
                        icon={<Facebook className="h-4 w-4" />}
                      />
                    )}
                    {getUrl('messenger') && (
                      <SocialButton
                        href={getUrl('messenger')}
                        icon={<MessageCircle className="h-4 w-4" />}
                      />
                    )}
                    {getUrl('youtube') && (
                      <SocialButton
                        href={getUrl('youtube')}
                        icon={<Youtube className="h-4 w-4" />}
                      />
                    )}
                  </div>
                </div>

                <div className="w-full h-48 rounded overflow-hidden border border-gray-700">
                  {getFooterUrl('map') ? (
                    <iframe
                      src={getFooterUrl('map')}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="rounded"
                      title="Google Maps Location"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-300">
                      <MapPin className="h-6 w-6 mb-2" />
                      <p>Bản đồ sẽ hiển thị tại đây</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-green-cyan-700 py-4 text-center text-sm">
        <p>Copyright 2025 © thucphamhnh.com</p>
        <p>
          Giấy phép kinh doanh số 0106966763 do Sở Kế Hoạch và Đầu Tư Thành Phố
          Hà Nội cấp ngày 31/8/2013
        </p>
      </div>
    </footer>
  );
}

/* Reusable social button */
function SocialButton({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-8 w-8 text-gray-100 hover:bg-white hover:text-green-600 rounded-full border"
      asChild
    >
      <Link href={href} target="_blank">
        {icon}
      </Link>
    </Button>
  );
}
