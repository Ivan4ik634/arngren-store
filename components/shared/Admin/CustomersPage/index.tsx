'use client';

import { userService } from '@/services/User.service';
import { useQuery } from '@tanstack/react-query';
import { FC, useState } from 'react';
import CustomerFilters from './CustomerFilters';
import CustomersTable from './CustomersTable';

interface Props {}

const CustomersPage: FC<Props> = (props) => {
  const [filters, setFilters] = useState<{ search: string }>({ search: '' });
  const { data: users } = useQuery({
    queryKey: ['customers', filters],
    queryFn: () => userService.getUsers(filters),
    select: (res) => res?.data,
  });
  return (
    <div>
      <h1 className="font-bold text-2xl">Customers</h1>
      <CustomerFilters filters={filters} setFilters={setFilters} />
      <CustomersTable users={users} />
    </div>
  );
};

export default CustomersPage;
