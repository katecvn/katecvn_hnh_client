import { openai } from "@ai-sdk/openai"
import { embed, embedMany } from "ai"

export interface KnowledgeDocument {
  id: string
  title: string
  content: string
  category: string
  tags: string[]
  embedding?: number[]
  metadata: {
    lastUpdated: Date
    source: string
    priority: number
  }
}

export interface SearchResult {
  document: KnowledgeDocument
  similarity: number
  relevantChunk: string
}

// Knowledge Base Data
export const knowledgeBase: KnowledgeDocument[] = [
  {
    id: "company-overview",
    title: "Giới thiệu về Katec",
    content: `Katec là công ty công nghệ thông tin hàng đầu Việt Nam, được thành lập năm 2019. 
    Chúng tôi chuyên cung cấp các giải pháp công nghệ tiên tiến cho doanh nghiệp.
    
    Thông tin cơ bản:
    - Thành lập: 2019
    - Trụ sở chính: 123 Đường Nguyễn Huệ, Quận 1, TP.HCM
    - Chi nhánh: Hà Nội (456 Phố Hoàn Kiếm), Đà Nẵng (789 Đường Bạch Đằng)
    - Đội ngũ: 50+ chuyên gia IT
    - Dự án hoàn thành: 500+
    - Khách hàng: 200+
    - Tỷ lệ thành công: 98%
    
    Liên hệ:
    - Hotline: 1900 1234
    - Email: info@Katec.com
    - Website: https://Katec.com`,
    category: "company",
    tags: ["giới thiệu", "thông tin công ty", "liên hệ"],
    metadata: {
      lastUpdated: new Date(),
      source: "company-profile",
      priority: 10,
    },
  },
  {
    id: "erp-product",
    title: "Katec ERP - Hệ thống quản lý doanh nghiệp",
    content: `Katec ERP là hệ thống quản lý doanh nghiệp toàn diện với AI tích hợp.
    
    Tính năng chính:
    - Quản lý tài chính: Kế toán, báo cáo tài chính, ngân sách
    - Nhân sự & Lương: Quản lý nhân viên, tính lương, chấm công
    - Kho bãi & Logistics: Quản lý tồn kho, xuất nhập kho, vận chuyển
    - Báo cáo thông minh: Dashboard real-time, analytics, dự báo
    - Tích hợp AI: Dự đoán xu hướng, tối ưu quy trình
    
    Giá cả:
    - Gói Starter: 2,000,000 VNĐ/tháng (10 users)
    - Gói Professional: 4,000,000 VNĐ/tháng (50 users)
    - Gói Enterprise: 8,000,000 VNĐ/tháng (unlimited users)
    
    Thời gian triển khai: 4-8 tuần
    Hỗ trợ: 24/7, đào tạo miễn phí
    Bảo hành: 12 tháng`,
    category: "product",
    tags: ["ERP", "quản lý doanh nghiệp", "tài chính", "nhân sự"],
    metadata: {
      lastUpdated: new Date(),
      source: "product-catalog",
      priority: 9,
    },
  },
  {
    id: "crm-product",
    title: "CRM 360° - Nền tảng quản lý khách hàng",
    content: `CRM 360° là nền tảng quản lý khách hàng thông minh giúp tăng doanh số.
    
    Tính năng chính:
    - Quản lý Lead: Theo dõi cơ hội bán hàng, phân loại khách hàng
    - Tự động hóa Marketing: Email marketing, SMS, social media
    - Phân tích khách hàng: Hành vi mua hàng, segmentation
    - Dự đoán doanh số: AI forecasting, pipeline management
    - Tích hợp đa kênh: Website, social media, call center
    
    Giá cả:
    - Gói Basic: 1,500,000 VNĐ/tháng (5 users)
    - Gói Advanced: 3,000,000 VNĐ/tháng (20 users)
    - Gói Premium: 5,000,000 VNĐ/tháng (unlimited users)
    
    ROI trung bình: Tăng 30-40% doanh số trong 6 tháng
    Thời gian triển khai: 2-4 tuần`,
    category: "product",
    tags: ["CRM", "quản lý khách hàng", "bán hàng", "marketing"],
    metadata: {
      lastUpdated: new Date(),
      source: "product-catalog",
      priority: 9,
    },
  },
  {
    id: "ai-analytics",
    title: "AI Analytics Pro - Nền tảng phân tích dữ liệu",
    content: `AI Analytics Pro là nền tảng phân tích dữ liệu với AI tiên tiến.
    
    Tính năng chính:
    - Machine Learning: Thuật toán ML tự động, model training
    - Dự đoán xu hướng: Forecasting, trend analysis
    - Báo cáo tự động: Scheduled reports, alerts
    - Dashboard tương tác: Real-time visualization, drill-down
    - Data Integration: Kết nối đa nguồn dữ liệu
    
    Công nghệ:
    - Python, TensorFlow, PyTorch
    - Big Data: Hadoop, Spark
    - Cloud: AWS, Azure, GCP
    - Visualization: Tableau, Power BI integration
    
    Giá cả:
    - Gói Starter: 3,000,000 VNĐ/tháng
    - Gói Professional: 6,000,000 VNĐ/tháng
    - Gói Enterprise: 12,000,000 VNĐ/tháng
    
    Phù hợp cho: Doanh nghiệp có lượng dữ liệu lớn, cần insights sâu`,
    category: "product",
    tags: ["AI", "analytics", "machine learning", "big data"],
    metadata: {
      lastUpdated: new Date(),
      source: "product-catalog",
      priority: 8,
    },
  },
  {
    id: "software-development",
    title: "Dịch vụ phát triển phần mềm",
    content: `Katec cung cấp dịch vụ phát triển phần mềm toàn diện.
    
    Loại hình phát triển:
    - Web Application: React, Next.js, Vue.js, Angular
    - Mobile App: React Native, Flutter, iOS Native, Android Native
    - Desktop Application: Electron, .NET, Java
    - API & Backend: Node.js, Python, Java, .NET Core
    - Database: PostgreSQL, MySQL, MongoDB, Redis
    
    Quy trình phát triển:
    1. Phân tích yêu cầu (1-2 tuần)
    2. Thiết kế UI/UX (1-2 tuần)
    3. Development (4-12 tuần)
    4. Testing & QA (1-2 tuần)
    5. Deployment & Go-live (1 tuần)
    6. Maintenance & Support (ongoing)
    
    Giá cả:
    - Web App: 200-800 triệu VNĐ
    - Mobile App: 300-1,200 triệu VNĐ
    - Enterprise System: 500-2,000 triệu VNĐ
    
    Methodology: Agile, Scrum, DevOps`,
    category: "service",
    tags: ["phát triển phần mềm", "web", "mobile", "backend"],
    metadata: {
      lastUpdated: new Date(),
      source: "service-catalog",
      priority: 8,
    },
  },
  {
    id: "digital-transformation",
    title: "Dịch vụ chuyển đổi số",
    content: `Chuyển đổi số toàn diện cho doanh nghiệp hiện đại.
    
    Các bước chuyển đổi số:
    1. Đánh giá hiện trạng: Audit hệ thống, quy trình hiện tại
    2. Xây dựng chiến lược: Roadmap, timeline, budget
    3. Lựa chọn công nghệ: Technology stack phù hợp
    4. Triển khai từng giai đoạn: Phased implementation
    5. Đào tạo nhân viên: Training, change management
    6. Monitoring & Optimization: Theo dõi, cải tiến
    
    Lĩnh vực chuyển đổi:
    - Quy trình kinh doanh: BPM, workflow automation
    - Hệ thống quản lý: ERP, CRM, HRM
    - Trải nghiệm khách hàng: Omnichannel, personalization
    - Data & Analytics: Business intelligence, reporting
    - Cloud Migration: Infrastructure modernization
    
    Lợi ích:
    - Tăng hiệu quả 40-60%
    - Giảm chi phí vận hành 20-30%
    - Cải thiện customer experience
    - Tăng khả năng cạnh tranh
    
    Thời gian: 6-18 tháng tùy quy mô`,
    category: "service",
    tags: ["chuyển đổi số", "digital transformation", "automation"],
    metadata: {
      lastUpdated: new Date(),
      source: "service-catalog",
      priority: 9,
    },
  },
  {
    id: "pricing-policy",
    title: "Chính sách giá và thanh toán",
    content: `Chính sách giá cả và thanh toán của Katec.
    
    Cấu trúc giá:
    - Sản phẩm SaaS: Theo tháng/năm, số lượng users
    - Dự án phát triển: Fixed price hoặc Time & Material
    - Tư vấn: Theo ngày (5-15 triệu VNĐ/ngày)
    - Maintenance: 15-20% giá trị dự án/năm
    
    Phương thức thanh toán:
    - Chuyển khoản ngân hàng
    - Thanh toán online
    - Hóa đơn VAT đầy đủ
    
    Điều khoản thanh toán:
    - Dự án: 30% khởi động, 40% milestone, 30% bàn giao
    - SaaS: Thanh toán trước theo tháng/quý/năm
    - Discount: 10% cho thanh toán năm, 5% cho thanh toán quý
    
    Chính sách hoàn tiền:
    - SaaS: 30 ngày đầu tiên
    - Dự án: Theo milestone agreement
    
    Hỗ trợ tài chính:
    - Trả góp cho dự án lớn
    - Flexible payment terms
    - Partnership program`,
    category: "policy",
    tags: ["giá cả", "thanh toán", "chính sách"],
    metadata: {
      lastUpdated: new Date(),
      source: "business-policy",
      priority: 7,
    },
  },
  {
    id: "support-policy",
    title: "Chính sách hỗ trợ và bảo hành",
    content: `Chính sách hỗ trợ và bảo hành toàn diện.
    
    Hỗ trợ kỹ thuật:
    - 24/7 hotline: 1900 1234
    - Email support: support@Katec.com
    - Live chat: Website và mobile app
    - Remote support: TeamViewer, AnyDesk
    - Onsite support: Trong vòng 24h (TP.HCM, HN, DN)
    
    Thời gian phản hồi:
    - Critical: 1 giờ
    - High: 4 giờ
    - Medium: 8 giờ
    - Low: 24 giờ
    
    Bảo hành:
    - Sản phẩm: 12-24 tháng
    - Dự án phát triển: 6-12 tháng
    - Bug fixing: Miễn phí trong thời gian bảo hành
    - Feature enhancement: Có phí
    
    Đào tạo:
    - User training: Miễn phí 40 giờ
    - Admin training: Miễn phí 20 giờ
    - Advanced training: Có phí
    - Documentation: Đầy đủ tiếng Việt
    
    SLA cam kết:
    - Uptime: 99.9%
    - Response time: < 2 giây
    - Data backup: Daily, multiple locations`,
    category: "policy",
    tags: ["hỗ trợ", "bảo hành", "SLA"],
    metadata: {
      lastUpdated: new Date(),
      source: "support-policy",
      priority: 8,
    },
  },
  {
    id: "case-studies",
    title: "Case Studies thành công",
    content: `Các dự án thành công tiêu biểu của Katec.
    
    Case Study 1: Tập đoàn ABC - ERP Implementation
    - Ngành: Sản xuất
    - Quy mô: 500+ nhân viên
    - Thời gian: 6 tháng
    - Kết quả: Tăng 40% hiệu quả, giảm 30% chi phí vận hành
    - Công nghệ: ERP, AI Analytics, Mobile App
    
    Case Study 2: Công ty XYZ - Digital Transformation
    - Ngành: Bán lẻ
    - Quy mô: 200 cửa hàng
    - Thời gian: 12 tháng
    - Kết quả: Tăng 60% doanh số online, cải thiện customer experience
    - Công nghệ: E-commerce, CRM, Analytics
    
    Case Study 3: Ngân hàng DEF - Core Banking System
    - Ngành: Tài chính
    - Quy mô: 50 chi nhánh
    - Thời gian: 18 tháng
    - Kết quả: Xử lý 10x giao dịch, 99.99% uptime
    - Công nghệ: Microservices, Cloud, AI
    
    Các ngành đã phục vụ:
    - Sản xuất: 35%
    - Bán lẻ: 25%
    - Tài chính: 20%
    - Y tế: 10%
    - Giáo dục: 10%`,
    category: "case-study",
    tags: ["case study", "thành công", "dự án"],
    metadata: {
      lastUpdated: new Date(),
      source: "case-studies",
      priority: 7,
    },
  },
  {
    id: "technology-stack",
    title: "Công nghệ và kỹ thuật",
    content: `Stack công nghệ hiện đại của Katec.
    
    Frontend Technologies:
    - React.js, Next.js (95% expertise)
    - Vue.js, Angular (90% expertise)
    - TypeScript, JavaScript ES6+
    - Tailwind CSS, Material-UI, Ant Design
    - Progressive Web Apps (PWA)
    
    Backend Technologies:
    - Node.js, Express.js (90% expertise)
    - Python, Django, FastAPI (88% expertise)
    - Java Spring Boot (85% expertise)
    - .NET Core (80% expertise)
    - Microservices Architecture
    
    Mobile Development:
    - React Native (90% expertise)
    - Flutter (85% expertise)
    - iOS Native (Swift)
    - Android Native (Kotlin)
    
    Database & Storage:
    - PostgreSQL, MySQL
    - MongoDB, Redis
    - Elasticsearch
    - AWS S3, Azure Blob
    
    Cloud & DevOps:
    - AWS (92% expertise)
    - Azure (87% expertise)
    - Docker, Kubernetes
    - CI/CD: Jenkins, GitLab CI
    - Monitoring: Prometheus, Grafana
    
    AI & Machine Learning:
    - TensorFlow, PyTorch
    - OpenAI API, Anthropic
    - Computer Vision, NLP
    - Data Science: Pandas, NumPy`,
    category: "technology",
    tags: ["công nghệ", "tech stack", "programming"],
    metadata: {
      lastUpdated: new Date(),
      source: "tech-specs",
      priority: 6,
    },
  },
]

