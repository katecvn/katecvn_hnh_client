'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { X, Save, User, Mail, Phone, Users, Shield } from 'lucide-react'; // import form của bạn
import { useState } from 'react';

export default function FormUpdate({ userInfo, open, onOpenChange }) {
  const [focusedField, setFocusedField] = useState('');
  const [editForm, setEditForm] = useState(userInfo);
  const handleSaveProfile = () => {
    console.log('Saving profile:', editForm);
    // Handle save logic here
  };

  const handleCancelEdit = () => {
    console.log('Canceling edit');
    // Handle cancel logic here
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto scrollbar-thumb-only">
        <DialogHeader>
          <DialogTitle>Cập nhật thông tin</DialogTitle>
          <DialogDescription>Chỉnh sửa thông tin cá nhân</DialogDescription>
        </DialogHeader>

        {/* Form Content */}
        <div className="space-y-5">
          {/* Full Name */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <User size={16} className="text-blue-600" />
              Họ và tên
            </label>
            <input
              type="text"
              value={editForm.full_name}
              onChange={(e) =>
                setEditForm({ ...editForm, full_name: e.target.value })
              }
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField('')}
              className={`w-full px-4 py-3 border rounded-lg transition-all duration-200
                       ${
                         focusedField === 'name'
                           ? 'border-blue-500 ring-2 ring-blue-100 bg-blue-50/50'
                           : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                       } focus:outline-none text-slate-900 placeholder-slate-400`}
              placeholder="Nhập họ và tên"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <Mail size={16} className="text-blue-600" />
              Email
            </label>
            <input
              type="email"
              value={editForm.email}
              onChange={(e) =>
                setEditForm({ ...editForm, email: e.target.value })
              }
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField('')}
              className={`w-full px-4 py-3 border rounded-lg transition-all duration-200
                       ${
                         focusedField === 'email'
                           ? 'border-blue-500 ring-2 ring-blue-100 bg-blue-50/50'
                           : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                       } focus:outline-none text-slate-900 placeholder-slate-400`}
              placeholder="Nhập địa chỉ email"
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <Phone size={16} className="text-blue-600" />
              Số điện thoại
            </label>
            <input
              type="tel"
              value={editForm.phone_number}
              onChange={(e) =>
                setEditForm({ ...editForm, phone_number: e.target.value })
              }
              onFocus={() => setFocusedField('phone')}
              onBlur={() => setFocusedField('')}
              className={`w-full px-4 py-3 border rounded-lg transition-all duration-200
                       ${
                         focusedField === 'phone'
                           ? 'border-blue-500 ring-2 ring-blue-100 bg-blue-50/50'
                           : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                       } focus:outline-none text-slate-900 placeholder-slate-400`}
              placeholder="Nhập số điện thoại"
            />
          </div>

          {/* Gender */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <Users size={16} className="text-blue-600" />
              Giới tính
            </label>
            <div className="relative">
              <select
                value={editForm.gender}
                onChange={(e) =>
                  setEditForm({ ...editForm, gender: e.target.value })
                }
                onFocus={() => setFocusedField('gender')}
                onBlur={() => setFocusedField('')}
                className={`w-full px-4 py-3 border rounded-lg appearance-none cursor-pointer transition-all duration-200
                         ${
                           focusedField === 'gender'
                             ? 'border-blue-500 ring-2 ring-blue-100 bg-blue-50/50'
                             : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                         } focus:outline-none text-slate-900`}
              >
                <option value="">Chọn giới tính</option>
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
                <option value="other">Khác</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mb-4">
          <button
            onClick={handleSaveProfile}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 
                       text-white py-3 px-6 rounded-lg font-medium
                       transform hover:scale-[1.02] transition-all duration-200 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Save size={18} />
            Lưu thay đổi
          </button>
          <button
            onClick={handleCancelEdit}
            className="flex-1 flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 
                       text-slate-700 py-3 px-6 rounded-lg font-medium border border-slate-300
                       transform hover:scale-[1.02] transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
          >
            <X size={18} />
            Hủy bỏ
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 text-sm text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-200">
          <Shield size={16} className="text-slate-400" />
          <span>
            Thông tin được bảo mật theo tiêu chuẩn bảo mật doanh nghiệp
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
