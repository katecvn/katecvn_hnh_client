import {
  ArticleContent,
  CheckoutSteps,
  PressSection,
} from '@/components/enhanced-support';

import { Breadcrumb } from '@/components/ui/breadcrumb';
import { useCart } from '@/hooks/use-cart';
import { Post } from '@/types/interface';
import api from '@/utils/axios';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function OrderDetailPage() {
  const { cart: cartItems } = useCart();

  const [coupon, setCoupon] = useState('');
  const [addCoupon, setAddCoupon] = useState(false);
  const [agree, setAgree] = useState(false);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN').format(value) + ' VNĐ';
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * 1000 * item.quantity,
    0
  );

  return (
    <div className="container py-4 mb-6">
      <Breadcrumb
        items={[
          { label: 'Trang chủ', href: '/' },
          { label: 'Thanh toán', href: '/thanh-toan' },
        ]}
      />

      <section>
        <CheckoutSteps currentStep={3} />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left: Order details */}
          <div className="lg:col-span-3 border rounded shadow-md py-5 px-8">
            <p className="mb-2 text-base text-gray-700">
              Trả tiền mặt khi giao hàng.
            </p>

            <section>
              <h2 className="text-lg md:text-2xl text-neutral-gray-600 uppercase font-semibold mb-4">
                Chi tiết đơn hàng
              </h2>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-200 text-left">
                    <th className="p-1">SẢN PHẨM</th>
                    <th className="p-1 text-right">TỔNG</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-1">
                      Rau Tía Tô (Gói 100Gr) <strong>× 3</strong>
                    </td>
                    <td className="p-1 text-lg font-semibold text-right text-orange-400">
                      36.000 VNĐ
                    </td>
                  </tr>
                </tbody>
                <tfoot className="bg-gray-50">
                  <tr className="border-b">
                    <th className="p-2  text-left font-semibold ">
                      Tổng tiền sản phẩm:
                    </th>
                    <td className="p-2 text-right text-lg text-orange-400 font-semibold">
                      36.000 VNĐ
                    </td>
                  </tr>
                  <tr className="border-b">
                    <th className="p-2 text-left font-semibold">Vận chuyển:</th>
                    <td className="p-2 text-right text-sm ">
                      <span className="text-lg text-orange-400 font-semibold">
                        1 VNĐ
                      </span>{' '}
                      <span className="text-gray-500">qua Đồng giá</span>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <th className="p-2 text-left font-semibold">
                      Phương thức thanh toán:
                    </th>
                    <td className="p-2 text-right">Thanh toán khi nhận hàng</td>
                  </tr>
                  <tr className="border-b">
                    <th className="p-2 text-left font-semibold">
                      Tổng thanh toán:
                    </th>
                    <td className="p-2 text-right text-lg text-blue-500 font-semibold">
                      36.001 VNĐ
                    </td>
                  </tr>
                  <tr className="border-b">
                    <th className="p-2 text-left font-semibold">Lưu ý:</th>
                    <td className="p-2 text-right text-gray-700">(Không có)</td>
                  </tr>
                </tfoot>
              </table>
            </section>

            {/* Customer details */}
            <section className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-base md:text-lg text-neutral-gray-600 uppercase font-bold mb-2">
                  Địa chỉ thanh toán
                </h2>
                <address className="not-italic text-gray-700 space-y-1">
                  <p>Test trang web</p>
                  <p>Can Thơ</p>
                  <p>Can tho</p>
                  <p>0974235341</p>
                  <p>dev08@gmail.com</p>
                </address>
              </div>
              <div>
                <h2 className="text-base md:text-lg text-neutral-gray-600 uppercase font-bold mb-2">
                  Địa chỉ giao hàng
                </h2>
                <address className="not-italic text-gray-700 space-y-1">
                  <p>Test trang web</p>
                  <p>Can Thơ</p>
                  <p>Can tho</p>
                </address>
              </div>
            </section>
          </div>

          {/* Right: Order summary */}
          <div className="lg:col-span-2">
            <div className="border border-orange-200 bg-orange-50 rounded shadow-md py-5 px-8">
              <p className="text-green-600 text-lg font-sans font-semibold mb-4">
                <CheckCircle className="inline-block w-6 h-6 mr-2 align-middle text-green-600" />
                <strong className="align-middle">
                  Cảm ơn bạn. Đơn hàng của bạn đã được nhận.
                </strong>
              </p>
              <ul className="space-y-3 text-base list-disc list-inside">
                <li>
                  Mã đơn hàng: <strong>2842</strong>
                </li>
                <li>
                  Ngày: <strong>18 Tháng 9, 2025</strong>
                </li>
                <li>
                  Tổng cộng:{' '}
                  <strong className="text-orange-500 text-lg">
                    36.001 VNĐ
                  </strong>
                </li>
                <li>
                  Phương thức thanh toán:{' '}
                  <strong>Thanh toán khi nhận hàng</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
