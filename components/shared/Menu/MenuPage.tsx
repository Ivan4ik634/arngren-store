import { ChevronRight, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Filters } from './Filters';
import MenuProducts from './MenuProducts';

export function MenuPage() {
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
            />
            <Button className="absolute right-2 top-1/2 h-9 -translate-y-1/2 rounded-full bg-[#0969ff] px-7 hover:bg-[#0057df]">
              Search
            </Button>
          </div>
        </div>

        <div className="mt-4 grid w-full gap-8 lg:grid-cols-[250px_minmax(0,1fr)]">
          <Filters />
          <div className="min-w-0">
            <MenuProducts />
          </div>
        </div>
      </section>
    </main>
  );
}
