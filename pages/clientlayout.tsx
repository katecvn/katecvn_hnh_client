'use client';

import React from 'react';
import Head from 'next/head';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ThemeProvider } from '@/components/theme-provider';
import {
  QuickContact,
  ScrollToTop,
} from '@/components/floating-contact-widget';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="px-0 pt-[9.25rem] min-[400px]:pt-[8.25rem] pb-3 md:pb-5 sm:pt-[8.75rem] md:pt-[13.75rem] lg:pt-[15.5rem] bg-gradient-to-br from-green-50 via-white to-lime-50/80">
            {children}
          </main>
          <Footer />
          <QuickContact />
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </>
  );
}
