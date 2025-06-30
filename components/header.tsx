'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, LogIn } from 'lucide-react';
import { cn } from '@/lib/utils';
import ContactDialog from './dialog-contact';
import { useRouter } from 'next/router';
import { localStorageUtil, UserInfo } from '@/utils/localStorage';
import UserAccountHeader from './account';

export function Header() {
  const router = useRouter();
  const pathname = router.pathname;

  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [openContact, setOpenContact] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const storedUser = localStorageUtil.getUser();
    setUserInfo(storedUser);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Trang chủ', href: '/' },
    { name: 'Sản phẩm', href: '/products' },
    { name: 'Tin tức', href: '/news' },
    { name: 'Về chúng tôi', href: '/about' },
    { name: 'Tuyển dụng', href: '/careers' },
    { name: 'Liên hệ', href: '/contact' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-tech-blue-200'
          : 'bg-blue-800/90 backdrop-blur-sm border-b border-gray-700/50'
      )}
    >
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <a className="flex items-center gap-3">
              {/* Enhanced Text Logo */}
              <div className="relative group flex justify-center md:justify-start">
                <span
                  className={cn(
                    'text-3xl font-black tracking-tight relative transition-all duration-500',
                    'group-hover:from-sky-300 group-hover:via-purple-400 group-hover:to-blue-500',
                    isScrolled ? 'opacity-90 scale-95' : 'opacity-100 scale-100'
                  )}
                >
                  <img
                    src={`${isScrolled ? '/logo.png' : '/logo-white.png'}`}
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
                  {/* Underline accent */}
                  <div
                    className={cn(
                      'absolute -bottom-2 left-0 h-1 transition-all duration-500 w-0 group-hover:w-full',
                      isScrolled
                        ? 'bg-gradient-to-r from-blue-900 via-sky-400 to-cyan-600'
                        : 'bg-white'
                    )}
                  ></div>
                  {/* Floating dot accent */}
                  <div
                    className={cn(
                      'absolute -top-1 -right-2 w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 animate-bounce transition-opacity duration-300',
                      isScrolled
                        ? 'bg-gradient-to-br from-sky-400 to-purple-500'
                        : 'bg-white'
                    )}
                  ></div>
                </span>
              </div>
            </a>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <a
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-tech-blue-300',
                    isScrolled ? 'text-blue-700' : 'text-white'
                  )}
                >
                  {item.name}
                </a>
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {userInfo ? (
              <UserAccountHeader
                userInfo={userInfo}
                onUpdateUser={(updatedInfo: any) => {}}
                onLogout={() => {
                  // Xử lý đăng xuất
                  localStorageUtil.clearAll();
                  router.push('/');
                }}
              />
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push('/login')}
                className={cn(
                  'relative group transition-all duration-500 gap-2 px-4 py-2 rounded-full overflow-hidden',
                  'hover:scale-[1.02] hover:shadow-lg transform-gpu',
                  isScrolled
                    ? 'text-tech-blue-700 hover:text-white border border-tech-blue-200 hover:border-tech-blue-400'
                    : 'text-white/90 hover:text-blue-800 border border-white/20 hover:border-white/40'
                )}
              >
                {/* Background gradient overlay */}
                <div
                  className={cn(
                    'absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500',
                    isScrolled
                      ? 'from-tech-blue-500 via-tech-blue-600 to-tech-blue-700'
                      : 'from-white/10 via-white/20 to-white/30'
                  )}
                ></div>

                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

                {/* Content */}
                <div className="relative z-10 flex items-center gap-2">
                  <LogIn
                    className={cn(
                      'h-4 w-4 transition-all duration-300',
                      'group-hover:rotate-12 group-hover:scale-110'
                    )}
                  />
                  <span className="font-medium text-sm">Đăng nhập</span>
                </div>

                {/* Subtle glow */}
                <div
                  className={cn(
                    'absolute -inset-1 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-sm',
                    isScrolled
                      ? 'bg-gradient-to-r from-tech-blue-400 to-tech-blue-600'
                      : 'bg-white'
                  )}
                ></div>
              </Button>
            )}

            {/* Nút Tư vấn miễn phí */}
            <Button
              variant={isScrolled ? 'outline' : 'secondary'}
              size="sm"
              onClick={() => setOpenContact(true)}
              className={cn(
                'transition-all duration-300',
                isScrolled
                  ? 'border-tech-blue-500 text-tech-blue-600 hover:bg-tech-blue-500 hover:text-white'
                  : 'bg-tech-blue-500 text-white hover:bg-tech-blue-600'
              )}
            >
              Tư vấn miễn phí
            </Button>
          </div>

          {/* Mobile Navigation */}

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                className={cn(isScrolled ? 'text-tech-blue-900' : 'text-white')}
              >
                <Menu
                  className={cn(
                    'h-6 w-6',
                    isScrolled ? 'text-tech-blue-900' : 'text-white'
                  )}
                />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col space-y-4 mt-8">
                {navigation.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link key={item.name} href={item.href} legacyBehavior>
                      <a
                        onClick={() => setIsOpen(false)}
                        className={`relative group text-lg font-medium transition-colors duration-200 ease-in-out ${
                          isActive
                            ? 'text-tech-blue-600'
                            : 'text-tech-blue-700 hover:text-tech-blue-500'
                        }`}
                      >
                        <span className="relative z-10">{item.name}</span>
                        <span
                          className={`absolute bottom-0 left-0 h-[2px] bg-tech-blue-500 transition-all duration-300 ${
                            isActive ? 'w-full' : 'w-0 group-hover:w-full'
                          }`}
                        ></span>
                      </a>
                    </Link>
                  );
                })}

                <div className="pt-4 border-t border-tech-blue-200 space-y-3">
                  {/* Nút Đăng nhập cho mobile - Enhanced */}
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-full relative group overflow-hidden rounded-xl transition-all duration-500',
                        'border-2 border-tech-blue-300 text-tech-blue-700 hover:text-blue-800',
                        'hover:scale-[1.02] hover:shadow-lg transform-gpu'
                      )}
                    >
                      {/* Background gradient */}
                      <div className="absolute inset-0 bg-gradient-to-r from-tech-blue-500 via-tech-blue-600 to-tech-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      {/* Shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

                      {/* Content */}
                      <div className="relative z-10 flex items-center justify-center gap-3 py-1">
                        <LogIn className="h-5 w-5 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110" />
                        <span className="font-semibold">Đăng nhập</span>
                      </div>

                      {/* Floating particles effect */}
                      <div className="absolute top-2 right-3 w-1 h-1 bg-tech-blue-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-300"></div>
                      <div className="absolute bottom-2 left-4 w-0.5 h-0.5 bg-tech-blue-300 rounded-full opacity-0 group-hover:opacity-100 animate-pulse delay-150 transition-opacity duration-300"></div>
                    </Button>
                  </Link>

                  {/* Nút Tư vấn miễn phí cho mobile */}
                  <Button
                    className="w-full bg-tech-blue-500 hover:bg-tech-blue-600 transition-all duration-300 shadow-md hover:shadow-lg"
                    onClick={() => {
                      setOpenContact(true);
                      setIsOpen(false);
                    }}
                  >
                    Tư vấn miễn phí
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      {/* Form Contact */}
      <ContactDialog
        title="Đăng ký tư vấn miễn phí"
        des="Vui lòng để lại thông tin của bạn. Chúng tôi sẽ liên hệ tư vấn hoàn toàn miễn phí trong thời gian sớm nhất."
        open={openContact}
        onOpenChange={setOpenContact}
      />
    </header>
  );
}
