'use client';
import { useFilters } from '@/store/useFilters';
import AvailabilityFilters from './AvailabilityFilters';
import BrandFilters from './BrandFilters';
import CategoryFilters from './CategoryFilters';
import PriceRangeFilters from './PriceRangeFilters';

export function Filters() {
  const { filters, setFilters } = useFilters();
  return (
    <div className="p-3">
      <div className="flex border-b border-zinc-200 pb-3 items-center justify-between">
        <h1>Filters</h1>
        <button
          onClick={() =>
            setFilters({
              categories: ['All Categories'],
              priceRange: [0, 1000],
              availability: [true, true],
              brand: [],
              sortBy: 'Price: Low to High',
            })
          }
          className="text-sm text-[#0969ff]">
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
