import { CheckoutSteps } from '@/components/enhanced-support';
import { RequestLogin } from '@/components/request-login';

import { Breadcrumb } from '@/components/ui/breadcrumb';
import { useCart } from '@/hooks/use-cart';
import { UserInfo } from '@/types/interface';
import api from '@/utils/axios';
import { PriceVND } from '@/utils/format';
import { localStorageUtil } from '@/utils/localStorage';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function PaymentPage() {
  const router = useRouter();

  const { cart: cartItems, clear } = useCart();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [token, setToken] = useState('');

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [note, setNote] = useState('');

  const [coupon, setCoupon] = useState('');
  const [addCoupon, setAddCoupon] = useState(false);
  const [agree, setAgree] = useState(false);

  useEffect(() => {
    const storedToken = localStorageUtil.getToken();
    const storedUser = localStorageUtil.getUser();
    setToken(storedToken ?? '');
    setUserInfo(storedUser);
  }, []);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const isTodayOrFuture = (d: string) => {
    if (!d) return false;
    const input = new Date(d + 'T00:00:00');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return input >= today;
  };

  const validate = () => {
    const errors: Record<string, string> = {};

    if (!firstName.trim()) errors.firstName = 'Vui lòng nhập Họ';
    if (!lastName.trim()) errors.lastName = 'Vui lòng nhập Tên';
    if (!address.trim()) errors.address = 'Vui lòng nhập Địa chỉ';
    if (!city.trim()) errors.city = 'Vui lòng nhập Tỉnh/Thành phố';

    const phoneOk = /^0\d{9,10}$/.test(phone.trim());
    if (!phone.trim()) errors.phone = 'Vui lòng nhập Số điện thoại';
    else if (!phoneOk) errors.phone = 'Số điện thoại không hợp lệ';

    if (email.trim()) {
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
      if (!emailOk) errors.email = 'Email không hợp lệ';
    }

    if (!deliveryDate) errors.deliveryDate = 'Vui lòng chọn Ngày giao hàng';
    else if (!isTodayOrFuture(deliveryDate))
      errors.deliveryDate = 'Ngày giao phải từ hôm nay trở đi';

    if (!agree) errors.agree = 'Bạn cần đồng ý điều khoản';

    if (!cartItems.length) errors.cart = 'Giỏ hàng trống';
    cartItems.forEach((it, idx) => {
      if (!it.variantId)
        errors[`item_${idx}`] = `Thiếu variantId cho sản phẩm: ${it.name}`;
      if (!it.quantity || it.quantity <= 0)
        errors[`qty_${idx}`] = `Số lượng không hợp lệ cho: ${it.name}`;
    });

    setFieldErrors(errors);
  };

  const handleSubmit = async () => {
    if (!agree) return;

    validate();

    try {
      setLoading(true);
      const payload = {
        userId: userInfo?.id || null,
        customerId: userInfo?.id || null,
        customerName: `${lastName} ${firstName}`,
        customerPhone: phone,
        customerEmail: email || null,
        customerAddress: `${address}, ${city}`,
        items: cartItems.map((item) => {
          const id =
            typeof item.variantId === 'string'
              ? parseInt(item.variantId, 10)
              : item.variantId;

          if (!Number.isFinite(id)) {
            throw new Error(
              `variantId không hợp lệ cho sản phẩm: ${item.name}`
            );
          }

          return {
            productVariantId: id,
            quantity: Number(item.quantity) || 0,
          };
        }),

        shippingMethod: 'standard_shipping',
        paymentMethod: 'cod',
        note: note,
        orderForDate: deliveryDate,
        discounts: coupon ? [coupon] : [],
      };
      console.log('payload', payload);
      const res = await api.post('/order/create', payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res.data.data);
      toast.success('Đơn hàng đã được đặt thành công');
      clear();
      router.push(`/don-hang?id=${res.data.data.id}`);
    } catch (err: any) {
      toast.error('Đặt hàng thất bại, vui lòng thử lại!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4 ">
      <Breadcrumb
        items={[
          { label: 'Trang chủ', href: '/' },
          { label: 'Thanh toán', href: '/thanh-toan' },
        ]}
      />

      <section>
        <CheckoutSteps currentStep={2} />
        {/* Coupon */}
        {userInfo ? (
          <div>
            <p className="font-sans text-sm md:text-base">
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

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 text-[0.8rem] md:text-base">
              {/* Left: Billing form */}
              <div className="lg:col-span-3 bg-white border-t-2 border-gray-300 shadow py-3 px-4 sm:py-5 sm:px-8 rounded-b">
                <h2 className="text-base md:text-lg text-neutral-gray-500 font-bold mb-4 uppercase">
                  Thông tin thanh toán
                </h2>
                <form className="space-y-4 text-sm md:text-base text-neutral-gray-800">
                  {/* Tên & Họ */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold mb-1">
                        Họ <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className={`w-full border px-3 py-2 rounded ${
                          fieldErrors.firstName ? 'border-red-500' : ''
                        }`}
                        required
                      />
                      {fieldErrors.firstName && (
                        <p className="text-red-600 text-xs mt-1">
                          {fieldErrors.firstName}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block font-semibold mb-1">
                        Tên <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className={`w-full border px-3 py-2 rounded ${
                          fieldErrors.lastName ? 'border-red-500' : ''
                        }`}
                        required
                      />
                      {fieldErrors.lastName && (
                        <p className="text-red-600 text-xs mt-1">
                          {fieldErrors.lastName}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Địa chỉ */}
                  <div>
                    <label className="block font-semibold mb-1">
                      Địa chỉ <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className={`w-full border px-3 py-2 rounded ${
                        fieldErrors.address ? 'border-red-500' : ''
                      }`}
                      required
                    />
                    {fieldErrors.address && (
                      <p className="text-red-600 text-xs mt-1">
                        {fieldErrors.address}
                      </p>
                    )}
                  </div>

                  {/* Ngày giao hàng */}
                  <div>
                    <label className="block font-semibold mb-1">
                      Ngày giao hàng <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      className={`w-full border px-3 py-2 rounded ${
                        fieldErrors.deliveryDate ? 'border-red-500' : ''
                      }`}
                      required
                      min={new Date().toISOString().split('T')[0]}
                    />
                    {fieldErrors.deliveryDate && (
                      <p className="text-red-600 text-xs mt-1">
                        {fieldErrors.deliveryDate}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Số điện thoại */}
                    <div>
                      <label className="block font-semibold mb-1">
                        Số điện thoại <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className={`w-full border px-3 py-2 rounded ${
                          fieldErrors.phone ? 'border-red-500' : ''
                        }`}
                      />
                      {fieldErrors.phone && (
                        <p className="text-red-600 text-xs mt-1">
                          {fieldErrors.phone}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block font-semibold mb-1">Email</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full border px-3 py-2 rounded ${
                          fieldErrors.email ? 'border-red-500' : ''
                        }`}
                      />
                      {fieldErrors.email && (
                        <p className="text-red-600 text-xs mt-1">
                          {fieldErrors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Ghi chú */}
                  <div>
                    <label className="block font-semibold mb-1">
                      Ghi chú đơn hàng
                    </label>
                    <textarea
                      rows={3}
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      className="w-full border px-3 py-2 rounded"
                    />
                  </div>
                </form>
              </div>

              {/* Right: Order Summary */}
              <div className="lg:col-span-2 ">
                <section className="bg-white border-2 border-lime-green py-3 px-4 sm:py-5 sm:px-8 rounded">
                  <h2 className="text-base md:text-lg font-bold mb-4 text-neutral-gray-600 uppercase">
                    Đơn hàng của bạn
                  </h2>
                  <table className="w-full text-sm md:text-base mb-4">
                    <thead>
                      <tr className="border-b-2 text-neutral-gray-800 uppercase">
                        <th className="text-left pb-2">Sản phẩm</th>
                        <th className="text-right pb-2">Tạm tính</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item) => (
                        <tr
                          key={item.variantId ?? item.id}
                          className="border-b"
                          style={{ width: '70%' }}
                        >
                          <td className="py-2 text-neutral-gray-600">
                            {item.name} {item.unit && ' (' + item.unit + ') '}{' '}
                            <strong>× {item.quantity}</strong>
                          </td>
                          <td className="text-right" style={{ width: '30%' }}>
                            <PriceVND
                              value={item.price}
                              className="text-orange-400 font-semibold text-base md:text-lg"
                              symbolClassName="text-lg align-baseline"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td className="py-2 font-semibold">Tạm tính</td>
                        <td className="text-right">
                          <PriceVND
                            value={subtotal}
                            className="text-orange-400 font-semibold text-base md:text-lg"
                            symbolClassName="text-lg align-baseline"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 font-semibold">Vận chuyển</td>
                        <td className="text-right text-[0.7rem] sm:text-[0.8rem]">
                          <span>Đồng giá: </span>
                          <PriceVND
                            value={1}
                            className="text-orange-400 font-semibold text-base md:text-lg"
                            symbolClassName="text-lg align-baseline"
                          />
                        </td>
                      </tr>
                      <tr className="border-t-2">
                        <td className="py-2 font-bold">Tổng thanh toán</td>
                        <td className="text-right">
                          <PriceVND
                            value={subtotal}
                            className="text-orange-400 font-semibold text-base md:text-lg"
                            symbolClassName="text-lg align-baseline"
                          />
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
                    <label className="flex items-start space-x-2 ">
                      <input
                        type="checkbox"
                        checked={agree}
                        onChange={(e) => setAgree(e.target.checked)}
                      />
                      <span
                        className={`transition ${
                          !agree ? 'opacity-50' : 'opacity-100'
                        }`}
                      >
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
                    type="button"
                    onClick={(e) => {
                      handleSubmit();
                    }}
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
          </div>
        ) : (
          <RequestLogin message="tiếp tục tiến hành thanh toán đơn hàng" />
        )}
      </section>
    </div>
  );
}
