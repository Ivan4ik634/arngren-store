'use client';

import { applicationService } from '@/services/Application.service';
import { ApplicationWithProductT } from '@/types/ApplicationT';
import { FiltersT } from '@/types/FiltersT';
import { FC, useEffect, useState } from 'react';
import ApplicationsFilters from './ApplicationsFilters';
import ApplicationsStats from './ApplicationsStats';
import ApplicationsTable from './ApplicationsTable';

interface Props {}

const ApplicationsPage: FC<Props> = (props) => {
  const [filters, setFilters] = useState<FiltersT>({ search: '', category: 'all', status: 'all' });
  const [applications, setApplications] = useState<ApplicationWithProductT[]>([]);

  useEffect(() => {
    const getApplications = async () => {
      const res = await applicationService.getApplications(filters);

      setApplications(
        res.data?.filter(
          (application) => application.product_id,
        ) as any as ApplicationWithProductT[],
      );
    };
    getApplications();
  }, [filters]);

  return (
    <div className="mt-8 w-full">
      <h1 className="font-bold text-2xl">Applications</h1>
      <ApplicationsStats applications={applications} />
      <ApplicationsFilters filters={filters} setFilters={setFilters} />
      <ApplicationsTable setApplications={setApplications} applications={applications} />
    </div>
  );
};

export default ApplicationsPage;
