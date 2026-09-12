import { OrderWithUserT } from './OrderT';
import { ProductT } from './ProductT';

export interface CartItemT {
  id: string;
  product_id: ProductT;
  count: number;
  price: number;
  order_id: string;
  created_at: string;
}
export interface CartItemWithOrderT extends Omit<CartItemT, 'order_id'> {
  order_id: OrderWithUserT;
}
