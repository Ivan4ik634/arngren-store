'use client';

import { Button } from '@/components/ui/button';
import SearchInput from '@/components/ui/SearchInput';
import SelectFilter from '@/components/ui/SelectFilter';
import { categoryFilters } from '@/data/Catogeries';
import { statusFilters } from '@/data/Status';
import { FiltersT } from '@/types/FiltersT';
import { Download, Trash2 } from 'lucide-react';
import { Dispatch, FC, SetStateAction } from 'react';

interface Props {
  filters: FiltersT;
  idsChecked: string[];
  setFilters: Dispatch<SetStateAction<FiltersT>>;
}
const ApplicationsFilters: FC<Props> = ({ filters, idsChecked, setFilters }) => {
  return (
    <div className="flex mt-5 justify-between">
      <div className="flex gap-x-5 items-center">
        <SearchInput
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />
        <SelectFilter
          value={filters.category}
          onChange={(value) => setFilters({ ...filters, category: value! })}
          label="Category"
          options={categoryFilters}
        />
        <SelectFilter
          value={filters.status}
          onChange={(value) => setFilters({ ...filters, status: value! })}
          label="Status"
          options={statusFilters}
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

export default ApplicationsFilters;
