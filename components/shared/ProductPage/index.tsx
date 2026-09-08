'use client';

import { Button } from '@/components/ui/button';
import { useProductCart } from '@/store/useProductCart';
import { Minus, Plus, Star } from 'lucide-react';
import { FC } from 'react';

interface Props {}

const ProductPage: FC<Props> = (props) => {
  const { deleteProductCard, incrementProductCount, decrementProductCount } = useProductCart();
  return (
    <div className=" h-[calc(100vh-200px)]  ">
      <div className="flex gap-y-[50px] gap-x-[25px]">
        <img
          className="w-[600px] h-[600px] aspect-square rounded-[20px]"
          src="
      /design.png"
        />
        <div className="w-full h-[600px] flex flex-col space-y-4">
          <div className="space-y-5">
            <h3 className="text-2xl font-bold">Product Name</h3>
            <p className=" ">Product Description</p>
            <p className="text-primary font-bold text-xl">Category</p>
            <div className="flex items-center gap-x-5">
              <p className=" text-4xl font-bold">$50</p>
              <div className="flex items-center">
                <Star className="size-4 fill-[#0969ff] text-[#0969ff]" />
                <span className="mx-1 font-semibold text-[#0969ff]">{4.5}</span>
                <span className="text-zinc-500"> ({10})</span>
              </div>
            </div>
            <div className="border-2 shadow border-zinc-500 w-min  rounded-[5px] p-3 flex items-center">
              <Minus className="size-7" />
              <span className="mx-5 text-xl">{1}</span>
              <Plus className="size-7" />
            </div>
          </div>

          <div className="mt-auto border-t border-zinc-500 flex flex-col gap-2">
            <div className="py-5 flex justify-between border-b font-bold text-2xl">
              <p>Total</p>
              <p>$3000</p>
            </div>
            <div className="pt-5">
              <Button className="text-xl w-full py-8">
                <Plus />
                Add to Cart
              </Button>

              <Button variant="outline" className="text-[16px] w-full py-8">
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
