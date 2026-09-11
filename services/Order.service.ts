import { supabase } from '@/lib/supabase/client';
import { FilterOrdersT } from '@/types/FiltersT';
import { OrderCreateT } from '@/types/OrderT';

export const orderService = {
  async createOrder(order: OrderCreateT) {
    const res = await supabase
      .from('orders')
      .insert({ ...order })
      .select()
      .single();
    return res;
  },
  async getOrdersUser(filters: FilterOrdersT) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    let query = supabase.from('orders').select('*').eq('user_id', user.id);

    if (filters.search) {
      query = query.ilike('order_id', `%${filters.search}%`);
    }

    if (filters.status && filters.status !== 'all') {
      query = query.eq('status', filters.status);
    }

    return query;
  },
  async getOrders(filters: FilterOrdersT) {
    let query = supabase.from('orders').select(`
    *,
    user_id(*)
  `);

    // if (filters.search) {
    //   query = query.ilike('order_id', `%${filters.search}%`);
    // }
    if (filters.status && filters.status !== 'all') {
      query = query.eq('status', filters.status);
    }
    return query;
  },
  async deleteOrders(ids: string[]) {
    const res = await supabase.from('orders').delete().in('id', ids);

    return res;
  },
  async deleteOrder(id: string) {
    const res = await supabase.from('orders').delete().eq('id', id);

    return res;
  },
};
