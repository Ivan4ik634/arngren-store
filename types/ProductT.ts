import { BrandT } from './BrandT';
import { CategoryT } from './CategoryT';

export type ProductT = {
  id: string;
  name: string;
  category: CategoryT[number];
  price: number;
  rating: string;
  brand: BrandT[number];
  reviews: string;
  image: string;
};
export interface ProductCreateT {
  name: string;
  seller: string;
  category: CategoryT[number];
  price: number;
  brand: BrandT[number];
  images: string[];
}
export interface ProductUpdateT extends Partial<Omit<ProductCreateT, 'seller'>> {
  id: string;
}
