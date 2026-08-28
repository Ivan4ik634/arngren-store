'use client';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useFilters } from '@/store/useFilters';
import { ProductT } from '@/types/ProductT';
import { FC } from 'react';
import { categoryFilters } from './data';
import { ProductCard } from './ProductCard';

interface Props {
  products: ProductT[];
}

const MenuProducts: FC<Props> = ({ products }) => {
  const { filters, setFilters } = useFilters();

  return (
    <div className="flex min-w-0 w-full flex-col gap-5">
      <div className="mt-6 mb-4 flex w-full items-center justify-between">
        <div className="min-w-0">
          <h1 className="font-bold">1,248 items found</h1>

          <div className="mt-3 flex flex-wrap gap-2">
            {categoryFilters.map((category) => (
              <Button
                onClick={() =>
                  setFilters({
                    ...filters,
                    categories: [category],
                  })
                }
                key={category}
                variant={filters.categories.includes(category) ? 'default' : 'outline'}>
                {category}
              </Button>
            ))}

            <Select
              defaultValue="Price: Low to High"
              onValueChange={(value) =>
                setFilters({
                  ...filters,
                  sortBy: value as any,
                })
              }>
              <SelectTrigger className="w-[170px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="Price: Low to High">Price: Low to High</SelectItem>

                <SelectItem value="Price: High to Low">Price: High to Low</SelectItem>

                <SelectItem value="Rating">Rating</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.name} product={product} />
        ))}
      </div>
    </div>
  );
};

export default MenuProducts;
