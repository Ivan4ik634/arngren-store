import { BrandT } from './BrandT';
import { CategoryT } from './CategoryT';
import { UserT } from './UserT';

export type ProductT = {
  id: string;
  name: string;
  category: CategoryT[number];
  price: number;
  rating: string;
  brand: BrandT[number];
  reviews: string;
  application: boolean;
  seller: UserT;
  image: string;
};
export interface ProductCreateT {
  name: string;
  seller: string;
  category: CategoryT[number];
  price: number;
  brand: BrandT[number];
  image: string;
}
export interface ProductFormCreateT {
  name: string;
  category: CategoryT[number] | null;
  brand: BrandT[number] | null;
  price: number;
}
export interface ProductUpdateT extends Partial<Omit<ProductCreateT, 'seller'>> {
  id: string;
}
