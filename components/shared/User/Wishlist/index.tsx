'use client';

import { useProfile } from '@/hooks/useProfile';
import { wishlistService } from '@/services/Wishlist.service';
import { FiltersProductT } from '@/types/FiltersT';
import { useQuery } from '@tanstack/react-query';
import { FC, useState } from 'react';
import ProductCard from '../../ProductCard';
import WishlistFilters from './WishlistFilters';

interface Props {}

const WishlistPage: FC<Props> = (props) => {
  const [filters, setFilters] = useState<FiltersProductT>({
    search: '',
    availability: 'all',
    category: 'all',
  });
  const { profile } = useProfile();
  const { data } = useQuery({
    queryKey: ['wishlist', filters],
    queryFn: () => wishlistService.getWishlists(profile?.id || '', filters),
    enabled: !!profile,
  });
  return (
    <div>
      <h1 className="font-bold text-2xl">Wishlist</h1>
      <WishlistFilters filters={filters} setFilters={setFilters} />
      <div className="grid grid-cols-4 gap-5">
        {data &&
          data.data.map((product) => (
            <ProductCard key={product.id} profile={profile} product={product.product_id} />
          ))}
      </div>
    </div>
  );
};

export default WishlistPage;
