'use client';
import api from '@/utils/axios';
import { localStorageUtil } from '@/utils/localStorage';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function GoogleCallbackPage() {
  useEffect(() => {
    const handleGoogleCallback = async () => {
      const rawQuery = window.location.search.split('code=')[1];

      if (rawQuery) {
        try {
          const { data } = await api.get(
            `/customer/auth/google/callback?code=${rawQuery}`
          );

          if (data?.data.token) {
            localStorageUtil.setToken(data?.data.token);
            localStorageUtil.setUser(data?.data.userInformation);
            localStorageUtil.setAuthStatus(
              'success',
              'Đăng nhập Google thành công.'
            );
          } else {
            localStorageUtil.setAuthStatus(
              'failed',
              'Đăng nhập Google thất bại.'
            );
          }
        } catch (error) {
          localStorageUtil.setAuthStatus(
            'failed',
            'Đăng nhập Google thất bại.'
          );
        }

        if (window.opener) {
          window.opener.postMessage(
            {
              type: 'google-auth-status',
              payload: {
                status: localStorageUtil.getAuthStatus(),
                message: localStorageUtil.getAuthMessage(),
              },
            },
            window.location.origin
          );
        }

        setTimeout(() => {
          window.close();
        }, 100);
      } else {
        localStorageUtil.setAuthStatus(
          'failed',
          'Không tìm thấy mã code từ Google.'
        );

        window.close();
      }
    };

    handleGoogleCallback();
  }, []);

  return null;
}
