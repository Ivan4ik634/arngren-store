'use client';

import { Button } from '@/components/ui/button';
import { useProductBuyNow } from '@/store/useProductBuyNow';
import { useProductCart } from '@/store/useProductCart';
import { ProductT } from '@/types/ProductT';
import { Minus, Plus, Star } from 'lucide-react';
import Link from 'next/link';
import { FC, useState } from 'react';

interface Props {
  product: ProductT;
}

const ProductInformation: FC<Props> = ({ product }) => {
  const [count, setCount] = useState(1);
  const { addProductCard } = useProductCart();
  const { setProduct } = useProductBuyNow();
  return (
    <div className="flex gap-y-[50px] gap-x-[25px]">
      <div className="w-[600px] h-full">
        <img className="w-full aspect-square rounded-[5px]" src={product.images[0]} />
        <div className="gap-5 grid grid-cols-4">
          {product.images.slice(1).map((image, index) => (
            <img key={index} className="w-full aspect-square rounded-[5px]" src={image} />
          ))}
        </div>
      </div>
      <div className="w-full h-[600px] flex flex-col space-y-4">
        <div className="space-y-5">
          <h3 className="text-2xl font-bold">{product.name}</h3>
          <p className=" ">{product.description}</p>
          <p className="text-primary font-bold text-xl">{product.category}</p>
          <div className="flex items-center gap-x-5">
            <p className=" text-4xl font-bold">${product.price}</p>
            <div className="flex items-center">
              <Star className="size-4 fill-[#0969ff] text-[#0969ff]" />
              <span className="mx-1 font-semibold text-[#0969ff]">{product.rating}</span>
              <span className="text-zinc-500"> ({product.reviews})</span>
            </div>
          </div>
          <div className="border-2 shadow border-zinc-500 w-min  rounded-[5px] p-3 flex items-center">
            <Minus onClick={() => count > 1 && setCount((prev) => prev - 1)} className="size-7" />
            <span className="mx-5 text-xl">{count}</span>
            <Plus
              onClick={() => count < product.count && setCount((prev) => prev + 1)}
              className="size-7"
            />
          </div>
        </div>

        <div className="mt-auto border-t border-zinc-500 flex flex-col gap-2">
          <div className="py-5 flex justify-between border-b font-bold text-2xl">
            <p>Total</p>
            <p>${product.price * count}</p>
          </div>
          <div className="pt-5">
            <Button
              onClick={() => addProductCard({ product, count })}
              className="text-xl w-full py-8">
              <Plus />
              Add to Cart
            </Button>

            <Link href="/cart?buynow=true">
              <Button
                onClick={() => setProduct({ product, count })}
                variant="outline"
                className="text-[16px] w-full py-8">
                Buy Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInformation;
