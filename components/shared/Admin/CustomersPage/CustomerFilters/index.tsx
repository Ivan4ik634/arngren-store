'use client';

import { Button } from '@/components/ui/button';
import SearchInput from '@/components/ui/SearchInput';
import { Download } from 'lucide-react';
import { Dispatch, FC, SetStateAction } from 'react';

interface Props {
  filters: { search: string };
  setFilters: Dispatch<
    SetStateAction<{
      search: string;
    }>
  >;
}
const CustomerFilters: FC<Props> = ({ filters, setFilters }) => {
  return (
    <div className="flex mt-5 justify-between">
      <div className="flex gap-x-5 items-center">
        <SearchInput
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />
      </div>
      <Button variant="outline">
        <Download className="mr-2 h-4 w-4" /> Export
      </Button>
    </div>
  );
};

export default CustomerFilters;
