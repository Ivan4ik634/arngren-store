import { FiltersMenuT } from '@/types/FiltersT';
import { create } from 'zustand';

type Filters = {
  filters: FiltersMenuT;
  setFilters: (value: FiltersMenuT | ((prev: FiltersMenuT) => FiltersMenuT)) => void;
};

export const useFilters = create<Filters>((set) => ({
  filters: {
    search: '',
    categories: ['all'],
    priceRange: [0, 100],
    availability: [true, true],
    brand: [],
    sortBy: 'Price: Low to High',
  },
  setFilters: (value) =>
    set((state) => ({
      filters: typeof value === 'function' ? value(state.filters) : value,
    })),
}));
