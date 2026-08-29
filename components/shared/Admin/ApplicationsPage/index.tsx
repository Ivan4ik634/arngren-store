'use client';

import { FC } from 'react';
import ApplicationsFilters from './ApplicationsFilters';
import ApplicationsStats from './ApplicationsStats';
import ApplicationsTable from './ApplicationsTable';

interface Props {}

const ApplicationsPage: FC<Props> = (props) => {
  return (
    <div className="mt-8 w-full">
      <h1 className="font-bold text-2xl">Products</h1>
      <ApplicationsStats />
      <ApplicationsFilters />
      <ApplicationsTable />
    </div>
  );
};

export default ApplicationsPage;
