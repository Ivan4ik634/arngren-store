type PaymentStatus = 'pending' | 'failed' | 'completed';

export interface WithdrawalT {
  id: string;
  user_id: string;
  amount: number;
  status: PaymentStatus;
  iban: string;
  created_at: string;
}
export interface WithdrawalCreateT {
  user_id: string;
  amount: number;
  iban: string;
}
export interface WithdrawalUpdateT extends Partial<WithdrawalCreateT> {
  status: PaymentStatus;
}
