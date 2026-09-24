'use client';
import { useFilters } from '@/store/useFilters';
import AvailabilityFilters from './AvailabilityFilters';
import BrandFilters from './BrandFilters';
import CategoryFilters from './CategoryFilters';
import PriceRangeFilters from './PriceRangeFilters';

export function Filters() {
  const { clearFilters } = useFilters();
  return (
    <div className="p-3">
      <div className="flex border-b border-zinc-200 pb-3 items-center justify-between">
        <h1>Filters</h1>
        <button onClick={() => clearFilters()} className="text-sm text-[#0969ff]">
          Clear All
        </button>
      </div>
      <div className=" w-full  py-3">
        <CategoryFilters />
        <PriceRangeFilters />
        <AvailabilityFilters />
        <BrandFilters />
      </div>
    </div>
  );
}
