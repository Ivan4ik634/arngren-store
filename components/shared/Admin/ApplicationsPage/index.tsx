'use client';

import { useCheckboxes } from '@/hooks/useCheckboxes';
import { applicationService } from '@/services/Application.service';
import { ApplicationWithProductT } from '@/types/ApplicationT';
import { FiltersT } from '@/types/FiltersT';
import { useQuery } from '@tanstack/react-query';
import { FC, useEffect, useState } from 'react';
import ApplicationsFilters from './ApplicationsFilters';
import ApplicationsStats from './ApplicationsStats';
import ApplicationsTable from './ApplicationsTable';

interface Props {}

const ApplicationsPage: FC<Props> = (props) => {
  const [filters, setFilters] = useState<FiltersT>({ search: '', category: 'all', status: 'all' });
  const { data } = useQuery({
    queryKey: ['applications', filters],
    queryFn: () => applicationService.getApplications(filters),
  });
  const [applications, setApplications] = useState<ApplicationWithProductT[] | undefined>(
    data || [],
  );

  useEffect(() => {
    setApplications(data);
  }, [data]);

  const checkboxes = useCheckboxes(applications || [], (application) => application.id);

  return (
    <div className="mt-8 w-full">
      <h1 className="font-bold text-2xl">Applications</h1>
      <ApplicationsStats applications={applications} />
      <ApplicationsFilters
        idsChecked={checkboxes.idsChecked}
        filters={filters}
        setFilters={setFilters}
      />
      <ApplicationsTable
        {...checkboxes}
        setApplications={setApplications}
        applications={applications}
      />
    </div>
  );
};

export default ApplicationsPage;
