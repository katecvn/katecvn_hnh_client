'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

import api from '@/utils/axios';
import TopBar from './topbar';
import Masthead from './masthead';
import { CategoryPro, NavItem } from '@/types/interface';
import { ChevronDown, ChevronRight, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Header() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [navigationMenu, setNavigationMenu] = useState<NavItem[]>([]);
  const [categories, setCategories] = useState<CategoryPro[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchNavigationMenu = async (): Promise<void> => {
      setLoading(true);
      setError(null);
      const requests = [];

      requests.push(api.get('/navigation/public/shows')); // index 0
      requests.push(api.get('/category/public/shows-tree'));

      try {
        const [navRes, categoryRes] = await Promise.all(requests);

        const menuItems = navRes.data.data.filter(
          (item: any) => item.parentId === null
        );
        setNavigationMenu(menuItems);
        setCategories(categoryRes.data.data || []);
      } catch (error: any) {
        const message =
          error.response?.data?.message ||
          error.message ||
          'Không thể tải dữ liệu trang tin tức';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchNavigationMenu();
  }, []);

  return (
    <header className="fixed top-0 w-full z-50 bg-green-cyan-500 transition-all duration-300 font-sans">
      <div
        className={cn(
          'transition-all duration-500 ',
          isScrolled ? 'max-h-0 opacity-0' : 'max-h-[200px] opacity-100'
        )}
      >
        <TopBar />
        <Masthead navigation={navigationMenu} />
      </div>

      <div className="container hidden md:block transition-all duration-500">
        <div className="flex items-center justify-between">
          {/* Desktop Navigation */}
          <nav className="md:flex items-center space-x-8 ">
            {navigationMenu.map((item) => (
              <div key={item.id} className="relative group">
                <Link
                  href={item.url === '/san-pham' ? `${item.url}` : item.url}
                >
                  <a className="flex items-center text-[0.9rem] leading-[1.4rem] text-white font-bold uppercase py-[10px]">
                    {item.title}
                    {item.children.length > 0 && (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    )}
                  </a>
                </Link>

                {/* cấp 1: dropdown */}
                {item.url === '/san-pham' && categories.length > 0 && (
                  <div
                    className="absolute text-base  left-0 top-full hidden group-hover:block bg-white shadow-md min-w-[260px] z-50
                    border border-gray-300 before:content-[''] before:absolute before:top-[-6px] before:left-6 
                    before:w-3 before:h-3 before:bg-white before:rotate-45 "
                  >
                    {categories.map((cat) => (
                      <div key={cat.id} className="relative group/item">
                        <div
                          className={cn(
                            ' block px-4 py-2  hover:bg-lime-green hover:text-white',
                            cat.subCategories.length > 0
                              ? 'text-gray-800'
                              : 'text-gray-600'
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <Link href={`/san-pham?danh_muc=${cat.id}`}>
                              {cat.name}
                            </Link>

                            {cat.subCategories &&
                              cat.subCategories.length > 0 && (
                                <ChevronRight className="h-4 w-4 p-0 m-0" />
                              )}
                          </div>
                        </div>

                        {/* cấp 2: submenu (nếu có con tiếp) */}
                        {cat.subCategories.length > 0 && (
                          <div className="absolute left-full top-0 hidden group-hover/item:block bg-white shadow-md min-w-[260px] z-50">
                            {cat.subCategories.map((sub) => (
                              <Link
                                key={sub.id}
                                href={`/san-pham?danh_muc=${sub.id}`}
                              >
                                <a className="block px-4 py-2 text-gray-800  hover:bg-lime-green hover:text-white">
                                  {sub.name}
                                </a>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <form
            action="/"
            method="get"
            className=" relative text-white w-full max-w-[440px] text-[0.8rem]"
          >
            <label htmlFor="search" className="sr-only">
              Tìm kiếm
            </label>

            {/* Input */}
            <input
              type="search"
              id="search"
              name="s"
              placeholder="Tìm kiếm..."
              className="w-full rounded-full bg-[#ffffff33] border border-green-200/20 placeholder-white/80 px-2 py-1  focus:outline-none"
            />

            {/* Nút icon kính lúp */}
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full  "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-3.35z"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
