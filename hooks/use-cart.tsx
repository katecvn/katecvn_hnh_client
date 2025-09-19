// hooks/useCart.ts
import { useState, useEffect } from 'react';
import { localStorageUtil } from '@/utils/localStorage';
import { CartItem } from '@/types/interface';

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    // load giỏ hàng ban đầu
    setCart(localStorageUtil.getCart());

    const updateCart = () => {
      setCart(localStorageUtil.getCart());
    };

    // nghe event cartUpdated
    window.addEventListener('cartUpdated', updateCart);

    return () => {
      window.removeEventListener('cartUpdated', updateCart);
    };
  }, []);

  const addItem = (item: CartItem) => {
    localStorageUtil.addToCart(item);
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (typeof window !== 'undefined') {
      const cart = localStorageUtil.getCart();
      const newCart = cart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
      localStorageUtil.setCart(newCart);
      window.dispatchEvent(new Event('cartUpdated'));
    }
  };

  const removeItem = (id: string) => {
    localStorageUtil.removeFromCart(id);
  };

  const clear = () => {
    localStorageUtil.clearCart();
  };

  return { cart, addItem, updateQuantity, removeItem, clear };
}
