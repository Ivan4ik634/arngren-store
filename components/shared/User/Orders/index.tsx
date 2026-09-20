'use client';

import Loading from '@/components/shared/Loading';
import { orderService } from '@/services/Order.service';
import { FilterOrdersT } from '@/types/FiltersT';
import { useQuery } from '@tanstack/react-query';
import { FC, useState } from 'react';
import UserOrdersFilters from './UserOrdersFilters';
import UserOrdersTable from './UserOrdersTable';

type Props = Record<string, never>;

const UserOrdersPage: FC<Props> = (props) => {
  const [filters, setFilters] = useState<FilterOrdersT>({ search: '', status: 'all' });

  const { data, isPending } = useQuery({
    queryKey: ['orders', filters],
    queryFn: () => orderService.getOrdersUser(filters),
    select: (res) => res?.data,
  });

  return (
    <div>
      <h1 className="font-bold text-2xl">Orders</h1>
      <UserOrdersFilters filters={filters} setFilters={setFilters} />
      {isPending ? <Loading /> : <UserOrdersTable data={data} />}
    </div>
  );
};

export default UserOrdersPage;
