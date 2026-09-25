'use client';

import AuthRequiredDialog from '@/components/shared/AuthRequiredDialog';
import { Button } from '@/components/ui/button';
import { PAGES } from '@/configs/PAGES';
import { useProfile } from '@/hooks/useProfile';
import { useProductBuyNow } from '@/store/useProductBuyNow';
import { useProductCart } from '@/store/useProductCart';
import { ProductT } from '@/types/ProductT';
import { Minus, Plus, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';

interface Props {
  product: ProductT;
}

const ProductInformation: FC<Props> = ({ product }) => {
  const [count, setCount] = useState(1);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const { addProductCard } = useProductCart();
  const { setProduct } = useProductBuyNow();
  const { profile } = useProfile();
  const router = useRouter();

  const handleAddToCart = () => {
    if (!profile?.id) {
      setAuthDialogOpen(true);
      return;
    }
    addProductCard({ product, count });
  };

  const handleBuynow = () => {
    if (!profile?.id) {
      setAuthDialogOpen(true);
      return;
    }
    setProduct({ product, count });
    router.push(PAGES.CART + '?buyNow=true');
  };
  return (
    <div className="grid min-w-0 grid-cols-1 gap-7 lg:grid-cols-2 lg:gap-x-7">
      <div className="w-full min-w-0 lg:max-w-[600px]">
        <img alt={product.name} className="aspect-square w-full rounded-[5px] object-cover" src={product.images[0]} />
        <div className="mt-4 grid grid-cols-4 gap-3 sm:gap-5">
          {product.images.slice(1).map((image, index) => (
            <img key={index} alt={`${product.name} image ${index + 2}`} className="aspect-square w-full rounded-[5px] object-cover" src={image} />
          ))}
        </div>
      </div>
      <div className="flex min-w-0 flex-col space-y-4 lg:min-h-[600px]">
        <div className="space-y-5">
          <h3 className="text-2xl font-bold">{product.name}</h3>
          <p className=" ">{product.description}</p>
          <p className="text-primary font-bold text-xl">
            {product.category.slice(0, 1).toUpperCase() + product.category.slice(1)}
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <p className="text-3xl font-bold sm:text-4xl">${product.price}</p>
            <div className="flex items-center">
              <Star className="size-4 fill-[#0969ff] text-[#0969ff]" />
              <span className="mx-1 font-semibold text-[#0969ff]">{product.rating}</span>
              <span className="text-zinc-500"> ({product.reviews})</span>
            </div>
          </div>
          <div className="flex w-fit items-center rounded-[5px] border-2 border-zinc-500 p-1 shadow">
            <button type="button" onClick={() => count > 1 && setCount((prev) => prev - 1)} aria-label="Decrease quantity" className="flex size-10 items-center justify-center rounded hover:bg-zinc-100"><Minus className="size-5" /></button>
            <span className="min-w-10 text-center text-xl">{count}</span>
            <button type="button" onClick={() => count < product.count && setCount((prev) => prev + 1)} aria-label="Increase quantity" className="flex size-10 items-center justify-center rounded hover:bg-zinc-100"><Plus className="size-5" /></button>
          </div>
        </div>

        <div className="mt-auto border-t border-zinc-500 flex flex-col gap-2">
          <div className="flex justify-between py-4 text-xl font-bold sm:py-5 sm:text-2xl">
            <p>Total</p>
            <p>${product.price * count}</p>
          </div>
          <div className="pt-5">
            <Button onClick={handleAddToCart} className="w-full py-6 text-base sm:py-8 sm:text-xl">
              <Plus />
              Add to Cart
            </Button>

            <Button
              variant="outline"
              onClick={handleBuynow}
              className="mt-3 w-full py-6 text-base sm:py-8">
              Buy Now
            </Button>
          </div>
        </div>
      </div>
      <AuthRequiredDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} />
    </div>
  );
};

export default ProductInformation;
