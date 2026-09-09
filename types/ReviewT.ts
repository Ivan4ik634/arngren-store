import { UserT } from './UserT';

export interface ReviewT {
  id: string;
  rating: number;
  text: string;
  user_id: string;
  product_id: string;
  created_at: string;
}
export interface ReviewWithUserT extends Omit<ReviewT, 'user_id'> {
  id: string;
  rating: number;
  text: string;
  user_id: UserT;
  product_id: string;
}
export interface ReviewCreateT extends Omit<ReviewT, 'id'> {}
