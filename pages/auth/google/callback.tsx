'use client';
import { useEffect } from 'react';
import api from '@/utils/axios';
import { localStorageUtil } from '@/utils/localStorage';

export default function GoogleCallbackPage() {
  useEffect(() => {
    const handleGoogleCallback = async () => {
      const code = new URLSearchParams(window.location.search).get('code');

      if (!code) {
        sendStatus('failed', 'Không tìm thấy mã code từ Google.');
        return;
      }

      try {
        const { data } = await api.get(
          `/customer/auth/google/callback?code=${code}`
        );

        if (data?.data?.token) {
          localStorageUtil.setToken(data.data.token);
          localStorageUtil.setUser(data.data.userInformation);
          sendStatus('success', 'Đăng nhập Google thành công.');
        } else {
          sendStatus('failed', 'Đăng nhập Google thất bại.');
        }
      } catch (error) {
        sendStatus('failed', 'Đăng nhập Google thất bại.');
      }
    };

    const sendStatus = (status: 'success' | 'failed', message: string) => {
      if (window.opener) {
        window.opener.postMessage(
          {
            type: 'google-auth-status',
            status,
            message,
          },
          window.location.origin
        );
      }

      setTimeout(() => {
        window.close();
      }, 100);
    };

    handleGoogleCallback();
  }, []);

  return null;
}
