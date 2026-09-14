type TransactionStatus = 'pending' | 'completed' | 'failed' | 'cancelled';
type TransactionType = 'income' | 'deposit' | 'purchase' | 'withdraw';

export interface TransactionT {
  id: string; // uuid, primary key, default: gen_random_uuid()
  created_at: string; // timestamp, default: now()
  user_id: string; // uuid, foreign key
  transaction: string;
  type: TransactionType;
  status: TransactionStatus; // default: 'pending'
  amount: number; // int8
}
export interface TransactionCreateT extends Omit<TransactionT, 'id' | 'created_at'> {}
