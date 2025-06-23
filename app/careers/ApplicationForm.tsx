'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Users,
  MapPin,
  Clock,
  Star,
  Sparkles,
  User,
  Mail,
  Phone,
  Briefcase,
  FileText,
  Upload,
  Send,
  AlertCircle,
  X,
  Ban,
} from 'lucide-react';
import { HolographicText } from '@/components/tech-blue-animations';
import { ApplicationFormSectionProps } from '../interface';

export default function ApplicationFormSection({
  selectedPosition,
  formData,
  errors,
  isSubmitting,
  handleInputChange,
  handleFileChange,
  handleSubmit,
  setIsOpen,
}: ApplicationFormSectionProps) {
  return (
    <div className="mt-16 min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="mt-4 mb-2 text-3xl md:text-4xl font-bold">
              <HolographicText>Ứng tuyển vị trí</HolographicText>
            </h1>
            <p className="text-gray-600">{selectedPosition.title}</p>
          </div>

          <Button variant="outline" size="sm" onClick={() => setIsOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Position Info */}
        <Card className="mb-6 bg-white border-blue-200 hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-600 mb-4">
              {selectedPosition.title}
            </CardTitle>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center bg-white/70 px-3 py-2 rounded-lg border border-blue-200">
                <Users className="h-4 w-4 mr-2 text-blue-600" />
                <span className="text-gray-700 font-medium">
                  {selectedPosition.department}
                </span>
              </div>
              <div className="flex items-center bg-white/70 px-3 py-2 rounded-lg border border-green-200">
                <MapPin className="h-4 w-4 mr-2 text-green-600" />
                <span className="text-gray-700 font-medium">
                  {selectedPosition.location}
                </span>
              </div>
              <div className="flex items-center bg-white/70 px-3 py-2 rounded-lg border border-purple-200">
                <Clock className="h-4 w-4 mr-2 text-purple-600" />
                <span className="text-gray-700 font-medium">
                  {selectedPosition.type}
                </span>
              </div>
              <div className="flex items-center bg-white/70 px-3 py-2 rounded-lg border border-amber-200">
                <Star className="h-4 w-4 mr-2 text-amber-600" />
                <span className="text-gray-700 font-medium">
                  {selectedPosition.experience}
                </span>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Application Form */}
        <Card className="mb-10">
          <CardHeader>
            <CardTitle className="flex text-2xl text-blue-800 items-center">
              <Sparkles className="h-5 w-5 mr-2 text-blue-600" />
              Thông tin ứng viên
            </CardTitle>
            <CardDescription>
              Vui lòng điền đầy đủ thông tin để chúng tôi có thể liên hệ với bạn
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Info */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="h-4 w-4 inline mr-1" />
                    Họ và tên <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={(e) =>
                      handleInputChange('fullName', e.target.value)
                    }
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.fullName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Nguyễn Văn A"
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.fullName}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="h-4 w-4 inline mr-1" />
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="example@email.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="h-4 w-4 inline mr-1" />
                    Số điện thoại <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="0901234567"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.phone}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Briefcase className="h-4 w-4 inline mr-1" />
                    Kinh nghiệm làm việc
                  </label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={(e) =>
                      handleInputChange('experience', e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Chọn kinh nghiệm</option>
                    <option value="fresher">Fresher (0-1 năm)</option>
                    <option value="junior">Junior (1-3 năm)</option>
                    <option value="senior">Senior (3-5 năm)</option>
                    <option value="lead">Lead (5+ năm)</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vị trí hiện tại
                  </label>
                  <input
                    type="text"
                    name="currentPosition"
                    value={formData.currentPosition}
                    onChange={(e) =>
                      handleInputChange('currentPosition', e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Frontend Developer tại ABC Company"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mức lương mong muốn
                  </label>
                  <input
                    type="text"
                    name="expectedSalary"
                    value={formData.expectedSalary}
                    onChange={(e) =>
                      handleInputChange('expectedSalary', e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="10-15 triệu VNĐ"
                  />
                </div>
              </div>

              {/* CV Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FileText className="h-4 w-4 inline mr-1" />
                  CV/Resume <span className="text-red-500">*</span>
                </label>
                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center hover:border-blue-400 transition-colors ${
                    errors.cv ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                    id="cv-upload"
                  />
                  <label htmlFor="cv-upload" className="cursor-pointer">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    {formData.cv ? (
                      <p className="text-sm text-green-600 font-medium">
                        {formData.cv.name}
                      </p>
                    ) : (
                      <>
                        <p className="text-sm text-gray-600">
                          Kéo thả file hoặc{' '}
                          <span className="text-blue-600 underline">
                            chọn file
                          </span>
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          PDF, DOC, DOCX (Tối đa 5MB)
                        </p>
                      </>
                    )}
                  </label>
                </div>
                {errors.cv && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.cv}
                  </p>
                )}
              </div>

              {/* Portfolio */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Portfolio/GitHub (nếu có)
                </label>
                <input
                  type="url"
                  name="portfolio"
                  value={formData.portfolio}
                  onChange={(e) =>
                    handleInputChange('portfolio', e.target.value)
                  }
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.portfolio ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="https://github.com/username hoặc https://portfolio.com"
                />
                {errors.portfolio && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.portfolio}
                  </p>
                )}
              </div>

              {/* Cover Letter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Thư giới thiệu
                </label>
                <textarea
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={(e) =>
                    handleInputChange('coverLetter', e.target.value)
                  }
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Giới thiệu ngắn gọn về bản thân, kinh nghiệm và lý do muốn gia nhập Katec..."
                />
              </div>

              {/* Submit Button */}
              <div className="flex gap-4">
                <Button
                  type="submit"
                  className="flex-1"
                  size="lg"
                  disabled={
                    isSubmitting ||
                    new Date(selectedPosition.deadline) < new Date()
                  }
                >
                  {new Date(selectedPosition.deadline) < new Date() ? (
                    <>
                      <Ban className="h-4 w-4 mr-2" />
                      Hết hạn nộp hồ sơ
                    </>
                  ) : isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                      Đang gửi...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Gửi đơn ứng tuyển
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                  disabled={isSubmitting}
                >
                  Hủy
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
