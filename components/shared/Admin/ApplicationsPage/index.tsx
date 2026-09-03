'use client';

import { applicationService } from '@/services/Application.service';
import { ApplicationT } from '@/types/ApplicationT';
import { FC, useEffect, useState } from 'react';
import ApplicationsFilters from './ApplicationsFilters';
import ApplicationsStats from './ApplicationsStats';
import ApplicationsTable from './ApplicationsTable';

const ApplicationsPage: FC = () => {
  const [applications, setApplications] = useState<ApplicationT[]>([]);

  useEffect(() => {
    const getApplications = async () => {
      const res = await applicationService.getApplications();
      setApplications(res.data as ApplicationT[]);
    };
    getApplications();
  }, []);
  return (
    <div className="mt-8 w-full">
      <h1 className="font-bold text-2xl">Products</h1>
      <ApplicationsStats applications={applications} />
      <ApplicationsFilters />
      <ApplicationsTable />
    </div>
  );
};

export default ApplicationsPage;
