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

export const ArticleContent = ({
  showHeader = true,
  post,
}: ArticleContentProps) => {
  const Content = memo(({ content }: { content: string }) => {
    return (
      <div
        className={`prose prose-base sm:prose-lg lg:prose-xl max-w-none 
        break-words whitespace-normal
        prose-headings:text-gray-900 prose-headings:font-bold
        prose-p:text-gray-700 prose-p:leading-relaxed prose-p:text-lg prose-p:text-justify
        prose-a:text-blue-600 prose-a:no-underline hover:prose-a:text-blue-500 prose-a:font-medium
        prose-strong:text-gray-900 prose-strong:font-bold
        prose-img:rounded-xl prose-img:shadow-lg prose-img:max-w-full prose-img:h-auto
        prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:rounded-r-lg prose-blockquote:text-gray-700
        prose-code:bg-gray-100 prose-code:text-blue-700 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:font-semibold
        [&_pre]:overflow-x-auto [&_code]:whitespace-pre [&_table]:overflow-x-auto [&_table]:block`}
        style={{ textAlign: 'justify' }}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  });

  return (
    <div className="bg-white rounded border border-gray-100 shadow-md p-4 mb-5">
      {showHeader && (
        <div>
          <div className="text-left">
            <h1 className="text-neutral-gray-800 text-3xl font-bold mb-2">
              {post.title}
            </h1>

            <div className="w-10 h-1 bg-gray-200 mb-3"></div>

            <div className="sm:text-sm text-xs font-sans text-neutral-gray-400 flex gap-2">
              <span className="flex gap-1">
                <CalendarDays className="w-4 h-4" />
                <time dateTime={post.published_at}>
                  {new Date(post.published_at).toLocaleDateString('vi-VN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                  ,
                </time>
              </span>

              <span className="flex gap-1">
                <UserCircle className="w-4 h-4" />
                <span className="font-medium uppercase">
                  {post?.author?.full_name}
                </span>
              </span>
            </div>
          </div>
          <div className="relative mt-4">
            <Image
              src={post.thumbnail ?? '/placeholder.png'}
              alt={post.title}
              width={1020}
              height={567}
              className="rounded-lg object-cover"
              priority
            />

            <DateBadge date={post.published_at} />
          </div>
        </div>
      )}
      <Content content={post.content} />

      {showHeader && (
        <ShareButtons
          url={`/tin-tuc/${post.slug}`}
          title={post.title}
          media={post.thumbnail}
        />
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
      text: (
        <>
          <p>Vùng rau Thanh Trì</p>
          <p>Đổi mới để thành công</p>
        </>
      ),
    },
    {
      href: 'https://vietnam.vnanet.vn/vietnamese/long-form/hnh-gop-phan-nang-tam-gia-tri-nong-san-thuc-pham-viet-315698.html',
      img: '/press/Le-ky-ket-hop-dong.jpg',
      alt: 'Lễ ký kết hợp đồng liên kết sản xuất - tiêu thụ sản phẩm',
      text: (
        <p>
          HNH góp phần nâng tầm giá trị <br /> Nông sản thực phẩm Việt
        </p>
      ),
    },
    {
      href: 'https://vietnam.vnanet.vn/vietnamese/tin-tuc/phat-trien-lien-ket-chuoi-gia-tri-trong-san-xuat-nong-nghiep-tai-huyen-thanh-tri-315562.html',
      img: '/press/HNH-Foodfarm.jpg',
      alt: 'HNH Foodfarm',
      text: (
        <p>
          Phát triển liên kết chuỗi giá trị trong sản xuất nông nghiệp tại huyện
          Thanh Trì
        </p>
      ),
    },
  ];
  return (
    <section className="pb-8">
      <h3 className="flex items-center justify-center mt-4 mb-8 gap-4 text-center text-xl font-bold text-neutral-gray-700">
        <span className="flex-1 border-t-2 border-orange-500"></span>
        <span>BÁO CHÍ NÓI GÌ VỀ CHÚNG TÔI</span>
        <span className="flex-1 border-t-2 border-orange-500"></span>
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {pressItems.map((item, idx) => (
          <div
            key={idx}
            className="group relative rounded overflow-hidden shadow-lg hover:shadow-xl transition"
          >
            <Link href={item.href} target="_blank" rel="noopener noreferrer">
              <a>
                <div className="relative w-full h-64">
                  <Image
                    src={item.img}
                    alt={item.alt}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition" />
                <div className="absolute bottom-0 w-full text-[0.9rem] text-center text-white p-4">
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
    <nav role="navigation" className="border-t border-b py-4">
      <div className="flex items-center justify-between gap-6">
        {/* Previous */}
        {prev ? (
          <Link href={prev.href}>
            <a className="flex items-center text-gray-800 hover:text-green-600">
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
            <a className="flex items-center text-right text-gray-800 hover:text-green-600">
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
      {products.length > 0 && (
        <>
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

          <ProductsSlider products={products} />
        </>
      )}
    </section>
  );
};

const TABS = [
  {
    id: 0,
    key: 'description',
    label: 'Mô tả sản phẩm',
    icon: ChartNoAxesCombined,
  },
  { id: 1, key: 'infoProduct', label: 'Đặc điểm sản phẩm', icon: BadgeAlert },
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
    <section className="mx-auto mt-12">
      <TitleDetailProduct title="Chi tiết sản phẩm" />
      <div className="mx-auto my-5  bg-white shadow-lg rounded border">
        {/* Tab Header */}
        <ul className="flex border-b text-sm font-medium">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <li
                key={tab.id}
                className={`cursor-pointer text-base flex items-center gap-2 pb-2 pt-4 px-8 ${
                  activeTab === tab.key
                    ? 'border-b-2 border-orange-500 bg-orange-50 font-semibold text-orange-500'
                    : 'text-gray-600 hover:text-orange-400'
                }`}
                onClick={() => setActiveTab(tab.key)}
              >
                <Icon size={16} aria-hidden />
                {tab.label}
              </li>
            );
          })}
        </ul>

        {/* Tab Panels */}
        <div className="p-5">
          {activeTab === 'description' && (
            <div
              className="my-4 prose prose-base sm:prose-lg lg:prose-xl max-w-none"
              style={{ textAlign: 'justify' }}
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}

          {activeTab === 'infoProduct' && (
            <div className="flex items-center justify-center mx-6 my-4">
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
                <p>123</p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export const ReviewProduct = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className="mx-auto mt-12">
      <TitleDetailProduct title="Đánh giá sản phẩm" />
      <div className="mx-auto mt-4 p-5 bg-white shadow-xl rounded border">
        <form className="space-y-4 rounded px-6 py-5 border-2 border-green-cyan-500">
          <div>
            <label className="block text-base font-medium mb-2">
              Đánh giá của bạn *
            </label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  className="focus:outline-none"
                >
                  <Star
                    size={28}
                    className={`${
                      star <= (hover || rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'fill-gray-200 text-gray-200'
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Input ẩn để submit form */}
            <input type="hidden" name="rating" value={rating} required />
          </div>

          <div>
            <label htmlFor="comment" className="block text-base font-medium">
              Nội dung đánh giá *
            </label>
            <textarea
              id="comment"
              rows={4}
              required
              className="mt-1 w-full border border-gray-300 rounded-md p-2"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="author" className="block text-base font-medium">
                Tên *
              </label>
              <input
                type="text"
                id="author"
                required
                className="mt-1 w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-base font-medium">
                Email *
              </label>
              <input
                type="email"
                id="email"
                required
                className="mt-1 w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              id="save-info"
              type="checkbox"
              className="peer h-4 w-4 text-orange-500 border-gray-300 rounded"
            />
            <label
              htmlFor="save-info"
              className="text-sm text-gray-400 peer-checked:text-black"
            >
              Lưu tên của tôi, email, và trang web trong trình duyệt này cho lần
              bình luận kế tiếp của tôi.
            </label>
          </div>

          <div className="flex items-center  justify-end">
            <button
              type="submit"
              className="uppercase font-semibold bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600"
            >
              Gửi đi
            </button>
          </div>
        </form>
      </div>
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
    <div className="mb-6 flex items-center justify-center space-x-8 text-sm font-semibold uppercase">
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
  );
}
