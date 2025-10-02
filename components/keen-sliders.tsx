'use client';

import { useKeenSlider } from 'keen-slider/react';
import Image from 'next/image';
import Link from 'next/link';
import 'keen-slider/keen-slider.min.css';
import { TitleHome } from './enhanced-title';
import { News, ProductCardData, SectionItem } from '@/types/interface';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductCard } from './enhanced-cards';

/* ---------------- Autoplay Plugin ---------------- */
export default function AutoplayPlugin(ms = 3000) {
  return (slider: any) => {
    let timeout: ReturnType<typeof setTimeout>;
    let mouseOver = false;

    function clearNextTimeout() {
      clearTimeout(timeout);
    }

    function nextTimeout() {
      clearTimeout(timeout);
      if (mouseOver) return;
      timeout = setTimeout(() => {
        if (slider && slider.track && slider.track.details) {
          slider.next();
        }
      }, ms);
    }

    slider.on('created', () => {
      slider.container?.addEventListener('mouseover', () => {
        mouseOver = true;
        clearNextTimeout();
      });
      slider.container?.addEventListener('mouseout', () => {
        mouseOver = false;
        nextTimeout();
      });
      nextTimeout();
    });

    slider.on('dragStarted', clearNextTimeout);
    slider.on('animationEnded', nextTimeout);
    slider.on('updated', nextTimeout);
    slider.on('destroyed', clearNextTimeout); // cleanup khi unmount
  };
}

/* ---------------- Recent News ---------------- */

export function RecentNewsSlider({ posts }: { posts: News[] }) {
  const hasBanners = posts && posts.length > 0;
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    hasBanners
      ? {
          loop: true,
          mode: 'free-snap',
          slides: { perView: 1, spacing: 20 },
        }
      : undefined,
    hasBanners ? [AutoplayPlugin(5000)] : []
  );

  return (
    <div ref={sliderRef} className="keen-slider">
      {posts.map((item) => (
        <div key={item.id} className="keen-slider__slide relative group">
          <Link href={`/tin-tuc/${item.slug}`} legacyBehavior>
            <a className="block">
              <div className="overflow-hidden rounded">
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  width={800}
                  height={450}
                  className="object-cover w-full aspect-video group-hover:scale-105 transition-transform"
                />
              </div>
              <h3 className="mt-1 mb-2 text-base text-justify font-semibold text-neutral-gray-900 line-clamp-2">
                {item.title}
              </h3>
              <p className="m-0 text-[0.9rem] text-justify text-neutral-gray-800 line-clamp-3">
                {item.short_description}
              </p>
            </a>
          </Link>

          {/* Prev button */}
          <button
            onClick={() => instanceRef.current && instanceRef.current.prev()}
            className="flex items-center justify-between p-1 absolute left-1 top-1/4 -translate-y-1/2 bg-white/80 hover:border-neutral-gray-900 border border-neutral-gray-400 rounded-full shadow opacity-0 group-hover:opacity-100 transition"
          >
            <ChevronLeft className="w-6 h-6 text-neutral-gray-400 hover:text-neutral-gray-900" />
          </button>

          {/* Next button */}
          <button
            onClick={() => instanceRef.current && instanceRef.current.next()}
            className="flex items-center justify-between p-1 absolute right-1 top-1/4 -translate-y-1/2 bg-white/80 hover:border-neutral-gray-900 border border-neutral-gray-400 rounded-full shadow opacity-0 group-hover:opacity-100 transition"
          >
            <ChevronRight className="w-6 h-6 text-neutral-gray-400 hover:text-neutral-gray-900" />
          </button>
        </div>
      ))}
    </div>
  );
}

/* ---------------- Certificate ---------------- */
export function CertificateSlider() {
  return (
    <div className="block relative w-full aspect-[30/41] border-2 border-orange-200">
      <Image
        src="/CN-ISO-22000-nam-2024.jpg"
        alt="Giấy chứng nhận"
        layout="fill"
        objectFit="cover"
      />
    </div>
  );
}

