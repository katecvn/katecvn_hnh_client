// ========== Navigation ==========
export interface NavItem {
  id: number;
  title: string;
  url: string;
  parentId: number | null;
  parent: NavItem | null;
  position: number;
  status: 'active' | 'inactive'; // nếu chỉ có 2 trạng thái
  children: NavItem[];
  createdAt: string; // ISO date string
  createdBy: number;
  updatedAt: string; // ISO date string
  updatedBy: number;
  deletedAt: string | null;
}

export type MastheadProps = {
  navigation: NavItem[];
  categories?: CategoryPro[];
};

interface WithChildren {
  children: React.ReactNode;
}

export interface WithClassName {
  className?: string;
}

// ========== News ==========

export interface Topic {
  id: number;
  name: string;
  slug: string;
}

export interface News {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  thumbnail: string;
  status: 'published' | 'draft' | string;
  author_id: number;
  author: Author;
  topics: Topic[];
  created_at: string;
  updated_at: string;
  published_at: string;
  deletedAt: string | null;
}

export interface ListNewsProps {
  listnews: News[];
}

// Text effects
export interface TextProps extends WithChildren, WithClassName {}

// Product Card
export interface ProductCardData {
  id: string;
  variantId: string;
  name: string;
  slug: string;
  image: string;
  category: string;
  categoryId: number;
  unit: string;
  stock: number;
  salePrice: number;
  originalPrice: number;
}

