import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, ChevronUp, Menu, ShoppingBasket } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { useRouter } from 'next/router';
import { Button } from './ui/button';
import { MastheadProps } from '@/types/interface';
import { cn } from '@/lib/utils';
import { useCart } from '@/hooks/use-cart';

const FEATURES = [
  {
    img: '/masthead/1.png',
    title: 'GIAO HÀNG NHANH CHÓNG',
    desc: 'Ship COD tận nhà, giao hàng toàn quốc',
  },
  {
    img: '/masthead/2.png',
    title: 'HỖ TRỢ 24/7',
    desc: (
      <>
        Hotline:{' '}
        <a href="tel:0916953355" className="underline">
          0916 95 33 55
        </a>
      </>
    ),
  },
  {
    img: '/masthead/3.png',
    title: 'GIỜ LÀM VIỆC',
    desc: 'T2 - T7 Giờ hành chính',
  },
  {
    img: '/masthead/4.png',
    title: 'UY TÍN, CHẤT LƯỢNG',
    desc: 'Được kiểm hàng trước khi nhận',
  },
];

export default function Masthead({ navigation }: MastheadProps) {
  const router = useRouter();
  const pathname = router.pathname;

  const { cart, removeItem } = useCart();
  const cartRef = useRef<HTMLDivElement>(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [openItem, setOpenItem] = useState<number | null>(null);

  const toggleItem = (id: number) => {
    setOpenItem(openItem === id ? null : id);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN').format(value) + ' VNĐ';
  };
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Tổng tiền
  const cartTotal = formatCurrency(
    cart.reduce((sum, item) => sum + item.price * 1000 * item.quantity, 0)
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setCartOpen(false);
      }
    }
    if (cartOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [cartOpen]);

  const handleTurnPage = (url: string) => {
    setCartOpen(false);
    router.push(url);
  };

  return (
    <div
      id="masthead"
      className="relative  border-b border-gray-100 bg-white backdrop-blur "
    >
      <div className="flex w-full container items-center justify-between ">
        {/* Left: Logo + Mobile menu button */}
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger className="md:hidden">
            <Button variant="orange" size="icon">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <div className="flex flex-col p-0 font-sans">
              {navigation.map((item) => {
                const isActive = pathname === item.url;
                const isOpen = openItem === item.id;
                return (
                  <div key={item.id} className="border-b ">
                    <div
                      className={`relative group  py-3 pl-4 transition-colors duration-200 ease-in-out ${
                        isOpen ? 'bg-neutral-gray-100' : 'bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <Link href={item.url} legacyBehavior>
                          <a
                            className={cn(
                              'block text-[0.8rem] font-bold uppercase',
                              isOpen
                                ? 'text-neutral-gray-950'
                                : 'text-neutral-gray-500 '
                            )}
                          >
                            {item.title}
                          </a>
                        </Link>

                        {item.children && item.children.length > 0 && (
                          <button
                            onClick={() => toggleItem(item.id)}
                            className="pr-4 focus:outline-none"
                          >
                            {isOpen ? (
                              <ChevronUp className="h-4 w-4 text-neutral-gray-950" />
                            ) : (
                              <ChevronDown className="h-4 w-4 text-neutral-gray-500" />
                            )}
                          </button>
                        )}
                      </div>

                      {/* Submenu */}
                      {isOpen && item.children && (
                        <div className="pl-3">
                          {item.children.map((child) => (
                            <div>
                              <Link
                                key={child.id}
                                href={child.url}
                                legacyBehavior
                              >
                                <a className="block py-2 font-sans font-semibold text-black text-[0.8rem] uppercase ">
                                  {child.title}
                                </a>
                              </Link>
                              <div className="pl-2">
                                {child.children.map((sub) => (
                                  <div>
                                    <Link
                                      key={sub.id}
                                      href={sub.url}
                                      legacyBehavior
                                    >
                                      <a className="block py-2 font-sans font-medium text-neutral-gray-500 text-sm ">
                                        {sub.title}
                                      </a>
                                    </Link>
                                    <div className="pl-2"></div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex items-center min-w-0 overflow-hidden w-full justify-center md:justify-start">
          <div className="flex items-center justify-center md:justify-start [@media(min-width:576px)]:min-w-[390px]">
            <Link href="/" aria-label="Thực phẩm HNH" className="block">
              <div className="relative w-[70px] h-[70px] sm:w-[162px] sm:h-[162px] mx-auto">
                <Image
                  src="/logo.jpg"
                  alt="Thực phẩm HNH"
                  layout="fill"
                  priority
                  className="rounded-full object-cover"
                />
              </div>
            </Link>
          </div>

          {/* Desktop: feature strip (left side) */}
          <div className="hidden md:block font-brand text-[0.9rem]">
            <div
              className="grid grid-cols-2 gap-3  md:grid-cols-2 lg:grid-cols-2"
              style={{
                color: '#131313',
                lineHeight: '1.6rem',
                textAlign: 'left',
              }}
            >
              {FEATURES.map((f, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="relative ">
                    <Image
                      src={f.img}
                      alt={f.title}
                      fill
                      width={56}
                      height={56}
                      className="object-contain"
                    />
                  </div>
                  <div className="leading-tight">
                    <p
                      className="font-bold font-sans"
                      style={{
                        lineHeight: '1.44rem',
                      }}
                    >
                      {f.title}
                    </p>
                    <p
                      style={{
                        lineHeight: '1.44rem',
                      }}
                    >
                      {f.desc as any}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Cart (desktop) + Mobile toggles */}
        <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
          {/* Desktop cart */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setCartOpen((v) => !v)}
              className="flex items-center gap-1 px-2 py-1  rounded-full font-bold border border-orange-500  text-white  bg-orange-400 hover:bg-[#d87f04] transition-colors uppercase"
              aria-haspopup="true"
              aria-expanded={cartOpen}
              aria-controls="cart-dropdown"
            >
              <span className="text-[0.9rem]">Giỏ hàng /</span>
              <span className="text-lg">{cartTotal}</span>
              <ShoppingBasket className="h-18 w-18" />

              {cartCount > 0 && (
                <span className="z-[9999] absolute -top-1 -right-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white text-[11px] font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            {cartOpen && (
              <div
                ref={cartRef}
                id="cart-dropdown"
                role="menu"
                className="absolute right-0 mt-3 w-80 rounded-md border border-gray-200 bg-white p-4 shadow-2xl z-[9999]
                    before:content-[''] before:absolute before:top-[-6px] before:left-2/3 
                    before:w-3 before:h-3 before:bg-white before:rotate-45 before:border-l-2 
                    before:border-gray-200 before:border-t-2 "
              >
                <h4 className="mb-2 text-neutral-gray-600 text-center text-md font-semibold uppercase">
                  Giỏ hàng
                </h4>
                <div className="w-full my-2 h-px bg-gray-300" />

                {cart.length === 0 ? (
                  <p className="text-sm text-gray-600">
                    Chưa có sản phẩm trong giỏ hàng.
                  </p>
                ) : (
                  <ul className="space-y-3 max-h-64 pr-2 overflow-y-auto scrollbar-thumb-only">
                    {cart.map((item) => (
                      <li
                        key={item.id}
                        className="flex items-center gap-3 border-b border-gray-200 py-2"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded "
                        />
                        <div className="flex-1">
                          <p className="text-[0.9rem] font-medium text-neutral-gray-900 line-clamp-1">
                            {item.name} {item.unit && ' (' + item.unit + ')'}
                          </p>
                          <p className="text-xs text-gray-500">
                            <span className="text-orange-400">
                              {formatCurrency(item.price * 1000)}
                            </span>{' '}
                            x {item.quantity}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="border border-red-500 rounded-full px-2 py-1 text-red-500 hover:text-red-700 text-xs font-bold"
                        >
                          X
                        </button>
                      </li>
                    ))}
                  </ul>
                )}

                <div className=" py-3 text-neutral-gray-400 text-center text-sm ">
                  <strong>
                    Tổng tiền :{' '}
                    <span className="text-base text-orange-500">
                      {cartTotal}
                    </span>
                  </strong>
                </div>

                {cart.length > 0 && (
                  <div className="space-y-3 ">
                    <button
                      className="uppercase w-full border-2 border-green-cyan-400 hover:border-green-cyan-600 hover:text-green-cyan-600 text-green-cyan-400 text-sm font-semibold py-2 rounded transition"
                      onClick={() => handleTurnPage('/gio-hang')}
                    >
                      Xem giỏ hàng
                    </button>
                    <button
                      className="uppercase w-full bg-green-cyan-500 hover:bg-green-cyan-400 text-white text-sm font-semibold py-2 rounded transition"
                      onClick={() => handleTurnPage('/thanh-toan')}
                    >
                      Thanh toán
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile cart button */}
          <button
            onClick={() => setCartOpen(true)}
            className="flex items-center gap-1 p-1 rounded-full font-bold border border-orange-500 text-white bg-orange-400 hover:bg-[#d87f04] transition-colors md:hidden"
            aria-label="Mở giỏ hàng"
          >
            <div className="relative">
              <ShoppingBasket className="h-5 w-5" />

              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 inline-flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white text-[11px] font-bold">
                  {cartCount}
                </span>
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-auto max-w-7xl px-4">
        <div className="h-px w-full bg-gray-100" />
      </div>

      {/* Off-canvas MOBILE CART */}
      {cartOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setCartOpen(false)}
          />
          <aside className="absolute right-0 top-0 h-full w-80 max-w-[85%] bg-white p-4 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-semibold uppercase">Giỏ hàng</span>
              <button
                onClick={() => setCartOpen(false)}
                aria-label="Đóng giỏ hàng"
                className="rounded-full border border-gray-200 p-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 11-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div className="rounded-lg border border-gray-200 p-4">
              <p className="text-sm text-gray-600">
                Chưa có sản phẩm trong giỏ hàng.
              </p>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
