'use client';

import { Dispatch, FC, SetStateAction } from 'react';

import SearchInput from '@/components/ui/SearchInput';
import SelectFilter from '@/components/ui/SelectFilter';
import { statusFilters } from '@/data/Status';
import { FilterOrdersT } from '@/types/FiltersT';

interface Props {
  filters: FilterOrdersT;
  setFilters: Dispatch<SetStateAction<FilterOrdersT>>;
}

const SellerOrdersProductsFilters: FC<Props> = ({ filters, setFilters }) => {
  return (
    <div className="mt-5 grid min-w-0 grid-cols-1 gap-3 min-[420px]:grid-cols-[minmax(0,1fr)_auto] sm:gap-5">
      <SearchInput
        wrapperClassName="min-w-0"
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
      />
      <SelectFilter
        value={filters.status}
        onChange={(value) => setFilters({ ...filters, status: value! })}
        label="Status"
        options={statusFilters}
      />
    </div>
  );
};

export default SellerOrdersProductsFilters;
