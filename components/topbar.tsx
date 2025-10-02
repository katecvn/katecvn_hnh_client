import React, { MouseEvent, useEffect, useState } from 'react';
import { LogIn, MapPin, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { UserInfo } from '@/types/interface';
import { localStorageUtil } from '@/utils/localStorage';
import UserAccountHeader from './account';
import { toast } from 'sonner';
import api from '@/utils/axios';
import { cn } from '@/lib/utils';
import { GoogleLoginModal } from './enhanced-modal';

type TopBarProps = {
  address?: string;
  hotline?: string;
};

export default function TopBar({
  address = 'TT2-23, Khu Liền kề IEC, xã Tứ Hiệp, huyện Thanh Trì, TP Hà Nội.',
  hotline = '0916 95 33 55',
}: TopBarProps) {
  const mapsHref = `https://maps.google.com/?q=${encodeURIComponent(address)}`;
  const telHref = `tel:${hotline.replace(/\s/g, '')}`;

  const [open, setOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [token, setToken] = useState('');

  useEffect(() => {
    const storedToken = localStorageUtil.getToken();
    const storedUser = localStorageUtil.getUser();
    setToken(storedToken ?? '');
    setUserInfo(storedUser);
  }, []);

  const logoutHandler = async () => {
    try {
      // Gọi API đăng xuất
      await api.get('/logout', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Đăng xuất thành công!');
      localStorageUtil.clearAll();
      setUserInfo(null);
    } catch (error) {
      let message = 'Đã xảy ra lỗi khi đăng xuất.';
      toast.error(message);
    }
  };

  return (
    <div
      id="top-bar"
      className="text-green-cyan-200 "
      style={{ fontWeight: 600 }}
    >
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-2">
          <div className="flex flex-col md:flex-row md:items-center md:gap-6">
            <a
              href={mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-white transition-colors"
              title={address}
            >
              <MapPin className="h-5 w-5 min-[400px]:h-4 min-[400px]:w-4" />
              <span className="text-[0.7rem] sm:text-[0.8rem]">{address}</span>
            </a>

            <a
              href={telHref}
              className="inline-flex items-center gap-2 hover:text-white transition-colors mt-1 md:mt-0"
              title={hotline}
            >
              <Phone className="h-4 w-4" />
              <span className="text-[0.7rem] sm:text-[0.8rem]">{hotline}</span>
            </a>
          </div>

          <div className="font-sans hidden md:flex items-center space-x-4">
            {userInfo ? (
              <UserAccountHeader userInfo={userInfo} onLogout={logoutHandler} />
            ) : (
              <button
                onClick={() => setOpen(true)}
                className={cn(
                  'relative group transition-all duration-500 gap-2 px-4 py-0.5 rounded-full overflow-hidden',
                  'hover:scale-[1.02] hover:shadow-lg transform-gpu  hover:text-white border border-white/20 hover:border-white/40'
                )}
              >
                {/* Background gradient overlay */}
                <div className="absolute from-white/10 via-white/20 to-white/30 inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 "></div>

                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

                {/* Content */}
                <div className="relative z-10 flex items-center gap-2">
                  <LogIn
                    className={cn(
                      'h-4 w-4 transition-all duration-300',
                      'group-hover:scale-110'
                    )}
                  />
                  <span className="font-semibold text-[0.8rem]">Đăng nhập</span>
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
      <GoogleLoginModal open={open} onOpenChange={() => setOpen(false)} />
    </div>
  );
}
