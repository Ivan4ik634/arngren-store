'use client';

import { useProfile } from '@/hooks/useProfile';
import { cartItemService } from '@/services/CartItem.service';
import { orderService } from '@/services/Order.service';
import { productService } from '@/services/Product.service';
import { useProductBuyNow } from '@/store/useProductBuyNow';
import { useProductCart } from '@/store/useProductCart';
import { AddressT } from '@/types/OrderT';
import { Lock, Truck, Undo2 } from 'lucide-react';
import { FC } from 'react';
import toast from 'react-hot-toast';
import CheckoutDrawer from './CheckoutDrawer';

interface Props {
  buyNow?: boolean;
}

const OrderSummary: FC<Props> = ({ buyNow = false }) => {
  const { productCards } = useProductCart();
  const { product } = useProductBuyNow();
  const itemsPrices = buyNow
    ? (product?.product.price || 0) * (product?.count || 1) + 5
    : productCards.reduce((acc, item) => acc + item.product.price * item.count, 0);

  const { profile } = useProfile();
  const handleCheckout = async (address: AddressT) => {
    if (!profile?.id) {
      return toast.error('User not found');
    }
    if (profile.balance < itemsPrices) {
      return toast.error('Insufficient balance');
    }
    const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    const { data: order, error: orderError } = await orderService.create({
      user_id: profile.id,
      items_length: buyNow ? 1 : productCards.length,
      total: itemsPrices,
      order_id: orderNumber,
      ...address,
    });

    if (orderError || !order) {
      return toast.error(orderError?.message || 'Failed to create order');
    }

    const { error: itemsError } = await cartItemService.create(
      buyNow ? [product!] : productCards,
      order.id,
    );

    if (itemsError) {
      return toast.error(itemsError.message);
    }
    for (let i = 0; i < productCards.length; i++) {
      await productService.update({
        id: productCards[i].product.id,
        count: productCards[i].product.count - productCards[i].count,
      });
    }

    toast.success('Order created successfully');
  };

  return (
    <div className="w-full space-y-8  ml-8">
      <div className="border w-full p-7  rounded-[10px]">
        <h1 className="font-bold text-3xl">Order Summary</h1>
        <div className="py-5 space-y-3">
          <div className="flex  justify-between">
            <p>Items ({buyNow ? 1 : productCards.length})</p>
            <p className="font-semibold">${itemsPrices}</p>
          </div>
          <div className="flex  justify-between">
            <p>Shipping </p>
            <p className="font-semibold">${itemsPrices > 500 ? 0 : 5}</p>
          </div>
        </div>
        <div className="">
          <div className="flex border-t pt-5 justify-between">
            <p className="font-semibold">Total</p>
            <p className="font-semibold">${itemsPrices > 500 ? itemsPrices : itemsPrices + 5}</p>
          </div>
          <CheckoutDrawer onCheckout={handleCheckout} />
        </div>
      </div>
      <div className="border space-y-8 w-full  p-7  rounded-[10px]">
        <div className="flex items-start">
          <Truck className="size-7 text-primary" />
          <div className="ml-4">
            <h1 className="font-semibold mb-1">Free shipping</h1>
            <p>Free shipping on orders over $500</p>
          </div>
        </div>
        <div className="flex items-start">
          <Undo2 className="size-7 text-primary" />
          <div className="ml-4">
            <h1 className="font-semibold mb-1">30-day returns</h1>
            <p>Not satisfied? Get a full refund</p>
          </div>
        </div>
        <div className="flex items-start">
          <Lock className="size-7 text-primary" />
          <div className="ml-4">
            <h1 className="font-semibold mb-1">Secure payment</h1>
            <p>Your payment information is protected</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
