'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useProductCart } from '@/store/useProductCart';
import { ProductT } from '@/types/ProductT';
import { Heart, Minus, Plus, Star } from 'lucide-react';
import { FC } from 'react';

interface Props {
  product: ProductT;
  count: number;
}

const BagProductCard: FC<Props> = ({ product, count }) => {
  const { deleteProductCard, incrementProductCount, decrementProductCount } = useProductCart();

  return (
    <Card className="relative gap-0 rounded-lg border border-zinc-200 bg-white p-4 py-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)] ring-0">
      <button
        className="absolute right-4 top-4 z-10 text-zinc-400 hover:text-red-500"
        aria-label="Favorite">
        <Heart className="size-5" />
      </button>

      <div className="flex h-40 items-center justify-center px-4">
        <img
          src={product.image}
          alt={product.name}
          className="max-h-36 max-w-full object-contain"
        />
      </div>

      <div className="mt-3 min-w-0">
        <h3 className="truncate text-base font-bold text-black">{product.name}</h3>
        <p className="mt-1 text-sm text-zinc-500">{product.category}</p>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-lg font-extrabold text-black">$ {product.price}</p>
        <div className="flex items-center gap-1 text-sm">
          <Star className="size-4 fill-[#0969ff] text-[#0969ff]" />
          <span className="font-semibold text-[#0969ff]">{product.rating}</span>
          <span className="text-zinc-500">({product.reviews})</span>
        </div>
      </div>

      <div className="mt-8 pt-5 border-t">
        <div className=" flex items-center justify-between">
          <p className="text-lg font-extrabold text-black">Total</p>
          <p className="text-lg font-extrabold text-black">${product.price * count}</p>
        </div>
        <div className="mt-5 flex w-full  items-center justify-between">
          <div className="border-2   justify-center rounded-[5px] p-3 flex items-center">
            <Minus onClick={() => decrementProductCount(product.id)} className="size-7" />
            <span className="mx-5 text-xl">{count}</span>
            <Plus onClick={() => incrementProductCount(product.id)} className="size-7" />
          </div>
          <Button
            onClick={() => deleteProductCard(product.id)}
            className="h-12 px-5  rounded-md bg-[#0969ff] text-sm hover:bg-[#0057df]">
            Delete Product
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default BagProductCard;
