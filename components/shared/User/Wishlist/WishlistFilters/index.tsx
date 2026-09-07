'use client';

import SearchInput from '@/components/ui/SearchInput';
import SelectFilter from '@/components/ui/SelectFilter';
import { FiltersProductT } from '@/types/FiltersT';
import { FC } from 'react';

interface Props {
  filters: FiltersProductT;
  setFilters: React.Dispatch<React.SetStateAction<FiltersProductT>>;
}

const categoryOptions = [
  { label: 'All', value: 'all' },
  { label: 'Sport', value: 'sport' },
  { label: 'Technology', value: 'technology' },
];

const availabilityOptions = [
  { label: 'All', value: 'all' },
  { label: 'Out of stock', value: 'out-of-stock' },
  { label: 'In stock', value: 'in-stock' },
];
const WishlistFilters: FC<Props> = (props) => {
  return (
    <div className="flex gap-x-5 mt-5 items-center">
      <SearchInput />
      <SelectFilter options={categoryOptions} label="Category" />
      <SelectFilter options={availabilityOptions} label="Availability" />
    </div>
  );
};

export default WishlistFilters;
