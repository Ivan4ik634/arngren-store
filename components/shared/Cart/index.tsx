'use client';

import { PAGES } from '@/configs/PAGES';
import { useProductBuyNow } from '@/store/useProductBuyNow';
import { useProductCart } from '@/store/useProductCart';
import { ChevronRight, Trash } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import OrderSummary from './OrderSummary';
import ProductCart from './ProductCart';

interface Props {}

const CartPage: FC<Props> = (props) => {
  const search = useSearchParams();
  const [buyNow, setBuyNow] = useState(false);

  const { clearProductsCard, productCards } = useProductCart();
  const { product, setProduct } = useProductBuyNow();

  useEffect(() => {
    if (search.get('buyNow') === 'true') {
      setBuyNow(true);
    }
  }, [search]);

  return (
    <main className="bg-white">
      <div className="mb-6 flex items-center gap-2 text-sm font-medium text-zinc-500">
        <span>Home</span>
        <ChevronRight className="size-4" />
        <span className="font-semibold text-[#0969ff]">Menu</span>
      </div>

      <div className="flex flex-col gap-6 border-b border-zinc-200 pb-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-5xl font-black tracking-tight text-black">Your Cart</h1>
          <p className="mt-3 max-w-xl text-base leading-6 text-zinc-600">
            Review the items you've added to your cart and proceed to checkout.
          </p>
        </div>
      </div>

      <div className="mt-4 flex w-full gap-8 ">
        <div className="">
          <div className="grid gap-x-10 grid-cols-[minmax(400px,1fr)_100px_120px_100px_20px]">
            <span className="font-bold text-xl">Product</span>
            <span className="font-bold text-xl">Price</span>
            <span className="font-bold text-xl">Quantity</span>
            <span className="font-bold text-xl">Total</span>
          </div>
          {!buyNow
            ? productCards.map((product) => (
                <ProductCart
                  key={product.product.id}
                  product={product.product}
                  count={product.count}
                />
              ))
            : product && (
                <ProductCart
                  key={product.product.id}
                  product={product.product}
                  count={product.count}
                />
              )}
          <div className="flex  pt-3 justify-between">
            <button
              onClick={() => (buyNow ? setProduct(null) : clearProductsCard())}
              className="mt-6 flex items-center gap-2 text-sm ">
              <span>
                <Trash className="size-5" />
              </span>
              <span>Clear Cart</span>
            </button>
            <Link href={PAGES.MENU}>
              <button className="mt-6 flex items-center gap-2 text-sm font-bold text-[#0969ff]">
                <span>Continue Shopping</span>
              </button>
            </Link>
          </div>
        </div>
        <OrderSummary buyNow={buyNow} />
      </div>
    </main>
  );
};

export default CartPage;