// Utility functions for similarity calculation
function cosineSimilarity(a: number[], b: number[]): number {
  const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0)
  const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0))
  const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0))
  return dotProduct / (magnitudeA * magnitudeB)
}

function chunkText(text: string, maxLength = 500): string[] {
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0)
  const chunks: string[] = []
  let currentChunk = ""

  for (const sentence of sentences) {
    if ((currentChunk + sentence).length > maxLength && currentChunk.length > 0) {
      chunks.push(currentChunk.trim())
      currentChunk = sentence
    } else {
      currentChunk += (currentChunk ? ". " : "") + sentence
    }
  }

  if (currentChunk.trim().length > 0) {
    chunks.push(currentChunk.trim())
  }

  return chunks
}

// Knowledge Base Manager Class
export class KnowledgeBaseManager {
  private documents: KnowledgeDocument[] = []
  private embeddings: Map<string, number[]> = new Map()
  private isEmbeddingEnabled = false

  constructor() {
    this.documents = [...knowledgeBase]
    // Check if OpenAI API key is available
    this.isEmbeddingEnabled = this.checkEmbeddingSupport()
  }

  private checkEmbeddingSupport(): boolean {
    // Check for OpenAI API key in various ways
    const hasApiKey = !!(
      process.env.OPENAI_API_KEY ||
      process.env.NEXT_PUBLIC_OPENAI_API_KEY ||
      (typeof window !== "undefined" && (window as any).OPENAI_API_KEY)
    )

    if (!hasApiKey) {
      console.warn("OpenAI API key not found. Knowledge Base will use keyword search fallback.")
    }

    return hasApiKey
  }

