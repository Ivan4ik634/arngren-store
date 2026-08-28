'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { useFilters } from '@/store/useFilters';
import { useOpenFilters } from '@/store/useOpenFilters';
import { ChevronDownIcon } from 'lucide-react';
import { FC } from 'react';
import { categoryFilters } from '../data';

interface Props {}

const CategoryFilters: FC<Props> = (props) => {
  const { filters, setFilters } = useFilters();
  const { openFilters, setOpenFilters } = useOpenFilters();

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setFilters({ ...filters, categories: [...filters.categories, category] });
    } else {
      setFilters({
        ...filters,
        categories: filters.categories.filter((c) => c !== category),
      });
    }
  };
  return (
    <div>
      <div className="flex w-full  items-center justify-between">
        <h1>Category</h1>
        {openFilters.category ? (
          <ChevronDownIcon
            onClick={() => setOpenFilters({ ...openFilters, category: false })}
            className="size-4 rotate-180"
          />
        ) : (
          <ChevronDownIcon
            onClick={() => setOpenFilters({ ...openFilters, category: true })}
            className="size-4"
          />
        )}
      </div>
      {!openFilters.category && (
        <div className="flex flex-col gap-3 my-3 ">
          {categoryFilters.map((category) => (
            <div key={category} className="flex items-center gap-2">
              <Checkbox
                id={category}
                checked={filters.categories.includes(category)}
                onCheckedChange={(checked) => {
                  handleCategoryChange(category, checked);
                }}
              />
              <label htmlFor={category} className="text-sm text-zinc-600">
                {category}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryFilters;
