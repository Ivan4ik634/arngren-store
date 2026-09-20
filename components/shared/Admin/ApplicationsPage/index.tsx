'use client';

import Loading from '@/components/shared/Loading';
import { useCheckboxes } from '@/hooks/useCheckboxes';
import { useSyncQueryData } from '@/hooks/useSyncQueryData';
import { applicationService } from '@/services/Application.service';
import { ApplicationWithProductT } from '@/types/ApplicationT';
import { FiltersT } from '@/types/FiltersT';
import { useQuery } from '@tanstack/react-query';
import { FC, useState } from 'react';
import ApplicationsFilters from './ApplicationsFilters';
import ApplicationsStats from './ApplicationsStats';
import ApplicationsTable from './ApplicationsTable';

type Props = Record<string, never>;

const ApplicationsPage: FC<Props> = (props) => {
  const [filters, setFilters] = useState<FiltersT>({ search: '', category: 'all', status: 'all' });
  const { data, isPending } = useQuery({
    queryKey: ['applications', filters],
    queryFn: () => applicationService.get(filters),
  });
  const [applications, setApplications] = useSyncQueryData<ApplicationWithProductT>(data);

  const checkboxes = useCheckboxes(applications || [], (application) => application.id);

  return (
    <div className="mt-8 w-full">
      <h1 className="font-bold text-2xl">Applications</h1>
      <ApplicationsStats applications={applications} />
      <ApplicationsFilters
        {...checkboxes}
        setApplications={setApplications}
        filters={filters}
        setFilters={setFilters}
      />
      {isPending ? (
        <Loading />
      ) : (
        <ApplicationsTable
          {...checkboxes}
          setApplications={setApplications}
          applications={applications}
        />
      )}
    </div>
  );
};

export default ApplicationsPage;
