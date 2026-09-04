import { supabase } from '@/lib/supabase';
import { ApplicationCreateT } from '@/types/ApplicationT';
import { FiltersT } from '@/types/FiltersT';

export const applicationService = {
  async addApplication(data: ApplicationCreateT) {
    const res = await supabase.from('applications').insert({ ...data });
    return res;
  },
  async getApplications(filters?: FiltersT) {
    if (filters) {
      const res = await supabase
        .from('applications')
        .select(
          `
      id,
      product_id(
        id,
        name,
        category,
        brand,
        price,
        image
      ),
      created_at,
      status
      `,
        )
        .eq('status', filters.status)
        .eq('product_id.category', filters.category)
        .eq('product_id.name', filters.search);
      return res;
    }
    const res = await supabase.from('applications').select(`
      id,
      product_id(
        id,
        name,
        category,
        brand,
        price,
        image
      ),
      created_at,
      status
      `);
    return res;
  },
};
