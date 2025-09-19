import { CheckoutSteps } from '@/components/enhanced-support';

import { Breadcrumb } from '@/components/ui/breadcrumb';
import { useCart } from '@/hooks/use-cart';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function CartPage() {
  const router = useRouter();

  const { cart: cartItems, removeItem, updateQuantity } = useCart();

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
          { label: 'Giỏ hàng', href: '/gio-hang' },
        ]}
      />

      <section>
        {/* Tiến trình */}
        <CheckoutSteps currentStep={1} />

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 ">
          {/* Danh sách sản phẩm */}
          <div className="lg:col-span-3">
            <table className=" w-full border-collapse text-sm">
              <thead>
                <tr className="text-base uppercase pb-3 text-neutral-gray-700  border-b-[3px] border-gray-200">
                  <th className="p-3 text-left">Sản phẩm</th>
                  <th className="p-3 text-center">Giá</th>
                  <th className="p-3 text-center">Số lượng</th>
                  <th className="p-3 text-center">Tạm tính</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="p-3 flex items-center space-x-3">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="border border-red-500 rounded-full px-2 py-1 text-red-500 hover:text-red-700 text-xs font-bold"
                      >
                        X
                      </button>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <Link href={`/san-pham/${item.id}`}>
                        <span className="text-gray-800 hover:text-green-600 font-medium">
                          {item.name} {item.unit && ' (' + item.unit + ')'}
                        </span>
                      </Link>
                    </td>
                    <td className="p-3 text-center">
                      {formatCurrency(item.price * 1000)}
                    </td>
                    <td className="p-3 text-center">
                      <div className="flex justify-center text-base border border-gray-300 bg-gray-50 overflow-hidden">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              Math.max(1, item.quantity - 1)
                            )
                          }
                          className="px-2 py-1 text-lg hover:bg-gray-100"
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
                          className="w-12 text-center border-l border-r outline-none"
                        />
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="px-2 py-1 text-lg hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="p-3 text-orange-400 text-base md:text-lg  text-center font-semibold">
                      {formatCurrency(item.price * 1000 * item.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Sidebar tổng cộng */}
          <div className="lg:col-span-2 text-neutral-gray-700 pt-3 pb-4 px-4 border rounded  bg-white shadow">
            <h2 className="text-base uppercase  font-semibold pb-3 mb-4 border-b-[3px] border-gray-200">
              Tổng cộng giỏ hàng
            </h2>

            <div className="flex justify-between mb-2">
              <span>Tạm tính</span>
              <span className="font-bold text-orange-400 text-base md:text-md">
                {formatCurrency(subtotal)}
              </span>
            </div>
            <div className="flex justify-between  mb-2">
              <span>Vận chuyển</span>
              <span className="font-bold text-orange-400 text-base md:text-md">
                1 VNĐ
              </span>
            </div>
            <div className="flex justify-between font-bold border-t pt-2">
              <span>Tổng thanh toán</span>
              <span className=" text-green-cyan-500 text-base md:text-lg">
                {formatCurrency(subtotal + 1)}
              </span>
            </div>

            {/* Coupon */}
            <div className="mt-6 ">
              <h3 className="font-semibold mb-2">Mã ưu đãi</h3>
              <div className="flex space-x-2">
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
