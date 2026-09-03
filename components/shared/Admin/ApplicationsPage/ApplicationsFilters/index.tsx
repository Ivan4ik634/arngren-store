'use client';

import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import SearchInput from '../../ui/SearchInput';
import SelectFilter, { SelectFilterOptionT } from '../../ui/SelectFilter';

const categoryOptions: SelectFilterOptionT[] = [
  { label: 'All', value: 'all' },
  { label: 'Sport', value: 'sport' },
  { label: 'Technology', value: 'technology' },
];

const statusOptions: SelectFilterOptionT[] = [
  { label: 'All', value: 'all' },
  { label: 'Approved', value: 'approved' },
  { label: 'Rejected', value: 'rejected' },
  { label: 'Pending', value: 'pending' },
];

const ApplicationsFilters = () => {
  return (
    <div className="flex mt-5 justify-between">
      <div className="flex gap-x-5 items-center">
        <SearchInput />
        <SelectFilter label="Category" options={categoryOptions} />
        <SelectFilter label="Status" options={statusOptions} />
      </div>
      <Button variant="outline">
        <Download className="mr-2 h-4 w-4" /> Export
      </Button>
    </div>
  );
};

export default ApplicationsFilters;