  async initializeEmbeddings(): Promise<void> {
    if (!this.isEmbeddingEnabled) {
      console.log("Embeddings disabled - using keyword search fallback")
      return
    }

    try {
      console.log("Initializing knowledge base embeddings...")

      const contents = this.documents.map((doc) => doc.content)
      const { embeddings } = await embedMany({
        model: openai.embedding("text-embedding-3-small"),
        values: contents,
      })

      this.documents.forEach((doc, index) => {
        doc.embedding = embeddings[index]
        this.embeddings.set(doc.id, embeddings[index])
      })

      console.log(`Initialized ${this.documents.length} document embeddings`)
    } catch (error) {
      console.error("Failed to initialize embeddings:", error)
      this.isEmbeddingEnabled = false
      console.log("Falling back to keyword search")
    }
  }

  async searchRelevantDocuments(query: string, limit = 3): Promise<SearchResult[]> {
    // Always try keyword search first as fallback
    if (!this.isEmbeddingEnabled) {
      return this.keywordSearch(query, limit)
    }

    try {
      // Generate embedding for the query
      const { embedding: queryEmbedding } = await embed({
        model: openai.embedding("text-embedding-3-small"),
        value: query,
      })

      const results: SearchResult[] = []

      for (const doc of this.documents) {
        if (!doc.embedding) continue

        const similarity = cosineSimilarity(queryEmbedding, doc.embedding)

        // Find most relevant chunk
        const chunks = chunkText(doc.content)
        let bestChunk = chunks[0] || doc.content
        let bestChunkSimilarity = 0

        for (const chunk of chunks) {
          const chunkLower = chunk.toLowerCase()
          const queryLower = query.toLowerCase()
          const keywordMatches = queryLower
            .split(" ")
            .filter((word) => word.length > 2 && chunkLower.includes(word)).length

          if (keywordMatches > bestChunkSimilarity) {
            bestChunkSimilarity = keywordMatches
            bestChunk = chunk
          }
        }

        if (similarity > 0.3) {
          // Threshold for relevance
          results.push({
            document: doc,
            similarity,
            relevantChunk: bestChunk,
          })
        }
      }

      // Sort by similarity and return top results
      return results.sort((a, b) => b.similarity - a.similarity).slice(0, limit)
    } catch (error) {
      console.error("Embedding search error:", error)
      // Fallback to keyword search
      this.isEmbeddingEnabled = false
      return this.keywordSearch(query, limit)
    }
  }

