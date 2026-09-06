import { UserT } from './UserT';

export interface OrderT {
  id: string;
  user_id: string;
  status: 'pending' | 'approved' | 'rejected';
  total: number;
  items_length: number;
  created_at: string;
}
export interface OrderWithUserT extends Omit<OrderT, 'user_id'> {
  user_id: UserT;
}
export interface OrderCreateT extends Omit<OrderT, 'id' | 'created_at' | 'status'> {}
export interface OrderUpdateT extends Partial<Omit<OrderT, 'created_at' | 'id'>> {}
