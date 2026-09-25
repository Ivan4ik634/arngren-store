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
    <div className="relative grid min-w-0 grid-cols-2 items-center gap-x-4 gap-y-3 border-b py-5 pr-9 sm:gap-x-6 xl:grid-cols-[minmax(400px,1fr)_100px_120px_100px_20px] xl:gap-x-10 xl:py-8 xl:pr-0">
      <div className="col-span-2 flex min-w-0 items-center xl:col-span-1">
        <img alt={product.name} src={product.images[0]} className="aspect-square w-16 shrink-0 object-cover sm:w-20 xl:w-[100px]" />
        <div className="ml-3 min-w-0 space-y-1 sm:ml-5 sm:space-y-2">
          <h3 className="break-words text-sm font-bold text-black sm:text-base">{product.name}</h3>
          <p className="line-clamp-2 break-words text-xs text-zinc-500 sm:text-sm">{product.description}</p>
          <div className="flex items-center">
            <Star className="size-4 fill-[#0969ff] text-[#0969ff]" />
            <span className="mx-1 font-semibold text-[#0969ff]">{product.rating}</span>
            <span className="text-zinc-500"> ({product.reviews})</span>
          </div>
        </div>
      </div>
      <p className="text-base sm:text-xl">${product.price}</p>
      <div className="flex w-fit items-center justify-self-end rounded-[5px] border p-1 xl:justify-self-start xl:p-2">
        <button type="button" onClick={() => decrementProductCount(product.id)} aria-label={`Decrease ${product.name} quantity`} className="flex size-9 items-center justify-center rounded hover:bg-zinc-100"><Minus className="size-4 sm:size-5" /></button>
        <span className="min-w-8 text-center text-base sm:min-w-10 sm:text-xl">{count}</span>
        <button type="button" onClick={() => incrementProductCount(product.id)} aria-label={`Increase ${product.name} quantity`} className="flex size-9 items-center justify-center rounded hover:bg-zinc-100"><Plus className="size-4 sm:size-5" /></button>
      </div>
      <p className="font-bold text-base sm:text-xl">${product.price * count}</p>
      <button type="button" onClick={() => deleteProductCard(product.id)} aria-label={`Remove ${product.name} from cart`} className="absolute right-0 top-5 flex size-10 items-center justify-center text-gray-400 hover:text-red-500 xl:static xl:top-auto"><X className="size-5 sm:size-7" /></button>
    </div>
  );
};

export default ProductCart;
