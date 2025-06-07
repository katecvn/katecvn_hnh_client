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
    name: '',
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

    const { name, email, phone, subject, message } = formData;

    // Validate required fields
    if (!name || !phone || !subject || !message) {
      setError('Vui lòng điền đầy đủ các trường bắt buộc');
      setIsLoading(false);
      return;
    }

    try {
      // Prepare API payload
      const payload = {
        name: name.trim(),
        email: email || undefined,
        phone: phone,
        subject: subject,
        message: message,
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

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files || []);
    setAttachedFiles((prev) => [...prev, ...files]);
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
      <div className="space-y-4 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Họ tên *</Label>
            <Input
              style={{ color: '#000' }}
              id="name"
              required
              placeholder="Nhập tên"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject">Chủ đề *</Label>
            <Input
              style={{ color: '#000' }}
              id="subject"
              required
              placeholder="Nhập chủ đề"
              minLength={3}
              value={formData.subject}
              onChange={(e) => handleInputChange('subject', e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Số điện thoại *</Label>
            <Input
              style={{ color: '#000' }}
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
          <Label htmlFor="message">Nội dung *</Label>
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
        </div>
      </div>

      {/* Terms and Submit */}
      <div className="space-y-4">
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
