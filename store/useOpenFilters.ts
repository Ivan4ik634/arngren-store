import { create } from 'zustand';

type OpenFilters = {
  openFilters: { category: boolean; brand: boolean; availability: boolean };
  setOpenFilters: (value: { category: boolean; brand: boolean; availability: boolean }) => void;
};

export const useOpenFilters = create<OpenFilters>((set) => ({
  openFilters: { category: false, brand: false, availability: false },
  setOpenFilters: (value) => set({ openFilters: value }),
}));
