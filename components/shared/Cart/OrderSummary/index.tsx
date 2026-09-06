'use client';

import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/toast';
import { supabase } from '@/lib/supabase/client';
import { cartItemService } from '@/services/CartItem.service';
import { orderService } from '@/services/Order.service';
import { useProductCart } from '@/store/useProductCart';
import { Lock, Truck, Undo2 } from 'lucide-react';
import { FC } from 'react';

interface Props {}

const OrderSummary: FC<Props> = (props) => {
  const { productCards } = useProductCart();
  const handleCheckout = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user?.id) {
      return toast.close('User not found');
    }

    const total = productCards.reduce((acc, item) => acc + item.product.price * item.count, 0);

    const { data: order, error: orderError } = await orderService.createOrder({
      user_id: user.id,
      items_length: productCards.length,
      total,
    });

    if (orderError || !order) {
      return toast.close(orderError?.message || 'Failed to create order');
    }

    const { error: itemsError } = await cartItemService.createItems(productCards, order.id);

    if (itemsError) {
      return toast.close(itemsError.message);
    }
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: productCards,
        order,
      }),
    });

    const { url } = await res.json();

    if (url) {
      window.location.href = url;
    }
  };

  return (
    <div className="w-full space-y-8  ml-8">
      <div className="border w-full p-7  rounded-[10px]">
        <h1 className="font-bold text-3xl">Order Summary</h1>
        <div className="py-5 space-y-3">
          <div className="flex  justify-between">
            <p>Items ({productCards.length})</p>
            <p className="font-semibold">
              ${productCards.reduce((acc, item) => acc + item.product.price * item.count, 0)}
            </p>
          </div>
          <div className="flex  justify-between">
            <p>Shipping </p>
            <p className="font-semibold">$0</p>
          </div>
        </div>
        <div className="">
          <div className="flex border-t pt-5 justify-between">
            <p className="font-semibold">Total</p>
            <p className="font-semibold">
              ${productCards.reduce((acc, item) => acc + item.product.price * item.count, 0) + 0}
            </p>
          </div>
          <Button onClick={handleCheckout} size="lg" className="w-full mt-5 text-xl py-7">
            Checkout
          </Button>
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
