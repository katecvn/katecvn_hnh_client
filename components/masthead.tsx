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
import { PriceVND } from '@/utils/format';

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
        <a
          href="tel:0916953355"
          className="underline hover:text-emerald-400 transition-colors"
        >
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

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Tổng tiền
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
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
    router.push(url);
    setCartOpen(false);
  };

  return (
    <div
      id="masthead"
      className="relative border-b border-emerald-200/50 bg-gradient-to-br from-emerald-50 via-white to-teal-50 backdrop-blur-sm shadow-lg"
      style={{
        background: `
          linear-gradient(135deg, 
            #f0fdfa 0%, 
            #ffffff 35%, 
            #f0f9ff 70%, 
            #ecfdf5 100%
          )
        `,
      }}
    >
      {/* Subtle animated background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-100/20 via-transparent to-teal-100/20 animate-pulse"></div>
      </div>

      <div className="flex w-full container items-center justify-between relative z-10">
        {/* Left: Logo + Mobile menu button */}
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger className="md:hidden">
            <Button
              variant="orange"
              size="icon"
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 border-0 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="bg-gradient-to-b from-emerald-50 to-white"
          >
            <div className="flex flex-col p-0 font-sans">
              {navigation.map((item) => {
                const isActive = pathname === item.url;
                const isOpen = openItem === item.id;
                return (
                  <div key={item.id} className="border-b border-emerald-100/50">
                    <div
                      className={`relative group py-3 pl-4 transition-all duration-300 ease-in-out ${
                        isOpen
                          ? 'bg-gradient-to-r from-emerald-100 to-teal-50'
                          : 'bg-transparent hover:bg-emerald-50/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <Link href={item.url} legacyBehavior>
                          <a
                            className={cn(
                              'block text-[0.8rem] font-bold uppercase transition-colors duration-200',
                              isOpen
                                ? 'text-emerald-800'
                                : 'text-slate-600 hover:text-emerald-700'
                            )}
                          >
                            {item.title}
                          </a>
                        </Link>

                        {item.children && item.children.length > 0 && (
                          <button
                            onClick={() => toggleItem(item.id)}
                            className="pr-4 focus:outline-none hover:scale-110 transition-transform"
                          >
                            {isOpen ? (
                              <ChevronUp className="h-4 w-4 text-emerald-700" />
                            ) : (
                              <ChevronDown className="h-4 w-4 text-slate-500" />
                            )}
                          </button>
                        )}
                      </div>

                      {/* Submenu */}
                      {isOpen && item.children && (
                        <div className="pl-3 animate-in slide-in-from-top-1 duration-200">
                          {item.children.map((child) => (
                            <div key={child.id}>
                              <Link href={child.url} legacyBehavior>
                                <a className="block py-2 font-sans font-semibold text-slate-700 hover:text-emerald-600 text-[0.8rem] uppercase transition-colors">
                                  {child.title}
                                </a>
                              </Link>
                              <div className="pl-2">
                                {child.children?.map((sub) => (
                                  <div key={sub.id}>
                                    <Link href={sub.url} legacyBehavior>
                                      <a className="block py-2 font-sans font-medium text-slate-500 hover:text-emerald-500 text-sm transition-colors">
                                        {sub.title}
                                      </a>
                                    </Link>
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
          <div className="flex items-center justify-center py-1 h-full md:justify-start [@media(min-width:1200px)]:min-w-[390px]">
            <Link href="/" aria-label="Thực phẩm HNH" className="block group">
              <div className="relative border-4 border-emerald-200/50 w-[70px] h-[70px] sm:w-[156px] sm:h-[156px] mx-auto rounded-full hover:scale-105 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <Image
                  src="/logo.jpg"
                  alt="Thực phẩm HNH"
                  layout="fill"
                  priority
                  className="rounded-full  object-cover  group-hover:border-emerald-300/70 transition-all duration-300 "
                />
              </div>
            </Link>
          </div>

          {/* Desktop: feature strip (left side) */}
          <div className="hidden md:block font-brand text-[0.9rem]">
            <div
              className="grid grid-cols-2 pt-2 gap-2 md:grid-cols-2 lg:grid-cols-2"
              style={{
                color: '#0f172a',
                lineHeight: '1.6rem',
                textAlign: 'left',
              }}
            >
              {FEATURES.map((f, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 group hover:scale-105 transition-all duration-300 p-1 rounded-lg "
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-300"></div>
                    <Image
                      src={f.img}
                      alt={f.title}
                      fill
                      width={56}
                      height={56}
                      className="object-contain relative z-10"
                    />
                  </div>
                  <div className="leading-tight">
                    <p
                      className="font-bold font-sans text-emerald-800 group-hover:text-emerald-900 transition-colors"
                      style={{
                        lineHeight: '1.44rem',
                      }}
                    >
                      {f.title}
                    </p>
                    <p
                      className="text-slate-600 group-hover:text-slate-700 transition-colors"
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
              className="flex items-center gap-1 px-4 py-2 rounded-full font-bold text-white transition-all duration-300 uppercase shadow-lg hover:shadow-xl transform hover:scale-105"
              style={{
                background: `linear-gradient(135deg, 
                  #fb8b3aff 0%, 
                  #f8722bff 50%, 
                  #f55a17ff 100%
                )`,
              }}
              aria-haspopup="true"
              aria-expanded={cartOpen}
              aria-controls="cart-dropdown"
            >
              <ShoppingBasket className="h-5 w-5" />
              <span className="text-[0.9rem]">Giỏ hàng /</span>

              <PriceVND
                value={cartTotal}
                className="text-lg font-bold"
                symbolClassName="text-sm align-baseline"
              />
              {cartCount > 0 && (
                <span className="z-[9999] absolute -top-1 -right-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white text-[0.8rem] font-bold shadow-lg">
                  {cartCount}
                </span>
              )}
            </button>

            {cartOpen && (
              <div
                ref={cartRef}
                id="cart-dropdown"
                role="menu"
                className="absolute right-0 mt-3 w-80 rounded-xl border border-emerald-200/50 shadow-2xl z-[9999] backdrop-blur-sm animate-in slide-in-from-top-2 duration-200"
                style={{
                  background: `linear-gradient(135deg, 
                    #ffffff 0%, 
                    #f0fdfa 50%, 
                    #ecfdf5 100%
                  )`,
                }}
              >
                {/* Arrow pointer */}
                <div className="absolute -top-2 right-6 w-4 h-4 bg-white border-l border-t border-emerald-200/50 transform rotate-45"></div>

                <div className="p-4">
                  <h4 className="mb-2 text-emerald-800 text-center text-md font-bold uppercase">
                    Giỏ hàng
                  </h4>
                  <div className="w-full my-2 h-px bg-gradient-to-r from-transparent via-emerald-300 to-transparent" />

                  {cart.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center">
                        <ShoppingBasket className="w-8 h-8 text-emerald-400" />
                      </div>
                      <p className="text-sm text-slate-500">
                        Chưa có sản phẩm trong giỏ hàng.
                      </p>
                    </div>
                  ) : (
                    <ul className="space-y-3 max-h-64 pr-2 overflow-y-auto scrollbar-thumb-only">
                      {cart.map((item) => (
                        <li
                          key={item.id}
                          className="flex items-center gap-3 border-b border-emerald-100/50 py-2 hover:bg-emerald-50/30 rounded-lg px-2 transition-colors"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded-lg ring-2 ring-emerald-200/50"
                          />
                          <div className="flex-1">
                            <p className="text-[0.9rem] font-medium text-slate-800 line-clamp-1">
                              {item.name} {item.unit && ' (' + item.unit + ')'}
                            </p>
                            <p className="text-xs text-slate-500">
                              <PriceVND
                                value={item.price}
                                className="text-orange-500 font-semibold"
                                symbolClassName="text-[0.6rem] align-baseline"
                              />{' '}
                              x {item.quantity}
                            </p>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="border-2 border-red-400 hover:border-red-500 rounded-full w-6 h-6 flex items-center justify-center text-red-500 hover:text-red-600 hover:bg-red-50 text-xs font-bold transition-all duration-200"
                          >
                            ✕
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className=" text-slate-600 text-center text-sm bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg my-3">
                    <strong>
                      Tổng tiền:{' '}
                      <PriceVND
                        value={cartTotal}
                        className="text-lg text-orange-600 font-bold"
                        symbolClassName="text-sm align-baseline"
                      />
                    </strong>
                  </div>

                  {cart.length > 0 && (
                    <div className="space-y-3">
                      <button
                        className="uppercase w-full border-2 border-emerald-400 hover:border-emerald-500 hover:text-emerald-600 text-emerald-500 text-sm font-semibold py-3 rounded-lg transition-all duration-300 hover:bg-emerald-50"
                        onClick={() => handleTurnPage('/gio-hang')}
                      >
                        Xem giỏ hàng
                      </button>
                      <button
                        className="uppercase w-full text-white text-sm font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                        style={{
                          background: `linear-gradient(135deg, 
                            #059669 0%, 
                            #047857 50%, 
                            #065f46 100%
                          )`,
                        }}
                        onClick={() => handleTurnPage('/thanh-toan')}
                      >
                        Thanh toán
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Mobile cart button */}
          <button
            onClick={() => setCartOpen(true)}
            className="flex items-center gap-1 p-2 rounded-full font-bold text-white shadow-lg hover:shadow-xl transition-all duration-300 md:hidden transform hover:scale-110"
            style={{
              background: `linear-gradient(135deg, 
                  #fb8b3aff 0%, 
                  #f8722bff 50%, 
                  #f55a17ff 100%
                )`,
            }}
            aria-label="Mở giỏ hàng"
          >
            <div className="relative">
              <ShoppingBasket className="h-5 w-5" />

              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white text-[10px] font-bold shadow-md animate-pulse">
                  {cartCount}
                </span>
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Enhanced Divider */}
      <div className="mx-auto max-w-7xl px-4">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-emerald-300 to-transparent opacity-60" />
      </div>

      {/* Off-canvas MOBILE CART */}
      {cartOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setCartOpen(false)}
          />
          <aside
            className="absolute right-0 top-0 h-full w-80 max-w-[85%] shadow-2xl animate-in slide-in-from-right duration-300"
            style={{
              background: `linear-gradient(180deg, 
                #ffffff 0%, 
                #f0fdfa 50%, 
                #ecfdf5 100%
              )`,
            }}
          >
            <div className="p-4">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-bold uppercase text-emerald-800">
                  Giỏ hàng
                </span>
                <button
                  onClick={() => setCartOpen(false)}
                  aria-label="Đóng giỏ hàng"
                  className="rounded-full border-2 border-emerald-200 hover:border-emerald-300 p-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 transition-all duration-200"
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
              <div className="rounded-xl border border-emerald-200/50 bg-white/50 backdrop-blur-sm p-4">
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center">
                    <ShoppingBasket className="w-8 h-8 text-emerald-400" />
                  </div>
                  <p className="text-sm text-slate-500">
                    Chưa có sản phẩm trong giỏ hàng.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
