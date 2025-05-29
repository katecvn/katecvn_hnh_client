import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { ChatWidget } from "@/components/chat-widget";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Katec - Giải pháp công nghệ thông tin hàng đầu Việt Nam",
  description:
    "Chuyên cung cấp các giải pháp công nghệ thông tin tiên tiến: phát triển phần mềm, chuyển đổi số, ERP, CRM, AI Analytics. Đối tác tin cậy cho doanh nghiệp Việt Nam. Chatbot AI với Knowledge Base tích hợp.",
  keywords:
    "công nghệ thông tin, phần mềm, chuyển đổi số, ERP, CRM, AI, phát triển ứng dụng, website, mobile app",
  authors: [{ name: "Katec" }],
  creator: "Katec",
  publisher: "Katec",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://Katec.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Katec - Giải pháp công nghệ thông tin hàng đầu",
    description:
      "Chuyên cung cấp các giải pháp công nghệ thông tin tiên tiến cho doanh nghiệp Việt Nam",
    url: "https://Katec.com",
    siteName: "Katec",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Katec - Công nghệ thông tin",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Katec - Giải pháp công nghệ thông tin",
    description: "Chuyên cung cấp các giải pháp công nghệ thông tin tiên tiến",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  generator: "NTN",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1e40af" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main>{children}</main>
          <Footer />
          <ChatWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}
