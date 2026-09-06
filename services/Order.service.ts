import { supabase } from '@/lib/supabase/client';
import { OrderCreateT, OrderUpdateT } from '@/types/OrderT';

export const orderService = {
  async createOrder(order: OrderCreateT) {
    const res = await supabase
      .from('orders')
      .insert({ ...order })
      .select()
      .single();
    return res;
  },
  async updateOrder(id: string, data: OrderUpdateT) {
    const res = await supabase
      .from('orders')
      .update({ ...data })
      .eq('id', id);
    return res;
  },
};
