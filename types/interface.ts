// ========== Applicant Form ==========
export interface FormData {
  fullName: string;
  email: string;
  phone: string;
  experience: string;
  currentPosition: string;
  expectedSalary: string;
  coverLetter: string;
  portfolio: string;
  cv: File | null;
}

export type FormCareerErrors = Partial<Record<keyof FormData, string>>;

export interface ApplicationFormSectionProps {
  selectedPosition: Pick<
    JobPosition,
    'title' | 'department' | 'location' | 'type' | 'experience' | 'deadline'
  >;
  formData: FormData;
  errors: FormCareerErrors;
  isSubmitting: boolean;
  handleInputChange: (field: keyof FormData, value: string) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  setIsOpen: (open: boolean) => void;
}

// ========== Job Postings ==========
export interface JobData {
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  featured?: boolean;
  description: string;
  requirements: string[];
  salary: string;
  deadline: Date;
}

export interface JobPosition extends JobData {
  gradient: string;
  icon: React.ElementType;
}

export interface Position extends JobData {
  id?: string | number;
  icon: React.ElementType;
}

export interface JobDetailPageProps {
  jobData: JobData;
  setIsDetailOpen: (open: boolean) => void;
  onApply: (jobData: JobPosition) => void;
}

export interface PositionCardProps {
  position: Position;
  index: number;
  isHovered: boolean;
  onHover: (index: number) => void;
  onLeave: () => void;
  onApply: (position: JobPosition) => void;
  onViewDetail: (position: JobPosition) => void;
}

export interface SubmissionSuccessProps {
  position: JobPosition;
}

// ========== Reusable Content ==========
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
}

export interface CompanyContentItem {
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

// ========== Testimonial ==========
export interface Testimonial {
  content: FeedbackContentItem[];
}

export interface TestimonialSliderProps {
  feedbacks: Testimonial[];
}

// ========== UI Components ==========
export interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export interface ContactDialogProps {
  title: string;
  des: string;
  product?: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

//=======Enhanced Animation=========
// Tiện ích chung
interface WithChildren {
  children: React.ReactNode;
}

export interface WithClassName {
  className?: string;
}

// Text effects
export interface GradientTextProps extends WithChildren, WithClassName {}

export interface GlitchTextProps extends WithChildren, WithClassName {}

export interface TypewriterProps extends WithClassName {
  texts: string[];
  speed?: number;
}

// UI effects
export interface ParallaxProps extends WithChildren, WithClassName {
  speed?: number;
}

export interface MagneticButtonProps extends WithChildren, WithClassName {
  strength?: number;
}

export interface RevealProps extends WithChildren, WithClassName {
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  skipAnimation?: boolean;
}

//=======Enhanced Card=========
// Tiện ích chung
interface WithDelay {
  delay?: number;
}

interface WithIcon {
  icon: React.ReactNode;
}

interface WithBadge {
  badge?: string;
}

interface WithTitleDescription {
  title: string;
  description: string;
}

// Enhanced Card
export interface EnhancedCardProps
  extends WithTitleDescription,
    WithIcon,
    WithDelay,
    WithBadge {
  color: string;
  features?: string[];
  onClick?: () => void;
}

// Stats Card
export interface StatsCardProps extends WithDelay, WithIcon {
  value: string;
  label: string;
  trend?: number;
}

// Feature Card
export interface FeatureCardProps
  extends WithTitleDescription,
    WithIcon,
    WithDelay {
  features: string[];
}

// Product Card
export interface ProductCardData extends WithBadge {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  category: string;
  stock: number;
  color?: string;
}

export interface ProductCardProps extends WithDelay {
  product: ProductCardData;
  index: number;
}

// Tech Product Card
export interface TechProductCardProps extends WithDelay {
  title: string;
  description: string;
  image: string;
  badge: string;
  badgeColor: string;
  link: string;
}

//=======Enhanced Support=========

// Highlight cho service
export interface HighlightItem {
  label: string;
  color: string;
}

// Card dịch vụ
export interface ServiceCardProps {
  title: string;
  description: string;
  iconPath: string;
  iconClass: string; // Tailwind hoặc CSS class
  iconColor: string; // Ví dụ: text-blue-500
  highlights: HighlightItem[];
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
