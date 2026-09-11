import { supabase } from '@/lib/supabase/client';
import { UserRegisterT, UserUpdatePersonalInformationT } from '@/types/UserT';

export const userService = {
  async addUser(id: string, data: Omit<UserRegisterT, 'password'>) {
    const res = await supabase.from('profiles').insert({ id, ...data });
    return res;
  },
  async getUser(id: string) {
    const res = await supabase.from('profiles').select('*').eq('id', id).single();
    return res;
  },
  async getUsers(filters: { search: string }) {
    let query = supabase.from('profiles').select('*');
    if (filters.search) {
      query = query.ilike('name', `%${filters.search}%`);
    }
    return await query;
  },
  async updateUser(id: string, data: UserUpdatePersonalInformationT) {
    const res = await supabase
      .from('profiles')
      .update({ ...data })
      .eq('id', id);
    return res;
  },
  async deleteUsers(ids: string[]) {
    const res = await supabase.from('profiles').delete().in('id', ids);
    return res;
  },
  async deleteUser(id: string) {
    const res = await supabase.from('profiles').delete().eq('id', id);
    return res;
  },
};
