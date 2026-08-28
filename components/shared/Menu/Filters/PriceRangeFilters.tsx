'use client';

import { Slider } from '@/components/ui/slider';
import { useFilters } from '@/store/useFilters';
import { FC } from 'react';

interface Props {}

const PriceRangeFilters: FC<Props> = (props) => {
  const { filters, setFilters } = useFilters();
  return (
    <div className="flex flex-col w-full mt-8 ">
      <h1 className="font-bold">Price range</h1>

      <Slider
        onValueChange={(value) => setFilters({ ...filters, priceRange: value })}
        value={filters.priceRange}
        onValueStart={(value) => setFilters({ ...filters, priceRange: value })}
        onValueEnd={(value) => setFilters({ ...filters, priceRange: value })}
        onValueChangeEnd={(value) => setFilters({ ...filters, priceRange: value })}
        onValueChangeStart={(value) => setFilters({ ...filters, priceRange: value })}
        onValueChangeCommit={(value) => setFilters({ ...filters, priceRange: value })}
        className="w-[200px] mt-3 border"
        min={0}
        max={100}
        step={1}
      />
      <div className="flex items-center justify-between mt-3">
        <span className="text-sm text-zinc-600">$20</span>
        <span className="text-sm text-zinc-600">$80</span>
      </div>
    </div>
  );
};

export default PriceRangeFilters;
