import React from 'react';
import {
  Code,
  MapPin,
  Clock,
  DollarSign,
  Users,
  Calendar,
  ArrowLeft,
  Heart,
  Share2,
  Bookmark,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { JobDetailPageProps, JobPosition } from '@/types/interface';

export default function JobDetailPage({
  jobData,
  setIsDetailOpen,
  onApply,
}: JobDetailPageProps) {
  return (
    <div className="pt-16 min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-cyan-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => setIsDetailOpen(false)}
              className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors font-medium"
            >
              <ArrowLeft size={20} />
              <span>Quay lại danh sách</span>
            </button>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Code size={32} className="text-white" />
                </div>
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                    {jobData.title}
                  </h1>
                  <div className="flex items-center gap-4 text-gray-700 font-medium">
                    <span className="flex items-center gap-1">
                      <Users size={16} className="text-blue-500" />
                      {jobData.department}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={16} className="text-purple-500" />
                      {jobData.location}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mb-6">
                <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium border border-blue-200">
                  {jobData.type}
                </span>
                <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium border border-purple-200">
                  {jobData.experience}
                </span>
                {jobData.featured && (
                  <span className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-full text-sm font-bold shadow-md">
                    ⭐ Nổi bật
                  </span>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <button className="w-12 h-12 bg-white border-2 border-red-200 text-red-500 rounded-xl flex items-center justify-center hover:bg-red-50 hover:border-red-300 transition-all duration-200 shadow-sm">
                <Heart size={20} />
              </button>
              <button className="w-12 h-12 bg-white border-2 border-blue-200 text-blue-500 rounded-xl flex items-center justify-center hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 shadow-sm">
                <Bookmark size={20} />
              </button>
              <button className="w-12 h-12 bg-white border-2 border-purple-200 text-purple-500 rounded-xl flex items-center justify-center hover:bg-purple-50 hover:border-purple-300 transition-all duration-200 shadow-sm">
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Job Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Job Description */}
            <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Mô tả công việc
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg mb-6">
                {jobData.description}
              </p>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-blue-600">
                  Trách nhiệm chính:
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      Thiết kế và phát triển các ứng dụng web full-stack sử dụng
                      React và Node.js
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      Tối ưu hóa hiệu suất ứng dụng và trải nghiệm người dùng
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      Triển khai và quản lý ứng dụng trên cloud platforms
                      (AWS/Azure)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Làm việc nhóm và hướng dẫn các developer junior</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Yêu cầu kỹ năng
              </h2>
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                {jobData.requirements.map((req, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {index + 1}
                      </span>
                    </div>
                    <span className="font-medium text-gray-800">{req}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-blue-600">
                  Yêu cầu khác:
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>
                      Có kinh nghiệm làm việc với microservices và
                      containerization
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Hiểu biết về DevOps practices và CI/CD</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Kỹ năng giao tiếp tốt và làm việc nhóm hiệu quả</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Quyền lợi
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                  <h4 className="font-semibold text-green-800 mb-2">
                    💰 Lương thưởng
                  </h4>
                  <p className="text-green-700 text-sm">
                    Mức lương cạnh tranh + thưởng hiệu suất
                  </p>
                </div>
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <h4 className="font-semibold text-blue-800 mb-2">
                    🏥 Bảo hiểm
                  </h4>
                  <p className="text-blue-700 text-sm">
                    Bảo hiểm sức khỏe cao cấp
                  </p>
                </div>
                <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
                  <h4 className="font-semibold text-purple-800 mb-2">
                    📚 Đào tạo
                  </h4>
                  <p className="text-purple-700 text-sm">
                    Ngân sách học tập và phát triển
                  </p>
                </div>
                <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
                  <h4 className="font-semibold text-orange-800 mb-2">
                    🏠 Làm việc
                  </h4>
                  <p className="text-orange-700 text-sm">
                    Hybrid working, flexible hours
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Job Info & Apply */}
          <div className="space-y-6">
            {/* Quick Info */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Thông tin nhanh</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <DollarSign className="text-green-500" size={20} />
                  <div>
                    <div className="font-medium text-gray-900">
                      {jobData.salary}
                    </div>
                    <div className="text-sm text-gray-500">Mức lương</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="text-blue-500" size={20} />
                  <div>
                    <div className="font-medium text-gray-900">
                      {jobData.experience}
                    </div>
                    <div className="text-sm text-gray-500">Kinh nghiệm</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="text-purple-500" size={20} />
                  <div>
                    <div className="font-medium text-gray-900">Còn 15 ngày</div>
                    <div className="text-sm text-gray-500">Hạn ứng tuyển</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Apply Button */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <button
                onClick={() => onApply(jobData as JobPosition)}
                className="w-full bg-blue-600  text-white font-semibold py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 mb-4"
              >
                Ứng tuyển ngay
              </button>

              <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                <div className="text-sm text-gray-600 mb-2">
                  Đã có{' '}
                  <span className="font-semibold text-purple-600">
                    47 người
                  </span>{' '}
                  ứng tuyển
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                    style={{ width: '47%' }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Company Info */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Về công ty</h3>
              <div className="text-center mb-4">
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="w-auto h-8 object-contain md:w-full"
                  style={{
                    maxWidth: '100%',
                    height: '32px',
                    display: 'block',
                  }}
                  loading="eager"
                  decoding="sync"
                />
                <h4 className="mt-4 font-semibold text-gray-900">
                  CÔNG TY CỔ PHẦN CÔNG NGHỆ KATEC
                </h4>
                <p className="text-sm text-gray-500">Technology Company</p>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Quy mô:</span>
                  <span className="text-gray-900 font-medium">
                    10-20 nhân viên
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Lĩnh vực:</span>
                  <span className="text-gray-900 font-medium">IT Software</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Địa điểm:</span>
                  <span className="text-gray-900 font-medium">Cần Thơ</span>
                </div>
              </div>

              <Button
                asChild
                className="w-full mt-4 text-purple-600 font-medium py-2 bg-white border border-purple-200 rounded-lg hover:bg-purple-50 transition-colors"
              >
                <Link href="/about">Xem thêm về công ty</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
