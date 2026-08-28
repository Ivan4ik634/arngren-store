import { Heart, ShoppingCart, Star } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useProductCart } from '@/store/useProductCart';
import { ProductT } from '@/types/ProductT';

type ProductCardProps = {
  product: ProductT;
};

export function ProductCard({ product }: ProductCardProps) {
  const { addProductCard } = useProductCart();
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
        <p className="text-lg font-extrabold text-black">{product.price}</p>
        <div className="flex items-center gap-1 text-sm">
          <Star className="size-4 fill-[#0969ff] text-[#0969ff]" />
          <span className="font-semibold text-[#0969ff]">{product.rating}</span>
          <span className="text-zinc-500">({product.reviews})</span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-[1fr_48px] gap-3">
        <Button
          onClick={() => addProductCard(product)}
          className="h-9 rounded-md bg-[#0969ff] text-sm hover:bg-[#0057df]">
          + Add to cart
        </Button>
        <Button
          variant="outline"
          size="icon-lg"
          className="h-9 w-12 rounded-md border-zinc-200 bg-zinc-50">
          <ShoppingCart className="size-4" />
        </Button>
      </div>
    </Card>
  );
}
