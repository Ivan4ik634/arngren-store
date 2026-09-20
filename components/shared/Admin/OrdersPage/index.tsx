'use client';

import { useCheckboxes } from '@/hooks/useCheckboxes';
import { useSyncQueryData } from '@/hooks/useSyncQueryData';
import { orderService } from '@/services/Order.service';
import { FilterOrdersT } from '@/types/FiltersT';
import { OrderWithUserT } from '@/types/OrderT';
import { useQuery } from '@tanstack/react-query';
import { FC, useState } from 'react';
import OrdersFilters from './OrdersFilters';
import OrdersStats from './OrdersStats';
import OrdersTable from './OrdersTable';

type Props = Record<string, never>;

const OrdersPage: FC<Props> = (props) => {
  const [filters, setFilters] = useState<FilterOrdersT>({ search: '', status: 'all' });
  const { data } = useQuery({
    queryKey: ['orders', filters],
    queryFn: () => orderService.get(filters),
    select: (res) => res?.data,
  });

  const [orders, setOrders] = useSyncQueryData<OrderWithUserT>(data);

  const checkboxes = useCheckboxes(data || [], (order) => order.id);

  return (
    <div className="mt-8">
      <h1 className="font-bold text-2xl">Orders</h1>
      <OrdersStats orders={data} />
      <OrdersFilters
        setOrders={setOrders}
        {...checkboxes}
        filters={filters}
        setFilters={setFilters}
      />
      <OrdersTable setOrders={setOrders} {...checkboxes} data={orders} />
    </div>
  );
};

export default OrdersPage;