  private keywordSearch(query: string, limit: number): SearchResult[] {
    const queryLower = query.toLowerCase()
    const keywords = queryLower.split(" ").filter((word) => word.length > 2)

    const results: SearchResult[] = []

    for (const doc of this.documents) {
      let score = 0
      const contentLower = doc.content.toLowerCase()
      const titleLower = doc.title.toLowerCase()

      // Score based on keyword matches
      for (const keyword of keywords) {
        if (titleLower.includes(keyword)) score += 3
        if (doc.tags.some((tag) => tag.toLowerCase().includes(keyword))) score += 2
        if (contentLower.includes(keyword)) score += 1
      }

      if (score > 0) {
        // Find relevant chunk
        const chunks = chunkText(doc.content)
        let bestChunk = chunks[0] || doc.content
        let bestScore = 0

        for (const chunk of chunks) {
          const chunkLower = chunk.toLowerCase()
          let chunkScore = 0
          for (const keyword of keywords) {
            if (chunkLower.includes(keyword)) chunkScore++
          }
          if (chunkScore > bestScore) {
            bestScore = chunkScore
            bestChunk = chunk
          }
        }

        results.push({
          document: doc,
          similarity: score / (keywords.length * 3), // Normalize score
          relevantChunk: bestChunk,
        })
      }
    }

    return results.sort((a, b) => b.similarity - a.similarity).slice(0, limit)
  }

