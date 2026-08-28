'use client';

import { useProductCart } from '@/store/useProductCart';
import { ProductT } from '@/types/ProductT';
import { Minus, Plus, Star, X } from 'lucide-react';
import { FC } from 'react';

interface Props {
  product: ProductT;
  count: number;
}

const ProductCart: FC<Props> = ({ product, count }) => {
  const { deleteProductCard, incrementProductCount, decrementProductCount } = useProductCart();

  return (
    <div className="grid border-b py-8 items-center  gap-x-10 grid-cols-[minmax(400px,1fr)_100px_120px_100px_20px]">
      <div className="flex items-center">
        <img
          src="https://pngimg.com/uploads/motorcycle/motorcycle_PNG5341.png"
          className="w-[100px] aspect-video"
        />
        <div className="ml-5 space-y-2">
          <h3 className="text-base font-bold text-black">{product.name}</h3>
          <p className="mt-1 text-sm text-zinc-500">{product.category}</p>
          <div className="flex items-center">
            <Star className="size-4 fill-[#0969ff] text-[#0969ff]" />
            <span className="mx-1 font-semibold text-[#0969ff]">{product.rating}</span>
            <span className="text-zinc-500"> ({product.reviews})</span>
          </div>
        </div>
      </div>
      <p className="text-xl">${product.price}</p>
      <div className="border justify-center rounded-[5px] p-3 flex items-center">
        <Minus onClick={() => decrementProductCount(product.id)} className="size-7" />
        <span className="mx-5 text-xl">{count}</span>
        <Plus onClick={() => incrementProductCount(product.id)} className="size-7" />
      </div>
      <p className="font-bold text-xl">${product.price * count}</p>
      <X onClick={() => deleteProductCard(product.id)} className="size-7 text-gray-400" />
    </div>
  );
};

export default ProductCart;
