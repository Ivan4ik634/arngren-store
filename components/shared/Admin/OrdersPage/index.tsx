'use client';

import { useCheckboxes } from '@/hooks/useCheckboxes';
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
  const { data, refetch } = useQuery({
    queryKey: ['orders', filters],
    queryFn: () => orderService.getOrders(filters),
    select: (res) => res?.data,
  });

  const checkboxes = useCheckboxes(data || [], (order) => order.id);

  return (
    <div className="mt-8">
      <h1 className="font-bold text-2xl">Orders</h1>
      <OrdersStats orders={data} />
      <OrdersFilters
        refetch={refetch}
        idsChecked={checkboxes.idsChecked}
        filters={filters}
        setFilters={setFilters}
      />
      <OrdersTable {...checkboxes} data={data} />
    </div>
  );
};

export default OrdersPage;
