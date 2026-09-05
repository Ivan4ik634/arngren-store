'use client';

import { Button } from '@/components/ui/button';
import { FiltersProductT } from '@/types/FiltersT';
import { Download } from 'lucide-react';
import { Dispatch, FC, SetStateAction } from 'react';
import SearchInput from '../../ui/SearchInput';
import SelectFilter, { SelectFilterOptionT } from '../../ui/SelectFilter';

const availabilityOptions: SelectFilterOptionT[] = [
  { label: 'All', value: 'all' },
  { label: 'In stock', value: 'in-stock' },
  { label: 'Out of stock', value: 'out-of-stock' },
];
const categoreyOptions: SelectFilterOptionT[] = [
  { label: 'All', value: 'all' },
  { label: 'Sport', value: 'sport' },
  { label: 'Technology', value: 'technology' },
];

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
          options={availabilityOptions}
        />
        <SelectFilter
          value={filters.category}
          onChange={(value) => setFilters({ ...filters, category: value! })}
          label="Category"
          options={categoreyOptions}
        />
      </div>
      <Button variant="outline">
        <Download className="mr-2 h-4 w-4" /> Export
      </Button>
    </div>
  );
};

export default ProductsFilters;
