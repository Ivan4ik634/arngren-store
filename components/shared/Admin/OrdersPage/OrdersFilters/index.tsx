'use client';

import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import SearchInput from '../../ui/SearchInput';
import SelectFilter, { SelectFilterOptionT } from '../../ui/SelectFilter';

const statusOptions: SelectFilterOptionT[] = [
  { label: 'All', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'Processing', value: 'processing' },
  { label: 'Completed', value: 'completed' },
  { label: 'Cancelled', value: 'cancelled' },
];

const OrdersFilters = () => {
  return (
    <div className="flex mt-5 justify-between">
      <div className="flex gap-x-5 items-center">
        <SearchInput placeholder="Search" />
        <SelectFilter label="Status" options={statusOptions} />
      </div>
      <Button variant="outline">
        <Download className="mr-2 h-4 w-4" /> Export
      </Button>
    </div>
  );
};

export default OrdersFilters;
