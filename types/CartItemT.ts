import { ProductT } from './ProductT';

export interface CartItemT {
  id: string;
  product_id: ProductT;
  count: number;
  price: number;
  order_id: string;
  created_at: string;
}
