import { supabase } from '@/lib/supabase';
import { UserRegisterT } from '@/types/UserT';

export const userService = {
  async addUser(id: string, data: Omit<UserRegisterT, 'password'>) {
    const res = await supabase.from('profiles').insert({ id, ...data });
    return res;
  },
};
