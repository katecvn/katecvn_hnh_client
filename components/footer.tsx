"use client";

import Link from "next/link";
import {
  Code2,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Youtube,
  Clock,
  MessageCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import api from "@/utils/axios";

export function Footer() {
  const [companyInfo, setCompanyInfo] = useState<any>(null);

  useEffect(() => {
    const fetchCompanyInfo = async () => {
      try {
        const response = await api.get(
          "/page-section/public/shows?sectionType=infoCompany"
        );
        const { data } = response.data;
        if (data && data.length > 0) {
          setCompanyInfo(data[0]);
        }
      } catch (error) {
        console.error("Error fetching company info:", error);
      }
    };

    fetchCompanyInfo();
  }, []);

  const getContentValue = (key: string) => {
    return (
      companyInfo?.content?.find((item: any) => item.key === key)?.value || ""
    );
  };

  const getContentUrl = (key: string) => {
    return (
      companyInfo?.content?.find((item: any) => item.key === key)?.url || ""
    );
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 lg:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Code2 className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">
                {getContentValue("name")}
              </span>
            </div>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-blue-400 mt-1" />
                <span>{getContentValue("address")}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-blue-400" />
                <a
                  href={`tel:${getContentValue("number_phone")}`}
                  className="hover:text-white"
                >
                  {getContentValue("number_phone")}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-blue-400" />
                <span>{getContentValue("fax")}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-400" />
                <a
                  href={`mailto:${getContentValue("email")}`}
                  className="hover:text-white"
                >
                  {getContentValue("email")}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-blue-400" />
                <span>{getContentValue("working_fulltime")}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-blue-400" />
                <span>{getContentValue("working_parttime")}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Liên kết nhanh</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/about" className="hover:text-white">
                  Về chúng tôi
                </Link>
              </li>

              <li>
                <Link href="/products" className="hover:text-white">
                  Sản phẩm
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-white">
                  Tin tức
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white">
                  Tuyển dụng
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Guidance */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Hướng dẫn khách hàng</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="/privacy" className="hover:text-white">
                  Chính sách bảo mật thông tin
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white">
                  Điều khoản sử dụng
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Kết nối với chúng tôi</h3>
            <div className="flex space-x-3">
              {getContentUrl("facebook") && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-300 hover:text-white"
                  asChild
                >
                  <Link href={getContentUrl("facebook")} target="_blank">
                    <Facebook className="h-4 w-4" />
                  </Link>
                </Button>
              )}
              {getContentUrl("messenger") && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-300 hover:text-white"
                  asChild
                >
                  <Link href={getContentUrl("messenger")} target="_blank">
                    <MessageCircle className="h-4 w-4" />
                  </Link>
                </Button>
              )}
              {getContentUrl("youtube") && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-300 hover:text-white"
                  asChild
                >
                  <Link href={getContentUrl("youtube")} target="_blank">
                    <Youtube className="h-4 w-4" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} {getContentValue("name")}. Tất cả các
          quyền được bảo lưu.
        </div>
      </div>
    </footer>
  );
}