/* ---------------- Banner ---------------- */
export function BannerSlider({ banners }: { banners: SectionItem[] }) {
  const hasBanners = banners && banners.length > 0;

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    hasBanners
      ? {
          loop: true,
          mode: 'free-snap',
          slides: { perView: 1, spacing: 20 },
        }
      : undefined,
    hasBanners ? [AutoplayPlugin(4000)] : []
  );

  if (!hasBanners) {
    return null;
  }

  return (
    <div ref={sliderRef} className="keen-slider">
      {banners.map((item) => (
        <div key={item.id} className="keen-slider__slide relative group">
          <div className="relative w-full aspect-[7/3] md:aspect-[5/2]">
            <Image
              src={item.content[0]?.imageUrl ?? '/placeholder.png'}
              alt={item.content[0]?.title || 'Banner'}
              layout="fill"
              objectFit="cover"
              className="w-full transition-transform"
            />
          </div>

          {/* Prev button */}
          <button
            onClick={() => instanceRef.current?.prev()}
            className="flex items-center justify-between p-1 absolute left-1 top-1/2 -translate-y-1/2 bg-white/20 hover:border-green-cyan-500 border-2 border-white rounded-full shadow opacity-0 group-hover:opacity-100 transition"
          >
            <ChevronLeft className="w-8 h-8 text-white hover:text-green-cyan-500" />
          </button>

          {/* Next button */}
          <button
            onClick={() => instanceRef.current?.next()}
            className="flex items-center justify-between p-1 absolute right-1 top-1/2 -translate-y-1/2 bg-white/20 hover:border-green-cyan-500 border-2 border-white rounded-full shadow opacity-0 group-hover:opacity-100 transition"
          >
            <ChevronRight className="w-8 h-8 text-white hover:text-green-cyan-500" />
          </button>
        </div>
      ))}
    </div>
  );
}

/* ---------------- Products ---------------- */
export function ProductsSlider({
  slide,
  isShoppingCart = false,
  products,
}: {
  slide: number;
  isShoppingCart?: boolean;
  products: ProductCardData[];
}) {
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      mode: 'free-snap',
      breakpoints: {
        '(max-width: 1024px)': { slides: { perView: 4, spacing: 16 } },
        '(max-width: 768px)': { slides: { perView: 3, spacing: 16 } },
        '(max-width: 576px)': { slides: { perView: 2, spacing: 16 } },
      },
      slides: { perView: slide, spacing: 20 },
    },
    [AutoplayPlugin(6000)]
  );

  return (
    <div className="relative group">
      <div ref={sliderRef} className="keen-slider">
        {products.slice(0, 12).map((product) => (
          <div key={product.id} className="keen-slider__slide">
            <ProductCard product={product} isShoppingCart={isShoppingCart} />
          </div>
        ))}
      </div>

      {/* Prev button */}
      <button
        onClick={() => instanceRef.current && instanceRef.current.prev()}
        className="absolute left-1 top-1/2 -translate-y-1/2 flex items-center justify-center p-1 rounded-full bg-white/60 border border-gray-300 shadow hover:border-gray-600 opacity-0 group-hover:opacity-100 transition z-50"
      >
        <ChevronLeft className="w-8 h-8 text-gray-500 hover:text-gray-600" />
      </button>

      {/* Next button */}
      <button
        onClick={() => instanceRef.current && instanceRef.current.next()}
        className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center justify-center p-1 rounded-full bg-white/60 border border-gray-300 shadow hover:border-gray-600 opacity-0 group-hover:opacity-100 transition z-50"
      >
        <ChevronRight className="w-8 h-8 text-gray-500 hover:text-gray-600" />
      </button>
    </div>
  );
}

