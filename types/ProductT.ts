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
