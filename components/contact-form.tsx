'use client';

import type React from 'react';
import { useState, useId } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Send, CheckCircle, Upload, X } from 'lucide-react';

// Generate a stable request code that won't change between server and client render
const generateRequestCode = () => {
  // Using a fixed timestamp ensures the same code on server and client
  return 'TC123456';
};

export function ContactForm() {
  const formId = useId();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [requestCode] = useState(generateRequestCode());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsLoading(false);
    setIsSubmitted(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setAttachedFiles((prev) => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-12">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-semibold mb-2">Cảm ơn bạn đã liên hệ!</h3>
        <p className="text-gray-600 mb-6">
          Chúng tôi đã nhận được thông tin và sẽ phản hồi trong vòng 24 giờ.
        </p>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-blue-800 font-medium">
            Mã yêu cầu: #{requestCode}
          </p>
          <p className="text-blue-600 text-sm mt-1">
            Vui lòng lưu mã này để theo dõi tiến trình xử lý
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Thông tin cá nhân</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">Họ *</Label>
            <Input id="firstName" required placeholder="Nhập họ" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Tên *</Label>
            <Input id="lastName" required placeholder="Nhập tên" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Số điện thoại *</Label>
            <Input
              id="phone"
              type="tel"
              required
              placeholder="+84 xxx xxx xxx"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              required
              placeholder="email@example.com"
            />
          </div>
        </div>
      </div>

      {/* Company Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Thông tin công ty</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="company">Tên công ty *</Label>
            <Input id="company" required placeholder="Tên công ty/tổ chức" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="position">Chức vụ</Label>
            <Input id="position" placeholder="Chức vụ của bạn" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="industry">Lĩnh vực kinh doanh</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Chọn lĩnh vực" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="manufacturing">Sản xuất</SelectItem>
                <SelectItem value="retail">Bán lẻ</SelectItem>
                <SelectItem value="finance">Tài chính - Ngân hàng</SelectItem>
                <SelectItem value="healthcare">Y tế</SelectItem>
                <SelectItem value="education">Giáo dục</SelectItem>
                <SelectItem value="logistics">Logistics</SelectItem>
                <SelectItem value="real-estate">Bất động sản</SelectItem>
                <SelectItem value="other">Khác</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="companySize">Quy mô công ty</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Chọn quy mô" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-10">1-10 nhân viên</SelectItem>
                <SelectItem value="11-50">11-50 nhân viên</SelectItem>
                <SelectItem value="51-200">51-200 nhân viên</SelectItem>
                <SelectItem value="201-500">201-500 nhân viên</SelectItem>
                <SelectItem value="500+">500+ nhân viên</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Project Information */}

      {/* File Upload */}

      {/* Contact Preferences */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Thông tin liên hệ</h3>
        <div className="space-y-2">
          <Label>Thời gian thuận tiện để liên hệ</Label>
          <div className="grid grid-cols-2 gap-3">
            {[
              '8:00 - 12:00',
              '13:00 - 17:00',
              '18:00 - 20:00',
              'Cuối tuần',
            ].map((time) => (
              <div key={time} className="flex items-center space-x-2">
                <Checkbox id={time} />
                <Label htmlFor={time} className="text-sm">
                  {time}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Hình thức liên hệ ưu tiên</Label>
          <RadioGroup defaultValue="phone">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="phone" id="contact-phone" />
              <Label htmlFor="contact-phone">Điện thoại</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="email" id="contact-email" />
              <Label htmlFor="contact-email">Email</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="meeting" id="contact-meeting" />
              <Label htmlFor="contact-meeting">Gặp mặt trực tiếp</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      {/* Terms and Submit */}
      <div className="space-y-4">
        <div className="flex items-start space-x-2">
          <Checkbox id="terms" required />
          <Label htmlFor="terms" className="text-sm">
            Tôi đồng ý với{' '}
            <a href="/privacy" className="text-blue-600 hover:underline">
              Chính sách bảo mật
            </a>{' '}
            và{' '}
            <a href="/terms" className="text-blue-600 hover:underline">
              Điều khoản sử dụng
            </a>{' '}
            của Katec *
          </Label>
        </div>

        <div className="flex items-start space-x-2">
          <Checkbox id="newsletter" />
          <Label htmlFor="newsletter" className="text-sm">
            Tôi muốn nhận tin tức và ưu đãi từ Katec qua email
          </Label>
        </div>

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          disabled={isLoading}
          size="lg"
        >
          {isLoading ? (
            'Đang gửi...'
          ) : (
            <>
              Gửi yêu cầu tư vấn
              <Send className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
