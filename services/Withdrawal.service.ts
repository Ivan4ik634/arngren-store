import { supabase } from '@/lib/supabase/client';
import { ReviewWithUserT } from '@/types/ReviewT';
import { WithdrawalCreateT, WithdrawalUpdateT } from '@/types/WithdrawalT';

export const withdravalService = {
  async getAll(): Promise<ReviewWithUserT[] | null> {
    const res = await supabase.from('withdrawal').select('*,user_id(*)');

    return res.data;
  },
  async add(data: WithdrawalCreateT) {
    const res = await supabase.from('withdrawal').insert(data).select('*,user_id(*)').single();

    await supabase.from('transaction').insert({
      transaction: 'Withdrawal Request',
      user_id: data.user_id,
      status: 'pending',
      amount: data.amount,
      withdrawal_id: res.data?.id,
      type: 'withdrawal',
    });

    return res;
  },
  async update(id: string, data: WithdrawalUpdateT) {
    const res = await supabase
      .from('withdrawal')
      .update(data)
      .eq('id', id)
      .select('*,user_id(*)')
      .single();
    await supabase
      .from('transaction')
      .update({
        status: data.status,
      })
      .eq('withdrawal_id', id)
      .eq('user_id', data.user_id);

    return res;
  },
};
