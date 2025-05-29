import { type NextRequest, NextResponse } from "next/server";

// Enhanced context endpoint for more detailed company information
export async function GET(request: NextRequest) {
  const context = {
    company: {
      name: "Katec",
      founded: "2019",
      employees: "50+",
      headquarters: "TP. Hồ Chí Minh",
      offices: ["TP.HCM", "Hà Nội", "Đà Nẵng"],
      contact: {
        hotline: "1900 1234",
        email: "info@Katec.com",
        website: "https://Katec.com",
      },
    },
    products: [
      {
        name: "Katec ERP",
        category: "Enterprise Resource Planning",
        price: "Từ 2,000,000 VNĐ/tháng",
        features: [
          "Quản lý tài chính",
          "Nhân sự & Lương",
          "Kho bãi & Logistics",
          "Báo cáo thông minh",
        ],
        description: "Hệ thống ERP toàn diện với AI tích hợp",
      },
      {
        name: "CRM 360°",
        category: "Customer Relationship Management",
        price: "Từ 1,500,000 VNĐ/tháng",
        features: [
          "Quản lý Lead",
          "Tự động hóa Marketing",
          "Phân tích khách hàng",
          "Dự đoán doanh số",
        ],
        description: "Nền tảng CRM thông minh giúp tăng doanh số",
      },
      {
        name: "AI Analytics Pro",
        category: "Business Intelligence",
        price: "Từ 3,000,000 VNĐ/tháng",
        features: [
          "Machine Learning",
          "Dự đoán xu hướng",
          "Báo cáo tự động",
          "Dashboard tương tác",
        ],
        description: "Nền tảng phân tích dữ liệu với AI",
      },
      {
        name: "HRMS",
        category: "Human Resource Management",
        price: "Từ 1,200,000 VNĐ/tháng",
        features: [
          "Tuyển dụng thông minh",
          "Quản lý hiệu suất",
          "Đào tạo & Phát triển",
          "Chấm công tự động",
        ],
        description: "Hệ thống quản lý nhân sự hiện đại",
      },
    ],
    services: [
      "Phát triển phần mềm (Web, Mobile, Desktop)",
      "Chuyển đổi số doanh nghiệp",
      "Tư vấn IT và kiến trúc hệ thống",
      "Bảo mật thông tin",
      "Đào tạo và hỗ trợ kỹ thuật",
    ],
    technologies: [
      "React/Next.js",
      "Node.js",
      "Python",
      "AI/ML",
      "Cloud Computing (AWS, Azure)",
      "Mobile Development",
      "Database Design",
      "DevOps",
      "Cybersecurity",
    ],
    industries: [
      "Sản xuất",
      "Bán lẻ",
      "Tài chính - Ngân hàng",
      "Y tế",
      "Giáo dục",
      "Logistics",
      "Bất động sản",
    ],
    stats: {
      experience: "5+ năm",
      projects: "500+",
      clients: "200+",
      successRate: "98%",
    },
  };

  return NextResponse.json(context);
}
