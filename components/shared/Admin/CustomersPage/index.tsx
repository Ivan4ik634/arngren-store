'use client';

import { useCheckboxes } from '@/hooks/useCheckboxes';
import { useSyncQueryData } from '@/hooks/useSyncQueryData';
import { userService } from '@/services/User.service';
import { UserT } from '@/types/UserT';
import { useQuery } from '@tanstack/react-query';
import { FC, useState } from 'react';
import CustomerFilters from './CustomerFilters';
import CustomersTable from './CustomersTable';

interface Props {}

const CustomersPage: FC<Props> = (props) => {
  const [filters, setFilters] = useState<{ search: string }>({ search: '' });
  const { data } = useQuery({
    queryKey: ['customers', filters],
    queryFn: () => userService.getUsers(filters),
    select: (res) => res?.data,
  });
  const [users, setUsers] = useSyncQueryData<UserT>(data);

  const checkboxes = useCheckboxes(users || [], (user) => user.id);
  return (
    <div className="mt-8 w-full">
      <h1 className="font-bold text-2xl">Customers</h1>
      <CustomerFilters
        {...checkboxes}
        setUsers={setUsers}
        filters={filters}
        setFilters={setFilters}
      />
      <CustomersTable setUsers={setUsers} {...checkboxes} users={users} />
    </div>
  );
};

export default CustomersPage;
