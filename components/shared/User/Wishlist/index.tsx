'use client';

import Loading from '@/components/shared/Loading';
import NotFoundData from '@/components/shared/NotFoundData';
import { useProfile } from '@/hooks/useProfile';
import { wishlistService } from '@/services/Wishlist.service';
import { FiltersProductT } from '@/types/FiltersT';
import { useQuery } from '@tanstack/react-query';
import { FC, useState } from 'react';
import ProductCard from '../../ProductCard';
import WishlistFilters from './WishlistFilters';

type Props = Record<string, never>;

const WishlistPage: FC<Props> = (props) => {
  const [filters, setFilters] = useState<FiltersProductT>({
    search: '',
    availability: 'all',
    category: 'all',
  });
  const { profile } = useProfile();
  const { data, isPending } = useQuery({
    queryKey: ['wishlist', filters],
    queryFn: () => wishlistService.get(profile?.id || '', filters),
    enabled: !!profile,
  });

  return (
    <div>
      <h1 className="font-bold text-2xl">Wishlist</h1>
      <WishlistFilters filters={filters} setFilters={setFilters} />
      {isPending ? (
        <Loading />
      ) : (data?.length || 0) !== 0 ? (
        <div className="grid grid-cols-4 gap-5">
          {data?.map((product) => (
            <ProductCard key={product.id} profile={profile} product={product.product_id} />
          ))}
        </div>
      ) : (
        <NotFoundData type="wishlist" />
      )}
    </div>
  );
};

export default WishlistPage;
