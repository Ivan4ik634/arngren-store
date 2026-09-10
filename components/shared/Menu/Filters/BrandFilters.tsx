'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { brandFilters } from '@/data/Brands';
import { useSearch } from '@/hooks/useSearch';
import { useFilters } from '@/store/useFilters';
import { useOpenFilters } from '@/store/useOpenFilters';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { FC, useState } from 'react';

interface Props {}

const BrandFilters: FC<Props> = (props) => {
  const { filters, setFilters } = useFilters();
  const [showMore, setShowMore] = useState(false);
  const { openFilters, setOpenFilters } = useOpenFilters();
  const { query, setQuery, filteredItems } = useSearch<{ label: string; value: string }>(
    brandFilters,
    (item, query) => item.label.toLowerCase().includes(query),
  );

  const items = showMore ? filteredItems : filteredItems?.slice(0, 8);

  return (
    <div className="flex flex-col w-full mt-8 ">
      <div className="flex w-full  items-center justify-between">
        <h1 className="font-bold">Brand</h1>
        {openFilters.brand ? (
          <ChevronDownIcon
            onClick={() => setOpenFilters({ ...openFilters, brand: false })}
            className="size-4 rotate-180"
          />
        ) : (
          <ChevronDownIcon
            onClick={() => setOpenFilters({ ...openFilters, brand: true })}
            className="size-4"
          />
        )}
      </div>
      {!openFilters.brand && (
        <div className="flex flex-col gap-3 my-3 ">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Search brand..."
            className="h-8 border-zinc-300 pl-3 pr-3 text-sm shadow-sm"
          />
          {items?.map((brand) => (
            <div key={brand.value} className="flex items-center gap-2">
              <Checkbox
                id={brand.value}
                checked={filters.brand.includes(brand.value)}
                onCheckedChange={(checked) => {
                  setFilters({
                    ...filters,
                    brand: checked
                      ? [...filters.brand, brand.value]
                      : filters.brand.filter((b) => b !== brand.value),
                  });
                }}
              />
              <label htmlFor={brand.value} className="text-sm text-zinc-600">
                {brand.label}
              </label>
            </div>
          ))}
          <div
            onClick={() => setShowMore((prev) => !prev)}
            className="flex  items-center cursor-pointer gap-2 text-sm text-primary">
            {(filteredItems?.length || 0) > 8 ? (
              !showMore ? (
                <>
                  <p className=" ">Show more</p>
                  <ChevronDownIcon className="size-4 " />
                </>
              ) : (
                <>
                  <p className=" ">Show less</p>
                  <ChevronUpIcon className="size-4" />
                </>
              )
            ) : (
              ''
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BrandFilters;
