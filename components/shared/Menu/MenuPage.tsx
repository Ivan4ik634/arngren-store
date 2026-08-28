'use client';
import { ChevronRight, Search } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { useSearch } from '@/hooks/useSearch';
import { useFilters } from '@/store/useFilters';
import { ProductT } from '@/types/ProductT';
import { Filters } from './Filters';
import MenuProducts from './MenuProducts';
import { products } from './data';

export function MenuPage() {
  const { filters } = useFilters();

  const { query, setQuery, filteredItems } = useSearch<ProductT>(products, (item, query) =>
    item.name.toLowerCase().includes(query),
  );

  const filteredProducts = filteredItems
    .filter((product) => {
      return (
        filters.categories.includes('All Categories') ||
        filters.categories.includes(product.category)
      );
    })
    .filter((product) => {
      return filters.brand.length === 0 || filters.brand.includes(product.brand);
    })
    .filter((product) => {
      return (
        filters.priceRange[0] * 500 <= product.price && filters.priceRange[1] * 500 >= product.price
      );
    })
    .sort((a, b) => {
      if (filters.sortBy === 'Price: Low to High') return a.price - b.price;
      if (filters.sortBy === 'Price: High to Low') return b.price - a.price;
      if (filters.sortBy === 'Rating') return Number(b.rating) - Number(a.rating);
      return 0;
    });

  return (
    <main className="bg-white">
      <section className="mx-auto w-full max-w-[1410px] px-6 py-6 lg:px-10">
        <div className="mb-6 flex items-center gap-2 text-sm font-medium text-zinc-500">
          <span>Home</span>
          <ChevronRight className="size-4" />
          <span className="font-semibold text-[#0969ff]">Menu</span>
        </div>

        <div className="flex flex-col gap-6 border-b border-zinc-200 pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-5xl font-black tracking-tight text-black">Menu</h1>
            <p className="mt-3 max-w-xl text-base leading-6 text-zinc-600">
              Explore thousands of quality products across electronics, home & garden, tools,
              sports, and more. Find everything you need in one place.
            </p>
          </div>

          <div className="relative w-full max-w-[560px]">
            <Search className="absolute left-5 top-1/2 size-6 -translate-y-1/2 text-zinc-600" />
            <Input
              placeholder="Search for products..."
              className="h-12 rounded-full border-zinc-300 pl-14 pr-28 text-base shadow-sm"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-4 grid w-full gap-8 lg:grid-cols-[250px_minmax(0,1fr)]">
          <Filters />
          <div className="min-w-0">
            <MenuProducts products={filteredProducts} />
          </div>
        </div>
      </section>
    </main>
  );
}
