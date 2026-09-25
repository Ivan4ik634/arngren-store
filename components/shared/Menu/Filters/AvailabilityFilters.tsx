'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { useFilters } from '@/store/useFilters';
import { useOpenFilters } from '@/store/useOpenFilters';
import { ChevronDownIcon } from 'lucide-react';
import { FC } from 'react';

const AvailabilityFilters: FC = () => {
  const { filters, setFilters } = useFilters();
  const { openFilters, setOpenFilters } = useOpenFilters();
  return (
    <div className="flex flex-col w-full mt-8 ">
      <div className="flex w-full  items-center justify-between">
        <h1 className="font-bold">Availability</h1>
        <button
          type="button"
          aria-label={openFilters.availability ? 'Collapse availability' : 'Expand availability'}
          aria-expanded={!openFilters.availability}
          className="flex size-10 items-center justify-center rounded-md hover:bg-zinc-100"
          onClick={() => setOpenFilters({ ...openFilters, availability: !openFilters.availability })}>
          <ChevronDownIcon className={`size-4 transition-transform ${openFilters.availability ? '' : 'rotate-180'}`} />
        </button>
      </div>
      {!openFilters.availability && (
        <div className="flex flex-col gap-3 my-3 ">
          <div className="flex min-h-10 items-center gap-2">
            <Checkbox
              id="in-stock"
              checked={filters.availability[0]}
              onCheckedChange={(checked) => {
                setFilters({ ...filters, availability: [checked, filters.availability[1]] });
              }}
            />
            <label htmlFor="in-stock" className="text-sm text-zinc-600">
              In stock
            </label>
          </div>
          <div className="flex min-h-10 items-center gap-2">
            <Checkbox
              id="out-of-stock"
              checked={filters.availability[1]}
              onCheckedChange={(checked) => {
                setFilters({ ...filters, availability: [filters.availability[0], checked] });
              }}
            />
            <label htmlFor="out-of-stock" className="text-sm text-zinc-600">
              Out of stock
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvailabilityFilters;
