'use client';

import { Button } from '@/components/ui/button';
import { FiltersT } from '@/types/FiltersT';
import { Download } from 'lucide-react';
import { Dispatch, FC, SetStateAction } from 'react';
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
interface Props {
  filters: FiltersT;
  setFilters: Dispatch<SetStateAction<FiltersT>>;
}
const ApplicationsFilters: FC<Props> = ({ filters, setFilters }) => {
  return (
    <div className="flex mt-5 justify-between">
      <div className="flex gap-x-5 items-center">
        <SearchInput
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />
        <SelectFilter
          value={filters.category}
          onChange={(value) => setFilters({ ...filters, category: value! })}
          label="Category"
          options={categoryOptions}
        />
        <SelectFilter
          value={filters.status}
          onChange={(value) => setFilters({ ...filters, status: value! })}
          label="Status"
          options={statusOptions}
        />
      </div>
      <Button variant="outline">
        <Download className="mr-2 h-4 w-4" /> Export
      </Button>
    </div>
  );
};

export default ApplicationsFilters;
