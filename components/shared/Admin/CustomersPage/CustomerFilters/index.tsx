'use client';

import { Button } from '@/components/ui/button';
import SearchInput from '@/components/ui/SearchInput';
import { Download, Trash2 } from 'lucide-react';
import { Dispatch, FC, SetStateAction } from 'react';

interface Props {
  filters: { search: string };
  setFilters: Dispatch<
    SetStateAction<{
      search: string;
    }>
  >;
  idsChecked: string[];
}
const CustomerFilters: FC<Props> = ({ filters, idsChecked, setFilters }) => {
  return (
    <div className="flex mt-5 justify-between">
      <div className="flex gap-x-5 items-center">
        <SearchInput
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />
      </div>
      <div className="flex gax-5">
        {idsChecked.length > 0 && (
          <Button variant="destructive">
            <Trash2 className="mr-2 h-4 w-4" /> Delete {idsChecked.length} rows
          </Button>
        )}

        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" /> Export
        </Button>
      </div>
    </div>
  );
};

export default CustomerFilters;
