import { ArticleContent, PressSection } from '@/components/enhanced-support';

import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Post } from '@/types/interface';
import api from '@/utils/axios';
import { useEffect, useState } from 'react';
import { CompanyContentItem } from '@/types/interface';

type CompanySection = {
  content: CompanyContentItem[];
};

export default function NewsPage() {
  const [companyInfo, setCompanyInfo] = useState<CompanySection | null>(null);
  const [map, setMap] = useState('');

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [infoRes, footerRes] = await Promise.all([
          api.get('/page-section/public/shows?sectionType=infoCompany'),
          api.get('/page-section/public/shows?sectionType=footer'),
        ]);
        setCompanyInfo(infoRes.data.data[0]);
        setMap(
          footerRes.data.data[0]?.content?.find((i: any) => i.key === 'map')
            ?.url || ''
        );
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

  return (
    <section className="container py-4">
      <Breadcrumb
        items={[
          { label: 'Trang chủ', href: '/' },
          { label: 'Liên hệ', href: '/lien-he' },
        ]}
      />

      {/* Company Info */}
      <div className="pt-0 pb-6 md:pb-8">
        <div className="container mx-auto px-4">
          <div className="text-gray-800 leading-relaxed space-y-2">
            <div className=" text-center mb-6 font-sans">
              <p className="text-green-cyan-500 text-lg md:text-2xl  font-bold uppercase">
                CÔNG TY TNHH NÔNG TRẠI THỰC PHẨM HNH
              </p>
              <p className="text-[0.8rem] md:text-sm">
                Chúng tôi cung cấp thực phẩm sạch cho các trường học, bệnh viện,
                khách sạn, siêu thị, bếp ăn tập thể…
              </p>
            </div>
            <div className="text-sm md:text-base space-y-1 md:space-y-2">
              <p>
                <strong>Địa chỉ:</strong>{' '}
                <span className=" hover:underline">{getValue('address')}</span>
              </p>
              <p>
                <strong>Hotline:</strong>{' '}
                <a
                  href={`tel:${getValue('hotline_2')}`}
                  className=" hover:underline"
                >
                  {getValue('hotline_2')}
                </a>
              </p>
              <p>
                <strong>Máy bàn:</strong>{' '}
                <a
                  href={`tel:${getValue('number_phone')}`}
                  className=" hover:underline"
                >
                  {getValue('number_phone')}
                </a>
              </p>
              <p>
                <strong>Di động:</strong>{' '}
                <a
                  href={`tel:${getValue('hotline_1')}`}
                  className=" hover:underline"
                >
                  {getValue('hotline_1')}
                </a>
              </p>
              <p>
                <strong>Email:</strong>{' '}
                <a
                  href={`mailto:${getValue('email')}`}
                  className=" hover:underline"
                >
                  {getValue('email')}
                </a>
              </p>
              <p>
                <strong>Website:</strong>{' '}
                <a
                  href={getValue('website')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" hover:underline"
                >
                  {getValue('website')}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Google Map */}
      <div className="w-full h-[250px] md:h-[450px] ">
        <iframe
          src={map}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          className="border rounded-md"
        ></iframe>
      </div>
    </section>
  );
}
