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
          <main className="px-0 pt-[8rem] sm:pt-[13.75rem] md:pt-[16.75rem] lg:pt-[15.25rem]">
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
