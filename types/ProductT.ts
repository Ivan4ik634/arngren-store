import { BrandT } from './BrandT';
import { CategoryT } from './CategoryT';
import { UserT } from './UserT';

export type ProductT = {
  id: string;
  name: string;
  category: CategoryT[number];
  price: number;
  rating: string;
  count: number;
  brand: BrandT[number];
  reviews: string;
  application: boolean;
  seller: UserT;
  created_at: string;
  image: string;
};
export interface ProductCreateT extends ProductFormCreateT {
  seller: string;
  image: string;
}
export interface ProductFormCreateT {
  name: string;
  category: CategoryT[number] | null;

  brand: BrandT[number] | null;
  price: number;
  count: number;
}
export interface ProductUpdateT extends Partial<Omit<ProductCreateT, 'seller'>> {
  id: string;
}
