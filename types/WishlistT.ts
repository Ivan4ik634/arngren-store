import { ProductT } from './ProductT';

export interface WishlistT {
  id: string;
  product_id: string;
  user_id: string;
  created_at: string;
}

export interface WishlistWithProductT extends Omit<WishlistT, 'product_id'> {
  product_id: ProductT;
}
