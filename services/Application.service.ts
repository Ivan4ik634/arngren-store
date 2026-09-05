import { supabase } from '@/lib/supabase';
import { ApplicationCreateT } from '@/types/ApplicationT';
import { FiltersT } from '@/types/FiltersT';

export const applicationService = {
  async addApplication(data: ApplicationCreateT) {
    const res = await supabase.from('applications').insert({ ...data });
    return res;
  },
  async getApplications(filters?: FiltersT) {
    let query = supabase.from('applications').select(
      `
      id,
      product_id(
        id,
        name,
        category,
        brand,
        price,
        seller(name,email,avatar),
        image
      ),
      created_at,
      status
    `,
    );

    if (filters?.status && filters.status !== 'all') {
      query = query.eq('status', filters.status);
    }

    if (filters?.category && filters.category !== 'all') {
      query = query.eq('product_id.category', filters.category);
    }

    if (filters?.search) {
      query = query.ilike('product_id.name', `%${filters.search}%`);
    }

    return await query;
  },
  async editApplication(id: string, status: 'approved' | 'rejected') {
    await supabase.from('products').update({ application: true }).eq('id', id);
    const res = await supabase.from('applications').update({ status }).eq('product_id', id);

    return res;
  },
};
