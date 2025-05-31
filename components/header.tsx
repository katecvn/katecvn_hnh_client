'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Code2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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
    // { name: "Dịch vụ", href: "/services" },
    { name: 'Tin tức', href: '/news' },
    { name: 'Về chúng tôi', href: '/about' },
    { name: 'Liên hệ', href: '/contact' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-tech-blue-200'
          : 'bg-blue-900/80 backdrop-blur-sm border-b border-gray-700/50'
      )}
    >
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex items-center gap-3">
              {/* Animated Logo Icon */}
              <div className="relative group cursor-pointer">
                {/* Outer glow ring */}
                <div className="absolute inset-0 w-10 h-10 bg-gradient-to-r from-blue-900 via-sky-400 to-purple-600 rounded-full blur-md opacity-75 group-hover:opacity-100 group-hover:blur-lg transition-all duration-500 animate-pulse"></div>

                {/* Main logo container */}
                <div className="relative w-10 h-10 bg-gradient-to-br from-blue-900 via-sky-400 to-purple-600 rounded-full p-0.5 group-hover:scale-110 transition-transform duration-300">
                  {/* Inner gradient circle - Changed to white background */}
                  <div className="w-full h-full bg-white rounded-full flex items-center justify-center relative overflow-hidden">
                    {/* Animated shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

                    {/* Logo letter K */}
                    <span className="text-sm font-black bg-gradient-to-br from-blue-900 to-purple-600 bg-clip-text text-transparent relative z-10">
                      <img src="/favicon.ico" />
                    </span>

                    {/* Floating particles */}
                    <div className="absolute top-1 right-1 w-1 h-1 bg-sky-300 rounded-full animate-ping"></div>
                    <div className="absolute bottom-1 left-1 w-0.5 h-0.5 bg-purple-400 rounded-full animate-pulse delay-300"></div>
                  </div>
                </div>
              </div>

              {/* Enhanced Text Logo */}
              <div className="relative group">
                <span
                  className={cn(
                    'text-2xl font-black tracking-tight relative transition-all duration-500',
                    isScrolled
                      ? 'bg-gradient-to-r from-blue-900 via-sky-400 to-purple-600 bg-clip-text text-transparent'
                      : 'text-white',
                    'group-hover:from-sky-300 group-hover:via-purple-400 group-hover:to-blue-500',
                    isScrolled ? 'opacity-90 scale-95' : 'opacity-100 scale-100'
                  )}
                >
                  Katec
                  {/* Underline accent */}
                  <div
                    className={cn(
                      'absolute -bottom-1 left-0 h-0.5 transition-all duration-500 w-0 group-hover:w-full',
                      isScrolled
                        ? 'bg-gradient-to-r from-blue-900 via-sky-400 to-purple-600'
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
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-tech-blue-400',
                  isScrolled ? 'text-tech-blue-700' : 'text-white/90'
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant={isScrolled ? 'outline' : 'secondary'}
              size="sm"
              asChild
              className={cn(
                'transition-all duration-300',
                isScrolled
                  ? 'border-tech-blue-500 text-tech-blue-600 hover:bg-tech-blue-500 hover:text-white'
                  : 'bg-tech-blue-500 text-white hover:bg-tech-blue-600'
              )}
            >
              <Link href="/contact">Tư vấn miễn phí</Link>
            </Button>
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                className={cn(isScrolled ? 'text-tech-blue-900' : 'text-white')}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4 mt-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-lg font-medium text-tech-blue-700 hover:text-tech-blue-600 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-4 border-t border-tech-blue-200">
                  <Button
                    className="w-full bg-tech-blue-500 hover:bg-tech-blue-600"
                    asChild
                  >
                    <Link href="/contact" onClick={() => setIsOpen(false)}>
                      Tư vấn miễn phí
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
