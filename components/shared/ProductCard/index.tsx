'use client';

import { Card } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { PAGES } from '@/configs/PAGES';
import { cn } from '@/lib/utils';
import { wishlistService } from '@/services/Wishlist.service';
import { ProductT } from '@/types/ProductT';
import { UserT } from '@/types/UserT';
import { useQuery } from '@tanstack/react-query';
import { Heart, Star } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';

interface Props {
  product: ProductT;
  children?: React.ReactNode;
  className?: string;
  profile: UserT | null;
}

const ProductCard: FC<Props> = ({ product, profile, className, children }) => {
  const {
    refetch,
    data: wishlist,
    error,
  } = useQuery({
    queryKey: ['wishlist', profile?.id, product.id],
    queryFn: () => wishlistService.getById(profile?.id || '', product.id),
    select: (res) => res?.data,
    enabled: !!profile?.id && !!product?.id,
  });

  const handleWishlist = async () => {
    if (!profile?.id) return;

    if (wishlist) {
      await wishlistService.delete(profile.id, product.id);
    } else {
      await wishlistService.create(profile.id, product.id);
    }

    refetch();
  };
  return (
    <Card className="group relative gap-0 rounded-lg border border-zinc-200 bg-white p-4 py-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)] ring-0">
      <button
        onClick={handleWishlist}
        className="absolute right-3 top-3 z-10 flex size-10 items-center justify-center rounded-full bg-white/90 text-zinc-400 hover:text-red-500 sm:right-4 sm:top-4"
        aria-label="Favorite">
        <Heart
          className={`size-5 ${wishlist?.product_id === product.id && !error ? 'text-red-500 fill-red-500' : ''} `}
        />
      </button>

      <div className="relative w-full">
        <Carousel className="relative w-full px-9 sm:px-12">
          <CarouselContent>
            {product.images?.map((image, index) => (
              <CarouselItem key={index}>
                <Link href={PAGES.PRODUCT(product.id)}>
                  <div className="flex h-40 w-full items-center justify-center">
                    <img src={image} alt={product.name} className="max-h-36 max-w-full object-contain" />
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="left-0" />
          <CarouselNext className="right-0" />
        </Carousel>
      </div>

      <div className="flex h-full flex-col">
        <Link href={PAGES.PRODUCT(product.id)} className="flex flex-1 flex-col">
          <div className="mt-3 min-w-0">
            <h3 className="truncate text-base font-bold text-black">{product.name}</h3>
            <p className="mt-1 line-clamp-2 break-words text-sm text-zinc-500">{product.description.slice(0, 80)}</p>
          </div>

          <div className="mt-auto flex items-center justify-between pt-4">
            <p className="text-lg font-extrabold text-black">$ {product.price}</p>
            <div className="flex items-center gap-1 text-sm">
              <Star className="size-4 fill-[#0969ff] text-[#0969ff]" />
              <span className="font-semibold text-[#0969ff]">{product.rating}</span>
              <span className="text-zinc-500">({product.reviews})</span>
            </div>
          </div>
        </Link>

        {children && <div className={cn('mt-4', className)}>{children}</div>}
      </div>
    </Card>
  );
};

export default ProductCard;
