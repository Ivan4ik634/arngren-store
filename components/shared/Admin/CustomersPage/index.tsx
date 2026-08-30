'use client';

import { FC } from 'react';
import CustomerFilters from './CustomerFilters';
import CustomersStats from './CustomersStats';
import CustomersTable from './CustomersTable';

interface Props {}

const CustomersPage: FC<Props> = (props) => {
  return (
    <div>
      <h1 className="font-bold text-2xl">Customers</h1>
      <CustomersStats />
      <CustomerFilters />
      <CustomersTable />
    </div>
  );
};

export default CustomersPage;
