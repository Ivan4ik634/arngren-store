import { supabase } from '@/lib/supabase/client';
import { FiltersT } from '@/types/FiltersT';
import { WithdrawalCreateT, WithdrawalUpdateT, WithdrawalWithUserT } from '@/types/WithdrawalT';

export const withdravalService = {
  async get(filters?: FiltersT): Promise<WithdrawalWithUserT[]> {
    let query = supabase.from('withdrawal').select(
      `
      id,
      user_id(
        id,
        avatar,
        name,
        email,
        role,
        balance,
        created_at
      ),
      amount,
      status,
      iban,
      created_at
    `,
    );

    if (filters?.status && filters.status !== 'all') {
      query = query.eq('status', filters.status);
    }

    if (filters?.search) {
      query = query.ilike('user_id.name', `%${filters.search}%`);
    }

    return (await query).data as any as WithdrawalWithUserT[];
  },
  async getWithdrawalPendingLength(): Promise<number | null> {
    let query = (await supabase.from('withdrawal').select('*', { count: 'exact', head: true }))
      .count;

    return query;
  },
  async updateStatus(id: string, status: 'pending' | 'completed' | 'failed') {
    const res = await supabase.from('withdrawal').update({ status }).eq('id', id);

    return res;
  },
  async updateManyStatus(ids: string[], status: 'pending' | 'completed' | 'failed') {
    const res = await supabase.from('withdrawal').update({ status }).in('id', ids);

    return res;
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
