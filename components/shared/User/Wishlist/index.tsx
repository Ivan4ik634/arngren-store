'use client';

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
  const {} = useQuery({
    queryKey: ['wishlist'],
    queryFn: () => wishlistService.getWishlist(filters),
  });
  return (
    <div>
      <h1 className="font-bold text-2xl">Wishlist</h1>
      <WishlistFilters filters={filters} setFilters={setFilters} />
      <div>
        {}
        <ProductCard></ProductCard>
      </div>
    </div>
  );
};

export default WishlistPage;
