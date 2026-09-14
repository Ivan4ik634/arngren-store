import { UserT } from './UserT';

export interface AddressT {
  address: string | null;
  city: string | null;
  postal_code: string | null;
  country: string | null;
}
export interface OrderT extends AddressT {
  id: string;
  order_id: string;
  user_id: string;
  status: 'pending' | 'approved' | 'rejected' | 'in_shipping' | 'processing' | 'cancelled';
  total: number;
  items_length: number;
  created_at: string;
}
export interface OrderWithUserT extends Omit<OrderT, 'user_id'> {
  user_id: UserT;
}
export interface OrderCreateT extends AddressT {
  order_id: string;
  user_id: string;
  total: number;
  items_length: number;
}
export interface OrderUpdateT extends Partial<Omit<OrderT, 'created_at' | 'id'>> {}
