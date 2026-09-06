'use client';

import { orderService } from '@/services/Order.service';
import { FilterOrdersT } from '@/types/FiltersT';
import { useQuery } from '@tanstack/react-query';
import { FC, useState } from 'react';
import OrdersFilters from './OrdersFilters';
import OrdersStats from './OrdersStats';
import OrdersTable from './OrdersTable';

interface Props {}

const OrdersPage: FC<Props> = (props) => {
  const [filters, setFilters] = useState<FilterOrdersT>({ search: '', status: 'all' });
  const { data } = useQuery({
    queryKey: ['orders', filters],
    queryFn: () => orderService.getOrders(filters),
    select: (res) => res?.data,
  });
  return (
    <div className="mt-8">
      <h1 className="font-bold text-2xl">Orders</h1>
      <OrdersStats orders={data} />
      <OrdersFilters filters={filters} setFilters={setFilters} />
      <OrdersTable data={data} />
    </div>
  );
};

export default OrdersPage;
