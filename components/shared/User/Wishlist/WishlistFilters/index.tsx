'use client';

import SearchInput from '@/components/ui/SearchInput';
import SelectFilter from '@/components/ui/SelectFilter';
import { availabilityFilters } from '@/data/Availability';
import { categoryFilters } from '@/data/Catogeries';
import { FiltersProductT } from '@/types/FiltersT';
import { FC } from 'react';

interface Props {
  filters: FiltersProductT;
  setFilters: React.Dispatch<React.SetStateAction<FiltersProductT>>;
}

const WishlistFilters: FC<Props> = ({ filters, setFilters }) => {
  return (
    <div className="mt-5 grid min-w-0 grid-cols-1 gap-3 min-[500px]:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_auto_auto] lg:items-center lg:gap-5">
      <SearchInput
        wrapperClassName="min-w-0"
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
      />
      <div className="min-w-0"><SelectFilter
        value={filters.category}
        onChange={(value) => setFilters({ ...filters, category: value! })}
        options={categoryFilters}
        label="Category"
      /></div>
      <div className="min-w-0"><SelectFilter
        value={filters.availability}
        onChange={(value) => setFilters({ ...filters, availability: value! })}
        options={availabilityFilters}
        label="Availability"
      /></div>
    </div>
  );
};

export default WishlistFilters;
