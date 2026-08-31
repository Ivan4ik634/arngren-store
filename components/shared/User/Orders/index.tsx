'use client';

import { FC } from 'react';
import UserOrdersFilters from './UserOrdersFilters';
import UserOrdersTable from './UserOrdersTable';

interface Props {}

const UserOrdersPage: FC<Props> = (props) => {
  return (
    <div>
      <h1 className="font-bold text-2xl">Orders</h1>
      <UserOrdersFilters />
      <UserOrdersTable />
    </div>
  );
};

export default UserOrdersPage;
