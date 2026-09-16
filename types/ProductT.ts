import { UserT } from './UserT';

export type ProductT = {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  count: number;
  brand: string;
  reviews: number;
  application: boolean;
  seller: UserT;
  created_at: string;
  images: string[];
};
export interface ProductCreateT extends ProductFormCreateT {
  seller: string;
  images: string[];
}
export interface ProductFormCreateT {
  name: string;
  category: string | null;
  description: string;

  brand: string | null;
  price?: number;
  count?: number;
}
export interface ProductUpdateT extends Partial<Omit<ProductCreateT, 'seller'>> {
  id: string;
  rating?: number;
  reviews?: number;
}
