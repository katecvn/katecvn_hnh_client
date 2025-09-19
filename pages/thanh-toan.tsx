import { CheckoutSteps } from '@/components/enhanced-support';

import { Breadcrumb } from '@/components/ui/breadcrumb';
import { useCart } from '@/hooks/use-cart';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function PaymentPage() {
  const router = useRouter();
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
        <CheckoutSteps currentStep={2} />
        {/* Coupon */}
        <p className="font-sans text-base mb-3">
          Bạn có mã ưu đãi?{' '}
          <button
            onClick={() => setAddCoupon(!addCoupon)}
            className="text-green-cyan-500 hover:underline"
          >
            Ấn vào đây để nhập mã
          </button>
        </p>
        {addCoupon && (
          <div className="font-sans rounded border border-dashed border-green-600 py-6 px-8 mb-6">
            <p>Nếu bạn có mã giảm giá, vui lòng điền vào phía bên dưới.</p>
            <div className="flex mt-3 shadow-md">
              <input
                type="text"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Nhập mã giảm giá"
                className="flex-1 border border-gray-300 rounded-l px-3 py-2 text-sm"
              />
              <button className="bg-green-600 text-white px-4 rounded-r text-sm font-semibold mb-1">
                Áp dụng
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left: Billing form */}
          <div className="lg:col-span-3 border-t-2 border-gray-300 shadow py-5 px-8 rounded-b">
            <h2 className="text-lg text-neutral-gray-600 font-bold mb-4 uppercase">
              Thông tin thanh toán
            </h2>
            <form className="space-y-4 text-neutral-gray-800">
              {/* Tên & Họ */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Tên <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Họ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>
              </div>

              {/* Công ty */}
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Tên công ty (tuỳ chọn)
                </label>
                <input
                  type="text"
                  className="w-full border px-3 py-2 rounded"
                />
              </div>

              {/* Quốc gia */}
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Quốc gia/Khu vực <span className="text-red-500">*</span>
                </label>
                <select className="w-full border px-3 py-2 rounded">
                  <option>Việt Nam</option>
                </select>
              </div>

              {/* Địa chỉ */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Địa chỉ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Căn hộ, phòng (tuỳ chọn)
                  </label>
                  <input
                    type="text"
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>
              </div>

              {/* Mã bưu điện */}
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Mã bưu điện (tuỳ chọn)
                </label>
                <input
                  type="text"
                  className="w-full border px-3 py-2 rounded"
                />
              </div>

              {/* Thành phố */}
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Thị trấn/Thành phố <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border px-3 py-2 rounded"
                />
              </div>

              {/* Số điện thoại & Email */}
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Số điện thoại <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Địa chỉ email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  className="w-full border px-3 py-2 rounded"
                />
              </div>

              {/* Ghi chú */}
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Ghi chú đơn hàng (tuỳ chọn)
                </label>
                <textarea
                  rows={3}
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Ví dụ: thời gian giao hàng..."
                />
              </div>
            </form>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-2 ">
            <section className="border-2 border-lime-green py-5 px-8 rounded">
              <h2 className="text-lg font-bold mb-4 text-neutral-gray-600 uppercase">
                Đơn hàng của bạn
              </h2>
              <table className="w-full text-[0.9rem] mb-4">
                <thead>
                  <tr className="border-b-2 text-neutral-gray-800 uppercase">
                    <th className="text-left py-2">Sản phẩm</th>
                    <th className="text-right py-2">Tạm tính</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr className="border-b">
                      <td className="py-2 text-neutral-gray-600">
                        {item.name} {item.unit && ' (' + item.unit + ') '}{' '}
                        <strong>× {item.quantity}</strong>
                      </td>
                      <td className="text-right text-orange-400 font-semibold text-base md:text-lg">
                        {formatCurrency(item.price * 1000)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td className="py-2 font-semibold">Tạm tính</td>
                    <td className="text-right text-orange-400 font-semibold text-base md:text-lg">
                      {formatCurrency(subtotal)}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 font-semibold">Vận chuyển</td>
                    <td className="text-right text-[0.8rem]">
                      <span>Đồng giá: </span>
                      <span className="text-orange-400 font-semibold text-base md:text-lg">
                        1 VND
                      </span>
                    </td>
                  </tr>
                  <tr className="border-t-2">
                    <td className="py-2 font-bold">Tổng thanh toán</td>
                    <td className="text-right font-bold text-orange-600 text-base md:text-lg">
                      {formatCurrency(subtotal + 1)}
                    </td>
                  </tr>
                </tfoot>
              </table>

              {/* Payment */}
              <div className="mb-4">
                <label className="flex items-center space-x-2">
                  <input type="radio" defaultChecked />
                  <span>Thanh toán khi nhận hàng</span>
                </label>
                <p className="text-xs text-gray-500 ml-5">
                  Trả tiền mặt khi giao hàng
                </p>
              </div>

              {/* Điều khoản */}
              <div className="mb-4">
                <label className="flex items-start space-x-2 text-sm">
                  <input
                    type="checkbox"
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                  />
                  <span>
                    Tôi đã đọc và đồng ý với{' '}
                    <Link href="/chinh-sach-bao-mat">
                      <a className="text-blue-600 underline">
                        điều khoản và điều kiện
                      </a>
                    </Link>{' '}
                    của website
                  </span>
                </label>
              </div>

              {/* Submit */}
              <button
                disabled={!agree}
                onClick={() => router.push('/don-hang')}
                className={`uppercase w-full py-2 rounded font-semibold transition ${
                  agree
                    ? 'bg-red-600 text-white hover:bg-red-500'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Đặt hàng
              </button>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
