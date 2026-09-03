'use client';

import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import SearchInput from '../../ui/SearchInput';
import SelectFilter, { SelectFilterOptionT } from '../../ui/SelectFilter';

const availabilityOptions: SelectFilterOptionT[] = [
  { label: 'All', value: 'all' },
  { label: 'In stock', value: 'in-stock' },
  { label: 'Out of stock', value: 'out-of-stock' },
];

const ProductsFilters = () => {
  return (
    <div className="flex mt-5 justify-between">
      <div className="flex gap-x-5 items-center">
        <SearchInput />
        <SelectFilter label="Availability" options={availabilityOptions} />
      </div>
      <Button variant="outline">
        <Download className="mr-2 h-4 w-4" /> Export
      </Button>
    </div>
  );
};

export default ProductsFilters;
