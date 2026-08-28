import { create } from 'zustand';

type Filters = {
  filters: {
    categories: string[];
    priceRange: [number, number];
    availability: [boolean, boolean];
    brand: string[];
    sortBy: 'Price: Low to High' | 'Price: High to Low' | 'Rating';
  };
  setFilters: (value: {
    categories: string[];
    priceRange: [number, number];
    availability: [boolean, boolean];
    brand: string[];
    sortBy: 'Price: Low to High' | 'Price: High to Low' | 'Rating';
  }) => void;
};

export const useFilters = create<Filters>((set) => ({
  filters: {
    categories: ['All Categories'],
    priceRange: [0, 1000],
    availability: [true, true],
    brand: [],
    sortBy: 'Price: Low to High',
  },
  setFilters: (value) => set({ filters: value }),
}));
