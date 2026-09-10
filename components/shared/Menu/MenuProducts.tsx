'use client';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { categoryFilters } from '@/data/Catogeries';
import { useProfile } from '@/hooks/useProfile';
import { useFilters } from '@/store/useFilters';
import { useProductCart } from '@/store/useProductCart';
import { ProductT } from '@/types/ProductT';
import { ShoppingCart } from 'lucide-react';
import { FC } from 'react';
import ProductCard from '../ProductCard';

interface Props {
  products: ProductT[] | undefined;
}

const MenuProducts: FC<Props> = ({ products }) => {
  const { filters, setFilters } = useFilters();
  const { addProductCard, incrementProductCount, productCards } = useProductCart();
  const { profile } = useProfile();

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
                    categories: [category.value],
                  })
                }
                key={category.value}
                variant={filters.categories.includes(category.value) ? 'default' : 'outline'}>
                {category.label}
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
        {products?.map((product) => {
          const productInCart = productCards.find((card) => card.product?.id === product.id);

          return (
            <ProductCard
              product={product}
              profile={profile}
              className="mt-4 grid grid-cols-[1fr_48px] gap-3"
              key={product.id}>
              <Button
                onClick={() =>
                  productInCart
                    ? incrementProductCount(product.id)
                    : addProductCard({ product, count: 1 })
                }
                className="h-9 rounded-md bg-[#0969ff] text-sm hover:bg-[#0057df]">
                + Add to cart
              </Button>
              <Button
                variant="outline"
                size="icon-lg"
                className="h-9 w-12 rounded-md border-zinc-200 bg-zinc-50">
                <ShoppingCart className="size-4" />
              </Button>
            </ProductCard>
          );
        })}
      </div>
    </div>
  );
};

export default MenuProducts;
