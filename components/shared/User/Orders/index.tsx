'use client';

import { orderService } from '@/services/Order.service';
import { FilterOrdersT } from '@/types/FiltersT';
import { useQuery } from '@tanstack/react-query';
import { FC, useState } from 'react';
import UserOrdersFilters from './UserOrdersFilters';
import UserOrdersTable from './UserOrdersTable';

interface Props {}

const UserOrdersPage: FC<Props> = (props) => {
  const [filters, setFilters] = useState<FilterOrdersT>({ search: '', status: 'all' });

  const { data } = useQuery({
    queryKey: ['orders', filters],
    queryFn: () => orderService.getOrdersUser(filters),
    select: (res) => res?.data,
  });

  return (
    <div>
      <h1 className="font-bold text-2xl">Orders</h1>
      <UserOrdersFilters filters={filters} setFilters={setFilters} />
      <UserOrdersTable data={data} />
    </div>
  );
};

export default UserOrdersPage;
