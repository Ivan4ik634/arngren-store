'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { useFilters } from '@/store/useFilters';
import { useOpenFilters } from '@/store/useOpenFilters';
import { ChevronDownIcon } from 'lucide-react';
import { FC } from 'react';
import { brands } from '../data';

interface Props {}

const BrandFilters: FC<Props> = (props) => {
  const { filters, setFilters } = useFilters();
  const { openFilters, setOpenFilters } = useOpenFilters();

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
            placeholder="Search brand..."
            className="h-8 border-zinc-300 pl-3 pr-3 text-sm shadow-sm"
          />
          {brands.map((brand) => (
            <div key={brand} className="flex items-center gap-2">
              <Checkbox
                id={brand}
                checked={filters.brand.includes(brand)}
                onCheckedChange={(checked) => {
                  setFilters({
                    ...filters,
                    brand: checked
                      ? [...filters.brand, brand]
                      : filters.brand.filter((b) => b !== brand),
                  });
                }}
              />
              <label htmlFor={brand} className="text-sm text-zinc-600">
                {brand}
              </label>
            </div>
          ))}
          <div className="flex  items-center cursor-pointer gap-2 text-sm text-primary">
            <p className=" ">Show more</p>
            <ChevronDownIcon className="size-4 " />
          </div>
        </div>
      )}
    </div>
  );
};

export default BrandFilters;
