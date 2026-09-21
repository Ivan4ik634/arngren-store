'use client';

import Loading from '@/components/shared/Loading';
import { useDebounce } from '@/hooks/useDebounce';
import { useProfile } from '@/hooks/useProfile';
import { useSyncQueryData } from '@/hooks/useSyncQueryData';
import { cartItemService } from '@/services/CartItem.service';
import { productService } from '@/services/Product.service';
import { CartItemWithOrderT } from '@/types/CartItemT';
import { FilterOrdersT } from '@/types/FiltersT';
import { useQuery } from '@tanstack/react-query';
import { FC, useState } from 'react';
import SellerOrdersProductsFilters from './SellerOrdersProductsFilters';
import SellerOrdersProductsTable from './SellerOrdersProductsTable';
//поиск всех продуктов продавца потом поиск всех карт итемсов, через них видим ордерс и все !!!
type Props = Record<string, never>;

const SellerOrdersProductsPage: FC<Props> = (props) => {
  const [filters, setFilters] = useState<FilterOrdersT>({ search: '', status: 'all' });
  const debouncedFilters = useDebounce(filters, 300);
  const { profile } = useProfile();
  const { data: productIds, isPending: isPendingIds } = useQuery({
    queryKey: ['products-user-ids', debouncedFilters],
    queryFn: () => productService.getProductUserIds(profile?.id || ''),
    enabled: !!profile,
  });
  const { data, isPending } = useQuery({
    queryKey: ['cart_items', productIds],
    queryFn: () => cartItemService.getItems(productIds?.flatMap((p) => p.id) || []),
    enabled: !!productIds,
  });
  const [cartItems, setCartItems] = useSyncQueryData<CartItemWithOrderT>(data);

  return (
    <div>
      <h1 className="font-bold text-2xl">Orders</h1>
      <SellerOrdersProductsFilters filters={filters} setFilters={setFilters} />
      {isPending || isPendingIds ? (
        <Loading />
      ) : (
        <SellerOrdersProductsTable data={cartItems || []} setCartItems={setCartItems} />
      )}
    </div>
  );
};

export default SellerOrdersProductsPage;
