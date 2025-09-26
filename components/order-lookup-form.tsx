'use client';

import { useState } from 'react';

export default function OrderLookupForm() {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: gọi API tra cứu đơn hàng
    console.log('Tra cứu:', inputValue);
  };

  return (
    <div className="w-full mx-auto mt-1 mb-6 px-4 ">
      <p className="font-semibold text-neutral-gray-900 mb-3 font-sans">
        Nhập điện thoại hoặc mã đơn để tra cứu đơn hàng
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        {/* Input */}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Nhập điện thoại hoặc mã đơn để tra cứu đơn hàng"
          className="flex-grow col-span-5 rounded-full border border-neutral-gray-100 px-4 py-2 text-sm focus:outline-none focus:ring-neutral-gray-200"
          required
        />

        {/* Button */}
        <button
          type="submit"
          className="rounded font-sans bg-green-cyan-500 text-white px-6 py-2 font-medium hover:bg-green-700 transition-colors"
        >
          Đồng ý
        </button>
      </form>
    </div>
  );
}
