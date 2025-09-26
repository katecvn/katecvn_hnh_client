// pages/_app.tsx
import type { AppProps } from 'next/app';
import Layout from '@/pages/layout'; // hoặc '@/components/layout' tùy bạn đặt

import '@/styles/globals.css';
import { ToastProvider } from '@/components/ui/toast';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <ToastProvider>
        <Component {...pageProps} />
      </ToastProvider>
    </Layout>
  );
}

export default MyApp;
