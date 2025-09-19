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
        <title>Thực phẩm sạch HNH - HNH Food farm</title>
        <meta
          name="description"
          content="HNH Foodfarm là doanh nghiệp thực phẩm sạch uy tín, chuyên cung cấp cho các trường học, bệnh viện, khách sạn, siêu thị, bếp ăn tập thể…"
        />
        <meta
          name="keywords"
          content="công nghệ thông tin, phần mềm, chuyển đổi số, ERP, CRM, AI, phát triển ứng dụng, website, mobile app"
        />
        <meta name="author" content="Katec" />
        <meta name="theme-color" content="#00854a" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Thực phẩm sạch HNH - HNH Food farm"
        />
        <meta
          property="og:description"
          content="HNH Foodfarm là doanh nghiệp thực phẩm sạch uy tín, chuyên cung cấp cho các trường học, bệnh viện, khách sạn, siêu thị, bếp ăn tập thể…"
        />
        <meta property="og:url" content="https://thucphamhnh.com/"></meta>
        <meta property="og:image" content="/og-image.jpg" />
        <meta property="og:site_name" content="Thực phẩm HNH"></meta>
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Thực phẩm sạch HNH - HNH Food farm"
        />
        <meta
          name="twitter:description"
          content="HNH Foodfarm là doanh nghiệp thực phẩm sạch uy tín, chuyên cung cấp cho các trường học, bệnh viện, khách sạn, siêu thị, bếp ăn tập thể…"
        />
        <meta name="twitter:image" content="/og-image.jpg" />

        {/* Robots */}
        <meta name="robots" content="index, follow" />
        <meta
          name="googlebot"
          content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1"
        />

        <link rel="canonical" href="https://thucphamhnh.com/" />
      </Head>
      <ClientLayout>{children}</ClientLayout>
    </html>
  );
}
