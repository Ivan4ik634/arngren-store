'use client';

import { Button } from '@/components/ui/button';
import SearchInput from '@/components/ui/SearchInput';
import SelectFilter from '@/components/ui/SelectFilter';
import { availabilityFilters } from '@/data/Availability';
import { categoryFilters } from '@/data/Catogeries';
import { FiltersProductT } from '@/types/FiltersT';
import { Download } from 'lucide-react';
import { Dispatch, FC, SetStateAction } from 'react';

interface Props {
  setFilters: Dispatch<SetStateAction<FiltersProductT>>;

  filters: FiltersProductT;
}
const ProductsFilters: FC<Props> = ({ filters, setFilters }) => {
  return (
    <div className="flex mt-5 justify-between">
      <div className="flex gap-x-5 items-center">
        <SearchInput
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />
        <SelectFilter
          value={filters.availability}
          onChange={(value) => setFilters({ ...filters, availability: value! })}
          label="Availability"
          options={availabilityFilters}
        />
        <SelectFilter
          value={filters.category}
          onChange={(value) => setFilters({ ...filters, category: value! })}
          label="Category"
          options={categoryFilters}
        />
      </div>
      <Button variant="outline">
        <Download className="mr-2 h-4 w-4" /> Export
      </Button>
    </div>
  );
};

export default ProductsFilters;
