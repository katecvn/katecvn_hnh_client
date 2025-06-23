'use client';
import { useEffect } from 'react';

export default function GoogleCallbackPage() {
  useEffect(() => {
    const rawQuery = window.location.search.split('code=')[1];

    if (rawQuery) {
      console.log('📤 Gửi mã code về cửa sổ chính:', rawQuery);
      window.opener?.postMessage(
        { type: 'google-auth-code', payload: { rawQuery } },
        window.location.origin
      );
    } else {
      console.log('📤 Gửi lỗi về cửa sổ chính (không có code)');
      window.opener?.postMessage(
        { type: 'google-auth-error' },
        window.location.origin
      );
    }

    console.log('popup origin:', window.location.origin);
    console.log('🟡 Gửi dữ liệu:', {
      type: 'google-auth-code',
      payload: { rawQuery },
    });

    setTimeout(() => {
      console.log('🧹 Đóng cửa sổ popup');
      window.close();
    }, 30000); // Cho delay chút để đảm bảo message gửi xong
  }, []);

  return null;
}