export interface ProductCardsProps {
  id: number;
  products: ProductCardData[];
  category?: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface Variant {
  id: number;
  productId: number;
  sku: string;
  stock: number;
  unit: string;
  salePrice: string;
  originalPrice: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface Product {
  id: number;
  name: string;
  sku: string;
  slug: string;
  brand: string | null;
  brandId: number | null;
  category: Category;
  categoryId: number;
  content?: string;
  imagesUrl: string[];
  isFeatured: number;
  optionMappings: any[];
  originalPrice: string;
  salePrice: string;
  productGroup: string | null;
  productGroupId: number | null;
  seoDescription: string;
  seoKeywords: string;
  seoTitle: string;
  specificationValues: any[];
  status: 'active' | 'inactive';
  stock: number;
  unit: string;
  variants: Variant[];
}

export type ReviewStatus = 'active' | 'inactive' | 'pending';
export type AbleType = 'product' | 'post' | 'service';

export interface ReviewUser {
  id: number;
  code: string | null;
  full_name: string;
  email: string;
  phone_number: string;
}

export interface Review {
  id: number;
  ableType: AbleType;
  ableId: number;
  userId: number;
  rating: number;
  reviewText: string;
  status: ReviewStatus;
  createdAt: string;
  user: ReviewUser;
  product: string | null;
  avgRating: number;
}

export type Reviews = Review[];

export type ReviewStats = {
  total: number;
  average: number;
  percents: number[];
};

interface ParentCategory {
  id: number;
  name: string;
  slug: string;
  thumbnail: string;
  iconUrl: string | null;
}

interface SubCategory {
  id: number;
  name: string;
  slug: string;
  thumbnail: string;
  iconUrl: string | null;
}

export interface CategoryPro {
  id: number;
  parentId: number | null;
  level: number;
  name: string;
  slug: string;
  thumbnail: string;
  iconUrl: string | null;
  productCount: number;
  parent: ParentCategory | null;
  subCategories: SubCategory[];
  specifications: any[];
}

export interface FetchOptions {
  page?: number;
  limit?: number;
  categoryId?: string | null;
}

export interface PaginationProps {
  keyword?: string;
  pagination?: {
    totalItems?: number | 0;
    totalPages?: number | 1;
    currentPage?: number | 1;
  };
  onPageChange: (options: {
    page: number;
    limit: number;
    categoryId?: string | null;
  }) => void;
  itemsPerPage?: number;
  selectedCategory?: string | null;
}

// ========== Post / Blog ==========
export interface Topic {
  id: number;
  name: string;
}

export interface Author {
  id: number;
  full_name: string;
  email: string;
  avatar_url?: string;
}

export interface User {
  id: number;
  full_name: string;
  email: string;
}

export interface Comment {
  id: number;
  content: string;
  user: User;
  created_at: string;
  parentId?: number | null;
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  short_description?: string;
  thumbnail?: string;
  published_at: string;
  topics?: Topic[];
  author?: Author;
  postComments?: Comment[];
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PostsResponse {
  posts: Post[];
  total: number;
}

export interface ArticleContentProps {
  col?: number;
  showHeader?: boolean;
  post: Post;
}

// boooo  ========== Reusable Content ==========
export interface BaseContentItem {
  features?: string[];
  imageUrl?: string;
}

export interface FeedbackContentItem extends BaseContentItem {
  name: string;
  role: string;
  content: string;
}

export interface GeneralContentItem extends BaseContentItem {
  icon?: string;
  title?: string;
  description?: string;
  imageUrl?: string;
}

export interface CompanyContentItem {
  title?: string;
  key: string;
  value: string;
  url?: string;
}

// Sections
export interface SectionItem<T = GeneralContentItem> {
  id: string | number;
  content: T[];
}

// Company Info
export interface CompanyInfo {
  content: CompanyContentItem[];
}

// ========== Post / Blog ==========
export interface Topic {
  id: number;
  name: string;
}

export interface Author {
  id: number;
  full_name: string;
  email: string;
  avatar_url?: string;
}

export interface User {
  id: number;
  full_name: string;
  email: string;
}

export interface Comment {
  id: number;
  content: string;
  user: User;
  created_at: string;
  parentId?: number | null;
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  short_description?: string;
  thumbnail?: string;
  published_at: string;
  topics?: Topic[];
  author?: Author;
  postComments?: Comment[];
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PostsResponse {
  posts: Post[];
  total: number;
}

//Card news
interface Article {
  id?: string;
  slug?: string;
  title: string;
  thumbnail?: string;
  short_description?: string;
  excerpt?: string;
  description?: string;
  published_at?: string;
  date?: string;
  author?: { full_name?: string } | string;
  readTime?: string;
  topics?: { name: string }[];
  category?: string;
}

export interface NewsCardProps {
  article: Article;
  index: number;
  row?: boolean;
}

export interface AnimatedSectionProps {
  children: React.ReactNode;
  delay?: number;
}

export interface ParticleEffectProps {
  isHovered: boolean;
  categoryColor: {
    from: string;
    to: string;
    class: string;
  };
}

//Rating

export interface RatingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

//localStorageUtil
export interface UserInfo {
  id: number;
  full_name: string;
  email: string;
  avatar_url: string | null;
  code: string | null;
  gender: string | null;
  phone_number: string | null;
  roles: string[];
}

export interface CartItem {
  id: string;
  variantId: string;
  name: string;
  image: string;
  price: number;
  unit?: string | null;
  slug: string;
  quantity: number;
}

type OrderItem = {
  id: number;
  orderId: number;
  productVariantId: number;
  productSku: string;
  productName: string;
  productUnit?: string | null;
  productVariant?: {
    id: number;
    productId: number;
    sku: string;
    stock: number;
    unit?: string | null;
    salePrice: string;
  } | null;
  originalPrice: string;
  salePrice: string;
  quantity: number;
  totalPrice: string;
};

type ShippingItem = {
  customerAddress: string;
  customerName: string;
  customerPhone: string;
};

export type Order = {
  id: number;
  code: string;
  customerId: number;
  userId: number | null;
  subTotal: number;
  discountAmount: string;
  totalAmount: number;
  status: 'pending' | string;
  paymentStatus: 'unpaid' | 'paid' | string;
  note: string;
  date: string;
  customer?: {
    id: number;
    full_name: string;
    email: string;
    phone_number: string;
    address?: string | null;
  } | null;
  orderItems: OrderItem[];
  shippings: ShippingItem[];
};
