'use client';

import { FC } from 'react';
import OrdersFilters from './OrdersFilters';
import OrdersStats from './OrdersStats';
import OrdersTable from './OrdersTable';

interface Props {}

const OrdersPage: FC<Props> = (props) => {
  return (
    <div className="mt-8">
      <h1 className="font-bold text-2xl">Orders</h1>
      <OrdersStats />
      <OrdersFilters />
      <OrdersTable />
    </div>
  );
};

export default OrdersPage;
