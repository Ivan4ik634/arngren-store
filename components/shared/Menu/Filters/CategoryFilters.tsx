'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { categoryFilters } from '@/data/Catogeries';
import { useFilters } from '@/store/useFilters';
import { useOpenFilters } from '@/store/useOpenFilters';
import { ChevronDownIcon } from 'lucide-react';
import { FC } from 'react';

const CategoryFilters: FC = () => {
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
        <button
          type="button"
          aria-label={openFilters.category ? 'Collapse categories' : 'Expand categories'}
          aria-expanded={!openFilters.category}
          className="flex size-10 items-center justify-center rounded-md hover:bg-zinc-100"
          onClick={() => setOpenFilters({ ...openFilters, category: !openFilters.category })}>
          <ChevronDownIcon className={`size-4 transition-transform ${openFilters.category ? '' : 'rotate-180'}`} />
        </button>
      </div>
      {!openFilters.category && (
        <div className="flex flex-col gap-3 my-3 ">
          {categoryFilters.map((category) => (
            <div key={category.value} className="flex min-h-10 items-center gap-2">
              <Checkbox
                id={category.value}
                checked={filters.categories.includes(category.value)}
                onCheckedChange={(checked) => {
                  handleCategoryChange(category.value, checked);
                }}
              />
              <label htmlFor={category.value} className="text-sm text-zinc-600">
                {category.label}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryFilters;
