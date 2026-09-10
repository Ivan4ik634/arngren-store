'use client';

import { useProfile } from '@/hooks/useProfile';
import { productService } from '@/services/Product.service';
import { FiltersProductT } from '@/types/FiltersT';
import { useQuery } from '@tanstack/react-query';
import { FC, useState } from 'react';
import ProductCard from '../../ProductCard';
import DialogAddProduct from './DialogAddProduct';
import UserProductsFilters from './UserProductsFilters';

interface Props {}

const UserProductsPage: FC<Props> = (props) => {
  const [filters, setFilters] = useState<FiltersProductT>({
    search: '',
    category: 'all',
    availability: 'all',
  });
  const { profile } = useProfile();
  const { data } = useQuery({
    queryKey: ['products', filters],
    queryFn: () => productService.getUserProducts(profile?.id || '', filters),
    enabled: !!profile,
  });

  return (
    <div>
      <div className="flex justify-between">
        <div>
          <h1 className="font-bold text-2xl">Products</h1>
          <p className="opacity-50"> Manage your products</p>
        </div>
        <DialogAddProduct />
      </div>
      <UserProductsFilters filters={filters} setFilters={setFilters} />
      <div className="mt-5 grid grid-cols-4 gap-5">
        {data?.map((product) => (
          <ProductCard profile={profile} key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default UserProductsPage;
