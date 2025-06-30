import React, { useState } from 'react';
import {
  User,
  LogOut,
  Settings,
  Edit3,
  X,
  Save,
  ChevronDown,
} from 'lucide-react';
import FormUpdate from './form-update';

const UserAccountHeader = ({ userInfo, onUpdateUser, onLogout }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [editForm, setEditForm] = useState({
    full_name: userInfo?.full_name || '',
    email: userInfo?.email || '',
    phone_number: userInfo?.phone_number || '',
    gender: userInfo?.gender || '',
  });

  // Simulate scroll effect
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    if (window.confirm('Bạn có chắc chắn muốn đăng xuất?')) {
      setShowAccountMenu(false);
      onLogout?.();
    }
  };

  const handleSaveProfile = () => {
    if (onUpdateUser) {
      onUpdateUser(editForm);
    }
    setShowEditProfile(false);
    alert('Cập nhật thông tin thành công!');
  };

  const handleCancelEdit = () => {
    setEditForm({
      full_name: userInfo?.full_name || '',
      email: userInfo?.email || '',
      phone_number: userInfo?.phone_number || '',
      gender: userInfo?.gender || '',
    });
    setShowEditProfile(false);
  };

  return (
    <div className="relative">
      {/* Header với thông tin user */}
      <div className="bg-transparent">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center overflow-hidden ${
                isScrolled
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-white/20 text-white'
              }`}
            >
              {userInfo?.avatar_url ? (
                <img
                  src={userInfo.avatar_url}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User size={16} />
              )}
            </div>
            <button
              onClick={() => setShowAccountMenu(!showAccountMenu)}
              className={`text-sm font-semibold transition-colors hover:opacity-80 flex items-center gap-2 ${
                isScrolled ? 'text-blue-600' : 'text-white'
              }`}
            >
              Xin chào, {userInfo?.full_name || 'Người dùng'}
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${
                  showAccountMenu ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Menu tài khoản dropdown */}
      {showAccountMenu && (
        <div className="absolute right-0 top-full -mt-2 w-64 text-sm bg-white rounded-md shadow-2xl border border-blue-200 z-50">
          <div>
            {/* Nút cập nhật thông tin */}
            {/*  <button
              onClick={() => {
                setShowEditProfile(true);
                setShowAccountMenu(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-2 text-left rounded-tl-lg rounded-tr-lg hover:bg-gray-100  transition-colors"
            >
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Edit3 size={16} className="text-blue-600" />
              </div>
              <span className="text-gray-700 font-medium">
                Cập nhật thông tin
              </span>
            </button> */}

            {/* Nút đăng xuất */}
            <button
              onClick={() => {
                setShowAccountMenu(false);
                handleLogout();
              }}
              className="w-full flex items-center gap-3 px-4 py-2 text-left rounded-bl-lg rounded-br-lg hover:bg-red-50  transition-colors"
            >
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <LogOut size={16} className="text-red-600" />
              </div>
              <span className="text-red-600 font-medium">Đăng xuất</span>
            </button>
          </div>
        </div>
      )}

      {/* Form cập nhật thông tin (modal overlay) */}
      {showEditProfile && (
        <FormUpdate
          userInfo={userInfo}
          open={showEditProfile}
          onOpenChange={setShowEditProfile}
        />
      )}

      {/* Overlay khi dropdown menu mở */}
      {showAccountMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowAccountMenu(false)}
        />
      )}
    </div>
  );
};

export default UserAccountHeader;
