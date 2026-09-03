'use client';

import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import SearchInput from '../../ui/SearchInput';
import SelectFilter, { SelectFilterOptionT } from '../../ui/SelectFilter';

const statusOptions: SelectFilterOptionT[] = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'In Active', value: 'inactive' },
];

const CustomerFilters = () => {
  return (
    <div className="flex mt-5 justify-between">
      <div className="flex gap-x-5 items-center">
        <SearchInput />
        <SelectFilter label="Status" options={statusOptions} />
      </div>
      <Button variant="outline">
        <Download className="mr-2 h-4 w-4" /> Export
      </Button>
    </div>
  );
};

export default CustomerFilters;
