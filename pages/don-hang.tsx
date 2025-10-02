import { CheckoutSteps } from '@/components/enhanced-support';
import { RequestLogin } from '@/components/request-login';

import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Order, UserInfo } from '@/types/interface';
import api from '@/utils/axios';
import { formatDateVN, PriceVND } from '@/utils/format';
import { localStorageUtil } from '@/utils/localStorage';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function OrderDetailPage() {
  const router = useRouter();
  const { id } = router.query as { id?: string };

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const [token, setToken] = useState('');
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const storedToken = localStorageUtil.getToken() ?? '';
    const storedUser = localStorageUtil.getUser();
    setToken(storedToken);
    setUserInfo(storedUser);

    if (id && storedToken) {
      getOrderDetail(id, storedToken);
    }
  }, [id]);

  const getOrderDetail = async (id: string, bearer: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get(`/order/${id}`, {
        headers: { Authorization: `Bearer ${bearer}` },
      });

      setOrder(response.data.data);
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  console.log(order);

  return (
    <div className="container py-4 mb-6">
      <Breadcrumb
        items={[
          { label: 'Trang chủ', href: '/' },
          { label: 'Đơn hàng', href: '/don-hang' },
        ]}
      />

      <section>
        <CheckoutSteps currentStep={3} />
        {userInfo ? (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {/* Left: Order details */}
            <div className="md:col-span-3 border rounded shadow-md py-3 px-4 sm:py-5 sm:px-8 md:py-3 md:px-4 lg:py-5 lg:px-8">
              <section>
                <h2 className="text-lg md:text-2xl text-neutral-gray-600 uppercase font-semibold mb-4">
                  Chi tiết đơn hàng
                </h2>
                <table className="w-full text-sm md:text-base">
                  <thead>
                    <tr className="border-b-2 border-gray-200 text-left">
                      <th className="p-1">SẢN PHẨM</th>
                      <th className="p-1 text-right">TỔNG</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order?.orderItems?.map((item) => (
                      <tr className="border-b">
                        <td className="p-1">
                          {item.productName} <strong>× {item.quantity}</strong>
                        </td>
                        <td className="p-1 text-right">
                          <PriceVND
                            value={item.salePrice}
                            className="text-lg font-semibold text-orange-400"
                            symbolClassName="text-md  ml-1 align-baseline"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50">
                    <tr className="border-b">
                      <th className="p-2  text-left font-semibold ">
                        Tổng tiền sản phẩm:
                      </th>
                      <td className="p-2 text-right">
                        <PriceVND
                          value={order?.totalAmount}
                          className="text-lg font-semibold text-orange-400"
                          symbolClassName="text-md  ml-1 align-baseline"
                        />
                      </td>
                    </tr>
                    <tr className="border-b">
                      <th className="p-2 text-left font-semibold">
                        Vận chuyển:
                      </th>
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
                      <td className="p-2 text-right">
                        Thanh toán khi nhận hàng
                      </td>
                    </tr>
                    <tr className="border-b">
                      <th className="p-2 text-left font-semibold">
                        Tổng thanh toán:
                      </th>
                      <td className="p-2 text-right">
                        <PriceVND
                          value={order?.subTotal}
                          className="text-lg font-semibold text-orange-400"
                          symbolClassName="text-md  ml-1 align-baseline"
                        />
                      </td>
                    </tr>
                    <tr className="border-b">
                      <th className="p-2 text-left font-semibold">Lưu ý:</th>
                      <td className="p-2 text-right text-gray-700">
                        {order?.note || '(Không có)'}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </section>

              {/* Customer details */}
              <section className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-base md:text-lg text-neutral-gray-600 uppercase font-bold mb-2">
                    Địa chỉ giao hàng
                  </h2>
                  <address className="not-italic text-gray-700 space-y-1 text-sm md:text-base">
                    <p>
                      <strong>Tên khách hàng: </strong>
                      {order?.shippings[0]?.customerName}
                    </p>
                    <p>
                      {' '}
                      <strong>Số điện thoại: </strong>
                      {order?.shippings[0]?.customerPhone}
                    </p>
                    <p>
                      {' '}
                      <strong>Địa chỉ: </strong>
                      {order?.shippings[0]?.customerAddress}
                    </p>
                  </address>
                </div>
              </section>
            </div>

            {/* Right: Order summary */}
            <div className="md:col-span-2">
              <div className="border border-orange-200 bg-orange-50 rounded shadow-md py-3 px-4 sm:py-5 sm:px-8 md:py-3 md:px-4 lg:py-5 lg:px-8">
                <p className="text-green-600 text-base md:text-lg font-sans font-semibold mb-4">
                  <CheckCircle className="inline-block w-6 h-6 mr-2 align-middle text-green-600" />
                  <strong className="align-middle">
                    Cảm ơn bạn. Đơn hàng của bạn đã được nhận.
                  </strong>
                </p>
                <ul className="space-y-3 text-sm md:text-base list-disc list-inside">
                  <li>
                    Mã đơn hàng: <strong>{order?.code}</strong>
                  </li>
                  <li>
                    Ngày: <strong>{formatDateVN(order?.date)}</strong>
                  </li>
                  <li>
                    Tổng cộng:{' '}
                    <PriceVND
                      value={order?.totalAmount}
                      className="text-lg font-semibold text-orange-500"
                      symbolClassName="text-md  ml-1 align-baseline"
                    />
                  </li>
                  <li>
                    Phương thức thanh toán:{' '}
                    <strong>Thanh toán khi nhận hàng</strong>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <RequestLogin message="xem chi tiết đơn hàng" />
        )}
      </section>
    </div>
  );
}
