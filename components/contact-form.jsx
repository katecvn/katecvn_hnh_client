'use client';

import React, { useState, useId } from 'react';
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
import { Send, CheckCircle, Upload, X, AlertCircle } from 'lucide-react';
import { handleError } from '@/utils/handle-error';
import { toast } from 'sonner';
import api from '@/utils/axios';

// Generate a stable request code that won't change between server and client render
const generateRequestCode = () => {
  // Using a fixed timestamp ensures the same code on server and client
  return 'TC123456';
};

export function ContactForm() {
  const formId = useId();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [requestCode] = useState(generateRequestCode());

  // Form data state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    company: '',
    position: '',
    industry: '',
    companySize: '',
    contactTimes: [],
    contactMethod: 'phone',
    agreeTerms: false,
    subscribeNewsletter: false,
  });

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle checkbox changes for contact times
  const handleContactTimeChange = (time, checked) => {
    setFormData((prev) => ({
      ...prev,
      contactTimes: checked
        ? [...prev.contactTimes, time]
        : prev.contactTimes.filter((t) => t !== time),
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);

    const { firstName, lastName, email, phone, subject, message, agreeTerms } =
      formData;

    // Validate required fields
    if (!firstName || !lastName || !phone || !subject || !message) {
      setError('Vui lòng điền đầy đủ các trường bắt buộc');
      setIsLoading(false);
      return;
    }

    if (!agreeTerms) {
      setError('Vui lòng đồng ý với điều khoản sử dụng');
      setIsLoading(false);
      return;
    }

    if (subject.length < 3) {
      setError('Chủ đề phải có ít nhất 3 ký tự');
      setIsLoading(false);
      return;
    }

    if (message.length < 10) {
      setError('Nội dung phải có ít nhất 10 ký tự');
      setIsLoading(false);
      return;
    }

    const formDataString = `Lời nhắn: ${formData.message}, Tên công ty: ${
      formData.company
    }, Chức vụ: ${formData.position}, Lĩnh vực: ${
      formData.industry
    }, Số lượng nhân viên: ${
      formData.companySize
    }, Giờ liên lạc: ${formData.contactTimes.join(', ')}, Cách thức liên hệ: ${
      formData.contactMethod
    }, Chấp nhận điều khoản: ${formData.agreeTerms}, Theo dõi bản tin: ${
      formData.subscribeNewsletter
    }`;
    try {
      // Prepare API payload
      const payload = {
        name: `${firstName} ${lastName}`.trim(),
        email: email || undefined,
        phone: phone,
        subject: subject,
        message: formDataString,
      };
      console.log('payload:', payload);
      const response = await api.post('/contact/create', payload);
      const { data } = response.data;

      console.log('API Response:', data);
      setIsSubmitted(true);
    } catch (error) {
      const message = handleError(error);
      setError(message);
      toast.error('Không thể gửi form liên hệ');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files || []);
    setAttachedFiles((prev) => [...prev, ...files]);
  };

  console.log('FormData:', formData);

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
    <div className="space-y-6">
      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-red-800 font-medium">Lỗi</p>
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* Personal Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Thông tin cá nhân</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">Họ *</Label>
            <Input
              id="firstName"
              required
              placeholder="Nhập họ"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Tên *</Label>
            <Input
              id="lastName"
              required
              placeholder="Nhập tên"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
            />
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
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="email@example.com"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Contact Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Chi tiết liên hệ</h3>
        <div className="space-y-2">
          <Label htmlFor="subject">Chủ đề *</Label>
          <Input
            id="subject"
            required
            placeholder="Nhập chủ đề (tối thiểu 3 ký tự)"
            minLength={3}
            value={formData.subject}
            onChange={(e) => handleInputChange('subject', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Nội dung *</Label>
          <Textarea
            id="message"
            required
            placeholder="Nhập nội dung chi tiết (tối thiểu 10 ký tự)"
            minLength={10}
            rows={5}
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
          />
        </div>
      </div>

      {/* Company Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Thông tin công ty (tùy chọn)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="company">Tên công ty</Label>
            <Input
              id="company"
              placeholder="Tên công ty/tổ chức"
              value={formData.company}
              onChange={(e) => handleInputChange('company', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="position">Chức vụ</Label>
            <Input
              id="position"
              placeholder="Chức vụ của bạn"
              value={formData.position}
              onChange={(e) => handleInputChange('position', e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="industry">Lĩnh vực kinh doanh</Label>
            <Select
              value={formData.industry}
              onValueChange={(value) => handleInputChange('industry', value)}
            >
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
            <Select
              value={formData.companySize}
              onValueChange={(value) => handleInputChange('companySize', value)}
            >
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
                <Checkbox
                  id={time}
                  checked={formData.contactTimes.includes(time)}
                  onCheckedChange={(checked) =>
                    handleContactTimeChange(time, checked)
                  }
                />
                <Label htmlFor={time} className="text-sm">
                  {time}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Hình thức liên hệ ưu tiên</Label>
          <RadioGroup
            value={formData.contactMethod}
            onValueChange={(value) => handleInputChange('contactMethod', value)}
          >
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
          <Checkbox
            id="terms"
            required
            checked={formData.agreeTerms}
            onCheckedChange={(checked) =>
              handleInputChange('agreeTerms', checked)
            }
          />
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
          <Checkbox
            id="newsletter"
            checked={formData.subscribeNewsletter}
            onCheckedChange={(checked) =>
              handleInputChange('subscribeNewsletter', checked)
            }
          />
          <Label htmlFor="newsletter" className="text-sm">
            Tôi muốn nhận tin tức và ưu đãi từ Katec qua email
          </Label>
        </div>

        <Button
          onClick={handleSubmit}
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
    </div>
  );
}
