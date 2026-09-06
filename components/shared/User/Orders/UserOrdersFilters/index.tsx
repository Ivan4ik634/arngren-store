'use client';

import { Dispatch, FC, SetStateAction } from 'react';

import SearchInput from '@/components/ui/SearchInput';
import SelectFilter, { SelectFilterOptionT } from '@/components/ui/SelectFilter';
import { FilterOrdersT } from '@/types/FiltersT';

const statusOptinons: SelectFilterOptionT[] = [
  { label: 'All', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'Processing', value: 'processing' },
  { label: 'Completed', value: 'completed' },
  { label: 'Cancelled', value: 'cancelled' },
];
interface Props {
  filters: FilterOrdersT;
  setFilters: Dispatch<SetStateAction<FilterOrdersT>>;
}

const UserOrdersFilters: FC<Props> = ({ filters, setFilters }) => {
  return (
    <div className="flex mt-5 gap-x-5 items-center">
      <SearchInput
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
      />
      <SelectFilter
        value={filters.status}
        onChange={(value) => setFilters({ ...filters, status: value! })}
        label="Status"
        options={statusOptinons}
      />
    </div>
  );
};

export default UserOrdersFilters;
