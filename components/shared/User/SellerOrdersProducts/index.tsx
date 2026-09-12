'use client';

import { useProfile } from '@/hooks/useProfile';
import { cartItemService } from '@/services/CartItem.service';
import { productService } from '@/services/Product.service';
import { FilterOrdersT } from '@/types/FiltersT';
import { useQuery } from '@tanstack/react-query';
import { FC, useState } from 'react';
import SellerOrdersProductsFilters from './SellerOrdersProductsFilters';
import SellerOrdersProductsTable from './SellerOrdersProductsTable';
//поиск всех продуктов продавца потом поиск всех карт итемсов, через них видим ордерс и все !!!
interface Props {}

const SellerOrdersProductsPage: FC<Props> = (props) => {
  const [filters, setFilters] = useState<FilterOrdersT>({ search: '', status: 'all' });
  const { profile } = useProfile();
  const { data: productIds } = useQuery({
    queryKey: ['products-user-ids', filters],
    queryFn: () => productService.getProductUserIds(profile?.id || ''),
    enabled: !!profile,
  });
  const { data } = useQuery({
    queryKey: ['cart_Items', productIds],
    queryFn: () => cartItemService.getItems(productIds?.flatMap((p) => p.id) || []),
    enabled: !!productIds,
  });

  return (
    <div>
      <h1 className="font-bold text-2xl">Orders</h1>
      <SellerOrdersProductsFilters filters={filters} setFilters={setFilters} />
      <SellerOrdersProductsTable data={data || []} />
    </div>
  );
};

export default SellerOrdersProductsPage;
