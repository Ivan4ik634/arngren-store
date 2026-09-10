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
    <div className="flex gap-x-5 mt-5 items-center">
      <SearchInput
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
      />
      <SelectFilter
        value={filters.category}
        onChange={(value) => setFilters({ ...filters, category: value! })}
        options={categoryFilters}
        label="Category"
      />
      <SelectFilter
        value={filters.availability}
        onChange={(value) => setFilters({ ...filters, availability: value! })}
        options={availabilityFilters}
        label="Availability"
      />
    </div>
  );
};

export default WishlistFilters;
