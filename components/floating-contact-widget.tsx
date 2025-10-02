// ChatWidget.tsx - Phiên bản không dùng useChat từ ai/react

'use client';

import React, { useEffect, useState } from 'react';

import { ArrowUp, ChevronUp, Phone } from 'lucide-react';

import Link from 'next/link';

export function QuickContact() {
  return (
    <div className="fixed bottom-4 left-2 sm:left-4 flex items-center z-50">
      <ul className="fixed left-4 bottom-14 sm:left-8 sm:bottom-20 flex flex-col space-y-2 ">
        {/* Facebook */}
        <li>
          <Link href="https://zalo.me/0916953355" passHref legacyBehavior>
            <a target="_blank" rel="nofollow" className="block w-full h-full">
              <img
                src="/fb.webp"
                alt="Facebook"
                className="w-8 h-8 sm:w-11 sm:h-11 rounded-full shadow-md hover:scale-110 transition-transform"
              />
            </a>
          </Link>
        </li>

        {/* Zalo */}
        <li>
          <Link href="https://zalo.me/0916953355" passHref legacyBehavior>
            <a target="_blank" rel="nofollow" className="block w-full h-full">
              <img
                src="/zl.webp"
                alt="Zalo"
                className=" w-8 h-8 sm:w-11 sm:h-11 rounded-full shadow-md hover:scale-110 transition-transform"
              />
            </a>
          </Link>
        </li>
      </ul>

      {/* Nút gọi điện */}
      <div className="flex items-center p-0.5 sm:p-1 rounded-full bg-red-50">
        <div className="relative">
          <Link href="tel:0916953355" className="block">
            <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-red-500 flex items-center justify-center text-white shadow-lg animate-pulse">
              <Phone className=" h-4 w-4 sm:h-5 sm:w-5 animate-phone-ring" />
            </div>
          </Link>
          <span className="absolute inset-0 rounded-full border-4 border-red-400 animate-ping"></span>
        </div>
        <div className="mx-2 sm:mx-3 text-lg sm:text-2xl text-red-500 font-semibold">
          <Link href="tel:0916953355">0916 953 355</Link>
        </div>
      </div>
    </div>
  );
}

export function ScrollToTop() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed flex items-center bottom-6 right-3 sm:right-10 p-1 sm:p-2 rounded-full bg-neutral-gray-200 hover:bg-neutral-gray-500 transition z-50"
        >
          <ArrowUp className="w-6 h-6 sm:w-7 sm:h-7 text-neutral-gray-800 hover:text-white" />
        </button>
      )}
    </div>
  );
}
