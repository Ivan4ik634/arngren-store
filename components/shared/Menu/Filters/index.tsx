'use client';
import { ChevronDown, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';
import { useFilters } from '@/store/useFilters';
import AvailabilityFilters from './AvailabilityFilters';
import BrandFilters from './BrandFilters';
import CategoryFilters from './CategoryFilters';
import PriceRangeFilters from './PriceRangeFilters';

export function Filters() {
  const { clearFilters } = useFilters();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  return (
    <div className="min-w-0 rounded-lg border border-zinc-200 p-3 sm:p-4 lg:rounded-none lg:border-0 lg:p-3 lg:pl-0">
      <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
        <h1 className="hidden lg:block">Filters</h1>
        <button
          type="button"
          className="flex min-h-10 items-center gap-2 font-medium lg:hidden"
          aria-expanded={mobileFiltersOpen}
          aria-controls="menu-filter-options"
          onClick={() => setMobileFiltersOpen((open) => !open)}>
          <SlidersHorizontal className="size-4" />
          Filters
          <ChevronDown className={`size-4 transition-transform ${mobileFiltersOpen ? 'rotate-180' : ''}`} />
        </button>
        <button onClick={() => clearFilters()} className="text-sm text-[#0969ff]">
          Clear All
        </button>
      </div>
      <div id="menu-filter-options" className={`${mobileFiltersOpen ? 'block' : 'hidden'} w-full py-3 lg:block`}>
        <CategoryFilters />
        <PriceRangeFilters />
        <AvailabilityFilters />
        <BrandFilters />
      </div>
    </div>
  );
}
