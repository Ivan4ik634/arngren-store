import { supabase } from '@/lib/supabase/client';
import { UserRegisterT, UserUpdatePersonalInformationT } from '@/types/UserT';
import dayjs from 'dayjs';

export const userService = {
  async create(id: string, data: Omit<UserRegisterT, 'password'>) {
    const res = await supabase.from('profiles').insert({ id, ...data });
    return res;
  },
  async getById(id: string) {
    const res = await supabase.from('profiles').select('*').eq('id', id).single();
    return res;
  },
  async getUsersDashboard(date: Date) {
    const start = dayjs(date).startOf('day').toISOString();
    const end = dayjs(date).add(1, 'day').startOf('day').toISOString();
    const res = await supabase
      .from('profiles')
      .select('*')
      .gte('created_at', start)
      .lt('created_at', end)
      .order('created_at', { ascending: false })
      .limit(5);
    return res;
  },
  async getUsers(filters: { search: string }) {
    let query = supabase.from('profiles').select('*');
    if (filters.search) {
      query = query.ilike('name', `%${filters.search}%`);
    }
    return await query;
  },
  async getUsersStats() {
    const statsCount = (await supabase.from('profiles').select('*', { count: 'exact', head: true }))
      .count;

    return { length: statsCount } as any;
  },
  async update(id: string, data: UserUpdatePersonalInformationT) {
    const res = await supabase
      .from('profiles')
      .update({ ...data })
      .eq('id', id);
    return res;
  },
  async deleteMany(ids: string[]) {
    const res = await supabase.from('profiles').delete().in('id', ids);
    return res;
  },
  async delete(id: string) {
    const res = await supabase.from('profiles').delete().eq('id', id);
    return res;
  },
};
