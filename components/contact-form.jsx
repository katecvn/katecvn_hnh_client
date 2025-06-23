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

export function ContactForm({ title }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [requestCode] = useState(generateRequestCode());
  const [fieldErrors, setFieldErrors] = useState({});

  // Form data state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: title || '',
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

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    setFieldErrors({}); // reset lỗi

    const { name, email, phone, subject, message } = formData;
    const errors = {};

    if (!name) errors.name = 'Họ tên là bắt buộc';
    if (!phone) errors.phone = 'Số điện thoại là bắt buộc';
    if (!subject) errors.subject = 'Chủ đề là bắt buộc';
    if (!message) errors.message = 'Nội dung là bắt buộc';

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setIsLoading(false);
      return;
    }

    try {
      const payload = {
        name: name.trim(),
        email: email || undefined,
        phone,
        subject,
        message,
      };

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
    <div className="space-y-6 ">
      {/* Personal Information */}
      <div className="space-y-4 ">
        <div
          className={`grid grid-cols-1 ${
            title ? 'md:grid-cols-1' : 'md:grid-cols-2'
          } gap-4`}
        >
          <div className="space-y-2">
            <Label htmlFor="name">
              Họ tên <span className="text-red-500">*</span>
            </Label>
            <Input
              style={{ color: '#000' }}
              id="name"
              required
              placeholder="Nhập tên"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
            {fieldErrors.name && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {fieldErrors.name}
              </p>
            )}
          </div>
          {!title && (
            <div className="space-y-2">
              <Label htmlFor="subject">
                Chủ đề <span className="text-red-500">*</span>
              </Label>
              <Input
                style={{ color: '#000' }}
                id="subject"
                required
                placeholder="Nhập chủ đề"
                minLength={3}
                value={formData.subject}
                onChange={(e) => handleInputChange('subject', e.target.value)}
              />
              {fieldErrors.subject && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {fieldErrors.subject}
                </p>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phone">
              Số điện thoại <span className="text-red-500">*</span>
            </Label>
            <Input
              style={{ color: '#000' }}
              id="phone"
              type="tel"
              required
              placeholder="+84 xxx xxx xxx"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
            />
            {fieldErrors.phone && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {fieldErrors.phone}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              style={{ color: '#000' }}
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
        <div className="space-y-2 ">
          <Label htmlFor="message">
            Nội dung <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="message"
            required
            style={{ color: '#000' }}
            placeholder="Nhập nội dung chi tiết "
            minLength={10}
            rows={5}
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
          />
          {fieldErrors.message && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {fieldErrors.message}
            </p>
          )}
        </div>
      </div>

      {/* Terms and Submit */}
      <div className="space-y-4">
        <Button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
          disabled={isLoading}
          size="lg"
        >
          {isLoading ? (
            'Đang gửi...'
          ) : (
            <>
              {title === 'Đăng ký dùng thử miễn phí'
                ? 'Đăng ký ngay'
                : title === 'Liên hệ hợp tác'
                ? 'Gửi yêu cầu hợp tác'
                : 'Gửi yêu cầu tư vấn'}
              <Send className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
