import { supabase } from '@/lib/supabase';
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
  async updateUser(id: string, data: UserUpdatePersonalInformationT) {
    const res = await supabase
      .from('profiles')
      .update({ ...data })
      .eq('id', id);
    return res;
  },
};
