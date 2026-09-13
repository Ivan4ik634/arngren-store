import { UserT } from './UserT';

export interface OrderT {
  id: string;
  order_id: string;
  user_id: string;
  status: 'pending' | 'approved' | 'rejected' | 'in_shipping' | 'processing' | 'cancelled';
  total: number;
  items_length: number;
  created_at: string;

  address: string | null;
  city: string | null;
  state: string | null;
  postal_code: string | null;
  country: string | null;
}
export interface OrderWithUserT extends Omit<OrderT, 'user_id'> {
  user_id: UserT;
}
export interface OrderCreateT extends Omit<OrderT, 'id' | 'created_at' | 'status'> {}
export interface OrderUpdateT extends Partial<Omit<OrderT, 'created_at' | 'id'>> {}