  async addDocument(document: KnowledgeDocument): Promise<void> {
    if (!this.isEmbeddingEnabled) {
      // Add without embedding
      this.documents.push(document)
      console.log(`Added document without embedding: ${document.title}`)
      return
    }

    try {
      const { embedding } = await embed({
        model: openai.embedding("text-embedding-3-small"),
        value: document.content,
      })

      document.embedding = embedding
      this.documents.push(document)
      this.embeddings.set(document.id, embedding)

      console.log(`Added document with embedding: ${document.title}`)
    } catch (error) {
      console.error("Failed to add document with embedding:", error)
      // Add without embedding as fallback
      this.documents.push(document)
      console.log(`Added document without embedding (fallback): ${document.title}`)
    }
  }

  getDocumentsByCategory(category: string): KnowledgeDocument[] {
    return this.documents.filter((doc) => doc.category === category)
  }

  getDocumentById(id: string): KnowledgeDocument | undefined {
    return this.documents.find((doc) => doc.id === id)
  }

  getAllCategories(): string[] {
    return [...new Set(this.documents.map((doc) => doc.category))]
  }

  getStats() {
    return {
      totalDocuments: this.documents.length,
      categories: this.getAllCategories().length,
      documentsWithEmbeddings: this.documents.filter((doc) => doc.embedding).length,
      embeddingEnabled: this.isEmbeddingEnabled,
      lastUpdated: new Date(),
    }
  }

  isEmbeddingReady(): boolean {
    return this.isEmbeddingEnabled
  }
}

// Singleton instance
export const knowledgeBaseManager = new KnowledgeBaseManager()
