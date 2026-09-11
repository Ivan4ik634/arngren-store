'use client';

import { useCheckboxes } from '@/hooks/useCheckboxes';
import { userService } from '@/services/User.service';
import { UserT } from '@/types/UserT';
import { useQuery } from '@tanstack/react-query';
import { FC, useEffect, useState } from 'react';
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
  const [users, setUsers] = useState<UserT[] | undefined | null>(data);

  useEffect(() => {
    setUsers(data);
  }, [data]);

  const checkboxes = useCheckboxes(users || [], (user) => user.id);
  return (
    <div>
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
