'use client';

import NotFoundData from '@/components/shared/NotFoundData';
import Description from '@/components/ui/description';
import Title from '@/components/ui/title';
import { useProfile } from '@/hooks/useProfile';
import { productService } from '@/services/Product.service';
import { ProductT } from '@/types/ProductT';
import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';
import Loading from '../../Loading';
import ProductCard from '../../ProductCard';

const PopularProducts: FC = () => {
  const { profile } = useProfile();
  const { data: products, isPending } = useQuery({
    queryKey: ['popular-products'],
    queryFn: () => productService.getPopular(4) as Promise<ProductT[]>,
  });

  return (
    <main
      id="popular"
      className="relative isolate flex flex-col justify-center overflow-hidden py-10 sm:py-14 lg:min-h-[600px] lg:py-24">
      <div className="relative flex items-center py-6 sm:py-10 lg:py-20">
        <div className="w-full ">
          <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.32em] text-[#0868ff] sm:text-[11px]">
            POPULAR PRODUCTS
          </p>
          <Title>Most loved by our customers.</Title>
          <Description className="w-full max-w-[700px]">
            Discover the products our community can&apos;t stop talking about - top rated and
            customer-approved.
          </Description>
        </div>
      </div>

      {isPending ? (
        <Loading className="mt-30" />
      ) : (
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {products?.length ? (
            products?.map((product) => (
              <ProductCard product={product} profile={profile} key={product.id} />
            ))
          ) : (
            <NotFoundData type="menu" className="col-span-full" />
          )}
        </div>
      )}
    </main>
  );
};

export default PopularProducts;
