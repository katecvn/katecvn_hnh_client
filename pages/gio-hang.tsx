import { CheckoutSteps } from '@/components/enhanced-support';

import { Breadcrumb } from '@/components/ui/breadcrumb';
import { useCart } from '@/hooks/use-cart';
import { PriceVND } from '@/utils/format';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function CartPage() {
  const router = useRouter();

  const { cart: cartItems, removeItem, updateQuantity } = useCart();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN').format(value) + ' VNĐ';
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container py-4 mb-6">
      <Breadcrumb
        items={[
          { label: 'Trang chủ', href: '/' },
          { label: 'Giỏ hàng', href: '/gio-hang' },
        ]}
      />

      <section>
        <CheckoutSteps currentStep={1} />
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Danh sách sản phẩm */}
          <div className="col-span-1 md:col-span-3">
            {/* Mobile view */}
            <div className="space-y-3 lg:hidden">
              {cartItems.map((item, index) => (
                <div
                  key={item.id}
                  className="relative bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100"
                  style={{
                    animation: `slideUp 0.4s ease-out ${index * 0.1}s both`,
                  }}
                >
                  {/* Gradient accent */}
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-green-400 to-green-600" />

                  <div className="flex gap-4 p-4">
                    {/* Product Image */}
                    <div className="relative flex-shrink-0">
                      <div className="w-24 h-24 rounded-xl overflow-hidden border border-lime-600 shadow-sm">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      {/* Quantity badge */}
                      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 via-red-500 to-red-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
                        {item.quantity}
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      {/* Name & Unit */}
                      <div>
                        <Link href={`/san-pham/${item.slug}`}>
                          <div className="text-gray-800 hover:text-green-600 text-sm sm:text-base line-clamp-1 leading-tight block mb-1 transition-colors cursor-pointer">
                            <strong>{item.name}</strong>
                            {item.unit && (
                              <span className="inline-block ml-1 px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-full">
                                {item.unit}
                              </span>
                            )}
                          </div>
                        </Link>
                      </div>

                      {/* Price per unit */}
                      <PriceVND
                        value={item.price}
                        className="text-sm text-gray-500 font-medium"
                      />

                      {/* Quantity Controls & Total */}
                      <div className="flex items-center justify-between mt-2">
                        {/* Quantity Buttons */}
                        <div className="flex items-center rounded-lg border border-gray-200 bg-white shadow-sm">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors rounded-l-lg active:scale-95"
                            disabled={item.quantity <= 1}
                          >
                            <svg
                              className="w-3 h-3 sm:w-4 sm:h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M20 12H4"
                              />
                            </svg>
                          </button>

                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) =>
                              updateQuantity(
                                item.id,
                                parseInt(e.target.value) || 1
                              )
                            }
                            className="w-9 h-6 sm:w-12 sm:h-8 text-center border-x border-gray-200 text-sm font-semibold text-gray-700 focus:outline-none focus:bg-green-50"
                            min="1"
                          />

                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors rounded-r-lg active:scale-95"
                          >
                            <svg
                              className="w-3 h-3 sm:w-4 sm:h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 4v16m8-8H4"
                              />
                            </svg>
                          </button>
                        </div>

                        {/* Total Price */}
                        <PriceVND
                          value={item.price * item.quantity}
                          className="text-orange-600 font-bold text-base sm:text-lg"
                        />
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full bg-red-50 text-red-600 hover:bg-red-500 hover:text-white transition-all duration-200 active:scale-90"
                      aria-label="Xóa sản phẩm"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop table view */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="text-base uppercase text-neutral-gray-700 border-b-[3px] border-gray-200">
                    <th className="p-3 text-left">Sản phẩm</th>
                    <th className="p-3 text-center">Giá</th>
                    <th className="p-3 text-center">Số lượng</th>
                    <th className="p-3 text-center">Tạm tính</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="p-3 flex items-center space-x-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <Link href={`/san-pham/${item.slug}`}>
                          <span className="text-gray-800 hover:text-green-600 font-medium">
                            {item.name} {item.unit && `(${item.unit})`}
                          </span>
                        </Link>
                      </td>
                      <td className="p-3 text-center">
                        <PriceVND
                          value={item.price}
                          className="font-semibold"
                          symbolClassName="text-[0.9rem]"
                        />
                      </td>
                      <td className="p-3 text-center">
                        <div className="flex justify-center rounded border border-gray-300 bg-gray-100">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                Math.max(1, item.quantity - 1)
                              )
                            }
                            className="px-2 py-0.5 hover:text-green-600"
                          >
                            -
                          </button>
                          <input
                            type="text"
                            value={item.quantity}
                            onChange={(e) =>
                              updateQuantity(
                                item.id,
                                Math.max(1, Number(e.target.value))
                              )
                            }
                            className="w-12 text-center border-l border-r"
                          />
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="px-2 py-0.5 hover:text-green-600"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="p-3 text-center">
                        <PriceVND
                          value={item.price * item.quantity}
                          className="text-orange-500 font-semibold"
                        />
                      </td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 font-bold text-sm"
                        >
                          X
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sidebar tổng cộng */}
          <div className="col-span-1 md:col-span-2 text-sm sm:text-base text-neutral-gray-700 py-3 px-4 sm:py-5 sm:px-8 md:py-3 md:px-4 lg:py-5 lg:px-8 border rounded bg-white shadow h-fit">
            <h2 className="text-base md:text-lg uppercase font-semibold pb-3 mb-4 border-b-[3px] border-gray-200">
              Tổng cộng giỏ hàng
            </h2>

            <div className="flex justify-between mb-2">
              <span>Tạm tính</span>
              <PriceVND
                value={subtotal}
                className="text-orange-500 text-base sm:text-lg font-semibold"
              />
            </div>

            <div className="flex justify-between mb-2">
              <span>Vận chuyển</span>
              <PriceVND
                value={1}
                className="text-orange-500 text-base sm:text-lg font-semibold"
              />
            </div>

            <div className="flex justify-between border-t pt-2">
              <span>Tổng thanh toán</span>
              <PriceVND
                value={subtotal + 1}
                className="text-orange-500 text-base sm:text-lg font-semibold"
              />
            </div>

            {/* Coupon */}
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Mã ưu đãi</h3>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  placeholder="Nhập mã giảm giá"
                  className="flex-1 border rounded px-2 py-1"
                />
                <button className="px-4 py-1 bg-gray-200 rounded hover:bg-gray-300">
                  Áp dụng
                </button>
              </div>
            </div>

            <button
              onClick={() => router.push('/thanh-toan')}
              className="w-full mt-4 uppercase font-semibold bg-red-500 text-white py-2 rounded hover:bg-red-600"
            >
              Tiến hành thanh toán
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
