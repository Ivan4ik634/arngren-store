import { supabase } from '@/lib/supabase/client';
import { CartItemWithOrderT } from '@/types/CartItemT';
import { FilterOrdersT } from '@/types/FiltersT';
import { ProductT } from '@/types/ProductT';

export const cartItemService = {
  async create(items: { product: ProductT; count: number }[], order_id: string) {
    const res = await supabase
      .from('cart_items')
      .insert(
        items.map((item: { product: ProductT; count: number }) => ({
          product_id: item.product.id,
          count: item.count,
          price: item.product.price * item.count,
          order_id: order_id,
        })),
      )
      .select();

    return res;
  },
  async getItems(
    product_ids: string[],
    filters: FilterOrdersT,
  ): Promise<CartItemWithOrderT[] | null> {
    let query = supabase
      .from('cart_items')
      .select('*,product_id(*),order_id(*,user_id(*))')
      .in('product_id', product_ids);

    if (filters.search) {
      query = query.ilike('order_id.order_id', `%${filters.search}%`);
    }
    if (filters.status && filters.status !== 'all') {
      query = query.eq('order_id.status', filters.status);
    }

    return (await query).data;
  },
  async getItemsByOrderId(order_id: string): Promise<CartItemWithOrderT[] | null> {
    const res = await supabase
      .from('cart_items')
      .select('*,product_id(*)')
      .eq('order_id', order_id);
    return res.data;
  },
};
