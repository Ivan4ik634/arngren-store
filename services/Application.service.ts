import { supabase } from '@/lib/supabase';
import { ApplicationCreateT } from '@/types/ApplicationT';

export const applicationService = {
  async addApplication(data: ApplicationCreateT) {
    const res = await supabase.from('applications').insert({ ...data });
    return res;
  },
  async getApplications() {
    const res = await supabase.from('applications').select('*');
    return res;
  },
};
