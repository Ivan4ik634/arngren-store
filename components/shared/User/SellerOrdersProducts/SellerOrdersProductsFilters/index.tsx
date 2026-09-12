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
    <div className="flex mt-5 gap-x-5 items-center">
      <SearchInput
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
