import React, { useState } from 'react';
import { User, LogOut, ChevronDown } from 'lucide-react';
import { UserInfo } from '@/types/interface';

export interface UserAccountHeaderProps {
  userInfo?: UserInfo;
  onUpdateUser?: (payload: Partial<UserInfo>) => void;
  onLogout: () => void;
}

const UserAccountHeader = ({ userInfo, onLogout }: UserAccountHeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);

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

  return (
    <div className="relative">
      {/* Header với thông tin user */}
      <div className="bg-transparent group">
        <button
          onClick={() => setShowAccountMenu(!showAccountMenu)}
          className="text-sm font-medium transition-colors group-hover:text-white flex items-center gap-2  "
        >
          <div className="w-6 h-6 rounded-full flex items-center justify-center  overflow-hidden bg-white/20 ">
            {userInfo?.avatar_url ? (
              <img
                src={userInfo.avatar_url}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <User size={16} className="group-hover:text-white" />
            )}
          </div>
          <span className="hidden lg:block">
            Xin chào, <strong>{userInfo?.full_name || 'Người dùng'}</strong>
          </span>
          <ChevronDown
            size={16}
            className={`transition-transform duration-200 ${
              showAccountMenu ? 'rotate-180' : ''
            }`}
          />
        </button>
      </div>

      {/* Menu tài khoản dropdown */}
      {showAccountMenu && (
        <div
          className="absolute right-0 lg:left-0 top-10 -mt-2 w-36 text-sm bg-white rounded-md shadow-2xl border border-gray-300 
                    before:content-[''] before:absolute before:top-[-6px] before:right-7 lg:before:left-3
                    before:w-3 before:h-3 before:bg-white before:rotate-45 z-50"
        >
          <div>
            <button
              onClick={() => {
                setShowAccountMenu(false);
                handleLogout();
              }}
              className="w-full flex items-center gap-3 px-4 py-2 text-left rounded-lg hover:bg-red-50  transition-colors"
            >
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <LogOut size={16} className="text-red-600" />
              </div>
              <span className="text-red-600 font-medium">Đăng xuất</span>
            </button>
          </div>
        </div>
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
