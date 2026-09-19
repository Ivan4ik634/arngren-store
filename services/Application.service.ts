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

  async getApplicationsStats(
    date: Date,
  ): Promise<{ length: number | null; data: { status: ApplicationStatus }[] } | null> {
    const start = dayjs(date).startOf('day').toISOString();
    const end = dayjs(date).add(1, 'day').startOf('day').toISOString();
    const statsCount = (
      await supabase.from('applications').select('*', { count: 'exact', head: true })
    ).count;

    const { data } = await supabase
      .from('applications')
      .select('status')
      .gte('created_at', start)
      .lt('created_at', end);

    return { length: statsCount, data } as any;
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
  async update(id: string, status: 'approved' | 'rejected') {
    await supabase
      .from('products')
      .update({ application: status === 'approved' ? true : false })
      .eq('id', id);
    const res = await supabase.from('applications').update({ status }).eq('product_id', id);

    return res;
  },
  async updateMany(ids: string[], status: 'approved' | 'rejected') {
    await supabase
      .from('products')
      .update({ application: status === 'approved' ? true : false })
      .in('id', ids);
    const res = await supabase.from('applications').update({ status }).in('product_id', ids);

    return res;
  },
};
