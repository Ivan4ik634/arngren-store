import { supabase } from '@/lib/supabase/client';
import { FiltersT } from '@/types/FiltersT';
import {
  PaymentStatus,
  WithdrawalCreateT,
  WithdrawalUpdateT,
  WithdrawalWithUserT,
} from '@/types/WithdrawalT';
import dayjs from 'dayjs';

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
  async getWithdrawalDashboard(date: Date): Promise<{ data: { status: PaymentStatus }[] | null }> {
    const start = dayjs(date).startOf('day').toISOString();
    const end = dayjs(date).add(1, 'day').startOf('day').toISOString();

    const { data } = await supabase
      .from('withdrawal')
      .select('status')
      .gte('created_at', start)
      .lt('created_at', end);

    return { data };
  },
  async getWithdrawalStats(): Promise<{ length: number | null }> {
    let statsCount = (
      await supabase
        .from('withdrawal')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending')
    ).count;

    return { length: statsCount };
  },
  async updateStatus(id: string, status: 'pending' | 'completed' | 'failed') {
    const { data: withdrawal } = await supabase
      .from('withdrawal')
      .select('user_id, amount, status')
      .eq('id', id)
      .single();

    const res = await supabase.from('withdrawal').update({ status }).eq('id', id);

    // Если вывод отклонён — возвращаем деньги пользователю
    if (status === 'failed' && withdrawal) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('balance')
        .eq('id', withdrawal.user_id)
        .single();
      await supabase
        .from('profiles')
        .update({ balance: (profile?.balance || 0) + withdrawal.amount })
        .eq('id', withdrawal.user_id);
    }

    return res;
  },
  async updateManyStatus(ids: string[], status: 'pending' | 'completed' | 'failed') {
    const { data: withdrawals } = await supabase
      .from('withdrawal')
      .select('user_id, amount')
      .in('id', ids);

    const res = await supabase.from('withdrawal').update({ status }).in('id', ids);

    // Если выводы отклонены — возвращаем деньги пользователям
    if (status === 'failed' && withdrawals?.length) {
      for (const w of withdrawals) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('balance')
          .eq('id', w.user_id)
          .single();
        await supabase
          .from('profiles')
          .update({ balance: (profile?.balance || 0) + w.amount })
          .eq('id', w.user_id);
      }
    }

    return res;
  },
  async add(data: WithdrawalCreateT) {
    // Проверяем баланс и списываем сумму вывода
    const { data: profile } = await supabase
      .from('profiles')
      .select('balance')
      .eq('id', data.user_id)
      .single();

    if (!profile || (profile.balance || 0) < data.amount) {
      return { data: null, error: { message: 'Insufficient balance' } as any };
    }

    await supabase
      .from('profiles')
      .update({ balance: (profile.balance || 0) - data.amount })
      .eq('id', data.user_id);

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
