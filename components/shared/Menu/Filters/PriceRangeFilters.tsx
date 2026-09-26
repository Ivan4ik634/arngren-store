'use client';

import { Slider } from '@/components/ui/slider';
import { useFilters } from '@/store/useFilters';
import { FC } from 'react';

const PriceRangeFilters: FC = () => {
  const { filters, setFilters } = useFilters();
  const handleValueChange = (value: number | readonly number[]) => {
    if (Array.isArray(value) && value.length === 2) {
      setFilters({ ...filters, priceRange: [value[0], value[1]] });
    }
  };

  return (
    <div className="flex flex-col w-full mt-8 ">
      <h1 className="font-bold">Price range</h1>

      <Slider
        onValueChange={handleValueChange}
        value={filters.priceRange}
        className="mt-3 w-full max-w-full px-2"
        min={0}
        max={100}
      />
      <div className="flex items-center justify-between mt-3">
        <span className="text-sm text-zinc-600">$0</span>
        <span className="text-sm text-zinc-600">$50000</span>
      </div>
    </div>
  );
};

export default PriceRangeFilters;
