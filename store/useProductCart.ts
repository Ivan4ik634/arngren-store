import { ProductT } from '@/types/ProductT';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProductCard {
  productCards: { product: ProductT; count: number }[];
  setProductCards: (value: { product: ProductT; count: number }[]) => void;
  addProductCard: (value: { product: ProductT; count: number }) => void;
  incrementProductCount: (value: string) => void;
  decrementProductCount: (value: string) => void;
  deleteProductCard: (value: string) => void;
  clearProductsCard: (value: string) => void;
}
export const useProductCart = create<ProductCard>()(
  persist(
    (set) => ({
      productCards: [],
      incrementProductCount: (value) =>
        set((state) => ({
          productCards: state.productCards.map((card) => {
            if (card.product.id === value) {
              return { ...card, count: card.count + 1 };
            }
            return card;
          }),
        })),
      decrementProductCount: (value) =>
        set((state) => ({
          productCards: state.productCards.map((card) => {
            if (card.product.id === value) {
              return { ...card, count: card.count === 1 ? card.count : card.count - 1 };
            }
            return card;
          }),
        })),
      clearProductsCard: () => set({ productCards: [] }),
      setProductCards: (value) => set({ productCards: value }),
      addProductCard: (value) => set((state) => ({ productCards: [...state.productCards, value] })),
      deleteProductCard: (value) =>
        set((state) => ({
          productCards: state.productCards.filter((card) => card.product.id !== value),
        })),
    }),
    {
      name: 'product-cart',
    },
  ),
);
