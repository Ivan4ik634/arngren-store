import { UserT } from './UserT';

export type PaymentStatus = 'pending' | 'failed' | 'completed';

export interface WithdrawalT {
  id: string;
  user_id: string;
  amount: number;
  status: PaymentStatus;
  iban: string;
  created_at: string;
}
export interface WithdrawalWithUserT extends Omit<WithdrawalT, 'user_id'> {
  user_id: UserT;
}
export interface WithdrawalCreateT {
  user_id: string;
  amount: number;
  iban: string;
}
export interface WithdrawalUpdateT extends Partial<WithdrawalCreateT> {
  status: PaymentStatus;
}
