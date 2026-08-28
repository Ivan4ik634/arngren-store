import { ProductT } from '@/types/ProductT';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProductCard {
  productCards: ProductT[];
  setProductCards: (value: ProductT[]) => void;
  addProductCard: (value: ProductT) => void;
  deleteProductCard: (value: string) => void;
}
export const useProductCart = create<ProductCard>()(
  persist(
    (set) => ({
      productCards: [],
      setProductCards: (value) => set({ productCards: value }),
      addProductCard: (value) => set((state) => ({ productCards: [...state.productCards, value] })),
      deleteProductCard: (value) =>
        set((state) => ({ productCards: state.productCards.filter((card) => card.id !== value) })),
    }),
    {
      name: 'product-cart',
    },
  ),
);
