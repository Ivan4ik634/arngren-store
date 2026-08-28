'use client';

import { useProductCart } from '@/store/useProductCart';
import { ChevronRight, Trash } from 'lucide-react';
import { FC } from 'react';
import { Header } from '../Header';
import OrderSummary from './OrderSummary';
import ProductCart from './ProductCart';

interface Props {}

const CartPage: FC<Props> = (props) => {
  const { productCards } = useProductCart();

  return (
    <main className="bg-white">
      <Header />
      <section className="mx-auto w-full max-w-[1500px]  px-6 py-6 lg:px-10">
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
            {productCards.map((product) => (
              <ProductCart
                key={product.product.id}
                product={product.product}
                count={product.count}
              />
            ))}
            <div className="flex  pt-3 justify-between">
              <button className="mt-6 flex items-center gap-2 text-sm ">
                <span>
                  <Trash className="size-5" />
                </span>
                <span>Clear Cart</span>
              </button>
              <button className="mt-6 flex items-center gap-2 text-sm font-bold text-[#0969ff]">
                <span>Continue Shopping</span>
              </button>
            </div>
          </div>
          <OrderSummary />
        </div>
      </section>
    </main>
  );
};

export default CartPage;
