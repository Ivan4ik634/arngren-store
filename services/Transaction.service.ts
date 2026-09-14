import { supabase } from '@/lib/supabase/client';
import { TransactionCreateT, TransactionT } from '@/types/TransactionT';

export const transactionService = {
  async getByUserId(user_id: string): Promise<TransactionT[] | null> {
    const res = await supabase.from('transaction').select('*').eq('user_id', user_id);

    return res.data;
  },
  async getByOrderIdAndUserId(user_id: string, order_id: string): Promise<TransactionT[] | null> {
    const res = await supabase
      .from('transaction')
      .select('*')
      .eq('user_id', user_id)
      .eq('order_id', order_id);

    return res.data;
  },
  async create(data: TransactionCreateT) {
    const res = await supabase.from('transaction').insert(data).select('*').single();

    return res;
  },
  async update(id: string, data: Partial<TransactionCreateT>) {
    const res = await supabase.from('transaction').update(data).select('*').eq('id', id).single();

    return res;
  },
};
