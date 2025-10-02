import { memo, useEffect, useState } from 'react';
import {
  CategoriesProSidebar,
  NewsSidebar,
  ProductSidebar,
} from './sidebar-menu';
import api from '@/utils/axios';
import {
  ArticleContentProps,
  CategoryPro,
  NavItem,
  News,
  Product,
  ProductCardData,
  ProductCardsProps,
} from '@/types/interface';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  BadgeAlert,
  Calendar,
  CalendarDays,
  ChartArea,
  ChartNoAxesCombined,
  ChevronLeft,
  ChevronRight,
  FileText,
  Info,
  PackageOpen,
  Star,
  UserCircle,
} from 'lucide-react';
import { DateBadge } from './ui/date-badge';
import ShareButtons from './share-buttons';
import { ProductsSlider } from './keen-sliders';
import { useRouter } from 'next/router';
import { TitleCategory, TitleDetailProduct } from './enhanced-title';
import { RatingDialog } from './enhanced-modal';

export const ArticleContent = ({
  showHeader = true,
  post,
}: ArticleContentProps) => {
  const Content = memo(({ content }: { content: string }) => {
    return (
      <div
        className={`
        prose max-w-none break-words whitespace-normal
        prose-headings:text-gray-900 prose-headings:font-bold
        prose-p:text-gray-700 prose-p:leading-relaxed prose-p:text-justify
        prose-a:text-blue-600 prose-a:no-underline hover:prose-a:text-blue-500 prose-a:font-medium
        prose-strong:text-gray-900 prose-strong:font-bold
        prose-img:rounded-xl prose-img:shadow-lg prose-img:max-w-full prose-img:h-auto
        prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:rounded-r-lg prose-blockquote:text-gray-700
        prose-code:bg-gray-100 prose-code:text-blue-700 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:font-semibold
        [&_pre]:overflow-x-auto [&_pre]:p-3 [&_pre]:rounded-md [&_pre]:bg-gray-900 [&_pre]:text-gray-100
        [&_table]:block [&_table]:w-full [&_table]:overflow-x-auto [&_table]:text-sm
        [&_iframe]:w-full [&_iframe]:aspect-video [&_iframe]:rounded-lg
      `}
        style={{ textAlign: 'justify' }}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  });

  return (
    <div className="w-full bg-white rounded border border-gray-100 shadow-md p-2 sm:p-3 md:p-6 mb-5">
      {showHeader && (
        <div>
          <div className="text-left">
            <h1 className="text-neutral-gray-800 text-base sm:text-lg md:xl lg:text-2xl md:text-3xl font-bold mb-2 leading-snug">
              {post.title}
            </h1>

            <div className="w-10 h-1 bg-gray-200 mb-3"></div>

            <div className="text-xs sm:text-sm font-sans text-neutral-gray-400 flex flex-wrap gap-3">
              <span className="flex gap-1 items-center">
                <CalendarDays className="w-4 h-4" />
                <time dateTime={post.published_at}>
                  {new Date(post.published_at).toLocaleDateString('vi-VN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </time>
              </span>

              <span className="flex gap-1 items-center">
                <UserCircle className="w-4 h-4" />
                <span className="font-medium uppercase">
                  {post?.author?.full_name}
                </span>
              </span>
            </div>
          </div>

          {/* Thumbnail responsive */}
          <div className="relative mt-4 w-full aspect-[16/9]">
            <Image
              src={post.thumbnail ?? '/placeholder.png'}
              alt={post.title}
              layout="fill"
              className="rounded-lg object-cover"
              priority
            />
            <DateBadge date={post.published_at} />
          </div>
        </div>
      )}

      {/* Nội dung bài viết */}
      <div className="mt-6">
        <Content content={post.content} />
      </div>

      {showHeader && (
        <div className="mt6 md:mt-8">
          <ShareButtons
            url={`/tin-tuc/${post.slug}`}
            title={post.title}
            media={post.thumbnail}
          />
        </div>
      )}
    </div>
  );
};

export const PressSection = () => {
  const pressItems = [
    {
      href: 'https://hanoionline.vn/vung-rau-thanh-tri-doi-moi-de-thanh-cong-107946.htm',
      img: '/press/Nong-trai-thuc-pham-HNH.jpg', // tải ảnh này về /public/press
      alt: 'Vùng rau Thanh Trì đổi mới để thành công',
      text: 'Vùng rau Thanh Trì \nĐổi mới để thành công',
    },
    {
      href: 'https://vietnam.vnanet.vn/vietnamese/long-form/hnh-gop-phan-nang-tam-gia-tri-nong-san-thuc-pham-viet-315698.html',
      img: '/press/Le-ky-ket-hop-dong.jpg',
      alt: 'Lễ ký kết hợp đồng liên kết sản xuất - tiêu thụ sản phẩm',
      text: 'HNH góp phần nâng tầm giá trị Nông sản thực phẩm Việt',
    },
    {
      href: 'https://vietnam.vnanet.vn/vietnamese/tin-tuc/phat-trien-lien-ket-chuoi-gia-tri-trong-san-xuat-nong-nghiep-tai-huyen-thanh-tri-315562.html',
      img: '/press/HNH-Foodfarm.jpg',
      alt: 'HNH Foodfarm',
      text: 'Phát triển liên kết chuỗi giá trị trong sản xuất nông nghiệp tại huyện Thanh Trì',
    },
  ];
  return (
    <section className="pb-8">
      <h3 className="flex items-center justify-center mt-4 mb-6 md:mb-8 gap-4 text-center text-lg md:text-xl font-bold text-neutral-gray-700">
        <span className="flex-1 border-t-2 border-orange-500"></span>
        <span>BÁO CHÍ NÓI GÌ VỀ CHÚNG TÔI</span>
        <span className="flex-1 border-t-2 border-orange-500"></span>
      </h3>

      <div className="grid grid-cols-1 min-[400px]:grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
        {pressItems.map((item, idx) => (
          <div
            key={idx}
            className="group relative rounded overflow-hidden shadow-lg hover:shadow-xl transition"
          >
            <Link href={item.href} target="_blank" rel="noopener noreferrer">
              <a>
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src={item.img}
                    alt={item.alt}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition" />
                <div className="absolute bottom-0 w-full text-[0.9rem] text-center text-white p-2 md:p-4">
                  {item.text}
                </div>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

interface PostNavProps {
  prev?: { title: string; href: string };
  next?: { title: string; href: string };
}

export const PostNavigation = ({ prev, next }: PostNavProps) => {
  return (
    <nav role="navigation" className="border-t border-b py-2 sm:py-3 md:py-4">
      <div className="flex items-center justify-between gap-6">
        {/* Previous */}
        {prev ? (
          <Link href={prev.href}>
            <a className="flex items-center text-sm md:text-base text-gray-800 hover:text-green-600">
              <ChevronLeft className="h-5 w-5" />
              <span className="ml-1 line-clamp-1">{prev.title}</span>
            </a>
          </Link>
        ) : (
          <div />
        )}

        {/* Next */}
        {next ? (
          <Link href={next.href}>
            <a className="flex items-center text-sm md:text-base text-right text-gray-800 hover:text-green-600">
              <span className="mr-1 line-clamp-1 ">{next.title}</span>
              <ChevronRight className="h-5 w-5" />
            </a>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </nav>
  );
};

export const ProductByCategoty = ({
  id,
  category,
  products,
}: ProductCardsProps) => {
  return (
    <section className="pt-3 mb-6">
      <div className="flex items-center justify-between mb-4">
        <TitleCategory category={category ?? ''} />

        <Link href={`/san-pham?danh_muc=${id}`}>
          <a className=" flex items-center group text-gray-500 hover:underline text-sm font-medium">
            <span className="mr-1 group-hover:underline">Xem thêm</span>{' '}
            <strong className="text-gray-600">{category}</strong>
            <ArrowRight className="w-4 h-4" />
          </a>
        </Link>
      </div>

      <ProductsSlider slide={4} products={products} />
    </section>
  );
};

const TABS = [
  {
    id: 0,
    key: 'description',
    label: 'Mô tả',
    icon: ChartNoAxesCombined,
  },
  { id: 1, key: 'infoProduct', label: 'Đặc điểm', icon: BadgeAlert },
] as const;

type TabKey = (typeof TABS)[number]['key'];
interface ProductTabsProps {
  description: string;
  specificationValues: any[];
}

export const ProductTabs = ({
  description,
  specificationValues,
}: ProductTabsProps) => {
  const [activeTab, setActiveTab] = useState<TabKey>('description');
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <section className="mx-auto mt-6 lg:mt-12">
      <TitleDetailProduct title="Chi tiết sản phẩm" />
      <div className="mx-auto my-5  bg-white shadow-lg rounded border">
        {/* Tab Header */}
        <ul className="flex border-b text-sm md:text-base font-medium">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <li
                key={tab.id}
                className={`cursor-pointer  flex items-center gap-2 pb-2 pt-2 px-4 md:pt-4 md:px-8 ${
                  activeTab === tab.key
                    ? 'border-b-2 border-orange-500 bg-orange-50 font-semibold text-orange-500'
                    : 'text-gray-600 hover:text-orange-400'
                }`}
                onClick={() => setActiveTab(tab.key)}
              >
                <Icon size={16} aria-hidden />
                {tab.label} <span className="hidden sm:block"> sản phẩm</span>
              </li>
            );
          })}
        </ul>

        {/* Tab Panels */}
        <div className="p-5">
          {activeTab === 'description' && (
            <div
              className="my-4 px-5 prose prose-base sm:prose-lg lg:prose-xl max-w-none"
              style={{ textAlign: 'justify' }}
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}

          {activeTab === 'infoProduct' && (
            <div className="flex items-center  justify-center mx-6 my-4">
              {specificationValues.length > 0 ? (
                <table className="w-full">
                  <tbody>
                    {specificationValues.map((item) => (
                      <tr className="border-b border-gray-200">
                        <td className="py-2 px-5 font-semibold">
                          {item.specification.name}
                        </td>
                        <td className="py-2 px-5">{item.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="flex items-center  justify-center h-48">
                  <p className="text-gray-500">
                    Chưa có thông tin đặc điểm cho sản phẩm này.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export const ReviewProduct = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="mx-auto mt-8 lg:mt-12">
      <TitleDetailProduct title="Đánh giá sản phẩm" />
      <div className="mx-auto my-5  bg-white shadow-lg rounded border">
        <div className="relative">
          <div className="text-center py-4 md:py-8">
            {/* Enhanced star icon with glow effect */}
            <div className="relative inline-block mt-3 mb-3">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full blur-xl opacity-30 scale-150"></div>
              <div className="relative bg-gradient-to-br from-emerald-100 to-emerald-200 p-3 rounded-full">
                <Star className="w-8 h-8 text-green-cyan-400" />
              </div>
            </div>

            {/* Enhanced heading */}
            <h3 className="text-base md:text-lg  lg:text-xl  font-bold text-gray-700 mb-3">
              Chưa có đánh giá nào
            </h3>

            {/* Enhanced description */}
            <p className="text-gray-500 text-sm md:text-base mb-4 md:mb-8 max-w-md mx-auto leading-relaxed">
              Trở thành người đầu tiên chia sẻ trải nghiệm của bạn về sản phẩm
              này!
            </p>

            {/* Enhanced button */}
            <button
              onClick={() => setOpen(true)}
              className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-emerald-400 via-green-500 to-lime-500  text-white px-4 py-2 rounded-lg font-semibold  md:text-base  shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              {/* Button glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-green-500 to-lime-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>

              {/* Button content */}
              <Star className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              <span className="relative">Viết đánh giá</span>

              {/* Arrow icon */}
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Additional elements */}
            <div className="mt-4 md:mt-8 flex justify-center gap-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <RatingDialog open={open} onOpenChange={() => setOpen(false)} />
    </div>
  );
};

interface CheckoutStepsProps {
  currentStep: number; // 1 = Giỏ hàng, 2 = Thông tin, 3 = Hoàn tất
}

const steps = [
  { id: 1, label: 'Giỏ hàng', url: '/gio-hang' },
  { id: 2, label: 'Thông tin thanh toán', url: '/thanh-toan' },
  { id: 3, label: 'Hoàn tất đơn hàng', url: '' },
];

export function CheckoutSteps({ currentStep }: CheckoutStepsProps) {
  const router = useRouter();
  const handleTurnPage = (isActive: boolean, url: string) => {
    if (isActive && url) router.push(url);
  };
  return (
    <>
      <div className="md:hidden text-green-600 mb-3 flex items-center justify-center text-lg sm:text-xl font-bold uppercase">
        {steps[currentStep - 1].label}
      </div>
      <div className="hidden mb-6 md:flex items-center justify-center space-x-8 text-sm font-semibold uppercase">
        {/* Bước 1: Giỏ hàng */}
        {steps.map((step, idx) => {
          const isActive = step.id <= currentStep;
          const isLast = idx === steps.length - 1;

          return (
            <>
              <div className="cursor-pointer flex items-center space-x-2">
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full ${
                    isActive
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  {step.id}
                </div>
                <span
                  onClick={() => handleTurnPage(isActive, step.url)}
                  className={isActive ? 'text-green-600' : 'text-gray-400'}
                >
                  {step.label}
                </span>
              </div>
              {!isLast && (
                <div
                  className={`flex-1 h-0.5  ${
                    isActive ? 'bg-green-600' : 'bg-gray-300'
                  }`}
                ></div>
              )}
            </>
          );
        })}
      </div>
    </>
  );
}
