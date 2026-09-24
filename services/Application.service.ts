import { supabase } from '@/lib/supabase/client';
import {
  ApplicationCreateT,
  ApplicationStatus,
  ApplicationWithProductT,
} from '@/types/ApplicationT';
import { FiltersT } from '@/types/FiltersT';
import dayjs from 'dayjs';

export const applicationService = {
  async create(data: ApplicationCreateT) {
    const res = await supabase.from('applications').insert({ ...data });
    return res;
  },
  async getByProductIdAndUserId(product_id: string, user_id: string) {
    const res = await supabase
      .from('applications')
      .select('*')
      .eq('product_id', product_id)
      .eq('user_id', user_id)
      .single();

    return res;
  },

  async getApplicationsDashboard(
    date: Date,
  ): Promise<{ data: { status: ApplicationStatus }[] | null }> {
    const start = dayjs(date).startOf('day').toISOString();
    const end = dayjs(date).add(1, 'day').startOf('day').toISOString();

    const { data } = await supabase
      .from('applications')
      .select('status')
      .gte('created_at', start)
      .lt('created_at', end);

    return { data };
  },
  async getApplicationsStats(): Promise<{ length: number | null }> {
    const statsCount = (
      await supabase.from('applications').select('*', { count: 'exact', head: true })
    ).count;

    return { length: statsCount } as any;
  },
  async get(filters?: FiltersT): Promise<ApplicationWithProductT[]> {
    let query = supabase.from('applications').select(
      `
      id,
      product_id(
        id,
        name,
        category,
        brand,description,
        price,
        seller(name,email,avatar),
        images
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

    return (await query).data as any as ApplicationWithProductT[];
  },
  async update(id: string, status?: 'approved' | 'rejected') {
    await supabase
      .from('products')
      .update({ application: status === 'approved' ? true : false })
      .eq('id', id);
    const res = await supabase.from('applications').update({}).eq('product_id', id);

    return res;
  },

  async updateStatus(product_id: string, status: 'approved' | 'rejected' | 'pending') {
    await supabase
      .from('products')
      .update({ application: status === 'approved' ? true : false })
      .eq('id', product_id);
    const res = await supabase.from('applications').update({ status }).eq('product_id', product_id);

    return res;
  },

  async updateMany(ids: string[], status: 'approved' | 'rejected') {
    const { data: applications } = await supabase
      .from('applications')
      .select('product_id')
      .in('id', ids);

    const productIds = applications?.map((a) => a.product_id) || [];

    if (productIds.length) {
      await supabase
        .from('products')
        .update({ application: status === 'approved' ? true : false })
        .in('id', productIds);
    }
    const res = await supabase.from('applications').update({ status }).in('id', ids);

    return res;
  },
};