/* ---------------- News ---------------- */
export function NewsSlider({ posts }: { posts: News[] }) {
  const hasBanners = posts && posts.length > 0;
  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    hasBanners
      ? {
          loop: true,
          mode: 'free-snap',
          breakpoints: {
            '(max-width: 1024px)': { slides: { perView: 4, spacing: 16 } },
            '(max-width: 768px)': { slides: { perView: 3, spacing: 16 } },
            '(max-width: 576px)': { slides: { perView: 1, spacing: 8 } },
          },
          slides: { perView: 5, spacing: 20 },
        }
      : undefined,
    hasBanners ? [AutoplayPlugin(8000)] : []
  );

  return (
    <div ref={sliderRef} className="keen-slider">
      {posts.map((post) => (
        <div
          key={post.id}
          className="keen-slider__slide group mb-5 bg-white rounded shadow border border-gray-200 hover:shadow-lg transition-shadow"
        >
          <Link href={`/tin-tuc/${post.slug}`} legacyBehavior>
            <a>
              <div className="relative w-full h-36 cursor-pointer">
                <Image
                  src={post.thumbnail}
                  alt={post.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t group-hover:scale-105"
                />
              </div>
              <div className="pt-2 px-4 pb-5">
                <h5 className="font-semibold text-base text-gray-800 group-hover:text-green-cyan-500 leading-[1.3rem] mb-2 line-clamp-2">
                  {post.title}
                </h5>
                <p className="text-gray-600 text-[0.9rem] leading-[1.5rem] line-clamp-3 lg:line-clamp-4">
                  {post.short_description}
                </p>
              </div>
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
}

/* ---------------- Help Shopping ---------------- */
export function HelpShoppingSlider({ posts }: { posts: News[] }) {
  const hasBanners = posts && posts.length > 0;
  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    hasBanners
      ? {
          loop: true,
          mode: 'free-snap',
          breakpoints: {
            '(max-width: 1024px)': { slides: { perView: 2, spacing: 16 } },
            '(max-width: 576px)': { slides: { perView: 1, spacing: 8 } },
          },
          slides: { perView: 3, spacing: 20 },
        }
      : undefined,
    hasBanners ? [AutoplayPlugin(10000)] : []
  );

  return (
    <div ref={sliderRef} className="keen-slider">
      {posts.map((post) => (
        <div
          key={post.id}
          className="keen-slider__slide hover:scale-105 mb-8 bg-white rounded shadow border border-gray-200 hover:shadow-xl transition-all duration-300"
        >
          <Link href={`/huong-dan/${post.slug}`} legacyBehavior>
            <a>
              <div className="relative w-full aspect-[5/3] pt-3 px-4 overflow-hidden">
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-full h-full rounded-2xl transform transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="py-4 px-4 ">
                <h5 className="font-semibold mb-0 text-center text-base text-gray-800 leading-[1.3rem] line-clamp-2 transition-colors duration-300 hover:text-green-cyan-500">
                  {post.title}
                </h5>
              </div>
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
}

/* ---------------- Partner ---------------- */
interface PartnerProps {
  partners: SectionItem[];
}

export function PartnerSlider({ partners }: PartnerProps) {
  const hasBanners = partners && partners.length > 0;
  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    hasBanners
      ? {
          loop: true,
          breakpoints: {
            '(max-width: 1024px)': { slides: { perView: 4, spacing: 16 } },
            '(max-width: 576px)': { slides: { perView: 2, spacing: 8 } },
          },
          slides: { perView: 6, spacing: 20 },
        }
      : undefined,
    hasBanners ? [AutoplayPlugin(5000)] : []
  );

  return (
    <div ref={sliderRef} className="keen-slider">
      {partners.map((item, index) => (
        <div
          key={item.id}
          className="keen-slider__slide mb-3 bg-white hover:shadow-lg transition-shadow"
        >
          <div className="relative w-full h-28 p-2 border-2 border-orange-200">
            <img
              src={item?.content[0]?.imageUrl || '/placeholder.svg'}
              alt={item?.content[0]?.title || `Partner ${index + 1}`}
              className="w-full h-full"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
