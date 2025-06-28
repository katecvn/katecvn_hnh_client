import ClientLayout from './clientlayout';
import Head from 'next/head';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <Head>
        <title>Katec - Giải pháp công nghệ thông tin Việt Nam</title>
        <meta
          name="description"
          content="Chuyên cung cấp các giải pháp công nghệ thông tin tiên tiến: phát triển phần mềm, chuyển đổi số, ERP, CRM, AI Analytics. Đối tác tin cậy cho doanh nghiệp Việt Nam. Chatbot AI với Knowledge Base tích hợp."
        />
        <meta
          name="keywords"
          content="công nghệ thông tin, phần mềm, chuyển đổi số, ERP, CRM, AI, phát triển ứng dụng, website, mobile app"
        />
        <meta name="author" content="Katec" />
        <meta name="theme-color" content="#1e40af" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Katec - Giải pháp công nghệ thông tin "
        />
        <meta
          property="og:description"
          content="Chuyên cung cấp các giải pháp công nghệ thông tin tiên tiến cho doanh nghiệp Việt Nam"
        />
        <meta property="og:image" content="/og-image.jpg" />
        <meta property="og:url" content="https://katec.vn" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Katec" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Katec - Giải pháp công nghệ thông tin"
        />
        <meta
          name="twitter:description"
          content="Chuyên cung cấp các giải pháp công nghệ thông tin tiên tiến"
        />
        <meta name="twitter:image" content="/og-image.jpg" />

        {/* Robots */}
        <meta name="robots" content="index, follow" />
        <meta
          name="googlebot"
          content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1"
        />

        <link rel="canonical" href="https://katec.vn" />
      </Head>
      <ClientLayout>{children}</ClientLayout>
    </html>
  );
}
