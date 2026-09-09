import { ProductT } from '@/types/ProductT';
import { create } from 'zustand';

type ProductBuyNow = {
  product: { product: ProductT; count: number } | null;
  setProduct: (value: { product: ProductT; count: number } | null) => void;
};

export const useProductBuyNow = create<ProductBuyNow>((set) => ({
  product: null,
  setProduct: (value) => set({ product: value }),
}));
